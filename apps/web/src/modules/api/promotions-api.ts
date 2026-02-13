import type {PromotionsRequestDTO} from '@host-elite/contracts';
import httpClient from './http-client';

export interface PromotionsRequestResponse {
  success: boolean;
}

export const submitPromotionsRequest = (dto: PromotionsRequestDTO) => {
  return httpClient.post('v1/promotions', {json: dto}).json<PromotionsRequestResponse>();
};
