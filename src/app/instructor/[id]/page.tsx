import InstructorBarChart from "@/components/component/instructor-components/instructor-bar-chart";
import InstructorHoverCards from "@/components/component/instructor-components/instructor-hover-cards";
import InstructorDataCards from "@/components/component/instructor-components/intructor-data-cards";
import Search from "@/components/component/search-components/search";
import { getInstructorById, fetchInstructorClasses } from "@/lib/data";
import { calculateAverageGPA, calculatePercentageA, gradesOrder } from "@/lib/utils";

export default async function InstructorPage({ params }: { params: { id: string } }) {
    const instructorId = parseInt(params.id);
    const instructor = await getInstructorById(instructorId);
    const instructorClasses = await fetchInstructorClasses(instructorId);

    const aggregateDistribution = instructorClasses.reduce((acc: { [key: string]: number }, dist) => {
        Object.entries(dist.grades).forEach(([grade, count]) => {
            acc[grade] = (acc[grade] || 0) + count;
        });
        return acc;
    }, {});

    const chartData: any = gradesOrder.map(grade => ({
        name: grade,
        count: parseFloat(aggregateDistribution[grade].toFixed(1) || '0'),
    })).filter(entry => entry.count > 0);

    const totalStudents: any = Object.values(aggregateDistribution).reduce((a: any, b: any) => a + b, 0);
    const averageGPA = calculateAverageGPA(aggregateDistribution);
    const percentageA = calculatePercentageA(aggregateDistribution);

    return (
        <div className="bg-white">
            <div className="p-8">
                <Search placeholder="Search for classes, instructors, or departments" />
                <div className="border-b border-red-800 pb-4 pt-6">
                    <h1 className="text-4xl font-bold text-gray-900">{instructor!.name}</h1>
                    <p className="text-xl text-gray-600">Instructor</p>
                </div>
                <div className="mt-6 flex flex-col gap-4">
                    <div className="col-span-2">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Overall Grades Given</h2>
                        <InstructorBarChart className="w-full h-[300px]" data={chartData} />
                    </div>
                    <InstructorDataCards totalStudents={totalStudents} averageGPA={averageGPA} percentageA={percentageA} />
                </div>
            </div>
            <InstructorHoverCards instructorClasses={instructorClasses} />
        </div >
    );
}