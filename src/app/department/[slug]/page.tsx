import DepartmentBarChart from "@/components/component/department-components/department-bar-chart";
import DepartmentDataCards from "@/components/component/department-components/department-data-cards";
import DepartmentHoverCards from "@/components/component/department-components/department-hover-cards";
import Search from "@/components/component/search-components/search";
import { getDepartmentByCode, fetchDepartmentClasses, fetchDepartmentInstructors, fetchDepartmentGrades } from "@/lib/data";
import { calculateAverageGPA, calculateDepartmentStats, calculatePercentageA, gradesOrder } from "@/lib/utils";

export default async function DepartmentPage({ params }: { params: { slug: string } }) {
    const departmentCode = params.slug;
    const department = await getDepartmentByCode(departmentCode);
    const departmentClasses = await fetchDepartmentClasses(department?.id || 0);
    const departmentGrades = await fetchDepartmentGrades(department?.id || 0);
    const departmentInstructors = await fetchDepartmentInstructors(department?.name || '');

    const { aggregateDistribution, totalStudents, averageGPA, percentageA } = calculateDepartmentStats(departmentGrades);

    const chartData: any = gradesOrder.map(grade => ({
        name: grade,
        count: parseFloat(aggregateDistribution[grade]?.toFixed(1) || '0'),
    })).filter(entry => entry.count > 0);

    return (
        <div className="bg-white">
            <div className="p-8">
                <Search placeholder="Search for classes, instructors, or departments" />
                <div className="border-b border-red-800 pb-4 pt-6">
                    <h1 className="text-4xl font-bold text-gray-900">{department!.name}</h1>
                    <p className="text-xl text-gray-600">{department!.code}</p>
                </div>
                <div className="mt-6 flex flex-col gap-4">
                    <div className="col-span-2">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Overall Grades in Department</h2>
                        <DepartmentBarChart className="w-full h-[300px]" data={chartData} />
                    </div>
                    <DepartmentDataCards totalStudents={totalStudents} averageGPA={averageGPA} percentageA={percentageA} />
                </div>
            </div>
            <DepartmentHoverCards departmentInstructors={departmentInstructors} departmentClasses={departmentClasses} />
        </div>
    );
}