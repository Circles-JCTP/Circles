import React from 'react'

import { SocketContext } from './Socket'
import { useContext } from 'react'


const VideoPlayer = () => {

    const { name, callAccepted, myVideo, userVideo, callEnded, stream, call } = useContext(SocketContext)

    return (
        <>
            <div className = 'VideBox'>
                <div>
                    <a>{name || 'Name'}</a>
                    <video playsInline muted ref = {myVideo} autoPlay style={{ width: '300px' }} className='video' />
                </div>
                <div>
                    <a>{call.name || 'Name'}</a>
                    <video playsInline muted ref = {userVideo} autoPlay style={{ width: '300px' }} className='video' />
                </div>
            </div>
        </>
    )
}

export default VideoPlayer