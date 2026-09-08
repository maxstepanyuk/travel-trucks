import { getCamperById, getCamperReviewsByCamperId } from "@/lib/api";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import DetailsClient from "./Details.client.page";

interface DetailsProps {
  params: Promise<{ camperId: string }>;
}

// todo meta function

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
