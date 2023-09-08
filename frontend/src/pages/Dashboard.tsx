import Dashboard from 'components/dashboard';
import Auth from 'components/auth';

const DashboardPage = () => {
    return (
        <>
            <Auth>
                <Dashboard />
            </Auth>
        </>
    );
};

export default DashboardPage;