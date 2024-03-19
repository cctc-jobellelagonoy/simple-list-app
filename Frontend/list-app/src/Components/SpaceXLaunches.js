import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import ListItem from './ListItem';
import Spinner from './Spinner';

const SpaceXLaunches = ({filter}) => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');

  const [hasMore, setHasMore] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    const response = await axios.get(`https://api.spacexdata.com/v4/launches?limit=5&page=${page}`);
    
    // Remove duplicates when setting the data state
    const newData = [...data, ...response.data];
    const uniqueData = Array.from(new Set(newData.map(launch => launch.id))).map(id => newData.find(launch => launch.id === id));
    
    setData(uniqueData);
    setPage(prevPage => prevPage + 1);
    setLoading(false);
  
    // If the new data is the same as the old data, there is no more data to fetch
    if (JSON.stringify(data) === JSON.stringify(uniqueData)) {
      setHasMore(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <input
        type="text"
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="Enter keywords"
        className='search-bar'
      />
      

        {
          data.length > 0 ?
          <InfiniteScroll
              className="scroll"
              dataLength={data.length}
              next={fetchData}
              hasMore={hasMore}
              endMessage={
                  <p style={{ textAlign: 'center' }}>
                      <b>No more data to fetch</b>
                  </p>
              }
          >
              {data.filter(launch => 
                  (launch.name.toLowerCase().includes(search.toLowerCase()) || 
                  (launch.details && launch.details.toLowerCase().includes(search.toLowerCase())))
                  ).map((launch, index) => (
                  <div key={index}>
                      <ListItem item={launch} />
                  </div>
              ))}
          </InfiniteScroll>
          :
          null
        }

        <div>
            {hasMore && loading && <Spinner/>}
        </div>

    </div>
  );
};

export default SpaceXLaunches;