"use client";

import CamperCard from "@/components/CamperCard/CamperCard";
import Container from "@/components/Container/Container";
import FiltersForm from "@/components/FiltersForm/FiltersForm";
import { getCampers } from "@/lib/api";
import css from "./page.module.css";
import clsx from "clsx";
import { useInfiniteQuery } from "@tanstack/react-query";

export default function Catalog() {
  const { data, fetchNextPage } = useInfiniteQuery({
    queryKey: ["campers"],
    queryFn: ({ pageParam }) => {
      return getCampers({ page: pageParam });
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

  return (
    <Container>
      <section className={css.section}>
        <aside>
          <FiltersForm />
        </aside>
        <div className={css.campersListWrapper}>
          <ul className={css.campersList}>
            {data?.campers.map((camper) => (
              <li key={camper.id}>
                <CamperCard camper={camper} />
              </li>
            ))}
          </ul>
          <button
            onClick={() => fetchNextPage()}
            className={clsx(css.loadMoreButton, "buttonClear")}
            type="button"
          >
            Load More
          </button>
        </div>
      </section>
    </Container>
  );
}
