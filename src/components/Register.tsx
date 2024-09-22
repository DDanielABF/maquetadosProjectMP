import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from './styles/Registro.module.scss';

interface DatosRegistro {
  usuario: string;
  correo: string;
  contraseña: string;
  confirmarContraseña: string;
  imagenPerfil: FileList;
}

const Registro = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<DatosRegistro>();
  const [mensajeError, setMensajeError] = useState<string | null>(null);
  
  // Función para manejar el registro
  const onSubmit = (data: DatosRegistro) => {
    // Verificar si las contraseñas coinciden
    if (data.contraseña !== data.confirmarContraseña) {
      setMensajeError('Las contraseñas no coinciden');
      return;
    }

    // Lógica para registrar al usuario (llamadas a la API o backend)
    console.log('Datos del registro:', data);
    // Aquí puedes realizar una petición para registrar al usuario
  };

  return (
    <div className={styles.contenedorRegistro}>
      <h2>Registro de Usuario</h2>
      <form  className={styles.formRegistro} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.campo}>
          <input type="text" placeholder="Usuario" {...register('usuario', { required: true })} />
          {errors.usuario && <span className={styles.error}>El usuario es requerido</span>}
        </div>

        <div className={styles.campo}>
          <input type="email" placeholder="Correo" {...register('correo', { required: true })} />
          {errors.correo && <span className={styles.error}>El correo es requerido</span>}
        </div>

        <div className={styles.campo}>
          <input type="password" placeholder="Contraseña" {...register('contraseña', { required: true })} />
          {errors.contraseña && <span className={styles.error}>La contraseña es requerida</span>}
        </div>

        <div className={styles.campo}>
          <input type="password" placeholder="Confirmar Contraseña" {...register('confirmarContraseña', { required: true })} />
          {errors.confirmarContraseña && <span className={styles.error}>Debes confirmar tu contraseña</span>}
        </div>

        <div className={styles.campo}>
          <input type="file" {...register('imagenPerfil', { required: true })} />
          {errors.imagenPerfil && <span className={styles.error}>Debes subir una imagen de perfil</span>}
        </div>

        {mensajeError && <p className={styles.mensajeError}>{mensajeError}</p>}

        <button type="submit" className={styles.boton}>Registrar</button>
      </form>
    </div>
  );
};

export default Registro;
