import React from 'react';
import SideBar from '../side-bar';
import WideSideBar from '../wide-side-bar';
import styles from '../main-page/MainPage.module.scss';
import { sideBarstate } from '../../Atom';
import { useRecoilState } from 'recoil';
import { useState, useEffect } from 'react';
import List from './List';
import { search, videoInfo, channelInfo, relatedToVideo, commentThreads } from '../../api/axios';

import { useParams } from 'react-router-dom';

type Props = {};

const index = (props: Props) => {
  const [searchData, setSearchData] = useState([]);
  const [sideBar, setSideBar] = useRecoilState(sideBarstate);

  const params = useParams<{ searchQuery: string }>();

  useEffect(() => {
    // 렌더링 시작
    console.time('rendering');
    const searchResult = async () => {
      let toggle = false;
      const response: any = await search(`${params.searchQuery}`).catch((err) => {
        toggle = err ? true : false;
      });
      if (toggle) {
        setSearchData([]);
      } else {
        setSearchData(response.data.items);
        console.timeEnd('rendering');
      }
    };
    searchResult();
  }, [params.searchQuery]);

  return (
    <div className={styles.frame}>
      {sideBar ? <WideSideBar /> : <SideBar />}
      <div>
        {Array.isArray(searchData) ? (
          searchData.map((data, index) => {
            return <List key={index} data={data} />;
          })
        ) : (
          <div>찾으시는 컨텐츠가 없습니다.</div>
        )}
      </div>
    </div>
  );
};

export default index;
