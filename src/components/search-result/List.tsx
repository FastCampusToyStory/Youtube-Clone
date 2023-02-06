import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './search.module.scss';
import useDay from '../../hooks/useDay';
import dayjs, { Dayjs } from 'dayjs';
import { videoInfo, channelInfo } from '../../api/axios';
import { getDuration } from '../../hooks/useDuration';
import { getViewCount } from '../../hooks/useViews';

type Props = {
  data: any;
};

const List = ({ data }: Props) => {
  const [videoId, setVideoId] = useState('');
  const [videoData, setVideoData] = useState({
    duration: '',
    views: 0,
  });
  const [date, setDate] = useState<Dayjs | null>(null);
  const [channelId, setChannelId] = useState('');
  const [channelData, setChannelData] = useState('');
  const [hover, setHover] = useState(false);
  const durationTime = getDuration(videoData.duration);
  const viewCount = getViewCount(videoData.views);
  let today = useDay(dayjs(date));

  // 비디오 정보 duration, views 받아오기
  const video = async (id: string) => {
    const { data } = await videoInfo(id);
    const duration = data.items[0].contentDetails.duration;
    const views = data.items[0].statistics.viewCount;
    setVideoData({
      duration,
      views,
    });
  };

  // 채널 이미지 정보 받아오기
  const channel = async (id: string) => {
    const { data } = await channelInfo(id);
    const channelImg = data.items[0].snippet.thumbnails.high.url;
    setChannelData(channelImg);
  };

  useEffect(() => {
    if (videoId !== undefined) {
      setVideoId(data.id.videoId);
      setChannelId(data.snippet.channelId);
      setDate(data.snippet.publishedAt);
      video(data.id.videoId);
      channel(data.snippet.channelId);
    }
  }, [data]);

  //50글자 이상일때 잘라주는 함수
  const truncate = (str: string, n: number) => {
    return str?.length > n ? str.substring(0, n) + '...' : str;
  };

  return (
    <Link to={`/video/${videoId}`} style={{ textDecoration: 'none' }}>
      <div className={styles.lists}>
        <div
          className={styles.video}
          onMouseOver={() => setHover(true)}
          onMouseOut={() => setHover(false)}
        >
          {hover ? (
            <iframe
              className={styles.iframe}
              id={videoId}
              frameBorder="0"
              src={`http://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`}
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            ></iframe>
          ) : (
            <>
              <img
                src={data.snippet.thumbnails.high.url}
                alt="thumbnail image"
                className={styles.img}
              />
              <span className={styles.duration}>{durationTime}</span>
            </>
          )}
        </div>
        <div className={styles.content}>
          <div className={styles.title}>{truncate(data.snippet.title, 50)}</div>
          <div>
            조회수{viewCount} {today}
          </div>
          <div className={styles.channel}>{data.snippet.channelTitle}</div>
          <img src={channelData} alt="thumbnail image" className={styles.miniImg} />
        </div>
      </div>
    </Link>
  );
};

export default List;
