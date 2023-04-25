import React from 'react'
import { useContext, useState } from 'react'
import { SocketContext } from './Socket'
import {CopyToClipboard} from 'react-copy-to-clipboard'

const Options = ( {children} ) => {

    const { me, callAccepted, name, setName, callEnded, leaveCall, callUser } = useContext(SocketContext)
    const [idToCall, setIdToCall] = useState('')


    return (
        <>
            <div className = 'OptionsBox'>
                <input type='text' value={name} placeholder='Name' onChange={(e) => setName(e.target.value)} />
                <input type='text' value={idToCall} placeholder='ID to Call' onChange={(e) => setIdToCall(e.target.value)} />
                <CopyToClipboard text={me}>
                    <button>Copy Your Caller ID</button>
                </CopyToClipboard>
                {callAccepted && !callEnded ? (
                <button variant="contained" color="secondary"  onClick={leaveCall} >Hang Up</button>) : (
                <button variant="contained" color="primary"  onClick={() => callUser(idToCall)} >Call</button>)}
            </div>
            {children}
        </>
    )
}

export default Options