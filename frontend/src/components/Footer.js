import React from 'react';
import './Footer.css'; // Assuming you'll create a CSS file for styling

function Footer({ footerContent }) {
  if (!footerContent) {
    return null;
  }

  const { title, tagline, contact_info, office_hours } = footerContent;

  return (
    <footer className="app-footer">
      <div className="footer-content">
        <h3 className="footer-title">{title}</h3>
        <p className="footer-tagline">{tagline}</p>
        <div className="contact-info">
          <p>Website: <a href={`http://${contact_info.website}`} target="_blank" rel="noopener noreferrer">{contact_info.website}</a></p>
          <p>Phone: {contact_info.phone}</p>
          <p>Email: <a href={`mailto:${contact_info.email}`}>{contact_info.email}</a></p>
          <p>Address: {contact_info.address}</p>
        </div>
        <p className="office-hours">{office_hours}</p>
      </div>
    </footer>
  );
}

export default Footer;
