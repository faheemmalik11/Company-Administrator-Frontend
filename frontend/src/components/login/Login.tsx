import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { login, loginUser } from 'services/auth';
import { useContext } from 'react';
import AuthContext from 'app/contexts/authContext';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Alert from './Alert';

interface ISubmitProps {
    email: string;
    password: string;
}

const initialValues = { email: '', password: '' };

const Login = () => {
    const { setUser, user, setToken } = useContext(AuthContext);
    const navigate = useNavigate();
    const [responseMessage, setResponseMessage] = useState<string>('');
    const [isAlert, setIsAlert] = useState<boolean>(false);

    // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     setAdmin(event.target.checked);
    // }


    const validationSchema = Yup.object({
        email: Yup.string().trim().email('Email is invalid').required('Email is required'),
        password: Yup.string().required('Password is required'),
    });

    const onSubmit = async (values: ISubmitProps) => {
        const email = values.email;
        const password = values.password;
        
        const response = await loginUser({ email, password });
        
        console.log(response);
        if (response.data?.token) {
            setUser(response.data.user);
            setToken(response.data.token);
            navigate('/dashboard');
        }
        else{
            setResponseMessage(response.message);
            setIsAlert(true)
        }
    };

    return (
        <>
        {isAlert && <Alert responseMessage={responseMessage} setIsAlert={setIsAlert}/>}
            <section className="vh-100 login">
                <div className="login-background"></div>
                <div className="login-container h-100">
                    <div className="row login__content">
                        <div className="col-sm-12 col-md-9 col-lg-7 col-xl-6 login__content-column p-0">
                            <div className="card login__card">
                                <div className="login__card-header">
                                    <div className="flex-column flex-sm-row flex-md-row d-flex justify-content-between">
                                        <div className="login__card-text">
                                            <p>Company Management System</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body login__card-body text-center">
                                    <div className="login__card-inputs">
                                        {/* {errors && (
                                            
                                            {user.auth.payload.message}
                                            
                                        )} */}

                                        <Formik
                                            initialValues={initialValues}
                                            validationSchema={validationSchema}
                                            onSubmit={onSubmit}>
                                            {({ errors, status, touched }) => {
                                                // console.log('errors: ', errors);
                                                // console.log('status: ', status);
                                                // console.log('touched: ', touched);
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
            </section>
        </>
    );
};

export default Login;
