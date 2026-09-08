export type CamperTransmission = string | "automatic" | "manual";
export type CamperEngine = string | "diesel" | "petrol" | "hybrid" | "electric";
export type CamperForm =
  | string
  | "alcove"
  | "panel_van"
  | "integrated"
  | "semi_integrated";
export type CamperAmenity =
  | string
  | "ac"
  | "bathroom"
  | "kitchen"
  | "tv"
  | "radio"
  | "refrigerator"
  | "microwave"
  | "gas"
  | "water";

export interface CamperListItemDto {
  id: string;
  name: string;
  price: number;
  rating: number;
  location: string;
  description: string;
  form: CamperForm;
  length: string;
  width: string;
  height: string;
  tank: string;
  consumption: string;
  transmission: string;
  engine: CamperEngine;
  amenities: CamperAmenity | CamperAmenity[];
  createdAt: string;
  updatedAt: string;
  coverImage: string;
  totalReviews: number;
}

export interface CamperDetailsEntity {
  id: string;
  name: string;
  price: number;
  rating: number;
  location: string;
  description: string;
  form: CamperForm;
  length: string;
  width: string;
  height: string;
  tank: string;
  consumption: string;
  transmission: string;
  engine: CamperEngine;
  amenities: CamperAmenity | CamperAmenity[];
  createdAt: string;
  updatedAt: string;
  gallery: CamperImageEntity[];
  totalReviews: number;
}

export default interface CamperImageEntity {
  id: string;
  camperId: string;
  thumb: string;
  original: string;
  order: number;
}
