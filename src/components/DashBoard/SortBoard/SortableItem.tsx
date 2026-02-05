import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import { IconButton, Box, AccordionDetails } from "@mui/material";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import HabitField from './SortableItem/Habit/HabitField';
import { Habit } from '@/shared/api/api';


export const SortableItem = ({habit}:{habit: Habit}) =>  {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({id: habit.id});
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  
  return (
    
      <div 
        ref={setNodeRef}
        style={{...style,
          display: "flex",
          alignItems: "center",
          
        }}
        >
          <AccordionDetails sx={{width: "100%", display:"flex", alignItems:"center"}}>
            <IconButton
              {...attributes}
              {...listeners}
              disableRipple
              disableFocusRipple
              sx={{
                cursor: "grab",
                mr: 1,
                "&:active": { cursor: "grabbing" },
                touchAction: "none",
              }}
              style={{touchAction: "none"}}
            >
              <DragIndicatorIcon />
            </IconButton>

          <Box sx={{ flexGrow: 1 }}>
            <HabitField habit={habit} />
          </Box>
        </AccordionDetails>
      </div>
    
  );
}