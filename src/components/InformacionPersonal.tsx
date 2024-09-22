import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from './styles/InformacionPersonal.module.scss';

interface DatosPersonales {
  nombreUsuario: string;
  correoElectronico: string;
  imagenPerfil: FileList;
}

const InformacionPersonal = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<DatosPersonales>();
  const [mensaje, setMensaje] = useState<string | null>(null);

  // Función para manejar la actualización de información personal
  const onSubmit = (data: DatosPersonales) => {
    // Aquí iría la lógica para actualizar los datos del usuario (petición al backend)
    console.log('Datos enviados:', data);
    setMensaje('Información actualizada con éxito');
  };

  return (
    <div className={styles.contenedorInformacion}>
      <h2>Información Personal</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.campo}>
          <input type="text" placeholder="Nombre de usuario" {...register('nombreUsuario', { required: true })} />
          {errors.nombreUsuario && <span className={styles.error}>El nombre de usuario es requerido</span>}
        </div>

        <div className={styles.campo}>
          <input type="email" placeholder="Correo electrónico" {...register('correoElectronico', { required: true })} />
          {errors.correoElectronico && <span className={styles.error}>El correo es requerido</span>}
        </div>

        <div className={styles.campo}>
          <input type="file" {...register('imagenPerfil', { required: true })} />
          {errors.imagenPerfil && <span className={styles.error}>La imagen de perfil es requerida</span>}
        </div>

        {mensaje && <p className={styles.mensajeExito}>{mensaje}</p>}

        <button type="submit" className={styles.boton}>Guardar Cambios</button>
      </form>
    </div>
  );
};

export default InformacionPersonal;
