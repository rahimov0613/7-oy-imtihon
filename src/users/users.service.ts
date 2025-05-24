import { Injectable } from '@nestjs/common';
import { CreateUser } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { InjectRepository } from '@nestjs/typeorm';
import { UserModel } from './entities/user.model';
import { Repository } from 'typeorm';
import { RegisterInput } from 'src/auth/dto/register-auth.input';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserModel)
    private userRepo: Repository<UserModel>,
  ) { }
  async create(createUser: RegisterInput): Promise<UserModel> {
    const user = this.userRepo.create({
      ...createUser,
      role: createUser.role as 'admin' | 'user' | undefined,
    });
    return await this.userRepo.save(user);
  }
  async findByEmail(email: string): Promise<UserModel | null> {
    const user = await this.userRepo.findOne({ where: { email } })
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }
  async findAll(): Promise<UserModel[]> {
    return await this.userRepo.find();
  }
  async findById(id: string): Promise<UserModel | null> {
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }
  async update(id: string, updateUser: UpdateUserInput): Promise<UserModel> {
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) {
      throw new Error('User not found');
    }
    Object.assign(user, updateUser);
    return await this.userRepo.save(user);
  }
  async remove(id: string): Promise<UserModel> {
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) {
      throw new Error('User not found');
    }
    return await this.userRepo.remove(user);
  }
}
