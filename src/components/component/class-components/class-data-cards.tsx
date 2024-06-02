import { calculateAverageGPA, calculatePercentageA } from "@/lib/utils";

interface ClassDataCardsProps {
    distribution: { [key: string]: number };
}

export default function ClassDataCards({ distribution }: ClassDataCardsProps) {
    return (
        <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-3">
            <div className="bg-[#f6f6ef] p-4 rounded-lg">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900">Entries</h3>
                <p className="text-2xl sm:text-3xl font-bold text-red-800">
                    {Object.values(distribution).reduce((a, b) => a + b, 0).toFixed()}
                </p>
            </div>
            <div className="bg-[#f6f6ef] p-4 rounded-lg">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900">Average GPA</h3>
                <p className="text-2xl sm:text-3xl font-bold text-red-800">
                    {calculateAverageGPA(distribution)}
                </p>
            </div>
            <div className="bg-[#f6f6ef] p-4 rounded-lg">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900">Percentage A</h3>
                <p className="text-2xl sm:text-3xl font-bold text-red-800">
                    {calculatePercentageA(distribution)}%
                </p>
            </div>
        </div>
    );
}