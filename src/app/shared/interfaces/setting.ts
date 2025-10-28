export interface Setting {
    _id:string;
    backgroundImageVisitor:string;
    backgroundColorVisitor:string;
    backgroundSvgVisitor:string;
    isBackgroundImageVisitor:boolean;
    isBackgroundColorVisitor:boolean;
    isBackgroundSvgVisitor:boolean;
}

export interface ApiResponseSetting<T> {
    data:T;
}