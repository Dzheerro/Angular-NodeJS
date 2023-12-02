import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';  // Импорт FormBuilder и FormGroup
import { PostService } from 'src/app/services/post.service';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/User';
import { Post } from 'src/app/models/Post';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  posts$: Observable<Post[]>;
  userId: Pick<User, 'id'>;
  filterForm: FormGroup;  // Добавление FormGroup для формы ввода города

  constructor(
    private postService: PostService,
    private authService: AuthService,
    private formBuilder: FormBuilder  // Использование FormBuilder
  ) {
    this.posts$ = this.fetchAll();
    this.userId = this.authService.userId;
    this.filterForm = this.formBuilder.group({
      city: [''],  // Поле для ввода города
    });
  }

  ngOnInit(): void {
    // Добавить вызов fetchAll() или других инициализаций по мере необходимости
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

  filterByCity(): void {
    const cityControl = this.filterForm.get('city');
    if (cityControl) {
      const city = cityControl.value;
      if (city) {
        this.posts$ = this.postService.filterPostsByCity(city);
      } else {
        this.posts$ = this.fetchAll();
      }
    } else {
      console.error('City control is null.');  // Вывести ошибку в консоль для отладки
    }
  }
  
}
