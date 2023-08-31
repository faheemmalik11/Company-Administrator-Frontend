import React, { useEffect, useState } from "react";
import { getAllFinanceCategories, getFinanceDatabyId, updateFinanceData } from "services/finance";
import { useParams, useNavigate } from "react-router-dom";
import { Ifinance } from "app/interfaces/finance";
import { IaddFinance } from "app/interfaces/add_finance";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import Select from "react-select"
import * as Yup from 'yup';
import { IaddFinanceCategory } from "app/interfaces/add_financeCategories";
import { getFinanceCategorybyId, updateFinanceCategory } from "services/finance_categories";
//import Alert from "./updateAlert";

const finance: IaddFinanceCategory = {
    name: '',
    slug: '',
    color_code: '',
    description: '',
};

const UpdateFinanceCategory = () => {
    const { category_id } = useParams();
    const navigate = useNavigate();
    const [financeData, setFinanceData] = useState<IaddFinanceCategory>(finance);
    const [select_errorMessage, setSelect_ErrorMessage] = useState<string>('');
    const [select_isTouched, setSelect_IsTouched] = useState<boolean>(false);
    const [isAlert, setIsAlert] = useState<boolean>(false);
    const [responseMessage, setResponseMessage] = useState<string>('');

    useEffect(() => {
        const getFinance = async () => {
            // const response = await getAllFinanceCategories();
            // console.log('response', response)
            // const category: CategoryOption[] = [];
            // for (let i = 0; i < response.finance_category.length; i++) {
            //     category.push({
            //         label: response.finance_category[i].name,
            //         value: response.finance_category[i].id
            //     });
            // }
            // setFinanceCategoryOption(category)
            const response = await getFinanceCategorybyId(category_id)
           console.log('response', response);

            setFinanceData(response)


            // let initiallySelectedCategory: CategoryOption = { label: '', value: 0 };

            // for (let i = 0; i < category.length; i++) {
            //     if (responseFinance.finance_category_id == category[i].value) {
            //         console.log('pakistan')
            //         initiallySelectedCategory.label = category[i].label;
            //         initiallySelectedCategory.value = category[i].value
            //     }

            // }
            // setInitiallySelectedOption(initiallySelectedCategory)
        }
        getFinance()

    }, [])

    console.log('finance data by id', financeData)
    const validationSchema = Yup.object({
        name: Yup.string().required('Name is required'),
        slug: Yup.string().required('Slug is required'),
        color_code: Yup.string().required('Color Code is required'),
        description: Yup.string().max(255, 'Must be 255 characters or less').min(3, 'Minimum 3 characters'),
    });

    const onSubmit = async (values: IaddFinanceCategory, { resetForm }: any) => {
        const name = values.name;
        const slug = values.slug;
        const description = values.description;
        const color_code = values.color_code;


        const response = await updateFinanceCategory({
            name,
            slug,
            color_code,
            description
        }, category_id);
        if (response.code === 200) {
            console.log(response.data.message)
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
             {/* {isAlert && <Alert responseMessage={responseMessage}
                setIsAlert={setIsAlert}
                 />} */}
            <h1>Update Finance Data</h1>
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
                                <label>Name</label>
                                <br />
                                <div style={{ border: '1px solid black' }}>
                                    <Field
                                        border="1px solid black"
                                        name="name"
                                        type="text"
                                    //  className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')}
                                    />
                                </div>
                            </div>
                            <div style={{ color: 'red' }}>
                                <ErrorMessage name="name" />
                            </div>
                            <div>
                                <label>Slug</label>
                                <br />
                                <div style={{ border: '1px solid black' }}>
                                    <Field
                                        name="slug"
                                        type="text"
                                    //   className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')}
                                    />
                                </div>
                            </div>
                            <div style={{ color: 'red' }}>
                                <ErrorMessage name="slug" />
                            </div>
                            <div>
                                <label>Color Code</label>
                                <br />
                                <div style={{ border: '1px solid black' }}>
                                    <Field
                                        name="color_code"
                                        type="text"
                                    // className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')}
                                    />
                                </div>
                            </div>
                            <div style={{ color: 'red' }}>
                                <ErrorMessage name="color_code" />
                            </div>
                            <div>
                                <label>Description</label>
                                <br />
                                <div style={{ border: '1px solid black' }}>
                                    <Field
                                        name="description"
                                        type="text"
                                    //    className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')}
                                    />
                                </div>
                            </div>
                            <div style={{ color: 'red' }}>
                                <ErrorMessage name="description" />
                            </div>

                            <div className="login__buttons">
                                <button className="btn login__card-btn" type="submit" disabled={false}>
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