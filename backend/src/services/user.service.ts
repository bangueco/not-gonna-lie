import prisma from "../utils/lib/prisma";

const getAllUsers = async () => {
  return await prisma.user.findMany({})
}

const findById = async (id: number) => {
  return await prisma.user.findUnique({where: {id}})
}

const findByUsername = async (username: string) => {
  return await prisma.user.findUnique({where: {username}})
}

const create = async (username: string, password: string) => {
  return await prisma.user.create({data: {username, password}})
}

export default {
  getAllUsers,
  findById,
  findByUsername,
  create
}