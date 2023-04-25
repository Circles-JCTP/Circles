import React from 'react';
import AgoraRTM from '../../agora-rtm-sdk-1.5.1.js';
import env from 'dotenv'

env.config()

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
  let APP_ID = process.env.APP_ID;
  console.log('test')
  console.log(APP_ID)
  let token = null;
  let uid = Math.floor(Math.random() * 1000000000);
  let localStream, remoteStream, peerConnection, client, channel;

  const init = async () => {
    client = AgoraRTM.clientInstance(APP_ID);
    await client.login({ uid, token });
    channel - client.createChannel('main');
    await channel.join();
    channel.on('MemberJoined', (MemberId) => {
      console.log('MemberJoined', MemberId);
    });

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
