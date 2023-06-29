import React from "react";
import { useLocation, useParams } from "react-router-dom";
import Youtube from "react-youtube";

const VideoPage = () => {
  const { videoId } = useParams();
  let location = useLocation();
  const { state: currentVideo } = location;

  const onPlayerReady = (e) => {
    e.target.playVideo();
  };

  const opts = {
    height: "390",
    width: "640",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  return (
    <div>
      <Youtube className="youtube-plater" videoId={videoId} onPlay={onPlayerReady} opts={opts} autoPlay />
    </div>
  );
};

export default VideoPage;
