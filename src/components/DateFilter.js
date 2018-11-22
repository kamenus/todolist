import React from 'react';

export default ({
  minDateValue,
  maxDateValue,
  minDateHandler,
  maxDateHandler,
  dateCardsFilter,
}) => (
  <div className="dateFilter">
    From
    <input 
      placeholder="1"
      onChange={minDateHandler}
      value={minDateValue}
    />
    To
    <input 
      placeholder="100"
      onChange={maxDateHandler}
      value={maxDateValue}
    />
    <button
      disabled={!(minDateValue&&maxDateValue) || Number(minDateValue) > Number(maxDateValue)}
      onClick={dateCardsFilter}
    >
      Show
    </button>
  </div>
)