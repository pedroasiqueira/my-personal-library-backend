import { Controller, Post, Get, Patch, Delete, Param, Body, Request, UseGuards } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('books/:bookId/comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  create(
    @Param('bookId') bookId: string,
    @Request() req,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    const userId = req.user.userId;
    return this.commentsService.create(bookId, userId, createCommentDto);
  }

  @Get()
  findAll(@Param('bookId') bookId: string, @Request() req) {
    const userId = req.user.userId;
    return this.commentsService.findAllByBook(bookId, userId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Request() req,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    const userId = req.user.userId;
    return this.commentsService.update(id, userId, updateCommentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    const userId = req.user.userId;
    return this.commentsService.remove(id, userId);
  }
}
