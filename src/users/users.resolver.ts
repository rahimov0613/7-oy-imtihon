import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUser } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User)
  createUser(@Args('createUser') createUser: CreateUser) {
    return this.usersService.create(createUser);
  }

  @Query(() => [User], { name: 'users' })
  findAll() {
    return this.usersService.findAll();
  }

  @Query(() => User, { name: 'user' })
  findById(@Args('id', { type: () => Int }) id: string) {
    return this.usersService.findById(id);
  }
  @Query(()=>User,{name:'userByEmail'})
  findByEmail(@Args('email') email: string) {
    return this.usersService.findByEmail(email);
  }

  @Mutation(() => User)
  updateUser(@Args('updateUser') updateUser: UpdateUserInput) {
    return this.usersService.update(updateUser.id, updateUser);
  }

  @Mutation(() => User)
  removeUser(@Args('id', { type: () => Int }) id: string) {
    return this.usersService.remove(id);
  }
}
