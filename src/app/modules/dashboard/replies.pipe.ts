import {Pipe, PipeTransform} from '@angular/core';
import {CommentService} from '../../core/services/comment.service';

@Pipe({
  name: 'replies'
})
export class RepliesPipe implements PipeTransform {

  constructor(
    private _commentService: CommentService) {
  }

  transform(value: any, ...args: any[]): any {
    return this._commentService.getReplies(value.id);
  }

}
