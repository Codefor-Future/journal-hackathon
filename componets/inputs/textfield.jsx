import React from 'react';
import TextField from '@mui/material/TextField';
import { styled } from "@emotion/styled";

const customTextFieldStyles = {
  borderRadius: 10,
  backgroundColor: '#F5F5F5',
  borderColor: '#cccccc',
  fontFamily: 'Lato, sans-serif',
  fontSize: 16,
  padding: '10px 15px',
  color: '#333333',
  '& label.MuiInputLabel-root': {
    color: '#999999',
    fontWeight: 'bold',
  },
  '& label.MuiInputLabel-focused': {
    color: '#007bff',
  },
};

const CustomTextField = styled(TextField)`
  ${customTextFieldStyles};
`;

const StudentTextField = ({ label, ...props }) => {
  return <CustomTextField label={label} {...props} />;
};

export default StudentTextField;
