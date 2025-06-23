import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export function AutocompleteDepartamento({ departamentos, value, onChange }) {
  return (
    <Autocomplete
      options={departamentos}
      getOptionLabel={(option) => option.nombre || ''}
      value={departamentos.find(dep => dep.nombre === value) || null}
      onChange={(_, newValue) => onChange(newValue ? newValue.nombre : '')}
      renderInput={(params) => <TextField {...params} label="Departamento" fullWidth />}
      isOptionEqualToValue={(option, value) => option.nombre === value.nombre}
    />
  );
}

export function AutocompleteMunicipio({ municipios, value, onChange, disabled }) {
  return (
    <Autocomplete
      options={municipios}
      getOptionLabel={(option) => option.nombre || ''}
      value={municipios.find(muni => muni.nombre === value) || null}
      onChange={(_, newValue) => onChange(newValue ? newValue.nombre : '')}
      renderInput={(params) => <TextField {...params} label="Municipios" fullWidth />}
      isOptionEqualToValue={(option, value) => option.nombre === value.nombre}
      disabled={disabled}
    />
  );
}
