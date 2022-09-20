import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../../../context/UserContext';
import './Settings.scss';

const Settings = () => {
  const navigate = useNavigate();

  const { user, handleUser } = useContext(UserContext);

  const handleOpen = (e) => {
    console.log(e);
    e.target.nextElementSibling.classList.add('show_side_bar');
  };

  const handleClose = (e) => {
    e.target.parentElement.classList.remove('show_side_bar');
  };
  if (!user) return;

  return (
    <>
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
          fillRule="evenodd"
          d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
        />
      </svg>
      <div className="settings">
        <button className="x" onClick={handleClose}></button>
        <div className="select-container">
          <label htmlFor="custom-select">Change Your Language:</label>
          <select
            id="custom-select"
            className="custom-select"
            defaultValue={user.language}
            onChange={(e) => {
              fetch('/api/language', {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ language: e.target.value }),
              });
              handleUser({ ...user, language: e.target.value });
            }}
          >
            <option value="BG">Bulgarian</option>
            <option value="CS">Czech</option>
            <option value="DA">Danish</option>
            <option value="DE">German</option>
            <option value="EL">Greek</option>
            <option value="EN-GB">English (British)</option>
            <option value="EN-US">English (American)</option>
            <option value="ES">Spanish</option>
            <option value="ET">Estonian</option>
            <option value="FI">Finnish</option>
            <option value="FR">French</option>
            <option value="HU">Hungarian</option>
            <option value="ID">Indonesian</option>
            <option value="IT">Italian</option>
            <option value="JA">Japanese</option>
            <option value="LT">Lithuanian</option>
            <option value="LV">Latvian</option>
            <option value="NL">Dutch</option>
            <option value="PL">Polish</option>
            <option value="PT-BR">Portuguese (Brazilian)</option>
            <option value="PT-PT">Portuguese (Other)</option>
            <option value="RO">Romanian</option>
            <option value="RU">Russian</option>
            <option value="SK">Slovak</option>
            <option value="SL">Slovenian</option>
            <option value="SV">Swedish</option>
            <option value="TR">Turkish</option>
            <option value="UK">Ukranian</option>
            <option value="ZH">Chinese</option>
          </select>
        </div>
        <button
          className="sign-out"
          onClick={() => {
            fetch('/api/login', { method: 'DELETE' }).then(() => navigate('/'));
          }}
        >
          Sign Out
        </button>
      </div>
    </>
  );
};

export default Settings;
