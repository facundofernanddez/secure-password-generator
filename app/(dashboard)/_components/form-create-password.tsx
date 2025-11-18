"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CopyIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function FormCreatePassword() {
  const [password, setPassword] = useState("");

  const handleCopyPassword = () => {
    navigator.clipboard.writeText(password).then(() => {
      toast.success("Contraseña copiada al portapapeles");
    });
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <header className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-gray-700">
          Generador de contraseñas
        </h1>
        <p className="text-gray-600">
          Crea contraseñas seguras y personalizadas
        </p>
      </header>

      <Card className="bg-linear-to-r from-gray-900 to-gray-800">
        <CardContent className="flex items-center justify-between gap-4">
          <div className="flex-1 min-w-0">
            <p className="text-sm text-slate-400 mb-1">
              Tu contraseña generada:
            </p>

            <p className="text-xl font-mono break-all text-green-400 leading-relaxed">
              S3cur3P@ssw0rd!
            </p>
          </div>

          <Button
            onClick={handleCopyPassword}
            className="shrink-0 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lf transition-all duration-200 hover:scale-105 cursor-pointer"
          >
            <CopyIcon />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
