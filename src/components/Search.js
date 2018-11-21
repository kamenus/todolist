import React from 'react';

export default ({
  searchValue,
  searchHandler,
  cardSeeker,
}) => (
  <div className="searchPanel">
    <input 
      onChange={searchHandler}
      value={searchValue}
    />
    <button
      placeholder="Text to search..."
      onClick={cardSeeker}
      disabled={ !( searchValue === '' || searchValue.replace(/ /g,'') ) }
    >
      Search
    </button>
  </div>
)