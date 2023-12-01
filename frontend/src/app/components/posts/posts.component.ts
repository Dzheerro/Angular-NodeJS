import { Component, OnInit} from '@angular/core';

import { Observable } from 'rxjs';

import { PostService } from 'src/app/services/post.service';
import { AuthService } from 'src/app/services/auth.service';

import { User } from 'src/app/models/User';
import { Post } from 'src/app/models/Post';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})


export class PostsComponent {

  posts$: Observable<Post[]>;
  userId: Pick<User, "id">;

  constructor(private postService: PostService, private authService: AuthService) {
      this.posts$ = this.fetchAll(); 
      this.userId = this.authService.userId; 
  }

  fetchAll(): Observable<Post[]> {
      return this.postService.fetchAll();
  }

  createPost(): void {
      this.posts$ = this.fetchAll();
  } 

  delete(postId: number): void {
    this.postService.deletePost({ id: postId }).subscribe(() => (this.posts$ = this.fetchAll()));
  }
  
  
}

