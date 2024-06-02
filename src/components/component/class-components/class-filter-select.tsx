"use client";
import { useRouter } from "next/navigation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import { useEffect, useState } from "react";
import { gradesOrder } from "@/lib/utils";
import ClassBarChart from "./class-bar-chart";
import Link from "next/link";
import ClassDataCards from "./class-data-cards";

export default function ClassFilterSelect({ classData, originalDistributions }: { classData: any, originalDistributions: any[] }) {
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

    const uniqueInstructorIds = new Set<number>();
    const instructors = originalDistributions
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

    const semesters = Array.from(new Set(originalDistributions.map(dist => dist.term))).sort();

    const filteredDistributions = originalDistributions.filter((dist) => {
        const instructorMatch =
            selectedInstructor === null || dist.instructor?.id === selectedInstructor;
        const semesterMatch = selectedSemester === null || dist.term === selectedSemester;
        return instructorMatch && semesterMatch;
    });

    const aggregateDistribution = originalDistributions.reduce((acc, dist) => {
        const grades = dist.grades as { [key: string]: number };
        Object.entries(grades).forEach(([grade, count]) => {
            acc[grade] = (acc[grade] || 0) + count;
        });
        return acc;
    }, {} as { [key: string]: number });

    const totalStudents = Object.values(aggregateDistribution).reduce((sum, count) => (sum as number) + (count as number), 0) as number;
    const percentageDistribution = Object.fromEntries(
        Object.entries(aggregateDistribution).map(([grade, count]) => [grade, ((count as number) / totalStudents) * 100])
    );

    let chartData: {
        grade: string;
        Cumulative: number;
    }[] = gradesOrder
        .map(grade => ({
            grade,
            Cumulative: parseFloat(percentageDistribution[grade]?.toFixed(1) || '0'),
        }))
        .filter(entry => entry.Cumulative > 0);

    if (selectedInstructor !== null || selectedSemester !== null) {

        const filteredTotalStudents = Object.values(filteredDistributions.reduce((acc, dist) => {
            const grades = dist.grades as { [key: string]: number };
            Object.entries(grades).forEach(([grade, count]) => {
                acc[grade] = (acc[grade] || 0) + (count as number);
            });
            return acc;
        }, {} as { [key: string]: number })).reduce((sum, count) => (sum as number) + (count as number), 0) as number;

        const filteredPercentageDistribution = Object.fromEntries(
            Object.entries(filteredDistributions.reduce((acc, dist) => {
                const grades = dist.grades as { [key: string]: number };
                Object.entries(grades).forEach(([grade, count]) => {
                    acc[grade] = (acc[grade] || 0) + (count as number);
                });
                return acc;
            }, {} as { [key: string]: number })).map(([grade, count]) => [grade, ((count as number) / filteredTotalStudents) * 100])
        );

        chartData = chartData.map(data => {
            const instructorName = selectedInstructor !== null ? instructors.find((instructor) => instructor.id === selectedInstructor)?.name : undefined;
            const key = instructorName || selectedSemester;
            if (key) {
                return {
                    ...data,
                    [key]: filteredPercentageDistribution[data.grade] || 0,
                };
            }
            return data;
        }).filter(entry => Object.values(entry).some(value => typeof value === 'number' && value > 0));
    }

    return (
        <>
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
                    <ClassBarChart className="w-full h-[500px]" data={chartData} />
                </div>
                <ClassDataCards aggregateDistribution={aggregateDistribution} />

            </div>
        </>
    );
}