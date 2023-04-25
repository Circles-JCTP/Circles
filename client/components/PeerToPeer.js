import React from 'react';

let APP_ID = '1d903d5ae27f4db6932d705646dfd936';
let uid = String(Math.floor(Math.random() * 10000));
let token = null;
let client, channel, localStream, remoteStream, peerConnection;
// let queryString = window.location.search;
// let urlParams = new URLSearchParams(queryString);
// let roomId = urlParams.get('room');
// if (!roomId) {
//   window.location = 'lobby.html';
// }
const servers = {
  iceServers:[
      {
          urls:['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302']
      }
  ]
}


const PeerToPeer = () => {

  const init = async () => {
    client = await AgoraRTM.createInstance(APP_ID);
    await client.login({ uid, token });
    channel = client.createChannel('main');
    await channel.join();

    channel.on('MemberJoined', handleUserJoined);
    channel.on('MessageFromPeer', handleMessageFromPeer);

    localStream = await navigator.mediaDevices.getUserMedia({video: true, audio: false,}); // Asking for access to video and or audio and getting it
    document.getElementById('user-1').srcObject = localStream; // Setting the source of the video1 element to the stream
  };

  let handleMessageFromPeer = async (message, MemberID) => {
    message = JSON.parse(message.text);
    console.log('Message:', message);
    console.log('message from peer');
  };

  let handleUserJoined = async (MemberID) => {
    console.log('member joined');
    console.log('MemberJoined', MemberID);
    createOffer(MemberID);
  };

  let createPeerConnection = async (MemberId) => {
    peerConnection = new RTCPeerConnection(servers)
    console.log(peerConnection)
    remoteStream = new MediaStream()
    // document.getElementById('user-2').srcObject = remoteStream
    // document.getElementById('user-2').style.display = 'block'
    // document.getElementById('user-1').classList.add('smallFrame')

    if(!localStream){
        localStream = await navigator.mediaDevices.getUserMedia({video:true, audio:false})
        document.getElementById('user-1').srcObject = localStream
    }

    localStream.getTracks().forEach((track) => {
        peerConnection.addTrack(track, localStream)
    })

    peerConnection.ontrack = (event) => {
        event.streams[0].getTracks().forEach((track) => {
            remoteStream.addTrack(track)
        })
    }

    peerConnection.onicecandidate = async (event) => {
        if(event.candidate){
            client.sendMessageToPeer({text:JSON.stringify({'type':'candidate', 'candidate':event.candidate})}, MemberId)
        }
    }
}

  let createOffer = async (MemberID) => {
    await createPeerConnection(MemberID);
    console.log('peerConnection', peerConnection)
    let offer = await peerConnection.createOffer(); 
    await peerConnection.setLocalDescription(offer);
    client.sendMessageToPeer({ text: JSON.stringify({ type: 'offer', offer: offer }) }, MemberID);
  };

  let createAnswer = async (MemberID, offer) => {
    await createPeerConnection(MemberID);
    await peerConnection.setRemoteDescription(offer);
    let answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(answer);
    client.sendMessageToPeer({ text: JSON.stringify({ type: 'answer', offer: offer }) },MemberID);
  };

  init();

  return (
    <div>
      <div id="videos">
        <video className="video-player" id="user-1" autoPlay playsInline></video>
        <video className="video-player" id="user-2" autoPlay playsInline></video>
      </div>
      {/* 
      <div id="controls">
        <div className="control-container" id="camera-btn">
          <img src="icons/camera.png" />
        </div>
        <div className="control-container" id="mic-btn">
          <img src="icons/mic.png" />
        </div>
        <a href="lobby.html">
          <div className="control-container" id="leave-btn">
            <img src="icons/phone.png" />
          </div>
        </a>
      </div> */}
    </div>
  );
};

export default PeerToPeer;
