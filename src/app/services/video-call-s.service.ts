// import { Injectable } from '@angular/core';
// import { Peer, MediaConnection } from 'peerjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class PeerCallService {
//   peer: Peer;
//   private myStream: MediaStream;
//   private myEl: HTMLMediaElement;
//   private partnerEl: HTMLMediaElement;
//   private stunServer: RTCIceServer = {
//     urls: 'stun:stun.l.google.com:19302'
//   };
//   private turnServer: RTCIceServer = {
//     urls: 'turn:numb.viagenie.ca',
//     username: 'webrtc@live.com',
//     credential: 'muazkh'
//   };
//   private userData: any;
//   private currentUserEmail: any;
//   private userEmail: any;

//   constructor() {
//     this.initializeUserData();
//   }

//   private async initializeUserData() {
//     const userDataJson = localStorage.getItem('user_data');
//     if (userDataJson) {
//       this.userData = JSON.parse(userDataJson);
//       this.userEmail = this.userData.email;
//     }
//   }

//   async init(userId: string, myEl: HTMLMediaElement, partnerEl: HTMLMediaElement) {
//     this.myEl = myEl;
//     this.partnerEl = partnerEl;
//     await this.getMedia();
//     await this.createPeer(userId);
//   }

//   private async getMedia() {
//     try {
//       const constraints: MediaStreamConstraints = {
//         audio: { autoGainControl: true, echoCancellation: false, noiseSuppression: true },
//         video: { autoGainControl: true, echoCancellation: false, noiseSuppression: true }
//       };
//       this.myStream = await navigator.mediaDevices.getUserMedia(constraints);
//       this.handleMediaSuccess(this.myStream);
//     } catch (error) {
//       this.handleMediaError(error);
//     }
//   }

// private async createPeer(userId: string) {
//   const configuration = { iceServers: [this.stunServer, this.turnServer] };
//   this.peer = new Peer(userId, { config: configuration });
//   console.log('Peer created with ID:', this.peer.id);

//   this.peer.on('open', () => {
//     console.log('Peer opened with ID:', this.peer.id);
//     this.handlePeerOpen();
//   });

//   this.peer.on('call', (call: MediaConnection) => {
//     console.log('Incoming call received from:', call.peer);
//     this.handleIncomingCall(call);
//   });

//   this.peer.on('error', (err) => {
//     console.error('Peer connection error:', err);
//     this.handlePeerError(err);
//   });
// }

//   call(partnerId: string) {
//     const call = this.peer.call(partnerId, this.myStream);
//     call.on('stream', (stream) => {
//       this.partnerEl.srcObject = stream;
//     });
//     call.on('error', (err) => {
//       console.error('Call error:', err);
//       this.handlePeerError(err);
//     });
//   }

//   disconnect() {
//     this.cleanupCall();
//   }

//   private handlePeerOpen() {
//     console.log('Peer opened');
//   }

//   private handleIncomingCall(call: MediaConnection) {
//     console.log('stream===>1' )
//     call.answer(this.myStream);
//     console.log('stream===>1' )
//     call.on('stream', (stream) => {
//       console.log('stream===>2' )
//       this.partnerEl.srcObject = stream;
//       console.log('stream===>',this.partnerEl.srcObject )
//     });
//     call.on('error', (err) => {
//       console.error('Call error:', err);
//       this.handlePeerError(err);
//     });
//   }

//   private handleMediaSuccess(stream: MediaStream) {
//     this.myStream = stream;
//     this.myEl.srcObject = stream;
//     console.log('User connected');
//   }

//   private handleMediaError(error: any) {
//     console.error('Error getting user media:', error);
//   }

//   private handlePeerError(error: any) {
//     console.error('Peer connection error:', error);
//   }

//   private cleanupCall() {
//     if (this.peer) {
//       this.peer.disconnect();
//       this.peer = null;
//     }
//     if (this.myStream) {
//       this.myStream.getTracks().forEach((track) => {
//         track.stop();
//       });
//     }
//     this.myEl.srcObject = null;
//     this.partnerEl.srcObject = null;
//   }

//   destroy() {
//     this.cleanupCall();
//   }
// }
import { Injectable } from '@angular/core';
import Peer, { MediaConnection, PeerJSOption } from 'peerjs';

const constraints: MediaStreamConstraints = { video: true, audio: false };

@Injectable({
  providedIn: 'root'
})
export class PeerCallService {
  private peer: Peer;
  private myStream: MediaStream;
  private myEl: HTMLMediaElement;
  private partnerEl: HTMLMediaElement;
  private stunServer: RTCIceServer = {
    urls: 'stun:stun.l.google.com:19302'
  };
  private options: PeerJSOption;
  private mediaConnection: MediaConnection;

  constructor() {
    this.options = {
      // key: 'cd1ft79ro8g833di',
      debug: 3
    };
  }

  async init(userId: string, myEl: HTMLMediaElement, partnerEl: HTMLMediaElement) {
    this.myEl = myEl;
    this.partnerEl = partnerEl;
    await this.getMedia();
    await this.createPeer(userId);
  }

  private async getMedia() {
    try {
      const constraints: MediaStreamConstraints = {
        audio: { autoGainControl: true, echoCancellation: true, noiseSuppression: true },
        video: true
      };
      this.myStream = await navigator.mediaDevices.getUserMedia(constraints);
      this.handleSuccess(this.myStream);
    } catch (error) {
      this.handleError(error);
    }
  }

  async createPeer(userId: string) {
    this.peer = new Peer(userId, this.options);
    this.peer.on('open', () => {
      this.wait();
    });
  }

  call(partnerId: string) {
    this.mediaConnection = this.peer.call(partnerId, this.myStream);
    this.mediaConnection.on('stream', (stream) => {
      this.partnerEl.srcObject = stream;
    });
  }

  wait() {
    this.peer.on('call', (call) => {
      call.answer(this.myStream);
      call.on('stream', (stream) => {
        this.partnerEl.srcObject = stream;
      });
    });
  }
  disconectCall(){
 
          if (this.peer) {
            this.peer.disconnect();
            this.peer = null;
          }
          if (this.myStream) {
            this.myStream.getTracks().forEach((track) => {
              track.stop();
            });
          }
          this.myEl.srcObject = null;
          this.partnerEl.srcObject = null;
        }
  

  handleSuccess(stream: MediaStream) {
    this.myStream = stream;
    this.myEl.srcObject = stream;
  }

  handleError(error: any) {
    if (error.name === 'ConstraintNotSatisfiedError') {
      this.errorMsg(`The resolution is not supported by your device.`);
    } else if (error.name === 'PermissionDeniedError') {
      this.errorMsg('Permissions have not been granted to use your camera and microphone, you need to allow the page access to your devices in order for the demo to work.');
    } else {
      this.errorMsg(`getUserMedia error: ${error.name}`, error);
    }
  }

  errorMsg(msg: string, error?: any) {
    const errorElement = document.querySelector('#errorMsg');
    errorElement.innerHTML += `<p>${msg}</p>`;
    if (typeof error !== 'undefined') {
      console.error(error);
    }
  }
}