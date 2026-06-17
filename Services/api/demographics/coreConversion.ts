import { clientApi } from "@/lib/clientApi";
import { ENDPOINTS } from "@/lib/endpoints";
import { buildFilterQuery, type FilterParams } from "./utils";

export type CoreConversionItem = {
  gender: string;
  total_users: number;
  core_users: number;
  conversion_rate: number;
};

export const getCoreConversion = (params?: FilterParams) =>
  clientApi.get<{ data: CoreConversionItem[] }>(
    `${ENDPOINTS.demographics.coreConversion}${buildFilterQuery(params)}`,
  );
