import React from 'react';

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
    currentWord: string | null;
    translatedText: string;
    isLoading: boolean;
    handleClose: () => void;
}

const ModalCard: React.FC<ModalCardProps> = ({
    isOpen,
    currentWord,
    translatedText,
    isLoading,
    error,
    handleClose,
}) => {
    const handleSave = () => {
        handleClose();
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
                                    value={currentWord}
                                />
                                <TextField
                                    label="Translate"
                                    variant="standard"
                                    value={translatedText}
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
