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

export interface GradeDistribution {
    term: string;
    grades: Prisma.JsonValue;
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

export interface DepartmentGraphProps {
    department: Department | null;
    departmentGrades: Array<{ grade: string; count: number }>;
    departmentClasses: Array<{ code: string; name: string }>;
    departmentInstructors: Array<{ id: number; name: string; department: string }>;
}