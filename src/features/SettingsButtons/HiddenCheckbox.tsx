import { Checkbox } from '@mui/material'
import { useConfigureGroup } from '@/shared/api/mutations/mutations';


const HiddenCheckbox = ({id, hidden}: {id: number, hidden: boolean}) => {
    const hiddenMutation = useConfigureGroup();
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        hiddenMutation.mutate({
            groupId: id,
            hidden: e.target.checked
        });
        console.log(id)
    }
  return (
    <div style={{display: "flex", alignItems: "center"}}>
       <div className='smallFont2'>Скрыть</div> 
       <Checkbox 
        onChange={(e)=>handleChange(e)}
        checked={hidden}
        sx={{ color: '#454545','&.Mui-checked': {color: '#454545',}}}

      />
      
    </div>
  )
}

export default HiddenCheckbox