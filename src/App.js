import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import Photo from './Photo';

const clientID = `?client_id=${process.env.REACT_APP_ACCESS_KEY}`;
const mainUrl = `https://api.unsplash.com/photos/`;
const searchUrl = `https://api.unsplash.com/search/photos/`;

export default function App() {
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);

  const fetchPhotos = async () => {
    setLoading(true);

    let url;
    const urlQuery = `&query=${searchTerm}`;
    const urlPage = `&page=${page}`; // page number to retrive (which page to retrive?)

    if (searchTerm) {
      url = `${searchUrl}${clientID}${urlQuery}${urlPage}`;
    } else {
      url = `${mainUrl}${clientID}${urlPage}`;
    }

    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      // different data type will be returned depending on api url, so set conditions to accomodate it.
      setPhotos((oldPhotos) => {
        if (searchTerm && page === 1) {
          return data.results; // set photos to the first page, not including the default page
        } else if (searchTerm) {
          return [...oldPhotos, ...data.results];
        } else if (page === 1) {
          return data;
        } else {
          return [...oldPhotos, ...data]; // keep adding on the photos from previous pages
        }
      });

      setLoading(false);
    } catch (error) {
      console.log('unable to fetch the photos');
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (page === 1) {
      fetchPhotos();
    } else {
      setPage(1);
    }
  };

  useEffect(() => {
    fetchPhotos();
    // eslint-disable-next-line
  }, [page]);

  useEffect(() => {
    const event = window.addEventListener('scroll', () => {
      // put "!loading" to the condition, for stopping to invoke setPage while loading. After it's loaded document.body.scrollHeight would be much higher by adding another page long, so the condition would be false to invoke setPage!
      if (
        (!loading && window.innerHeight + window.scrollY) >
        document.body.scrollHeight - 2
      ) {
        setPage((oldPage) => {
          return oldPage + 1;
        });
        console.log('end of page');
      }
    });
    return () => window.removeEventListener('scroll', event);
    // eslint-disable-next-line
  }, []);

  return (
    <main>
      <section className='banner'>
        <section className='section-title'>
          <p>exploring photos</p>
          <div className='underline'></div>
        </section>
        <section className='search'>
          <form className='search-form' onSubmit={handleSubmit}>
            <input
              type='text'
              className='form-input'
              placeholder='keyword to explore photos'
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className='submit-btn'>
              <FaSearch className='search-icon' />
            </button>
          </form>
        </section>
      </section>

      <section className='photos'>
        <div className='photos-center'>
          {photos.map((photo, index) => {
            return <Photo key={index} {...photo} />;
          })}
        </div>
        {loading && <h2 className='loading'>loading...</h2>}
      </section>
    </main>
  );
}
