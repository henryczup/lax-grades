import { GradePercentages } from "@/lib/types";

interface ClassDataCardsProps {
    cumulativeNumStudents: number;
    cumulativeAverageGPA: number;
    cumulativeGradePercentages: GradePercentages;
    filteredNumStudents: number;
    filteredAverageGPA: number;
    filteredGradePercentages: GradePercentages;
    isFiltered: boolean;
}

export default function ClassDataCards({
    cumulativeNumStudents,
    cumulativeAverageGPA,
    cumulativeGradePercentages,
    filteredNumStudents,
    filteredAverageGPA,
    filteredGradePercentages,
    isFiltered,
}: ClassDataCardsProps) {
    const cumulativePercentageA = cumulativeGradePercentages["A"] || 0;
    const filteredPercentageA = filteredGradePercentages["A"] || 0;

    return (
        <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-3">
            <div className="bg-[#f6f6ef] p-4 rounded-lg">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900">Entries</h3>
                <div className="flex items-baseline">
                    <p className="text-2xl sm:text-3xl font-bold text-red-800">
                        {cumulativeNumStudents.toFixed(0)}
                    </p>
                    {isFiltered && (
                        <p className="ml-4 text-2xl sm:text-3xl font-bold text-[#78797a]">
                            {filteredNumStudents.toFixed(0)}
                        </p>
                    )}
                </div>
            </div>
            <div className="bg-[#f6f6ef] p-4 rounded-lg">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900">Average GPA</h3>
                <div className="flex items-baseline">
                    <p className="text-2xl sm:text-3xl font-bold text-red-800">
                        {cumulativeAverageGPA.toFixed(2)}
                    </p>
                    {isFiltered && (
                        <p className="ml-4 text-2xl sm:text-3xl font-bold text-[#78797a]">
                            {filteredAverageGPA.toFixed(2)}
                        </p>
                    )}
                </div>
            </div>
            <div className="bg-[#f6f6ef] p-4 rounded-lg">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900">Percentage A</h3>
                <div className="flex items-baseline">
                    <p className="text-2xl sm:text-3xl font-bold text-red-800">
                        {cumulativePercentageA.toFixed(1)}%
                    </p>
                    {isFiltered && (
                        <p className="ml-4 text-2xl sm:text-3xl font-bold text-[#78797a]">
                            {filteredPercentageA.toFixed(1)}%
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}