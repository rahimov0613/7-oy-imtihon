import { ObjectType, Field } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserModel } from 'src/users/entities/user.model';

@Entity()
@ObjectType()
export class Poll {
  @Field(() => String, { description: 'id' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => String, { description: 'question' })
  @Column()
  question: string;

  @Field(() => [String], { description: 'options' })
  @Column('text', { array: true })
  options: string[];

  @Field(() => Boolean, { description: 'isActive' })
  @Column({ default: true })
  isActive: boolean;

  @Field(() => UserModel) 
  @ManyToOne(() => UserModel)
  createdBy: UserModel;

  @Field(() => Date, { description: 'createdAt' })
  @CreateDateColumn()
  createdAt: Date;
}
