import React, { FC } from 'react';

import { IDictionary } from '../types/types';

import { Box, Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import WordItem from './WordItem';

interface WordsListProps {
    dictionary: IDictionary[];
    deleteWordFromDict: (id: IDictionary['id']) => void;
    updateDictItem: (
        id: IDictionary['id'],
        word: IDictionary['word'],
        translate: IDictionary['translate']
    ) => void;
}

const WordsList: FC<WordsListProps> = ({
    dictionary,
    deleteWordFromDict,
    updateDictItem,
}) => {
    return (
        <Box minWidth={'400px'}>
            <Typography variant="h2" textAlign={'center'}>
                Words
            </Typography>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Word</TableCell>
                            <TableCell align="center">Translate</TableCell>
                            <TableCell align="center"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {dictionary.map((item) => (
                            <WordItem
                                key={item.id}
                                item={item}
                                deleteWordFromDict={deleteWordFromDict}
                                updateDictItem={updateDictItem}
                            />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default WordsList;
