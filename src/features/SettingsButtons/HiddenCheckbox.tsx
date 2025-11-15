import { Checkbox } from '@mui/material'
import React from 'react'
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
        <Checkbox onChange={(e)=>handleChange(e)} checked={hidden}  ></Checkbox>
    </div>
  )
}

export default HiddenCheckbox