import { calculateAverageGPA, calculatePercentageA } from "@/lib/utils";

export default function ClassDataCards({ aggregateDistribution }: { aggregateDistribution: { [key: string]: number } }) {
    return (
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
    );
}