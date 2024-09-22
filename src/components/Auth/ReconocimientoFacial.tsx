import React, { useState, useRef } from 'react';
import styles from '../styles/Login.module.scss';

interface ReconocimientoFacialProps {
  onImagenCapturada: (imagen: string) => void; // Función que recibirá la imagen capturada
}

const ReconocimientoFacial: React.FC<ReconocimientoFacialProps> = ({ onImagenCapturada }) => {
  const [capturando, setCapturando] = useState(false); // Estado para indicar si estamos capturando
  const videoRef = useRef<HTMLVideoElement | null>(null); // Referencia para el video

  // Función para iniciar la cámara y capturar la imagen
  const iniciarReconocimientoFacial = async () => {
    try {
      // Acceder a la cámara del usuario
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      const videoElement = videoRef.current;
      if (videoElement) {
        videoElement.srcObject = stream;
        videoElement.play();
      }

      setCapturando(true);

      // Capturar la imagen después de 2 segundos
      setTimeout(() => {
        capturarImagen(stream);
      }, 2000);

    } catch (error) {
      console.error('No se pudo acceder a la cámara: ', error);
      alert('No se pudo acceder a la cámara. Por favor, revisa los permisos y asegúrate de que estás en un entorno HTTPS.');
    }
  };

  // Función para capturar la imagen desde el video
  const capturarImagen = (stream: MediaStream) => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    // Crear un canvas para capturar el fotograma del video
    const canvas = document.createElement('canvas');
    canvas.width = videoElement.videoWidth;
    canvas.height = videoElement.videoHeight;
    const contexto = canvas.getContext('2d');

    if (contexto) {
      // Dibujar el contenido del video en el canvas
      contexto.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

      // Convertir el contenido del canvas a data URL (imagen base64)
      const dataURL = canvas.toDataURL('image.png');

      // Detener la cámara
      stream.getTracks().forEach(track => track.stop());

      // Enviar la imagen capturada al componente padre
      onImagenCapturada(dataURL);

      setCapturando(false);
    }
  };

  return (
    <div>
      <button  className={styles.botonReconocimientoFacial} onClick={iniciarReconocimientoFacial} disabled={capturando}>
        {capturando ? 'Capturando imagen...' : 'Iniciar Reconocimiento Facial'}
      </button>

      {/* Video que mostrará el stream de la cámara */}
      {capturando && (
        <div>
          <video ref={videoRef} style={{ display: 'none' }} /> {/* Video oculto mientras captura */}
        </div>
      )}
    </div>
  );
};

export default ReconocimientoFacial;
