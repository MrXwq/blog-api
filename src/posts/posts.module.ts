import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { Post } from './post.model';
import { TypegooseModule } from 'nestjs-typegoose';

@Module({
  imports: [TypegooseModule.forFeature([Post])],
  controllers: [PostsController],
})
export class PostsModule {}
