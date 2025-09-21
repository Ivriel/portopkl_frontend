export interface PortfolioById {
    _id:string;
    title:string;
    description:string;
    thumbnail:string;
    images:string[];
    technologies:Technologies[];
    category:string;
    status:string;
    githubUrl:string;
    typeProject:string;
}

export interface Technologies {
    name:string;
    color:string;
    _id:string;
}
