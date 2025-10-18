import React, { useContext, useEffect } from 'react'
import { dataContext } from '../context/MainContext';
import { Navigate, useNavigate } from 'react-router';

export default function ProtectorRoute({ children }) {

    const { token } = useContext(dataContext);

    const validToken =
        token && token !== "" && token !== "null" && token !== "undefined";

    return validToken ? children : <Navigate to="/" replace />;
    // return children
}
