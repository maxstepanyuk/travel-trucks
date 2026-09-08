import { getCamperById, getCamperReviewsByCamperId } from "@/lib/api";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import DetailsClient from "./Details.client.page";
import { Metadata } from "next";

interface DetailsProps {
  params: Promise<{ camperId: string }>;
}

export async function generateMetadata({
  params,
}: DetailsProps): Promise<Metadata> {
  const { camperId } = await params;
  const camper = await getCamperById(camperId);

  const metadata: Metadata = {
    title: camper.name + " - TravelTrucks",
    description: camper.description,
    openGraph: {
      title: camper.name + " - TravelTrucks",
      description: camper.description,
    },
  };

  return metadata;
}

export default async function Details({ params }: DetailsProps) {
  const { camperId } = await params;

  const queryClient = new QueryClient();

  // todo?: like promise-all
  await queryClient.query({
    queryKey: ["camper", camperId],
    queryFn: () => {
      return getCamperById(camperId);
    },
  });

  await queryClient.query({
    queryKey: ["camper-id-reviews", camperId],
    queryFn: () => {
      return getCamperReviewsByCamperId(camperId);
    },
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DetailsClient />
    </HydrationBoundary>
  );
}
