import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PostService } from '../../services/post.service';
import { UserService } from '../../services/user.service';
import { Post } from '../../models/post';
import { User } from '../../models/user';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Injectable } from '@angular/core';

@Injectable()
@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
  styles: [`
  .dark-modal .modal-content {
    background-color: #292b2c;
    color: white;
  }
  .dark-modal .close {
    color: white;   
  }
`]
})
export class PostsComponent implements OnInit {
   posts:Post[];
   userNames:User[];
   passwordTyped:String;
   userSelected: String;
   body: String;
   myMessage: String;


  constructor(private userServ: UserService,
              private postServ: PostService,
              private modalService: NgbModal) { }

  ngOnInit() {
    this.loadUserNames();
    this.loadPosts();
    this.myMessage = "";

   

  }

  public openModal(content) {
    this.modalService.open(content);
  }

  public submitPost(mymodal){

      var postToSend: Post =  {
        userName: this.userSelected,
        date: "",
        body: this.body,
        password: this.passwordTyped
      }

      

        this.postServ.addPost(postToSend).subscribe(
        response=> {
          console.log(response);
          if(response.ok == true){
            this.myMessage = "Post succesfull";
            console.log("Entro Aqui Siii");
            this.loadPosts();
          }
            else{
            console.log("Entro Aqui");
            this.myMessage = "Post unsuccesfull";
          }
            


        },
      )

      this.body = "";
      this.passwordTyped = "";
      console.log("The message says" + this.myMessage);
      this.openModal(mymodal);
  }

  public loadPosts(){

      //Get all lists from server and update the lists property
      this.postServ.getAllPosts().subscribe(
      response => this.posts = response.reverse(),)
  }



  public loadUserNames(){
    //Get all lists from server and update the lists property
    this.userServ.getUserNames().subscribe(
      response => this.userNames = response,)
    }

    



}

