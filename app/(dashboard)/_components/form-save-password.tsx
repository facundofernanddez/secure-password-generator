"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { SaveIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { passwordSchema, PasswordSchemaType } from "@/schema/password.schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { PasswordConfig } from "@/lib/password";
import PasswordOptionsTags from "./password-options-tags";
import { useMutation } from "@tanstack/react-query";
import createPasswordAction from "../_actions/create-password.action";
import { toast } from "sonner";

interface Props {
  password: string;
  passwordConfig: PasswordConfig;
}

export default function FormSavePassword({ password, passwordConfig }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<PasswordSchemaType>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(passwordSchema) as any,
    defaultValues: {
      title: "",
      password: "",
      length: passwordConfig.length,
      hasLowercase: passwordConfig.hasLowercase ?? true,
      hasUppercase: passwordConfig.hasUppercase ?? false,
      hasNumbers: passwordConfig.hasNumbers ?? false,
      hasSymbols: passwordConfig.hasSymbols ?? false,
    },
  });

  function onSubmit(data: PasswordSchemaType) {
    mutate(data);
  }

  useEffect(() => {
    if (isOpen) {
      form.setValue("password", password);
      form.setValue("length", passwordConfig.length);
      form.setValue("hasLowercase", passwordConfig.hasLowercase);
      form.setValue("hasUppercase", passwordConfig.hasUppercase);
      form.setValue("hasNumbers", passwordConfig.hasNumbers);
      form.setValue("hasSymbols", passwordConfig.hasSymbols);
    }
  }, [isOpen, password, passwordConfig, form]);

  const { mutate, isPending } = useMutation({
    mutationFn: createPasswordAction,
    async onSuccess(data) {
      form.reset();

      toast.success(`Contraseña "${data.title}" creada con éxito`);

      setIsOpen(false);

      //TODO: revalidar data
    },
    onError(error) {
      toast.error(`Error: ${error.message}`);
    },
  });

  return (
    <Dialog
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="w-full"
        >
          <SaveIcon /> Guardar contraseña
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center gap-2">
            <SaveIcon /> Guardar contraseña
          </DialogTitle>
          <DialogDescription>
            Guarda tu constraseña de forma segura con toda su configuración.
          </DialogDescription>
        </DialogHeader>
        <section className="space-y-6">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8"
            >
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Titulo de la contraseña</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ej: Google, Facebook, Instagram..."
                        {...field}
                        className="h-12"
                      />
                    </FormControl>
                  </FormItem>
                )}
              ></FormField>

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Titulo de la contraseña</FormLabel>
                    <FormControl>
                      <Input
                        disabled
                        {...field}
                        className="h-12 bg-gray-100 font-mono text-gray-800"
                      />
                    </FormControl>
                  </FormItem>
                )}
              ></FormField>

              <div className="bg-linear-to-r from-blue-50 to-indigo-50 border-gray-200 rounded-xl p-4">
                <h3 className="text-sm font-semibold text-blue-800 mb-3">
                  Configuracion aplicada
                </h3>
                <div className="space-y-4 text-sm">
                  <p>
                    <span className="font-bold">Longitud: </span>
                    {password.length} caracteres
                  </p>
                  <PasswordOptionsTags passwordConfig={passwordConfig} />
                </div>
              </div>
            </form>
          </Form>
        </section>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DialogClose>
          <Button
            disabled={isPending}
            type="submit"
            onClick={form.handleSubmit(onSubmit)}
          >
            Guardar contraseña
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
