import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModel } from './entities/user.model';

@Module({
  imports:[TypeOrmModule.forFeature([UserModel])],
  providers: [UsersResolver, UsersService,UserModel],
  exports: [UsersService,UserModel],

})
export class UsersModule {}
