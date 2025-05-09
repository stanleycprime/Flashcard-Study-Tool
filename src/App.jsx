// src/App.jsx
import { useState, useEffect } from 'react';
import FlashcardList from './components/FlashcardList';
import FlashcardForm from './components/FlashcardForm';
import Navigation from './components/Navigation';
import './App.css';

function App() {
  // Load flashcards from localStorage or use defaults
  const [flashcards, setFlashcards] = useState(() => {
    const savedCards = localStorage.getItem('flashcards');
    if (savedCards) {
      return JSON.parse(savedCards);
    } else {
      return [
        {
          id: 1,
          question: 'What is React?',
          answer: 'A JavaScript library for building user interfaces',
          isFlipped: false,
        },
        {
          id: 2,
          question: 'What is JSX?',
          answer: 'A syntax extension for JavaScript that looks similar to HTML',
          isFlipped: false,
        },
      ];
    }
  });

  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [studyStats, setStudyStats] = useState({
    correct: 0,
    incorrect: 0,
  });

  // Save flashcards to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('flashcards', JSON.stringify(flashcards));
  }, [flashcards]);

  // Add a new flashcard
  const addFlashcard = (question, answer) => {
    const newCard = {
      id: Date.now(),
      question,
      answer,
      isFlipped: false,
    };
    
    setFlashcards([...flashcards, newCard]);
  };

  // Delete a flashcard
  const deleteFlashcard = (id) => {
    const updatedCards = flashcards.filter(card => card.id !== id);
    setFlashcards(updatedCards);
    
    // Reset index if needed
    if (currentCardIndex >= updatedCards.length) {
      setCurrentCardIndex(Math.max(0, updatedCards.length - 1));
    }
  };

  // Handle card flip
  const flipCard = (id) => {
    setFlashcards(flashcards.map(card => 
      card.id === id ? { ...card, isFlipped: !card.isFlipped } : card
    ));
  };

  // Navigation functions
  const goToPrevCard = () => {
    setCurrentCardIndex(prevIndex => 
      prevIndex > 0 ? prevIndex - 1 : flashcards.length - 1
    );
  };

  const goToNextCard = () => {
    setCurrentCardIndex(prevIndex => 
      prevIndex < flashcards.length - 1 ? prevIndex + 1 : 0
    );
  };

  // Mark card as correct/incorrect
  const markCard = (isCorrect) => {
    setStudyStats(prev => ({
      ...prev,
      [isCorrect ? 'correct' : 'incorrect']: prev[isCorrect ? 'correct' : 'incorrect'] + 1
    }));
    goToNextCard();
  };

  return (
    <div className="app-container">
      <header>
        <h1>Flashcard Study Tool</h1>
        <div className="stats">
          <span className="correct">Correct: {studyStats.correct}</span>
          <span className="incorrect">Incorrect: {studyStats.incorrect}</span>
        </div>
      </header>

      <main>
        {flashcards.length > 0 ? (
          <>
            <FlashcardList 
              flashcards={[flashcards[currentCardIndex]]} 
              flipCard={flipCard}
              deleteFlashcard={deleteFlashcard}
            />
            <Navigation 
              currentIndex={currentCardIndex} 
              totalCards={flashcards.length}
              goToPrev={goToPrevCard}
              goToNext={goToNextCard}
              markCorrect={() => markCard(true)}
              markIncorrect={() => markCard(false)}
            />
          </>
        ) : (
          <div className="no-cards">
            <p>You don't have any flashcards yet. Create some below!</p>
          </div>
        )}
      </main>

      <section className="form-section">
        <h2>Create New Flashcard</h2>
        <FlashcardForm addFlashcard={addFlashcard} />
      </section>
    </div>
  );
}

export default App;