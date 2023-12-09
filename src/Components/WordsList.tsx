import React, { FC } from 'react';

import { IDictionary } from '../types/types';

import { Box, Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import ClearIcon from '@mui/icons-material/Clear';

interface WordsListProps {
    dictionary: IDictionary[];
    deleteWordFromDict: (id: IDictionary['id']) => void;
}

const WordsList: FC<WordsListProps> = ({ dictionary, deleteWordFromDict }) => {
    return (
        <Box>
            <Typography variant="h4" textAlign={'center'}>
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
                            <TableRow key={item.id}>
                                <TableCell align="center">
                                    {item.word}
                                </TableCell>
                                <TableCell align="center">
                                    {item.translate}
                                </TableCell>
                                <TableCell align="center">
                                    <ClearIcon
                                        sx={{ cursor: 'pointer' }}
                                        fontSize="small"
                                        onClick={() =>
                                            deleteWordFromDict(item.id)
                                        }
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default WordsList;
