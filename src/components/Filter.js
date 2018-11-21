import React from 'react';

export default ({
  completedFilter,
  resetFilter,
}) => (
  <div>
    <button
      onClick={resetFilter}
    >
      None
    </button>
    <button
      onClick={completedFilter}
    >
      Completed
    </button>
  </div>
)