export interface Profile {
    _id:string;
    nama:string;
    email:string;
    role:string;
    avatar:string;
    bio:string;
    skills:Skills[];
    phone:string;
    location: Location;
    social:Social;
}

export interface Skills {
    name:string;
    category:string;
}

export interface Location {
    city:string;
    country:string;
    street:string;
    postal_code:string;
}

export interface Social {
    github:string;
    linkedin:string;
    instagram:string;
    facebook:string;
    website:string;
}


export interface ApiResponseProfile<T> {
    userData:T;
}
