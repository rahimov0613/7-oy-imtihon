import { UseGuards } from "@nestjs/common";
import { Resolver, Query } from "@nestjs/graphql";
import { GQLAuthGuard } from "src/auth/guards/gql-auh.guard";
import { Poll } from "src/poll/entities/poll.entity";
import { PollService } from "src/poll/poll.service";

@Resolver(() => Poll)
export class PollResolver {
  constructor(private pollService: PollService) { }

  @UseGuards(GQLAuthGuard)
  @Query(() => [Poll])
  getPolls() {
    return this.pollService.findActivePolls()
  }
}