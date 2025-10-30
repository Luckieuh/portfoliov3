'use client';

import { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    prenom: '',
    nom: '',
    objet: '',
    message: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setSubmitStatus('error');
        setErrorMessage(data.error || 'Une erreur est survenue');
        return;
      }

      setSubmitStatus('success');
      setFormData({
        prenom: '',
        nom: '',
        objet: '',
        message: '',
      });

      // Réinitialiser le message de succès après 5 secondes
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage('Erreur de connexion. Veuillez réessayer.');
      console.error('Erreur lors de l\'envoi du formulaire:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='w-full h-fit flex flex-wrap items-start bg-neutral-200 dark:bg-neutral-800 mt-20'>
      <div className='w-full md:w-[40%] h-full flex justify-center flex-col p-4'>
        <img src="/contact.svg" alt="Me contacter" className='hidden dark:block min-w-[65%] min-h-[20%]'/>
        <img src="/contactDark.svg" alt="Me contacter" className='dark:hidden block min-w-[65%] min-h-[20%]'/>
        <div className='flex flex-row flex-wrap gap-3 mt-4 ml-8'>
          {/* Boutons de contact */}
          <div className='flex flex-row flex-wrap gap-3'>
            <a href="https://www.instagram.com/lucsar.tsn/" className="group cursor-pointer w-fit h-fit relative py-1 items-center justify-center overflow-hidden rounded-lg border-1 px-6 flex transition-all ease-[cubic-bezier(.47,1.64,.41,.8)] duration-400 hover:scale-108 cursor-default" style={{ backgroundColor: '#5C1742', borderColor: '#FF00E5', color: '#FF00E5' }}>
              <img src='/Instagram.webp' className='h-5 mb-1 inline-block mr-2' alt='Instagram'/>
              Instagram
              <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-100%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(100%)]">
                <div className="relative h-full w-8 bg-white/20"></div>
              </div>
            </a>
            
            <a href="https://www.linkedin.com/in/lucas-thomassin-7ba03634a/" className="group cursor-pointer w-fit h-fit relative py-1 items-center justify-center overflow-hidden rounded-lg border-1 px-6 flex transition-all ease-[cubic-bezier(.47,1.64,.41,.8)] duration-400 hover:scale-108 cursor-default" style={{ backgroundColor: '#162C42', borderColor: '#0037FF', color: '#0037FF' }}>
              <img src='/LinkedIn.webp' className='h-5 mb-1 inline-block mr-2' alt='LinkedIn'/>
              LinkedIn
              <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-100%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(100%)]">
                <div className="relative h-full w-8 bg-white/20"></div>
              </div>
            </a>

            <a href="https://www.youtube.com/@LucsarTsn" className="group cursor-pointer w-fit h-fit relative py-1 items-center justify-center overflow-hidden rounded-lg border-1 px-6 flex transition-all ease-[cubic-bezier(.47,1.64,.41,.8)] duration-400 hover:scale-108 cursor-default" style={{ backgroundColor: '#db0700d0', borderColor: '#b30e08ff', color: '#FFFFFF' }}>
              <img src='/Youtube.svg' className='h-5 mb-1 inline-block mr-2 scale-90' alt='Youtube'/>
              Youtube
              <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-100%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(100%)]">
                <div className="relative h-full w-8 bg-white/20"></div>
              </div>
            </a>

            <a href="mailto:lucas2.thom@gmail.com" className="group cursor-pointer w-fit h-fit relative py-1 items-center justify-center overflow-hidden rounded-lg border-1 px-6 flex transition-all ease-[cubic-bezier(.47,1.64,.41,.8)] duration-400 hover:scale-108 cursor-default" style={{ backgroundColor: '#575757', borderColor: '#FFFFFF', color: '#FFFFFF' }}>
              <img src='/mail.svg' className='h-5 mb-1 inline-block mr-2' alt='Email'/>
              lucas2.thom@gmail.com
              <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-100%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(100%)]">
                <div className="relative h-full w-8 bg-white/20"></div>
              </div>
            </a>
          </div>
        </div>
      </div>

      <div className='w-full md:w-[60%] h-full flex justify-center p-4 m-auto'>
        <div className='w-[80%] m-auto p-4'>
          <h2 className='font-black text-4xl'>M'envoyer un message</h2>
          
          {submitStatus === 'success' && (
            <div className='mt-5 p-4 bg-green-500/20 border border-green-500 rounded text-green-400'>
              ✓ Message envoyé avec succès! Je vous recontacterai au plus vite.
            </div>
          )}
          
          {submitStatus === 'error' && (
            <div className='mt-5 p-4 bg-red-500/20 border border-red-500 rounded text-red-400'>
              ✗ Erreur: {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className='mt-5'>
            <div className='flex flex-col m-auto'>
              <div className='w-full flex justify-between'>
                <input 
                  type="text" 
                  name="prenom"
                  placeholder="Votre prénom" 
                  value={formData.prenom}
                  onChange={handleChange}
                  required
                  className='p-2 mb-4 border border-neutral-500 rounded-md w-[48%] dark:placeholder:text-neutral-300 placeholder:text-neutral-700' 
                />
                <input 
                  type="text" 
                  name="nom"
                  placeholder="Votre nom" 
                  value={formData.nom}
                  onChange={handleChange}
                  required
                  className='p-2 mb-4 border border-neutral-500 rounded-md w-[48%] dark:placeholder:text-neutral-300 placeholder:text-neutral-700' 
                />
              </div>
              <div>
                <input 
                  type="text" 
                  name="objet"
                  placeholder="Objet" 
                  value={formData.objet}
                  onChange={handleChange}
                  required
                  className='p-2 mb-4 border border-neutral-500 rounded-md w-full dark:placeholder:text-neutral-300 placeholder:text-neutral-700' 
                />
                <textarea 
                  name="message"
                  placeholder="Votre message" 
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className='p-2 mb-4 h-32 border border-neutral-500 rounded-sm w-full dark:placeholder:text-neutral-300 placeholder:text-neutral-700' 
                />
              </div>
              <button 
                type="submit" 
                disabled={isLoading}
                className='bg-orange-500/70 dark:bg-orange-400/30 text-white rounded w-fit flex inline-flex justify-center gap-2 items-center group w-fit h-fit relative items-center justify-center overflow-hidden rounded-lg border border-orange-400 cursor-pointer py-2 px-6 flex transition-all ease-[cubic-bezier(.47,1.64,.41,.8)] duration-400 hover:scale-108 disabled:opacity-50 disabled:cursor-not-allowed'
              >
                {isLoading ? 'Envoi en cours...' : 'Envoyer'}
                <svg className='block' width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8.62808 11.1601L13.4742 6.31397M18.4316 3.35645L14.341 16.651C13.9744 17.8425 13.7909 18.4385 13.4748 18.636C13.2005 18.8074 12.8609 18.836 12.5623 18.7121C12.2178 18.5692 11.9383 18.0111 11.3807 16.8958L8.7897 11.7139C8.7012 11.5369 8.65691 11.4488 8.5978 11.3721C8.54535 11.304 8.48481 11.2427 8.41676 11.1903C8.34182 11.1325 8.25517 11.0892 8.08608 11.0046L2.89224 8.40772C1.77693 7.85006 1.21923 7.57098 1.07632 7.22656C0.95238 6.92787 0.980645 6.588 1.152 6.31375C1.34959 5.99751 1.94555 5.8138 3.13735 5.44709L16.4319 1.35645C17.3689 1.06815 17.8376 0.924119 18.154 1.0403C18.4297 1.1415 18.647 1.35861 18.7482 1.63428C18.8644 1.9506 18.7202 2.41904 18.4322 3.35506L18.4316 3.35645Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-100%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(100%)]">
                  <div className="relative h-full w-8 bg-white/20">
                  </div>
                </div>
              </button>
            </div>
          </form>             
        </div>
      </div>
    </div>
  );
}
