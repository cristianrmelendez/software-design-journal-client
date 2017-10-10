import { Injectable } from '@angular/core';
import { Http,Headers } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {User} from '../models/user'
import {Usertopost} from '../models/usertopost'

import 'rxjs/add/operator/map';

@Injectable()
export class UserService {

  constructor(private http: Http) { }
  
  private serverApi= 'https://heroku-journal-page-api.herokuapp.com/api';

  
  public getUserNames():Observable<User[]> {
    let URI = `${this.serverApi}/userNames`;
            return this.http.get(URI)
                .map(res => res.json())
        }

  public addUser(user: Usertopost) {
        let URI = `${this.serverApi}/users`;
        let headers = new Headers;
        let body = JSON.stringify({userName: user.userName,  password: user.password});
        
        headers.append('Content-Type', 'application/json');
        return this.http.post(URI, body ,{headers: headers})
        .map(res => res.json());
    }
}
