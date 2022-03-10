import { FilterService } from './../../../services/filter.service';
import { Component, Input, OnInit, OnDestroy,ViewChild ,ElementRef} from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Post } from 'app/models/post';
import { Profile } from 'app/models/profile';
import { PostService } from 'app/services/post.service';
import { faImage, faFileVideo } from '@fortawesome/free-regular-svg-icons';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css'],
})
export class CreatePostComponent implements OnInit {
  @ViewChild('videoUrlInput') videoUrlInput: ElementRef | undefined;
  displayAddVideo : boolean = false;
  displayAddImage : boolean = false;
  profile: Profile = {};
  addPost: Post = {
    creator: {
      pid: this.profile.pid,
      username: this.profile.username,
      passkey: '',
      firstName: this.profile.firstName,
      lastName: this.profile.lastName,
      email: this.profile.email
    },
    body: '',
    datePosted: new Date(),
    imgURL: '',
    type:0,
  };
  faImage = faImage;
  faVideo = faFileVideo;
  faCheckCircle = faCheckCircle;
  uploadDesired = false;
  videoUploadDesired = false;

  @Input() show: boolean = false;

  constructor(
    public postService: PostService,
    public activeModal: NgbActiveModal,
    private modalService: NgbModal,
    private filterService: FilterService
    //public activeModal: NgbActiveModal,
    ) {}

  ngOnInit(): void {
    var sessionProfile = sessionStorage.getItem("profile");
    if(sessionProfile!=null){
      this.profile = JSON.parse(sessionProfile);
    }
  }

  ngOnDestroy(): void {
    window.location.href = '/home';
  }

  createPost() {
    this.displayAddVideo = false;
    this.displayAddImage = false;
    if (this.addPost.body!=='') {
      //filter body for profanity
      this.addPost.body = this.filterService.filterProfanity(this.addPost.body);
      console.log("Post image is: " + this.addPost.imgURL);
      this.postService.createPost(this.addPost);
      console.log("Post post is: " + this.addPost)
     // window.location.reload();
    } else {
      this.show=true;
    }
  }

  closeModal() {
    this.modalService.dismissAll();
  }


  changeFile(file: any) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
  }


  onSelectFile(event : any) {
    this.displayAddVideo = true;
    if (event.target.files && event.target.files[0]) {

      let file = event.target.files[0] ;
      console.log("File is:" + file);
      this.changeFile(file)
        .then(
          (e : any) => { this.addPost.imgURL = e ; this.addPost.type = 1;
          console.log("image data is: "+ e)}
            )
    }
      this.uploadDesired = true;
  }

  onSelectUrl(urlInput: HTMLInputElement){
    this.displayAddImage = true;
    this.addPost.imgURL = urlInput.value;
    console.log("VideoURL: " + urlInput.value);

    let file = this.addPost.imgURL;
    console.log("URL is:" + file);
    this.changeFile(file)
      .then(
        (e : any) => { this.addPost.imgURL = e ; this.addPost.type = 0;
          console.log("Video data is: "+ e)}
      )

    this.videoUploadDesired = true;
  }
}




// <iframe width="560" height="315" src="https://www.youtube.com/embed/vwIUJbIU57s"
// title="YouTube video player" frameborder="0" allow="accelerometer; autoplay;
// clipboard-write; encrypted-media; gyroscope; picture-in-picture"
// allowfullscreen></iframe>

