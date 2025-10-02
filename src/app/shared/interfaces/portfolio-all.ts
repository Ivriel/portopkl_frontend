export interface PortfolioAll {
    _id:string;
    title:string;
    category:string;
    status:string;
    typeProject:string;
    thumbnail:string;
}

export interface ApiResponsePortfolioAll<T> {
    data:T;
}