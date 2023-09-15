import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Alert from 'UI/Alert';
import { IaddCategory } from 'app/interfaces/inventory_addCategory';
import { addInventoryCategory } from 'services/inventory_categories';
import { labelStyle, inputStyle } from 'UI/formStyle';

const InitialValues: IaddCategory = {
    name: '',
    description: '',
};

const AddInventoryCategory = () => {
    const [isAlert, setIsAlert] = useState<boolean>(false);
    const [showLink, setShowLink] = useState<boolean>(false);
    const [responseMessage, setResponseMessage] = useState<string>('');

    const validationSchema = Yup.object({
        name: Yup.string().required('Name is required'),
        description: Yup.string().max(255, 'Must be 255 characters or less').min(3, 'Minimum 3 characters'),
    });
    const onSubmit = async (values: IaddCategory, { resetForm }: any) => {
        const name = values.name;
        const description = values.description;

        const response = await addInventoryCategory({
            name,
            description
        });
        if (response.code === 200) {
            setResponseMessage(response.data.message);
            setShowLink(true)

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
                showLink={showLink}
                setShowLink={setShowLink}
                linkValue={'categories'} />}
            <h1>Add new Category</h1>
            <Formik initialValues={InitialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
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

export default AddInventoryCategory;
