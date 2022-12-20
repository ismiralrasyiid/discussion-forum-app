import React from 'react';
import { FaAngleDoubleUp } from 'react-icons/fa';
import { ToTopButton } from './styled/buttons';

function ToTopPageNavigation() {
  return (
    <div className="toTopPageNavigation">
      <ToTopButton
        title="Geser ke atas"
        type="button"
        onClick={() => window.scrollTo(0, 0)}
      >
        <FaAngleDoubleUp />
      </ToTopButton>
    </div>
  );
}

export default ToTopPageNavigation;
