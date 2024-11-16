import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import styles from './UserPage.module.css';

function ActionBar({ onSelectTab }) {
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
          Post
        </li>
        <li
          className={activeTab === 'About' ? styles.active : ''}
          onClick={() => handleTabClick('About')}
        >
          About
        </li>
      </ul>
    </div>
  );
}

export default ActionBar;
