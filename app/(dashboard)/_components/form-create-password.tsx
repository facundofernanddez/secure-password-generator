"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { generatePassword, PasswordConfig } from "@/lib/password";
import { CopyIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function FormCreatePassword() {
  const [password, setPassword] = useState("");

  const form = useForm<PasswordConfig>({
    defaultValues: {
      length: 12,
      hasLowercase: true,
      hasUppercase: true,
      hasNumbers: true,
      hasSymbols: true,
    },
  });

  useEffect(() => {
    const generated = generatePassword({
      hasLowercase: true,
      hasUppercase: true,
      hasNumbers: true,
      hasSymbols: true,
      length: 12,
    });
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPassword(generated);
  }, []);

  const handleCopyPassword = () => {
    navigator.clipboard.writeText(password).then(() => {
      toast.success("Contraseña copiada al portapapeles");
    });
  };

  const handleGenerate = () => {
    const values = form.getValues();
    const newPassword = generatePassword(values);
    setPassword(newPassword);
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
              {password}
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

      <Card>
        <CardContent>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Configuracion
          </h2>

          <Form {...form}>
            <form
              className="space-y-6"
              onSubmit={form.handleSubmit(handleGenerate)}
            >
              <FormField
                control={form.control}
                name="length"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Longitud de la contraseña
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        className="text-center text-lg font-semibold"
                        min={4}
                        max={128}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <div className="space-y-3">
                <h3>Incluir caracteres</h3>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
