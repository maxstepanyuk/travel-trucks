"use client";

import CamperCard from "@/components/CamperCard/CamperCard";
import Container from "@/components/Container/Container";
import FiltersForm from "@/components/FiltersForm/FiltersForm";
import { getCampers } from "@/lib/api";
import css from "./page.module.css";
import clsx from "clsx";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useFiltersFormValuesStore } from "@/lib/store/filtersStore";
import CatalogNotFound from "@/components/CatalogNotFound/CatalogNotFound";

export default function Catalog() {
  const catalogFilters = useFiltersFormValuesStore(
    (store) => store.catalogFilters,
  );
  const clearCatalogFilters = useFiltersFormValuesStore(
    (store) => store.clearCatalogFilters,
  );
  const clearFormFilters = useFiltersFormValuesStore(
    (store) => store.clearFormFilters,
  );

  const { data, fetchNextPage, hasNextPage, isFetching, isFetched, isError } =
    useInfiniteQuery({
      queryKey: ["campers", catalogFilters],
      queryFn: ({ pageParam }) => {
        return getCampers({ page: pageParam, ...catalogFilters });
      },
      initialPageParam: 1,
      getNextPageParam: (lastResponse) => {
        const nextPage = lastResponse.page + 1;
        return nextPage < lastResponse.totalPages ? nextPage : undefined;
      },
      enabled: true,
      select: (data) => {
        return {
          ...data,
          campers: data.pages.flatMap((page) => page.campers),
        };
      },
    });

  const campers = data?.campers ?? [];
  const hasArticles = campers.length > 0;
  const showNoResults = isFetched && !isError && !hasArticles;

  return (
    <Container>
      <section className={css.section}>
        <aside>
          <FiltersForm />
        </aside>
        <div className={css.campersListWrapper}>
          {showNoResults && (
            <CatalogNotFound
              onClearFilters={() => {
                clearFormFilters();
                clearCatalogFilters();
              }}
              onViewAllCampers={() => {
                clearCatalogFilters();
              }}
            />
          )}
          {hasArticles && (
            <ul className={css.campersList}>
              {data?.campers.map((camper) => (
                <li key={camper.id}>
                  <CamperCard camper={camper} />
                </li>
              ))}
            </ul>
          )}
          {hasNextPage && (
            <button
              onClick={() => fetchNextPage()}
              className={clsx(css.loadMoreButton, "buttonClear")}
              type="button"
              disabled={isFetching}
            >
              {isFetching ? "Loading..." : "Load More"}
            </button>
          )}
        </div>
      </section>
    </Container>
  );
}
