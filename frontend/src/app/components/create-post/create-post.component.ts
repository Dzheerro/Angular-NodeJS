import { Component, EventEmitter, Output, ViewChild } from '@angular/core'; 
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { first } from 'rxjs';

import { Post } from 'src/app/models/Post';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent {

  constructor(private authService: AuthService, private postService: PostService) {}

  isOpen = false;

    @ViewChild("formDirective") formDirective!: NgForm;
    @Output() create : EventEmitter<any> = new EventEmitter();
    Form: FormGroup = new FormGroup({
    title: new FormControl("", [Validators.required, Validators.minLength(5)]),
    body: new FormControl("", [Validators.required, Validators.minLength(10)]),
    company: new FormControl("", [Validators.required, Validators.minLength (5)])
  });

  ngOnInit():void {}

  onSubmit(formData: Pick<Post, "title" | "company" | "body">): void {
    console.log('Form data:', formData); 
    this.postService.createPost(formData, this.authService.userId).pipe(first()).subscribe(
      () => {
        this.create.emit(null);
      },
      (error) => {
        console.error('Error while creating post:', error);
      }
    );
  
    this.Form.reset();
    this.formDirective.resetForm();
  }

}

