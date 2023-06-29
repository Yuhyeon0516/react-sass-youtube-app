import React, { useContext, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import Youtube from "react-youtube";
import { SidebarContext } from "../../context/SidebarContext";
import { BiDislike, BiLike } from "react-icons/bi";
import { RiFlagLine, RiShareForwardLine } from "react-icons/ri";
import { MdPlaylistAdd } from "react-icons/md";
import dayjs from "dayjs";

const VideoPage = () => {
  const { videoId } = useParams();
  let location = useLocation();
  const { state: currentVideo } = location;
  const { setIsToggled } = useContext(SidebarContext);

  useEffect(() => {
    setIsToggled(false);
  }, []);

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

  const videoHeaderMarkUp = (
    <div className="video_main_info">
      <div className="tags">
        {currentVideo?.snippet?.tags?.map((tag, i) => (
          <p className="tag" key={i}>
            #{tag}
          </p>
        ))}
      </div>
      <h1>{currentVideo.snippet.title}</h1>
      <div className="videoplayer_metadata">
        <span>{currentVideo.extraInfo.viewCount} views</span>
        <span className="dot_separator"> &#8226; </span>
        <span>{dayjs(currentVideo.snippet.publishedAt).format("MMM D, YYYY")}</span>
      </div>
    </div>
  );

  return (
    <section className="videoPage">
      <div className="columns_container">
        <div className="column column_1">
          <div className="youtube_player_container">
            <Youtube className="youtube-plater" videoId={videoId} onPlay={onPlayerReady} opts={opts} autoPlay />
          </div>
          <div className="videoplayer_info">
            {videoHeaderMarkUp}
            <div className="main_header_buttons">
              <div className="likes_container">
                <div className="likes">
                  <BiLike size={25} />
                  <span>Likes</span>
                </div>
                <div className="dislikes">
                  <BiDislike size={25} />
                  <span>Dislikes</span>
                </div>
              </div>
              <div className="share">
                <RiShareForwardLine size={25} />
                <span>Share</span>
              </div>
              <div className="save">
                <MdPlaylistAdd size={25} />
                <span>Save</span>
              </div>
              <div className="report">
                <RiFlagLine size={25} />
              </div>
            </div>
          </div>
          <div className="channel_video_info">
            <div className="channel_data">
              <div className="channel_avatar">
                <img src={currentVideo.channelInfo.thumbnails.default.url} alt="avatar" />
              </div>
              <div className="channel_title">
                <a href="/">{currentVideo.channelInfo.title}</a>
                <span>{currentVideo.channelInfo.subscriberCount}</span>
              </div>
              <div>
                <button className="channel_subscribe">Subscribe</button>
              </div>
            </div>
            <div className="video_description">{currentVideo.snippet.description}</div>
          </div>
          <div className="video_comments_container">
            <div className="video_comments_count">{currentVideo.extraInfo.commentCount} Comments</div>
            <div className="video_comments">{/* videoCummentMarkUp */}</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoPage;
