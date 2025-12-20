import { TableBody, TableCell, TableContainer, TableHead, TableRow, Table, Paper, Button, CircularProgress } from '@mui/material';
import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { formatTimeShort } from '../../../features/TimeFormatter/TimeFormatter';
import { HabitsGroup } from '../../../api/api';
import { useStore } from '../../../ZustandStore/store';
import { useHabbits } from '../../../api/queries';
import { dateFormatter } from "../../../features/DateFormatters/DateFormatter";



const CustomTable = () => {
  const {updateDateRange, selectedTableDate} = useStore();
  
  const dateRange = ({ 
    startDate: dateFormatter(selectedTableDate, -20),
    endDate: dateFormatter(selectedTableDate, +20),
  });
  
  const {data: habbitsQuery, isPending} = useHabbits({startDate: dateRange.startDate, endDate: dateRange.endDate});
  
  const tableContainerRef = useRef<HTMLDivElement | null>(null);
  const scrollDirectionRef = useRef<'left' | 'right' | null>(null);

  const dates = habbitsQuery?.data?.dates || [];
  const groups = habbitsQuery?.data?.groups || [];

  useLayoutEffect(() => {
  if (!tableContainerRef.current) return;

  const container = tableContainerRef.current;
  container.scrollLeft =
    container.scrollWidth / 2 - container.clientWidth / 2;
}, [selectedTableDate]);
  
  // useEffect(()=> {
  //   if(!tableContainerRef.current || !scrollDirectionRef.current) return;
  //   const container = tableContainerRef.current;
    
  //   if(scrollDirectionRef.current === "left"){
  //     container.scrollLeft = 1300
  //   }
  //   if(scrollDirectionRef.current === "right"){
  //     container.scrollLeft = container.scrollWidth - container.clientWidth - 1300;
  //   }
  //   scrollDirectionRef.current = null;
  
  // }, [dates]);
  
  //блок скролла при загрузке 
  useEffect(() => {
    const container = tableContainerRef.current;
    if (!container) return;

    const preventScroll = (e: Event) => {
      if (isPending) e.preventDefault();
    };

    container.addEventListener('wheel', preventScroll, { passive: false });

    return () => container.removeEventListener('wheel', preventScroll);
  }, [isPending]);


  // const handlleScroll = () => {
  //   if (!tableContainerRef.current) return;
  //   const { scrollLeft, scrollWidth, clientWidth } = tableContainerRef.current;
  //   if(scrollLeft <= 10){
  //     scrollDirectionRef.current = "left";
  //     updateDateRange("left")
      
  //   }
  //   if (scrollLeft + clientWidth >= scrollWidth-10) {
  //     scrollDirectionRef.current = "right";
  //     updateDateRange("right")
  //   }

  // }

  if(isPending) { 
    return(
    <div className="tableLoading">
      <CircularProgress sx={{color: "#454545"}}/>
    </div>)
  }
  if(!isPending && groups.length === 0){
    return(
      <div className="tableLoading">
        Нет данных для отображения
      </div>
    )
  }

  return (
    <TableContainer 
      component={Paper} 
      sx={{ overflowX: 'auto' }}
      ref={tableContainerRef}
      //onScroll={handlleScroll}
    >
      <Table sx={{ minWidth: 650, tableLayout: 'fixed',}} size="small">
        {/* Заголовок с датами */}
        <TableHead>
          <TableRow>
            <TableCell
              sx={{
                position: 'sticky',
                width: '150px',
                left: 0,
                backgroundColor: 'white',
                zIndex: 2,
              }}
            >
            </TableCell>
            {dates.map((date, dataKey) => (
              <TableCell
                sx={{ width: '90px', textAlign: 'center', backgroundColor: 'white' }}
                key={`dataKey-${dataKey}`}
              >
                <div className='smallFont2'>{date}</div>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        {/* Тело таблицы */}
        <TableBody>
          {groups.map((group, gKey) => {
            // Если у группы нет привычек, создаем "пустой" объект привычки
            const habits = group.habits.length > 0 ? group.habits : [{ name: 'Пустая группа', records: dates.map(() => ({ value: null })) }];

            return habits.map((habit, hKey) => (
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
                        
                      }}
                    >
                      <div className='smallFont2'>{group.name}</div>
                    </TableCell>
                    <TableCell colSpan={dates.length} sx={{ backgroundColor: '#f0f0f0' }} />
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
                    <div className='smallFont1'>{habit.name}</div>
                  </TableCell>
                  {habit.records.map((record, cellKey) => (
                    <TableCell
                      key={`dataCell-${gKey}-${hKey}-${cellKey}`}
                      sx={{ width: '75px', textAlign: 'center', whiteSpace: 'normal', wordBreak: 'break-word' }}
                    >
                      {record?.value === null || record?.value === undefined
                        ? ''
                        : typeof record?.value === 'boolean'
                        ? record.value
                          ? '✔️'
                          : ''
                        : habit.type === 'TIME' ? formatTimeShort(record.value):  record.value}
                    </TableCell>
                  ))}
                </TableRow>
              </React.Fragment>
            ));
          })}
        </TableBody>

      </Table>
    </TableContainer>
  );
};

export default CustomTable;
