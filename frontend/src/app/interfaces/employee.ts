interface Status {
    id: number,
    name: string
}
export interface IEmployee {
    roles_id: number[],
    additional_roles: string | null,
    address: string,
    bank_account: string | null,
    city: string | null,
    cnic: string,
    cnic_date_of_birth: string | null,
    company_id: number | null,
    created_at: string | null,
    current_base_salary: number | null,
    date_of_birth: string | null,
    date_of_joining: string | null,
    deleted_at: string | null,
    department: string | null,
    designation: string | null,
    email: string,
    email_verified_at: string |null ,
    employee_id: string,
    hobbies: string | null,
    id: number ,
    increment_amount: number | null,
    initial_base_salary: number | null,
    last_increment_date: string | null,
    name: string | null,
    phone: string | null,
    slug: string | null,
    state: string |null,
    status: Status,
    updated_at: string | null,
    vehicle_registration_number: string | null,
    zip: string | null

}

