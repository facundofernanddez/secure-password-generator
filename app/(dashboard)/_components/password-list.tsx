"use client";

import { useQuery } from "@tanstack/react-query";
import getPasswordAction from "../_actions/get-password.action";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CopyIcon } from "lucide-react";
import { toast } from "sonner";
import PasswordOptionsTags from "./password-options-tags";
import PasswordDeleteDialog from "./password-delete-dialog";

export default function PasswordList() {
  const handleCopyPassword = (password: string) => {
    navigator.clipboard.writeText(password).then(() => {
      toast.success("Contraseña copiada al portapapeles");
    });
  };

  const { data, error, isPending } = useQuery({
    queryKey: ["passwords"],
    queryFn: getPasswordAction,
  });

  if (isPending) {
    return <p className="text-center text-gray-500">Cargando contraseñas...</p>;
  }

  if (error) {
    return (
      <p className="text-center text-red-500">
        Ocurrio un error: {error.message}
      </p>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <section className="text-center space-y-1">
        <h2 className="text-2xl font-bold text-gray-700">
          Mis contraseñas guardadas
        </h2>
        <p className="text-sm text-gray-500">
          Tus contraseñas estan protegidas. Puedes copiarlas cuando lo necesites
        </p>
      </section>

      <section className="space-y-4 ">
        {data.map((data) => (
          <Card key={data.id}>
            <CardContent className="p-4 flex justify-between items-center gap-4">
              <section>
                <p className="font-bold text-gray-800">Titulo: {data.title}</p>
                <p className="text-sm text-gray-500 my-2">
                  Longitud contraseña:{" "}
                  <span className="font-bold">{data.length}</span>
                </p>
                <PasswordOptionsTags passwordConfig={data} />
              </section>

              <section className="flex flex-col space-y-2">
                <Button
                  className="cursor-pointer"
                  onClick={() => {
                    handleCopyPassword(data.decryptedPassword);
                  }}
                >
                  <CopyIcon />
                  Copiar
                </Button>
                <PasswordDeleteDialog id={data.id} />
              </section>
            </CardContent>
          </Card>
        ))}
      </section>
    </div>
  );
}
