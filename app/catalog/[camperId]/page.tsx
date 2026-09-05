"use client";

import Container from "@/components/Container/Container";
import { getCamperById } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

export default function Details() {
  const { camperId } = useParams<{ camperId: string }>();

  const { data: camper } = useQuery({
    queryKey: ["camper", camperId],
    queryFn: () => {
      return getCamperById(camperId);
    },
  });

  return (
    <Container>
      <h1>{camperId}</h1>
      <pre>{JSON.stringify(camper, null, "  ")}</pre>
    </Container>
  );
}
