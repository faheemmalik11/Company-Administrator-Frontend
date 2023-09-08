import React, { useEffect, useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Select from 'react-select';
import { IaddTeam } from 'app/interfaces/add_team';
import { getTeamDatabyId, getTeamLeads, updateTeamData } from 'services/team';
import Alert from 'UI/Alert';
import { useParams, useNavigate } from 'react-router-dom';

const InitialValues: IaddTeam = {
    name: '',
    team_lead_id: undefined,
    description: '',
};
interface employeeOption {
    label: string,
    value: number,
    disabled: boolean
}
const UpdateTeam = () => {
    const navigate = useNavigate();
    const { team_id } = useParams();
    const [Option, setOption] = useState<employeeOption[]>([]);
    const [storeData, setStoreData] = useState<IaddTeam>(InitialValues);
    const [select_errorMessage, setSelect_ErrorMessage] = useState<string>('');
    const [select_isTouched, setSelect_IsTouched] = useState<boolean>(false);
    const [selectedOptions, setSelectedOptions] = useState<employeeOption>({ label: '', value: 0, disabled: false });
    const [isAlert, setIsAlert] = useState<boolean>(false);
    const [showLink, setShowLink] = useState<boolean>(false);
    const [responseMessage, setResponseMessage] = useState<string>('');

    useEffect(() => {
        const getEmployees = async () => {
            const response = await getTeamLeads();
            const employee: employeeOption[] = [];
            for (let i = 0; i < response.length; i++) {
                employee.push({
                    label: response[i].name,
                    value: response[i].id,
                    disabled: response[i].already_team_lead
                });
            }
            setOption(employee);

            const responseTeam = await await getTeamDatabyId(team_id);

            setStoreData(responseTeam);

            let initiallySelectedEmployee: employeeOption = { label: '', value: 0, disabled: false };

            for (let i = 0; i < employee.length; i++) {
                if (responseTeam.team_lead_id == employee[i].value) {

                    initiallySelectedEmployee.label = employee[i].label;
                    initiallySelectedEmployee.value = employee[i].value
                }

            }
            setSelectedOptions(initiallySelectedEmployee);
            
        }
        getEmployees()
    }, [])
    const validationSchema = Yup.object({
        name: Yup.string().required('Name is required'),
        description: Yup.string().max(255, 'Must be 255 characters or less').min(3, 'Minimum 3 characters'),
    });
    const onSubmit = async (values: IaddTeam, { resetForm }: any) => {
        const team_lead_id = selectedOptions.value;
        const name = values.name;
        const description = values.description;

        const response = await updateTeamData({
            team_lead_id,
            name,
            description,
        }, team_id);

        if (response.code === 200) {
            setResponseMessage(response.data.message);
            navigate('/team',{state:{team_id}});
        }
        else {
            setResponseMessage(response.message)
            setIsAlert(true);
        }

       
       // resetForm();
    };
    const validateSelection = () => {
        if (selectedOptions.value === 0) {
            setSelect_ErrorMessage('Please select an option.');
        } else {
            setSelect_ErrorMessage('');
        }
    };

    const handleSelect = (e: any) => {
        let category: employeeOption = { label: '', value: 0, disabled: false };
        category.label = e.label,
            category.value = e.value
        setSelectedOptions(category)
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
            {isAlert && <Alert
                responseMessage={responseMessage}
                setIsAlert={setIsAlert}
                showLink={showLink}
                setShowLink={setShowLink}
                linkValue='Team' />}
            <h1>Update Team Data</h1>

            <Formik initialValues={storeData}
                enableReinitialize
                validationSchema={validationSchema}
                onSubmit={onSubmit}>
                {({ errors, status, touched, resetForm }) => {
                    return (
                        <Form className="login__card-form">
                            <br />
                            <div>Select a team lead
                                <Select
                                    required
                                    value={selectedOptions}
                                    name='finance_category_id'
                                    options={Option}
                                    isOptionDisabled={(option) => option.disabled}
                                    onChange={handleSelect}
                                    onBlur={handleBlur}
                                    className="basic-multi-select"
                                    classNamePrefix="select" />
                                {select_errorMessage && <p style={{ color: 'red' }}>{select_errorMessage}</p>}
                            </div>

                            <div>
                                <label>Team Name</label>
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
                                <button className="btn login__card-btn" type="submit" disabled={false} onClick={() => {
                                    resetForm;
                                    if (selectedOptions.value === 0) {
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
    );
}

export default UpdateTeam;
