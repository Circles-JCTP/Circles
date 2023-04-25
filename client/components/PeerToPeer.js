import React from 'react';

const PeerToPeer = () => {
  const servers = {
    iceServers: [
      {
        urls: [
          'stun:stun1.l.google.com:19302',
          'stun:stun2.l.google.com:19302',
        ],
      },
    ],
  };

  let localStream;
  let remoteStream;
  let peerConnection;

  const init = async () => {
    localStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    document.getElementById('user-1').srcObject = localStream;

    createPeerConnection();
  };

  const createPeerConnection = async () => {
    peerConnection = new RTCPeerConnection(servers);

    remoteStream = new MediaStream();
    document.getElementById('user-2').srcObject = remoteStream;

    localStream.getTracks().forEach((track) => {
        peerConnection.addTrack(track, localStream);
    });

    peerConnection.ontrack = (event) => {
        event.streams[0].getTracks().forEach((track) => {
            remoteStream.addTrack(track);
        });
    };

    peerConnection.onicecandidate = (event) => {
        if (event.candidate) {
            console.log('New ICE candidate: ', JSON.stringify(event.candidate));
        }
    }

    let offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);
  };

  init();

  return (
    <div>
      <div id="videos">
        <video
          className="video-player"
          id="user-1"
          autoPlay
          playsInline
        ></video>
        <video
          className="video-player"
          id="user-2"
          autoPlay
          playsInline
        ></video>
      </div>
    </div>
  );
};

export default PeerToPeer;
