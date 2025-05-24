import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModel } from './entities/user.model';
import { User } from './entities/user.entity';

@Module({
  imports:[TypeOrmModule.forFeature([UserModel])],
  providers: [UsersResolver, UsersService],
  exports: [UsersService,],

})
export class UsersModule {}
