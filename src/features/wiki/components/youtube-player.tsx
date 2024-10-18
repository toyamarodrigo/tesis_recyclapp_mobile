import YoutubePlayer from "react-native-youtube-iframe";

export const YoutubeVideoPlayer = ({ videoId }: { videoId: string }) => {
  return <YoutubePlayer height={250} videoId={videoId} />;
};
