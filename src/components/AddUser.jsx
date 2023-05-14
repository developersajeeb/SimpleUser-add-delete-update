import React, { useState } from 'react';
import { FaAngleDoubleLeft } from "react-icons/fa";
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'

const AddUser = () => {
    const [gender, setGender] = useState('');
    const [status, setStatus] = useState('');

    const handleAddUser = (event) => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const newUser = {name, email, gender, status}

        fetch('http://localhost:5000/users',{
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newUser)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if(data.insertedId){
                Swal.fire({
                    title: 'Success!',
                    text: 'You Successfully Added The User',
                    icon: 'success',
                    confirmButtonText: 'Ok'
                  })
                form.reset();
            } else {
                Swal.fire({
                    title: 'Error!',
                    text: 'You have not been able to add the user',
                    icon: 'error',
                    confirmButtonText: 'Ok'
                  })
            }
        })
    }
    return (
        <main className='px-4 py-10 md:p-28'>
            <button><Link to='/' className='flex items-center gap-2 border-2 border-gray-500 px-3 py-2 rounded-md'><FaAngleDoubleLeft /> All Users</Link></button>
            <section className='mt-10 md:w-4/5 mx-auto'>
                <h1 className='text-center text-3xl font-medium'>New User</h1>
                <p className='text-center'>Use The below form to create a new account</p>
                <form className='mt-10' onSubmit={handleAddUser}>
                    <label className='block text-gray-400' htmlFor="name">Name</label>
                    <input className='border-2 border-gray-300 rounded-md w-full p-2 mt-2 focus:border-2 focus:border-emerald-400' type="text" name="name" id="" required />

                    <label className='block text-gray-400 mt-6' htmlFor="email">Email</label>
                    <input className='border-2 border-gray-300 rounded-md w-full p-2 mt-2 focus:border-emerald-400' type="email" name="email" id="" required />

                    <div className='md:flex gap-4 my-6'>
                        <p className='text-gray-400'>Gender</p>
                        <div className='flex items-center gap-2'>
                            <input type="radio" name="gender" id="" className='h-4 w-4' value="Male" onChange={e => setGender(e.target.value)}/>
                            <label htmlFor="redio">Male</label>
                        </div>
                        <div className='flex items-center gap-2'>
                            <input type="radio" name="gender" id="" className='h-4 w-4' value="Female" onChange={e => setGender(e.target.value)}/>
                            <label htmlFor="redio">Female</label>
                        </div>
                    </div>
                    <div className='md:flex gap-4'>
                        <p className='text-gray-400'>Status</p>
                        <div className='flex items-center gap-2'>
                            <input type="radio" name="active" id="" className='h-4 w-4' value="Active" onChange={e => setStatus(e.target.value)}/>
                            <label htmlFor="redio">Active</label>
                        </div>
                        <div className='flex items-center gap-2'>
                            <input type="radio" name="active" id="" className='h-4 w-4' value="Inactive" onChange={e => setStatus(e.target.value)}/>
                            <label htmlFor="redio">Inactive</label>
                        </div>
                    </div>
                    <button type='submit' className='bg-emerald-400 w-full p-2 mt-6 rounded-md text-lg '>Save</button>
                </form>
            </section>
        </main>
    );
};

export default AddUser;