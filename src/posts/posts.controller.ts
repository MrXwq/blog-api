import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiProperty } from '@nestjs/swagger';
import { Post as PostSchema } from './post.model';
import { IsNotEmpty } from 'class-validator';
import { InjectModel } from 'nestjs-typegoose';

class CreatePostDto {
  @ApiProperty({ description: '帖子标题', example: '帖子标题1' })
  @IsNotEmpty({ message: '请填写标题' })
  title: string;
  @IsNotEmpty({ message: '请填写内容' })
  @ApiProperty({ description: '帖子内容', example: '帖子内容1' })
  content: string;
}

// 资源前缀
@Controller('posts')
@ApiTags('帖子')
export class PostsController {
  constructor(@InjectModel(PostSchema) private readonly postModel) {}

  @Get()
  @ApiOperation({
    summary: '帖子列表',
  })
  async index() {
    return await this.postModel.find();
    // return [{
    //   id: 1
    // }]
  }

  @Post()
  @ApiOperation({
    summary: '创建帖子',
  })
  async created(@Body() createPostDto: CreatePostDto) {
    await this.postModel.create(createPostDto);
    return {
      success: true,
    };
  }

  @Get(':id')
  @ApiOperation({
    summary: '博客详情',
  })
  async detail(@Param('id') id: string) {
    return await this.postModel.findById(id);
  }

  @Put(':id')
  @ApiOperation({
    summary: '编辑博客',
  })
  async update(@Param('id') id: string, @Body() updatePostDto: CreatePostDto) {
    await this.postModel.findByIdAndUpdate(id, updatePostDto);
    return {
      success: true,
    };
  }

  @Delete(':id')
  @ApiOperation({
    summary: '删除帖子',
  })
  async remove(@Param('id') id: string) {
    await this.postModel.findByIdAndDelete(id);
    return {
      success: true,
    };
  }
}
