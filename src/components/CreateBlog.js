import { useState } from 'react'
import blogService from '../services/blogs'

const CreateBlog = (props) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const handleNewBlog = async (event) => {
        event.preventDefault()
        try{
            const newBlog = await blogService.create({
                title, author, url
            })
            props.setBlogs(props.blogs.concat(newBlog))
        } catch(e){
            alert(`${e}`)
        }
    }
    return (
        <div>
            <h2>Create Blog</h2>
            <form onSubmit={handleNewBlog}>
                <div>
                    <label>
                        Title:
                        <input
                            type='text'
                            value={title}
                            onChange={({ target }) => setTitle(target.value)}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Author:
                        <input
                            type='text'
                            value={author}
                            onChange={({ target }) => setAuthor(target.value)}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        url:
                        <input
                            type='text'
                            value={url}
                            onChange={({ target }) => setUrl(target.value)}
                        />
                    </label>
                </div>
                <button type="submit" id="create-blog">Create</button>
            </form>
        </div>
    )
}

export default CreateBlog