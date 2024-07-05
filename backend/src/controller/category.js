import pkg from 'http-status';
const { OK, UNPROCESSABLE_ENTITY, CREATED } = pkg;

import prisma from '../../prismaClient.js';

const getAll = async (req, res) => {
  try {
    const categories = await prisma.category.findMany();
    return res.status(OK).send(categories);
  } catch (err) {
    console.error(err);
    return res.status(UNPROCESSABLE_ENTITY).send({ error: 'Erro ao buscar categorias' });
  }
};

const create = async (req, res) => {
  const { description } = req.body;

  if (!description) {
    return res.status(UNPROCESSABLE_ENTITY).send({ error: 'Descrição é obrigatória' });
  }

  try {
    const category = await prisma.category.create({
      data: {
        description,
      },
    });

    return res.status(CREATED).send(category);
  } catch (error) {
    console.error(error);
    return res.status(UNPROCESSABLE_ENTITY).send({ error: 'Erro ao criar categoria' });
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  const { description } = req.body;

  if (!description) {
    return res.status(UNPROCESSABLE_ENTITY).send({ error: 'Descrição é obrigatória' });
  }

  try {
    const category = await prisma.category.update({
      data: { description },
      where: { id: parseInt(id) },
    });

    return res.status(OK).send(category);
  } catch (error) {
    console.error(error);
    return res.status(UNPROCESSABLE_ENTITY).send({ error: 'Erro ao atualizar categoria' });
  }
};

const deleteEntity = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.category.delete({
      where: { id: parseInt(id) },
    });

    return res.status(OK).send({ message: 'Categoria removida com sucesso!' });
  } catch (error) {
    console.error(error);
    return res.status(UNPROCESSABLE_ENTITY).send({ error: 'Erro ao remover categoria' });
  }
};

export default { getAll, create, update, deleteEntity };
