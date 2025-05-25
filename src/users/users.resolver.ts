import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { UserModel } from './entities/user.model';
import { CreateUser } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UseGuards } from '@nestjs/common';
import { GQLAuthGuard } from 'src/auth/guards/gql-auh.guard';
import { Roles } from 'src/auth/guards/role.decorator';

@Resolver(() => UserModel)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => UserModel)
  createUser(@Args('createUser') createUser: CreateUser) {
    return this.usersService.create(createUser);
  }

  
  @Query(() => [UserModel], { name: 'users' })
  findAll() {
    return this.usersService.findAll();
  }

  @Query(() => UserModel, { name: 'user' })
  findById(@Args('id', { type: () => String }) id: string) {
    return this.usersService.findById(id);
  }

  @Query(()=>UserModel,{name:'userByEmail'})
  findByEmail(@Args('email') email: string) {
    return this.usersService.findByEmail(email);
  }

   @Mutation(() => UserModel)
  updateUser(@Args('updateUser') updateUser: UpdateUserInput) {
    return this.usersService.update(updateUser.id, updateUser);
  }

  @Mutation(() => UserModel)
  removeUser(@Args('id', { type: () => String }) id: string) {
    return this.usersService.remove(id);
  }
}
