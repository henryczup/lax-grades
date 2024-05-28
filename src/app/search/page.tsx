import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import SearchList from "@/components/component/search-list";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Search from "@/components/component/search";
import { getSearch } from "@/lib/data";

export default async function Page({
    searchParams,
}: {
    searchParams?: {
        query?: string;
        page?: string;
    };
}) {
    const query = searchParams?.query || "";
    const currentPage = Number(searchParams?.page) || 1;
    const limit = 10;

    const { classes, instructors, departments, classCount, instructorCount, departmentCount } = await getSearch(query, currentPage, limit);
    const totalClassesPages = Math.ceil(classCount / limit);
    const totalInstructorsPages = Math.ceil(instructorCount / limit);
    const totalDepartmentsPages = Math.ceil(departmentCount / limit);

    return (
        <div className="flex flex-col items-center justify-start p-8 gap-8 bg-white min-h-[85vh]">
            <div className="flex flex-col items-center w-full">
                <Search placeholder="Search for classes, instructors, or departments" />
            </div>
            <Tabs defaultValue="Class" className="w-full">
                <TabsList className="flex justify-center items-center mb-4">
                    <TabsTrigger value="Class">Class</TabsTrigger>
                    <TabsTrigger value="Instructor">Instructor</TabsTrigger>
                    <TabsTrigger value="Department">Department</TabsTrigger>
                </TabsList>
                <TabsContent value="Class">
                    <Suspense key={query + currentPage} fallback={<Skeleton />}>
                        <SearchList
                            results={classes}
                            currentPage={currentPage}
                            totalPages={totalClassesPages}
                            entity="classes"
                        />
                    </Suspense>
                </TabsContent>
                <TabsContent value="Instructor">
                    <Suspense key={query + currentPage} fallback={<Skeleton />}>
                        <SearchList
                            results={instructors}
                            currentPage={currentPage}
                            totalPages={totalInstructorsPages}
                            entity="instructors"
                        />
                    </Suspense>
                </TabsContent>
                <TabsContent value="Department">
                    <Suspense key={query + currentPage} fallback={<Skeleton />}>
                        <SearchList
                            results={departments}
                            currentPage={currentPage}
                            totalPages={totalDepartmentsPages}
                            entity="departments"
                        />
                    </Suspense>
                </TabsContent>
            </Tabs>
        </div >
    );
}