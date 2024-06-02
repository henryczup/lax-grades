
export default function InstructorDataCards({ totalStudents, averageGPA, percentageA }: { totalStudents: number, averageGPA: string, percentageA: string }) {
    return (
        <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-3" >
            <div className="bg-[#f6f6ef] p-4 rounded-lg">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900">Students taught</h3>
                <p className="text-2xl sm:text-3xl font-bold text-red-800">{totalStudents.toFixed(0)}</p>
            </div>
            <div className="bg-[#f6f6ef] p-4 rounded-lg">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900">Average GPA</h3>
                <p className="text-2xl sm:text-3xl font-bold text-red-800">{averageGPA}</p>
            </div>
            <div className="bg-[#f6f6ef] p-4 rounded-lg">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900">Percentage A</h3>
                <p className="text-2xl sm:text-3xl font-bold text-red-800">{percentageA}%</p>
            </div>
            {/*<Link href={instructor.RMP_link} className="bg-white p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900">Rate My Professor</h3>
            <p className="text-3xl font-bold text-red-800">{instructor.RMP_score}</p>
        </Link>
        <Link href={instructor.RMP_link} className="bg-white p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900">Difficulty</h3>
            <p className="text-3xl font-bold text-red-800">{instructor.RMP_diff}</p>
        </Link>*/}
        </div>
    );
}