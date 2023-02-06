import React, { useEffect, useState } from 'react';
import Videos from './videos';
import { search, videoInfo, channelInfo, relatedToVideo, commentThreads } from '../../api/axios';
import { searchResult } from './search';

type Props = {};

const videoContainer = (props: Props) => {
  const [searchData, setSearchData] = useState([]);
  const [columns, setColmuns] = useState(4);

  // 페이지 로드시 검색결과를 받아온다 , 자동 추천 없으므로 임의
  useEffect(() => {
    // 렌더링 시작
    console.time('rendering');
    const searchResult = async () => {
      let toggle = false;
      const response: any = await search(`리액트/popular`).catch((err) => {
        toggle = err ? true : false;
      });
      if (toggle) {
        //console.log('error');
        setSearchData([]);
      } else {
        //console.log('success');
        setSearchData(response.data.items);
        console.timeEnd('rendering');
      }
    };
    searchResult();
  }, []);

  function columnsVideo() {
    const videoArray = [];

    let temp: object[] = [];
    for (let i = 0; i < searchData.length; i++) {
      if (i !== 0 && i % columns === 0) {
        videoArray.push(temp);
        temp = [];
      }
      temp.push(searchData[i]);
    }
    while (temp.length < columns) {
      temp.push({ tag: 'empty' });
    }
    videoArray.push(temp);
    return videoArray;
  }

  function Gen() {
    const videoArray = columnsVideo();
    return videoArray.map((row, index) => {
      return <Videos key={index} rowArray={row} />;
    });
  }

  return <>{Gen()}</>;
};

export default videoContainer;
