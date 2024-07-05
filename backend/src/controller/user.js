import pkg from 'http-status';
const { OK, UNPROCESSABLE_ENTITY } = pkg;

import prisma from '../../prismaClient.js';

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) },
    });
    res.status(OK).send(user);
  } catch (error) {
    console.error(error);
    res.status(UNPROCESSABLE_ENTITY).send("Erro na requisição");
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name, lastName } = req.body;

  if (!name || !lastName) {
    return res.status(UNPROCESSABLE_ENTITY).send({ error: 'Nome e sobrenome são obrigatórios' });
  }

  try {
    const user = await prisma.user.update({
      data: { name, lastName },
      where: { id: parseInt(id) },
    });

    return res.status(OK).send(user);
  } catch (error) {
    console.error(error);
    return res.status(UNPROCESSABLE_ENTITY).send({ error: 'Erro ao atualizar usuário' });
  }
};

const deleteEntity = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.user.delete({
      where: { id: parseInt(id) },
    });

    return res.status(OK).send({ message: 'Usuário removido com sucesso!' });
  } catch (error) {
    console.error(error);
    return res.status(UNPROCESSABLE_ENTITY).send({ error: 'Erro ao remover usuário' });
  }
};

export default { getUserById, update, deleteEntity };
