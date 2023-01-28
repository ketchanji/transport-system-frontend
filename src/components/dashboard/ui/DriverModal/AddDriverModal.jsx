import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';
import Form from '../../form/components/Form/Form';
import FormField from '../../form/components/FormField/FormField';
import Button from '../../form/components/Button/Button';
import ErrorMessage from '../../form/components/ErrorMessage/ErrorMessage';
import { ImCancelCircle } from 'react-icons/im';

import { toast } from 'react-toastify';

import { createDriver} from '../../../../services/driver';

const initialValues = {
    username: '',
    bdate: '',
    email: '',
    password: '',
    imageUrl: '',
}


function AddDriverModal({ onClose, onDriverAdded }) {
    const [error, setError] = useState(null);


    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Name field is required'),
        bdate: Yup.string().required('Date field is required'),
        email: Yup.string().email('Enter a valid email').required('Email field is required'),
        password: Yup.string().min(4, 'Password must be above 4 characters').required('Password Required'),
        driverImage: Yup.string().required("Image is required"),
        // status: Yup.string().required
    })

    const handleAddDriver = (values) => {
        console.log('VALUES: ', values);

        createDriver(values).then((res) => {
            if (res.ok) {
                toast.success(res.data.message, {
                    pauseOnHover: false,
                    closeOnClick: true,
                })
                onDriverAdded();
            } else {
                console.log(res)
                toast.error(res.data.message, {
                    pauseOnHover: false,
                    closeOnClick: true,
                })
            }
        }).catch(err => {
            console.log('ERROR CREATING: ', err);
            toast.error("ERROR", {
                pauseOnHover: false,
                closeOnClick: true,
            })
        })

    }



    return (
        <div>

            {/* <!-- Modal toggle --> */}
            <button data-modal-target="authentication-modal" data-modal-toggle="authentication-modal" className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
                Toggle modal
            </button>

            {/* <!-- Main modal --> */}
            <div id="authentication-modal" tabindex="-1" aria-hidden="true" className="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full">
                <div className="relative w-full h-full max-w-md md:h-auto">
                    {/* <!-- Modal content --> */}
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <button type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-hide="authentication-modal">
                            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                            <span className="sr-only" onClick={onClose}>Close modal</span>
                        </button>
                        <div className="px-6 py-6 lg:px-8">
                            <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">Sign in to our platform</h3>
                            <form action="" className="auth-form">

                                {error && <ErrorMessage error={error} visible={true} />}
                                <Form
                                    initialValues={initialValues}
                                    onSubmit={handleAddDriver}
                                    validationSchema={validationSchema}
                                >
                                    <p className="label-text">Driver Name: </p>
                                    <FormField name="name" type="text" placeholder="Driver Name" />
                                    
                                    <p className="label-text">Date of Birth : </p>
                                    <FormField name="bdate" type="date" placeholder="Date of Birth" />

                                    <p className="label-text">Email</p>
                                    <FormField name="email" type="email" placeholder="Email" />

                                    <p className="label-text">Driver Image </p>
                                    <FormField name="driverImage" type="file" placeholder="Driver Image" />
                                    
                                    <p className="label-text">Driver Sattus </p>
                                    <FormField name="status" type="text" placeholder="Driver Status" />
                                </Form>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}



export default AddDriverModal;