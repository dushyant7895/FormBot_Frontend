import React from 'react';
import styles from "../Hero/uper.module.css";
import orange from "./images/orangetraingle.png";
import blue from "./images/magnate.png";
import herochart from "./images/linkingData.png";
import { useNavigate } from 'react-router-dom';
import Explore from '../Explore/Explore';
import Footer from "../Footer/Footer";
import CollectResult from '../collectResultRealTime/CollectResultRealTime';
import Features from '../FeaturesIcon/FeaturesIcon';
import Engagement from '../ImproveEngagment/ImproveEngagement ';
import IntegrationIcons from '../IntegrationPlateForm/IntegrationPlateForm';
import ChatbotForm from '../SecondUpperText/UpperText2';
import Companylist from '../CompnayNameShow/CompanylistShowComponent';


function AllHomePageComponent() {
  const navigate = useNavigate();
  return (
    <div className={styles.heroContainer}>
      <div className={styles.heroTitle}>
        <img src={orange} alt="Orange Triangle" className={styles.heroImage} />
        <div className={styles.heroDesc}>
          <div className={`${styles.heroHeading} outfit`}>Build advanced chatbots visually</div>
          <div className={`${styles.heroSubheading} open-sans`}>
            Typebot gives you powerful blocks to create unique chat experiences. Embed them
            anywhere on your web/mobile apps and start collecting results like magic.
          </div>
          <button onClick={() => navigate("/signin")} className={`${styles.heroSignup} open-sans`}>
            Create a FormBot for free
          </button>
        </div>
        <img src={blue} alt="Blue" className={styles.heroImage} />
      </div>

      <div className={styles.heroChart}>
        <img src={herochart} alt="Hero Chart" />
      </div>
      <div className={styles.allfiles}>
      <ChatbotForm/>
      <Explore />
      <IntegrationIcons/>
      <CollectResult />
      <Features/>
      <Companylist/>
      <Engagement/>
      <Footer />
      </div>
    </div>
  );
}

export default AllHomePageComponent;
