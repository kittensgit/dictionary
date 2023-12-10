import React, { FC, useState } from 'react';
import { IDictionary } from '../types/types';
import { TableCell, TableRow, TextField } from '@mui/material';

import ClearIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';
import { Box } from '@mui/system';

interface WordItemProps {
    item: IDictionary;
    deleteWordFromDict: (id: IDictionary['id']) => void;
    updateDictItem: (
        id: IDictionary['id'],
        word: IDictionary['word'],
        translate: IDictionary['translate']
    ) => void;
}

const WordItem: FC<WordItemProps> = ({
    item,
    deleteWordFromDict,
    updateDictItem,
}) => {
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [editWord, setEditWord] = useState<IDictionary['word']>(item.word);
    const [editTranslate, setEditTranslate] = useState<
        IDictionary['translate']
    >(item.translate);

    const handleWordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditWord(e.target.value);
    };
    const handleTranslateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditTranslate(e.target.value);
    };

    const handleUpdate = (
        id: IDictionary['id'],
        word: IDictionary['word'],
        translate: IDictionary['translate']
    ) => {
        setIsEdit(false);
        updateDictItem(id, word, translate);
    };

    return (
        <TableRow>
            {isEdit ? (
                <TableCell align="center">
                    <TextField
                        variant="standard"
                        label="Word"
                        size="small"
                        value={editWord}
                        onChange={handleWordChange}
                    />
                </TableCell>
            ) : (
                <TableCell align="center">{item.word}</TableCell>
            )}
            {isEdit ? (
                <TableCell align="center">
                    <TextField
                        variant="standard"
                        label="Translate"
                        size="small"
                        value={editTranslate}
                        onChange={handleTranslateChange}
                    />
                </TableCell>
            ) : (
                <TableCell align="center">{item.translate}</TableCell>
            )}

            <TableCell align="center">
                {isEdit ? (
                    <DoneIcon
                        fontSize="small"
                        sx={{
                            cursor: 'pointer',
                        }}
                        onClick={() => {
                            handleUpdate(item.id, editWord, editTranslate);
                        }}
                    />
                ) : (
                    <Box display={'flex'} justifyContent={'center'}>
                        <EditIcon
                            sx={{
                                cursor: 'pointer',
                                marginRight: 1,
                            }}
                            fontSize="small"
                            onClick={() => setIsEdit(true)}
                        />
                        <ClearIcon
                            sx={{
                                cursor: 'pointer',
                            }}
                            fontSize="small"
                            onClick={() => deleteWordFromDict(item.id)}
                        />
                    </Box>
                )}
            </TableCell>
        </TableRow>
    );
};

export default WordItem;
