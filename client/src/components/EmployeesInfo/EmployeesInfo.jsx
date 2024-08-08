//import Box from "@mui/material/Box";
//import TextField from "@mui/material/TextField";
//import { styled } from '@mui/material/styles';
//import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
//import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
//import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
//import Tooltip from '@mui/material/Tooltip';
//import Stack from '@mui/material/Stack';
//import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import React from 'react';
import { DatePicker } from 'antd';


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

export const EmployeesInfo = () => {
  /*return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          id="filled-search"
          label="Search field"
          type="search"
          variant="filled"
        />
        <TextField
          id="standard-search"
          label="Search field"
          type="search"
          variant="standard"
        />

        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DateTimePicker',]}>
                <DemoItem label={<Label componentName="DateTimePicker" valueType="date time" />}>
                    <DateTimePicker />
                </DemoItem>
          </DemoContainer>
          </LocalizationProvider>
      </div>
    </Box>
  );*/

  return <DatePicker />;
}
