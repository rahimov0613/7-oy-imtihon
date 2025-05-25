import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AuthModule } from './auth/auth.module';
import { PollModule } from './poll/poll.module';
import { VoteModule } from './vote/vote.module';
import { UserModel } from './users/entities/user.model';
import { Poll } from './poll/entities/poll.entity';
import { Vote } from './vote/entities/vote.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1234',
      database: 'imtihon',
      entities: [UserModel, Poll, Vote],
      synchronize: true,
      logging: true,
      autoLoadEntities: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      graphiql: true,
      autoSchemaFile: "./src/schema.gql",
    }),
    UsersModule,
    AuthModule,
    PollModule,
    VoteModule,
  ],
  providers: [],
  controllers: []

})
export class AppModule { }
