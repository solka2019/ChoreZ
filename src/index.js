import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom'; //don't need to specify localhost url in axios http address


//style
import 'spectre.css/dist/spectre.min.css';
import 'spectre.css/dist/spectre-icons.css';
import './index.css';


serviceWorker.register();
// DEPOIS QUE A APP FOI LIDA, O NAVBAR FOI BAIXADO, VOLTA PRA CA, PRO INDEX ONDE O BROWSER ROUTER VAI PINTAR NA TELA DA APP, NO BROWSER. 
ReactDOM.render(
	<BrowserRouter>
		<App />
	</BrowserRouter>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();


// EH A PRIMEIRA COISA SENDO CHAMADA NA APP. 
// NA LINHA 17, ELE VAI CHAMAR O REACTDOM QUE VAI RENDER A APP
// BROWSERROUTER - DO REACT QUE FAZ O BROWSER IR PRA APP - CLASS BROWSER ROUTER - VERDE
// A APP EH SEMPRE MEU APP.JS E EH O QUE TEM LA QUE VAI RENDER NA TELA HTML
// -------VER AGORA A APP.JS


// DENTRO DA APP.JS 
// APP IS A CLASS QUE EXTEND COMANDOS DO REACT
// VER O QUE TEM DENTRO DA CLASS: 