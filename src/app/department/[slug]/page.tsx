import { getDepartmentByCode, fetchDepartmentClasses, fetchDepartmentInstructors, fetchDepartmentGrades } from "@/lib/data";
import DepartmentGraph from "@/components/component/department-graph";
import { Department } from "@/lib/types";

export default async function DepartmentPage({ params }: { params: { slug: string } }) {
    const departmentCode = params.slug;

    try {
        const department = await getDepartmentByCode(departmentCode);
        const departmentClasses = await fetchDepartmentClasses(department?.id || 0);
        const departmentGrades = await fetchDepartmentGrades(department?.id || 0);
        const departmentInstructors = await fetchDepartmentInstructors(department?.name || '');

        return (
            <>
                <DepartmentGraph
                    department={department as Department}
                    departmentGrades={departmentGrades}
                    departmentClasses={departmentClasses}
                    departmentInstructors={departmentInstructors}
                />
            </>
        );
    } catch (error) {
        console.error('Failed to fetch department data:', error);
        // Handle the error gracefully, e.g., show an error message to the user
        return <div>Failed to fetch department data. Please try again later.</div>;
    }
}