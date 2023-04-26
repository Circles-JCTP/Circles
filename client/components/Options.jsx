import React from 'react'
import { useContext, useState } from 'react'
import { SocketContext } from './Socket'
import {CopyToClipboard} from 'react-copy-to-clipboard'

const Options = ( {children} ) => {

    const { me, callAccepted, name, setName, callEnded, leaveCall, callUser } = useContext(SocketContext)
    const [idToCall, setIdToCall] = useState('')


    return (
        <>
            <div className = 'OptionsContainer'>
                <div className='ButtonContainer'>
                    <CopyToClipboard text={me}>
                        <button className='copy'>Copy Your Caller ID</button>
                    </CopyToClipboard>
                    {callAccepted && !callEnded ? (
                        <button className='hangup' variant="contained" color="secondary" onClick={leaveCall} >Hang Up</button>) : (
                        <button className = 'call' variant="contained" color="primary" onClick={() => callUser(idToCall)} >Call</button>)}
                </div>
                <div className='InputContainer'>
                    <input  className='name' type='text' value={name} placeholder='Name' onChange={(e) => setName(e.target.value)} />
                    <input className='idtocall' type='text' value={idToCall} placeholder='ID to Call' onChange={(e) => setIdToCall(e.target.value)} />
                </div>
            </div>  
            {children}
        </>
    )
}

export default Options