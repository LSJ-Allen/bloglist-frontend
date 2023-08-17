import loginService from '../services/login'
import blogService from '../services/blogs'
const Form = (props) => {
    const handleLogin = async (event) => {
        event.preventDefault()
        try{
            const user = await loginService.login({
                username: props.userName,
                password: props.password
            })

            props.setUser(user)
            props.setUserName('')
            props.setPassword('')
            blogService.setToken(user.token)
            window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
        } catch(e){
            props.setMessage('Username or password incorrect')
            setTimeout(() => {
                props.setMessage(null)
            }, 3000)
        }
    }

    return (
        <div>
            <form onSubmit={handleLogin}>
                <div>
                    username: <input
                        id='username'
                        type="text"
                        value={props.userName}
                        onChange={({ target }) => props.setUserName(target.value)}
                    />
                </div>
                <div>
                    password:
                    <input
                        id='password'
                        type="text"
                        value={props.password}
                        onChange={({ target }) => props.setPassword(target.value)}
                    />
                </div>
                <button type="submit">login</button>
            </form>
        </div>

    )
}

export default Form