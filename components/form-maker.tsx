"use client";
import React, { useCallback, useMemo } from "react";
import { cn, generateInitialValuesAndValidation } from "@/lib/utils";
import { FaArrowRight } from "react-icons/fa";
import TextInput from "./text-input";
import SelectInput from "./select-input";
import RadioInput from "./radio-input";
import CheckboxInput from "./checkbox-input";
import { useFormik } from "formik";
import { submitForm } from "@/api/insurance-forms";

interface FieldInterface {
  id: string;
  label: string;
  type: string;
  required?: boolean;
  options?: string[];
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
}

interface FormInterface extends FieldInterface {
  fields?: FormInterface[];
}

export interface CustomFieldInterface extends FieldInterface {
  parentValue: any;
  parentError: any;
  formikId: string;
  fields?: CustomFieldInterface[];
}

export interface FormMakerInterface {
  fields: {
    formId: string;
    title: string;
    fields: FormInterface[];
  };
  className?: string;
}

export default function FormMaker({ fields, className }: FormMakerInterface) {
  const { initialValues, validationSchema } = useCallback(
    () => generateInitialValuesAndValidation(fields),
    [fields]
  )();

  const form = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      submitForm(values);
    },
  });

  const renderField = useCallback(
    (item: CustomFieldInterface) => {
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

  const customFields: CustomFieldInterface[] = useMemo(() => {
    return fields.fields.map((field) => {
      const fieldError = form.errors?.[field.id] ?? {};
      const fieldValue = form.values?.[field.id] ?? {};

      return {
        ...field,
        parentValue: form.values,
        parentError: form.errors,
        formikId: field.id,
        fields:
          (field.fields?.map((innerField) => ({
            ...innerField,
            parentValue: fieldValue,
            parentError: fieldError ?? {},
            formikId: `${field.id}.${innerField.id}`,
          })) as CustomFieldInterface["fields"]) || undefined,
      };
    });
  }, [fields, form.errors, form.values]);

  return (
    <form
      className={cn("w-full flex flex-col gap-3", className)}
      onSubmit={form.handleSubmit}
    >
      <h2>{fields.title}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full gap-6">
        {customFields.map((field) => {
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

      <button
        type="submit"
        className="bg-primary text-primary-foreground p-3 rounded-sm cursor-pointer w-fit"
      >
        Submit {fields.title}
      </button>
    </form>
  );
}
