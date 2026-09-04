import { CamperEngine, CamperForm, CamperTransmission } from "./camper";

export interface FiltersResponse {
  forms: CamperForm[];
  transmissions: CamperTransmission[];
  engines: CamperEngine[];
}
