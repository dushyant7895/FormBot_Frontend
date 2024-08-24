import React from 'react'
import styles from "./PageNotFound.module.css"
import { NavLink } from 'react-router-dom';

function PageNotFound() {
    return (
      <div className={styles.notfound}>
      <img 
        src="https://static.vecteezy.com/system/resources/thumbnails/008/568/878/small/website-page-not-found-error-404-oops-worried-robot-character-peeking-out-of-outer-space-site-crash-on-technical-work-web-design-template-with-chatbot-mascot-cartoon-online-bot-assistance-failure-vector.jpg" 
        alt="Page Not Found" 
        className={styles.image}
      />
      <NavLink to="/" className={styles.link}>Back to Home Page</NavLink>
    </div>
      );
}

export default PageNotFound
