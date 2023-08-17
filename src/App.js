import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import CreateBlog from './components/CreateBlog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [user, setUser] = useState(null)
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState(null)


    // when page is refereshed, check for saved user info so user doesn't need to login again
    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
        if(loggedUserJSON){
            const user = JSON.parse(loggedUserJSON)
            console.log(user)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    useEffect(() => {
        blogService.getAll().then(blogs => {
            blogs.sort((a, b) => {
                return b.likes - a.likes
            })
            setBlogs( blogs )
        }
        )
    }, [])

    const handleLogout = () => {
        window.localStorage.removeItem('loggedBlogAppUser')
        setUser(null)
    }

    return (
        <div>
            <Notification message={message}/>
            <h2>blogs</h2>
            {user===null?
                <LoginForm
                    userName={userName}
                    password={password}
                    setUserName={setUserName}
                    setPassword={setPassword}
                    setUser={setUser}
                    setMessage={setMessage}
                /> :
                <div>
                    <p>{user.username} is logged in. <button onClick={handleLogout}>logout</button></p>
                    <Togglable buttonLabel='new blog'>
                        <CreateBlog blogs={blogs} setBlogs={setBlogs}/>
                    </Togglable>

                    <h2>Blog list</h2>
                    {blogs.map(blog =>
                        <Blog key={blog.id} blog={blog} blogs={blogs} setBlogs={setBlogs}/>
                    )}
                </div>
            }
        </div>
    )
}

export default App