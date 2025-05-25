import { UserModel } from 'src/users/entities/user.model';
import { CreatePollInput } from './create-poll.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdatePollInput extends PartialType(CreatePollInput) {
  @Field(() => String, { description: 'question', nullable: true })
  question?: string;
  @Field(() => [String], { description: 'options', nullable: true })
  options?: string[];
  @Field(() => String, { description: 'createdBy', nullable: true })
  createdBy?: UserModel;
}
