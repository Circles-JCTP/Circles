import React from 'react'

import { SocketContext } from './Socket'
import { useContext } from 'react'


const VideoPlayer = () => {

    const { name, callAccepted, myVideo, userVideo, callEnded, stream, call } = useContext(SocketContext)

    return (
        <>
            <div className = 'VideosContainer'>
                <div className='VideoBox'>
                    <a>{name || 'Name'}</a>
                    <video playsInline muted ref = {myVideo} autoPlay style={{ width: '300px' }} className='video1' />
                </div>
                <div className='VideoBox'>
                    <a>{call.name || 'Name'}</a>
                    <video playsInline muted ref = {userVideo} autoPlay style={{ width: '300px' }} className='video2' />
                </div>
            </div>
        </>
    )
}

export default VideoPlayer