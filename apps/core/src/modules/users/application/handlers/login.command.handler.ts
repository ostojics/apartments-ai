import {CommandHandler, ICommandHandler} from '@nestjs/cqrs';
import {Inject} from '@nestjs/common';
import {LoginCommand} from '../commands/login.command';
import {USER_REPOSITORY, IUserRepository} from '../../domain/repositories/user.repository.interface';
import {InvalidCredentialsError} from '../../domain/user.errors';
import {JWT_SERVICE} from 'src/modules/shared/application/jwt/di-tokens';
import {IJwtService} from 'src/modules/shared/application/jwt/jwt.interface';
import {HASHING_SERVICE, IHashingService} from 'src/modules/shared/application/hashing/hashing.interface';

@CommandHandler(LoginCommand)
export class LoginCommandHandler implements ICommandHandler<LoginCommand> {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
    @Inject(HASHING_SERVICE)
    private readonly hashingService: IHashingService,
    @Inject(JWT_SERVICE)
    private readonly jwtService: IJwtService,
  ) {}

  async execute(command: LoginCommand): Promise<{token: string}> {
    const {data} = command;

    const user = await this.userRepository.findByEmail(data.email);
    if (!user) {
      throw new InvalidCredentialsError();
    }

    const passwordIsValid = await this.hashingService.verify(data.password, user.passwordHash);
    if (!passwordIsValid) {
      throw new InvalidCredentialsError();
    }

    const token = await this.jwtService.craftJwt(user.id, user.email);

    return {token};
  }
}
