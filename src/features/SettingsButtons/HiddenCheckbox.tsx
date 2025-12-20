import { Checkbox } from '@mui/material'
import { useConfigureGroup } from '../../api/mutations';

const HiddenCheckbox = ({id, hidden}) => {
    const hiddenMutation = useConfigureGroup();
    
    const handleChange = (e) => {
        hiddenMutation.mutate({
            groupId: id,
            hidden: e.target.checked
        });
        console.log(id)
    }
  return (
    <div>
       Скрыть 
       <Checkbox 
        onChange={(e)=>handleChange(e)}
        checked={hidden}
        sx={{ color: '#454545','&.Mui-checked': {color: '#454545',}}}
      >
      </Checkbox>
    </div>
  )
}

export default HiddenCheckbox