"use client";
import React, { useCallback } from "react";
import { cn } from "@/lib/utils";
import { FaArrowRight } from "react-icons/fa";
import TextInput from "./text-input";
import SelectInput from "./select-input";
import RadioInput from "./radio-input";
import CheckboxInput from "./checkbox-input";

export interface FormInterface {
  id: string;
  label: string;
  type: string;
  required?: boolean;
  options?: string[];
  parentValue: any;
  parentError: any;
  formikId: string;
  dynamicOptions?: {
    dependsOn: string;
    endpoint: string;
    method: string;
  };
  visibility?: {
    dependsOn: string;
    condition: string;
    value: string;
  };
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
  };
  fields?: FormInterface[];
}

export interface FormMakerInterface {
  form: any;
  fields: {
    formId: string;
    title: string;
    fields: FormInterface[];
  }[];
  className?: string;
}

export default function FormMaker({
  form,
  fields,
  className,
}: FormMakerInterface) {
  const renderField = useCallback(
    (item: FormInterface) => {
      switch (item.type) {
        case "text":
          return <TextInput form={form} item={item} />;
        case "number":
          return <TextInput form={form} item={item} />;
        case "date":
          return <TextInput form={form} item={item} />;
        case "select":
          return <SelectInput form={form} item={item} />;
        case "radio":
          return <RadioInput form={form} item={item} />;
        case "checkbox":
          return <CheckboxInput form={form} item={item} />;
        case "group":
          return (
            <div className="flex flex-col gap-6 w-full">
              <h3 className="flex items-center gap-4">
                <FaArrowRight size={14} />
                <span>{item.label}</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full gap-6">
                {item.fields?.map((field) => {
                  if (field?.visibility?.dependsOn) {
                    const data =
                      field.parentValue[field?.visibility?.dependsOn];
                    if (data !== field.visibility.value) {
                      return null;
                    }
                  }
                  return (
                    <div key={field.id} className="col-span-1">
                      {renderField(field)}
                    </div>
                  );
                })}
              </div>
            </div>
          );

        default:
          return <div className="w-full">{item.type}</div>;
      }
    },
    [form]
  );

  return (
    <form
      className={cn("w-full flex flex-col gap-3", className)}
      onSubmit={(e) => e?.preventDefault()}
    >
      {fields.map((item) => (
        <div
          key={item.formId}
          className={cn("w-full flex flex-col gap-8 border rounded-sm p-6")}
        >
          <h2>{item.title}</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full gap-6">
            {item.fields.map((field) => {
              if (field?.visibility?.dependsOn) {
                const data = field.parentValue[field?.visibility?.dependsOn];
                if (data !== field.visibility.value) {
                  return null;
                }
              }
              return (
                <div
                  key={field.id}
                  className={cn("col-span-1", {
                    "md:col-span-2 lg:col-span-3": field.type == "group",
                  })}
                >
                  {renderField(field)}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </form>
  );
}
