import React from 'react'

import { SocketContext } from './Socket'
import { useContext } from 'react'

const Notifications = () => {
    const { call, callAccepted, answerCall, declineCall } = useContext(SocketContext);

    return (
        <div className='NotificationContainer'>
          {call.isReceivingCall && !callAccepted && (
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
              <a>Incoming Call from: {call.name}</a>
              <button className = 'CallButtons green' variant="contained" color="primary" onClick={answerCall}>Answer</button>
              <button className = 'CallButtons red' variant="contained" color="secondary" onClick={declineCall}>Decline</button>
            </div>
          )}
        </div>
      );
}

export default Notifications