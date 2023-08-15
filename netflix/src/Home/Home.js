import React, { useEffect, useState } from 'react';
import './home.scss';
import Navbar from '../components/Navbar/Navbar';
import Featured from '../components/featured/Featured';
import List from '../components/list/List';
import Loader from '../components/Loader/Loader';
import InfiniteScroll from 'react-infinite-scroll-component';
import { CSSTransition, TransitionGroup } from 'react-transition-group'

const Home = () => {
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [newData, setNewData] = useState([]);

  // Fetch genres on component mount
  useEffect(() => {
    fetchGenres();
  }, []);

  const fetchGenres = async () => {
    try {
      const response = await fetch(`http://localhost:3001/getmoviegenre`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const getData = await response.json();
      console.log(getData.message);
      if (getData.status === 200) {
        console.log(getData.data);
        setGenres(getData.data);

        const nextPage = 1;
        const getData2 = getData.data.slice((nextPage - 1) * pageSize, nextPage * pageSize);
        console.log(getData2);
        setNewData(getData2);


        setTimeout(() => setLoading(false), 3000);
      } else {
        console.error('Error while fetching genres:', getData.message);
        setLoading(false); // Set loading to false in case of error
      }
    } catch (error) {
      console.error('Error while making the API call:', error);
      setLoading(false); // Set loading to false in case of error
    }
  };

  const fetchMoreData = () => {

    console.log("me");
    const nextPage = currentPage + 1;
    const getData = genres.slice((nextPage - 1) * pageSize, nextPage * pageSize);
    console.log(getData);
    if (getData.length > 0) {
      // If there are more genres to fetch
      setNewData((prevData) => [...prevData, ...getData]); // Append the new data to the existing data
      setCurrentPage(nextPage); // Update the currentPage
    } else {
      // If there are no more genres to fetch, set hasMore to false to stop scrolling
      setHasMore(false);
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className='home'>
          <Navbar />
          <Featured type='movie' />
          <InfiniteScroll
            dataLength={newData.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={<p>Loading...</p>}
            endMessage={<p>No more Movies</p>}
            style={{ overflowX: 'hidden' }} // Hide horizontal scrollbar
          >
            <TransitionGroup className='container'>
              {newData?.length > 0 &&
                newData?.map((type, index) => (
                  <CSSTransition
                    key={index}
                    timeout={500}
                    classNames='ListItem'
                  >
                    <List key={index} genre={type.genre} movie={type.data} />
                  </CSSTransition>
                ))}
            </TransitionGroup>
          </InfiniteScroll>
        </div>
      )}
    </>
  );
};

export default Home;


