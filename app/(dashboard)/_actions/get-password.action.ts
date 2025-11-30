"use server";

import { cryptr } from "@/lib/crypt";
import { prisma } from "@/lib/prisma";

export default async function getPasswordAction() {
  const passwords = prisma.password.findMany();

  return (await passwords).map((item) => ({
    ...item,
    decryptedPassword: cryptr.decrypt(item.encryptedPassword),
  }));
}
