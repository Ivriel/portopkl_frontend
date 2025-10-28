export interface Setting {
    _id:string;
    backgroundImageVisitor:string;
    backgroundColorVisitor:string;
    backgroundSvgVisitor:string;
}

export interface ApiResponseSetting<T> {
    data:T;
}