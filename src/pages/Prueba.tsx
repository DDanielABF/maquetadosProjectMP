import React, { Suspense, lazy } from 'react';
import Login from '../components/Login';
import Registro from '../components/Register';
import Inicio from '../components/Inicio';
import ConfiguracionCuenta from '../components/ConfiguracionCuenta';
import InformacionPersonal from '../components/InformacionPersonal';
// Importación dinámica utilizando React.lazy






function Prueba() {
 

  return (
    <>
      <Login/>
      <div className="sectionRegistro">

      <Registro/>
      </div>
        <div className="sectionInit">
            <Inicio/>
        </div>
        <div className="sectionConfig">
            <ConfiguracionCuenta/>
        </div>
        <div className="infopersonal">
            <InformacionPersonal/>
        </div>
    </>
  )
}

export default Prueba
