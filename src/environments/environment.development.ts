export const environment = {
    production:false,
    apiUrl:"https://portopklbackend-production-56a2.up.railway.app/api/",
    apiBranchUrl: {
        login:'auth/login',
        getAllPortfolio:'portfolio/GetAllPortfolio',
        getPortfolioById:'portfolio/GetPortfolioById/',
        getDashboardSummary:'portfolio/getDashboardSummary',
        addPortfolio:'portfolio/addPortfolio',
        deletePortfolio:'portfolio/deletePortfolio/',
        updatePortfolio:'portfolio/updatePortfolio/',
        getGalleryPortfolio:'portfolio/getPortfolioGallery',
        getProfile:'UserToken/getSelfUser',
        updateProfile:'UserToken/updateUser',
        changePassword:'UserToken/change-password',
        getSetting:'setting/getSetting',
        updateSetting:'setting/updateSetting',
        getSettingAboutMe:'SettingAboutMe/getSettingAboutMe',
        updateSettingAboutMe:'SettingAboutMe/updateSettingAboutMe'
    }
};
