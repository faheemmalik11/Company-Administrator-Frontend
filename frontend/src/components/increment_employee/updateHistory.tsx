import React, { useEffect, useState } from "react"
import { useParams } from "react-router"
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { getSingleIncrementHistory, updateIncrementHistory } from "services/incrementEmployee";
import { useLocation } from 'react-router-dom';
import { IincrementHistory } from "app/interfaces/incrementHistory";
import { useNavigate } from "react-router";
import Alert from "./updateAlert";

const InitialData: IincrementHistory = {
    created_at: '',
    employee_id: 0,
    id: 0,
    increment_amount: 0,
    increment_effective_date: '',
    notes: 'abc',
    updated_at: '',
}
const UpdateHistory = () => {
    const navigate = useNavigate()
    const location = useLocation();
    const { inc_id } = useParams();
    const [incrementData, setIncrementData] = useState<IincrementHistory>(InitialData);
    const [isAlert, setIsAlert] = useState<boolean>(false);
    const [responseMessage, setResponseMessage] = useState<string>('');

    useEffect(() => {
        const getHistory = async () => {
            const response = await getSingleIncrementHistory({ emp_id: location.state.Emp_id, id: inc_id });
            console.log('response in main', response);

            if (response.increment_effective_date) {
                const dateObject = new Date(response.increment_effective_date);
                const year = dateObject.getFullYear();
                const month = String(dateObject.getMonth() + 1).padStart(2, '0');
                const day = String(dateObject.getDate()).padStart(2, '0');
                response.increment_effective_date = `${year}-${month}-${day}`;
            }

            setIncrementData(response)
        }
        getHistory()
    }, [])
    console.log('increment data', incrementData)

    const onSubmit = async (values: IincrementHistory) => {

        const id = inc_id
        const emp_id = location.state.Emp_id
        const increment_amount = values.increment_amount;
        const increment_effective_date = values.increment_effective_date;
        const notes = values.notes;

        const response = await updateIncrementHistory({
            
            increment_amount,
            increment_effective_date,
            notes
        },emp_id, id);
        if (response.code === 200) {
            navigate(`/incrementHistory_employee/${location.state.Emp_id}`)
        }
        else {
            setResponseMessage(response.message)
            setIsAlert(true);
        }
        
        
        
    };
    return (
        <React.Fragment>
            {isAlert && <Alert responseMessage={responseMessage}
                setIsAlert={setIsAlert}
                 />}

            <h1>Update Increment History</h1>
            <Formik initialValues={incrementData} enableReinitialize onSubmit={onSubmit}>
                {({ errors, status, touched, resetForm }) => {
                    return (
                        <Form className="login__card-form">
                            <br />
                            
                            <div>
                                <label>Increment Amount</label>
                                <br />
                                <div style={{ border: '1px solid black' }}>
                                    <Field
                                        name="increment_amount"
                                        type="number"
                                    // className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')}
                                    />
                                </div>
                            </div>
                            <div>
                                <label>Notes</label>
                                <br />
                                <div style={{ border: '1px solid black' }}>
                                    <Field
                                        name="notes"
                                        type="text"
                                    //  className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')}
                                    />
                                </div>
                            </div>
                            <div>
                                <label>Increment Effective Date</label>
                                <br />
                                <div style={{ border: '1px solid black' }}>
                                    <Field
                                        name="increment_effective_date"
                                        type="date"
                                    //  className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')}
                                    />
                                </div>
                            </div>
                            <div className="login__buttons">
                                <button className="btn login__card-btn" type="submit" disabled={false}  >
                                    Update
                                </button>
                            </div>
                        </Form>
                    );
                }}
            </Formik>
        </React.Fragment>
    )
}
export default UpdateHistory