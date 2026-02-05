import { useStore } from '@/shared/ZustandStore/store';
import SettingsIcon from '@mui/icons-material/Settings';
import { SettingsStyledButton } from '@/features/muiThemes/SettingsStyledButton';


export const ToGroupSettingsButton = ({groupId} : {groupId: number}) => {
    const{ setSelectedGroupId} = useStore();
  return (
    <SettingsStyledButton
        variant="contained"
        onClick={() => setSelectedGroupId(groupId)} sx={{background: "#454545"}}
        
    >
        <div className='smallFont1' style={{color: "#ffff", display: "flex"}}> 
          <SettingsIcon/>
        </div>
    </SettingsStyledButton>

  )
}

