export const USER_EMAIL_SERVICE_PORT = Symbol('USER_EMAIL_SERVICE_PORT');

export interface IUserEmailQueuePort {
  enqueuePasswordResetEmail(data: {email: string; userId: string}): Promise<void>;
  enqueueEmailChangeConfirmation(data: {userId: string; newEmail: string; token: string}): Promise<void>;
}
