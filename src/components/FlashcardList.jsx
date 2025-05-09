// src/components/FlashcardList.jsx
import Flashcard from './Flashcard';
import './FlashcardList.css';

const FlashcardList = ({ flashcards, flipCard, deleteFlashcard }) => {
  return (
    <div className="flashcard-list">
      {flashcards.map(card => (
        <Flashcard 
          key={card.id} 
          card={card} 
          flipCard={flipCard} 
          deleteFlashcard={deleteFlashcard}
        />
      ))}
    </div>
  );
};

export default FlashcardList;