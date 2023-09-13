import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Alert from "UI/updateAlert";
import { IaddCategory } from "app/interfaces/inventory_addCategory";
import { getInventoryCategorybyId, updateInventoryCategory } from "services/inventory_categories";

const finance: IaddCategory = {
    name: '',
    description: '',
};

const UpdateInventoryCategory = () => {
    const { cat_id } = useParams();
    const navigate = useNavigate();
    const [categoryData, setCategoryData] = useState<IaddCategory>(finance);
    const [isAlert, setIsAlert] = useState<boolean>(false);
    const [responseMessage, setResponseMessage] = useState<string>('');

    useEffect(() => {
        const getFinance = async () => {
            const response = await getInventoryCategorybyId(cat_id)
            setCategoryData(response)  
        }
        getFinance()

    }, [])

    const validationSchema = Yup.object({
        name: Yup.string().required('Name is required'),
        description: Yup.string().max(255, 'Must be 255 characters or less').min(3, 'Minimum 3 characters'),
    });

    const onSubmit = async (values: IaddCategory, { resetForm }: any) => {
        const name = values.name;
        const description = values.description;

        const response = await updateInventoryCategory({
            name,
            description
        }, cat_id);
        if (response.code === 200) {
            setResponseMessage(response.data.message);
            navigate('/categories',{state:{cat_id: cat_id}});
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
            <h1>Update Finance Data</h1>
            <Formik
                initialValues={categoryData}
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

export default UpdateInventoryCategory