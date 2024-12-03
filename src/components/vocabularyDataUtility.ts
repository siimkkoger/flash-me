export interface LanguageDataSet {
	language: string;
	items: LanguageLearningItem[];
}

export interface LanguageLearningItem {
	id: string;
	language: string;
	value: string;
	languageSpecifics?: any;
	translations: Translation[];
	examples: Example[];
}

export interface Translation {
	id: string;
	sourceLanguage: string;
	targetLanguage: string;
	sourceValue: string;
	targetValue: string;
}

export interface Example {
	id: string;
	value: string;
	translations: Translation[];
}

// Japanese-specific types
export interface JapaneseSpecifics {
	kanji: string;
	kana: string;
	romaji: string;
	pitchAccent: string;
}

