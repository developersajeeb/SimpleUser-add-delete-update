import React, { useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { FaUser } from "react-icons/fa";
import TableData from './TableData';

const AllUsers = () => {
    const loadedUsers = useLoaderData();
    const [singleUser, setSingleUser] = useState(loadedUsers);

    return (
        <main className='px-4 py-10 md:p-28'>
            <button><Link to='/add-user' className='flex items-center gap-2 border-2 border-gray-500 px-3 py-2 rounded-md'><FaUser /> Add User</Link></button>
            <div className='overflow-x-auto mt-10 md:w-4/5 mx-auto'>
                <table className="min-w-full">
                    <thead className=''>
                        <tr className='bg-gray-900 text-white'>
                            <th className='p-3'>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Gender</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            singleUser.length === 0 ?
                                <tr>
                                    <td className='text-center py-5'>No Data</td>
                                    <td className='text-center'>No Data</td>
                                    <td className='text-center'>No Data</td>
                                    <td className='text-center'>No Data</td>
                                    <td className='text-center'>No Data</td>
                                    <td className='text-center'>No Data</td>
                                </tr>
                                :
                                singleUser?.map((user, index) => <TableData
                                    key={user._id}
                                    user={user}
                                    index={index}
                                    singleUser={singleUser}
                                    setSingleUser={setSingleUser}></TableData>)
                        }
                    </tbody>
                </table>
            </div>
        </main>
    );
};

export default AllUsers;