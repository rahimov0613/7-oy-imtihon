import { Field, HideField, InputType } from "@nestjs/graphql";
import { IsEmail, IsOptional, MinLength } from "class-validator";

@InputType()
export class RegisterInput {

  @Field()
  name: string;

  @Field()
  @IsEmail()
  email: string;

  @Field()
  @HideField()
  @MinLength(6)
  password: string;

  @Field()
  @IsOptional()
  role?: string;

  
}