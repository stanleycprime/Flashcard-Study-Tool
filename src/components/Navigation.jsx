// src/components/Navigation.jsx
import { FiChevronLeft, FiChevronRight, FiCheck, FiX } from 'react-icons/fi';
import './Navigation.css';

const Navigation = ({ 
  currentIndex, 
  totalCards, 
  goToPrev, 
  goToNext, 
  markCorrect, 
  markIncorrect 
}) => {
  return (
    <div className="navigation">
      <div className="nav-controls">
        <button className="nav-btn prev" onClick={goToPrev}>
          <FiChevronLeft />
          <span>Previous</span>
        </button>
        
        <div className="card-counter">
          Card {currentIndex + 1} of {totalCards}
        </div>
        
        <button className="nav-btn next" onClick={goToNext}>
          <span>Next</span>
          <FiChevronRight />
        </button>
      </div>
      
      <div className="scoring-controls">
        <button className="score-btn correct" onClick={markCorrect}>
          <FiCheck />
          <span>Got it right</span>
        </button>
        
        <button className="score-btn incorrect" onClick={markIncorrect}>
          <FiX />
          <span>Still learning</span>
        </button>
      </div>
    </div>
  );
};

export default Navigation;