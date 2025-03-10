import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Button, Form, InputGroup } from 'react-bootstrap';
import MyMsgBubble from './MyMsgBubble.jsx';
import MsgBubble from './MsgBubble';
import { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import popAlertSound from './assets/pop-alert.mp3'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, query, orderBy, addDoc } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore"
import { Timestamp } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app); // Initialize Firestore\
const messageCollectionRef = collection(db, 'messages');


let uid = idGenerator();
let name;



function ChatRoom({ username }) {
    document.querySelector('body').style.background = 'linear-gradient(60deg, rgb(33, 33, 49), rgb(17, 17, 69), rgb(40, 40, 57))'
    name = username

    useEffect(() => {
        let userInfo;
    
        if (localStorage.getItem('userInfo')) {
            userInfo = JSON.parse(localStorage.getItem('userInfo'));
            // Update only the username, keep the existing uid
            userInfo.name = username;
        } else {
            // Create new userInfo with a new uid
            userInfo = { uid: idGenerator(), name: username };
        }
    
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
        uid = userInfo.uid;
    }, [username]);

    const messageContainerRef = useRef(null)

    // const detectScroll = () => {
        
    // }
    



    //const [retrievedDocs, setRetrievedDocs] = useState([]);
    const [message, setMessage] = useState('')
    const [lastMessageId, setLastMessageId] = useState(null);
    const [isChatCooldown, setIsChatCooldown] = useState(true)


    const messagesQuery = query(messageCollectionRef, orderBy('createdAt'))
    const [retrievedDocs = []] = useCollectionData(messagesQuery, {idField: 'id'})

    useEffect(() => {
        // if (messageContainerRef.current) {
        //     messageContainerRef.current.scrollIntoView({behavior: 'smooth'})
        // }
        const popAlert = new Audio(popAlertSound)
        const container = document.getElementById('messageContainer');
        if (container) {
            container.scrollTop = container.scrollHeight; // Scroll to the bottom
            container.scrollIntoView({ behavior: 'smooth' });
        }
        if (retrievedDocs.lastIndexOf(messageCollectionRef).uid !== uid) {
            popAlert.play();
        }

    }, [retrievedDocs])

    // useEffect(() => {
    //     const fetchMessages = async () => {
    //         const messages = await retrieveMessages();
    //         setRetrievedDocs(messages);
    //     };

    //     fetchMessages();
    // }, []);

    //retrievedDocs.forEach(doc => console.log(doc.message));

    const handleSendMessage = async () => {

        if (message.trim() === '') return

        try {
            const time = getCurrentTime()
            const newMessage = {
                createdAt: Timestamp.now(),
                message: message,
                name: name,
                time: time,
                uid: uid,
            }
            await addDoc(messageCollectionRef, newMessage)
            setMessage('')
            setMessageDelay()
        }
        catch (e) {
            console.log('Error sending message: ' + e)
        }
    }
    
    async function sendMessage() {
        if (message.length <= 250 && !isChatCooldown) {
        await handleSendMessage()
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            if (e.shiftKey) {
                setMessage((prev) => prev + '\n');
            } else {
                e.preventDefault();
                sendMessage();
            }
        }
    };
    useEffect(() => {
        let delay = 3
        if (isChatCooldown) {
            const timer = setInterval(() => {
                if (delay > 0) {
                    setMessageDelay(delay--);
                }
                else {
                    clearInterval(timer);
                    setIsChatCooldown(false)
                    document.querySelector('#messageForm').placeholder = "Write your message";
                }
            }, 1000)
        return () => clearInterval(timer)
        }
    }, [isChatCooldown])

    async function setMessageDelay(delay) {
        setIsChatCooldown(true);
        const messageForm = document.querySelector('#messageForm');
        if (messageForm) {
            if (delay === undefined) {
                delay = 3
            }
            messageForm.placeholder = `${delay} seconds remaining`;
        }
    }

    return(
        <>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&icon_names=send" />
        <Container id='chatRoomContainer' className='d-flex flex-column py-4 p-2 justify-content-between '>
            <div id='navSpacer'></div>
            <div ref={messageContainerRef} className='flex-grow-1 p-2 d-flex flex-column align-items-end' id='messageContainer'>
                {retrievedDocs.map((doc, index) => {
                    const isMyMessage = uid === doc.uid;
                    const isNewMessage = lastMessageId !== doc.id;

                    if (!isMyMessage && isNewMessage) {
                        setLastMessageId(doc.id);
                    }

                    return isMyMessage ? (
                        <MyMsgBubble key={index} username={doc.name} time={doc.time} message={doc.message} />
                    ) : (
                        <MsgBubble key={index} username={doc.name} time={doc.time} message={doc.message} />
                    );
                })}
            </div>
            <InputGroup className="">
                <Form.Control onChange={(e) => setMessage(e.target.value)} value={message} onKeyDown={handleKeyDown} className='align-item-end' id='messageForm' disabled = {isChatCooldown} type="text" placeholder= 'Write your Message' />
                <Button onClick={sendMessage} className='btn-light' id='sendBtn'><span className="material-symbols-outlined mt-1" disabled= {isChatCooldown}>
send
</span></Button>
            </InputGroup>
            <p className='mb-3 align-self-end' id='charIndicator'>{message.length} / 250 characters</p>
        </Container>
        </>
    )
}

export default ChatRoom;


// async function retrieveMessages() {
//     const messageRef = collection(db, 'messages');
//     const messagesQuery = query(messageRef, orderBy('time'), limit(25));

//     try {
//         const querySnapshot = await getDocs(messagesQuery);
//         const retrievedDocs = [];
//         querySnapshot.forEach((doc) => {
//             retrievedDocs.push(doc.data());
//             //console.log(doc.data())
//         });
//         return retrievedDocs; // Return the retrieved documents
//     } catch (error) {
//         console.error("Error retrieving messages: ", error);
//         return []; // Return an empty array on error
//     }
// }

function idGenerator() {
    return '_' + Math.random().toString(36).substr(2, 9);
}

function getCurrentTime() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes().toString().padStart(2, '0')
    let ampm = hours >= 12 ? 'pm' : 'am'

    hours = hours % 12
    hours = hours ? hours : 12 // display "0" before single digit hours
    return `${hours}:${minutes} ${ampm}`

}



ChatRoom.propTypes = {
    username: PropTypes.string.isRequired,
}

