const peerConnections = {};
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

let ch = 'ooo';

// const socket = io.connect(window.location.origin);

remocon.listen( "@answer", (id, description) => {
  peerConnections[id].setRemoteDescription(description);
});

remocon.listen( ch + "#watcher", id => {
  console.log('receive watcher id:', id )
  const peerConnection = new RTCPeerConnection(config);
  peerConnections[id] = peerConnection;

  let stream = videoElement.srcObject;
  stream.getTracks().forEach(track => peerConnection.addTrack(track, stream));

  peerConnection.onicecandidate = event => {
    if (event.candidate) {
      console.log('candidate id, candi:', id, event.candidate )
      remocon.signal( id + "@candidate", remocon.id, event.candidate);
    }
  };

  peerConnection
    .createOffer()
    .then(sdp => peerConnection.setLocalDescription(sdp))
    .then(() => {
      console.log('offer id, peerConnection.localDescription:', id, peerConnection.localDescription)
      remocon.signal( id + "@offer", remocon.id, peerConnection.localDescription);
    });

  peerConnection.ontrack = event => {
    remoteVideo.srcObject = event.streams[0];
  };

});

remocon.listen(  "@candidate", (id, candidate) => {
  console.log(`rcv candi from: ${id} candi: ${ JSON.stringify( candidate) }`)
  
  peerConnections[id].addIceCandidate(new RTCIceCandidate(candidate));
});

remocon.listen( ch + "#disconnectPeer", id => {
  peerConnections[id].close();
  delete peerConnections[id];
});

window.onunload = window.onbeforeunload = () => {
  // socket.close();
};

// Get camera and microphone
const videoElement = document.querySelector("#local_video");
const remoteVideo = document.querySelector("#remote_video");

const audioSelect = document.querySelector("select#audioSource");
const videoSelect = document.querySelector("select#videoSource");

audioSelect.onchange = getStream;
videoSelect.onchange = getStream;

getStream()
  .then(getDevices)
  .then(gotDevices);

function getDevices() {
  return navigator.mediaDevices.enumerateDevices();
}

function gotDevices(deviceInfos) {
  window.deviceInfos = deviceInfos;
  for (const deviceInfo of deviceInfos) {
    const option = document.createElement("option");
    option.value = deviceInfo.deviceId;
    if (deviceInfo.kind === "audioinput") {
      option.text = deviceInfo.label || `Microphone ${audioSelect.length + 1}`;
      audioSelect.appendChild(option);
    } else if (deviceInfo.kind === "videoinput") {
      option.text = deviceInfo.label || `Camera ${videoSelect.length + 1}`;
      videoSelect.appendChild(option);
    }
  }
}

function getStream() {
  if (window.stream) {
    window.stream.getTracks().forEach(track => {
      track.stop();
    });
  }
  const audioSource = audioSelect.value;
  const videoSource = videoSelect.value;
  const constraints = {
    audio: { deviceId: audioSource ? { exact: audioSource } : undefined },
    video: { deviceId: videoSource ? { exact: videoSource } : undefined }
  };
  return navigator.mediaDevices
    .getUserMedia(constraints)
    .then(gotStream)
    .catch(handleError);
}

function gotStream(stream) {
  window.stream = stream;
  audioSelect.selectedIndex = [...audioSelect.options].findIndex(
    option => option.text === stream.getAudioTracks()[0].label
  );
  videoSelect.selectedIndex = [...videoSelect.options].findIndex(
    option => option.text === stream.getVideoTracks()[0].label
  );
  videoElement.srcObject = stream;
  remocon.signal( ch + "#broadcaster");
}

function handleError(error) {
  console.error("Error: ", error);
}

remocon.on( 'ready', () => {
  console.log('remocon:ready')
  if( window.stream) remocon.signal( ch + "#broadcaster");
});