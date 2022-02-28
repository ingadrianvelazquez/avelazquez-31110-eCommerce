import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { initializeApp } from "firebase/app";

const firebaseConfig = {
	apiKey: "AIzaSyCKwY0_WtlS3qQt8PbfL9Rj59wS3SPE-2g",
	authDomain: "avelazquez-ecommerce.firebaseapp.com",
	projectId: "avelazquez-ecommerce",
	storageBucket: "avelazquez-ecommerce.appspot.com",
	messagingSenderId: "338722195824",
	appId: "1:338722195824:web:b9da18e8244889a1c7e7b5"
};

initializeApp(firebaseConfig);

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById('root')
);

reportWebVitals();
