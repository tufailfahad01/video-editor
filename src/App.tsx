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

  const handleStartHandleMouseDown = () => {
    setIsDraggingStart(true);
  };

  const handleEndHandleMouseDown = () => {
    setIsDraggingEnd(true);
  };

  const handleTimelineMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (isDraggingStart) {
      const newTime = calculateTimeFromMouseEvent(event);
      if (newTime < endTime) {
        setStartTime(newTime);
      }
    } else if (isDraggingEnd) {
      const newTime = calculateTimeFromMouseEvent(event);
      if (newTime > startTime) {
        setEndTime(newTime);
      }
    }
  };

  const handleTimelineMouseUp = () => {
    setIsDraggingStart(false);
    setIsDraggingEnd(false);
  };

  const calculateTimeFromMouseEvent = (
    event: React.MouseEvent<HTMLDivElement>
  ): number => {
    const timelineWidth = event.currentTarget.offsetWidth;
    const clickX =
      event.clientX - event.currentTarget.getBoundingClientRect().left;
    const clickTime = (clickX / timelineWidth) * videoDuration;
    return Math.max(0, Math.min(videoDuration, clickTime));
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
        videoDuration={videoDuration}
        startTime={startTime}
        endTime={endTime}
        isDraggingStart={isDraggingStart}
        isDraggingEnd={isDraggingEnd}
        handleTimelineClick={handleTimelineClick}
        handleStartHandleMouseDown={handleStartHandleMouseDown}
        handleEndHandleMouseDown={handleEndHandleMouseDown}
        handleTimelineMouseMove={handleTimelineMouseMove}
        handleTimelineMouseUp={handleTimelineMouseUp}
      />
    </>
  );
}

export default App;
