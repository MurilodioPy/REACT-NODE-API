import pkg from 'http-status';
const { OK, UNPROCESSABLE_ENTITY, CREATED } = pkg;

import prisma from '../../prismaClient.js';

const getAll = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    return res.status(OK).send(users);
  } catch (err) {
    console.error(err);
    return res.status(UNPROCESSABLE_ENTITY).send({ error: 'Erro ao buscar usuários' });
  }
};

const create = async (req, res) => {
  const { firstName, lastName } = req.body;

  if (!firstName || !lastName) {
    return res.status(UNPROCESSABLE_ENTITY).send({ error: 'Nome e sobrenome são obrigatórios' });
  }

  try {
    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
      },
    });

    return res.status(CREATED).send(user);
  } catch (error) {
    console.error(error);
    return res.status(UNPROCESSABLE_ENTITY).send({ error: 'Erro ao criar usuário' });
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName } = req.body;

  if (!firstName || !lastName) {
    return res.status(UNPROCESSABLE_ENTITY).send({ error: 'Nome e sobrenome são obrigatórios' });
  }

  try {
    const user = await prisma.user.update({
      data: { firstName, lastName },
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

export default { getAll, create, update, deleteEntity };
