
export default function DepartmentDataCards({ totalStudents, averageGPA, percentageA }: { totalStudents: number, averageGPA: number, percentageA: number }) {
    return (
        <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-3">
            <div className="bg-[#f6f6ef] p-4 rounded-lg">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900">Total Students</h3>
                <p className="text-2xl sm:text-3xl font-bold text-red-800">{totalStudents.toFixed(0)}</p>
            </div>
            <div className="bg-[#f6f6ef] p-4 rounded-lg">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900">Average GPA</h3>
                <p className="text-2xl sm:text-3xl font-bold text-red-800">{averageGPA.toFixed(2)}</p>
            </div>
            <div className="bg-[#f6f6ef] p-4 rounded-lg">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900">Percentage A</h3>
                <p className="text-2xl sm:text-3xl font-bold text-red-800">{percentageA.toFixed(1)}%</p>
            </div>
        </div>
    );
}
