"use client";
import { useTracks } from '@livekit/components-react'
import { Track } from 'livekit-client'
import React, { useEffect, useRef, useState } from 'react'
import {FullScreen} from './fullscreen-control'
import { useEventListener } from 'usehooks-ts'
import { VolumeControl } from './volume-control';

function LiveVideo({
    participant
}) {

const videoRef=useRef(null)
const wrapperRef=useRef(null)

const [isFullscreen, setIsFullscreen] = useState(false);
const [volume, setVolume] = useState(0);

const onVolumeChange = (value) => {
    setVolume(+value);
    if (videoRef?.current) {
      videoRef.current.muted = +value === 0;
      videoRef.current.volume = +value * 0.01;
    }
  };

let previousVolume=50

  const toggleMute = () => {
    const isMuted = volume === 0;

    if (isMuted) {
        setVolume(previousVolume)

    if (videoRef?.current) {
      videoRef.current.muted = !isMuted;
      videoRef.current.volume = +previousVolume*0.01 ;
    }
    }else{
        previousVolume=volume
        setVolume(0)
        if (videoRef?.current) {
            videoRef.current.muted = !isMuted;
            videoRef.current.volume = 0 ;
          }
    }

  };
  useEffect(() => {
    onVolumeChange(0);
  }, []);


//toggles fullscreen
const toggleFullScreen=() => {
  
    if (isFullscreen) {
        // exit fullscreen
     document.exitFullscreen()
    } else if(wrapperRef?.current) {
       //for fullscreen
        wrapperRef.current.requestFullscreen()
    }

}

//handles the change in value of isFullscreen
const handleFullscreenChange = () => {
    //document.fullscreenElement gives the currently fullscreened element and if non then gives null
    const isCurrentlyFullscreen = document.fullscreenElement !== null;
    setIsFullscreen(isCurrentlyFullscreen);
  }

  //whenever the wrapper is fullscreened or viceversa this runs the handlefullscreen change function this is used because users can also exit full screen using esc so to manage that we use this
  useEventListener("fullscreenchange", handleFullscreenChange, wrapperRef);

 useTracks([
    Track.Source.Camera,
Track.Source.Microphone
]).filter((track)=>track.participant.identity===participant.identity)
.forEach((track)=>{
    if(videoRef){
        track.publication.track?.attach(videoRef.current)
    }
})
  return (
    <div 
    ref={wrapperRef}
    className="relative h-full flex"
  >
    <video ref={videoRef} width="100%" />
    <div className="absolute top-0 h-full w-full opacity-0 hover:opacity-100 hover:transition-all">
      <div className="absolute bottom-0 flex h-14 w-full items-center justify-between bg-gradient-to-r from-neutral-900 px-4">
        <VolumeControl
         onChange={onVolumeChange}
         value={volume}
         onToggle={toggleMute}
        />
        <FullScreen
         onToggle={toggleFullScreen}
         isFullscreen={isFullscreen}
        />
      </div>
    </div>
  </div>
  )
}

export default LiveVideo
