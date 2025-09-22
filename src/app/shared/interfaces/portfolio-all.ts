export interface PortfolioAll {
    _id:string;
    title:string;
    category:string;
    status:string;
    thumbnail:string;
}

export interface ApiResponseAll<T> {
    data:T;
}