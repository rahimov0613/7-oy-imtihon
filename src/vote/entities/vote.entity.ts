import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Poll } from 'src/poll/entities/poll.entity';
import { UserModel } from 'src/users/entities/user.model';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
@ObjectType()
@Unique(['user', 'poll', 'selectedOption'])
export class Vote {
  @Field(() => String, { description: 'vote id' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => String, { description: 'user id' })
  @ManyToOne(() => UserModel)
  user: UserModel;

  @Field(() => String, { description: 'poll id' })
  @ManyToOne(() => Poll)
  poll: Poll;


  @Field(() => String, { description: 'option id' })
  @Column()
  selectedOption: string;

  @Field(()=>Date,{ description: 'created at' })
  @Column()
  createdAt: Date;

}
