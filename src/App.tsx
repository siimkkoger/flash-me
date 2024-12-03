import React from 'react';
import './App.css';
import Flashcard from './components/FlashCardProps';
import vocabularyDataUtility from './components/vocabularyDataUtility';

function App() {
  return (
    <div className="App">
      <Flashcard vocabularyList={vocabularyDataUtility} />
    </div>
  );
}

export default App;
