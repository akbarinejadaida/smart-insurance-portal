"use client";
import React, { useCallback } from "react";
import { cn } from "@/lib/utils";
import SelectInput from "./select-input";
import TextInput from "./text-input";

export interface OptionType {
  label: string | React.ReactNode;
  value: string;
  extraInfo?: string;
}

export interface FormMakerInterface {
  form: any;
  fields: {
    component: "text" | "select" | "textarea" | "non-field";
    placeholder?: string;
    labelClassName?: string;
    label?: string | React.ReactNode;
    key: string;
    type?: string;
    options?: OptionType[];
    className?: string;
    icon?: string | React.ReactNode;
    defaultValue?: string | null;
    children?: React.ReactNode;
  }[];
  className?: string;
}

export default function FormMaker({
  form,
  fields,
  className,
}: FormMakerInterface) {
  const renderField = useCallback(
    (item: any) => {
      switch (item.component) {
        case "select":
          return <SelectInput form={form} item={item} />;
        case "text":
          return <TextInput item={item} form={form} />;
        case "textarea":
          return (
            <textarea
              key={item.key}
              placeholder={item.placeholder}
              onChange={(e: any) =>
                form.setFieldValue(item.key, e.target.value)
              }
              rows={5}
              className={cn(
                "text-subtitle text-sm w-full rounded-sm py-2 px-3 outline-none",
                item.labelClassName
              )}
            />
          );
        default:
          return null;
      }
    },
    [form]
  );

  return (
    <form
      className={cn("w-full gap-x-4 gap-y-6 grid grid-cols-12", className)}
      onSubmit={(e) => e?.preventDefault()}
    >
      {fields.map((item) => (
        <div
          key={item.key}
          className={cn("relative outline-none w-full", item.className)}
          style={item.style}
        >
          {renderField(item)}

          {item.component !== "non-field" ? (
            <small className="absolute text-destructive -bottom-2">
              {form.errors[item.key] || form.touched[item.key]
                ? form.errors[item.key]
                : ""}
            </small>
          ) : (
            item.children
          )}
        </div>
      ))}
    </form>
  );
}
