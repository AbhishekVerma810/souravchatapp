import { Injectable } from '@angular/core';
import Peer, { MediaConnection, PeerJSOption } from 'peerjs';

@Injectable({
  providedIn: 'root'
})
export class VoiceCallService {
  private peer: Peer;
  private myStream: MediaStream;
  private options: PeerJSOption;
  private mediaConnection: MediaConnection;

  constructor() {
    this.options = { debug: 3 };
  }

  async init(userId: string) {
    await this.getMedia();
    await this.createPeer(userId);
  }
  private async getMedia() {
    try {
      const constraints: MediaStreamConstraints = {
        audio: true,
        video: false
      };
      this.myStream = await navigator.mediaDevices.getUserMedia(constraints);
      console.log(this.myStream);
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
      // Handle the partner's audio stream if needed
    });
  }

  wait() {
    this.peer.on('call', (call) => {
      call.answer(this.myStream);
      call.on('stream', (stream) => {
        // Handle the partner's audio stream if needed
      });
    });
  }

  disconnectCall() {
    if (this.peer) {
      this.peer.disconnect();
      this.peer = null;
    }
    if (this.myStream) {
      this.myStream.getTracks().forEach((track) => {
        track.stop();
      });
    }
  }

  handleError(error: any) {
    if (error.name === 'PermissionDeniedError') {
      this.errorMsg('Permissions have not been granted to use your microphone, you need to allow the page access to your microphone in order for the audio call to work.');
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