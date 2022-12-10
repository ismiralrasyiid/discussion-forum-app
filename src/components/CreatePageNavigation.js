import React from 'react';
import { FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function CreatePageNavigation() {
  return (
    <Link to="/create" className="createPageNavigation">
      <button type="button">
        <FaPlus />
        <span>Buat Diskusi</span>
      </button>
    </Link>
  );
}

export default CreatePageNavigation;
