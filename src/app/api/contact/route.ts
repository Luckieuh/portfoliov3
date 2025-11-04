import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Configuration du transporteur d'email
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASSWORD,
  },
});

export async function POST(request: NextRequest) {
  try {
    const { prenom, nom, objet, message } = await request.json();

    // Validation des champs
    if (!prenom || !nom || !objet || !message) {
      return NextResponse.json(
        { error: 'Tous les champs sont obligatoires' },
        { status: 400 }
      );
    }

    // Vérifier les variables d'environnement
    if (!process.env.GMAIL_USER || !process.env.GMAIL_PASSWORD) {
      console.error('Variables d\'environnement Gmail manquantes');
      console.error('GMAIL_USER:', process.env.GMAIL_USER ? '✓' : '✗');
      console.error('GMAIL_PASSWORD:', process.env.GMAIL_PASSWORD ? '✓' : '✗');
      return NextResponse.json(
        { error: 'Configuration email incomplète - Variables d\'environnement manquantes (GMAIL_USER ou GMAIL_PASSWORD)' },
        { status: 500 }
      );
    }

    // Email à envoyer à Lucas
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: process.env.GMAIL_USER, // L'email pour recevoir les messages
      subject: `Nouveau message de ${prenom} ${nom}: ${objet}`,
      html: `
        <h2>Portfolio - Nouveau message reçu</h2>
        <p><strong>De:</strong> ${prenom} ${nom}</p>
        <p><strong>Objet:</strong> ${objet}</p>
        <p><strong>Message: </strong>${message.replace(/\n/g, '<br>')}</p>
        <div style="margin-top: 20px;">
          <img src="https://pub-7a5618b2bad74f5d9f5721a8568cece7.r2.dev/footerMail.jpg" alt="Logo Lucas Thomassin" style="width:50%; height:auto;"/>
        </div>
      `,
    };

    // Email de confirmation à l'utilisateur
    const confirmationEmail = {
      from: process.env.GMAIL_USER,
      to: process.env.GMAIL_USER, // À adapter si vous avez l'email de l'utilisateur
      subject: 'Confirmation de reception de votre message',
      html: `
        <h2>Merci pour votre message!</h2>
        <p>Bonjour ${prenom},</p>
        <p>J'ai bien reçu votre message et je vous recontacterai au plus vite.</p>
        <p>À bientôt !</p>
        <p>Lucas Thomassin</p>
        <div style="margin-top: 20px;">
          <img src="https://pub-7a5618b2bad74f5d9f5721a8568cece7.r2.dev/footerMail.jpg" alt="Logo Lucas Thomassin" style="width:50%; height:auto;"/>
        </div>
      `,
    };

    // Envoyer les deux emails
    await transporter.sendMail(mailOptions);
    await transporter.sendMail(confirmationEmail);

    return NextResponse.json(
      { success: 'Message envoyé avec succès!' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Erreur complète lors de l\'envoi du mail:', error);
    
    // Envoyer plus de détails sur l'erreur en développement
    const errorMessage = error instanceof Error ? error.message : 'Erreur inconnue';
    
    return NextResponse.json(
      { error: 'Erreur lors de l\'envoi du message', details: errorMessage },
      { status: 500 }
    );
  }
}
