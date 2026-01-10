import  {useEffect, useRef, useState} from 'react';
import { restrictToParentElement, restrictToVerticalAxis } from '@dnd-kit/modifiers';

import {
  DndContext, 
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  TouchSensor,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

import {SortableItem} from './SortableItem';

import { Habit } from '../../../api/api';
import { useConfigureGroup } from '../../../api/mutations';

interface SortBoardProps {
    habits: Habit[];
    groupId: number;
}
export const SortBoard = ({ habits, groupId }: SortBoardProps) => {
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(TouchSensor, {
            activationConstraint: {
            delay: 150,
            tolerance: 5,
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    ) ;

    const { setNodeRef } = useSortable({
        id: groupId
    });
    const [items, setItems] = useState(habits);
    const orderedIds  = items.map((habit)=> habit.id) // текущие id со стейта под запрос
    const configureMutation = useConfigureGroup();
    

    useEffect(()=>{
        if (items===habits){ 
            return;
        }
        configureMutation.mutate({groupId: groupId, orderedIds: orderedIds})
    },[items])


    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (!over) return;

        if (active.id !== over.id) {
            setItems((prev) => {
            const oldIndex = prev.findIndex(i => i.id === active.id);
            const newIndex = prev.findIndex(i => i.id === over.id);

            return arrayMove(prev, oldIndex, newIndex);
            });
    }
    };

    return (
        <div style={{ position: 'relative' }} > 
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
                modifiers={[restrictToVerticalAxis , restrictToParentElement]}
            >
                <SortableContext
                    items={items.map(i => i.id)}
                    strategy={verticalListSortingStrategy}
                >
            
                    {items.map((habit) => (
                        <SortableItem habit={habit} key={habit.id}/>
                    ))}
                </SortableContext>
            
            </DndContext>
        </div>
    );
};
