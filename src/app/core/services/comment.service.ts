import {Injectable} from '@angular/core';
import {AngularFirestore, CollectionReference, Query} from '@angular/fire/firestore';
import {Comment} from '../models/comment.model';
import {Reply} from '../models/reply.model';
import {from, Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(
    private _db: AngularFirestore) {
  }

  getComments(): Observable<any> {
    return this._db.collection('comments', (ref: CollectionReference) => {
      return ref.orderBy('createdAt', 'desc');
    }).valueChanges();
  }

  getReplies(commentId: string): Observable<any> {
    const comment = this._db.collection('comments').doc(commentId);
    return comment.collection('replies', (ref: CollectionReference) => {
      return ref.orderBy('createdAt', 'desc');
    }).valueChanges();
  }

  addComment(comment: Comment | Reply): Observable<any> {
    comment.id = this._db.createId();
    return from(this._db.collection('comments').doc(comment.id).set(comment));
  }

  addReply(reply: Reply): Observable<any> {
    reply.id = this._db.createId();
    const comment = this._db.collection('comments').doc(reply.commentId);
    return from(comment.collection('replies').doc(reply.id).set(reply));
  }

  deleteComment(comment: Comment | Reply): Observable<any> {
    return from(this._db.collection('comments').doc(comment.id).delete());
  }
}
