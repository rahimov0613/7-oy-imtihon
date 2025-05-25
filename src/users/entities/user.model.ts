import { ObjectType, Field, Int, HideField } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class UserModel {
  @Field(() => String, { description: 'id' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => String, { description: 'name' })
  @Column()
  name: string;

  @Field(() => String, { description: 'email' })
  @Column({ unique: true })
  email: string;

  @HideField()
  @Field(() => String, { description: 'password' })
  @Column()
  password: string;

  @Field(() => String, { description: 'role' })
  @Column({ default: 'user' })
  role: 'admin' | 'user';

  @CreateDateColumn({nullable: false})
  createdAt: Date;
} 