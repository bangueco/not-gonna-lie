import prisma from "../utils/lib/prisma";

const getConfessionsForUser = async (id: number) => {
  return await prisma.confession.findMany({where: {userId: id}})
}

const createConfession = async (confession: string, id: number) => {
  return await prisma.confession.create({data: {
    confession: confession,
    userId: id
  }})
}

const deleteConfession = async (id: number) => {
  return await prisma.confession.delete({where: {id}})
}

export default {
  getConfessionsForUser,
  createConfession,
  deleteConfession
}