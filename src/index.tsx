import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RSVP } from './RSVP';
import reportWebVitals from './reportWebVitals';
import {CollapsibleMenu} from "./Menu";

// const menu = ReactDOM.createRoot(document.getElementById('menu-react'));
// menu.render(
//     <CollapsibleMenu />
// );

const rsvp = ReactDOM.createRoot(document.getElementById('rsvp-react'));
rsvp.render(
    <RSVP />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
