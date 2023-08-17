const Notification = ({ message }) => {
    if(message===null){
        return null
    } else{
        return(
            <div className="message">
                <h2>{message}</h2>
            </div>
        )
    }
}

export default Notification