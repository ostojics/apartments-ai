import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {VOUCHER_REPOSITORY} from './domain/repositories/voucher.repository.interface';
import {VoucherOrmEntity} from './infrastructure/persistence/voucher.entity';
import {TypeOrmVoucherRepository} from './infrastructure/persistence/typeorm-voucher.repository';

@Module({
  imports: [TypeOrmModule.forFeature([VoucherOrmEntity])],
  providers: [
    {
      provide: VOUCHER_REPOSITORY,
      useClass: TypeOrmVoucherRepository,
    },
  ],
  exports: [VOUCHER_REPOSITORY],
})
export class VouchersModule {}
