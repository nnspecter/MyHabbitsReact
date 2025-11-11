import { TableBody, TableCell } from '@mui/material';
import { Paper, Table, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { use, useEffect, useState } from 'react'
import { useScrollStore } from '../../../../ZustandStore/scrollStore';
import throttle from 'lodash.throttle';

interface Date{
    date: string,
    value: string | null,
}
const CustomTable = ({habits}) => {
    const TableRef = React.useRef<HTMLDivElement>(null);
    const {scrollLeft, setScrollLeft} = useScrollStore();

    const handleScroll = throttle((e: React.UIEvent<HTMLDivElement>) => {
        requestAnimationFrame(() => setScrollLeft(e.currentTarget.scrollLeft))
    }, 16)

    useEffect(() => {
        if (TableRef.current) {
            TableRef.current.scrollLeft = scrollLeft;
        }
    },[scrollLeft]);
    
  return (
    <TableContainer component={Paper} ref={TableRef} sx={{ overflowX: 'auto' }}>
        <Table sx={{ minWidth: 650, tableLayout: 'fixed' }} size="small" aria-label="a dense table" >
            <TableHead>
                <TableRow>
                    <TableCell
                        sx={{
                            position: 'sticky',
                            width: "120px",
                            left: 0,
                            backgroundColor: 'white', // обязательно задаем фон
                            zIndex: 1, // чтобы не перекрывалась другими ячейками
                        }}>
                        Название группы
                    </TableCell>
                    {habits[0]?.records?.map((record, dataKey) => (
                        <TableCell sx={{width: "75px", textAlign: "center"}} key={`dataKey-${dataKey}`}></TableCell>
                    ))}
                </TableRow>
            </TableHead>
            <TableBody>
                {habits?.map((habit, rowkey)=>(
                    <TableRow key={`row-${rowkey}`}>
                        <TableCell
                            sx={{
                                position: 'sticky',
                                width: "100px",
                                left: 0,
                                backgroundColor: 'white', // обязательно задаем фон
                                zIndex: 1, // чтобы не перекрывалась другими ячейками
                            }}>
                            {habit?.name}
                        </TableCell>
                        {habit.records.map((record, cellKey)=>(
                            <TableCell sx={{width: "75px", textAlign: "center"}} key={`dataCell-${cellKey}`}>{record?.value != null ? record.value : "нуль"}</TableCell>
                        ))}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </TableContainer>
  )
}

export default CustomTable