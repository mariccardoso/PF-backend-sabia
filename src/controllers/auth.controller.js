import UserModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

class AuthController {
  // Listar todos os usuários
  async getAllUsers(req, res) {
    try {
      const users = await UserModel.findAll();
      res.json(users);
    } catch (error) {
      console.error("Erro ao listar usuários:", error);
      res.status(500).json({ error: "Erro ao listar usuários" });
    }
  }

  // Registrar novo usuário
  async register(req, res) {
    try {
      const {
        username,
        name,
        email,
        password,
        role,
        bio
      } = req.body;
      // Validação básica
      if (!email || !password || !name || !role) {
        return res
          .status(400)
          .json({ error: "Os campos nome de usuário, nome, email, senha e papel são obrigatórios!" });
      }

      // Verificar se o usuário já existe
      const userExists = await UserModel.findByEmail(email);
      if (userExists) {
        return res.status(400).json({ error: "Este email já está em uso!" });
      }

      // Hash da senha
      const hashedPassword = await bcrypt.hash(password, 10);

      // Criar objeto do usuário
      const data = {
        username,
        name,
        email,
        password: hashedPassword,
        role,
        bio
      };

      // Criar usuário
      const user = await UserModel.create(data);

      return res.status(201).json({
        message: "Usuário criado com sucesso!",
        user,
      });
    } catch (error) {
      console.error("Erro ao criar um novo usuário: ", error);
      res.status(500).json({ error: "Erro ao criar um novo usuário" });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;

      // Validação básica
      if (!email || !password) {
        return res
          .status(400)
          .json({ error: "Os campos email e senha são obrigatórios!" });
      }

      // Verificar se o usuário existe
      const userExists = await UserModel.findByEmail(email);
      if (!userExists) {
        return res.status(401).json({ error: "Credenciais inválidas!" });
      }

      // Verificar senha
      const isPasswordValid = await bcrypt.compare(
        password,
        userExists.password
      );
      if (!isPasswordValid) {
        return res.status(401).json({ error: "Credenciais inválidas!" });
      }

      // Gerar Token JWT
      const token = jwt.sign(
        {
          id: userExists.id,
          // displayName: userExists.displayName,
          email: userExists.email,

        },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: "24h",
        }
      );

      return res.json({
        message: "Login realizado com sucesso!",
        token,
        userExists,
      });
    } catch (error) {
      console.error("Erro ao fazer login: ", error);
      res.status(500).json({ error: "Erro ao fazer login!" });
    }
  }

  async getProfile(req, res) {
    try {
      // Valida se o middleware populou req.user
      if (!req.user || !req.user.id) {
        return res.status(401).json({ error: "Usuário não autenticado" });
      }
  
      const userId = req.user.id;
  
      // Corrigido findById
      const user = await UserModel.findById(userId);
  
      if (!user) {
        return res.status(404).json({ error: "Usuário não encontrado!" });
      }
  
      res.json(user);
    } catch (error) {
      console.error("Erro ao obter perfil do usuário:", error);
      res.status(500).json({ error: "Erro ao obter perfil do usuário" });
    }
  }

  async deleteUser(req, res) {
    try {
      const { id } = req.params;
      const user = await UserModel.findById(id);
      if (!user) {
        return res.status(404).json({ error: "Usuário não encontrado!" });
      }
      await UserModel.delete(id);
      res.json({ message: "Usuário deletado com sucesso!" });
    } catch (error) {
      console.error("Erro ao deletar usuário:", error);
      res.status(500).json({ error: "Erro ao deletar usuário" });
    }
  }
}

export default new AuthController();
