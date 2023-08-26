import { PrismaClient, ToDo } from "@prisma/client";

export default defineEventHandler(async (event) => {
  const prisma = new PrismaClient();
  await prisma.$connect();

  const body = await readBody<ToDo>(event);

  const todo = await prisma.toDo.create({
    data: { ...body },
  });

  await prisma.$disconnect();

  event.node.res.statusCode = 201;

  return { status: 201, data: { ...todo } };
});
