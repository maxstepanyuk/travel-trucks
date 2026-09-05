"use client";

import { Field, Form, Formik, FormikHelpers } from "formik";
import { useId } from "react";

import css from "./FiltersForm.module.css";
import { formatLabelText } from "@/lib/util";
import { FiltersFormValues, FiltersResponse } from "@/types/filters";
import clsx from "clsx";
import { useFiltersFormValuesStore } from "@/lib/store/filtersStore";

// to render create form
// todo: get from api
const filtersResponse: FiltersResponse = {
  forms: ["alcove", "panel_van", "integrated", "semi_integrated"],
  transmissions: ["automatic", "manual"],
  engines: ["diesel", "petrol", "hybrid", "electric"],
};

export default function FiltersForm() {
  const fieldId = useId(); // todo: use for every input and fieldset

  const filters = useFiltersFormValuesStore((store) => store.filters);
  console.log("🚀 ~ useFiltersFormValuesStore ~ filters:", filters);
  const clearFilters = useFiltersFormValuesStore((store) => store.clearFilters);
  const setFilters = useFiltersFormValuesStore((store) => store.setFilters);

  function handleSubmit(
    values: FiltersFormValues,
    actions: FormikHelpers<FiltersFormValues>,
  ) {
    console.log("filrets SUBMIT:", values);
    setFilters(values);
  }

  function handleFormReset(
    values: FiltersFormValues,
    actions: FormikHelpers<FiltersFormValues>,
  ) {
    console.log("filrets RESET:", values);
    clearFilters();
  }

  return (
    <Formik
      initialValues={filters} //Formik does not work well with zustand
      // enableReinitialize //only makes worse...    :'-(
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
                    placeholder="City"
                    className={css.locationInput}
                    type="text"
                    name="location"
                    id={`${fieldId}-location`}
                  />
                  {/* todo: change svg (color) if length > 0*/}
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

            <div className={css.actions}>
              <button
                className={clsx(css.buttonSearch, "buttonSolid")}
                type="submit"
              >
                Search
              </button>

              <button
                className={clsx(css.buttonClear, "buttonClear")}
                type="button"
                onClick={() => resetForm()}
              >
                <div className="buttonClearIconWrapper">
                  <svg width={12} height={12}>
                    <use href="/sprite.svg#close" />
                  </svg>
                </div>
                Clear filters
              </button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}
