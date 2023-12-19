import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { v4 } from 'uuid';

import './App.css';
import { Box, Button, CircularProgress, Typography } from '@mui/material';

import { IDictionary } from './types/types';

import ModalCard from './Components/ModalCard';
import WordsList from './Components/WordsList';

const App: React.FC = () => {
    const [text, setText] = useState<string>('');
    const [isTextLoading, setIsTextLoading] = useState<boolean>(false);

    const [dictionary, setDictionary] = useState<IDictionary[]>([]);
    const [currentWord, setCurrentWord] = useState<string>('');
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

    const updateDictItem = (
        id: IDictionary['id'],
        word: IDictionary['word'],
        translate: IDictionary['translate']
    ) => {
        setDictionary(
            dictionary.map((item) =>
                item.id === id
                    ? {
                          ...item,
                          word,
                          translate,
                      }
                    : item
            )
        );
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
        const sourceLanguage = 'en';
        const targetLanguage = 'ru';

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

    const getRandomBaconText = async () => {
        setIsTextLoading(true);
        try {
            const response = await axios.get(
                'https://baconipsum.com/api/?type=all-meat&sentences=10'
            );
            const baconText = response.data[0];
            setText(baconText);
        } catch (error) {
            console.error('Error fetching bacon text:', error);
        } finally {
            setIsTextLoading(false);
        }
    };

    useEffect(() => {
        getRandomBaconText();
    }, []);

    const words = text.split(' ');

    return (
        <Box
            sx={{
                display: 'grid',
                gridTemplateColumns: '65% 35%',
                padding: ' 20px 50px',
            }}
        >
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
                <Typography
                    variant="h1"
                    textAlign={'center'}
                    fontWeight={'700'}
                >
                    Dictionary
                </Typography>
                <Typography
                    color={'#9e9e9e'}
                    fontStyle={'italic'}
                    textAlign={'center'}
                    marginBottom={3}
                >
                    *Double click on the word and it will appear in the table
                </Typography>
                <Box display={'flex'} flexDirection={'column'}>
                    {isTextLoading ? (
                        <Box alignSelf={'center'}>
                            <CircularProgress />
                        </Box>
                    ) : (
                        <>
                            <Typography
                                sx={{ userSelect: 'none' }}
                                onDoubleClick={handleDoubleClick}
                            >
                                {words.map((word, index) => (
                                    <span key={index}>{word} </span>
                                ))}
                            </Typography>
                            <Button
                                sx={{
                                    alignSelf: 'center',
                                    marginTop: 2,
                                }}
                                variant="contained"
                                onClick={() => getRandomBaconText()}
                            >
                                Generate new text
                            </Button>
                        </>
                    )}
                </Box>
            </Box>
            <WordsList
                dictionary={dictionary}
                deleteWordFromDict={deleteWordFromDict}
                updateDictItem={updateDictItem}
            />
        </Box>
    );
};

export default App;
