import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Task = () => {

    const [posts, setPosts] = useState([])

    const [formShowUpdate, setFormShowUpdate] = useState(false)

    const [updateId, setUpdateId] = useState('')

    const [creatformshow, setCreateFormShow] = useState(false)

    const [updateddata, setUpdatedData] = useState({ title: '', body: '' })

    const [data, setData] = useState({ title: '', body: '', userId: 1 })


    useEffect(() => {
        ApiData()
    }, []);

    const ApiData = async () => {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/`);
        setPosts(response.data)
        // console.log(response)
    }

    const deletPost = async (id) => {
        await axios.delete(`https://jsonplaceholder.typicode.com/posts/ ${id}`);
        const deletePosts = posts.filter((post) => post.id !== id);
        setPosts(deletePosts)
    }

    const updateData = (id) => {
        setUpdateId(id)
        setFormShowUpdate(true)
    }

    const UpdatedPost = async () => {
        const response = await axios.put(`https://jsonplaceholder.typicode.com/posts/${updateId}`, updateddata);
        const updatedPosts = posts.map((post) => post.id === updateId ? response.data : post);
        setPosts(updatedPosts)
        setUpdateId('')
        setFormShowUpdate(false)
    }

    const handleChangeUpdate = (e) => {
        const { name, value } = e.target
        setUpdatedData((prevPerson) => {
            return { ...prevPerson, [name]: value };
        });
    }

    const createPost = async() => {
        const response = await axios.post(`https://jsonplaceholder.typicode.com/posts/`,data);
        setPosts([...posts , response.data])
        setCreateFormShow(false)
        

    }

    const handleChangeCreate = (e) => {
        const {name,value}= e.target
        setData((prevPerson) => {
            return { ...prevPerson, [name]:value}
        })
    }

    return (
        <div>
            <button className='btn btn-success m-2' onClick={() => setCreateFormShow(true,alert(' "Create" Form is given at the Bottom of the Table '))}>CreatePost</button>
            <table className="table">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Title</th>
                        <th scope="col">Body</th>
                        <th scope="col">Action</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {posts && posts.map((e, i) => {
                        return (
                            <tr key={i}>
                                <th scope="row">{i + 1}</th>
                                <td>{e.title}</td>
                                <td>{e.body}</td>
                                <td>
                                    <button className='btn btn-danger' onClick={() => deletPost(e.id)}>Delete</button>
                                </td>
                                <td>
                                    <button className='btn btn-warning' onClick={() => updateData(e.id,alert(' "Update" Form is, at the bottom of the table '))}>Update</button>
                                </td>
                            </tr>
                        )
                    })}

                </tbody>
            </table>
            {formShowUpdate &&
                <div className="row container">
                    <div className="col-md-6">
                        <input type='text' placeholder='Enter title' className='form-control' onChange={handleChangeUpdate} name='title' />
                    </div>
                    <div className="col-md-6">
                        <input type='text' placeholder='Enter body' className='form-control' onChange={handleChangeUpdate} name='body' />
                    </div>
                    <div>
                        <button className='btn btn-primary mt-2' onClick={UpdatedPost}>Update</button>
                    </div>
                </div>
            }

            {creatformshow &&
                <div className="row container">
                    <div className="col-md-6">
                        <input type='text' placeholder='Enter title' className='form-control' onChange={handleChangeCreate} name='title' />
                    </div>
                    <div className="col-md-6">
                        <input type='text' placeholder='Enter body' className='form-control' onChange={handleChangeCreate} name='body' />
                    </div>
                    <div>
                        <button className='btn btn-success mt-2' onClick={createPost}>CreatePost</button>
                    </div>
                </div>
            }
        </div>
    );
};

export default Task;