import React, { useState } from 'react';
import './App.css';
import {
    Backdrop,
    Box,
    Button,
    Card,
    CardContent,
    Container,
    Divider,
    IconButton,
    Modal,
    TextField,
    Typography,
} from '@mui/material';

import { styled } from '@mui/system';

import CloseIcon from '@mui/icons-material/Close';

const NonSelectableTypography = styled(Typography)`
    user-select: none;
`;

const TextContainer: React.FC = () => {
    const [currentWord, setCurrentWord] = useState<string | null>(null);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);
    const handleDoubleClick = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        if ((event.target as HTMLElement).tagName === 'SPAN') {
            const word = (event.target as HTMLElement).textContent;
            setCurrentWord(word);
            handleOpen();
        }
    };

    const text =
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquid temporibus ab suscipit ipsa harum voluptas incidunt modi atque labore similique officiis inventore quasi, dolor quo consequatur quibusdam ratione voluptatum optio?';
    const words = text.split(' ');

    return (
        <Box>
            <Container>
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
                        <CardContent
                            sx={{ position: 'relative', padding: '60px' }}
                        >
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
                                <Box sx={{ display: 'flex', gap: '20px' }}>
                                    <TextField
                                        label="Word"
                                        variant="standard"
                                        value={currentWord}
                                    />

                                    <TextField
                                        label="Translate"
                                        variant="standard"
                                    />
                                </Box>
                                <Box>
                                    <Button variant="contained">Save</Button>
                                </Box>
                            </Container>
                        </CardContent>
                    </Card>
                </Modal>
                <Typography variant="h1" textAlign={'center'}>
                    Dictionary
                </Typography>
                <NonSelectableTypography onDoubleClick={handleDoubleClick}>
                    {words.map((word, index) => (
                        <span key={index}>{word} </span>
                    ))}
                </NonSelectableTypography>
            </Container>
        </Box>
    );
};

export default TextContainer;
