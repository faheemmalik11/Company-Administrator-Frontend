import celestialImage from 'assets/celestials-logo-300x97-1.png';
import LoginCompanyForm from './loginCompanyForm';

const LoginCompany = () => {

    return (
        <>       
        <div className='LoginPageBg h-[100vh]'>
        <div className="px-3 pt-12 mx-auto">
          <div className="w-full max-w-[28.063rem] rounded-3xl bg-white p-6 drop-shadow-xl mx-auto my-6">
            <img src={celestialImage} alt='greenLogo' className='w-44 mx-auto mb-6'/>
            <h5 className="text-center font-saira text-primary text-[1.063rem] font-medium mb-2 leading-5">
              Welcome Back !
            </h5>
            <p className="text-[0.85rem] text-[#878A99] text-center mb-4">
              Sign in to Continue
            </p>
            <LoginCompanyForm />
            
          </div>
          
        </div>
        <div className="py-5 flex justify-center items-center absolute w-full bottom-0">
            <p className=" text-[#8a8c99] text-[0.85rem]">
              © 2023 Ryzeo
            </p>
          </div>
      </div>
        </>
    );
};

export default LoginCompany;
