import { useState } from 'react';
import { MdOutlineFeed } from 'react-icons/md';
import { IoPersonOutline, IoImageOutline } from 'react-icons/io5';
import styles from './UserPage.module.css';

function ActionBar({ onSelectTab, isMobile }) {
  const [activeTab, setActiveTab] = useState('Post');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    onSelectTab(tab);
  };

  return (
    <div className={styles.actionTabs}>
      <ul>
        <li
          className={activeTab === 'Post' ? styles.active : ''}
          onClick={() => handleTabClick('Post')}
        >
          <MdOutlineFeed />
          Post
        </li>

        {isMobile && (
          <li
            className={activeTab === 'About' ? styles.active : ''}
            onClick={() => handleTabClick('About')}
          >
            <IoPersonOutline />
            About
          </li>
        )}
        <li
          className={activeTab === 'Photos' ? styles.active : ''}
          onClick={() => handleTabClick('Photos')}
        >
          <IoImageOutline />
          Photos
        </li>
      </ul>
    </div>
  );
}

export default ActionBar;
