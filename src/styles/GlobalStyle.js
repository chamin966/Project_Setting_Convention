import React from 'react';
import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset}

  *{
    box-sizing: border-box;
    font-family: serif !important;
    font-weight: 900;
  }
`;

export default GlobalStyle;
