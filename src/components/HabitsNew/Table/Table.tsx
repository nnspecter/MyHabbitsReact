import { TableBody, TableCell, TableContainer, TableHead, TableRow, Table, Paper, Button, CircularProgress, Skeleton } from '@mui/material';
import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { formatTimeShort } from '@/features/TimeFormatter/TimeFormatter';
import { useStore } from '@/shared/ZustandStore/store';
import { useHabbits } from '@/shared/api/queries';
import { dateFormatter } from "@/features/DateFormatters/DateFormatter";
import dayjs from 'dayjs';

import { isLight } from '@/features/ColorChanger/isLight';
import { Record } from '@/shared/api/types/table';



const CustomTable = () => {
  const {updateDateRange, selectedTableDate} = useStore();
  const isSelected = (date: string) => {return selectedTableDate === date};

  const dateRange: {startDate: string, endDate: string} = { 
    startDate: dateFormatter(selectedTableDate, -20),
    endDate: dateFormatter(selectedTableDate, +20),
  };
  
  const {data: habbitsQuery, isPending, isFetching, isError} = useHabbits({startDate: dateRange.startDate, endDate: dateRange.endDate});
  console.log(habbitsQuery)
  const tableContainerRef = useRef<HTMLDivElement | null>(null);
  const scrollDirectionRef = useRef<'left' | 'right' | null>(null);

  const dates = habbitsQuery?.data?.dates || [] ;
  const groups = habbitsQuery?.data?.groups || [];

  useLayoutEffect(() => {
    if (!tableContainerRef.current) return;

    const container = tableContainerRef.current;
    container.scrollLeft = container.scrollWidth / 2 - container.clientWidth / 2;
  }, [selectedTableDate, isPending]);
  
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
  if(isError) { 
    return(
    <div className="tableLoading">
      Возникла ошибка 
    </div>)
  }

  if(!isPending && groups.length === 0){
    return(
      <div className="tableLoading">
        Нет данных для отображения. Создайте группы в настройках
      </div>
    )
  }

  return (
    <div style={{position: "relative", width: "100%", height: "100%", display: 'flex'}}>
      {isFetching && <Skeleton style={{position: "absolute", inset: "0", zIndex: "100", height: '100%'}} variant="rectangular" animation="wave" sx={{ bgcolor: '#30303023' }}></Skeleton>}
      <TableContainer 
        component={Paper}
        sx={{
          overflowX: 'auto',
          filter: isFetching ? 'blur(1px)' : 'none',
          pointerEvents: false ? 'none' : 'auto', }}
          ref={tableContainerRef}
        //onScroll={handlleScroll}
      >
        <Table sx={{  tableLayout: 'fixed',}} size="small">
          {/* Заголовок с датами */}
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  position: 'sticky',
                  width: 'var(--tablHWidth)',
                  left: 0,
                  backgroundColor: 'white',
                  zIndex: 2,
                  borderRight: '1px solid rgba(224,224,224,1)',
                  
                }}
              >
              </TableCell>
              {dates.map((date, dataKey) => (
                <TableCell
                  sx={{ width: 'var(--tablHWidth)', textAlign: 'center', backgroundColor: 'white', borderRight: '1px solid rgba(224,224,224,1)', }}
                  key={`dataKey-${dataKey}`}
                >
                  <div className='smallFont2' style={{ color: isSelected(date) ? '#39b354ff' : '#454545' }}>{dayjs(date).format("DD.MM.YYYY")}</div>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          {/* Тело таблицы */}
          <TableBody>
            {groups.map((group, gKey) => {
              // Если у группы нет привычек,"пустой" объект привычки
              const habits = group.habits.length > 0 ? group.habits : [{ 
                id: -99,
                name: 'Пустая группа',
                type: "TEXT",
                hidden: false,
                position: 1,
                records: dates.map((date): Record => ({ date: date, value: "" }) ),
              }];
                

              return habits.map((habit, hKey) => (
                <React.Fragment key={`habit-${gKey}-${hKey}`}>
                  {/* Название группы как отдельная строка */}
                  {hKey === 0 && (
                    <TableRow>
                      <TableCell
                        sx={{
                          position: 'sticky',
                          left: 0,
                          backgroundColor: `${group.color}`,
                          fontWeight: 'bold',
                          zIndex: 1,
                          borderRight: '1px solid rgba(224,224,224,1)',
                          
                        }}
                      >
                        <div  style={{width: "var(--tablHWidth)", color: isLight(group.color) ? '#1E1E1E' : '#FFFFFF'}} className='smallFont1Table truncated'>{group.name}</div>
                      </TableCell>
                      <TableCell colSpan={dates.length} sx={{ backgroundColor: `${group.color}` }} /> 
                    </TableRow>
                  )}

                  <TableRow>
                    <TableCell
                      sx={{
                        position: 'sticky',
                        left: 0,
                        backgroundColor: 'white',
                        zIndex: 1,
                        borderRight: '1px solid rgba(224,224,224,1)',
                      }}
                    >
                      <div className='smallFont1'>{habit.name}</div>
                    </TableCell>
                    {habit.records.map((record: Record , cellKey: number) => (
                      <TableCell
                        key={`dataCell-${gKey}-${hKey}-${cellKey}`}
                        sx={{ textAlign: 'center', whiteSpace: 'normal', wordBreak: 'break-word', borderRight: '1px solid rgba(224,224,224,1)', }}
                        style={{width: "var(--tablHWidth)"}}
                      >
                        <div 
                        className='wrapTruncated smallFont1 tableContent'
                        >
                          {
                            record?.value === null || record?.value === undefined
                            ? ''
                            : typeof record?.value === 'boolean'
                            ? record.value
                              ? '✔️'
                              : ''
                            : habit.type === 'TIME' ? formatTimeShort(String(record.value)):  record.value
                          }
                        </div>
                      </TableCell>
                    ))}
                  </TableRow>
                </React.Fragment>
              ));
            })}
          </TableBody>

        </Table>
      </TableContainer>
    </div>
  );
};

export default CustomTable;
