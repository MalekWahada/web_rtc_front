import React, {
    createContext,
    useState,
    useRef,
    useEffect
} from 'react';
import io from 'socket.io-client';
import Peer from 'simple-peer';

const BACK_BASE_URL = process.env.REACT_APP_BACK_BASE_URL;

const SocketContext = createContext();
console.log(BACK_BASE_URL);
const socket = io(BACK_BASE_URL);

const ContextProvider = ({ children }) => {
    const [stream, setStream] = useState(null);
    const [me, setMe] = useState('');
    const [call, setCall] = useState(null);
    const [callAccepted, setCallAccepted] = useState(false);
    const [callEnded, setCallEnded] = useState(false);
    const [name, setName] = useState('');

    const myVideo = useRef();
    const userVideo = useRef();
    const connectionRef = useRef();

    useEffect(() => {
        // built-in
        navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true,
        }).then((currentStream) => {
            setStream(currentStream);

            // once compoennt did mount (equivalent class compinent lifeCycle method) we populate our video frame
            myVideo.current.srcObject = currentStream;
        });

        socket.on('me', (id) => setMe(id));
        socket.on('calluser', ({ from, name: callerName, signal }) => {
            setCall({ isReceivingCall: true, from, name: callerName, signal });
        });
    }, []);

    const answerCall = () => {
        setCallAccepted(true);

        const peer = new Peer({ initiator: false, trickle: false, stream });

        // establish video connection
        peer.on('signal', (data) => {
            socket.emit('answercall', { signal: data, to: call.from });
        })

        // set other user stream
        peer.on('stream', (currentStream) => {
            userVideo.current.srcObject = currentStream;
        });

        peer.signal(call.signal);

        connectionRef.current = peer;
    }

    const callUser = (id) => {
        const peer = new Peer({ initiator: true, trickle: false, stream });

        // establish video connection
        peer.on('signal', (data) => {
            socket.emit('calluser', { userToCall: id, signalData: data, from: me, name });
        })

        // set other user stream
        peer.on('stream', (currentStream) => {
            userVideo.current.srcObject = currentStream;
        });

        socket.on('callaccepted', (signal) => {
            setCallAccepted(true);

            peer.signal(signal);
        });

        connectionRef.current = peer;
    }

    const leaveCall = () => {
        setCallEnded(true);
        connectionRef.current.destroy();
        window.location.reload();
    }

    return (
        <SocketContext.Provider value={{
            call,
            callAccepted,
            myVideo,
            userVideo,
            stream,
            name,
            setName,
            callEnded,
            me,
            callUser,
            leaveCall,
            answerCall,
        }}>
            {children}
        </SocketContext.Provider>
    );
}

export { ContextProvider, SocketContext };

