import { TableBody, TableCell, TableContainer, TableHead, TableRow, Table, Paper } from '@mui/material';
import React from 'react';

interface Date {
  date: string;
  value: string | null;
}

interface RecordType {
  value: string | null;
}

interface HabitType {
  name: string;
  records: RecordType[];
}

interface GroupType {
  name: string;
  habits: HabitType[];
}

interface CustomTableProps {
  dates: Date[];
  groups: GroupType[];
}

const CustomTable: React.FC<CustomTableProps> = ({ dates, groups }) => {
  return (
    <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
      <Table sx={{ minWidth: 650, tableLayout: 'fixed',}} size="small">
        {/* Заголовок с датами */}
        <TableHead>
          <TableRow>
            <TableCell
              sx={{
                position: 'sticky',
                width: '120px',
                left: 0,
                backgroundColor: 'white',
                zIndex: 2,
              }}
            >
            </TableCell>
            {dates.map((el, dataKey) => (
              <TableCell
                sx={{ width: '75px', textAlign: 'center', backgroundColor: 'white' }}
                key={`dataKey-${dataKey}`}
              >
                {el.date}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        {/* Тело таблицы */}
        <TableBody>
          {groups.flatMap((group, gKey) =>
            group.habits.map((habit, hKey) => (
              <React.Fragment key={`habit-${gKey}-${hKey}`}>
                {/* Название группы как отдельная строка */}
                {hKey === 0 && (
                  <TableRow>
                    <TableCell
                      sx={{
                        position: 'sticky',
                        left: 0,
                        backgroundColor: '#f0f0f0',
                        fontWeight: 'bold',
                        zIndex: 1,
                      }}>
                      {group.name}
                    </TableCell>
                    <TableCell
                        colSpan={dates.length + 1} sx={{backgroundColor: '#f0f0f0'}}>
                    </TableCell>
                  </TableRow>
                )}

                <TableRow>
                  <TableCell
                    sx={{
                      position: 'sticky',
                      left: 0,
                      backgroundColor: 'white',
                      zIndex: 1,
                    }}
                  >
                    {habit.name}
                  </TableCell>
                  {habit.records.map((record, cellKey) => (
                    <TableCell
                      key={`dataCell-${gKey}-${hKey}-${cellKey}`}
                      sx={{ width: '75px', textAlign: 'center', whiteSpace: 'normal', wordBreak: 'break-word' }}
                    >
                      {(record?.value === null || record?.value === undefined)
                        ? 'Не задано'
                        : typeof record?.value === 'boolean'
                        ? (record.value ? '✔️' : '')
                        : record.value}
                    </TableCell>
                  ))}
                </TableRow>
              </React.Fragment>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CustomTable;
