import { Module } from '@nestjs/common';
import { VoteService } from './vote.service';
// import { VoteResolver } from './vote.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vote } from './entities/vote.entity';
import { Poll } from 'src/poll/entities/poll.entity';
import { UserModel } from 'src/users/entities/user.model';
import { PollModule } from 'src/poll/poll.module';
import { VoteResolver } from './vote.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Vote,Poll,UserModel]),UserModel,PollModule],
  providers: [ VoteResolver,VoteService],
})
export class VoteModule {}
