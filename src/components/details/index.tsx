import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { videoInfo } from '../../api/axios';
import Info from './VideoInfo';
import RelatedVideos from './RelatedVideos';
import style from './index.module.scss';
import Comments from './Comments';

interface videoIdPrams {
  videoId?: string;
}

const details = () => {
  const { videoId = '' }: videoIdPrams = useParams();
  const [video, setVideo] = useState({});

  const data = {
    maxResults: 2,
  };

  useEffect(() => {
    async function videoData() {
      try {
        const response = await videoInfo(videoId, data);
        setVideo(response.data.items);
      } catch (error) {
        console.log('에러가 발생했습니다.');
      }
    }
    videoData();
  }, [videoId]);

  return (
    <div className={style.detailWrap}>
      <div className={style.videoContent}>
        <iframe
          id={videoId}
          width="100%"
          height="550"
          src={`http://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&showinfo=0&rel=0&loop=1`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        ></iframe>
        {Array.isArray(video)
          ? video.map((item, idx) => {
              return <Info item={item} key={idx} />;
            })
          : null}
        <Comments videoId={videoId} />
      </div>
      <RelatedVideos videoId={videoId} />
    </div>
  );
};

export default details;
