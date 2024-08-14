/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import DataNotFound from 'reuseable-components/DataNotFound';

const SuperAdmin = ({ children }) => {
    const accessRoles = ['ROLE_SUPER_ADMIN', 'ROLE_ADMIN', 'ROLE_USER'];
    const currentUser = localStorage.getItem('role');
    if (accessRoles.includes(currentUser)) {
        return <>{children} </>;
    }
    return <DataNotFound text="Oops...You don't have access to this page" style={{ height: '55vh' }} />;
};

export default SuperAdmin;
