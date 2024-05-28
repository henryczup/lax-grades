import { getInstructorById, fetchInstructorClasses } from "@/lib/data";
import InstructorGraph from "@/components/component/instructor-graph";

export default async function InstructorPage({ params }: { params: { id: string } }) {
    const instructorId = parseInt(params.id);
    const instructor = await getInstructorById(instructorId);
    const instructorClasses = await fetchInstructorClasses(instructorId);

    return (
        <>
            <InstructorGraph instructor={instructor} instructorClasses={instructorClasses} />
        </>
    );
}