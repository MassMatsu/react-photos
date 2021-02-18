import React from 'react';

export default function Photo({
  urls: { regular: photo },
  alt_description: desc,
  likes,
  user: {
    name,
    profile_image: { medium: userImage },
    portfolio_url,
  },
}) {
  return (
    <article className='photo'>
      <img src={photo} alt={desc} />
      <div className='photo-info'>
        <div>
          <h4>{name}</h4>
          <p>{likes} like</p>
        </div>
        <a href={portfolio_url}>
          <img src={userImage} alt={name} />
        </a>
      </div>
    </article>
  );
}
