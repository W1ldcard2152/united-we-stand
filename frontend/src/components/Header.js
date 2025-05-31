import React from 'react';
import './Header.css'; // Assuming you'll create a CSS file for styling

function Header({ headerContent }) {
  if (!headerContent) {
    return null; // Or a loading spinner
  }

  const { title, navigation, social_media, donate_button } = headerContent;

  return (
    <header className="app-header">
      <div className="header-left">
        <h1 className="site-title">{title}</h1>
      </div>
      <nav className="header-nav">
        <ul>
          {navigation.map((item, index) => (
            <li key={index}>
              <a href={item.path}>{item.name}</a>
            </li>
          ))}
        </ul>
      </nav>
      <div className="header-right">
        <div className="social-media-icons">
          {social_media.map((item, index) => {
            if (item.type === 'button') {
              return (
                <a key={index} href={item.url} className="bulletin-button" aria-label={item.platform}>
                  <i className="fas fa-bullhorn"></i>
                  <span>Bulletin</span>
                </a>
              );
            }
            return (
              <a key={index} href={item.url} target="_blank" rel="noopener noreferrer" aria-label={item.platform}>
                <i className={item.icon === 'envelope' ? 'fas fa-envelope' : `fab fa-${item.icon}`}></i>
              </a>
            );
          })}
        </div>
        <a href={donate_button.url} className="donate-button">
          {donate_button.text}
        </a>
      </div>
    </header>
  );
}

export default Header;
