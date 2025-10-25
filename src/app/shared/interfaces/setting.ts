export interface Setting {
    _id:string;
    backgroundImageVisitor:string;
    backgroundImageAdmin:string;
    backgroundColorVisitor:string;
    backgroundColorAdmin:string;
    backgroundSvgVisitor:string;
    backgroundSvgAdmin:string;
}

export interface ApiResponseSetting<T> {
    data:T;
}