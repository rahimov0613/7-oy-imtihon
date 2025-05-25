import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { AuthService } from "./auth.service";
import { UserModel } from "src/users/entities/user.model";
import { RegisterInput } from "./dto/register-auth.input";
import { LoginInput } from "./dto/login-auth.input.";
import { UseGuards } from "@nestjs/common";

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) { }

  @Mutation(() => UserModel)
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