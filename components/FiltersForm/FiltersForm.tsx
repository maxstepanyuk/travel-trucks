"use client";

import { useId } from "react";

import css from "./FiltersForm.module.css";
import { formatLabelText } from "@/lib/util";
import clsx from "clsx";
import { useFiltersStore } from "@/lib/store/filtersStore";
import { useQuery } from "@tanstack/react-query";
import { getCamperFilters } from "@/lib/api";
import LoaderSpinner from "../LoaderSpinner/LoaderSpinner";

export default function FiltersForm() {
  const fieldId = useId(); // todo: use for every input and fieldset

  const clearCatalogFilters = useFiltersStore(
    (store) => store.clearCatalogFilters,
  );
  const setCatalogFilters = useFiltersStore((store) => store.setCatalogFilters);

  const formFilters = useFiltersStore((store) => store.formFilters);
  const setFormFilters = useFiltersStore((store) => store.setFormFilters);
  const clearFormFilters = useFiltersStore((store) => store.clearFormFilters);

  const { data: filtersResponse } = useQuery({
    queryKey: ["campers-filters-api"],
    queryFn: getCamperFilters,
  });

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
          {filtersResponse && <h2 className={css.filtersTitle}>Filters</h2>}

          {/* todo???: render fieldset(s) from `Object.entries()` */}
          <div className={css.fieldsetsWrapper}>
            {filtersResponse && filtersResponse.forms && (
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
            )}

            {filtersResponse && filtersResponse.engines && (
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
            )}

            {filtersResponse && (
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
            )}
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
