import { TableBody, TableCell } from '@mui/material';
import { Paper, Table, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { useEffect, useState } from 'react'
interface Date{
    date: string,
    value: string | null,
}
const CustomTable = ({habits}) => {
    const [rows, setRows] = useState([]);
    // const createData1 = (
    //     name: string,
    //     calories: number,
    //     fat: number,
    //     carbs: number,
    //     protein: number,
    //     ) => {
    //     return { name, calories, fat, carbs, protein };
    // }

    const createData = (
        name: string,
        records: Date[]
        ) => {
        return { name, records};
    }
        
    useEffect(() => {
       if(!habits) return 
       const newRows = habits.map((el) => createData(el.name, el.records));
       setRows(newRows);
    }, [habits])



  return (
    <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
                <TableRow>
                    <TableCell
                        sx={{
                            position: 'sticky',
                            left: 0,
                            backgroundColor: 'white', // обязательно задаем фон
                            zIndex: 1, // чтобы не перекрывалась другими ячейками
                        }}>
                        Название
                    </TableCell>
                    {rows[0]?.records?.map((record) => (
                        <TableCell>{record.date}</TableCell>
                    ))}
                </TableRow>
            </TableHead>
            <TableBody>
                {rows?.map((habit)=>(
                    <TableRow>
                        <TableCell
                            sx={{
                                position: 'sticky',
                                left: 0,
                                backgroundColor: 'white', // обязательно задаем фон
                                zIndex: 1, // чтобы не перекрывалась другими ячейками
                            }}>
                            {habit?.name}
                        </TableCell>
                        {habit.records.map((record)=>(
                            <TableCell>{record?.value != null ? record.value : "нуль"}</TableCell>
                        ))}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </TableContainer>
  )
}

export default CustomTable