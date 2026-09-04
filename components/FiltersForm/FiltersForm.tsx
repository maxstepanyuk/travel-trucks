"use client";

import { Field, Form, Formik, FormikHelpers } from "formik";
import { useId } from "react";

import css from "./FiltersForm.module.css";
import { formatLabelText } from "@/lib/util";
import { FiltersResponse } from "@/types/filters";

// to render create form
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
          <Form className={css.form}>
            <div className={css.inputs}>
              <div className={css.location}>
                <label
                  className={css.locationLabel}
                  htmlFor={`${fieldId}-location`}
                >
                  Location
                </label>

                <div className={css.locationInputAndSvgWrapper}>
                  <Field
                    className={css.locationInput}
                    type="text"
                    name="location"
                    id={`${fieldId}-location`}
                  />
                  <svg className={css.locationInputIcon} width={20} height={20}>
                    <use href="/sprite.svg#location" />
                  </svg>
                </div>
              </div>

              <div className={css.filters}>
                <h2 className={css.filtersTitle}>Filters</h2>

                <div className={css.fieldsetsWrapper}>
                  <fieldset className={css.fieldset}>
                    <legend className={css.legend}>Camper form</legend>
                    <div className={css.radioList}>
                      {filtersResponse.forms.map((item) => (
                        <label key={item} className={css.radioLabel}>
                          <Field
                            className={css.radioInput}
                            type="radio"
                            name="form"
                            value={item}
                          />
                          {formatLabelText(item)}
                        </label>
                      ))}
                    </div>
                  </fieldset>

                  <fieldset className={css.fieldset}>
                    <legend className={css.legend}>Engine</legend>
                    <div className={css.radioList}>
                      {filtersResponse.engines.map((item) => (
                        <label key={item} className={css.radioLabel}>
                          <Field
                            className={css.radioInput}
                            type="radio"
                            name="engine"
                            value={item}
                          />
                          {formatLabelText(item)}
                        </label>
                      ))}
                    </div>
                  </fieldset>

                  <fieldset className={css.fieldset}>
                    <legend className={css.legend}>Transmission</legend>
                    <div className={css.radioList}>
                      {filtersResponse.transmissions.map((item) => (
                        <label key={item} className={css.radioLabel}>
                          <Field
                            className={css.radioInput}
                            type="radio"
                            name="transmission"
                            value={item}
                          />
                          {formatLabelText(item)}
                        </label>
                      ))}
                    </div>
                  </fieldset>
                </div>
              </div>
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
