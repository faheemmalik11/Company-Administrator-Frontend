import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { login } from 'services/auth';
import React, { useContext } from 'react';
import AuthContext from 'app/contexts/authContext';
import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import Alert from 'UI/updateAlert';

interface ISubmitProps {
    email: string;
    password: string;
}
const initialValues = { email: '', password: '' };
const LoginCompanyForm = () => {
    const { setUser, user, setToken } = useContext(AuthContext);
    const navigate = useNavigate();
    const [responseMessage, setResponseMessage] = useState<string>('');
    const [isAlert, setIsAlert] = useState<boolean>(false);

    const validationSchema = Yup.object({
        email: Yup.string().trim().email('Email is invalid').required('Email is required'),
        password: Yup.string().required('Password is required'),
    });

    const onSubmit = async (values: ISubmitProps) => {
        const email = values.email;
        const password = values.password;

        const response = await login({ email, password });

        console.log(response);
        if (response.data?.token) {
            setUser(response.data.user);
            setToken(response.data.token);
            navigate('/dashboard');
        }
        else {
            setResponseMessage(response.message);
            setIsAlert(true)
        }
    };
    return (
        <React.Fragment>
            {isAlert && <Alert responseMessage={responseMessage} setIsAlert={setIsAlert}/>}
        <Formik
        
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}>
            {({ errors, status, touched }) => {

                return (
                    <Form className="mt-6 px-1.5 py-2">
                        <div>
                            <b>Login Company</b>


                        </div>
                        <br />

                        <div className="mb-4 text-[0.85rem]">
                            <label className="text-[#212529] font-medium">
                                Email</label>
                            <br />
                            <Field
                                name="email"
                                type="text"
                                className="border border-solid mt-2 border-[#CED4DA] py-2 px-[0.9rem] text-[#212529] rounded bg-[#E8F0FE] text-[0.85rem] w-full max-w-[24.063rem]"

                            />
                        </div>
                        <div style={{ color: 'red' }}>
                            <ErrorMessage name="email" />
                        </div>
                        <div className="mb-4 relative text-[0.85rem]">
                            <label className="text-[0.85rem] text-[#212529] font-medium">
                                Password</label>
                            <br />
                            <Field
                                name="password"
                                type="password"
                                className="border border-solid mt-2 border-[#CED4DA] py-2 px-[0.9rem] text-[#212529] rounded bg-[#E8F0FE] text-[0.85rem] w-full max-w-[24.063rem]"

                            // className={
                            //     'form-control' +
                            //     (errors.password && touched.password
                            //         ? ' is-invalid'
                            //         : '')
                            // }
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
                        <div>
                            <Link to=''>forget password</Link>
                        </div>
                    </Form>
                );
            }}
        </Formik>
        </React.Fragment>
    )
}

export default LoginCompanyForm;