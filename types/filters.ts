import { CamperEngine, CamperForm, CamperTransmission } from "./camper";

export interface FiltersResponseDto {
  forms: CamperForm[];
  transmissions: CamperTransmission[];
  engines: CamperEngine[];
}

export interface FiltersFormValues {
  location?: string;
  form?: string;
  transmission?: string;
  engine?: string;
}
