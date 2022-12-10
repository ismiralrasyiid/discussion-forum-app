import React from 'react';
import { FaAngleDoubleUp } from 'react-icons/fa';

function ToTopPageNavigation() {
  return (
    <div className="toTopPageNavigation">
      <button
        title="Geser ke atas"
        type="button"
        onClick={() => window.scrollTo(0, 0)}
      >
        <FaAngleDoubleUp />
      </button>
    </div>
  );
}

export default ToTopPageNavigation;
