import { useAllGroups } from '@/entities/api/queries';
import { ConfigureHabbit } from '@/entities/api/types/settings/groupSettings';
import InputLenght from '@/features/Input/InputLenght';
import { Button, FormControl, Input, InputAdornment, InputLabel, MenuItem, Select, TextField, ToggleButton } from '@mui/material';
import { useEffect, useState } from 'react';
import styles from "./HabitEditor.module.scss"
import DeleteHabitButton from '@/features/SettingsButtons/DeleteHabitButton';
import { StyledToggleButtonGroup, StyledToggleFrequencyButtonGroup } from '@/shared/customComponents/StyledToggleButton';
import CheckIcon from '@mui/icons-material/Check';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Filter1Icon from '@mui/icons-material/Filter1';
import EditNoteIcon from '@mui/icons-material/EditNote';

interface HabitEditorProps {
  habitId: number;
}

const HabitEditor = ({ habitId }: HabitEditorProps) => {
  const { data: allGroupsQuery } = useAllGroups();
  const [habit, setHabit] = useState<ConfigureHabbit | null>(null);
  const group = allGroupsQuery?.data.find(el =>
    el.habits.some(h => h.id === habitId)
  );
  const currentHabit = group?.habits.find(
    h => h.id === habitId
  );

  useEffect(() => {
    if (group && currentHabit) {
      setHabit({
        habitId,
        groupId: group.id,
        name: currentHabit.name,
        hidden: currentHabit.hidden,
        scheduleN: 1
      });
    }
  }, [group, currentHabit, habitId]);

  if (!allGroupsQuery) return <div>Loading...</div>;
  if (!group) return <div>Group not found</div>;
  if (!currentHabit) return <div>Habit not found</div>;
  if (!habit) return <div>Initializing...</div>;

  return (
    <div className={styles.container}>
      <section className={styles.inlineSection}>
        <h2>Параметры привычки</h2>
        <div 
          className={styles.indicator}
          style={habit.hidden ? {backgroundColor: '#b0b0b0aa' } : {color: "#005A3C", backgroundColor: "#69F6B8"}}>{habit.hidden ? 'Cкрыта' : 'Активна'}</div>
      </section>
      <section className={styles.firstLine}>
        <TextField
          label="Название привычки"
          variant="outlined"
          onChange={(e) => setHabit(prev => ({...prev, name: e.target.value}))}
          value={habit.name}
          fullWidth
          inputProps={{ maxLength: 25 }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <InputLenght valueLenght={habit.name.length}/>
              </InputAdornment>
            ),
          }}
        />

        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Группа</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={habit.groupId}
            label="Группа"
            onChange={(e) => setHabit(prev => ({...prev, groupId: e.target.value as number}))}
          >
            {allGroupsQuery?.data && allGroupsQuery.data.map(group => (
              <MenuItem value={group.id} key={`habitSettingsGroupList-${group.id}`}>{group.name}</MenuItem>
            ))}

          </Select>
        </FormControl>
      </section>
      

      <section className={styles.inlineSection}>
        <StyledToggleButtonGroup
          value={currentHabit.type}
          exclusive
          aria-label="text alignment"
          disabled
          sx={{ justifyContent: 'center', width: '100%' }}>
          <ToggleButton value="GENERAL" aria-label="left aligned" sx={{ flex: 1 }}>
            <CheckIcon/>
            Обычная
          </ToggleButton>
          <ToggleButton value="TIME" aria-label="left aligned" sx={{ flex: 1 }}>
            <AccessTimeIcon/>
            Время
          </ToggleButton>
          <ToggleButton value="NUMBER" aria-label="left aligned" sx={{ flex: 1 }}>
            <Filter1Icon/>
            Числовая
          </ToggleButton>
          <ToggleButton value="TEXT" aria-label="left aligned" sx={{ flex: 1 }}>
            <EditNoteIcon/>
            Строковая
          </ToggleButton>
        </StyledToggleButtonGroup>
      </section>

      <section className={styles.rhytmSection}>
            <h2 className='medFont1'>Ритм повторений</h2>
            <div className={styles.select}>
              <h3 className='smallFont1'>Частота</h3>
              <StyledToggleFrequencyButtonGroup
                value={currentHabit.schedule}
                exclusive
                aria-label="text alignment"
                disabled>
                <ToggleButton value="EVERYDAY" >
                  Ежедневно
                </ToggleButton>
                <ToggleButton value="IN_DAY">
                  Через день
                </ToggleButton>
                <ToggleButton value="N_WEEK">
                  Еженедельно
                </ToggleButton>
                <ToggleButton value="N_MONTH">
                  Ежемесячно
                </ToggleButton>

              </StyledToggleFrequencyButtonGroup>
            </div>
      </section>
      <section className={styles.inlineSection}>
            <Button variant='contained'>
              Сохранить
            </Button>
            <DeleteHabitButton habitId={habitId}/>
            
      </section>
    </div>
  );
};

export default HabitEditor;