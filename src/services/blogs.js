import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
const setToken = (newToken) => {
    token = `Bearer ${newToken}`
}

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = async (info) => {
    const config = {
        headers: { Authorization: token }
    }
    console.log(config)
    const res = await axios.post(baseUrl, info, config)
    return res.data
}

const update = async (blog) => {
    const res = await axios.put(`${baseUrl}/${blog.id}`, blog)
    // console.log(typeof(res))
    return res.data
}

const deleteBlog = async (blog) => {
    await axios.delete(`${baseUrl}/${blog.id}`, { headers: { Authorization: token } })

}
export default { getAll, create, setToken, update, deleteBlog }