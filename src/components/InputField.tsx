import {Text, TextInput} from 'react-native-paper';
import {useRef, useState} from 'react';
import {KeyboardTypeOptions} from 'react-native';

type InputLabelProps = {
  label: string;
  keyboardType?: KeyboardTypeOptions;
  value: any;
  secureTextEntry?: boolean;
  icon?: boolean;
  mode?: 'flat' | 'outlined';
  disabled?: boolean;
  placeholder?: string;
  error?: boolean | string;
  onChangeText?: (args: any) => void;
  multiline?: boolean;
  onFocus?: (args: any) => void;
  onBlur?: (args: any) => void;
};

export const InputField = (props: InputLabelProps) => {
  const inputRef = useRef(null);
  const [touched, setTouched] = useState(false);
  const {
    keyboardType,
    value,
    label,
    secureTextEntry,
    multiline,
    icon,
    onFocus,
    onChangeText,
    error,
    onBlur,
    placeholder,
    mode,
    disabled,
  } = props;

  const handleBlur = (e: any) => {
    setTouched(true);
    onBlur && onBlur(e);
  };

  return (
    <>
      <TextInput
        mode={mode}
        placeholder={placeholder}
        multiline={multiline}
        keyboardType={keyboardType}
        ref={inputRef}
        disabled={disabled}
        error={Boolean(error && touched)}
        onBlur={handleBlur}
        onChangeText={onChangeText}
        onFocus={onFocus}
        value={value}
        label={label}
        secureTextEntry={secureTextEntry}
        right={secureTextEntry ? <TextInput.Icon icon="eye" /> : null}
      />
      {error && touched && <Text>{error}</Text>}
    </>
  );
};
