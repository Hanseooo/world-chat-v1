import 'bootstrap/dist/css/bootstrap.min.css';

function userNotif({ username }) {
    return (
        <p className='align-self-center m-4 fw-semibold text-white-50'>{username} has joined the chat</p>
    )
}

export default userNotif