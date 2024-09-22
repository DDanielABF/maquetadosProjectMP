import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import ReconocimientoFacial from './Auth/ReconocimientoFacial'; // Importar el nuevo componente
import styles from './styles/Login.module.scss';

interface DatosFormularioLogin {
  usuario: string;
  contraseña: string;
  recordar: boolean;
}

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<DatosFormularioLogin>();
  const [errorLogin, setErrorLogin] = useState<string | null>(null); // Estado para credenciales incorrectas
  const [reconocimientoFacialHabilitado, setReconocimientoFacialHabilitado] = useState(true); // Estado para reconocimiento facial
  const [imagenReconocimiento, setImagenReconocimiento] = useState<string | null>(null); // Estado para almacenar la imagen capturada
  const navigate = useNavigate();

  // Manejar el inicio de sesión
  const onSubmit = async (data: DatosFormularioLogin) => {
    try {
      const autenticado = await simularAutenticacion(data); // Simular backend
      if (!autenticado) {
        setErrorLogin('Usuario o contraseña incorrectos'); // Retroalimentación de credenciales incorrectas
      } else {
        navigate('/inicio');
      }
    } catch (error) {
      setErrorLogin('Ocurrió un error, por favor intenta nuevamente.');
    }
  };

  // Simulación para manejar autenticación (Reemplazar por tu API)
  const simularAutenticacion = async (data: DatosFormularioLogin) => {
    if (data.usuario === 'usuario' && data.contraseña === 'contraseña') {
      return true;
    }
    return false;
  };

  // Manejar la imagen capturada desde el componente ReconocimientoFacial
  const manejarImagenCapturada = (imagen: string) => {
    setImagenReconocimiento(imagen);
    alert('Imagen capturada con éxito');
    // Aquí puedes realizar la verificación con el backend o Amazon Rekognition
  };

  return (
    <div className={styles.contenedorLogin}>
      <div className={styles.cajaLogin}>
        <h2 className={styles.titulo}>Iniciar Sesión</h2>
        <form  onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.contenedorInput}>
            <input 
              type="text" 
              placeholder="Usuario" 
              {...register('usuario', { required: true })} 
              className={styles.campoInput}
            />
            {errors.usuario && <span className={styles.error}>El usuario es requerido</span>}
          </div>
          
          <div className={styles.contenedorInput}>
            <input 
              type="password" 
              placeholder="Contraseña" 
              {...register('contraseña', { required: true })} 
              className={styles.campoInput}
            />
            {errors.contraseña && <span className={styles.error}>La contraseña es requerida</span>}
          </div>

          <div className={styles.contenedorRecordar}>
            <label>
              <input type="checkbox" {...register('recordar')} />
              Recordar mis datos
            </label>
            <a href="#" className={styles.olvidasteContraseña}>¿Olvidaste tu contraseña?</a>
          </div>

          {errorLogin && <p className={styles.mensajeError}>{errorLogin}</p>}

          <button type="submit" className={styles.botonLogin}>Iniciar Sesión</button>
        </form>

        {/* Integrar el componente de Reconocimiento Facial */}
        {reconocimientoFacialHabilitado && (
          <ReconocimientoFacial onImagenCapturada={manejarImagenCapturada} />
        )}

        {/* Mostrar la imagen capturada */}
        {imagenReconocimiento && (
          <div>
            <h3>Imagen Capturada:</h3>
            <img src={imagenReconocimiento} alt="Imagen de reconocimiento facial" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
