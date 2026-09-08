import { getCamperFilters, getCampers } from "@/lib/api";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { initialCatalogFilters } from "@/lib/store/filtersStore";
import CatalogClient from "./Catalog.client";

// todo meta

const INIT_PAGE_NUMBER = 1;

export default async function Catalog() {
  const queryClient = new QueryClient();

  // todo?: like promise-all
  await queryClient.infiniteQuery({
    queryKey: ["campers", initialCatalogFilters],
    queryFn: () => {
      return getCampers({ page: INIT_PAGE_NUMBER, ...initialCatalogFilters });
    },
    initialPageParam: INIT_PAGE_NUMBER,
  });

  await queryClient.query({
    queryKey: ["campers-filters-api"],
    queryFn: getCamperFilters,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CatalogClient />
    </HydrationBoundary>
  );
}
