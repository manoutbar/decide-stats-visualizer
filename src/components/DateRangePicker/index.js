import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import DatePicker from '@mui/lab/DatePicker';

const DATE_PICKER_INPUT_FORMAT = "dd/MM/yyyy";

export default function DateRangePicker({ value, onChange }) {
  const [ startDate, endDate ] = value;
  return (
    <Stack 
      direction="row"
      spacing={ 2 }
      alignItems="center"
    >
      <Box>
        <DatePicker
          inputFormat={ DATE_PICKER_INPUT_FORMAT }
          label="Start date"
          value={ startDate }
          onChange={(newValue) => {
            if (typeof onChange === 'function')
              onChange([newValue, endDate]);
          }}
          renderInput={(params) => {
            console.log('renderInput params', params);
            return <TextField {...params} />;
          }}
        />
      </Box>
      <Box>
        <DatePicker
          inputFormat={ DATE_PICKER_INPUT_FORMAT }
          label="End date"
          value={ endDate }
          onChange={(newValue) => {
            if (typeof onChange === 'function')
              onChange([startDate, newValue]);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </Box>
    </Stack>

  )

} 