import React, { useState } from 'react';
import { VocabularyItem } from './vocabularyDataUtility';

interface FlashcardProps {
	vocabularyList: VocabularyItem[];
}

const Flashcard: React.FC<FlashcardProps> = ({ vocabularyList }) => {
	const [currentCardIndex, setCurrentCardIndex] = useState(0);
	const [revealStage, setRevealStage] = useState(0);

	const currentCard = vocabularyList[currentCardIndex];

	const handleNextCard = () => {
		setCurrentCardIndex((prevIndex) =>
			(prevIndex + 1) % vocabularyList.length
		);
		setRevealStage(0);
	};

	const handlePrevCard = () => {
		setCurrentCardIndex((prevIndex) =>
			prevIndex === 0 ? vocabularyList.length - 1 : prevIndex - 1
		);
		setRevealStage(0);
	};

	const handleReveal = () => {
		setRevealStage((prev) => Math.min(prev + 1, 3));
	};

	const renderContent = () => {
		return (
			<div className="flashcard-content">
				<h2 className="kanji">{currentCard.kanji}</h2>

				{revealStage >= 1 && (
					<div className="kana">
						Kana: {currentCard.kana}
					</div>
				)}

				{revealStage >= 2 && (
					<div className="examples">
						Examples:
						<ul>
							{currentCard.examples.map((example, index) => (
								<li key={index}>{example}</li>
							))}
						</ul>
					</div>
				)}

				{revealStage >= 3 && (
					<div className="translation">
						Translation: {currentCard.translation}
					</div>
				)}
			</div>
		);
	};

	return (
		<div className="flashcard-container">
			<div className="flashcard">
				{renderContent()}

				<div className="flashcard-controls">
					<button onClick={handlePrevCard}>Previous</button>

					{revealStage < 3 ? (
						<button onClick={handleReveal}>Reveal Next</button>
					) : (
						<button onClick={handleNextCard}>Next Card</button>
					)}

					<button onClick={handleNextCard}>Next</button>
				</div>
			</div>
		</div>
	);
};

export default Flashcard;