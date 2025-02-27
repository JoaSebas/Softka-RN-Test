import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {globalStyles} from '../../styles/globalStyles';
import ErrorMessage from './ErrorMessage';

const DatePickerField = ({
  label,
  date,
  setDate,
  errors = [],
}: {
  label: string;
  date: Date;
  setDate: (date: Date) => void;
  errors?: string[];
}) => {
  const [open, setOpen] = React.useState(false);

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(date);
  };

  return (
    <View>
      <Text style={globalStyles.inputText}>{label}</Text>
      <TouchableOpacity
        testID={`open-picker-${label}`}
        style={globalStyles.dateInput}
        onPress={() => setOpen(true)}>
        <Text>{formatDate(date)}</Text>
      </TouchableOpacity>
      {open && (
        <DateTimePicker
          testID={`date-time-picker-${label}`}
          value={date}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setOpen(false);
            if (selectedDate) {
              const adjustedDate = new Date(
                selectedDate.getFullYear(),
                selectedDate.getMonth(),
                selectedDate.getDate(),
                date.getHours(),
                date.getMinutes(),
                date.getSeconds(),
              );
              setDate(adjustedDate);
            }
          }}
        />
      )}
      <ErrorMessage errors={errors} />
    </View>
  );
};

export default DatePickerField;
