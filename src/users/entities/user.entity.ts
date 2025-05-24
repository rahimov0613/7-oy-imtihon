import { ObjectType, Field, Int, HideField } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => String, { description: 'id' })
  id: String;
  @Field(() => String, { description: 'name' })
  name: string;
  @Field(() => String, { description: 'email' })
  email: string;
  @HideField()
  @Field(() => String, { description: 'password' })
  password: string;
  @Field(() => String, { description: 'role' })
  role: string;
}
