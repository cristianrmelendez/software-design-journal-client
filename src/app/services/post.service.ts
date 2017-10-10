import { Injectable } from '@angular/core';
import { Http,Headers } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Post} from '../models/post'

import 'rxjs/add/operator/map';

@Injectable()
export class PostService {

  constructor(private http: Http) { }

  private serverApi= 'https://heroku-journal-page-api.herokuapp.com/api';
  

  public getAllPosts():Observable<Post[]> {
   
            let URI = `${this.serverApi}/posts`;
            return this.http.get(URI)
                .map(res => res.json())
                .map(res => <Post[]>res);
        }


  public addPost(post: Post) {
          let URI = `${this.serverApi}/posts`;
          let headers = new Headers;
          let body = JSON.stringify({userName: post.userName, body: post.body, password: post.password});
          headers.append('Content-Type', 'application/json');
          return this.http.post(URI, body ,{headers: headers})
          .map(res => res.json());
      }
  }

