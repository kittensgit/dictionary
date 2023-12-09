import React, { FC } from 'react';

import { Box, Typography } from '@mui/material';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { IDictionary } from '../types/types';

interface WordsListProps {
    dictionary: IDictionary[];
}

const WordsList: FC<WordsListProps> = ({ dictionary }) => {
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
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default WordsList;
