import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { AuthService } from "./auth.service";
import { User } from "src/users/entities/user.entity";
import { RegisterInput } from "./dto/register-auth.input";
import { LoginInput } from "./dto/login-auth.input.";
import { UseGuards } from "@nestjs/common";

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) { }

  @Mutation(() => User)
  async register(@Args('registerAuth') registerAuth: RegisterInput) {
    return this.authService.register(registerAuth);
  }

  @UseGuards()
  @Mutation(() => String)
  async login(@Args('loginAuth') loginAuth: LoginInput) {
    const user = await this.authService.login(loginAuth);
    return user;
  }
}