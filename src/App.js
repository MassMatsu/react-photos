import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';

export default function App() {
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState([]);

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
            {
              <article className='photo'>
                <div className='photo-info'></div>
              </article>
            }
          </section>
        </section>
      </section>
    </main>
  );
}
