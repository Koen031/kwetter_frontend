
import {Kwetter} from './kwetter.model';

export class User {

    id?: number;
    username?: string;
    password?: string;
    firstname?: string;
    lastname?: string;
    bio?: string;
    location?: string;
    website?: string;
    profilePhoto?: string;
    language?: string;
    group?: string;
    following?: Array<string>;
    followers?: Array<string>;
    kwetters?: Array<Kwetter>;


    constructor(model: any = null) {
        if (model) {
            this.id = model.id;
            this.username = model.username;
            this.password = model.password;
            this.firstname = model.firstname;
            this.lastname = model.lastname;
            this.bio = model.bio;
            this.language = model.language;
            this.location = model.location;
            this.website = model.website;
            this.profilePhoto = model.profilePhoto;
            this.group = model.group;
            this.following = [];
            this.followers = [];
            this.kwetters = [];

            if ( model.following != null) {
              model.following.forEach( function (element) {
                this.following.push(element);
              });
            }
            const thiz = this;
            if ( model.followers != null) {
              model.followers.forEach( function (element) {
                thiz.followers.push(element);
              });
            }
            if ( model.kwetters != null) {
              model.kwetters.forEach( function (element) {
                thiz.kwetters.push(new Kwetter(element));
              });
            }

        }
    }

    getFullname(): string {
      return this.firstname  + ' ' + this.lastname;
    }
    addKwetter(kwetter: Kwetter) {
      let inArray = false;
      this.kwetters.forEach(userKwetter => {
        if (userKwetter.id === kwetter.id) {
          inArray = true;
        }
      });
      if (!inArray) {
        this.kwetters.push(kwetter);
      }
    }
    removeKwetter(kwetter: Kwetter) {
      const index = this.kwetters.indexOf(kwetter);
      if(index !== -1)
        this.kwetters.slice(index, 1);
    }

}