import { UseGuards } from "@nestjs/common";
import { Resolver, Query, Args, Mutation } from "@nestjs/graphql";
import { GQLAuthGuard } from "src/auth/guards/gql-auh.guard";
import { Poll } from "src/poll/entities/poll.entity";
import { PollService } from "src/poll/poll.service";
import { CreatePollInput } from "./dto/create-poll.input";
import { UpdatePollInput } from "./dto/update-poll.input";

@Resolver(() => Poll)
export class PollResolver {
  constructor(private pollService: PollService) { }

  @Mutation(() => Poll)
  async createPoll(@Args('createPollInput') createPollInput: CreatePollInput): Promise<Poll> {
    return this.pollService.create(createPollInput);
  }


  // @UseGuards(GQLAuthGuard)
  @Query(() => [Poll])
  getPolls() {
    return this.pollService.findActivePolls()
  }

  // @UseGuards(GQLAuthGuard)
  @Query(() => Poll,)
  async getPollById(@Args('id', { type: () => String }) id: string) {
    const poll = await this.pollService.findById(id);
    if (!poll) {
      throw new Error('Poll not found');
    }
    return poll;
  }

  // @UseGuards(GQLAuthGuard)
  @Mutation(() => Poll)
  async updatePoll(@Args('id', { type: () => String }) id: string, @Args('updatePollInput') updatePollInput: UpdatePollInput): Promise<Poll> {
    const poll = await this.pollService.update(id, updatePollInput);
    if (!poll) {
      throw new Error('Poll not found');
    }
    return poll;
  }
  // @UseGuards(GQLAuthGuard)
  @Mutation(() => Poll)
  async removePoll(@Args('id', { type: () => String }) id: string): Promise<Poll> {
    const poll = await this.pollService.remove(id);
    if (!poll) {
      throw new Error('Poll not found');
    }
    return poll;
  }
}