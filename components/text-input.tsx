import React from "react";
import { FormMakerInterface } from "./form-maker";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function TextInput({
  form,
  item,
}: {
  form: any;
  item: FormMakerInterface["fields"][0];
}) {
  return (
    <>
      <input
        key={item.key}
        placeholder={item.placeholder}
        value={form.values[item.key] || ""}
        type={item.type}
        onChange={(e: any) => form.setFieldValue(item.key, e.target.value)}
        className={cn(
          "text-muted border border-border text-sm w-full h-10 placeholder:text-sm leading-4 placeholder:text-muted outline-none px-3 py-2 rounded-sm",
          item.labelClassName,
          {
            "pl-9": item.icon,
          }
        )}
      />
      {item.icon && typeof item.icon == "string" ? (
        <Image
          src={item.icon}
          alt={item.key}
          width={20}
          height={20}
          className="absolute left-2.5 top-2.5"
        />
      ) : item.icon && typeof item.icon != "string" ? (
        <div className="absolute left-2.5 top-2.5">{item.icon}</div>
      ) : (
        <></>
      )}
    </>
  );
}
