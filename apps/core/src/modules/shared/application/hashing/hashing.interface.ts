export const HASHING_SERVICE = Symbol('HASHING_SERVICE');

export interface IHashingService {
  hash(data: string): Promise<string>;
  verify(data: string, hash: string): Promise<boolean>;
}
