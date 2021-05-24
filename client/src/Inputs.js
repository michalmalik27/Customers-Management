import React from "react";
import { Controller } from "react-hook-form";

import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";

const Input = ({ control, name, label, type, rules }) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <TextField
          type={type}
          label={label}
          variant="filled"
          value={value}
          onChange={onChange}
          error={!!error}
          helperText={error ? error.message : null}
          fullWidth
          InputLabelProps={{ shrink: true }}
        />
      )}
      rules={rules}
    />
  );
};

export const TextInput = ({ control, name, label, rules }) => {
  return Input({ control, name, label, type: "text", rules });
};

export const NumberInput = ({ control, name, label, rules }) => {
  return Input({ control, name, label, type: "number", rules });
};

export const DateInput = ({ control, name, label, rules }) => {
  return Input({ control, name, label, type: "date", rules });
};

export const SelectInput = ({
  control,
  name,
  label,
  list,
  extractId,
  extractValue,
  rules,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <TextField
          select
          label={label}
          variant="filled"
          value={value}
          onChange={onChange}
          error={!!error}
          helperText={error ? error.message : null}
          fullWidth
          InputLabelProps={{ shrink: true }}
        >
          {list.map((item) => (
            <MenuItem key={extractId(item)} value={extractId(item)}>
              {extractValue(item)}
            </MenuItem>
          ))}
        </TextField>
      )}
      rules={rules}
    />
  );
};
