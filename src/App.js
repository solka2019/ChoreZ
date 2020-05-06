import React, { Component } from 'react';
import axios from 'axios';
import { Route, Link } from 'react-router-dom';
// components
import Signup from './components/sign-up';
import LoginForm from './components/login-form';
import Navbar from './components/navbar';
import Home from './components/home';
// EH A PRIMEIRA COISA SENDO CHAMADA NA APP. 
// NA LINHA 17, ELE VAI CHAMAR O REACTDOM QUE VAI RENDER A APP
// BROWSERROUTER - DO REACT QUE FAZ O BROWSER IR PRA APP - CLASS BROWSER ROUTER - VERDE
// A APP EH SEMPRE MEU APP.JS E EH O QUE TEM LA QUE VAI RENDER NA TELA HTML
// -------VER AGORA A APP.JS


// DENTRO DA APP.JS 
// APP IS A CLASS QUE EXTEND COMANDOS DO REACT
// VER O QUE TEM DENTRO DA CLASS: O CONSTRUTOR, O QUE ELE VAI RODAR A PRIMEIRA VEZ QDO A APP EH CRIADA, ELA RODA O CONSTRUTOR DELA, VAI CONSTRUIR O COMPONENT
// E ALI DENTRO SETA O ESTADO DE ALGO, NESSE CASO, DO USER, DO PARENT--- QUAL O USER NAME, LOG NAME, QUANTAS CCAS TEM, QUAIS AS TASKS, E A DATE QUE FOI CRIADA A CONTA
// DEPOIS DISSO, ELE TEM UMA PROPRIEDADE QUE SE CHAMA "GET USER" E QUE DENTRO DELA TEM A FUNCAO "GET PARENT USER " QUE TA LIGADA A "BIND" QUE QDO CHAMAR 
// ESSA FUNCAO VAI ESTAR LIGADA A CLASSE QUE FOI CRIADA ACIMA "APP", ENTAO TUDO O QUE FOR "THIS" VAI SER A APP
class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      username: null,
      name: null,
      children: [],
      tasks: [],
      date: null
    };

    this.getUser = this.getParentUser.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.updateUser = this.updateUser.bind(this);
  }

  componentDidMount() {
    this.getParentUser();
  }

  updateUser (userObject) {
    this.setState(userObject);
  }
// AXIOS EH SIMILAR DO $AJAX , FETCH, E O QUE AXIOS TA FAZENDO EH MANDANDO PROCURAR NO SERVER O PARENT NA APP QUANDO ESTE LOGA PELA PRIMEIRA VEZ
// SE ENCONTRAR, - NO PROJECT 2 A GENTE USOU O FETCH - QUE FAZIA IGUAL O AXIOS
// O AXIOS VAI FAZER A API CALL RELACIONADA AO PARENT E VAI TRAZER A RESPOSTA, DATA, USER
// RES EH O QUE VEM DE VOLTA DA COMUNICACAO COM O SERVIDOR, DATA EH O TIPO DE INFO QUE VEM DA RESPOSTA, E DENTRO DESTE DATA VAI TER VARIOS OBJECTS, 
// E UM DOS OBJECTS VAI SER O "USER" E ESSE "USER" FOI O QUE O SERVIDOR CRIOU. 
// COMO O SERVIDOR MANDA???????????????????????????????????????


  getParentUser() {
    axios.get('/parent/').then(response => {
      console.log('Get parent response: ');
      console.log(response.data);
      if (response.data.user) {
        console.log('Get parent: There is a user saved in the server session: ');
// AGORA vem o metodo "set state", a APP chama o metodo "set state" e o servidor manda dentro do data um json file
        this.setState({
          loggedIn: true,
          username: response.data.user.username
        });

      } else {
        console.log('Get parent: no user');
        this.setState({
          loggedIn: false,
          username: null
        });
      }
    });
  }
// ate aqui tudo o que aconteceu acima foi executado pelo "construtor" , qdo a app foi criada pela primeira vez. Depois dessa criacao do constructor, 
// o React vai chamar o metodo chamado "render" do componente. Essa app.js eh a landing page. Depois do render, qdo o browser chamar a funcao render, pra pintar a tela, 
// retorne pra ele o que ta dentro do que vem apos return: a div ate o final da app.js. 
// Navbar esta em verde, eh uma classe chamada NAVBAR que vai estar nos components
// TUDO O QUE TA VERDE VAI SER CLASSE OU VAI ESTAR NOS COMPONENTS????????????????????????????????
  render() {
    return (
      <div className="App">
   {/* ESSA LINHA DA NAVBAR ABAIXO, VAI PEGAR TUDO O QUE TEM LA NO COMPONENT DE NAVBAR E USAR AQUI, NESSA PARTE DE APP, A PROPRIEDADE LOGGED IN TA SETANDO QDO A NAVBAR FOI CRIADA
   DENTRO DO NAVBAR VAI TER UM RETURN DE UM DIV QUE VAI OBTER TODA A INFO DE COMO CRIAR UM NAVBAR */}
        <Navbar updateUser={this.updateUser} loggedIn={this.state.loggedIn} />

        {/* greet user if logged in: */}
        {
          this.state.loggedIn &&
          <p>Welcome back, {this.state.username}!</p>
        }
        
        {/* Routes to different components */}
        <Route
          exact path="/"
          component={Home} />

        <Route
          path="/login"
          render={() =>
            <LoginForm
              updateUser={this.updateUser}
            />}
        />

        <Route
          path="/signup"
          render={() =>
            <Signup/>}
        />

      </div>
    );
  }
}

export default App;
