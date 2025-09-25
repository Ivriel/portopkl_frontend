export const environment = {
    production:true,
    apiUrl:"https://portopklbackend-production.up.railway.app/api/",
    apiBranchUrl: {
        login:'auth/login',
        register:'auth/register',
        getAllPortfolio:'portfolio/GetAllPortfolio',
        getPortfolioById:'portfolio/GetPortfolioById/',
        getDashboardSummary:'portfolio/getDashboardSummary',
        getProfile:'UserToken/getSelfUser'
    }
};
