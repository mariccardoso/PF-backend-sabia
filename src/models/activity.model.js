import prisma from "../../prisma/prisma.js";

class ActivityModel {
    // Obter todas as atividades
    async findAll(title, difficulty, page, limit) {
        if (Number(page) < 1) {
            page = 1;
        }
        if (Number(limit) < 1 || Number(limit) > 100) {
            limit = 10;
        }
        const skip = (Number(page) - 1) * Number(limit);
        //                4 - 1 = 3 * 10 = 30
        const where = {};

        if (title) {
            where.title = {
                contains: title,
            };
        }

        if (difficulty) {
            where.difficulty = {
                contains: difficulty,
            };
        }

        const activities = await prisma.activity.findMany({
            skip,
            take: Number(limit),
            where,
            orderBy: {
                createdAt: "desc",
            },
            include: {
                progress: true
            },
        });

        const totalViews = activities.length;
        const grandTotal = await prisma.activity.count({
            where,
        });

        return { totalViews, grandTotal, activities };
    }

    // Procurar atividade por ID
    async findById(id) {
        const activity = await prisma.activity.findUnique({
            where: { id: Number(id) },
            include: {
                progress: true
            },
        });
        return activity;
    }

    // Criar uma nova atividade
    async create(data) {
        const activity = await prisma.activity.create({
            data,
        });

        return activity;
    }

    // Atualizar uma atividade
    async update(id, data) {
        const activity = await prisma.activity.update({
            where: { id: Number(id) },
            data,
        });

        return activity;
    }

    // Excluir uma atividade
    async delete(id) {
        await prisma.activity.delete({
            where: {
                id: Number(id),
            },
        });

        return true;
    }
}

export default new ActivityModel();
