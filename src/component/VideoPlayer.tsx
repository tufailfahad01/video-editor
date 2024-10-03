import React, { useEffect, useRef } from "react";
import { Player, RenderLoading, PlayerRef } from "@remotion/player";
import { MyComposition } from "../remotion/MyComposition";

interface VideoPlayerProps {
  currentTime: number | undefined;
  setCurrentTime: (time: number) => void;
  setVideoDuration: (duration: number) => void;
  setTotalFrames: (frames: number) => void;
  videoDuration: number;
  renderLoading: RenderLoading;
  startTime: number;
  endTime: number;
  setTimelineWidth: (width: number) => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  currentTime,
  setCurrentTime,
  setVideoDuration,
  setTotalFrames,
  videoDuration,
  renderLoading,
  startTime,
  endTime,
  setTimelineWidth,
}) => {
  const playerRef = useRef<PlayerRef>(null);

  useEffect(() => {
    if (currentTime !== undefined) {
      const newCurrentTime = Math.min(
        Math.max(currentTime, startTime / 1000),
        endTime / 1000
      );
      playerRef.current?.seekTo(newCurrentTime);
    }
  }, [startTime, endTime, currentTime]);

  return (
    <Player
      ref={playerRef}
      component={MyComposition}
      inputProps={{
        setTimelineWidth,
        setVideoDuration,
        currentTimeInSeconds: currentTime ?? 0,
        setTotalFrames,
      }}
      renderLoading={renderLoading}
      durationInFrames={240} // FIXME: calculate total frames
      compositionWidth={1920}
      compositionHeight={1080}
      controls
      fps={30}
      style={{ height: "100%" }}
      spaceKeyToPlayOrPause
      loop
      autoPlay
      allowFullscreen
      showPlaybackRateControl
      showVolumeControls
      doubleClickToFullscreen
      hideControlsWhenPointerDoesntMove
    />
  );
};

export default VideoPlayer;
