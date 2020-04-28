import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {AuthService} from '../../core/services/auth.service';
import {Router} from '@angular/router';
import {UserResponse} from '../../core/models/user.model';
import {CommentService} from '../../core/services/comment.service';
import {FormControl, Validators} from '@angular/forms';
import {Comment} from '../../core/models/comment.model';
import {Reply} from '../../core/models/reply.model';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {DeleteDialogComponent} from './dialogs/delete-dialog/delete-dialog.component';
import {filter, switchMap} from 'rxjs/operators';
import {SpamDialogComponent} from './dialogs/spam-dialog/spam-dialog.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnDestroy, OnInit {
  commentControl = new FormControl(null, Validators.required);
  comments$: Observable<Comment[]>;
  user: UserResponse;

  private _sub = new Subscription();

  constructor(
    private _auth: AuthService,
    private _commentService: CommentService,
    private _router: Router,
    private _matDialog: MatDialog) {
  }

  ngOnDestroy(): void {
    this._sub.unsubscribe();
  }

  ngOnInit(): void {
    this.comments$ = this._commentService.getComments();
    this._sub.add(
      this._auth.getCurrentUser()
        .subscribe((user) => this.user = user)
    );
  }

  onAddCommentClick(): void {
    const comment: Comment = {
      comment: this.commentControl.value,
      createdAt: Date.now(),
      userName: 'Anonymous'
    };
    if (this.user && this.user.id) {
      comment.userId = this.user.id;
      comment.userName = this.user.fullName;
    }
    this.commentControl.reset();
    this._sub.add(
      this._commentService.addComment(comment).subscribe()
    );
  }

  onDeleteComment(comment: Comment): void {
    const config = new MatDialogConfig();
    config.disableClose = true;
    this._sub.add(
      this._matDialog.open(DeleteDialogComponent, config).afterClosed()
        .pipe(
          filter((confirm: boolean) => confirm),
          switchMap(() => this._commentService.deleteComment(comment))
        ).subscribe()
    );
  }

  onSpanComment(comment: Comment): void {
    const config = new MatDialogConfig();
    config.disableClose = true;
    this._sub.add(
      this._matDialog.open(SpamDialogComponent, config).afterClosed()
        .pipe(
          filter((confirm: boolean) => confirm)
        ).subscribe()
    );
  }

  onReplyClick(comment: Comment): void {
    comment.isReply = true;
  }

  onAddReplyClick(comment: Comment): void {
    const reply: Reply = {
      commentId: comment.id,
      reply: comment.reply,
      createdAt: Date.now(),
      userName: 'Anonymous'
    };
    if (this.user && this.user.id) {
      reply.userId = this.user.id;
      reply.userName = this.user.fullName;
    }
    this.onCancelReplyClick(comment);
    this._sub.add(
      this._commentService.addReply(reply).subscribe()
    );
  }

  onCancelReplyClick(comment: Comment): void {
    comment.reply = null;
    comment.isReply = false;
  }

  onSignOutClick(): void {
    this._sub.add(
      this._auth.logout().subscribe()
    );
  }

  trackByFn(comment: Comment) {
    return comment.id;
  }

}
