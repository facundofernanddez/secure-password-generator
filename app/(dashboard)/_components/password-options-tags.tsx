"use client";

import { Badge } from "@/components/ui/badge";
import { PasswordConfig } from "@/lib/password";

interface Props {
  passwordConfig: PasswordConfig;
}

export default function PasswordOptionsTags({ passwordConfig }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      {[
        {
          condition: passwordConfig.hasLowercase,
          label: "Minúsculas",
        },
        {
          condition: passwordConfig.hasUppercase,
          label: "Mayúsculas",
        },
        {
          condition: passwordConfig.hasNumbers,
          label: "Números",
        },
        {
          condition: passwordConfig.hasSymbols,
          label: "Símbolos",
        },
      ]
        .filter((item) => item.condition)
        .map((item, index) => (
          <Badge key={index}>{item.label}</Badge>
        ))}
    </div>
  );
}
