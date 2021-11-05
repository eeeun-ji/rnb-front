import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Post from './Post';
import Pagination from './Pagination';

const StockNameList = () => {
  const [currentPage, setCurrentPage] = useState(1); //현재 페이지
  const [postPerPage] = useState(15); //페이지당 포스트 개수
  const searchList = useSelector(_ => _.stock.searchList);
  const [currentPosts, setCurrentPosts] = useState(searchList);

  useEffect(() => {
    //검색 목록이 갱신되었을경우, 페이지 초기화
    setCurrentPage(1);
  }, [searchList]);

  useEffect(() => {
    //현재페이지 가져오기
    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage;
    const currentPosts_ = searchList.slice(indexOfFirstPost, indexOfLastPost);
    setCurrentPosts(currentPosts_);
  }, [searchList, currentPage, postPerPage]);

  return (
    <div>
      <Post posts={currentPosts} />
      <Pagination
        postPerPage={postPerPage}
        totalPosts={searchList.length}
        paginate={setCurrentPage}
      />
    </div>
  );
};

export default StockNameList;
