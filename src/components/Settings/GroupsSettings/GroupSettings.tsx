"use client"
import styles from "./GroupSettings.module.scss"
import DeleteButton from '@/features/SettingsButtons/DeleteButton'
import NewGroupButton from '@/features/SettingsButtons/NewGroupButton'
import HiddenCheckbox from '@/features/SettingsButtons/HiddenCheckbox'
import { ToGroupSettingsButton } from '@/features/SettingsButtons/ToGroupSettingsButton'
import { HabitsGroup } from '@/entities/api/types/table'

interface GroupSettingsProps {
  groups: HabitsGroup[];

}

const GroupSettings= ({groups}: GroupSettingsProps) => {

  return (
    <div className={styles.GroupSettings}>
      
        
        {groups.map((group) => (
            <div key= {`groupsSettings-${group.id}`} className={styles.group}>
                <div>
                     <div className='settingsTruncated smallFont2'>{group.name} </div>
                </div>
                <HiddenCheckbox id={group.id} hidden={Boolean(group.hidden)}></HiddenCheckbox>
                <ToGroupSettingsButton groupId={group.id} />

                <DeleteButton groupId={group.id}/>
            </div>
        ))}
        <NewGroupButton/>
    </div>

  )
}

export default GroupSettings