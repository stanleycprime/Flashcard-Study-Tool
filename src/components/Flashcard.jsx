// src/components/Flashcard.jsx
import { useState } from 'react';
import { FiTrash2 } from 'react-icons/fi';
import './Flashcard.css';

const Flashcard = ({ card, flipCard, deleteFlashcard }) => {
  // Track if user is hovering over the card
  const [hovered, setHovered] = useState(false);
  
  return (
    <div 
      className={`flashcard ${card.isFlipped ? 'flipped' : ''}`}
      onClick={() => flipCard(card.id)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flashcard-inner">
        <div className="flashcard-front">
          <p>{card.question}</p>
          {hovered && (
            <button 
              className="delete-btn"
              onClick={(e) => {
                e.stopPropagation();
                deleteFlashcard(card.id);
              }}
            >
              <FiTrash2 />
            </button>
          )}
        </div>
        <div className="flashcard-back">
          <p>{card.answer}</p>
        </div>
      </div>
    </div>
  );
};

export default Flashcard;