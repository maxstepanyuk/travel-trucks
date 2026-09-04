"use client";

import { Field, Form, Formik, FormikHelpers } from "formik";
import { useId } from "react";

import css from "./FiltersForm.module.css";

// to render create form
// todo: mv to types.ts
interface FiltersResponse {
  forms: string[];
  transmissions: string[];
  engines: string[];
}
// todo: get from api
const filtersResponse: FiltersResponse = {
  forms: ["alcove", "panel_van", "integrated", "semi_integrated"],
  transmissions: ["automatic", "manual"],
  engines: ["diesel", "petrol", "hybrid", "electric"],
};

// to set form
interface FiltersFormValues {
  location: string;
  form: string;
  transmission: string;
  engine: string;
}
const initialFiltersFormValues: FiltersFormValues = {
  location: "",
  form: "",
  transmission: "",
  engine: "",
};

// todo: mv to util.ts
function toFirstUpperLetter(label: string): string {
  return label.charAt(0).toUpperCase() + label.substring(1).toLocaleLowerCase();
}
function formatLabelText(label: string): string {
  return label
    .split("_")
    .map((word) => toFirstUpperLetter(word))
    .join(" ");
}

export default function FiltersForm() {
  const fieldId = useId(); // todo: use for every input and fieldset

  function handleSubmit(
    values: FiltersFormValues,
    actions: FormikHelpers<FiltersFormValues>,
  ) {
    console.log("filrets SUBMIT:", values);
  }

  function handleFormReset(
    values: FiltersFormValues,
    actions: FormikHelpers<FiltersFormValues>,
  ) {
    console.log("filrets RESET:", values);
  }

  return (
    <Formik
      initialValues={initialFiltersFormValues}
      onSubmit={handleSubmit}
      onReset={handleFormReset} // todo: (use?) to auto submit after reset?
    >
      {({ resetForm }) => {
        return (
          <Form
            className="form"
            style={{ outline: "1px solid grey", padding: "6px" }}
          >
            <div className="location">
              <label htmlFor={`${fieldId}-location`}>Location</label>
              <Field type="text" name="location" id={`${fieldId}-location`} />
              <svg width={20} height={20}>
                <use href="/sprite.svg#location" />
              </svg>
            </div>

            <div>
              <h3>Filters</h3>
              <fieldset className={css.fieldset}>
                <legend className={css.legend}>Camper form</legend>
                {filtersResponse.forms.map((item) => (
                  <label key={item} className={css.option}>
                    <Field type="radio" name="form" value={item} />
                    {formatLabelText(item)}
                  </label>
                ))}
              </fieldset>

              <fieldset className={css.fieldset}>
                <legend className={css.legend}>Engine</legend>
                {filtersResponse.engines.map((item) => (
                  <label key={item} className={css.option}>
                    <Field type="radio" name="engine" value={item} />
                    {formatLabelText(item)}
                  </label>
                ))}
              </fieldset>

              <fieldset className={css.fieldset}>
                <legend className={css.legend}>Transmission</legend>
                {filtersResponse.transmissions.map((item) => (
                  <label key={item} className={css.option}>
                    <Field type="radio" name="transmission" value={item} />
                    {formatLabelText(item)}
                  </label>
                ))}
              </fieldset>
            </div>

            <div className="actions">
              <button type="submit">Search</button>

              <button type="button" onClick={() => resetForm()}>
                <svg width={12} height={12}>
                  <use href="/sprite.svg#close" />
                </svg>
                Clear filters
              </button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}
