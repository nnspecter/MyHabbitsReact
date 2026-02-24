import { useConfigureSettings } from '@/entities/api/mutations/mutations';
import { Checkbox } from '@mui/material'
import { useEffect, useRef, useState } from 'react'

const ShowHidden = ({value}: {value: boolean}) => {    
    const [hideAll, setHideAll] = useState(value);
    const useConfigureSettingsMutation = useConfigureSettings();
    const isFirstRender = useRef(true);
    
      useEffect(() => {
        if (isFirstRender.current) {
          isFirstRender.current = false;
          return;
        };
        const timer = setTimeout(() => {
          useConfigureSettingsMutation.mutate({
            showHidden: hideAll
          });
        }, 1000);
        return () => clearTimeout(timer);
        }, [hideAll]);
        
    const handleShowHidden = (e: React.ChangeEvent<HTMLInputElement>) => {
        setHideAll(e.target.checked);
    }

    return (
        <label style={{display: "flex", alignItems: "center"}}>
        <p className='smallFont2'>Показывать скрытыe</p>
            <Checkbox
            onChange={(e) => handleShowHidden(e)}
            checked={hideAll}
            sx={{ color: '#454545','&.Mui-checked': {color: '#454545',}}}
            />
        </label>
    )
}

export default ShowHidden