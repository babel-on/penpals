import React, { useContext, useEffect, useState } from 'react';
import './RandomUser.scss';
import UserContext from '../../../../context/UserContext';

const RandomUser = ({ user }) => {
  const { handleCurrentConversation, handleRandomList } =
    useContext(UserContext);

  let flagImgSrc = '';

<<<<<<< HEAD
  switch (user.language){
  case 'BG':
    flagImgSrc = 'https://cdn-icons-png.flaticon.com/512/197/197502.png';
    break;
  case 'CS':
    flagImgSrc = 'https://cdn-icons-png.flaticon.com/512/197/197576.png';
    break;
  case 'DA':
    flagImgSrc = 'https://cdn-icons-png.flaticon.com/512/197/197565.png';
    break;
  case 'DE':
    flagImgSrc = 'https://cdn-icons-png.flaticon.com/512/197/197571.png';
    break;
  case 'EL':
    flagImgSrc = 'https://cdn-icons-png.flaticon.com/512/197/197566.png';
    break;
  case 'EN-US':
    flagImgSrc = 'https://cdn-icons-png.flaticon.com/512/197/197484.png';
    break;
  case 'EN-GB':
    flagImgSrc = 'https://cdn-icons-png.flaticon.com/512/197/197374.png';
    break;
  case 'ES':
    flagImgSrc = 'https://cdn-icons-png.flaticon.com/512/197/197397.png';
    break;
  case 'ET':
    flagImgSrc = 'https://cdn-icons-png.flaticon.com/512/197/197379.png';
    break;
  case 'FI':
    flagImgSrc = 'https://cdn-icons-png.flaticon.com/512/197/197585.png';
    break;
  case 'FR':
    flagImgSrc = 'https://cdn-icons-png.flaticon.com/512/197/197560.png';
    break;
  case 'HU':
    flagImgSrc = 'https://cdn-icons-png.flaticon.com/512/197/197584.png';
    break;
  case 'ID':
    flagImgSrc = 'https://cdn-icons-png.flaticon.com/512/6157/6157721.png';
    break;
  case 'IT':
    flagImgSrc = 'https://cdn-icons-png.flaticon.com/512/197/197626.png';
    break;
  case 'JA':
    flagImgSrc = 'https://cdn-icons-png.flaticon.com/512/197/197604.png';
    break;
  case 'LT':
    flagImgSrc = 'https://cdn-icons-png.flaticon.com/512/197/197612.png';
    break;
  case 'LV':
    flagImgSrc = 'https://cdn-icons-png.flaticon.com/512/197/197605.png';
    break;
  case 'NL':
    flagImgSrc = 'https://cdn-icons-png.flaticon.com/512/197/197441.png';
    break;
  case 'PL':
    flagImgSrc = 'https://cdn-icons-png.flaticon.com/512/4628/4628690.png';
    break;
  case 'PT':
    flagImgSrc = 'https://cdn-icons-png.flaticon.com/512/197/197463.png';
    break;
  case 'RO':
    flagImgSrc = 'https://cdn-icons-png.flaticon.com/512/197/197587.png';
    break;
  case 'RU':
    flagImgSrc = 'https://cdn-icons-png.flaticon.com/512/197/197408.png';
    break;
  case 'SK':
    flagImgSrc = 'https://cdn-icons-png.flaticon.com/512/197/197592.png';
    break;
  case 'SL':
    flagImgSrc = 'https://cdn-icons-png.flaticon.com/512/197/197633.png';
    break;
  case 'SV':
    flagImgSrc = 'https://cdn-icons-png.flaticon.com/512/197/197564.png';
    break;
  case 'TR':
    flagImgSrc = 'https://cdn-icons-png.flaticon.com/512/197/197518.png';
    break;
  case 'UK':
    flagImgSrc = 'https://cdn-icons-png.flaticon.com/512/197/197572.png';
    break;
  case 'ZH':
    flagImgSrc = 'https://cdn-icons-png.flaticon.com/512/197/197375.png';
    break;
  default: 
    flagImgSrc = 'https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png';
    break;
=======
  switch (user.language) {
    case 'BG':
      flagImgSrc = 'https://cdn-icons-png.flaticon.com/512/197/197502.png';
      break;
    case 'CS':
      flagImgSrc = 'https://cdn-icons-png.flaticon.com/512/197/197576.png';
      break;
    case 'DA':
      flagImgSrc = 'https://cdn-icons-png.flaticon.com/512/197/197565.png';
      break;
    case 'DE':
      flagImgSrc = 'https://cdn-icons-png.flaticon.com/512/197/197571.png';
      break;
    case 'EL':
      flagImgSrc = 'https://cdn-icons-png.flaticon.com/512/197/197566.png';
      break;
    case 'EN-US':
      flagImgSrc = 'https://cdn-icons-png.flaticon.com/512/197/197484.png';
      break;
    case 'ES':
      flagImgSrc = 'https://cdn-icons-png.flaticon.com/512/197/197397.png';
      break;
    case 'ET':
      flagImgSrc = 'https://cdn-icons-png.flaticon.com/512/197/197379.png';
      break;
    case 'FI':
      flagImgSrc = 'https://cdn-icons-png.flaticon.com/512/197/197585.png';
      break;
    case 'FR':
      flagImgSrc = 'https://cdn-icons-png.flaticon.com/512/197/197560.png';
      break;
    case 'HU':
      flagImgSrc = 'https://cdn-icons-png.flaticon.com/512/197/197584.png';
      break;
    case 'ID':
      flagImgSrc = 'https://cdn-icons-png.flaticon.com/512/6157/6157721.png';
      break;
    case 'IT':
      flagImgSrc = 'https://cdn-icons-png.flaticon.com/512/197/197626.png';
      break;
    case 'JA':
      flagImgSrc = 'https://cdn-icons-png.flaticon.com/512/197/197604.png';
      break;
    case 'LT':
      flagImgSrc = 'https://cdn-icons-png.flaticon.com/512/197/197612.png';
      break;
    case 'LV':
      flagImgSrc = 'https://cdn-icons-png.flaticon.com/512/197/197605.png';
      break;
    case 'NL':
      flagImgSrc = 'https://cdn-icons-png.flaticon.com/512/197/197441.png';
      break;
    case 'PL':
      flagImgSrc = 'https://cdn-icons-png.flaticon.com/512/4628/4628690.png';
      break;
    case 'PT':
      flagImgSrc = 'https://cdn-icons-png.flaticon.com/512/197/197463.png';
      break;
    case 'RO':
      flagImgSrc = 'https://cdn-icons-png.flaticon.com/512/197/197587.png';
      break;
    case 'RU':
      flagImgSrc = 'https://cdn-icons-png.flaticon.com/512/197/197408.png';
      break;
    case 'SK':
      flagImgSrc = 'https://cdn-icons-png.flaticon.com/512/197/197592.png';
      break;
    case 'SL':
      flagImgSrc = 'https://cdn-icons-png.flaticon.com/512/197/197633.png';
      break;
    case 'SV':
      flagImgSrc = 'https://cdn-icons-png.flaticon.com/512/197/197564.png';
      break;
    case 'TR':
      flagImgSrc = 'https://cdn-icons-png.flaticon.com/512/197/197518.png';
      break;
    case 'UK':
      flagImgSrc = 'https://cdn-icons-png.flaticon.com/512/197/197572.png';
      break;
    case 'ZH':
      flagImgSrc = 'https://cdn-icons-png.flaticon.com/512/197/197375.png';
      break;
    default:
      flagImgSrc =
        'https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png';
      break;
>>>>>>> jigar
  }
  //getting rid of janky 'EN-US' tag on random user because it messed with space-between
  let displayLang = '';
  if (user.language === 'EN-US'){
    displayLang = 'EN';
  } else {
    displayLang = user.language;
  }

  return (
    <div
      className="randomUser"
      onClick={() => {
        fetch('/api/conversation/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ invitee: user.userId }),
        })
          .then((res) => res.json())
          .then((data) => {
            handleRandomList((prevState) => {
              return prevState.filter(
                (ele) => data.partnerUsername !== ele.user.userId
              );
            });
            handleCurrentConversation([data.id, data.partnerUsername]);
          });
      }}
    >
      <img src={flagImgSrc} height="50px"></img>
      <p className="randomUserName">{user.username}</p>
      <p className="randomUserLang">{displayLang}</p>
    </div>
  );
};

export default RandomUser;
