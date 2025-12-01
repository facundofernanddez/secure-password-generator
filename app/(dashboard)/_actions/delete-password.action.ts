"use server";

import { prisma } from "@/lib/prisma";

export default async function deletePasswordAction(id: string) {
  return await prisma.password.delete({
    where: { id },
  });
}
