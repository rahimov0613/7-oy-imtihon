import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vote } from './entities/vote.entity';
import { CreateVoteInput } from './dto/create-vote.input';
import { UserModel } from 'src/users/entities/user.model';
import { Poll } from 'src/poll/entities/poll.entity';
import { UpdateVoteInput } from './dto/update-vote.input';


@Injectable()
export class VoteService {
    constructor(
        @InjectRepository(Vote)
        private readonly voteRepository: Repository<Vote>,

        @InjectRepository(UserModel)
        private readonly userRepository: Repository<UserModel>,

        @InjectRepository(Poll)
        private readonly pollRepository: Repository<Poll>,
    ) { }

    async createVote(input: CreateVoteInput): Promise<Vote> {
        const { userId, pollId, selectedOption } = input;

        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new Error('User not found');
        }

        const poll = await this.pollRepository.findOne({ where: { id: pollId as string } });
        if (!poll) {
            throw new Error('Poll not found');
        }

        const existingVote = await this.voteRepository.findOne({
            where: { user: { id: userId }, poll: { id: pollId as string } },
        });

        if (existingVote) {
            throw new Error('User has already voted for this poll');
        }

        const vote = this.voteRepository.create({
            user: user,
            poll: poll,
            selectedOption: String(selectedOption),
            createdAt: new Date(),
        });

        return this.voteRepository.save(vote);
    }
    async findAllVotes(): Promise<Vote[]> {
        return this.voteRepository.find({
            relations: ['user', 'poll'],
        });
    }
    
    async findVoteById(id: string): Promise<Vote> {
        const vote = await this.voteRepository.findOne({
            where: { id },
            relations: ['user', 'poll'],
        });
        if (!vote) {
            throw new Error('Vote not found');
        }
        return vote;
    }
    async updateVote(id: string, input: UpdateVoteInput): Promise<Vote> {
        const vote = await this.voteRepository.findOne({ where: { id } });
        if (!vote) {
            throw new Error('Vote not found');
        }

        const { userId, pollId, selectedOption } = input;

        if (userId) {
            const user = await this.userRepository.findOne({ where: { id: userId } });
            if (!user) {
                throw new Error('User not found');
            }
            vote.user = user;
        }

        if (pollId) {
            const poll = await this.pollRepository.findOne({ where: { id: pollId as string } });
            if (!poll) {
                throw new Error('Poll not found');
            }
            vote.poll = poll;
        }

        if (selectedOption) {
            vote.selectedOption = String(selectedOption);
        }
        return this.voteRepository.save(vote);
    }
    async deleteVote(id: string): Promise<Vote> {
        const vote = await this.voteRepository.findOne({ where: { id } });
        if (!vote) {
            throw new Error('Vote not found');
        }
        return this.voteRepository.remove(vote);
    }


}
