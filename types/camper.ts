// todo:? export type CamperForm = "" | ""; and so on
export type CamperForm = string;
export type CamperTransmission = string;
export type CamperEngine = string;
export type CamperAmenity = string;

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
  amenities: CamperAmenity[];
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
  amenities: CamperAmenity[];
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
