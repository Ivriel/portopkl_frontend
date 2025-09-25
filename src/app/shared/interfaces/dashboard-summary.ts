export interface DashboardSummary {
    totalPortfolio:number;
    totalOnProgressProject:number;
    totalFinishedProject:number;
    totalIndustryProject:number;
    totalPersonalProject:number;
    totalWebProject:number;
    totalMobileProject:number;
}

export interface ApiResponseDashboardSummary<T> {
    data:T;
}