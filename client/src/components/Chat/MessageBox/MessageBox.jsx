import React, { useContext, useEffect } from 'react';
import { useFetch } from '../../../hooks/useFetch';
import UserContext from '../../../context/UserContext';

const MessageBox = () => {
  return (
    <div className="messageBox">
      <h2>Message Box</h2>
    </div>
  );
};

export default MessageBox;
