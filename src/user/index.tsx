import { useEffect, useState } from 'react'
import '../index.css'
import { instance } from '../utils/axios'
const Users = () => {

    const [users, setUsers] = useState([])

    const fetchUsers = () => {
        instance.get('user/').then((res: any) => {
            setUsers(res?.data)
        }).catch(() => { })
    }

    const handleDelete = (user: any) => {
        instance.delete(`user/${user?._id}`).then((res: any) => {
            fetchUsers();
        }).catch(() => { })
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    return (
        <div className='container'>
            {users?.map((user: any, idx: any) => {
                return (
                    <div key={idx} className='users'>
                        <p>{`${user?.first_name} ${user?.last_name}`}</p>
                        <span onClick={() => handleDelete(user)} className='action-btn delete'>Delete</span>
                    </div>
                )
            })}
            {/* <div className='users'>
                <input type='text' className='text-input' placeholder='Enter name here...' />
                <span className='action-btn add'>Add</span>
            </div> */}
        </div>
    )
}

export default Users