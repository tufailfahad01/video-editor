interface TimelineProps {
  videoDuration: number;
  startTime: number;
  endTime: number;
  isDraggingStart: boolean;
  isDraggingEnd: boolean;
  handleTimelineClick: (event: React.MouseEvent<HTMLDivElement>) => void;
  handleTimelineMouseDown: (event: React.MouseEvent<HTMLDivElement>) => void;
  handleTimelineMouseMove: (event: React.MouseEvent<HTMLDivElement>) => void;
  handleTimelineMouseUp: () => void;
}

const Timeline: React.FC<TimelineProps> = ({
  videoDuration,
  startTime,
  endTime,
  isDraggingStart,
  isDraggingEnd,
  handleTimelineClick,
  handleTimelineMouseDown,
  handleTimelineMouseMove,
  handleTimelineMouseUp,
}) => {
  return (
    <div className="mt-12 bg-neutral-700 rounded-lg overflow-hidden p-4 h-full w-full">
      <div
        className="w-full h-8 relative"
        onMouseMove={handleTimelineMouseMove}
        onMouseUp={handleTimelineMouseUp}
        onMouseLeave={handleTimelineMouseUp}
        onClick={handleTimelineClick}
        style={{
          cursor: isDraggingStart || isDraggingEnd ? "pointer" : "auto",
        }}
      >
        <div
          className="absolute bg-black h-full"
          style={{
            width: `${((endTime - startTime) / videoDuration) * 100}%`,
            left: `${(startTime / videoDuration) * 100}%`,
          }}
        />
        <div
          className="absolute bg-red-500 h-full w-1"
          style={{
            left: `${(startTime / videoDuration) * 100}%`,
            transform: "translateX(-50%)",
          }}
          onMouseDown={handleTimelineMouseDown}
        />
        <div
          className="absolute bg-red-500 h-full w-1"
          style={{
            left: `${(endTime / videoDuration) * 100}%`,
            transform: "translateX(-50%)",
          }}
          onMouseDown={handleTimelineMouseDown}
        />
      </div>
      <div className="flex justify-between mt-1">
        <span>{(startTime / 1000).toFixed(2)} s</span>
        <span>{(endTime / 1000).toFixed(2)} s</span>
      </div>
    </div>
  );
};

export default Timeline;
