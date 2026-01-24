import type {BuildingsResponseDTO} from '@acme/contracts';
import httpClient from './http-client';

export const getBuildings = () => {
  return httpClient.get('v1/buildings').json<BuildingsResponseDTO>();
};
