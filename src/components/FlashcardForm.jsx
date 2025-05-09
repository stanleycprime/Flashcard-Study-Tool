// src/components/FlashcardForm.jsx
import { useState } from 'react';
import './FlashcardForm.css';

const FlashcardForm = ({ addFlashcard }) => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simple validation
    if (question.trim() === '' || answer.trim() === '') {
      setError('Both question and answer are required!');
      return;
    }
    
    // Add the flashcard
    addFlashcard(question, answer);
    
    // Reset form
    setQuestion('');
    setAnswer('');
    setError('');
  };

  return (
    <form className="flashcard-form" onSubmit={handleSubmit}>
      {error && <div className="error-message">{error}</div>}
      
      <div className="form-group">
        <label htmlFor="question">Question:</label>
        <textarea
          id="question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Enter your question here..."
          rows="3"
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="answer">Answer:</label>
        <textarea
          id="answer"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Enter the answer here..."
          rows="3"
        />
      </div>
      
      <button type="submit" className="create-btn">Create Flashcard</button>
    </form>
  );
};

export default FlashcardForm;