import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { FormWrapperInterface } from "@/components/form-wrapper";
import * as Yup from 'yup';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}


export function generateInitialValuesAndValidation(forms: FormWrapperInterface["forms"]) {
  const initialValues: Record<string, any> = {};
  const validationSchema: Record<string, any> = {};

  forms.forEach((form) => {
    const formValues: any = {};
    const formValidation: any = {};

    form.fields.forEach((field) => {
      let fieldValidation: any;

      if (field.type === "group" && field.fields) {
        const groupValues: any = {};
        const groupValidation: any = {};

        field.fields.forEach((subField) => {
          groupValues[subField.id] = subField.type === "checkbox" ? [] : "";

          let subFieldValidation: any = subField.type === "checkbox"
            ? Yup.array().min(1, "required")
            : Yup.string();

          if (subField.required) {
            subFieldValidation = subFieldValidation.required("required");
          }

          if (subField.visibility) {
            const dependantKey = `${subField.visibility.dependsOn}`;

            subFieldValidation = subFieldValidation.when(dependantKey, {
              is: (value: any) => value === subField.visibility?.value,
              then: (schema: any) => schema.required("required"),
              otherwise: (schema: any) => schema.notRequired(),
            });
          }

          if (subField.type === "number" && subField.validation) {
            subFieldValidation = Yup.number();
            if (subField.validation.min !== undefined) {
              subFieldValidation = subFieldValidation.min(
                subField.validation.min,
                `${subField.label} must be at least ${subField.validation.min}`
              );
            }
            if (subField.validation.max !== undefined) {
              subFieldValidation = subFieldValidation.max(
                subField.validation.max,
                `${subField.label} must not exceed ${subField.validation.max}`
              );
            }
            if (subField.validation.pattern) {
              subFieldValidation = subFieldValidation.test(
                "pattern",
                `${subField.label} format is invalid`,
                (value: string) => new RegExp(subField.validation!.pattern!).test(String(value))
              );
            }
          }

          groupValidation[subField.id] = subFieldValidation;
        });

        formValues[field.id] = groupValues;
        formValidation[field.id] = Yup.object(groupValidation);
      } else {
        formValues[field.id] = field.type === "checkbox" ? [] : "";

        fieldValidation = field.type === "checkbox"
          ? Yup.array().min(1, "required")
          : Yup.string();

        if (field.required) {
          fieldValidation = fieldValidation.required("required");
        }

        if (field.visibility) {
          const dependantKey = `${field.visibility.dependsOn}`;

          fieldValidation = fieldValidation.when(dependantKey, {
            is: (value: any) => value === field.visibility?.value,
            then: (schema: any) => schema.required("required"),
            otherwise: (schema: any) => schema.notRequired(),
          });
        }

        if (field.type === "number" && field.validation) {
          fieldValidation = Yup.number();
          if (field.validation.min !== undefined) {
            fieldValidation = fieldValidation.min(
              field.validation.min,
              `${field.label} must be at least ${field.validation.min}`
            );
          }
          if (field.validation.max !== undefined) {
            fieldValidation = fieldValidation.max(
              field.validation.max,
              `${field.label} must not exceed ${field.validation.max}`
            );
          }
          if (field.validation.pattern) {
            fieldValidation = fieldValidation.test(
              "pattern",
              `${field.label} format is invalid`,
              (value: string) => new RegExp(field.validation!.pattern!).test(String(value))
            );
          }
        }

        formValidation[field.id] = fieldValidation;
      }
    });

    initialValues[form.formId] = formValues;
    validationSchema[form.formId] = Yup.object(formValidation);
  });

  return { initialValues, validationSchema };
}
