export interface AddPortfolio {
    title:string;
    description:string[];
    thumbnail:string;
    images:string[];
    technologies:Technologies[];
    category:string;
    status:string;
    githubUrl:string;

}

export interface Technologies {
    name:string;
    color:string;
}


export interface apiResponseAddPortfolio<T> {
    message:string;
    data:T
}