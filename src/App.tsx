import React, { useState } from 'react';
import axios from 'axios';
import { v4 } from 'uuid';

import './App.css';
import { Box, Container, Typography } from '@mui/material';

import { IDictionary } from './types/types';

import ModalCard from './Components/ModalCard';
import WordsList from './Components/WordsList';

const App: React.FC = () => {
    const [dictionary, setDictionary] = useState<IDictionary[]>([]);
    const [currentWord, setCurrentWord] = useState<string | null>(null);
    const [translatedText, setTranslatedText] = useState('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [error, setError] = useState<string | unknown>('');

    const saveWordToDict = (
        word: IDictionary['word'],
        translate: IDictionary['translate']
    ) => {
        const newDictWord: IDictionary = {
            id: v4(),
            translate,
            word,
        };
        setDictionary([...dictionary, newDictWord]);
    };

    const deleteWordFromDict = (id: IDictionary['id']) => {
        setDictionary(dictionary.filter((item) => item.id !== id));
    };

    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    const handleDoubleClick = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        if ((event.target as HTMLElement).tagName === 'SPAN') {
            const word = (event.target as HTMLElement).textContent;
            if (word !== null) {
                translateText(word);
                setCurrentWord(word);
                handleOpen();
            }
        }
    };

    const translateText = async (textToTranslate: string) => {
        setIsLoading(true);
        const sourceLanguage = 'auto'; // 'auto' означает автоматическое определение языка
        const targetLanguage = 'ru'; // Например, 'ru' для русского

        try {
            const response = await axios.post(
                'https://libretranslate.de/translate',
                {
                    q: textToTranslate,
                    source: sourceLanguage,
                    target: targetLanguage,
                }
            );

            const translatedText = response.data.translatedText;
            setTranslatedText(translatedText);
        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    };

    const text =
        'Lucas goes to school every day of the week. He has many subjects to go to each school day: English, art, science, mathematics, gym, and history. His mother packs a big backpack full of books and lunch for Lucas.    His first class is English, and he likes that teacher very much. His English teacher says that he is a good pupil, which Lucas knows means that she thinks he is a good student.';
    const words = text.split(' ');

    return (
        <Box>
            <Container sx={{ display: 'flex' }}>
                <ModalCard
                    error={error}
                    isOpen={isOpen}
                    isLoading={isLoading}
                    currentWord={currentWord}
                    translatedText={translatedText}
                    handleClose={handleClose}
                    saveWordToDict={saveWordToDict}
                />
                <Box>
                    <Typography variant="h1" textAlign={'center'}>
                        Dictionary
                    </Typography>
                    <Typography
                        sx={{ userSelect: 'none' }}
                        onDoubleClick={handleDoubleClick}
                    >
                        {words.map((word, index) => (
                            <span key={index}>{word} </span>
                        ))}
                    </Typography>
                </Box>
                <WordsList
                    dictionary={dictionary}
                    deleteWordFromDict={deleteWordFromDict}
                />
            </Container>
        </Box>
    );
};

export default App;
