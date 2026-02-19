import { Checkbox } from '@mui/material'
import { useConfigureGroup } from '@/shared/api/mutations/mutations';
import { useState } from 'react';


const HiddenCheckbox = ({id, hidden}: {id: number, hidden: boolean}) => {
    const[checked, setChecked] = useState(hidden);
    const hiddenMutation = useConfigureGroup();
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(e.target.checked);
        hiddenMutation.mutate({
            groupId: id,
            hidden: e.target.checked
        });
        console.log(id)
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