"use client";
import './globals.css';
import React from 'react';
import { Provider } from 'react-redux';
import App from './app';
import store from '@/store';

export default function Home() {
  return (
    <Provider store={store}>
        <App /> 
    </Provider>
    
  )
}
