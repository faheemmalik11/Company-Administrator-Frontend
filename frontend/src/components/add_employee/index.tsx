import React, { useEffect, useState } from 'react';
import './index.css';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { IregisterCompanyEmployee } from 'app/interfaces/registerCompanyEmployee';
import { IRoles } from 'app/interfaces/roles';
import { registerCompanyEmployee } from 'services/employees';
import { getCompanyRoles } from 'services/roles';
import Select from 'react-select';
import Alert from 'UI/Alert';
import { useLocation } from 'react-router-dom';
import { uniqueCnic, uniqueEmail } from 'services/employees';
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
                                <label>Additional Roles</label>
                                <br />
                                <div style={{ border: '1px solid black' }}>
                                    <Field
                                        name="additional_roles"
                                        type="text"
                                        className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')}
                                    />
                                </div>
                            </div>
                            <div>
                                <label>Address</label>
                                <br />
                                <div style={{ border: '1px solid black' }}>
                                    <Field
                                        border="1px solid black"
                                        name="address"
                                        type="text"
                                        className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')}
                                    />
                                </div>
                            </div>
                            <div style={{ color: 'red' }}>
                                <ErrorMessage name="address" />
                            </div>
                            <div>
                                <label>Bank Account</label>
                                <br />
                                <div style={{ border: '1px solid black' }}>
                                    <Field
                                        name="bank_account"
                                        type="text"
                                        className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')}
                                    />
                                </div>
                            </div>
                            <div>
                                <label>City</label>
                                <br />
                                <div style={{ border: '1px solid black' }}>
                                    <Field
                                        name="city"
                                        type="text"
                                        className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')}
                                    />
                                </div>
                            </div>
                            <div>
                                <label>Cnic</label>
                                <br />
                                <div style={{ border: '1px solid black' }}>
                                    <Field
                                        name="cnic"
                                        type="text"
                                        // onFocus={() => {setCnicFocused(true)
                                        // console.log(cnicFocused)}}
                                        // onBlur={() => {setCnicFocused(false)
                                        //     console.log(cnicFocused)}}
                                        className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')}
                                    />
                                </div>
                            </div>
                            <div style={{ color: 'red' }}>
                                <ErrorMessage name="cnic" />
                            </div>
                            <div>
                                <label>Cnic date_of_birth</label>
                                <br />
                                <div style={{ border: '1px solid black' }}>
                                    <Field
                                        name="cnic_date_of_birth"
                                        type="date"
                                        className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')}
                                    />
                                </div>
                            </div>
                            {/* <div>
                            <label>Company Id</label>
                            <br />
                            <Field
                                name="company_id"
                                type="number"
                                className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')}
                            />
                        </div> */}
                            {/* <div>
                            <label>Created At</label>
                            <br />
                            <Field
                                name="created_at"
                                type="text"
                                className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')}
                            />
                        </div> */}
                            <div>
                                <label>Current base salary</label>
                                <br />
                                <div style={{ border: '1px solid black' }}>
                                    <Field
                                        name="current_base_salary"
                                        type="number"
                                        className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')}
                                    />
                                </div>
                            </div>
                            <div>
                                <label>Date of birth</label>
                                <br />
                                <div style={{ border: '1px solid black' }}>
                                    <Field
                                        name="date_of_birth"
                                        type="date"
                                        className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')}
                                    />
                                </div>
                            </div>
                            <div>
                                <label>Date of joining</label>
                                <br />
                                <div style={{ border: '1px solid black' }}>
                                    <Field
                                        name="date_of_joining"
                                        type="date"
                                        className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')}
                                    />
                                </div>
                            </div>
                            {/* <div>
                            <label>Deleted at</label>
                            <br />
                            <Field
                                name="deleted_at"
                                type="text"
                                className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')}
                            />
                        </div> */}
                            <div>
                                <label>Department</label>
                                <br />
                                <div style={{ border: '1px solid black' }}>
                                    <Field
                                        name="department"
                                        type="text"
                                        className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')}
                                    />
                                </div>
                            </div>
                            <div>
                                <label>Designation</label>
                                <br />
                                <div style={{ border: '1px solid black' }}>
                                    <Field
                                        name="designation"
                                        type="text"
                                        className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')}
                                    />
                                </div>
                            </div>
                            <div>
                                <label>Email</label>
                                <br />
                                <div style={{ border: '1px solid black' }}>
                                    <Field
                                        name="email"
                                        type="text"
                                        validate={emailValidate}
                                        className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')}
                                    />
                                </div>
                                {/* {errors.email && touched.email ? (
 -                                <div>{errors.name}</div>) : null} */}
                            </div>
                            <div style={{ color: 'red' }}>
                                <ErrorMessage name="email" />
                            </div>
                            <div>
                                <label>Password</label>
                                <br />
                                <div style={{ border: '1px solid black' }}>
                                    <Field
                                        name="password"
                                        type="password"
                                        className={
                                            'form-control' + (errors.password && touched.password ? ' is-invalid' : '')
                                        }
                                    />
                                </div>
                            </div>
                            <div style={{ color: 'red' }}>
                                <ErrorMessage name="password" />
                            </div>
                            {/* <div>
                            <label>Email verified at</label>
                            <br />
                            <Field
                                name="email_verified_at"
                                type="text"
                                className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')}
                            />
                        </div> */}
                            <div>
                                <label>Employee Id</label>
                                <br />
                                <div style={{ border: '1px solid black' }}>
                                    <Field
                                        name="employee_id"
                                        type="text"
                                        className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')}
                                    />
                                </div>
                            </div>
                            <div style={{ color: 'red' }}>
                                <ErrorMessage name="employee_id" />
                            </div>
                            <div>
                                <label>Hobbies</label>
                                <br />
                                <div style={{ border: '1px solid black' }}>
                                    <Field
                                        name="hobbies"
                                        type="text"
                                        className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')}
                                    />
                                </div>
                            </div>
                            {/* <div>
                            <label>Id</label>
                            <br />
                            <Field
                                name="id"
                                type="number"
                                className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')}
                            />
                        </div> */}
                            <div>
                                <label>Increment Amount</label>
                                <br />
                                <div style={{ border: '1px solid black' }}>
                                    <Field
                                        name="increment_amount"
                                        type="number"
                                        className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')}
                                    />
                                </div>
                            </div>
                            <div>
                                <label>Initial_base_salary</label>
                                <br />
                                <div style={{ border: '1px solid black' }}>
                                    <Field
                                        name="initial_base_salary"
                                        type="number"
                                        className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')}
                                    />
                                </div>
                            </div>
                            <div>
                                <label>Last_increment_date</label>
                                <br />
                                <div style={{ border: '1px solid black' }}>
                                    <Field
                                        name="last_increment_date"
                                        type="date"
                                        className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')}
                                    />
                                </div>
                            </div>
                            <div>
                                <label>Name</label>
                                <br />
                                <div style={{ border: '1px solid black' }}>
                                    <Field
                                        name="name"
                                        type="text"
                                        className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')}
                                    />
                                </div>
                            </div>
                            <div style={{ color: 'red' }}>
                                <ErrorMessage name="name" />
                            </div>
                            <div>
                                <label>Phone No</label>
                                <br />
                                <div style={{ border: '1px solid black' }}>
                                    <Field
                                        name="phone"
                                        type="text"
                                        className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')}
                                    />
                                </div>
                            </div>
                            {/* <div>
                            <label>Slug</label>
                            <br />
                            <Field
                                name="slug"
                                type="text"
                                className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')}
                            />
                        </div> */}
                            <div>
                                <label>State</label>
                                <br />
                                <div style={{ border: '1px solid black' }}>
                                    <Field
                                        name="state"
                                        type="text"
                                        className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')}
                                    />
                                </div>
                            </div>
                            {/* <div>
                            <label>Status</label>
                            <br />
                            <Field
                                name="status"
                                type="number"
                                className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')}
                            />
                        </div> */}
                            {/* <div>
                            <label>Updated at</label>
                            <br />
                            <Field
                                name="updated_at"
                                type="text"
                                className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')}
                            />
                        </div> */}
                            <div>
                                <label>Vehicle registration number</label>
                                <br />
                                <div style={{ border: '1px solid black' }}>
                                    <Field
                                        name="vehicle_registration_number"
                                        type="text"
                                        className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')}
                                    />
                                </div>
                            </div>
                            <div>
                                <label>Zip</label>
                                <br />
                                <div style={{ border: '1px solid black' }}>
                                    <Field
                                        name="zip"
                                        type="text"
                                        className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')}
                                    />
                                </div>
                            </div>

                            <div className="login__buttons">
                                <button className="btn login__card-btn" type="submit" disabled={false} onClick={() => {
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
