import { ObjectType, Field } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

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

  @Field(() => User) 
  @ManyToOne(() => User)
  createdBy: User;

  @Field(() => Date, { description: 'createdAt' })
  @CreateDateColumn()
  createdAt: Date;
}
