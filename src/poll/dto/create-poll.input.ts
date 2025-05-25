import { InputType, Int, Field } from '@nestjs/graphql';
import { UserModel } from 'src/users/entities/user.model';

@InputType()
export class CreatePollInput {
  @Field(() => String, { description: 'question' })
  question: string;

  @Field(() => [String], { description: 'options' })
  options: string[];

  @Field(()=> String,{description: 'createdBy', })
  createdBy: UserModel;
}
