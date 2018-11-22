import React from 'react';

export default ({
  completedFilter,
  resetFilter,
}) => (
  <div>
    <button
      onClick={resetFilter}
    >
      Reset
    </button>
    <button
      onClick={completedFilter}
    >
      Completed
    </button>
  </div>
)