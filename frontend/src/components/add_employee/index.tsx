import React, { useEffect, useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { IregisterCompanyEmployee } from 'app/interfaces/registerCompanyEmployee';
import { registerCompanyEmployee } from 'services/employees';
import { getCompanyRoles } from 'services/roles';
import Select from 'react-select';
import Alert from 'UI/Alert';
import { useLocation } from 'react-router-dom';
import { uniqueCnic, uniqueEmail } from 'services/employees';
import { labelStyle, inputStyle } from 'UI/formStyle';
const initialValues: IregisterCompanyEmployee = {
    roles_id: [],
    email: '',
    password: '',
    additional_roles: '',
    address: '',
    bank_account: '',
    city: '',
    cnic: '',
    cnic_date_of_birth: '',
    current_base_salary: '',
    date_of_birth: '',
    date_of_joining: '',
    department: '',
    designation: '',
    employee_id: '',
    hobbies: '',
    increment_amount: '',
    initial_base_salary: '',
    last_increment_date: '',
    name: '',
    phone: '',
    state: '',
    vehicle_registration_number: '',
    zip: '',
};
interface rolesOption {
    label: string,
    value: number
}
const Add_Employee = () => {

    const [rolesDataOption, setRolesDataOption] = useState<rolesOption[]>([{ label: 'Employee', value: 6 }])
    const [rolesDataId, setRolesDataId] = useState<number[]>([]);
    const [isAlert, setIsAlert] = useState<boolean>(false);
    const [showDashboardLink, setShowDashboardLink] = useState<boolean>(false);
    const [responseMessage, setResponseMessage] = useState<string>('');
    const [select_errorMessage, setSelect_ErrorMessage] = useState<string>('');
    const [select_isTouched, setSelect_IsTouched] = useState<boolean>(false);
    const [selectedOptions, setSelectedOptions] = useState<rolesOption[]>([]);
    const [emailFocused, setEmailFocused] = useState<boolean>(false)
    const [cnicFocused, setCnicFocused] = useState<string>('true')
    const location = useLocation()

    useEffect(() => {
        const getRoles = async () => {
            const response = await getCompanyRoles();
            console.log('response', response)
            const roles: rolesOption[] = [];
            for (let i = 0; i < response.length; i++) {
                roles.push({
                    label: response[i].name,
                    value: response[i].id
                });
            }
            setRolesDataOption(roles)
        }
        getRoles()
    }, [])

    const validationSchema = Yup.object({
        name: Yup.string().max(255, 'Must be 255 characters or less').required('Name is required'),
        email: Yup.string().email().trim().max(255, 'Must be 255 characters or less').required('Email is required')
        .when('cnicFocused', {
            is: (cnicFocused: boolean) => cnicFocused === true,
            then: (schema)=>
                schema.min(2)
        })
        .test('unique-email', 'Email is not unique', async function (value) {
            const isEmailUnique = await uniqueEmail({email: value});
            if(isEmailUnique.code === 200){
                return !isEmailUnique.data.email_exists;
            }
            else{
                return false;
            }
          }),
        password: Yup.string().min(6, 'Minimum 6 characters').required('Password is required'),
        cnic: Yup.string().required('Cnic is required')
        .when('true',{
            is:'true',
            then: ()=>
                Yup.string().test('unique-cnic', 'Cnic is not unique', async function (value) {
                const isCnicUnique = await uniqueCnic({cnic: value});
                if(isCnicUnique.code === 200){
                    return !isCnicUnique.data.cnic_exits;
                }
                else{
                    return false;
                }
              })
        })
        .test('unique-cnic', 'Cnic is not unique', async function (value) {
            const isCnicUnique = await uniqueCnic({cnic: value});
            if(isCnicUnique.code === 200){
                return !isCnicUnique.data.cnic_exits;
            }
            else{
                return false;
            }
          }),
        employee_id: Yup.string().max(255, 'Must be 255 characters or less').required('Id is required'),
        address: Yup.string().max(255, 'Must be 255 characters or less').required('Address is required'),
        roles_id: Yup.array().required('Please select roles'),
    });
    const onSubmit = async (values: IregisterCompanyEmployee, { resetForm }: any) => {
        const email = values.email;
        const password = values.password;
        const name = values.name;
        const cnic = values.cnic;
        const date_of_birth = values.date_of_birth;
        const additional_roles = values.additional_roles;
        const address = values.address;
        const bank_account = values.bank_account;
        const city = values.city;
        const cnic_date_of_birth = values.cnic_date_of_birth;
        const current_base_salary = values.current_base_salary;
        const date_of_joining = values.date_of_joining;
        const department = values.department;
        const designation = values.designation;
        const employee_id = values.employee_id;
        const hobbies = values.hobbies;
        const increment_amount = values.increment_amount;
        const initial_base_salary = values.initial_base_salary;
        const last_increment_date = values.last_increment_date;
        const phone = values.phone;
        const state = values.state;
        const zip = values.zip;
        const vehicle_registration_number = values.vehicle_registration_number;
        const roles_id = rolesDataId;

        const response = await registerCompanyEmployee({
            roles_id,
            email,
            password,
            name,
            cnic,
            date_of_birth,
            additional_roles,
            address,
            bank_account,
            city,
            cnic_date_of_birth,
            current_base_salary,
            date_of_joining,
            department,
            designation,
            employee_id,
            hobbies,
            increment_amount,
            initial_base_salary,
            last_increment_date,
            phone,
            state,
            zip,
            vehicle_registration_number,
        });
        if (response.code === 200) {
            setResponseMessage(response.data.message);
            setShowDashboardLink(true)

        }
        else {
            setResponseMessage(response.message)
        }
        if(location.state !== null){
            location.state=null;
        }
        setIsAlert(true);
        resetForm();
        setSelectedOptions([]);
    };

    const validateSelection = (selectedValue: any) => {
        if (selectedValue.length === 0) {
            setSelect_ErrorMessage('Please select an option.');
        } else {
            setSelect_ErrorMessage('');
        }
    };

    const handleSelect = (e: any) => {
        const roles: rolesOption[] = [];
        const rolesId = [];
        for (let i = 0; i < e.length; i++) {
            roles.push({
                label: e[i].label,
                value: e[i].value
            });
            rolesId.push(e[i].value);
        }
        setSelectedOptions(roles)
        setRolesDataId(rolesId);
        console.log(rolesDataId);
        if (select_isTouched) {
            validateSelection(rolesDataId);
        }
    };

    const handleBlur = () => {
        setSelect_IsTouched(true);
        validateSelection(rolesDataId);
    };
    const emailValidate = () => {

    }

    return (
        <React.Fragment>
           
            {isAlert && <Alert responseMessage={responseMessage}
             setIsAlert={setIsAlert}
              showLink={showDashboardLink}
               setShowLink={setShowDashboardLink}
               linkValue='dashboard' />}

            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                {({ errors, status, touched, resetForm }) => {
                    return (
                        <Form className="login__card-form">
                            <br />
                            <div>Select a role
                                <Select
                                    required
                                    value={selectedOptions}
                                    name='roles_id'
                                    isMulti
                                    options={rolesDataOption}
                                    onChange={handleSelect}
                                    onBlur={handleBlur}
                                    className="basic-multi-select"
                                    classNamePrefix="select" />
                                {select_errorMessage && <p style={{ color: 'red' }}>{select_errorMessage}</p>}
                            </div>
                            <br />
                            <div>
                                <label className={labelStyle}>
                                    Additional Roles
                                </label>
                                <br />
                                <div >
                                    <Field
                                        className={inputStyle}
                                        name="additional_roles"
                                        type="text"
                                       // className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className={labelStyle}>Address</label>
                                <br />
                               
                                    <Field
                                        className={inputStyle}
                                        border="1px solid black"
                                        name="address"
                                        type="text"
                                       // className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')}
                                    />
                               
                            </div>
                            <div style={{ color: 'red' }}>
                                <ErrorMessage name="address" />
                            </div>
                            <div>
                                <label className={labelStyle}>Bank Account</label>
                                <br />
                                <div >
                                    <Field
                                        className={inputStyle}
                                        name="bank_account"
                                        type="text"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className={labelStyle}>City</label>
                                <br />
                                <div >
                                    <Field
                                        name="city"
                                        type="text"
                                        className={inputStyle}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className={labelStyle}>Cnic</label>
                                <br />
                                <div >
                                    <Field
                                        name="cnic"
                                        type="text"
                                        className={inputStyle}
                                        // onFocus={() => {setCnicFocused(true)
                                        // console.log(cnicFocused)}}
                                        // onBlur={() => {setCnicFocused(false)
                                        //     console.log(cnicFocused)}}
                                        // className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')}
                                    />
                                </div>
                            </div>
                            <div style={{ color: 'red' }}>
                                <ErrorMessage name="cnic" />
                            </div>
                            <div>
                                <label className={labelStyle}>Cnic date_of_birth</label>
                                <br />
                                <div >
                                    <Field
                                        name="cnic_date_of_birth"
                                        type="date"
                                        className={inputStyle}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className={labelStyle}>Current base salary</label>
                                <br />
                                <div >
                                    <Field
                                        name="current_base_salary"
                                        type="number"
                                        className={inputStyle}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className={labelStyle}>Date of birth</label>
                                <br />
                                <div >
                                    <Field
                                        name="date_of_birth"
                                        type="date"
                                        className={inputStyle}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className={labelStyle}>Date of joining</label>
                                <br />
                                <div >
                                    <Field
                                        name="date_of_joining"
                                        type="date"
                                        className={inputStyle}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className={labelStyle}>Department</label>
                                <br />
                                <div >
                                    <Field
                                        name="department"
                                        type="text"
                                        className={inputStyle}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className={labelStyle}>Designation</label>
                                <br />
                                <div >
                                    <Field
                                        name="designation"
                                        type="text"
                                        className={inputStyle}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className={labelStyle}>Email</label>
                                <br />
                                <div >
                                    <Field
                                        name="email"
                                        type="text"
                                        validate={emailValidate}
                                        className={inputStyle}
                                    />
                                </div>
                                {/* {errors.email && touched.email ? (
 -                                <div>{errors.name}</div>) : null} */}
                            </div>
                            <div style={{ color: 'red' }}>
                                <ErrorMessage name="email" />
                            </div>
                            <div>
                                <label className={labelStyle}>Password</label>
                                <br />
                                <div >
                                    <Field
                                        name="password"
                                        type="password"
                                        className={inputStyle}
                                       
                                    />
                                </div>
                            </div>
                            <div style={{ color: 'red' }}>
                                <ErrorMessage name="password" />
                            </div>
                            
                            <div>
                                <label className={labelStyle}>Employee Id</label>
                                <br />
                                <div >
                                    <Field
                                        name="employee_id"
                                        type="text"
                                        className={inputStyle}
                                    />
                                </div>
                            </div>
                            <div style={{ color: 'red' }}>
                                <ErrorMessage name="employee_id" />
                            </div>
                            <div>
                                <label className={labelStyle}>Hobbies</label>
                                <br />
                                <div >
                                    <Field
                                        name="hobbies"
                                        type="text"
                                        className={inputStyle}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className={labelStyle}>Increment Amount</label>
                                <br />
                                <div >
                                    <Field
                                        name="increment_amount"
                                        type="number"
                                        className={inputStyle}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className={labelStyle}>Initial_base_salary</label>
                                <br />
                                <div >
                                    <Field
                                        name="initial_base_salary"
                                        type="number"
                                        className={inputStyle}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className={labelStyle}>Last_increment_date</label>
                                <br />
                                <div >
                                    <Field
                                        name="last_increment_date"
                                        type="date"
                                        className={inputStyle}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className={labelStyle}>Name</label>
                                <br />
                                <div >
                                    <Field
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
                                <label className={labelStyle}>Phone No</label>
                                <br />
                                <div >
                                    <Field
                                        name="phone"
                                        type="text"
                                        className={inputStyle}
                                    />
                                </div>
                            </div>
                          
                            <div>
                                <label className={labelStyle}>State</label>
                                <br />
                                <div >
                                    <Field
                                        name="state"
                                        type="text"
                                        className={inputStyle}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className={labelStyle}>Vehicle registration number</label>
                                <br />
                                <div >
                                    <Field
                                        name="vehicle_registration_number"
                                        type="text"
                                        className={inputStyle}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className={labelStyle}>Zip</label>
                                <br />
                                <div >
                                    <Field
                                        name="zip"
                                        type="text"
                                        className={inputStyle}
                                    />
                                </div>
                            </div>

                            <div className="login__buttons">
                                <button className="btn login__card-btn bg-sky-400" type="submit" disabled={false} onClick={() => {
                                    resetForm;
                                    if (rolesDataId.length === 0) {
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
                {/* </Formik> */}
            </Formik>
        </React.Fragment>
    );
};

export default Add_Employee;
