import pkg from 'http-status';
const { OK, UNPROCESSABLE_ENTITY, CREATED } = pkg;

import prisma from '../../prismaClient.js';

const getAll = async (req, res) => {
  try {
    const activities = await prisma.activity.findMany({
      include: {
        user: true,
        category: true,
      },
    });

    return res.status(OK).send(activities);
  } catch (err) {
    console.error(err);
    return res.status(UNPROCESSABLE_ENTITY).send({ error: 'Erro ao buscar atividades' });
  }
};

const create = async (req, res) => {
  const { description, userId, categoryId } = req.body;

  if (!description || !userId || !categoryId) {
    return res.status(UNPROCESSABLE_ENTITY).send({ error: 'Todos os campos são obrigatórios' });
  }

  try {
    const activity = await prisma.activity.create({
      data: {
        description: description,
        userId: userId, // O usuário logado
        categoryId: categoryId,
      },
    });

    return res.status(CREATED).send(activity);
  } catch (e) {
    console.error(e);
    console.log(e);
    return res.status(UNPROCESSABLE_ENTITY).send({ error: 'Erro ao criar atividade' });
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  const { description } = req.body;

  if (!description) {
    return res.status(UNPROCESSABLE_ENTITY).send({ error: 'Descrição obrigatória' });
  }

  try {
    const activity = await prisma.activity.update({
      data: { description },
      where: { id: parseInt(id) },
    });

    return res.status(OK).send(activity);
  } catch (error) {
    console.error(error);
    return res.status(UNPROCESSABLE_ENTITY).send({ error: 'Erro ao atualizar atividade' });
  }
};

const deleteEntity = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.activity.delete({
      where: { id: parseInt(id) },
    });

    return res.status(OK).send({ message: 'Atividade removida com sucesso!' });
  } catch (error) {
    console.error(error);
    return res.status(UNPROCESSABLE_ENTITY).send({ error: 'Erro ao remover atividade' });
  }
};

export default { getAll, create, update, deleteEntity };
