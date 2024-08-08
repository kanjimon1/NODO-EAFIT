// client/src/components/FormComponent.js
import React from 'react';
//import Box from "@mui/material/Box";
//import TextField from "@mui/material/TextField";
//import { styled } from '@mui/material/styles';
//import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
//import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
//import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
//import Tooltip from '@mui/material/Tooltip';
//import Stack from '@mui/material/Stack';
//import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

//import InputLabel from '@mui/material/InputLabel';
//import MenuItem from '@mui/material/MenuItem';
//import FormControl from '@mui/material/FormControl';
//import Select from '@mui/material/Select';

//date time picker
/*const ProSpan = styled('span')({
    display: 'inline-block',
    height: '1em',
    width: '1em',
    verticalAlign: 'middle',
    marginLeft: '0.3em',
    marginBottom: '0.08em',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundImage: 'url(https://mui.com/static/x/pro.svg)',
  });
  
  function Label({ componentName, valueType, isProOnly }) {
    const content = (
      <span>
        <strong>{componentName}</strong> for {valueType} editing
      </span>
    );
  
    if (isProOnly) {
      return (
        <Stack direction="row" spacing={0.5} component="span">
          <Tooltip title="Included on Pro package">
            <a
              href="https://mui.com/x/introduction/licensing/#pro-plan"
              aria-label="Included on Pro package"
            >
              <ProSpan />
            </a>
          </Tooltip>
          {content}
        </Stack>
      );
    }
  
    return content;
  }*/

    /*
export const ExtraHours = () => {
  return (
    console.log("Hola esto es una prueba");
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "50ch" },
      }}
      noValidate
      autoComplete="off"
    >
    <form action="" id="HorasExtras">
      <article>
        <section id="horasextras">
          <label htmlFor="employee">Id Empleado:</label>         
          <TextField
            required
            id="filled-required"
            label="Employee"
            defaultValue="Enter employee"
            variant="filled"
         />
          <label htmlFor="job">Cargo:</label>          
          <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Cargo</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={1}                
                label="Job"
                >
                <MenuItem value={1}>Devops</MenuItem>
                <MenuItem value={2}>Data Analyst</MenuItem>
                <MenuItem value={3}>Security</MenuItem>
            </Select>
            </FormControl>
        </section>
        <section>
          <label htmlFor="manager">Id Gerente:</label>          
          <TextField
            required
            id="filled-required"
            label="Manager"
            defaultValue="Enter manager id"
            variant="filled"
         />
          <label htmlFor="date">Seleccionar fecha:</label>          
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DateTimePicker',]}>
                <DemoItem label={<Label componentName="DateTimePicker" valueType="date time" />}>
                    <DateTimePicker />
                </DemoItem>
          </DemoContainer>
          </LocalizationProvider>
        </section>
      </article>
      <button type="submit">Aplicar</button>
    </form>    
    </Box>
  );
};
*/