'use client';

import { useEffect, useState } from 'react';
import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select";
import { calculateAverageGPA, calculatePercentageA } from '@/lib/utils';
import { ResponsiveBar } from "@nivo/bar";
import { useRouter } from 'next/navigation';
import { ClassData, GradeDistribution } from '@/lib/types';
import Link from 'next/link';
import Search from './search';

export default function ClassGraph({ classData, gpaDistributions }: { classData: ClassData, gpaDistributions: GradeDistribution[] }) {
    const router = useRouter();
    const [selectedInstructor, setSelectedInstructor] = useState<number | null>(null);
    const [selectedSemester, setSelectedSemester] = useState<string | null>(null);

    useEffect(() => {
        const params = new URLSearchParams();
        if (selectedInstructor) params.set('instructor', selectedInstructor.toString());
        if (selectedSemester) params.set('semester', selectedSemester);
        const url = `/class/${classData.code}?${params.toString()}`;
        router.push(url);
    }, [selectedInstructor, selectedSemester, classData.code, router]);

    if (!classData) {
        return <div>Loading...</div>;
    }

    const uniqueInstructorIds = new Set<number>();
    const instructors = gpaDistributions
        .map((dist) => dist.instructor)
        .filter((instructor): instructor is NonNullable<typeof instructor> => {
            if (instructor !== null && instructor !== undefined) {
                if (!uniqueInstructorIds.has(instructor.id)) {
                    uniqueInstructorIds.add(instructor.id);
                    return true;
                }
            }
            return false;
        })
        .sort((a, b) => a.name.localeCompare(b.name));

    const semesters = Array.from(new Set(gpaDistributions.map(dist => dist.term))).sort();

    const filteredDistributions = gpaDistributions.filter((dist) => {
        const instructorMatch =
            selectedInstructor === null || dist.instructor?.id === selectedInstructor;
        const semesterMatch = selectedSemester === null || dist.term === selectedSemester;
        return instructorMatch && semesterMatch;
    });

    const aggregateDistribution = gpaDistributions.reduce((acc, dist) => {
        const grades = dist.grades as { [key: string]: number };
        Object.entries(grades).forEach(([grade, count]) => {
            acc[grade] = (acc[grade] || 0) + count;
        });
        return acc;
    }, {} as { [key: string]: number });

    const totalStudents: any = Object.values(aggregateDistribution).reduce((sum, count) => sum + count, 0);
    const percentageDistribution = Object.fromEntries(
        Object.entries(aggregateDistribution).map(([grade, count]) => [grade, (count / totalStudents) * 100])
    );

    // @ts-ignore
    const chartData: {
        // @ts-ignore
        grade: string;
        [key: string]: number;
    }[] = Object.keys(percentageDistribution).map(grade => ({
        grade,
        Cumulative: percentageDistribution[grade],
    }));

    if (selectedInstructor !== null || selectedSemester !== null) {
        const filteredTotalStudents = Object.values(filteredDistributions.reduce((acc, dist) => {
            const grades = dist.grades as { [key: string]: number };
            Object.entries(grades).forEach(([grade, count]) => {
                acc[grade] = (acc[grade] || 0) + count;
            });
            return acc;
        }, {} as { [key: string]: number })).reduce((sum, count) => sum + count, 0);

        const filteredPercentageDistribution = Object.fromEntries(
            Object.entries(filteredDistributions.reduce((acc, dist) => {
                const grades = dist.grades as { [key: string]: number };
                Object.entries(grades).forEach(([grade, count]) => {
                    acc[grade] = (acc[grade] || 0) + count;
                });
                return acc;
            }, {} as { [key: string]: number })).map(([grade, count]) => [grade, (count / filteredTotalStudents) * 100])
        );

        chartData.forEach(data => {
            const instructorName = selectedInstructor !== null ? instructors.find((instructor) => instructor.id === selectedInstructor)?.name : undefined;
            const key = instructorName || selectedSemester;
            if (key) {
                data[key] = filteredPercentageDistribution[data.grade] || 0;
            }
        });
    }

    return (
        <>
            <div className="bg-white p-8">
                <Search placeholder="Search for classes, instructors, or departments" />
                <div className="border-b border-red-800 pb-4 pt-6">
                    <h1 className="text-4xl font-bold text-gray-900">{classData.name}</h1>
                    <p className="text-xl text-gray-600">
                        <Link href={`/department/${classData.code.slice(0, classData.code.search(/\d/))}`}>
                            <span className="text-red-800 hover:underline">{classData.code.slice(0, classData.code.search(/\d/))}</span>
                        </Link>
                        {classData.code.slice(classData.code.search(/\d/))}
                    </p>
                </div>
                <div className="lg:grid lg:grid-cols-4 gap-16 mt-4">
                    <div className="lg:col-span-1">
                        <div className="mb-8">
                            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="instructors">
                                Instructors
                            </label>
                            <Select
                                value={selectedInstructor !== null ? selectedInstructor.toString() : undefined}
                                onValueChange={(value) => setSelectedInstructor(value ? Number(value) : null)}
                            >
                                <SelectTrigger id="instructors" className="w-full bg-[#f6f6ef] border-[#f6f6ef]">
                                    <SelectValue placeholder="All Instructors" />
                                </SelectTrigger>
                                <SelectContent position="popper" className='bg-[#f6f6ef] border-[#f6f6ef]'>
                                    {/** @ts-ignore */}
                                    <SelectItem value={null}>All Instructors</SelectItem>
                                    {instructors.map((instructor) => (
                                        <SelectItem key={instructor.id} value={instructor.id.toString()}>
                                            {instructor.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="semesters">
                                Semesters
                            </label>
                            <Select
                                value={selectedSemester !== null ? selectedSemester : undefined}
                                onValueChange={(value) => setSelectedSemester(value)}
                            >
                                <SelectTrigger id="semesters" className="w-full bg-[#f6f6ef] border-[#f6f6ef]">
                                    <SelectValue placeholder="All Semesters" />
                                </SelectTrigger>
                                <SelectContent position="popper" className='bg-[#f6f6ef] border-[#f6f6ef]'>
                                    {/** @ts-ignore */}
                                    <SelectItem value={null}>All Semesters</SelectItem>
                                    {semesters.map(semester => (
                                        <SelectItem key={semester} value={semester} >
                                            {semester}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className="mt-6 lg:mt-0 lg:col-span-3">
                        <div className="col-span-2">
                            <div className="flex items-center mb-4">
                                <div className="text-lg font-semibold text-gray-900">
                                    {classData.name}: {selectedInstructor === null && selectedSemester === null && "Cumulative"} {selectedInstructor !== null && (
                                        <Link href={`/instructor/${selectedInstructor}`} className="text-red-800 hover:underline">
                                            {instructors.find((instructor) => instructor.id === selectedInstructor)?.name}
                                        </Link>
                                    )}
                                </div>
                                {selectedSemester !== null && <span className="ml-2 text-gray-600">({selectedSemester})</span>}
                            </div>
                            <BarChart className="w-full h-[500px]" data={chartData} />
                        </div>
                        <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-3">
                            <div className="bg-[#f6f6ef] p-4 rounded-lg">
                                <h3 className="text-base sm:text-lg font-semibold text-gray-900">Total Entries</h3>
                                <p className="text-2xl sm:text-3xl font-bold text-red-800">
                                    {Object.values(aggregateDistribution).reduce((a, b) => a + b, 0).toFixed()}
                                </p>
                            </div>
                            <div className="bg-[#f6f6ef] p-4 rounded-lg">
                                <h3 className="text-base sm:text-lg font-semibold text-gray-900">Average GPA</h3>
                                <p className="text-2xl sm:text-3xl font-bold text-red-800">
                                    {calculateAverageGPA(aggregateDistribution)}
                                </p>
                            </div>
                            <div className="bg-[#f6f6ef] p-4 rounded-lg">
                                <h3 className="text-base sm:text-lg font-semibold text-gray-900">Percentage A</h3>
                                <p className="text-2xl sm:text-3xl font-bold text-red-800">
                                    {calculatePercentageA(aggregateDistribution)}%
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

interface BarChartProps {
    data: {
        // @ts-ignore
        grade: string;
        [key: string]: number;
    }[];
    [key: string]: any;
}

function BarChart({ data, ...props }: BarChartProps) {
    return (
        <div {...props}>
            <ResponsiveBar
                data={data}
                keys={Object.keys(data[0]).filter(key => key !== 'grade')}
                indexBy="grade"
                margin={{ top: 0, right: 0, bottom: 40, left: 40 }}
                padding={0.2}
                groupMode="grouped"
                colors={['#840024', '#78797a']}
                axisBottom={{
                    tickSize: 0,
                    tickPadding: 16,
                }}
                axisLeft={{
                    tickSize: 0,
                    tickValues: 4,
                    tickPadding: 16,
                    format: value => `${value}%`,
                }}
                gridYValues={4}
                theme={{
                    tooltip: {
                        chip: {
                            borderRadius: "9999px",
                        },
                        container: {
                            fontSize: "12px",
                            textTransform: "capitalize",
                            borderRadius: "6px",
                        },
                    },
                    grid: {
                        line: {
                            stroke: "#f3f4f6",
                        },
                    },
                }}
                tooltipLabel={({ id, value, indexValue }) => `${id} - ${indexValue}: ${value!.toFixed(2)}%`}
                enableLabel={false}
                role="application"
                ariaLabel="A bar chart showing grade distribution"
            />
        </div>
    );
}
