import React from 'react';
import ReactDOM from 'react-dom';
import Suggestions from './components/Suggestions.jsx';
import styles from  './components/main.module.css'

// global.Suggestions = Suggestions;
// global.React = React;
// global.ReactDOM = ReactDOM;

const id = window.location.pathname.substring(13);

ReactDOM.render(<Suggestions id={id} />, document.getElementById('Suggestions'));
