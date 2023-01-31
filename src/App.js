import React, { Component } from 'react';
import Buscador from "./componentes/Buscador";
import Resultado from "./componentes/Resultado";


class App extends Component {
  state ={
    termino : "",
    imagenes : [],
    pagina:''
  }

  scroll = () => {
    const elemento = document.querySelector('.jumbotron');
    elemento.scrollIntoView('smoot', 'start')
  }

  paginaSiguiente = () => {
    // leer el state de la pagina actual
    let pagina = this.state.pagina;
    // sumar uno a la pagina actual
    pagina ++;
    //agregar el cambio al state

    this.setState({
      pagina
    },() => {
      this.consultarApi();
      this.scroll();
    });
    // console.log(pagina);
  }

  paginaAnterior = () => {
    // leer el state de la pagina actual
    let pagina = this.state.pagina;

    // Si el state es 1, no ir hacia atras
    if(pagina === 1) return null;
    // sumar uno a la pagina actual
    pagina --;
    //agregar el cambio al state

    this.setState({
      pagina
    },() => {
      this.consultarApi();
      this.scroll();
    });
    // console.log(pagina);
  }

  consultarApi = () => {
    const pagina = this.state.pagina;
    const url = `https://pixabay.com/api/?key=33247888-7f9569fa5037100d07b42d749&q=${this.state.termino}&per_page=30&page=${pagina}`;
    console.log(url);
    fetch(url)
      .then(respuesta => respuesta.json())
      .then(resultado => this.setState({imagenes: resultado.hits}));
  }

  datosBusqueda = (termino) => {
    this.setState({
      termino:termino,
      pagina:1
    }, () =>  {
      this.consultarApi();
    });
  }

  render(){
    return (
      
      <div className="app container">
        <div className="jumbotron">
          <p className="lead text-center">Buscador de imagenes</p>
          <Buscador 
            datosBusqueda={this.datosBusqueda}
          />

          <div className='row justify-content-center'>
            <Resultado 
              imagenes ={this.state.imagenes}
              paginaAnterior = {this.paginaAnterior}
              paginaSiguiente = {this.paginaSiguiente}
            />
          </div>
          
        </div>
        {/* {this.state.termino} */}
      </div>
    );
  }
  
}

export default App;
