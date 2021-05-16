import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import TodoListApp from './TodoListApp';
import { ThemeProvider } from 'styled-components';
import { theme, GlobalStyle } from './constants/style.js';

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    <TodoListApp />
  </ThemeProvider>,
  document.getElementById('root')
);
