import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function fetchGPADistributions(
    classId: number,
    instructorId: number | undefined,
    departmentId: number,
    startSemester: string | undefined,
    endSemester: string | undefined,
) {

    try {
        const data = await prisma.distribution.findMany({
            where: {
                classId,
                instructorId: instructorId || undefined,
                class: {
                    departmentId,
                },
                term: {
                    gte: startSemester,
                    lte: endSemester,
                },
            },
            select: {
                class: {
                    select: {
                        code: true,
                        name: true,
                        department: {
                            select: {
                                code: true,
                                name: true,
                            },
                        },
                    },
                },
                instructor: true,
                term: true,
                grades: true,
            },
            orderBy: {
                term: 'asc',
            },
        });

        // Parse the grades data as { [key: string]: number }
        const parsedData = data.map((item) => ({
            ...item,
            grades: item.grades as { [key: string]: number },
        }));

        return parsedData;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch GPA distributions.');
    }
}


export const getSearch = async (search: string, page: number, limit: number) => {
    const skip = (page - 1) * limit;

    try {
        const [classResults, instructorResults, departmentResults, classCount, instructorCount, departmentCount] = await Promise.all([
            prisma.class.findMany({
                where: search ? {
                    OR: [
                        {
                            code: {
                                contains: search,
                                mode: 'insensitive',
                            },
                        },
                        {
                            name: {
                                contains: search,
                                mode: 'insensitive',
                            },
                        },
                    ],
                } : undefined,
                select: {
                    id: true,
                    code: true,
                    name: true,
                    department: {
                        select: {
                            code: true,
                            name: true,
                        },
                    },
                },
                orderBy: {
                    code: 'asc',
                },
                skip,
                take: limit,
            }),
            prisma.instructor.findMany({
                where: search ? {
                    name: {
                        contains: search,
                        mode: 'insensitive',
                    },
                } : undefined,
                select: {
                    id: true,
                    name: true,
                },
                orderBy: {
                    name: 'asc',
                },
                skip,
                take: limit,
            }),
            prisma.department.findMany({
                where: search ? {
                    OR: [
                        {
                            code: {
                                contains: search,
                                mode: 'insensitive',
                            },
                        },
                        {
                            name: {
                                contains: search,
                                mode: 'insensitive',
                            },
                        },
                    ],
                } : undefined,
                select: {
                    id: true,
                    code: true,
                    name: true,
                },
                orderBy: {
                    code: 'asc',
                },
                skip,
                take: limit,
            }),
            prisma.class.count(),
            prisma.instructor.count(),
            prisma.department.count(),
        ]);

        return {
            classes: classResults,
            instructors: instructorResults,
            departments: departmentResults,
            classCount,
            instructorCount,
            departmentCount,
        };
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to perform search.');
    }
};

export async function getClassByCode(code: string) {
    try {
        const classData = await prisma.class.findFirst({
            where: {
                OR: [
                    { code: code },
                    { code: { contains: code, mode: 'insensitive' } },
                ],
            },
            include: {
                department: true,
            },
        });
        return classData;
    } catch (error) {
        console.error('Failed to fetch class data:', error);
        throw new Error('Failed to fetch class data');
    }
}

export async function getInstructorById(instructorId: number) {
    try {
        const instructor = await prisma.instructor.findUnique({
            where: { id: instructorId },
        });
        return instructor;
    } catch (error) {
        console.error('Failed to fetch instructor data:', error);
        throw new Error('Failed to fetch instructor data');
    }
}

export async function fetchInstructorClasses(instructorId: number) {
    try {
        const instructorClasses = await prisma.distribution.findMany({
            where: {
                instructorId,
            },
            select: {
                class: {
                    select: {
                        code: true,
                        name: true,
                    },
                },
                term: true,
                grades: true,
            },
            orderBy: {
                term: 'asc',
            },
        });

        // Parse the grades data as { [key: string]: number }
        const parsedData = instructorClasses.map((item) => ({
            ...item,
            grades: item.grades as { [key: string]: number },
        }));

        return parsedData;
    } catch (error) {
        console.error('Failed to fetch instructor classes:', error);
        throw new Error('Failed to fetch instructor classes');
    }
}

export async function getDepartmentByCode(code: string) {
    try {
        const department = await prisma.department.findUnique({
            where: { code },
        });
        return department;
    } catch (error) {
        console.error('Failed to fetch department data:', error);
        throw new Error('Failed to fetch department data');
    }
}

export async function fetchDepartmentClasses(departmentId: number) {
    try {
        const departmentClasses = await prisma.class.findMany({
            where: {
                departmentId,
            },
            select: {
                code: true,
                name: true,
            },
        });
        return departmentClasses;
    } catch (error) {
        console.error('Failed to fetch department classes:', error);
        throw new Error('Failed to fetch department classes');
    }
}

export async function fetchDepartmentInstructors(departmentName: string) {
    try {
        const departmentInstructors = await prisma.instructor.findMany({
            where: {
                department: departmentName,
            },
            select: {
                id: true,
                name: true,
                department: true,
            },
        });
        return departmentInstructors;
    } catch (error) {
        console.error('Failed to fetch department instructors:', error);
        throw new Error('Failed to fetch department instructors');
    }
}

export async function fetchDepartmentGrades(departmentId: number) {
    try {
        const departmentGrades = await prisma.distribution.findMany({
            where: {
                class: {
                    departmentId,
                },
            },
            select: {
                grades: true,
            },
        });

        const gradesMap: { [key: string]: number } = {};

        departmentGrades.forEach((distribution) => {
            const grades = distribution.grades as { [key: string]: number };
            Object.entries(grades).forEach(([grade, count]) => {
                gradesMap[grade] = (gradesMap[grade] || 0) + count;
            });
        });

        const result = Object.entries(gradesMap).map(([grade, count]) => ({
            grade,
            count,
        }));

        return result;
    } catch (error) {
        console.error('Failed to fetch department grades:', error);
        throw new Error('Failed to fetch department grades');
    }
}