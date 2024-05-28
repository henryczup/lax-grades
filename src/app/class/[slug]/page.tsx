import ClassGraph from "@/components/component/class-graph";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchGPADistributions, getClassByCode } from "@/lib/data";
import { ClassData } from "@/lib/types";

export default async function ClassPage({ params, searchParams }: {
  params: { slug: string };
  searchParams?: { instructor?: string; semester?: string };
}) {
  const slug = decodeURIComponent(params.slug);
  const instructor = searchParams?.instructor;
  const semester = searchParams?.semester;

  const classData: ClassData | null = await getClassByCode(slug);

  if (!classData) {
    return <div className="bg-white h-screen flex flex-center justify-center text-h1">NO DATA</div>;
  }

  const gpaDistributions = await fetchGPADistributions(
    classData.id,
    instructor ? parseInt(instructor) : undefined,
    classData.department.id,
    semester,
    semester
  );

  return (
    <>
      <ClassGraph classData={classData} gpaDistributions={gpaDistributions} />
    </>
  );
}