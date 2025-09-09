import ActivityModel from "../models/activity.model.js";

class ActivityController {
    // Listar todos os atividades
    async getAllActivities(req, res) {
        const title = req.query.title;
        const difficulty = req.query.difficulty
        const page = req.query.page || 1;
        const limit = req.query.limit || 10;

        try {
            const activities = await ActivityModel.findAll(
                title,
                difficulty,
                page,
                limit 
            );
            res.json(activities);
        } catch (error) {
            console.error("Erro ao listar atividades:", error);
            res.status(500).json({ error: "Erro ao listar atividades" });
        }
    }

    // Criar novo atividade
    async createActivity(req, res) {
        try {
            const {
                title,
                description,
                difficulty,
                type
            } = req.body;

            // Validação básica
            if (!title || !description || !difficulty || !type) {
                return res
                    .status(400)
                    .json({
                        error:
                            "Os campos título, descrição, dificuldade e tipo são obrigatórios!",
                    });
            }
            // Criar objeto do atividade
            const data = {
                title,
                description,
                type,
                difficulty
            };

            // Criar atividade
            const activity = await ActivityModel.create(data);

            return res.status(201).json({
                message: "Atividade criada com sucesso!",
                activity,
            });
        } catch (error) {
            console.error("Erro ao criar uma nova atividade: ", error);
            res.status(500).json({ error: "Erro ao criar uma nova atividade" });
        }
    }

    async updateActivity(req, res) {
        try {
            const { id } = req.params;
            const {
                title,
                description,
                difficulty,
                type
            } = req.body;

            // Atualizar atividade
            const activity = await ActivityModel.update(id, {
                title,
                description,
                difficulty,
                type
            });

            if (!activity) {
                return res.status(404).json({ error: "Atividade não encontrada" });
            }

            res.json({
                message: "Atividade atualizada com sucesso!",
                activity
            });
        } catch (error) {
            console.error("Erro ao atualizar a atividade: ", error);
            res.status(500).json({ error: "Erro ao atualizar a atividade" });
        }
    }

    // Excluir um atividade
    async deleteActivity(req, res) {
        try {
            const { id } = req.params;  
            await ActivityModel.delete(id);
            res.json({ message: "Atividade excluída com sucesso!" });
        }
        catch (error) {
            console.error("Erro ao excluir a atividade: ", error);
            res.status(500).json({ error: "Erro ao excluir a atividade" });
        }
    }
}

export default new ActivityController();
