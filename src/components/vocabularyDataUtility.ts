import vocabularyJson from '../data/vocabulary-japanese.json';

export interface VocabularyItem {
	kanji: string;
	kana: string;
	translation: string;
	examples: string[];
}

const vocabularyDataUtility: VocabularyItem[] = vocabularyJson.vocabulary;

export default vocabularyDataUtility;