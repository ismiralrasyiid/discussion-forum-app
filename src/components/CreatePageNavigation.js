import React from 'react';
import { FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { BottomNavButton } from './styled/buttons';

function CreatePageNavigation() {
  return (
    <Link to="/create" className="createPageNavigation">
      <BottomNavButton type="button">
        <FaPlus />
        <span>Buat Diskusi</span>
      </BottomNavButton>
    </Link>
  );
}

export default CreatePageNavigation;
