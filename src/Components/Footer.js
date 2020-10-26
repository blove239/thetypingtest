import React from 'react';
import '../css/footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <div className='page-footer'>
      <a href='https://github.com/blove239/thetypingtest'>
        <FontAwesomeIcon icon={faGithub} />
      </a>{' '}
      / Made by{' '}
      <a href="http://brandonlove.ca">Brandon Love.</a>
    </div>
  );
};

export default Footer;