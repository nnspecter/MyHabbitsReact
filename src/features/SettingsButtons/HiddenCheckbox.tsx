import { Checkbox } from '@mui/material'
import { useConfigureGroup } from '@/entities/api/mutations/mutations';
import { useEffect, useRef, useState } from 'react';


const HiddenCheckbox = ({id, hidden}: {id: number, hidden: boolean}) => {
    const[checked, setChecked] = useState(hidden);
    const hiddenMutation = useConfigureGroup();
    const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    };
    const timer = setTimeout(() => {
      hiddenMutation.mutate({
        groupId: id,
        hidden: checked
      });
    }, 1000);
    return () => clearTimeout(timer);
    }, [checked]);
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(e.target.checked);
    }

  return (
    <div style={{display: "flex", alignItems: "center"}}>
      <label style={{display: "flex", alignItems: "center"}}>
       <div className='smallFont2'>Скрыть</div> 
       <Checkbox 
        onChange={(e)=>handleChange(e)}
        checked={checked}
        sx={{ color: '#454545','&.Mui-checked': {color: '#454545',}}}

      />
      </label>
      
    </div>
  )
}

export default HiddenCheckbox