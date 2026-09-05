"use client";

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

  const clearCatalogFilters = useFiltersFormValuesStore(
    (store) => store.clearCatalogFilters,
  );
  const setCatalogFilters = useFiltersFormValuesStore(
    (store) => store.setCatalogFilters,
  );

  const formFilters = useFiltersFormValuesStore((store) => store.formFilters);
  const setFormFilters = useFiltersFormValuesStore(
    (store) => store.setFormFilters,
  );
  const clearFormFilters = useFiltersFormValuesStore(
    (store) => store.clearFormFilters,
  );

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormFilters({ ...formFilters, [name]: value });
  }

  function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();

    const setEntries = Object.entries(formFilters).filter(
      (entry) => (entry[1] as string).length > 0,
    );
    const usedFilters = Object.fromEntries(setEntries);
    setCatalogFilters(usedFilters);
  }

  function handleReset() {
    clearFormFilters();
    clearCatalogFilters();
  }

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <div className={css.inputs}>
        <div className={css.location}>
          <label className={css.locationLabel} htmlFor={`${fieldId}-location`}>
            Location
          </label>

          <div className={css.locationInputAndSvgWrapper}>
            <input
              placeholder="City"
              className={css.locationInput}
              type="text"
              name="location"
              id={`${fieldId}-location`}
              value={formFilters.location}
              onChange={handleChange}
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
                    <input
                      className={css.radioInput}
                      type="radio"
                      name="form"
                      value={item}
                      checked={formFilters.form === item}
                      onChange={handleChange}
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
                    <input
                      className={css.radioInput}
                      type="radio"
                      name="engine"
                      value={item}
                      checked={formFilters.engine === item}
                      onChange={handleChange}
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
                    <input
                      className={css.radioInput}
                      type="radio"
                      name="transmission"
                      value={item}
                      checked={formFilters.transmission === item}
                      onChange={handleChange}
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
        <button className={clsx(css.buttonSearch, "buttonSolid")} type="submit">
          Search
        </button>

        <button
          className={clsx(css.buttonClear, "buttonClear")}
          type="button"
          onClick={handleReset}
        >
          <div className="buttonClearIconWrapper">
            <svg width={12} height={12}>
              <use href="/sprite.svg#close" />
            </svg>
          </div>
          Clear filters
        </button>
      </div>
    </form>
  );
}
