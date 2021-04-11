import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Gomoku from './Gomoku';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider } from 'styled-components';

const theme = {
  colors: {
    bg_main: '#fff',
    bg_card: '#eeede7',
    bg_board: '#d89f67',
    bg_danger: '#e7d2cc',
    bg_safe: '#738580',
    bg_notice: '#e5d7be',
    font_white: '#fff',
    font_main: '#5a5a5a',
    shadow: '#ced4da',
    btn_main: '#868b8e',
    btn_danger: '#c44b4f',
    btn_save: '#746c70',
  },
};

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Gomoku />
  </ThemeProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
