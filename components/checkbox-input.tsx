"use client";
import React from "react";
import { CustomFieldInterface } from "./form-maker";

interface CheckboxInputProps {
  form: any;
  item: CustomFieldInterface;
}

export default function CheckboxInput({ form, item }: CheckboxInputProps) {
  const { id, label, options = [], parentValue, parentError, formikId } = item;
  const selectedValues: string[] = parentValue[id] || [];

  const handleChange = (optItem: string) => {
    const newResult = selectedValues.includes(optItem)
      ? selectedValues.filter((value) => value !== optItem)
      : [...selectedValues, optItem];

    form.setFieldValue(formikId, newResult);
  };

  return (
    <div>
      <span className="text-foreground">{label}</span>

      <div className="flex items-center gap-6 h-10">
        {options.map((optItem) => (
          <label key={optItem} className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={selectedValues.includes(optItem)}
              onChange={() => handleChange(optItem)}
            />

            {optItem}
          </label>
        ))}
      </div>

      {parentError?.[id] && (
        <small className="text-negative">{parentError[id]}</small>
      )}
    </div>
  );
}
