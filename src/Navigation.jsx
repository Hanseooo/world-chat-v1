import 'bootstrap/dist/css/bootstrap.min.css';
import PropTypes from 'prop-types';


function Navigation({ onChangeView }) {

    return(
        <div className='mb-2 d-flex justify-content-between border-bottom p-2 py-2 sticky-top mt-2'>
        <a className='fw-semibold text-decoration-none text-light fs-5 px-2' href='#'>World Chat</a>
        <div className=''>
        <button onClick={() => onChangeView('home')} className='btn btn-link text-light text-decoration-none navBtn'>Home</button>
        <button onClick={() => onChangeView('chat')} className='btn btn-link text-light text-decoration-none navBtn'>Chat</button>
        </div>
    </div>
    )
}

Navigation.propTypes = {
    onChangeView: PropTypes.func.isRequired,
}

export default Navigation