import './footer.css';

import locationIcon from "../location.svg"
import numberIcon from "../number.svg"
import emailIcon from "../email.svg"
import websiteIcon from "../website.svg"

function Footer() {    
  return ( 
    <div className="footer"
          id="footer"
          >
        {/* <div className="contact-box">
          <div className="profile__picture__container">
            <img className="profile__picture" src={profilePicture} alt="profile picture"/> 
          </div>
          <h2 className="profile__name">Marie Ferre - fysioterapist</h2>
        </div> */}
        <div className="contact-box">
          <a className="contact location" rel="noreferrer" target="_blank" href="http://maps.google.com/?q=Hantverksvägen 12, 663 34 Skoghall">Hantverksvägen 12, Skoghall</a>
          <a className="contact location" rel="noreferrer" target="_blank" href="http://maps.google.com/?q=Hantverksvägen 12, 663 34 Skoghall"><img className="contact-icon" src={locationIcon} alt="" />  </a>
        </div>
        <div className="contact-box">
                    
          <a className="contact number" href="tel:070-3466887"><img className="contact-icon" src={numberIcon} alt="" /> </a>    
          <a className="contact number" href="tel:070-3466887">070-3466887</a>    
        </div>
        <div className="contact-box">
          <a className="contact email" href = "mailto: worldmassage@lapost.net">worldmassage@lapost.net</a> 
          <a className="contact email" href = "mailto: worldmassage@lapost.net"><img className="contact-icon" src={emailIcon} alt="" /></a> 
                  
        </div>
        <div className="contact-box">
          <a className="contact website" href="worldmassage.se"><img className="contact-icon" src={websiteIcon} alt="" /></a>    
          <a className="contact website" href="worldmassage.se">Worldmassage.se</a>    
        </div>

    </div>
  )
}
   
  export default Footer;