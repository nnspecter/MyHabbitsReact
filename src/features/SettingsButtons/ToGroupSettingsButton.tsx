import { useStore } from '@/entities/ZustandStore/store';
import SettingsIcon from '@mui/icons-material/Settings';
import { SettingsStyledButton } from '@/features/muiThemes/SettingsStyledButton';


export const ToGroupSettingsButton = ({groupId} : {groupId: number}) => {
    const{ setSelectedGroupId} = useStore();
  return (
    <SettingsStyledButton
        variant="contained"
        onClick={() => setSelectedGroupId(groupId)} sx={{background: "var(--buttonColor)"}}
        
    >
        <div className='smallFont1' style={{color: "var(--background)", display: "flex"}}> 
          <SettingsIcon/>
        </div>
    </SettingsStyledButton>

  )
}

