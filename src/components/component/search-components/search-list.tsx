import Pagination from "./pagination";
import SearchCard from "./search-card";

export default async function SearchList({
    results,
    currentPage,
    totalPages,
    entity,
}: {
    results: any[];
    currentPage: number;
    totalPages: number;
    entity: "classes" | "instructors" | "departments";
}) {
    return (
        <>
            <section className="">
                {results.map((result) => (
                    <SearchCard key={result.id} data={result} type={entity} />
                ))}

            </section>
            <div className="mt-5 flex w-full justify-center">
                <Pagination totalPages={totalPages} />
            </div>
        </>
    );
}