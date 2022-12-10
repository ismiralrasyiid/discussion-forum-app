import React from 'react';
import { SyncLoader } from 'react-spinners';

function Loading() {
  return (
    <div className="loading">
      <SyncLoader />
    </div>
  );
}

export default Loading;
