import React, { useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { FaAngleDoubleLeft } from "react-icons/fa";
import Swal from 'sweetalert2'

const EditUser = () => {
    const [formGender, setGender] = useState('');
    const [formStatus, setStatus] = useState('');
    const userData = useLoaderData();
    const { _id, name, email, gender, status } = userData;

    const updateUser = event => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const newUser = { name, email, formGender, formStatus };

        fetch(`http://localhost:5000/user/${_id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newUser)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.matchedCount) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'You Successfully Updated The User Data',
                        icon: 'success',
                        confirmButtonText: 'Ok'
                    })
                }
            })
    }

    return (
        <main className='px-4 py-10 md:p-28'>
            <button><Link to='/' className='flex items-center gap-2 border-2 border-gray-500 px-3 py-2 rounded-md'><FaAngleDoubleLeft /> All Users</Link></button>
            <section className='mt-10 md:w-4/5 mx-auto'>
                <h1 className='text-center text-3xl font-medium'>Edit User Data</h1>
                <p className='text-center'>Use The below form to update a user data</p>
                <form className='mt-10' onSubmit={updateUser}>
                    <label className='block text-gray-400' htmlFor="name">Name</label>
                    <input className='border-2 border-gray-300 rounded-md w-full p-2 mt-2 focus:border-2 focus:border-emerald-400' type="text" name="name" id="" defaultValue={name} required />

                    <label className='block text-gray-400 mt-6' htmlFor="email">Email</label>
                    <input className='border-2 border-gray-300 rounded-md w-full p-2 mt-2 focus:border-emerald-400' type="email" name="email" id="" defaultValue={email} required />

                    <div className='md:flex gap-4 my-6'>
                        <p className='text-gray-400'>Gender</p>
                        <div className='flex items-center gap-2'>
                            <input type="radio" name="gender" id="" className='h-4 w-4' value="Male" onChange={e => setGender(e.target.value)} />
                            <label htmlFor="redio">Male</label>
                        </div>
                        <div className='flex items-center gap-2'>
                            <input type="radio" name="gender" id="" className='h-4 w-4' value="Female" onChange={e => setGender(e.target.value)} />
                            <label htmlFor="redio">Female</label>
                        </div>
                    </div>
                    <div className='md:flex gap-4'>
                        <p className='text-gray-400'>Status</p>
                        <div className='flex items-center gap-2'>
                            <input type="radio" name="active" id="" className='h-4 w-4' value="Active" onChange={e => setStatus(e.target.value)} />
                            <label htmlFor="redio">Active</label>
                        </div>
                        <div className='flex items-center gap-2'>
                            <input type="radio" name="active" id="" className='h-4 w-4' value="Inactive" onChange={e => setStatus(e.target.value)} />
                            <label htmlFor="redio">Inactive</label>
                        </div>
                    </div>
                    <button type='submit' className='bg-emerald-400 w-full p-2 mt-6 rounded-md text-lg '>Save</button>
                </form>
            </section>
        </main>
    );
};

export default EditUser;