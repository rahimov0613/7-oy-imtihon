import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { VoteService } from './vote.service';
import { Vote } from './entities/vote.entity';
import { CreateVoteInput } from './dto/create-vote.input';
import { UpdateVoteInput } from './dto/update-vote.input';

@Resolver(() => Vote)
export class VoteResolver {
    constructor(private readonly voteService: VoteService) { }


    @Mutation(() => Vote)
    async createVote(@Args('createVoteInput') createVoteInput: CreateVoteInput): Promise<Vote> {
        return this.voteService.createVote(createVoteInput);
    }

  @Query(() => [Vote], { name: 'findAllVotes' })
async findAllVotes(): Promise<Vote[]> {
  return this.voteService.findAllVotes();
}

    @Query(() => Vote, { name: 'findVoteById' })
    async findVoteById(@Args('id', { type: () => String }) id: string): Promise<Vote> {
        return this.voteService.findVoteById(id);
    }

    @Mutation(() => Vote)
    async updateVote(
        @Args('id', { type: () => String }) id: string,
        @Args('updateVoteInput') updateVoteInput: UpdateVoteInput,
    ): Promise<Vote> {
        return this.voteService.updateVote(id, updateVoteInput);
    }

    @Mutation(() => Vote)
    async deleteVote(@Args('id', { type: () => String }) id: string): Promise<Vote> {
        return this.voteService.deleteVote(id);
    }
}
