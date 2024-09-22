import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from './styles/ConfiguracionCuenta.module.scss';

interface ConfiguracionForm {
  nuevaContraseña: string;
  confirmarContraseña: string;
}

const ConfiguracionCuenta = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<ConfiguracionForm>();
  const [mensaje, setMensaje] = useState<string | null>(null);

  // Función para manejar la actualización de configuración
  const onSubmit = (data: ConfiguracionForm) => {
    if (data.nuevaContraseña !== data.confirmarContraseña) {
      setMensaje('Las contraseñas no coinciden');
      return;
    }

    // Aquí iría la lógica para actualizar la contraseña del usuario (petición al backend)
    console.log('Configuración enviada:', data);
    setMensaje('Contraseña actualizada con éxito');
  };

  return (
    <div className={styles.contenedorConfiguracion}>
      <h2>Configuración de la Cuenta</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.campo}>
          <input type="password" placeholder="Nueva contraseña" {...register('nuevaContraseña', { required: true })} />
          {errors.nuevaContraseña && <span className={styles.error}>La nueva contraseña es requerida</span>}
        </div>

        <div className={styles.campo}>
          <input type="password" placeholder="Confirmar nueva contraseña" {...register('confirmarContraseña', { required: true })} />
          {errors.confirmarContraseña && <span className={styles.error}>Debes confirmar la nueva contraseña</span>}
        </div>

        {mensaje && <p className={styles.mensajeExito}>{mensaje}</p>}

        <button type="submit" className={styles.boton}>Guardar Cambios</button>
      </form>
    </div>
  );
};

export default ConfiguracionCuenta;
