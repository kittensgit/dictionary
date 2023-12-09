import React, { FC } from 'react';

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
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface EditModalProps {
    word: string;
    translate: string;
    isEdit: boolean;
    handleCloseEdit: () => void;
}

const EditModal: FC<EditModalProps> = ({
    isEdit,
    word,
    translate,
    handleCloseEdit,
}) => {
    const handleSave = () => {};
    const handleWordChange = () => {};
    const handleTranslateChange = () => {};
    return (
        <div>
            <Modal
                open={isEdit}
                onClose={handleCloseEdit}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Card>
                    <CardContent sx={{ position: 'relative', padding: '60px' }}>
                        <IconButton
                            onClick={handleCloseEdit}
                            sx={{
                                position: 'absolute',
                                top: '0',
                                right: '0',
                            }}
                        >
                            <CloseIcon />
                        </IconButton>

                        <Typography variant="h4">Edit the word</Typography>
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
                                    value={word}
                                    onChange={handleWordChange}
                                />
                                <TextField
                                    label="Translate"
                                    variant="standard"
                                    value={translate}
                                    onChange={handleTranslateChange}
                                />
                            </Box>

                            <Box>
                                <Button
                                    onClick={handleSave}
                                    variant="contained"
                                >
                                    Save
                                </Button>
                            </Box>
                        </Container>
                    </CardContent>
                </Card>
            </Modal>
        </div>
    );
};

export default EditModal;
