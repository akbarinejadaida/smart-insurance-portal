"use client";
import React from "react";
import { FormInterface } from "./form-maker";

export default function TextInput({
  form,
  item,
}: {
  form: any;
  item: FormInterface;
}) {
  return (
    <>
      <span className="text-foreground">{item.label}</span>
      <input
        key={item.id}
        placeholder={item.label}
        value={item.parentValue[item.id] || ""}
        type={item.type}
        onChange={(e: any) => form.setFieldValue(item.formikId, e.target.value)}
        className="text-muted border border-border text-sm w-full h-10 placeholder:text-sm leading-4 placeholder:text-muted outline-none px-3 py-2 rounded-sm"
      />
      <small className="text-negative">{item.parentError?.[item.id]}</small>
    </>
  );
}
