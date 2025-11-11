import { Table, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React, { use, useEffect, useRef } from 'react'
import { useScrollStore } from '../../../ZustandStore/scrollStore';
import throttle from 'lodash.throttle';

const DateLine = ({date}) => {
  const tableRef = useRef<HTMLDivElement>(null);
  const scrollLeftRef = useRef<number>(0);
  const {scrollLeft, setScrollLeft} = useScrollStore();

  const handleScroll = throttle((e: React.UIEvent<HTMLDivElement>) => {
    const left= e.currentTarget.scrollLeft;
    scrollLeftRef.current = left;
    requestAnimationFrame(() => {setScrollLeft(left);});
  }, 16);

  useEffect(() => {
    if (tableRef.current) {
      tableRef.current.scrollLeft = scrollLeft;
    }
  },[scrollLeftRef.current]);

  return (
    <div>
      <TableContainer ref={tableRef} onScroll={handleScroll} sx={{ overflowX: 'auto' }}>
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
              </TableCell>
              {date.map((el, Key) => (
                <TableCell sx={{width: "75px", textAlign: "center", backgroundColor: 'white',}} key={`dataKey2-${Key}`}>{el.date}</TableCell>
              ))}
            </TableRow>
          </TableHead>
        </Table>
      </TableContainer>
    </div>
  )
}

export default DateLine