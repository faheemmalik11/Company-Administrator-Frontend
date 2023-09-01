import React, { useEffect, useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Alert from 'components/Inventory/Alert';
import { IaddCategory } from 'app/interfaces/inventory_addCategory';
import { addInventoryCategory } from 'services/inventory_categories';

const InitialValues: IaddCategory = {
    name: '',
    description: '',
};

const AddInventoryCategory = () => {
    const [isAlert, setIsAlert] = useState<boolean>(false);
    const [showFinanceLink, setShowFinanceLink] = useState<boolean>(false);
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

    return (
        <React.Fragment>
            {isAlert && <Alert
                responseMessage={responseMessage}
                setIsAlert={setIsAlert}
                showFinanceLink={showFinanceLink}
                setShowFinanceLink={setShowFinanceLink}
                linkValue={'categories'} />}
            <h1>Add Finance Data</h1>
            <Formik initialValues={InitialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
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

export default AddInventoryCategory;
