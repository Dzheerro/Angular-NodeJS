import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Observable, first } from 'rxjs';
import { catchError } from 'rxjs';

import { ErrorHandlerService } from "./error-handler.service";
import { User } from '../models/User';
import { Post } from '../models/Post';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private url = "http://localhost:3000/post";

  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };

  constructor(private http: HttpClient, private errorHandlerService: ErrorHandlerService) { }


  fetchAll(): Observable<Post[]> {
    return this.http
      .get<Post[]>(this.url, { responseType: "json"})
      .pipe( 
        catchError(this.errorHandlerService.handleError<Post[]>("fetchAll", []))
      );
  }

  createPost(formData: Partial<Post>, userId: Pick<User, "id">): Observable<Post> {
    return this.http
    .post<Post>(this.url, { title: formData.title, company: formData.company ,city: formData.city, body: formData.body, user: userId.id } , this.httpOptions)
    .pipe(
      first(), 
      catchError(this.errorHandlerService.handleError<Post>("createPost"))
    );
  }

  deletePost(postId: Pick<Post, "id">): Observable<{}> {
    return this.http.delete<Post>(`${this.url}/${postId}`, this.httpOptions).pipe(
      catchError(this.errorHandlerService.handleError<Post>("deletePost"))
    )
  }
  filterPostsByCity(city: string): Observable<Post[]> {
    return this.http.post<Post[]>(`${this.url}/filter`, { city }, this.httpOptions)
      .pipe(
        catchError(this.errorHandlerService.handleError<Post[]>('filterPostsByCity', []))
      );
  } 
  
}
