import React, { useEffect, useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Alert from 'components/Inventory/Alert';
import Select from 'react-select';
import { getAllCategories } from 'services/inventory_categories';
import { IaddStore } from 'app/interfaces/inventory_addStore';
import { addInventoryStore } from 'services/inventory_stores';

const financeInitialValues: IaddStore = {
    name: '',
    unique_identifier: '',
    description: '',
    categories_id: null
};

interface CategoryOption {
    label: string,
    value: number | null
}
const AddInventoryStore = () => {
    const [CategoryOption, setCategoryOption] = useState<CategoryOption[]>([])
    const [isAlert, setIsAlert] = useState<boolean>(false);
    const [showFinanceLink, setShowFinanceLink] = useState<boolean>(false);
    const [responseMessage, setResponseMessage] = useState<string>('');
    const [select_errorMessage, setSelect_ErrorMessage] = useState<string>('');
    //const [select_isTouched, setSelect_IsTouched] = useState<boolean>(false);
    const [selectedOptions, setSelectedOptions] = useState<CategoryOption[]>([]);
    const [categoriesId, setCategoriesId] = useState<number[] | null>([]);

    useEffect(() => {
        const getCategory = async () => {
            const response = await getAllCategories();
            console.log('response', response)
            const category: CategoryOption[] = [];
            for (let i = 0; i < response.length; i++) {
                category.push({
                    label: response[i].name,
                    value: response[i].id
                });
            }
            setCategoryOption(category)
        }
        getCategory()
    }, [])

    const validationSchema = Yup.object({
        name: Yup.string().required('Name is required'),
        unique_identifier: Yup.string().required('Unique Identifier is required'),
        description: Yup.string().max(255, 'Must be 255 characters or less').min(3, 'Minimum 3 characters'),
    });
    const onSubmit = async (values: IaddStore, { resetForm }: any) => {
        const name = values.name;
        const description = values.description;
        const unique_identifier = values.unique_identifier;
        const categories_id = categoriesId;

        const response = await addInventoryStore({
            name,
            unique_identifier,
            description,
            categories_id
        });
        if (response.code === 200) {
            console.log(response.data.message)
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
    // const validateSelection = () => {
    //     if (selectedOptions.value === 0) {
    //         setSelect_ErrorMessage('Please select an option.');
    //     } else {
    //         setSelect_ErrorMessage('');
    //     }
    // };

    const handleSelect = (e: any) => {
        //let category: CategoryOption = { label: '', value: null };
        //category.label = e.label,
          //  category.value = e.value
        //setSelectedOptions(category)
        // if (select_isTouched) {
        //     validateSelection();
        // }

        const categories: CategoryOption[] = [];
        const catId = [];
        for (let i = 0; i < e.length; i++) {
            categories.push({
                label: e[i].label,
                value: e[i].value
            });
            catId.push(e[i].value);
        }
        setSelectedOptions(categories)
        setCategoriesId(catId);
       // console.log(rolesDataId);
        // if (select_isTouched) {
        //     validateSelection(rolesDataId);
        // }
    };

    // const handleBlur = () => {
    //     setSelect_IsTouched(true);
    //     validateSelection();
    // };
    return (
        <React.Fragment>
            {isAlert && <Alert
                responseMessage={responseMessage}
                setIsAlert={setIsAlert}
                showFinanceLink={showFinanceLink}
                setShowFinanceLink={setShowFinanceLink} 
                linkValue='add_Store'/>}
            <h1>Add Store Data</h1>
            <Formik initialValues={financeInitialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                {({ errors, status, touched, resetForm }) => {
                    return (
                        <Form className="login__card-form">
                            <br />
                            <div>Select category
                                <Select
                                    //required
                                    //value={selectedOptions}
                                    isMulti
                                    name='finance_category_id'
                                    options={CategoryOption}
                                    onChange={handleSelect}
                                    //onBlur={handleBlur}
                                    className="basic-multi-select"
                                    classNamePrefix="select" />
                                {select_errorMessage && <p style={{ color: 'red' }}>{select_errorMessage}</p>}
                            </div>
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
                                <label>Unique Identifier</label>
                                <br />
                                <div style={{ border: '1px solid black' }}>
                                    <Field
                                        name="unique_identifier"
                                        type="text"
                                    // className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')}
                                    />
                                </div>
                            </div>
                            <div style={{ color: 'red' }}>
                                <ErrorMessage name="unique_identifier" />
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
                                <button className="btn login__card-btn" type="submit" disabled={false} >
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

export default AddInventoryStore;
