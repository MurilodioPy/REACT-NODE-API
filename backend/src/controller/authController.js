import bcrypt from 'bcryptjs';
import prisma from '../../prismaClient.js';
import generateToken from '../utils/generateToken.js';

export const register = async (req, res) => {
  const { name, lastName, email, password } = req.body;

  console.log(req.body);

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        name,
        lastName,
        email,
        password: hashedPassword,
      },
    });

    const token = generateToken(user.id);

    res.status(201).json({ token });
  } catch (error) {
    res.status(400).json({ error: 'Erro ao registrar usuário' });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Senha incorreta' });
    }

    const token = generateToken(user.id);
    

    res.json({ token: token, userId: user.id});
  } catch (error) {
    res.status(500).json({ error: 'Erro ao fazer login' });
  }
};
