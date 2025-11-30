"use server";

import { cryptr } from "@/lib/crypt";
import { prisma } from "@/lib/prisma";

import { passwordSchema, PasswordSchemaType } from "@/schema/password.schema";

export default async function createPasswordAction(
  newPassword: PasswordSchemaType
) {
  const parseBody = passwordSchema.safeParse(newPassword);

  if (!parseBody.success) {
    throw new Error(
      `Validation failed: ${parseBody.error.issues
        .map((e) => e.message)
        .join(", ")}`
    );
  }

  const { password, ...restBody } = parseBody.data;

  const encryptedPassword = cryptr.encrypt(password);

  return await prisma.password.create({
    data: {
      ...restBody,
      encryptedPassword,
    },
  });
}
