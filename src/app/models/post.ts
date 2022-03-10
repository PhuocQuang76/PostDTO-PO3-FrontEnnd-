import { Group } from "./group";
import { Profile } from "./profile";

export class Post {

    psid?:number;
    creator:Profile;
    body:string;
    imgURL?:string;
    type?:number;
    videoURL?: string;
    datePosted?:Date;
    group?:Group;

    constructor(psid:number, creator:Profile, body:string, imgURL:string, type:number,videoURL:string, datePosted:Date, group:Group){
        this.psid = psid;
        this.creator = creator;
        this.body = body;
        this.imgURL = imgURL;
        this.type = type;
        this.videoURL = videoURL;
        this.datePosted = datePosted;
        this.group = group;
    }
}
