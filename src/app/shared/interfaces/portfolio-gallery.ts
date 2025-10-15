export interface PortfolioGallery {
    _id:string;
    thumbnail:string;
    title:string;
    category:string;
    description:string;
    technologies:Technologies[];
}

export interface Technologies {
    _id:string;
    name:string;
    color:string;
}

export interface ApiResponsePortfolioGallery<T> {
    data:T;
}