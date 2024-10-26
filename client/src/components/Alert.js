// components/Alert.js
import React from 'react';
import { useAlert } from '../context/AlertContext';
import '../styles/alert.css'

const Alert = () => {
    const { alert, setAlert } = useAlert();

    if (!alert) return null;

    return (
        <div className={`alert ${alert.type === 'warning' ? 'alert-warning' : 'alert-info'} fixed top-4 right-4 p-4 rounded-md shadow-lg`}>
            <p>{alert.message}</p>
            <button onClick={() => setAlert(null)} className=" mt-2 text-white bg-black p-2 rounded">
                Dismiss
            </button>
        </div>
    );
};

export default Alert;
