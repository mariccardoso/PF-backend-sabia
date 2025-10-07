import ProgressModel from "../models/progress.model.js";

class ProgressController {
// Listar todos os progressos
async getAllProgress(req, res) {
    let { activityId, userId, status, page = 1, limit = 10 } = req.query;

    try {
        // Converter para números válidos
        if (activityId !== undefined) {
            const id = Number(activityId);
            if (isNaN(id)) return res.status(400).json({ error: "activityId inválido" });
            activityId = id;
        }

        if (userId !== undefined) {
            const id = Number(userId);
            if (isNaN(id)) return res.status(400).json({ error: "userId inválido" });
            userId = id;
        }

        // Garantir que page e limit sejam números
        page = Number(page);
        limit = Number(limit);

        const progress = await ProgressModel.findAll(
            activityId,
            userId,
            status,
            page,
            limit
        );

        res.json(progress);
    } catch (error) {
        console.error("Erro ao listar progressos:", error);
        res.status(500).json({ error: "Erro ao listar progressos" });
    }
}

    // Procurar progresso por ID
    async getProgressById(req, res) {
        const progressId = req.params.id;
        try {
            const progress = await ProgressModel.findById(progressId);
            if (!progress) {
                return res.status(404).json({ error: "Progresso não encontrado" });
            }
            res.json(progress);
        } catch (error) {
            console.error("Erro ao buscar progresso por ID:", error);
            res.status(500).json({ error: "Erro ao buscar progresso por ID" });
        }
    }

    // Criar novo progresso
    async createProgress(req, res) {
            try {
                const {
                    activityId,
                    userId,
                    status,
                    score,
                    completedAt
                } = req.body;

                // Validação básica
                if (!activityId || !userId) {
                    return res.status(400).json({
                        error: "Os campos atividadeId, userId, status, score e completedAt são obrigatórios!",
                    });
                }

                // Verificar se activityId existe
                const activity = await ProgressModel.checkActivityExists(activityId);
                if (!activity) {
                    return res.status(400).json({ error: "activityId não existe!" });
                }

                // Verificar se userId existe
                const user = await ProgressModel.checkUserExists(userId);
                if (!user) {
                    return res.status(400).json({ error: "userId não existe!" });
                }

                // Criar objeto do progresso
                const data = {
                    activityId,
                    userId,
                    status,
                    score,
                    completedAt
                };

                // Criar progresso
                const progress = await ProgressModel.create(data);

                return res.status(201).json({
                    message: "Progresso criado com sucesso!",
                    progress,
                });
            } catch (error) {
                console.error("Erro ao criar um novo progresso: ", error);
                res.status(500).json({ error: "Erro ao criar um novo progresso" });
            }
    }

    // Atualizar progresso

    async updateProgress(req, res) {
        const progressId = req.params.id;
    
        if (!progressId) {
            return res.status(400).json({ error: "ID do progresso é obrigatório" });
        }
    
        const { status, score, completedAt } = req.body;
    
        try {
            const existingProgress = await ProgressModel.update(progressId, {
                status,
                score,
                completedAt: completedAt || new Date(),
            });
    
            if (!existingProgress) {
                return res.status(404).json({ error: "Progresso não encontrado" });
            }
    
            return res.json({ message: "Progresso atualizado com sucesso!", progress: existingProgress });
        } catch (error) {
            console.error("Erro ao atualizar o progresso: ", error);
            res.status(500).json({ error: "Erro ao atualizar o progresso" });
        }
    }

    // Deletar progresso
    async deleteProgress(req, res) {
        const progressId = req.params.id;
        try {
            // Verificar se o progresso existe
            const existingProgress = await ProgressModel.delete(progressId);
            if (!existingProgress) {
                return res.status(404).json({ error: "Progresso não encontrado" });
            }
            return res.json({ message: "Progresso deletado com sucesso!" });
        } catch (error) {
            console.error("Erro ao deletar o progresso: ", error);
            res.status(500).json({ error: "Erro ao deletar o progresso" });
        }
    }
}

export default new ProgressController();
