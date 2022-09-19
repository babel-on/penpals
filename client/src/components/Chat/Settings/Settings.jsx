import React from 'react';
import './Settings.scss';

const Settings = () => {
  const handleOpen = (e) => {
    console.log(e);
    e.target.nextElementSibling.classList.add('show_side_bar');
  };

  const handleClose = (e) => {
    e.target.parentElement.classList.remove('show_side_bar');
  };
  return (
    <div className="settings">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        fill="currentColor"
        className="bi bi-list list"
        viewBox="0 0 16 16"
        onClick={handleOpen}
      >
        <path
          onClick={handleOpen}
          fill-rule="evenodd"
          d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
        />
      </svg>
      <div className="settings-content">
        <h3>Hello World</h3>
      </div>
    </div>
  );
};

export default Settings;
