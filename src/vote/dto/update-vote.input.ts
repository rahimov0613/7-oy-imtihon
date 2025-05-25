import { CreateVoteInput } from './create-vote.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateVoteInput extends PartialType(CreateVoteInput) {
  @Field(() => String, { description: 'userId', nullable: true })
  userId?: string;

  @Field(() => String, { description: 'pollId', nullable: true })
  pollId?: string;

  @Field(() => String, { description: 'selectedOption', nullable: true })
  selectedOption?: string;
}
