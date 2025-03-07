"use client";
import { cn, generateInitialValuesAndValidation } from "@/lib/utils";
import { FormikErrors, useFormik } from "formik";
import React, { useCallback, useMemo } from "react";
import FormMaker, { FormMakerInterface } from "./form-maker";
import * as Yup from "yup";

export interface FormWrapperInterface {
  forms: FormMakerInterface["fields"];
  className?: string;
}

export default function FormWrapper({
  forms,
  className,
}: FormWrapperInterface) {
  const { initialValues, validationSchema } = useCallback(
    () => generateInitialValuesAndValidation(forms),
    [forms]
  )();

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object(validationSchema),
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const updatedForms = useMemo(() => {
    return forms.map((item) => {
      const parentError = formik.errors?.[item.formId] ?? {};
      const parentValue = formik.values?.[item.formId] ?? {};

      const updatedFields = item.fields.map((field) => {
        const fieldError = (parentError as FormikErrors<any>)?.[field.id] ?? {};
        const fieldValue = parentValue?.[field.id] ?? {};

        return {
          ...field,
          parentValue,
          parentError,
          formikId: `${item.formId}.${field.id}`,
          fields:
            field.fields?.map((innerField) => ({
              ...innerField,
              parentValue: fieldValue,
              parentError: fieldError ?? {},
              formikId: `${item.formId}.${field.id}.${innerField.id}`,
            })) || undefined,
        };
      });

      return {
        ...item,
        formikId: item.formId,
        fields: updatedFields,
      };
    });
  }, [forms, formik.errors, formik.values]);

  return (
    <div className={cn("w-full flex flex-col", className)}>
      <FormMaker fields={updatedForms} form={formik} />

      <button
        type="button"
        className="bg-primary text-primary-foreground p-3 rounded-sm cursor-pointer"
        onClick={() => formik.submitForm()}
      >
        Submit
      </button>
    </div>
  );
}
