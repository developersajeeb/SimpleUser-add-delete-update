import React from 'react';
import { Link } from 'react-router-dom';
import { FaPencilAlt, FaTrash, FaUser } from "react-icons/fa";
import Swal from 'sweetalert2';

const TableData = ({ user, index, singleUser, setSingleUser }) => {
    const { _id, name, email, gender, status } = user;

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'px-4 py-2 rounded-md text-white bg-emerald-500 border-emerald-500 duration-300 ml-3',
            cancelButton: 'px-4 py-2 rounded-md text-white bg-emerald-500 border-emerald-500 duration-300'
        },
        buttonsStyling: false
    })

    const handleDelete = _id => {
        console.log(_id);
        swalWithBootstrapButtons.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/user/${_id}`, {
                    method: 'DELETE',
                })
                    .then(res => res.json)
                    .then(data => {
                        const remaining = singleUser.filter(item => item._id !== _id);
                        setSingleUser(remaining);
                    })
                swalWithBootstrapButtons.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire(
                    'Cancelled',
                    'Your imaginary file is safe :)',
                    'error'
                )
            }
        })
    }

    return (
        <tr className='text-center border-b'>
            <td className='py-5'>{index + 1}</td>
            <td>{name}</td>
            <td>{email}</td>
            <td>{gender}</td>
            <td>{status}</td>
            <td>
                <div className='flex gap-4 items-center justify-center'>
                    <Link to={`/edit-user/${_id}`} className='border-2 p-2 rounded-md border-gray-800 hover:text-white hover:bg-emerald-500 hover:border-emerald-500 duration-300 cursor-pointer'>
                        <span className=''><FaPencilAlt /></span>
                    </Link>
                    <Link onClick={() => handleDelete(_id)} className='border-2 p-2 rounded-md border-gray-800 hover:text-white hover:bg-emerald-500 hover:border-emerald-500 duration-300 cursor-pointer'>
                        <span className=''><FaTrash /></span>
                    </Link>
                </div>
            </td>
        </tr>
    );
};

export default TableData;