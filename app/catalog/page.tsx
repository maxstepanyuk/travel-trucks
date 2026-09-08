import { getCamperFilters, getCampers } from "@/lib/api";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { initialCatalogFilters } from "@/lib/store/filtersStore";
import CatalogClient from "./Catalog.client";
import { Metadata } from "next";
import { formatLabelText, toFirstUpperLetter } from "@/lib/util";

export async function generateMetadata(): Promise<Metadata> {
  const camperFilters = await getCamperFilters();

  //todo? export to separate function (util.ts)
  const filterText = Object.entries(camperFilters)
    .map(([key, values]) => {
      return (
        toFirstUpperLetter(key) +
        " (" +
        values
          .map((variant: string) => {
            return formatLabelText(variant);
          })
          .join(", ") +
        ")"
      );
    })
    .join(", ")
    .concat(".");

  const metadata: Metadata = {
    title: "Catalog - TravelTrucks",
    description:
      "Catalog of campers. With ability to filter by City, " + filterText,
    openGraph: {
      title: "Catalog - TravelTrucks",
      description:
        "Catalog of campers. With ability to filter by City, " + filterText,
    },
  };

  return metadata;
}

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
