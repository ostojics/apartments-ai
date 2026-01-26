import {apartmentsHandlers} from './apartments-handlers';
import {authHandlers} from './auth-handlers';
import {onboardingHandlers} from './onboarding-handlers';
import {tenantsHandlers} from './tenants-handlers';

export const handlers = [...authHandlers, ...onboardingHandlers, ...apartmentsHandlers, ...tenantsHandlers];
