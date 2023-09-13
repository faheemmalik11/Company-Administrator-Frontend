import React, { useEffect, useState } from "react";
import { getAllFinanceCategories, getFinanceDatabyId, updateFinanceData } from "services/finance";
import { useParams, useNavigate } from "react-router-dom";
import { Ifinance } from "app/interfaces/finance";
import { IaddFinance } from "app/interfaces/add_finance";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import Select from "react-select"
import * as Yup from 'yup';
import Alert from "UI/updateAlert";
interface CategoryOption {
    label: string,
    value: number
}
const finance: IaddFinance = {
    finance_category_id: '',
    amount: '',
    tax_deduction: '',
    check_number: '',
    description: ''
}

const UpdateFinance = () => {
    const { finance_id } = useParams();
    const navigate = useNavigate();
    const [initiallySelectedOption, setInitiallySelectedOption] = useState<CategoryOption>({ label: '', value: 0 })
    const [financeCategoryOption, setFinanceCategoryOption] = useState<CategoryOption[]>([])
    const [financeData, setFinanceData] = useState<IaddFinance>(finance);
    const [select_errorMessage, setSelect_ErrorMessage] = useState<string>('');
    const [select_isTouched, setSelect_IsTouched] = useState<boolean>(false);
    const [isAlert, setIsAlert] = useState<boolean>(false);
    const [responseMessage, setResponseMessage] = useState<string>('');

    useEffect(() => {
        const getFinance = async () => {
            const response = await getAllFinanceCategories();
            const category: CategoryOption[] = [];
            for (let i = 0; i < response.finance_category.length; i++) {
                category.push({
                    label: response.finance_category[i].name,
                    value: response.finance_category[i].id
                });
            }
            setFinanceCategoryOption(category)
            const responseFinance = await getFinanceDatabyId(finance_id);

            setFinanceData(responseFinance)


            let initiallySelectedCategory: CategoryOption = { label: '', value: 0 };

            for (let i = 0; i < category.length; i++) {
                if (responseFinance.finance_category_id == category[i].value) {
                    initiallySelectedCategory.label = category[i].label;
                    initiallySelectedCategory.value = category[i].value
                }

            }
            setInitiallySelectedOption(initiallySelectedCategory)
        }
        getFinance()

    }, [])
    const validationSchema = Yup.object({
        amount: Yup.number().required('Amount is required'),
        check_number: Yup.string().required('Check No. is required'),
        description: Yup.string().max(255, 'Must be 255 characters or less').min(3, 'Minimum 3 characters'),
    });

    const onSubmit = async (values: IaddFinance, { resetForm }: any) => {
        const finance_category_id = initiallySelectedOption.value;
        const amount = values.amount;
        const check_number = values.check_number;
        const description = values.description;
        const tax_deduction = values.tax_deduction;


        const response = await updateFinanceData({
            finance_category_id,
            amount,
            check_number,
            description,
            tax_deduction,
        }, finance_id);
        if (response.code === 200) {
            setResponseMessage(response.data.message);
            navigate('/finance',{state:{finance_id:finance_id}});
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

    const validateSelection = () => {
        if (initiallySelectedOption.value === 0) {
            setSelect_ErrorMessage('Please select an option.');
        } else {
            setSelect_ErrorMessage('');
        }
    };

    const handleSelect = (e: any) => {
        let category: CategoryOption = { label: '', value: 0 };
        category.label = e.label,
            category.value = e.value
        setInitiallySelectedOption(category)
        if (select_isTouched) {
            validateSelection();
        }
    };

    const handleBlur = () => {
        setSelect_IsTouched(true);
        validateSelection();
    };
    return (
        <React.Fragment>
             {isAlert && <Alert responseMessage={responseMessage}
                setIsAlert={setIsAlert}
                 />}
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
                            <div>Select a finance category
                                <Select
                                    required
                                    value={initiallySelectedOption}
                                    name='finance_category_id'
                                    options={financeCategoryOption}
                                    onChange={handleSelect}
                                    onBlur={handleBlur}
                                    className="basic-multi-select"
                                    classNamePrefix="select" />
                                {select_errorMessage && <p style={{ color: 'red' }}>{select_errorMessage}</p>}
                            </div>

                            <div>
                                <label>Amount</label>
                                <br />
                                <div style={{ border: '1px solid black' }}>
                                    <Field
                                        border="1px solid black"
                                        name="amount"
                                        type="number"
                                    //  className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')}
                                    />
                                </div>
                            </div>
                            <div style={{ color: 'red' }}>
                                <ErrorMessage name="amount" />
                            </div>
                            <div>
                                <label>Tax Deduction</label>
                                <br />
                                <div style={{ border: '1px solid black' }}>
                                    <Field
                                        name="tax_deduction"
                                        type="number"
                                    //   className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')}
                                    />
                                </div>
                            </div>
                            <div>
                                <label>Check Number</label>
                                <br />
                                <div style={{ border: '1px solid black' }}>
                                    <Field
                                        name="check_number"
                                        type="text"
                                    // className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')}
                                    />
                                </div>
                            </div>
                            <div style={{ color: 'red' }}>
                                <ErrorMessage name="check_number" />
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
                                <button className="btn login__card-btn" type="submit" disabled={false} onClick={() => {
                                    resetForm;
                                    if (initiallySelectedOption.value === 0) {
                                        setSelect_ErrorMessage('Please select an option.');
                                    } else {
                                        setSelect_ErrorMessage('');
                                    }
                                }}>
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

export default UpdateFinance