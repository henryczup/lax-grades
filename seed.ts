const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const csvParse = require('csv-parse');
const prisma = new PrismaClient();

async function parseCSV(filePath: string) {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const records = await new Promise<string[][]>((resolve, reject) => {
        csvParse.parse(fileContent, (err: string, output: string[][]) => {
            if (err) {
                reject(err);
            } else {
                resolve(output);
            }
        });
    });
    return records;
}

async function insertData(records: string[][]) {
    for (let i = 1; i < records.length; i++) {
        const record = records[i];
        const [
            courseName,
            section,
            term,
            departmentCode,
            instructorNames,
            studentHeadcount,
            avgCourseGrade,
            percentA,
            percentAB,
            percentB,
            percentBC,
            percentC,
            percentPS,
            percentD,
            percentUF,
            percentW,
            percentOther,
        ] = record;

        const cleanedDepartmentCode = departmentCode.slice(0, -4).trim();

        // Find or create the department
        const department = await prisma.department.upsert({
            where: { code: cleanedDepartmentCode },
            update: {},
            create: {
                code: cleanedDepartmentCode,
                name: cleanedDepartmentCode,
            },
        });

        // Find or create the class
        let classCode = '';
        let className = '';
        if (courseName) {
            const courseNameParts = courseName.split(':');
            if (courseNameParts.length > 1) {
                classCode = courseNameParts[0].trim();
                className = courseNameParts[1].trim();
            } else {
                classCode = courseName.trim();
                className = courseName.trim();
            }
        }

        const classRecord = await prisma.class.upsert({
            where: { code: classCode },
            update: {},
            create: {
                code: classCode,
                name: className,
                departmentId: department.id,
            },
        });

        // Split instructor names by semicolon and trim whitespace
        const instructorNameArray = instructorNames.split(';').map((name) => name.trim());

        // Find or create the instructors
        const instructors = await Promise.all(
            instructorNameArray.map(async (instructorName) => {
                const instructor = await prisma.instructor.findFirst({
                    where: { name: instructorName },
                });
                if (!instructor) {
                    return prisma.instructor.create({
                        data: {
                            name: instructorName,
                            department: cleanedDepartmentCode,
                        },
                    });
                }
                return instructor;
            })
        );

        // Create the distribution record for each instructor
        await Promise.all(
            instructors.map((instructor) =>
                prisma.distribution.create({
                    data: {
                        classId: classRecord.id,
                        instructorId: instructor.id,
                        term,
                        studentHeadcount: parseInt(studentHeadcount),
                        avgCourseGrade: parseFloat(avgCourseGrade),
                        grades: {
                            A: parseFloat(percentA),
                            AB: parseFloat(percentAB),
                            B: parseFloat(percentB),
                            BC: parseFloat(percentBC),
                            C: parseFloat(percentC),
                            D: parseFloat(percentD),
                            F: parseFloat(percentUF),
                            Pass: parseFloat(percentPS),
                            Withdraw: parseFloat(percentW),
                            Other: parseFloat(percentOther),
                        },
                    },
                })
            )
        );
    }
}


async function main() {
    const csvFilePath = 'university_data.csv';
    const records = await parseCSV(csvFilePath);
    await insertData(records);
    console.log('Data insertion completed.');
}

main()
    .catch((error) => {
        console.error('Error occurred:', error);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });