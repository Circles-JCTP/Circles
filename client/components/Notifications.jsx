import React from 'react'

import { SocketContext } from './Socket'
import { useContext } from 'react'

const Notifications = () => {
    const { call, callAccepted, answerCall } = useContext(SocketContext);

    return (
        <>
          {call.isReceivingCall && !callAccepted && (
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
              <a>Incoming Call from: {call.name}</a>
              <button variant="contained" color="primary" onClick={answerCall}>Answer</button>
            </div>
          )}
        </>
      );
}

export default Notifications