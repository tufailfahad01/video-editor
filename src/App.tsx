import "./App.css";
import { useCallback, useEffect, useState } from "react";
import { AbsoluteFill } from "remotion";
import { RenderLoading } from "@remotion/player";
import VideoPlayer from "./component/VideoPlayer";
import Timeline from "./component/Timeline";

function App() {
  const [timelineWidth, setTimelineWidth] = useState(1);
  const [totalFrames, setTotalFrames] = useState(1);
  const [videoDuration, setVideoDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState<number | undefined>(undefined);
  const [isDraggingStart, setIsDraggingStart] = useState(false);
  const [isDraggingEnd, setIsDraggingEnd] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);

  const renderLoading: RenderLoading = useCallback(
    ({ height, width }) => (
      <AbsoluteFill style={{ backgroundColor: "gray" }}>
        Loading player ({height}x{width})
      </AbsoluteFill>
    ),
    []
  );

  useEffect(() => {
    setTimelineWidth(Math.max(endTime - startTime, 1));
  }, [startTime, endTime]);

  useEffect(() => {
    setEndTime(videoDuration);
    setCurrentTime(videoDuration);
  }, [videoDuration]);

  const handleTimelineClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const newTime = (offsetX / rect.width) * videoDuration;

    setCurrentTime(newTime);
  };

  const handleTimelineMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    const timeline = event.currentTarget;
    const rect = timeline.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const newTime = (offsetX / rect.width) * videoDuration;

    setIsDraggingStart(event.target === timeline);
    setIsDraggingEnd(!isDraggingStart);
  };

  const handleTimelineMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (isDraggingStart || isDraggingEnd) {
      const rect = event.currentTarget.getBoundingClientRect();
      const offsetX = event.clientX - rect.left;
      const newTime = (offsetX / rect.width) * videoDuration;

      if (isDraggingStart) {
        setStartTime(Math.min(newTime, endTime));
      } else if (isDraggingEnd) {
        setEndTime(Math.max(newTime, startTime));
      }
    }
  };

  const handleTimelineMouseUp = () => {
    setIsDraggingStart(false);
    setIsDraggingEnd(false);
  };

  return (
    <>
      <VideoPlayer
        currentTime={currentTime}
        setCurrentTime={setCurrentTime}
        setVideoDuration={setVideoDuration}
        setTotalFrames={setTotalFrames}
        videoDuration={videoDuration}
        renderLoading={renderLoading}
        startTime={startTime}
        endTime={endTime}
        setTimelineWidth={setTimelineWidth}
      />

      <Timeline
        videoDuration={timelineWidth}
        startTime={startTime}
        endTime={endTime}
        isDraggingStart={isDraggingStart}
        isDraggingEnd={isDraggingEnd}
        handleTimelineMouseDown={handleTimelineMouseDown}
        handleTimelineMouseMove={handleTimelineMouseMove}
        handleTimelineMouseUp={handleTimelineMouseUp}
        handleTimelineClick={handleTimelineClick}
      />
    </>
  );
}

export default App;
