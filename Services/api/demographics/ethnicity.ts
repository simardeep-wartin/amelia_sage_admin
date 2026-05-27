import { clientApi } from "@/lib/clientApi";
import { ENDPOINTS } from "@/lib/endpoints";
import { buildFilterQuery, type FilterParams } from "./utils";

export type EthnicityData = {
  data: {
    total_users: number;
    majority_group: { label: string; percentage: number };
    undisclosed_percentage: number;
    distribution: { display_label: string; count: number; percentage: number }[];
    response_breakdown: { label: string; count: number; percentage: number }[];
  };
};

export const getEthnicity = (params?: FilterParams) =>
  clientApi.get<EthnicityData>(`${ENDPOINTS.demographics.ethnicity}${buildFilterQuery(params)}`);
