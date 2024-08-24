import React from 'react'
import chatform from "../../../assets/Chatbotform/Container.png"
import styles from "./UpperText2.module.css"

function UpperText2() {
  return (
    <div>
      <div className={`${styles.heading} outfit`}>
        <div>Replace your old school forms</div>
        <div>with</div>
        <div>chatbots</div>
      </div>
      <div className={`${styles.subheading} open-sans`}>
        <div>Typebot is a better way to ask for information. It leads to an increase in customer satisfaction and retention and multiply by 3</div>
        <div>your conversion rate compared to classical forms.</div>
      </div>

      <div>
        <img src={chatform} alt="chatbotform" />
      </div>
    </div>
  )
}

export default UpperText2
