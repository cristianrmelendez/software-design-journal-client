import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { UserService } from '../../services/user.service';
import { Post } from '../../models/post';
import { User } from '../../models/user';
import { Usertopost } from '../../models/usertopost';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

	userName: string;
  password1: string;
  password2: string

  users:User[];

  constructor(private userServ: UserService,
    private postServ: PostService) { }


  ngOnInit() {
  }

  public addUser(){

          if(this.password1 == this.password2){
    
            var userToCreate: Usertopost =  {
            userName: this.userName,
            password: this.password1
          }
    
          this.userServ.addUser(userToCreate).subscribe(
            response=> {
              
              if(response.success== true){
                console.log("User created succesfully")
              }
              else{
                console.log("User not created")
              }
            },
          )
      }

      else{
        console.log("Password are not the same");
      }

}

}



