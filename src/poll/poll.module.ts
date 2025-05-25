import { Module } from '@nestjs/common';
import { PollService } from './poll.service';
import { PollResolver } from './poll.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Poll } from './entities/poll.entity';
import { UserModel } from 'src/users/entities/user.model';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Poll, UserModel]),
    UsersModule,],
  providers: [PollResolver, PollService,],
})
export class PollModule { }
