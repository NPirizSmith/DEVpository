import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    await prisma.difficulty.createMany({
        data: [
            { name: 'Principiante' },
            { name: 'Intermedio' },
            { name: 'Avanzado' },
        ]
    });
}

main()
    .catch((error) => {
        console.error(error);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
