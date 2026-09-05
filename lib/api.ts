import {
  CamperEngine,
  CamperForm,
  CamperListItemDto,
  CamperTransmission,
} from "@/types/camper";
import axios from "axios";

const campersApi = axios.create({
  baseURL: "https://campers-api.goit.study",
});

export interface GetCampersParams {
  page?: number;
  perPage?: number;
  location?: string;
  form?: CamperForm;
  transmission?: CamperTransmission;
  engine?: CamperEngine;
}

export interface GetCampersResponse {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
  campers: CamperListItemDto[];
}

export async function getCampers({
  page = 1,
  perPage = 4,
  location,
  form,
  transmission,
  engine,
}: GetCampersParams): Promise<GetCampersResponse> {
  const res = await campersApi.get<GetCampersResponse>("/campers", {
    params: {
      page,
      perPage,
      location,
      form,
      transmission,
      engine,
    },
  });
  return res.data;
}
