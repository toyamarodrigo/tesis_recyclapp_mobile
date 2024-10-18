import { useState } from "react";
import { useCallback } from "react";
import YoutubePlayer from "react-native-youtube-iframe";

export const YoutubeVideoPlayer = ({ videoId }: { videoId: string }) => {
  const [playing, setPlaying] = useState(false);

  const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);

  return (
    <YoutubePlayer
      height={250}
      play={playing}
      videoId={videoId}
    />
  );
};
