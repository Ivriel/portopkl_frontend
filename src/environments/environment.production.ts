export const environment = {
    production:true,
    apiUrl:"https://portopklbackend-production.up.railway.app/api/",
    apiBranchUrl: {
        login:'auth/login',
        register:'auth/register',
        getAllPortfolio:'portfolio/GetAllPortfolio',
        getPortfolioById:'portfolio/GetPortfolioById/',
        getDashboardSummary:'portfolio/getDashboardSummary',
        addPortfolio:'portfolio/addPortfolio',
        deletePortfolio:'portfolio/deletePortfolio/',
        updatePortfolio:'portfolio/updatePortfolio/',
        getProfile:'UserToken/getSelfUser',
        updateProfile:'UserToken/updateUser',
        deleteUser:'UserToken/deleteUser',
        changePassword:'UserToken/change-password',
        verifyPassword:'UserToken/verify-password'
    }
};
