import axios from 'axios'

const baseUrl = '/api/login'

// credentials is an js object with two fields: username and password
const login = async (credentials) => {
    // send the credentials to back end with a post request
    const res = await axios.post(baseUrl, credentials)
    return res.data
}

export default { login }