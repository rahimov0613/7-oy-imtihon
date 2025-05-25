import { CreateUser } from './create-user.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput extends PartialType(CreateUser) {
  @Field(() => String, { description: 'user id', nullable: false })
  id: string;

  @Field(() => String, { description: 'user name', nullable: true })
  name?: string;

  @Field(() => String, { description: 'user email', nullable: true })
  email?: string;

  @Field(() => String, { description: 'user password', nullable: true })
  password?: string;

  @Field(() => String, { description: 'user role', nullable: true })
  role?: string;
}
