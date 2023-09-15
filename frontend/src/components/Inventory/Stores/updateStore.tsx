import React, { useEffect, useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Alert from 'UI/updateAlert';
import Select from 'react-select';
import { getAllCategories } from 'services/inventory_categories';
import { IaddStore } from 'app/interfaces/inventory_addStore';
import { addInventoryStore, getInventoryStorebyId, updateInventoryStore } from 'services/inventory_stores';
import { useParams, useNavigate } from 'react-router-dom';
import { labelStyle, inputStyle } from 'UI/formStyle';

const storeInitialValues: IaddStore = {
    name: '',
    unique_identifier: '',
    description: '',
    categories_id: null
};

interface CategoryOption {
    label: string,
    value: number | null
}
const UpdateInventoryStore = () => {
    const navigate = useNavigate();
    const {store_id} = useParams();
    const [storeData, setStoreData] = useState<IaddStore>(storeInitialValues);
    const [CategoryOption, setCategoryOption] = useState<CategoryOption[]>([])
    const [isAlert, setIsAlert] = useState<boolean>(false);
    const [showLink, setShowLink] = useState<boolean>(false);
    const [responseMessage, setResponseMessage] = useState<string>('');
    const [select_errorMessage, setSelect_ErrorMessage] = useState<string>('');
    const [select_isTouched, setSelect_IsTouched] = useState<boolean>(false);
    const [selectedOptions, setSelectedOptions] = useState<CategoryOption[]>([]);
    const [categoriesId, setCategoriesId] = useState<number[]>([]);

    useEffect(() => {
        const getStore = async () => {
            const response = await getAllCategories();
            const category: CategoryOption[] = [];
            for (let i = 0; i < response.length; i++) {
                category.push({
                    label: response[i].name,
                    value: response[i].id
                });
            }
            setCategoryOption(category);



            const responseStore = await await getInventoryStorebyId(store_id);

            setStoreData(responseStore)
            const category_option: CategoryOption[] = [];
            const categories_id: number[] = [];
            for (let i = 0; i < responseStore.categories.length; i++) {
                category_option.push({
                    label: responseStore.categories[i].name,
                    value: responseStore.categories[i].id
                });
                categories_id.push(responseStore.categories[i].id)
            }
            setCategoriesId(categories_id)
            setSelectedOptions(category_option)
        }

        
        getStore()
        
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

        const response = await updateInventoryStore({
            name,
            unique_identifier,
            description,
            categories_id
        },store_id);

        if (response.code === 200) {
            setResponseMessage(response.data.message);
            navigate('/stores',{state:{store_id: store_id}});

        }
        else {
            setResponseMessage(response.message);
            setIsAlert(true);
        }
        // if(location.state !== null){
        //     location.state=null;
        // }
        setIsAlert(true);
        resetForm();
        setSelectedOptions([]);
    };
    const validateSelection = () => {
        if (categoriesId.length === 0) {
            setSelect_ErrorMessage('Please select an option.');
        } else {
            setSelect_ErrorMessage('');
        }
    };

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
            <h1>Update Store Data</h1>
            <Formik initialValues={storeData} enableReinitialize validationSchema={validationSchema} onSubmit={onSubmit}>
                {({ errors, status, touched, resetForm }) => {
                    return (
                        <Form className="login__card-form">
                            <br />
                            <div>
                                <label className={labelStyle}>Select category</label>
                                <Select
                                    required
                                    value={selectedOptions}
                                    isMulti
                                    name='finance_category_id'
                                    options={CategoryOption}
                                    onChange={handleSelect}
                                    onBlur={handleBlur}
                                    className="basic-multi-select"
                                    classNamePrefix="select" />
                                {select_errorMessage && <p style={{ color: 'red' }}>{select_errorMessage}</p>}
                            </div>
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
                                <label className={labelStyle}>Unique Identifier</label>
                                <br />
                                <div >
                                    <Field
                                        name="unique_identifier"
                                        type="text"
                                        className={inputStyle}
                                    />
                                </div>
                            </div>
                            <div style={{ color: 'red' }}>
                                <ErrorMessage name="unique_identifier" />
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
                                <button className="btn login__card-btn bg-sky-400" type="submit" disabled={false} onClick={() => {
                                    if (categoriesId.length === 0) {
                                        setSelect_ErrorMessage('Please select an option.');
                                    } else {
                                        setSelect_ErrorMessage('');
                                    }}}>
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

export default UpdateInventoryStore;
