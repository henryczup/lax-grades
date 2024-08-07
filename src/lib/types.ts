import { Prisma } from "@prisma/client";

export interface ClassData {
    id: number;
    name: string;
    code: string;
    department: {
        id: number;
        name: string;
    };
}

export interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    message: string;
}

export interface GradeDistribution {
    term: string;
    grades: Prisma.JsonValue;
    studentHeadcount: number;
    avgCourseGrade: number;
    class: {
        code: string;
        name: string;
        department: {
            code: string;
            name: string;
        };
    };
    instructor?: {
        id: number;
        name: string;
        department: string;
    } | null;
}

export interface Department {
    id: number;
    code: string;
    name: string;
}

export interface GradePercentages {
    [key: string]: number;
}
