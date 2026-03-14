import type {FeedbackSubmissionDTO} from '@host-elite/contracts';

import httpClient from './http-client';

export interface FeedbackSubmissionResponse {
  success: boolean;
}

export const submitFeedback = (dto: FeedbackSubmissionDTO) => {
  return httpClient.post('v1/feedback', {json: dto}).json<FeedbackSubmissionResponse>();
};
