import React from 'react';
import './MainContent.css';

function MainContent({ mainContent }) {
  if (!mainContent) {
    return null;
  }

  return (
    <div className="main-content">
      {mainContent.map((item, index) => {
        switch (item.type) {
          case 'image':
            return <img key={index} src={item.src} alt={item.alt} />;
          case 'heading':
            const HeadingTag = `h${item.level}`;
            return <HeadingTag key={index}>{item.text}</HeadingTag>;
          case 'text':
            return <p key={index}>{item.content}</p>;
          default:
            return null;
        }
      })}
    </div>
  );
}

export default MainContent;
