import React, { useEffect, useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { IaddFinanceCategory } from 'app/interfaces/add_financeCategories';
import { addFinanceCategory } from 'services/finance_categories';
import Alert from 'UI/Alert';
import { labelStyle, inputStyle } from 'UI/formStyle';

const financeInitialValues: IaddFinanceCategory = {
    name: '',
    color_code: '',
    description: '',
};

const AddFinanceCategory = () => {
    const [isAlert, setIsAlert] = useState<boolean>(false);
    const [showFinanceLink, setShowFinanceLink] = useState<boolean>(false);
    const [responseMessage, setResponseMessage] = useState<string>('');

    const validationSchema = Yup.object({
        name: Yup.string().required('Name is required'),
        color_code: Yup.string().required('Color Code is required'),
        description: Yup.string().max(255, 'Must be 255 characters or less').min(3, 'Minimum 3 characters'),
    });
    const onSubmit = async (values: IaddFinanceCategory, { resetForm }: any) => {
        const name = values.name;
        const description = values.description;
        const color_code = values.color_code;


        const response = await addFinanceCategory({
            name,
            color_code,
            description
        });
        if (response.code === 200) {
            setResponseMessage(response.data.message);
            setShowFinanceLink(true)

        }
        else {
            setResponseMessage(response.message)
        }
        // if(location.state !== null){
        //     location.state=null;
        // }
        setIsAlert(true);
        resetForm();
    };

    return (
        <React.Fragment>
            {isAlert && <Alert
                responseMessage={responseMessage}
                setIsAlert={setIsAlert}
                showLink={showFinanceLink}
                setShowLink={setShowFinanceLink}
                linkValue='finance_categories' />}
            <h1>Add Finance Data</h1>
            <Formik initialValues={financeInitialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
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
                                <label className={labelStyle}>Color Code</label>
                                <br />
                                <div >
                                    <Field
                                        name="color_code"
                                        type="text"
                                        className={inputStyle}
                                    />
                                </div>
                            </div>
                            <div style={{ color: 'red' }}>
                                <ErrorMessage name="color_code" />
                            </div>
                            <div>
                                <label className={labelStyle}>Description</label>
                                <br />
                                <div >
                                    <Field
                                        name="description"
                                        type="text"
                                        className={inputStyle}
                                    />
                                </div>
                            </div>
                            <div style={{ color: 'red' }}>
                                <ErrorMessage name="description" />
                            </div>

                            <div className="login__buttons">
                                <button className="btn login__card-btn bg-sky-400" type="submit" disabled={false} >
                                    Submit
                                </button>
                            </div>
                        </Form>
                    );
                }}
            </Formik>
        </React.Fragment>
    );
}

export default AddFinanceCategory;
