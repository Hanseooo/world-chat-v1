import 'bootstrap/dist/css/bootstrap.min.css';
import PropTypes from 'prop-types';

function MsgBubble( { username, time, message } ) {
    return(
        <div className='messageBubble border border-white p-2 rounded-3 m-2 align-self-start bg-gradient'>
                    <div className='d-flex px-2 justify-content-between'>
                        <p className='fw-bold bubbleUsernameHeader'>{username}</p>
                        <p className='text-white-50 fw-semibold'>{time}</p>
                    </div>
                    <p className='px-2'>{message}</p>
                </div>
    )
}

MsgBubble.propTypes = {
    username: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired
}

export default MsgBubble



