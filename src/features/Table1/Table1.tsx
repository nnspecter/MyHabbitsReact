'use client'
import { createColumnHelper, getCoreRowModel } from '@tanstack/react-table'
import { create } from 'domain'
import React, { useEffect, useState } from 'react'

type HabbitTimes <T> = {
  time: string
  data: T
}

type HabbitBase<T, Type extends string> = {
  id: number
  name: string
  type: Type;
  HabbitTimes: HabbitTimes <T>[]
}

type HabbitString = HabbitBase<string | null, "string">
type HabbitTime = HabbitBase<number | null, "time">
type HabbitBoolean = HabbitBase<boolean | null, "boolean">

type Habbit = HabbitString | HabbitTime | HabbitBoolean


const data: Habbit[] = [
  {
    id: 1,
    name: "Exercise",
    type: "time",
    HabbitTimes: [
      { time: "22:00", data: 30 },
      { time: "12:00", data: 45 },
    ],
  },
  {
    id: 2,
    name: "Read a book",
    type: "string",
    HabbitTimes: [
      { time: "22:00", data: "Chapter 1" },
      { time: "16:00", data: "Chapter 2" },
    ],
  },
  {
    id: 3,
    name: "Meditate",
    
    type: "boolean",
    HabbitTimes: [
      { time: "16:00", data: true },
      { time: "15:00", data: false },
    ],
  },
]


const columnHelper = createColumnHelper<Habbit>();
const columns = [
  columnHelper.accessor('id', {
    cell: info => info.getValue(),
    footer: info => info.column.id
  }),
];


const Table1 = () => {
  const [fixedTable, setFixedTable] = useState <Habbit[] | null>(null);
  const [tableTime, setTableTime] = useState <string[]>([]);
  
  const handleFixTime = () => {
    let timeArray = []
    data.forEach(habbit => habbit.HabbitTimes.forEach((t) => {timeArray.push(t.time)}))
    timeArray.sort();
    timeArray = [...new Set(timeArray)];
    setTableTime(timeArray);
    console.log('timeArray', timeArray);
  }

  const handleFixData = () => {
  const newData = data.map(habbit => {
    const newHabbitTimes = tableTime.map(time => {
      const existing = habbit.HabbitTimes.find(t => t.time === time);
      return existing ? existing : { time, data: null };
    });
    return { ...habbit, HabbitTimes: newHabbitTimes };
  });
  setFixedTable(newData);
};




  useEffect(() => {
    handleFixTime();
  }, [])
  
  const table = {
    columns,
    getCoreRowModel: getCoreRowModel()
  }
  console.log('fixedTable', tableTime);
  return (
    <div>
      <table border={1} cellPadding={5}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Time (min)</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((habbit, index) => (
            <tr key={index}>
              <td>{habbit.id}</td>
              <td>{habbit.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Table1