import { PrismaClient } from "@prisma/client";

export default defineEventHandler(async (event) => {
  const prisma = new PrismaClient();
  await prisma.$connect();

  const todo = await prisma.toDo.findMany({
    orderBy: {
      done: "desc",
    },
  });

  await prisma.$disconnect();

  return { status: 200, data: [...todo] };
});
