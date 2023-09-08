import IRoute from "app/interfaces/route";
import HomePage from "pages/Home";
// import MyIpPage from "../pages/MyIp"
import DashboardPage from "pages/Dashboard";
import LoginPage from "pages/login";
import Add_EmployeePage from "pages/Add_Employee";
import Update_EmployeePage from "pages/Update_Employee";
import IncrementHistoryPage from "pages/IncrementHistory_Employee";
import CompanyLoginPage from "pages/loginCompany";
import UpdateIncrementHistoryPage from "pages/Update_incrementHistory";
import FinancePage from "pages/Finance";
import Add_FinancePage from "pages/Add_Finance";
import Update_FinancePage from "pages/Update_Finance";
import CategoriesPage from "pages/Category_Inventory";
import ItemsPage from "pages/Items_Inventory";
import StorePage from "pages/Stores_Inventory";
import FinanceCategoriesPage from "pages/FinanceCategories";
import Add_FinanceCategoryPage from "pages/Add_FinanceCategory";
import Update_FinanceCategoryPage from "pages/Update_FinanceCategory";
import Add_InventoryStorePage from "pages/AddStore_inventory";
import Add_InventoryCategoryPage from "pages/AddCategory_inventory";
import Add_InventoryItemPage from "pages/AddItem_inventory";
import UpdateInventoryCategoryPage from "pages/UpdateCategory_inventory";
import UpdateInventoryStorePage from "pages/UpdateStore_inventory";
import UpdateInventoryItemPage from "pages/UpdateItem_inventory";
import TeamPage from "pages/Team";
import TeamMembersPage from "pages/TeamMembers";
import Add_TeamPage from "pages/Add_Team";
import UpdateTeamPage from "pages/Update_Team";
import Update_CompanySettingPage from "pages/Update_CompanySetting";
import ResetPasswordPage from "pages/ResetPassword";

const routes: IRoute[] = [
    {
        path: '/',
        name: 'Home',
        component: HomePage,

    }, 
    {
        path: '/home',
        name: 'Home',
        component: HomePage
    }, 
    {
        path: '/login',
        name: 'Login',
        component: LoginPage
    }, 
    {
        path: '/companylogin',
        name: 'CompanyLogin',
        component: CompanyLoginPage
    }, 
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: DashboardPage
    }, 
    {
        path: '*',
        name: 'Home',
        component: HomePage
    },
    {
        path: '/add_employee',
        name: 'Add_Employee',
        component: Add_EmployeePage
    },
    {
        path: '/update_employee/:Id',
        name: 'Update_Employee',
        component: Update_EmployeePage
    },
    {
        path: '/incrementHistory_employee/:Id',
        name: 'IncrementHistory_Employee',
        component: IncrementHistoryPage
    },
    {
        path: '/updateIncrementHistory_employee/:inc_id',
        name: 'UpdateIncrementHistory_Employee',
        component: UpdateIncrementHistoryPage
    },
    {
        path: '/Finance',
        name: 'Finance',
        component: FinancePage
    },
    {
        path: '/add_Finance',
        name: 'Add_Finance',
        component: Add_FinancePage
    },
    {
        path: '/update_Finance/:finance_id',
        name: 'Update_Finance',
        component: Update_FinancePage
    },
    {
        path: '/categories',
        name: 'Categories',
        component: CategoriesPage
    },
    {
        path: '/items',
        name: 'Items',
        component: ItemsPage
    },
    {
        path: '/stores',
        name: 'Stores',
        component: StorePage
    },
    {
        path: '/finance_categories',
        name: 'Finance_Categories',
        component: FinanceCategoriesPage
    },
    {
        path: '/add_financeCategories',
        name: 'Add_FinanceCategories',
        component: Add_FinanceCategoryPage
    },
    {
        path: '/update_financeCategories/:category_id',
        name: 'Update_FinanceCategories',
        component: Update_FinanceCategoryPage
    },
    {
        path: '/add_Store',
        name: 'Add_Store',
        component: Add_InventoryStorePage
    },
    {
        path: '/add_Category',
        name: 'Add_Category',
        component: Add_InventoryCategoryPage
    },
    {
        path: '/add_Item',
        name: 'Add_Item',
        component: Add_InventoryItemPage
    },
    {
        path: '/update_Category/:cat_id',
        name: 'Update_Category',
        component: UpdateInventoryCategoryPage
    },
    {
        path: '/update_Store/:store_id',
        name: 'Update_Store',
        component: UpdateInventoryStorePage
    },
    {
        path: '/update_Item/:item_id',
        name: 'Update_Item',
        component: UpdateInventoryItemPage
    },
    {
        path: '/team',
        name: 'Team',
        component: TeamPage
    },
    {
        path: '/team_members/:team_id',
        name: 'TeamMembers',
        component: TeamMembersPage
    },
    {
        path: '/add_team',
        name: 'Add_Team',
        component: Add_TeamPage
    },
    {
        path: '/update_team/:team_id',
        name: 'Update_Team',
        component: UpdateTeamPage
    },
    {
        path: '/update_setting',
        name: 'Update_Setting',
        component: Update_CompanySettingPage
    },
    {
        path: '/reset_password',
        name: 'Reset_Password',
        component: ResetPasswordPage
    }

    // {
    //     path: '/my-ip',
    //     name: 'My IP',
    //     component: MyIpPage
    // }
];

export default routes;