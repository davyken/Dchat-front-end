import React, { useState } from "react";
import { ReactMediaRecorder } from "react-media-recorder";

const VoiceRecorder = () => {
  // Initialize state variables to hold the recorded time, playback time, and duration of the recorded audio
  const [recordTime, setRecordTime] = useState("00:00:00");
  const [playTime, setPlayTime] = useState("00:00:00");
  const [duration, setDuration] = useState("00:00:00");

  // A function to format time in milliseconds to hours, minutes, and seconds
  const formatTime = (timeInMilliseconds) => {
    const seconds = Math.floor((timeInMilliseconds / 1000) % 60);
    const minutes = Math.floor((timeInMilliseconds / 1000 / 60) % 60);
    const hours = Math.floor(timeInMilliseconds / 1000 / 60 / 60);
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  // Render the voice recorder component
  return (
    <ReactMediaRecorder
      audio // Record audio
      render={({ status, startRecording, stopRecording, mediaBlobUrl }) => (
        <div>
          {/* Display the status of the recorder */}
          <p>Status: {status}</p>
          {/* Display the recorded time */}
          <p>Recording: {recordTime}</p>
          {/* Start/Stop recording button */}
          <button
            onMouseDown={() => {
              // Reset the recorded time and start recording
              setRecordTime("00:00:00");
              startRecording();
            }}
            onMouseUp={() => stopRecording()}
          >
            {/* Display the button text based on the status */}
            {status === "recording" ? "Stop Recording" : "Start Recording"}
          </button>

          {/* If an audio blob is available, display the audio player */}
          {mediaBlobUrl && (
            <div>
              {/* Display a message indicating the audio has been recorded */}
              <p>Audio Recorded:</p>
              {/* Display the audio player */}
              <audio
                src={mediaBlobUrl} // The source of the audio is the blob URL
                controls // Display the controls for the audio player
                // Update the duration when the audio starts playing
                onPlay={() => {
                  const audioElement = new Audio(mediaBlobUrl);
                  setDuration(formatTime(audioElement.duration * 1000));
                }}
                // Update the playback time when the audio is playing
                onTimeUpdate={(e) =>
                  setPlayTime(formatTime(e.target.currentTime * 1000))
                }
              />
              {/* Display the playback time and duration */}
              <p>
                Playing: {playTime} / {duration}
              </p>
            </div>
          )}
        </div>
      )}
    />
  );
};

export default VoiceRecorder;
