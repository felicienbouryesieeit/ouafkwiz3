import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';

const ContactUs = () => {
  const formemail : any = useRef('');
  React
  const sendEmail = (e:any) => {
    e.preventDefault();







    // Récupérer les données du formemailulaire
    const formemailData = new FormData(formemail.current);
    const userEmail = formemailData.get('email'); // Seul l'email vient du formemailulaire
    
    // Préparer les paramètres du template avec des valeurs définies par script
    const templateParams = {
      title: 'Contact depuis le site web', // Titre défini par script
      email: userEmail,
      message: 'Un utilisateur a soumis le formemailulaire de contact.', 
      // Vous pouvez ajouter plus d'informemailations si nécessaire
      submission_date: new Date().toLocaleString(),
      user_agent: navigator.userAgent
    };




    emailjs
      .send('service_fnvdvmy', 'template_wz0anjj', templateParams, {
        publicKey: 'Fqx8TAT0xBmkXQkNl',
      })
      .then(
        () => {
          console.log('SUCCESS!');
        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );
  };

  return (
    <form ref={formemail} onSubmit={sendEmail}>
      <label>Name</label>
      <input type="text" name="title" />
      <label>Email</label>
      <input type="email" name="email" />
      <label>Message</label>
      <textarea name="message" />
      <input type="submit" value="Send" />
    </form>
  );
};

export default ContactUs;