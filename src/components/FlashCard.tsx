import React, { useState } from 'react';
import './FlashCard.css';
import { LanguageLearningItem, Translation } from './vocabularyDataUtility';

interface FlashcardProps {
	languageItems: LanguageLearningItem[];
	preferredTranslationLanguage?: string;
}

const Flashcard: React.FC<FlashcardProps> = ({
												 languageItems,
												 preferredTranslationLanguage = 'ENG'
											 }) => {
	const [currentCardIndex, setCurrentCardIndex] = useState(0);
	const [revealStage, setRevealStage] = useState(0);

	if (languageItems.length === 0) {
		return <div>No items found for this language.</div>;
	}

	const currentCard = languageItems[currentCardIndex];

	const getPreferredTranslation = (translations: Translation[]) => {
		return translations.find(t => t.targetLanguage === preferredTranslationLanguage) || translations[0];
	};

	const handleNextCard = () => {
		setCurrentCardIndex((prevIndex) =>
			(prevIndex + 1) % languageItems.length
		);
		setRevealStage(0);
	};

	const handlePrevCard = () => {
		setCurrentCardIndex((prevIndex) =>
			prevIndex === 0 ? languageItems.length - 1 : prevIndex - 1
		);
		setRevealStage(0);
	};

	const handleReveal = () => {
		setRevealStage((prev) => Math.min(prev + 1, 3));
	};

	const renderContent = () => {
		const mainTranslation = getPreferredTranslation(currentCard.translations);

		return (
			<div className="flashcard-content">
				{/* Main word section */}
				<div className="main-word">
					<h2>{currentCard.value}</h2>
				</div>

				{/* Translation section */}
				{revealStage >= 1 && (
					<div className="translations-section">
						<div className="main-translation">
							<span className="translation-text">{mainTranslation.targetValue}</span>
						</div>
					</div>
				)}

				{/* Examples section */}
				{revealStage >= 2 && (
					<div className="examples-section">
						<h3>Examples:</h3>
						<div className="examples-list">
							{currentCard.examples.map((example) => (
								<div key={example.id} className="example-item">
									<div className="example-text">
										{example.value}
									</div>
									{revealStage >= 3 && (
										<div className="example-translations">
											<div className="example-translation">
												{getPreferredTranslation(example.translations).targetValue}
											</div>
										</div>
									)}
								</div>
							))}
						</div>
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
					<button
						className="control-button prev-button"
						onClick={handlePrevCard}
					>
						Previous
					</button>

					{revealStage < 3 ? (
						<button
							className="control-button reveal-button"
							onClick={handleReveal}
						>
							Reveal Next
						</button>
					) : (
						<button
							className="control-button next-card-button"
							onClick={handleNextCard}
						>
							Next Card
						</button>
					)}

					<button
						className="control-button next-button"
						onClick={handleNextCard}
					>
						Next
					</button>
				</div>
			</div>
		</div>
	);
};

export default Flashcard;