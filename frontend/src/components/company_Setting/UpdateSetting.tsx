import React, { useContext, useEffect, useState } from 'react';
import AuthContext from 'app/contexts/authContext';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { IcompanySetting } from 'app/interfaces/companySetting';
import * as Yup from 'yup';
import { updateCompany } from 'services/companySetting';
import { useNavigate } from 'react-router-dom';
import Alert from 'UI/updateAlert';
import { labelStyle, inputStyle } from 'UI/formStyle';

const initialValues: IcompanySetting = {
    name: '',
    phone: '',
    website: '',
    address: '',
};

const UpdateSetting = () => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const [companyData, setCompanyData] = useState <IcompanySetting>(initialValues);
    const [isAlert, setIsAlert] = useState<boolean>(false);
    const [responseMessage, setResponseMessage] = useState<string>('');

    useEffect(() => {
        setCompanyData({
            name: user.name,
            address: user.address,
            phone: user.phone,
            website: user.website,
        });
    }, []);

    const validationSchema = Yup.object({
        name: Yup.string().required('Name is required'),
        address: Yup.string().required('Address is required'),
        phone: Yup.string().required('Phone No. is required'),
        website: Yup.string().required('Website is required')
    });
    const onSubmit = async (values: IcompanySetting, { resetForm }: any) => {
        const name = values.name;
        const address = values.address;
        const phone = values.phone;
        const website = values.website;

        const response = await updateCompany({
            name,
            address,
            website,
            phone,
        }, user.id);
        if (response.code === 200) {
            setResponseMessage(response.data.message);
            navigate('/dashboard');
        }
        else {
            setResponseMessage(response.message)
            setIsAlert(true);
        }
    };
    const resetPasswordHandler = () => {
        navigate('/reset_password')
    }
    return (
        <React.Fragment>
            {isAlert && <Alert responseMessage={responseMessage}
                setIsAlert={setIsAlert}
                 />}
            <h2>Update Setting</h2>
            <br/>
            <button className='bg-sky-400' onClick={resetPasswordHandler}>Reset Password</button>
            <Formik
                initialValues={companyData}
                enableReinitialize
                validationSchema={validationSchema}
                onSubmit={onSubmit}>
                {({ errors, status, touched, resetForm }) => {
                    return (
                        <Form className="login__card-form">
                            <br />

                            <div>
                                <label className={labelStyle}>Name</label>
                                <br />
                                <div >
                                    <Field
                                        border="1px solid black"
                                        name="name"
                                        type="text"
                                        className={inputStyle}
                                    />
                                </div>
                            </div>
                            <div style={{ color: 'red' }}>
                                <ErrorMessage name="name" />
                            </div>
                            <div>
                                <label className={labelStyle}>Phone No.</label>
                                <br />
                                <div >
                                    <Field
                                        name="phone"
                                        type="string"
                                        className={inputStyle}
                                    />
                                </div>
                            </div>
                            <div style={{ color: 'red' }}>
                                <ErrorMessage name="phone" />
                            </div>
                            <div>
                                <label className={labelStyle}>Website</label>
                                <br />
                                <div >
                                    <Field
                                        name="website"
                                        type="text"
                                        className={inputStyle}
                                    />
                                </div>
                            </div>
                            <div style={{ color: 'red' }}>
                                <ErrorMessage name="website" />
                            </div>
                            <div>
                                <label className={labelStyle}>Address</label>
                                <br />
                                <div>
                                    <Field
                                        name="address"
                                        type="text"
                                        className={inputStyle}
                                    />
                                </div>
                            </div>
                            <div style={{ color: 'red' }}>
                                <ErrorMessage name="address" />
                            </div>

                            <div className="login__buttons">
                                <button className="btn login__card-btn bg-sky-400" type="submit" disabled={false}>
                                    Submit
                                </button>
                            </div>
                        </Form>
                    );
                }}
            </Formik>
        </React.Fragment>
    );
};

export default UpdateSetting;
