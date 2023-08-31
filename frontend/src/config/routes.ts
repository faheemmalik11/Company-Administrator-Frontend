import IRoute from "app/interfaces/route";
import HomePage from "../pages/Home";
// import MyIpPage from "../pages/MyIp"
import DashboardPage from "../pages/Dashboard";
import LoginPage from "../pages/login";
import Add_EmployeePage from "../pages/Add_Employee";
import Update_EmployeePage from "../pages/Update_Employee";
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
import AddFinanceCategory from "components/finance_categories/addFinanceCategory";
import Add_FinanceCategoryPage from "pages/Add_FinanceCategory";
import Update_FinanceCategoryPage from "pages/Update_FinanceCategory";

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
    }
    // {
    //     path: '/my-ip',
    //     name: 'My IP',
    //     component: MyIpPage
    // }
];

export default routes;