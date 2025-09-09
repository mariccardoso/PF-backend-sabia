import prisma from "../../prisma/prisma.js";

class UserModel {
  // Obter todos os usuários
  async findAll() {
    const users = await prisma.user.findMany();

    return users;
  }

  // Obter um usuário pelo ID
  async findById(id) {
    const user = await prisma.user.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        progress: true,
      }
    });

    return user;
  }

  // Obter um usuário pelo email
  async findByEmail(email) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  }

  // Criar um novo usuário
  async create(data) {
    const user = await prisma.user.create({
      data,
    });

    return user;
  }

  // Deletar um usuário pelo ID
    async delete(id) {
        await prisma.user.delete({
            where: {
                id: Number(id),
            },
        });
        return true;
    }

}

export default new UserModel();
