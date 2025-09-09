import prisma from "../../prisma/prisma.js";

class ProgressModel {
    // Obter todas os progressos
    async findAll(activityId, userId, status, page, limit) {
        if (Number(page) < 1) {
            page = 1;
        }
        if (Number(limit) < 1 || Number(limit) > 100) {
            limit = 10;
        }
        const skip = (Number(page) - 1) * Number(limit);
        //                4 - 1 = 3 * 10 = 30
        const where = {};

        if (activityId) {
            where.activityId = activityId;
        }
        if (userId) {
            where.userId = userId;
        }
        if (status) {
            where.status = status;
        }

        const progress = await prisma.progress.findMany({
            skip,
            take: Number(limit),
            where,
            orderBy: {
                createdAt: "desc",
            },
            include: {
                user: {
                    select: {
                        name: true,
                        email: true,
                    },
                },
                activity: {
                    select: {
                        title: true,
                        description: true,
                    },
                },
            },
        });

        const totalViews = progress.length;
        const grandTotal = await prisma.progress.count({
            where,
        });

        return { totalViews, grandTotal, progress };
    }

    // Criar um novo progresso
    async create(data) {
        const progress = await prisma.progress.create({
            data,
        });

        return progress;
    }

    // Atualizar um progresso
    async update(id, data) {
        const progress = await prisma.progress.update({
            where: {
                id: Number(id),
            },
            data,
        });

        return progress;
    }

    // Excluir um progresso
    async delete(id) {
        await prisma.progress.delete({
            where: {
                id: Number(id),
            },
        });

        return true;
    }
}

export default new ProgressModel();
