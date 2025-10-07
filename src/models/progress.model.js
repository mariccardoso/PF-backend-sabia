import prisma from "../../prisma/prisma.js";

class ProgressModel {
    async findAll(activityId, userId, status, page, limit) {
        // Garantir página e limite válidos
        if (Number(page) < 1) page = 1;
        if (Number(limit) < 1 || Number(limit) > 100) limit = 10;
        const skip = (Number(page) - 1) * Number(limit);
    
        const where = {};
    
        // Converter activityId para número, se fornecido
        if (activityId !== undefined) {
            const id = Number(activityId);
            if (isNaN(id)) throw new Error("activityId inválido");
            where.activityId = id;
        }
    
        // Converter userId para número, se fornecido
        if (userId !== undefined) {
            const id = Number(userId);
            if (isNaN(id)) throw new Error("userId inválido");
            where.userId = id;
        }
    
        // Filtrar pelo status, se fornecido
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

    // Verificar se activityId existe
    async checkActivityExists(activityId) {
        const activity = await prisma.activity.findUnique({
            where: { id: Number(activityId) },
        });
        return activity;
    }

    // Verificar se userId existe
    async checkUserExists(userId) {
        const user = await prisma.user.findUnique({
            where: { id: Number(userId) },
        });
        return user;
    }

    // Procurar progresso por ID
    async findById(id) {
        const progress = await prisma.progress.findUnique({
            where: { id: Number(id) },
        });
        return progress;
    }
    
    // Criar um novo progresso
    async create(data) {
        const progress = await prisma.progress.create({
            data,
        });
        return progress;
    }

    async update(id, data) {
        if (!id) throw new Error("ID é obrigatório para atualizar progresso");
    
        const progress = await prisma.progress.update({
            where: { id: Number(id) },
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
