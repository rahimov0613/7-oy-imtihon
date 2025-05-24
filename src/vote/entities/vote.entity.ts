import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Poll } from 'src/poll/entities/poll.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Vote {
  @Field(() => String, { description: 'vote id' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => String, { description: 'user id' })
  @ManyToOne(() => User)
  user: User;

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
