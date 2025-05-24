import { Injectable } from '@nestjs/common';
import { CreatePollInput } from './dto/create-poll.input';
import { UpdatePollInput } from './dto/update-poll.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Poll } from './entities/poll.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PollService {
 constructor(@InjectRepository(Poll)private repo:Repository<Poll>){}

 findActivePolls(){
  return this.repo.find({where:{isActive:true}})
 }
}
