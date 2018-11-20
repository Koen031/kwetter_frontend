import {Kwetter} from "./kwetter.model";

export class User {
    
    id?: number;
    username?: string;
    password?: string;
    firstname?: string;
    lastname?: string;
    bio?: string;
    location?: string;
    website?: string;
    profileFoto?: string;
    language?: string;
    kwetters?: Array<Kwetter>;
    following?: Array<string>;
    followers?: Array<string>;
    group?: string;

    mentions?: Array<Kwetter>;
    
}