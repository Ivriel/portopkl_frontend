import { register } from "module";

export const environment = {
    production:false,
    apiUrl:"https://portopklbackend-production.up.railway.app/api/",
    apiBranchUrl: {
        login:'auth/login',
        register:'auth/register',
        getAllPortfolio:'portfolio/GetAllPortfolio',
        getPortfolioById:'portfolio/GetPortfolioById/'
    }
};
