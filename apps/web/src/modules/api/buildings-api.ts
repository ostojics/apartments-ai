import type {BuildingInformationResponseDTO} from '@acme/contracts';
import httpClient from './http-client';

export const getBuildingInfo = (slug: string) => {
  return httpClient.get(`v1/buildings/${slug}`).json<BuildingInformationResponseDTO>();
};
