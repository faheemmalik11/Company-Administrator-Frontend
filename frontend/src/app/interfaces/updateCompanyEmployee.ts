export interface IupdateCompanyEmployee {
    //emp_id: number | ''
    roles_id: number[],
    email: string,
    additional_roles?: string | undefined,
    address: string,
    bank_account?: string | undefined,
    city?: string | undefined,
    cnic: string | undefined,
    cnic_date_of_birth?: string | undefined,
    current_base_salary?: number | '',
    date_of_birth?: string | undefined,
    department?: string | undefined, 
    designation?: string | undefined, 
    hobbies?: string | undefined,
    increment_amount?: number | '', 
    initial_base_salary?: number | '', 
    last_increment_date?: string | undefined, 
    name: string, 
    phone?: string,
    state?: string, 
    vehicle_registration_number?: string, 
    zip?: string
}