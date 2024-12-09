import React, { useState } from 'react';
import styles from './Contact.module.css';

const Contact = () => {
  const [form, setForm] = useState({ nombre: '', correo: '', mensaje: '' });
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Formulario enviado:', form);
    setSuccessMessage(
      '¡Gracias por contactarnos! Nos pondremos en contacto contigo pronto.',
    );
    setForm({ nombre: '', correo: '', mensaje: '' });
  };

  return (
    <div className={styles.container}>
      <h1>Contáctanos</h1>
      <p>
        Completa el siguiente formulario y nos pondremos en contacto contigo lo
        antes posible.
      </p>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="nombre">Nombre</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            placeholder="Tu nombre"
            value={form.nombre}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="correo">Correo Electrónico</label>
          <input
            type="email"
            id="correo"
            name="correo"
            placeholder="Tu correo electrónico"
            value={form.correo}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="mensaje">Mensaje</label>
          <textarea
            id="mensaje"
            name="mensaje"
            placeholder="Escribe tu mensaje"
            value={form.mensaje}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <button type="submit" className={styles.submitButton}>
          Enviar
        </button>
      </form>
      {successMessage && (
        <p className={styles.successMessage}>{successMessage}</p>
      )}
    </div>
  );
};

export default Contact;
