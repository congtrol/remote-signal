let peerConnection;
const config = {
  iceServers: [
      { 
        "urls": "stun:stun.l.google.com:19302",
      },
      // { 
      //   "urls": "turn:TURN_IP?transport=tcp",
      //   "username": "TURN_USERNAME",
      //   "credential": "TURN_CREDENTIALS"
      // }
  ]
};

remocon = new Remocon('wss://bayo.tv/ws')
// remocon = new Remocon('ws://localhost:3002')
let ch = "ooo";

// const socket = io.connect(window.location.origin);
const video = document.querySelector("video");
const enableAudioButton = document.querySelector("#enable-audio");

enableAudioButton.addEventListener("click", enableAudio)

const mediaConstraints = {
  audio: true, // We want an audio track
  video: true // And we want a video track
};
let localStream = null;

remocon.listen( "@offer", (id, description) => {
  console.log('rcv @offer => (id,description):', id, description)
  peerConnection = new RTCPeerConnection(config);

  //add media


  peerConnection
    .setRemoteDescription(description)
    .then(() => navigator.mediaDevices.getUserMedia(mediaConstraints))
    .then((stream) => {
      console.log('localstream', stream )
      localStream = stream;
      document.getElementById("local_video").srcObject = localStream;

      localStream.getTracks().forEach((track) => peerConnection.addTrack(track, localStream));
    })
    .then(() => peerConnection.createAnswer())
    .then(sdp => peerConnection.setLocalDescription(sdp))
    .then(() => {
      remocon.signal( id + "@answer", remocon.id, peerConnection.localDescription);
    });
  peerConnection.ontrack = event => {
    video.srcObject = event.streams[0];
  };
  peerConnection.onicecandidate = event => {
    if (event.candidate) {
      remocon.signal( id + "@candidate", remocon.id, event.candidate);
    }
  };
});


remocon.listen( "@candidate", (id, candidate) => {
  console.log(`rcv candi from: ${id} candi: ${ JSON.stringify( candidate) }`)
  peerConnection
    .addIceCandidate(new RTCIceCandidate(candidate))
    .catch(e => console.error(e));
});

remocon.on( 'ready', () => {
  console.log('open remocon.id', remocon.id)
  remocon.signal( ch + "#watcher" , remocon.id );
});

remocon.listen( ch + "#broadcaster", () => {
  console.log('broadcaster remocon.id', remocon.id)
  remocon.signal( ch + "#watcher" , remocon.id );

});

window.onunload = window.onbeforeunload = () => {
  // socket.close();
  peerConnection.close();
};

function enableAudio() {
  console.log("Enabling audio")
  video.muted = false;
}



remocon.on('close',e=>{
  remocon.signal("#disconnectPeer", remocon.id);

})


const localVideo = document.querySelector('#local_video')