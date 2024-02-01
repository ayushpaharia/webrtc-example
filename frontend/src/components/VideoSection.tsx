import { useEffect, useRef, useState } from "react";
import ActionBar from "./ActionBar";

const VideoSection = () => {
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const p = useRef<RTCPeerConnection>(new RTCPeerConnection());
  const [remoteDescription, setRemoteDescription] = useState("");

  const makePeerConnection = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      localVideoRef.current!.srcObject = stream;

      const _pc = new RTCPeerConnection();

      stream.getTracks().forEach((track) => {
        _pc.addTrack(track, stream);
      });

      _pc.onicecandidate = (e) => {
        if (e.candidate) {
          console.log(JSON.stringify(e.candidate));
        }
      };

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      _pc.onconnectionstatechange = (e: Event) => {
        if (_pc.connectionState === "connected") {
          console.log("connected");
        }
      };

      _pc.ontrack = (e: RTCTrackEvent) => {
        console.log("track", e.streams);
        if (remoteVideoRef.current)
          remoteVideoRef.current.srcObject = e.streams[0];
      };

      p.current = _pc;
    } catch (error) {
      console.log(error);
    }
  };

  const copyTextToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      console.log("Copied to clipboard");
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const createOffer = async () => {
    try {
      const sdp = await p.current.createOffer({
        offerToReceiveAudio: true,
        offerToReceiveVideo: true,
      });

      p.current.setLocalDescription(sdp);
      copyTextToClipboard(JSON.stringify(sdp));
    } catch (err) {
      console.log(err);
    }
  };

  const createAnswer = async () => {
    try {
      const sdp = await p.current.createAnswer({
        offerToReceiveAudio: true,
        offerToReceiveVideo: true,
      });

      p.current.setLocalDescription(sdp);
      copyTextToClipboard(JSON.stringify(sdp));
    } catch (err) {
      console.log(err);
    }
  };

  const getRemoteDescription = () => {
    try {
      const sdp = JSON.parse(remoteDescription);

      p.current.setRemoteDescription(new RTCSessionDescription(sdp));

      copyTextToClipboard(JSON.stringify(sdp));
    } catch (err) {
      console.log(err);
    }
  };

  const addCandidates = () => {
    try {
      const candidate = JSON.parse(remoteDescription);
      p.current.addIceCandidate(new RTCIceCandidate(candidate));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    makePeerConnection();
  }, []);

  return (
    <>
      <div>
        <div className="flex flex-col items-center gap-4">
          <span className="flex gap-2 mt-20 justify-center">
            <button onClick={() => makePeerConnection()}>getUserMedia</button>
            <button onClick={createOffer}>Create Offer</button>
            <button onClick={createAnswer}>Create Answer</button>
            <button onClick={getRemoteDescription}>Set Remote Desc</button>
            <button onClick={addCandidates}>Add Candidates</button>
          </span>
          <textarea
            className="w-1/2"
            name="remoteDesc"
            value={remoteDescription}
            onChange={(e) => setRemoteDescription(e.target.value)}
            cols={30}
            rows={10}
          />
        </div>
      </div>
      <div className="grid gap-10 mt-20 place-items-center grid-flow-col">
        <video
          ref={localVideoRef}
          src=""
          className="w-full h-[300px] object-cover rounded-3xl bg-[#2e2e2e]"
          autoPlay
          playsInline
        />
        <video
          ref={remoteVideoRef}
          src=""
          className="w-full h-[300px] object-cover rounded-3xl bg-[#2e2e2e]"
          autoPlay
          playsInline
        />
      </div>
      <div className="flex gap-5 justify-center">
        <ActionBar />
      </div>
    </>
  );
};

export default VideoSection;
