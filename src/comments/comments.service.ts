import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment, CommentDocument } from './schemas/comment.schema';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment.name) private readonly commentModel: Model<CommentDocument>,
  ) {}

  async create(bookId: string, userId: string, dto: CreateCommentDto) {
    const comment = new this.commentModel({
      ...dto,
      user: userId,
      book: bookId,
    });

    return await comment.save();
  }

  async findAllByBook(bookId: string, userId: string) {
    return this.commentModel
      .find({ book: bookId, user: userId })
      .sort({ createdAt: -1 })
      .exec();
  }

  async update(id: string, userId: string, dto: UpdateCommentDto) {
    const comment = await this.commentModel.findById(id);
    if (!comment || comment.user.toString() !== userId) {
      throw new ForbiddenException('Você não tem permissão para editar este comentário.');
    }

    comment.content = dto.content;
    return await comment.save();
  }

  async remove(id: string, userId: string) {
    const comment = await this.commentModel.findById(id);
    if (!comment || comment.user.toString() !== userId) {
      throw new ForbiddenException('Você não tem permissão para excluir este comentário.');
    }

    return await comment.deleteOne();
  }
}
