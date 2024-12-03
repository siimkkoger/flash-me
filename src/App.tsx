import React, { useState } from 'react';
import './App.css';
import { LanguageDataSet } from './components/vocabularyDataUtility';
import Flashcard from './components/FlashCard';

// Define available languages
type AvailableLanguages = 'JPN' | 'ESP';

// Type-safe mapping of language files
const languageFiles: Record<AvailableLanguages, () => Promise<{ default: LanguageDataSet }>> = {
	'JPN': () => import('./data/vocabulary-jpn.json'),
	'ESP': () => import('./data/vocabulary-esp.json')
};

function App() {
	const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
	const [languageData, setLanguageData] = useState<LanguageDataSet | null>(null);

	const handleLanguageSelect = async (language: AvailableLanguages) => {
		try {
			const languageModule = await languageFiles[language]();
			setLanguageData(languageModule.default);
			setSelectedLanguage(language);
		} catch (error) {
			console.error('Error loading language data:', error);
		}
	};

	const handleReset = () => {
		setSelectedLanguage(null);
		setLanguageData(null);
	};

	return (
		<div className="App">
			{!selectedLanguage ? (
				<div className="language-selector">
					<h2>Choose a Language</h2>
					{(Object.keys(languageFiles) as AvailableLanguages[]).map(lang => (
						<button
							key={lang}
							onClick={() => handleLanguageSelect(lang)}
						>
							{lang}
						</button>
					))}
				</div>
			) : (
				<>
					<div className="language-info">
						<h2>Learning {selectedLanguage}</h2>
						<button onClick={handleReset}>Change Language</button>
					</div>
					{languageData && (
						<Flashcard
							languageItems={languageData.items}
							preferredTranslationLanguage={languageData.language}
						/>
					)}
				</>
			)}
		</div>
	);
}

export default App;