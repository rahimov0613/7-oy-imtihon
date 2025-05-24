import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateUser {
  @Field(() => String, { description: 'user name', nullable: false })
  name: string;
  @Field(() => String, { description: 'user email', nullable: false })
  email: string;
  @Field(() => String, { description: 'user password', nullable: false })
  password: string;
  @Field(() => String, { description: 'user role', nullable: false })
  role: string;

}
