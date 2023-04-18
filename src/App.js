import React, { useState, useEffect } from 'react';
import './App.css';

function App() {

  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetch(`https://api.instantwebtools.net/v1/passenger?page=${page}&size=5`)
      .then(res => res.json())
      .then(json => {
        setData([...data, ...json.data])
      })
  }, [page])

  const scrollToEnd = () => {
    setPage(page + 1);
  }

  window.onscroll = function() {
    //check if page has scrolled to the bottom
    //innerHeight is viewport
    //scrollY is how much scrolled in the y direction
    //document height which includes scrollable area too
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      scrollToEnd();
    }
  }


  return (
    <div className="App">
      {
        data.length > 0 && data.map((ele, index) => {
          return <div key={index} className='container'>
            <h4>Name: {ele.name}</h4>
            <h4>Trips: {ele.trips}</h4>
          </div>
        })
      }
    </div>
  );
}

export default App;
