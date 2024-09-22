import React from 'react';
import { Link } from 'react-router-dom';
import styles from './styles/Inicio.module.scss';

const Inicio = () => {
  return (
    <div className={styles.contenedorInicio}>
      <header className={styles.header}>
        <h1>Bienvenido a PhotoBucket</h1>
        <p>Administra tus álbumes de fotos de manera fácil y rápida</p>
      </header>

      <section className={styles.seccionPrincipal}>
        <div className={styles.opciones}>
          <Link to="/perfil" className={styles.opcion}>
            <h3>Ver Perfil</h3>
            <p>Revisa y edita tu información de perfil.</p>
          </Link>

          <Link to="/albumes" className={styles.opcion}>
            <h3>Ver Álbumes</h3>
            <p>Explora, edita y organiza tus álbumes de fotos.</p>
          </Link>

          <Link to="/subir-imagen" className={styles.opcion}>
            <h3>Subir Imágenes</h3>
            <p>Agrega nuevas imágenes a tus álbumes.</p>
          </Link>

          <Link to="/configuracion" className={styles.opcion}>
            <h3>Configurar Cuenta</h3>
            <p>Personaliza tu cuenta y la configuración de seguridad.</p>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Inicio;
