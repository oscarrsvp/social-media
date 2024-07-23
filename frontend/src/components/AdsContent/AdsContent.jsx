import { BsThreeDotsVertical } from 'react-icons/bs';
import styles from './AdsContent.module.css';

function AdsContent() {
  return (
    <section className={styles.AdsSection}>
      <div className={styles.header}>
        <h3>Sponsored Ads</h3>
        <BsThreeDotsVertical cursor={'pointer'} size={20} />
      </div>

      <div className={styles.ads}>
        <div className={styles.ad}>
          <img
            src="https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=4026&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />

          <div className={styles.content}>
            <h4>Clothing Store</h4>
            <p>
              Step into style and comfort with our latest collection. Looking for a
              classic, timeless look or something more modern and edgy, we have the
              perfect pair for you.
            </p>
          </div>
          <button className="btn">Learn More</button>
        </div>
      </div>
    </section>
  );
}

export default AdsContent;
