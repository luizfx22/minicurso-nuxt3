import { PrismaClient, ToDo } from "@prisma/client";

export default defineEventHandler(async (event) => {
  const prisma = new PrismaClient();
  await prisma.$connect();

  const id = getRouterParam(event, "id");

  const body = await readBody<ToDo>(event);

  if (!id) return { status: 400, data: { message: "No `id` provided" } };

  const numberId = Number(id);

  if (Number.isNaN(numberId))
    return { status: 400, data: { message: "Invalid `id` provided" } };

  const todo = await prisma.toDo.update({
    where: { id: numberId },
    data: { ...body },
  });

  await prisma.$disconnect();

  return { status: 200, data: { ...todo } };
});
