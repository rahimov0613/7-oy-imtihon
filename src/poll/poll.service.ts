import { Injectable } from '@nestjs/common';
import { CreatePollInput } from './dto/create-poll.input';
import { UpdatePollInput } from './dto/update-poll.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Poll } from './entities/poll.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PollService {
    constructor(@InjectRepository(Poll) private repo: Repository<Poll>) { }

    findActivePolls() {
        return this.repo.find({ where: { isActive: true } })
    }
    async create(createPollInput: CreatePollInput): Promise<Poll> {
        const poll = this.repo.create(createPollInput);
        return await this.repo.save(poll);
    }
    async findAll(): Promise<Poll[]> {
        return await this.repo.find();
    }
    async findById(id: string): Promise<Poll | null> {
        const poll = await this.repo.findOne({ where: { id } });
        if (!poll) {
            throw new Error('Poll not found');
        }
        return poll;
    }
    async update(id: string, updatePollInput: UpdatePollInput): Promise<Poll> {
        const poll = await this.repo.findOne({ where: { id } });
        if (!poll) {
            throw new Error('Poll not found');
        }
        Object.assign(poll, updatePollInput);
        return await this.repo.save(poll);
    }
    async remove(id: string): Promise<Poll> {
        const poll = await this.repo.findOne({ where: { id } });
        if (!poll) {
            throw new Error('Poll not found');
        }
        return await this.repo.remove(poll);
    }
}
