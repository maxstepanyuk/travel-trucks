import { BookingRequestDto } from "@/types/booking";
import {
  CamperDetailsEntity,
  CamperEngine,
  CamperForm,
  CamperListItemDto,
  CamperTransmission,
} from "@/types/camper";
import { ReviewEntity } from "@/types/review";
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

export interface CreateBookingForCamper {
  camperId: string;
  bookingRequest: BookingRequestDto;
}

export interface createBookingForCamperResponse {
  message: string;
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

export async function getCamperById(id: string): Promise<CamperDetailsEntity> {
  const res = await campersApi.get<CamperDetailsEntity>("/campers/" + id);
  return res.data;
}

export async function getCamperReviewsByCamperId(
  camperId: string,
): Promise<ReviewEntity[]> {
  const res = await campersApi.get<ReviewEntity[]>(
    "/campers/" + camperId + "/reviews",
  );
  return res.data;
}

export async function createBookingForCamper({
  camperId,
  bookingRequest,
}: CreateBookingForCamper): Promise<createBookingForCamperResponse> {
  const { data } = await campersApi.post<createBookingForCamperResponse>(
    "/campers/" + camperId + "/booking-requests",
    bookingRequest,
  );
  return data;
}
