export interface SettingAboutMe {
    _id:number;
    nama:string;
    kelas:string;
    description:string;
    contacts: Contacts[];
    imageAboutMe:string;
}

export interface Contacts {
    _id:string;
    icon:string;
    link:string; 
}

export interface ApiResponseSettingAboutMe<T> {
    data:T;
}