import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import Photo from './Photo';

const clientID = `?client_id=${process.env.REACT_APP_ACCESS_KEY}`;
const mainUrl = `https://api.unsplash.com/photos/`;

export default function App() {
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState([]);

  const fetchPhotos = async () => {
    const response = await fetch(`${mainUrl}${clientID}`);
    const data = await response.json();

    console.log(data);
    setPhotos(data);
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
        <form className='search-form'>
          <input type='text' className='form-input' placeholder='search' />
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
