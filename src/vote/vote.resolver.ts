import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { VoteService } from "./vote.service";
import { PollService } from "src/poll/poll.service";
import { UseGuards } from "@nestjs/common";
import { GQLAuthGuard } from "src/auth/guards/gql-auh.guard";
import { CreateVoteInput } from "./dto/create-vote.input";

@Resolver()
export class VoteResolver {
  constructor(
    private voteService: VoteService,
    private pollService: PollService,
  ) {}

  @Mutation(() => Boolean)
  @UseGuards(GQLAuthGuard)
  async vote(
    @Args('input') input: CreateVoteInp0ut,
    @CurrentUser() user: payload,
  ) {
    return this.voteService.vote(user.id, input.pollId, input.selectedOption);
  }
}