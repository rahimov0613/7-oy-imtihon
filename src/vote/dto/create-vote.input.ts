import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateVoteInput {
  @Field(() => String, { description:'poolid'  })
  pollId: String;

  @Field(() => String, { description: 'option' })
  selectedOption: String;
}
