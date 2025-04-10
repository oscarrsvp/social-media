import { useEffect, useState } from 'react';
import { MdOutlineFeed } from 'react-icons/md';
import { IoPersonOutline, IoImageOutline } from 'react-icons/io5';
import { LuRectangleVertical, LuLayoutGrid } from 'react-icons/lu';
import styles from './UserPage.module.css';

function ActionBar({ onSelectTab, isMobile, SetViewDisplay }) {
  const [activeTab, setActiveTab] = useState('Post');
  const [view, setView] = useState('Standard');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    onSelectTab(tab);
  };

  const handleDisplayGrid = (grid) => {
    SetViewDisplay(grid);
    setView(grid);
  };

  useEffect(() => {
    return setActiveTab('Post');
  }, []);

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

      {!isMobile && activeTab !== 'Photos' && (
        <div className={styles.gridStyle}>
          <span
            onClick={() => handleDisplayGrid('Standard')}
            className={view === 'Standard' ? styles.styleAction : null}
          >
            <LuRectangleVertical size={30} />
          </span>
          <span
            onClick={() => handleDisplayGrid('Grid')}
            className={view === 'Grid' ? styles.styleAction : null}
          >
            <LuLayoutGrid size={30} />
          </span>
        </div>
      )}
    </div>
  );
}

export default ActionBar;
