import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { IaddFinanceCategory } from "app/interfaces/add_financeCategories";
import { getFinanceCategorybyId, updateFinanceCategory } from "services/finance_categories";
import Alert from "UI/updateAlert";
import { labelStyle, inputStyle } from 'UI/formStyle';

const finance: IaddFinanceCategory = {
    name: '',
    color_code: '',
    description: '',
};

const UpdateFinanceCategory = () => {
    const { category_id } = useParams();
    const navigate = useNavigate();
    const [financeData, setFinanceData] = useState<IaddFinanceCategory>(finance);
    const [isAlert, setIsAlert] = useState<boolean>(false);
    const [responseMessage, setResponseMessage] = useState<string>('');

    useEffect(() => {
        const getFinance = async () => {
            const response = await getFinanceCategorybyId(category_id)
            setFinanceData(response)  
        }
        getFinance()

    }, [])

    const validationSchema = Yup.object({
        name: Yup.string().required('Name is required'),
        slug: Yup.string().required('Slug is required'),
        color_code: Yup.string().required('Color Code is required'),
        description: Yup.string().max(255, 'Must be 255 characters or less').min(3, 'Minimum 3 characters'),
    });

    const onSubmit = async (values: IaddFinanceCategory, { resetForm }: any) => {
        const name = values.name;
        const description = values.description;
        const color_code = values.color_code;


        const response = await updateFinanceCategory({
            name,
            color_code,
            description
        }, category_id);
        if (response.code === 200) {
            setResponseMessage(response.data.message);
            navigate('/finance',{state:{category_id}});
        }
        else {
            setResponseMessage(response.message)
            setIsAlert(true);
        }
        // if(location.state !== null){
        //     location.state=null;
        // }
        //setIsAlert(true);
      //  resetForm();
    };

    return (
        <React.Fragment>
             {isAlert && <Alert responseMessage={responseMessage}
                setIsAlert={setIsAlert}
                 />}
            <h1>Update Finance Category</h1>
            <Formik
                initialValues={financeData}
                validationSchema={validationSchema}
                enableReinitialize
                onSubmit={onSubmit}
                >
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
                                <button className="btn login__card-btn bg-sky-400" type="submit" disabled={false}>
                                    Submit
                                </button>
                            </div>
                        </Form>
                    );
                }}
            </Formik>
        </React.Fragment>
    )
}

export default UpdateFinanceCategory