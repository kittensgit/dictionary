import React, { useEffect, useState } from 'react';

import { IDictionary } from '../types/types';

import {
    Box,
    Button,
    Card,
    CardContent,
    Container,
    IconButton,
    Modal,
    TextField,
    Typography,
    CircularProgress,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface ModalCardProps {
    error: string | unknown;
    isOpen: boolean;
    currentWord: string;
    translatedText: string;
    isLoading: boolean;
    saveWordToDict: (
        word: IDictionary['word'],
        translate: IDictionary['translate']
    ) => void;
    handleClose: () => void;
}

const ModalCard: React.FC<ModalCardProps> = ({
    isOpen,
    currentWord,
    translatedText,
    isLoading,
    error,
    handleClose,
    saveWordToDict,
}) => {
    const [wordValue, setWordValue] = useState<string>(currentWord);
    const [translateValue, setTranslateValue] =
        useState<string>(translatedText);

    useEffect(() => {
        setWordValue(currentWord);
        setTranslateValue(translatedText);
    }, [currentWord, translatedText]);

    const handleSave = () => {
        saveWordToDict(wordValue, translateValue);
        handleClose();
    };

    const handleWordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setWordValue(e.target.value);
    };
    const handleTranslateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTranslateValue(e.target.value);
    };

    return (
        <Modal
            open={isOpen}
            onClose={handleClose}
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Card>
                <CardContent sx={{ position: 'relative', padding: '60px' }}>
                    <IconButton
                        onClick={handleClose}
                        sx={{
                            position: 'absolute',
                            top: '0',
                            right: '0',
                        }}
                    >
                        <CloseIcon />
                    </IconButton>

                    <Typography variant="h4">
                        Add word to the dictionary
                    </Typography>
                    <Container
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '20px',
                            marginTop: 3,
                        }}
                    >
                        {error ? (
                            <div>Error</div>
                        ) : isLoading ? (
                            <CircularProgress />
                        ) : (
                            <Box sx={{ display: 'flex', gap: '20px' }}>
                                <TextField
                                    label="Word"
                                    variant="standard"
                                    value={wordValue}
                                    onChange={handleWordChange}
                                />
                                <TextField
                                    label="Translate"
                                    variant="standard"
                                    value={translateValue}
                                    onChange={handleTranslateChange}
                                />
                            </Box>
                        )}

                        <Box>
                            <Button onClick={handleSave} variant="contained">
                                Save
                            </Button>
                        </Box>
                    </Container>
                </CardContent>
            </Card>
        </Modal>
    );
};

export default ModalCard;
