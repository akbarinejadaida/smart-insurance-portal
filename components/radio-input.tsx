"use client";
import React from "react";
import { CustomFieldInterface } from "./form-maker";

interface RadioInputProps {
  form: any;
  item: CustomFieldInterface;
}

export default function RadioInput({ form, item }: RadioInputProps) {
  const { id, label, options = [], parentValue, parentError, formikId } = item;
  const selectedValue = parentValue[id];

  const handleChange = (optItem: string) => {
    form.setFieldValue(formikId, optItem);
  };

  return (
    <div>
      <span className="text-foreground">{label}</span>

      <div className="flex items-center gap-6 h-10">
        {options.map((optItem) => (
          <label key={optItem} className="flex items-center gap-2 text-sm">
            <input
              type="radio"
              checked={selectedValue === optItem}
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
