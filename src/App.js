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

  const fetchPhotos = async () => {
    let url;
    const urlQuery = `&query=${searchTerm}`;
    if (searchTerm) {
      url = `${searchUrl}${clientID}${urlQuery}`;
    } else {
      url = `${mainUrl}${clientID}`;
    }

    setLoading(true);
    const response = await fetch(url);
    const data = await response.json();

    if (searchTerm) {
      setPhotos(data.results);
    } else {
      setPhotos(data);
    }
    console.log(data);

    setLoading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchPhotos();
    console.log(searchTerm);
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  return (
    <main>
      <section className='section-title'>
        <p>exploring photos</p>
        <div className='underline'></div>
      </section>
      <section className='search'>
        <form className='search-form' onSubmit={handleSubmit}>
          <input
            type='text'
            className='form-input'
            placeholder='search'
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className='submit-btn'>
            <FaSearch />
          </button>
        </form>
        <section className='photos'>
          <section className='photos-center'>
            {photos.map((photo, index) => {
              return <Photo key={index} {...photo} />;
            })}
          </section>
        </section>
      </section>
    </main>
  );
}
