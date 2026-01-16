import {Injectable} from '@nestjs/common';
import {IHashingService} from 'src/modules/shared/application/hashing/hashing.interface';
import * as argon2 from 'argon2';

@Injectable()
export class Argon2HashingService implements IHashingService {
  async hash(data: string): Promise<string> {
    return await argon2.hash(data);
  }

  async verify(data: string, hash: string): Promise<boolean> {
    return await argon2.verify(hash, data);
  }
}
