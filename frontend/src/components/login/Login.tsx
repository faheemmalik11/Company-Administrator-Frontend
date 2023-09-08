import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { login, loginUser } from 'services/auth';
import { useContext } from 'react';
import AuthContext from 'app/contexts/authContext';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Alert from './Alert';
import celestialImage from 'assets/celestials-logo-300x97-1.png';
import LoginUserForm from './loginUserForm';

interface ISubmitProps {
    email: string;
    password: string;
}

const initialValues = { email: '', password: '' };

const Login = () => {
    // const { setUser, user, setToken } = useContext(AuthContext);
    // const navigate = useNavigate();
    // const [responseMessage, setResponseMessage] = useState<string>('');
    // const [isAlert, setIsAlert] = useState<boolean>(false);



    // const validationSchema = Yup.object({
    //     email: Yup.string().trim().email('Email is invalid').required('Email is required'),
    //     password: Yup.string().required('Password is required'),
    // });

    // const onSubmit = async (values: ISubmitProps) => {
    //     const email = values.email;
    //     const password = values.password;
        
    //     const response = await loginUser({ email, password });
        
    //     console.log(response);
    //     if (response.data?.token) {
    //         setUser(response.data.user);
    //         setToken(response.data.token);
    //         navigate('/dashboard');
    //     }
    //     else{
    //         setResponseMessage(response.message);
    //         setIsAlert(true)
    //     }
    // };

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
            <LoginUserForm />
            
          </div>
          
        </div>
        <div className="py-5 flex justify-center items-center absolute w-full bottom-0">
            <p className=" text-[#8a8c99] text-[0.85rem]">
              © 2023 Ryzeo
            </p>
          </div>
      </div>




        {/* {isAlert && <Alert responseMessage={responseMessage} setIsAlert={setIsAlert}/>}
            <section className="vh-100 login">
                <div className="login-background"></div>
                <div className="login-container h-100">
                    <div className="row login__content">
                        <div className="col-sm-12 col-md-9 col-lg-7 col-xl-6 login__content-column p-0">
                            <div className="card login__card">
                                <div className="login__card-header">
                                    <div className="flex-column flex-sm-row flex-md-row d-flex justify-content-between">
                                        <div className="login__card-text">
                                            <p>CELESTIALS MANAGEMENT SYSTEM</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body login__card-body text-center">
                                    <div className="login__card-inputs">
                                       

                                        <Formik
                                            initialValues={initialValues}
                                            validationSchema={validationSchema}
                                            onSubmit={onSubmit}>
                                            {({ errors, status, touched }) => {
                                                
                                                return (
                                                    <Form className="login__card-form">
                                                        <br />
                                                        <div>
                                                             <b>Login User</b>
                                                        </div>
                                                        <br />

                                                        <div className="form-outline">
                                                            <label>Email</label>
                                                            <br />
                                                            <Field
                                                                name="email"
                                                                type="text"
                                                                className={
                                                                    'form-control' +
                                                                    (errors.email && touched.email ? ' is-invalid' : '')
                                                                }
                                                            />
                                                        </div>
                                                        <div style={{ color: 'red' }}>
                                                            <ErrorMessage name="email" />
                                                        </div>
                                                        <div className="form-outline password">
                                                            <label>Password</label>
                                                            <br />
                                                            <Field
                                                                name="password"
                                                                type="password"
                                                                className={
                                                                    'form-control' +
                                                                    (errors.password && touched.password
                                                                        ? ' is-invalid'
                                                                        : '')
                                                                }
                                                            />
                                                        </div>
                                                        <div style={{ color: 'red' }}>
                                                            <ErrorMessage name="password" />
                                                        </div>

                                                        <div className="login__buttons">
                                                            <button
                                                                className="btn login__card-btn"
                                                                type="submit"
                                                                disabled={false}>
                                                                Log In
                                                            </button>
                                                        </div>
                                                    </Form>
                                                );
                                            }}
                                        </Formik>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section> */}
        </>
    );
};

export default Login;
