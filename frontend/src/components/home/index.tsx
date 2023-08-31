import React from 'react'; 
import { FC } from 'react';
import { Link } from 'react-router-dom';

const Home: FC<object> = () => {

    return (
        <React.Fragment>
        <Link 
            to="https://www.google.com/" 
            className="text-3xl font-bold underline" 
            style={{color: 'black'}} 
            target='_blank'
        >
            Company
        </Link>
        <br />
        <br />
        <Link to='/login'>Login User </Link>
        <br />
        <Link to='/companylogin'>Login Company</Link>
        </React.Fragment>
        
    )
};

export default Home;