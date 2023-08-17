import { useState } from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const Blog = ({ blog, blogs,setBlogs }) => {
    const [allVisible, setAllVisible] = useState(false)
    const toggleVisibility = () => {
        setAllVisible(!allVisible)
    }

    const handleLike = async () => {
        const newBlog = { ...blog, likes: blog.likes+1 }
        try{
            const result = await blogService.update(newBlog)
            // console.log(typeof(result))
            setBlogs(blogs.map(b => b.id !== blog.id ? b : result))
        } catch(exception){
            console.log(exception)
        }
    }

    const handleDelete = async () => {
        if(window.confirm(`Remove blog ${blog.title}?`)){
            blogService.deleteBlog(blog)
            setBlogs(blogs.filter(i => i.id !== blog.id))
        }
    }

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }
    return (
        <div style={blogStyle} className="blog">
            {allVisible?
                <div>
                    <p>Title: {blog.title}</p>
                    <p>Author: {blog.author}</p>
                    <p>url: {blog.url}</p>
                    <p id='numberOfLikes' placeholder='likes'>likes: {blog.likes}</p>
                    <button onClick={toggleVisibility}>show less</button>
                </div>:
                <div>
                    <p>{blog.title}</p>
                    <button onClick={toggleVisibility}>show all</button>
                </div>
            }
            <button onClick={handleLike} id='like-button'>like</button>
            <button onClick={handleDelete}>delete</button>
        </div>
    )
}

Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    blogs: PropTypes.array.isRequired,
    setBlogs: PropTypes.func.isRequired
}
export default Blog