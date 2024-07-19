import React from "react";
import './Footer.css';
import footer_logo from '../Footer/logo_big.png'
import instagram_icon from '../Footer/instagram_icon.png';
import pintester_icon from '../Footer/pintester_icon.png';
import whatsapp_icon from '../Footer/whatsapp_icon.png';

const Footer=()=>{
    return(
        <div className="footer">
            <hr />
            <div className="footer-logo">
                <img src={footer_logo} alt=" Footer logo" />
                <p>Book Nest</p>
            </div>
            <ul className="footer-links">
                <li>Company</li>
                <li>Products</li>
                <li>Office</li>
                <li>Contact</li>
            </ul>
            <div className="footer-social-icon">
                <div className="footer-icons-container">
                    <div className="instagram">
                    <img src={instagram_icon} alt="" />
                    </div>
                    <div className="pintester">
                    <img src={pintester_icon} alt="" />
                    </div>
                    <div className="whatsapp">
                    <img src={whatsapp_icon} alt="" />
                    </div>
                    </div>
                
            </div>
            <div className="footer-copyright">
                
                <p>Copright @ 2024-All Rights Reserved</p>
            </div>
        </div>
    );
}

export default Footer;