import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { IEmployee } from "app/interfaces/employee";
import { IupdateCompanyEmployee } from "app/interfaces/updateCompanyEmployee";
import { IregisterCompanyEmployee } from "app/interfaces/registerCompanyEmployee";
import { getCompanyEmployeeById } from 'services/employees';
import Select from 'react-select';
import { updateCompanyEmployee, uniqueEmail, uniqueCnic } from "services/employees";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { getCompanyRoles } from 'services/roles';
import Alert from "UI/updateAlert";
import { useNavigate } from "react-router-dom";
import { labelStyle, inputStyle } from 'UI/formStyle';

const Employee: IupdateCompanyEmployee = {
    roles_id: [],
    additional_roles: '',
    address: '',
    bank_account: '',
    city: '',
    cnic: '',
    cnic_date_of_birth: '',
    current_base_salary: '',
    date_of_birth: '',
    department: '',
    designation: '',
    email: '',
    hobbies: '',
    //emp_id: 0,
    increment_amount: '',
    initial_base_salary: '',
    last_increment_date: '',
    name: '',
    phone: '',
    state: '',
    vehicle_registration_number: '',
    zip: ''
}
interface rolesOption {
    label: string,
    value: number | ''
}
const UpdateEmployee = () => {
    const navigate = useNavigate();
    let { Id } = useParams();
    const [employeeData, setEmployeeData] = useState<IupdateCompanyEmployee>(Employee);
    const [rolesDataOption, setRolesDataOption] = useState<rolesOption[]>([])
    const [initiallySelectedOptions, setInitiallySelectedOptions] = useState<rolesOption[]>([{label:'', value:''}])
    const [select_errorMessage, setSelect_ErrorMessage] = useState<string>('');
    const [select_isTouched, setSelect_IsTouched] = useState<boolean>(false);
    const [rolesDataId, setRolesDataId] = useState<number[]>([]);
    const [isAlert, setIsAlert] = useState<boolean>(false);
    const [showDashboardLink, setShowDashboardLink] = useState<boolean>(false);
    const [responseMessage, setResponseMessage] = useState<string>('');

    useEffect(() => {
        const getRoles = async () => {
            const response = await getCompanyRoles();
            const roles: rolesOption[] = [];
            for (let i = 0; i < response.length; i++) {
                roles.push({
                    label: response[i].name,
                    value: response[i].id
                });
            }
            setRolesDataOption(roles)
        }

        const getEmployee = async () => {
            const response = await getCompanyEmployeeById(Id);

            if (response.date_of_birth) {
                const dateObject = new Date(response.date_of_birth);
                const year = dateObject.getFullYear();
                const month = String(dateObject.getMonth() + 1).padStart(2, '0');
                const day = String(dateObject.getDate()).padStart(2, '0');
                response.date_of_birth = `${year}-${month}-${day}`;
            }

            if (response.cnic_date_of_birth) {
                const dateObject2 = new Date(response.cnic_date_of_birth);
                const year2 = dateObject2.getFullYear();
                const month2 = String(dateObject2.getMonth() + 1).padStart(2, '0');
                const day2 = String(dateObject2.getDate()).padStart(2, '0');
                response.cnic_date_of_birth = `${year2}-${month2}-${day2}`
            }

            if (response.last_increment_date) {
                const dateObject3 = new Date(response.last_increment_date);
                const year3 = dateObject3.getFullYear();
                const month3 = String(dateObject3.getMonth() + 1).padStart(2, '0');
                const day3 = String(dateObject3.getDate()).padStart(2, '0');
                response.last_increment_date = `${year3}-${month3}-${day3}`
            }
            setEmployeeData(response)
            const roles: rolesOption[] = [];
            const roles_id: number[] = [];
            for (let i = 0; i < response.roles.length; i++) {
                roles.push({
                    label: response.roles[i].name,
                    value: response.roles[i].id
                });
                roles_id.push(response.roles[i].id)
            }
            setRolesDataId(roles_id)
            setInitiallySelectedOptions(roles)
        }
        getRoles();
        getEmployee()
    }, [])

    const validationSchema = Yup.object({
        name: Yup.string().max(255, 'Must be 255 characters or less').required('Name is required'),
        email: Yup.string().email().trim().max(255, 'Must be 255 characters or less').required('Email is required')
        .test('unique-email', 'Email is not unique', async function (value) {
            const isEmailUnique = await uniqueEmail({email: value, id: Id});
            if(isEmailUnique.code === 200){
                return !isEmailUnique.data.email_exists;
            }
            else{
                return false;
            }
          }),
        cnic: Yup.string().max(255, 'Must be 255 characters or less').required('Cnic is required')
        .test('unique-cnic', 'Cnic is not unique', async function (value) {
            const isCnicUnique = await uniqueCnic({cnic: value, id: Id});
            if(isCnicUnique.code === 200){
                return !isCnicUnique.data.cnic_exits;
            }
            else{
                return false;
            }
          }),
        address: Yup.string().max(255, 'Must be 255 characters or less').required('Address is required'),
        //roles_id: Yup.array().required('Please select roles'),
    });
    const onSubmit = async (values: IupdateCompanyEmployee) => {

        //const emp_id = values.emp_id
        const email = values.email;
        const name = values.name;
        const cnic = values.cnic;
        const date_of_birth = values.date_of_birth;
        const additional_roles = values.additional_roles;
        const address = values.address;
        const bank_account = values.bank_account;
        const city = values.city;
        const cnic_date_of_birth = values.cnic_date_of_birth;
        const current_base_salary = values.current_base_salary;
        const department = values.department;
        const designation = values.designation;
        const hobbies = values.hobbies;
        const increment_amount = values.increment_amount;
        const initial_base_salary = values.initial_base_salary;
        const last_increment_date = values.last_increment_date;
        const phone = values.phone;
        const state = values.state;
        const zip = values.zip;
        const vehicle_registration_number = values.vehicle_registration_number;
        const roles_id = rolesDataId;

        const response = await updateCompanyEmployee({
            roles_id,
            email,
            name,
            cnic,
            date_of_birth,
            additional_roles,
            address,
            bank_account,
            city,
            cnic_date_of_birth,
            current_base_salary,
            department,
            designation,
            hobbies,
            increment_amount,
            initial_base_salary,
            last_increment_date,
            phone,
            state,
            zip,
            vehicle_registration_number,
        }, Id);
        if (response.code === 200) {
            //setSuccess_Alert(true)
            // setResponseMessage(response.data.message);
            // setShowDashboardLink(true)
            navigate('/dashboard',{state:{id:Id}})
        }
        else {
            // setError_Alert(true)
            setResponseMessage(response.message)
            setIsAlert(true);
        }
        
        
        
    };
    const validateSelection = (selectedValue: any) => {
        if (selectedValue.length === 0) {
            setSelect_ErrorMessage('Please select an option.');
        } else {
            setSelect_ErrorMessage('');
        }
    };
    const handleSelect = (e: any) => {
        const rolesId = [];
        const roles: rolesOption[] = [];
        for (let i = 0; i < e.length; i++) {
            roles.push({
                label: e[i].label,
                value: e[i].value
            });
            rolesId.push(e[i].value);
        }
        setInitiallySelectedOptions(roles)
        setRolesDataId(rolesId);
        if (select_isTouched) {
            validateSelection(rolesDataId);
        }
    };
    const handleBlur = () => {
        setSelect_IsTouched(true);
        validateSelection(rolesDataId);
    };
    return (
        <React.Fragment>
            {isAlert && <Alert responseMessage={responseMessage}
                setIsAlert={setIsAlert}
                 />}

            <h1>Update employee</h1>
            <Formik initialValues={employeeData} validationSchema={validationSchema} enableReinitialize onSubmit={onSubmit}>
                {({ errors, status, touched, resetForm }) => {
                    return (
                        <Form className="login__card-form">
                            <br />
                            <div>Select a role
                                <Select
                                    required
                                    value={initiallySelectedOptions}
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
                                <label className={labelStyle}>Additional Roles</label>
                                <br />
                                <div >
                                    <Field
                                        name="additional_roles"
                                        type="text"
                                        className={inputStyle}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className={labelStyle}>Address</label>
                                <br />
                                <div >
                                    <Field
                                        name="address"
                                        type="text"
                                        className={inputStyle}
                                    />
                                </div>
                            </div>
                            <div style={{ color: 'red' }}>
                                <ErrorMessage name="address" />
                            </div>
                            <div>
                                <label className={labelStyle}>Bank Account</label>
                                <br />
                                <div >
                                    <Field
                                        name="bank_account"
                                        type="text"
                                        className={inputStyle}
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
                                    />
                                </div>
                            </div>
                            <div style={{ color: 'red' }}>
                                <ErrorMessage name="cnic" />
                            </div>
                            <div>
                                <label className={labelStyle}>Cnic date_of_birth</label>
                                <br />
                                <div>
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
                                        className={inputStyle}
                                    />
                                </div>
                                {/* {errors.email && touched.email ? (
 -                                <div>{errors.name}</div>) : null} */}
                            </div>
                            <div style={{ color: 'red' }}>
                                <ErrorMessage name="email" />
                            </div>
                            {/* <div>
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
                        </div> */}
                           
                           
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
                                <label className={labelStyle}>Id</label>
                                <br />
                                <div >
                                    <Field
                                        name="emp_id"
                                        type="number"
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
                                <button className="btn login__card-btn bg-sky-400" type="submit" disabled={false}  >
                                    Submit
                                </button>
                            </div>
                        </Form>
                    );
                }}
                {/* </Formik> */}
            </Formik>
        </React.Fragment>
    )
}
export default UpdateEmployee