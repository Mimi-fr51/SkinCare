import nodemailer from 'nodemailer';

// Configuration du transporteur email
const createTransporter = () => {
  return nodemailer.createTransporter({
    service: 'gmail', // Ou autre service (SendGrid, Mailgun, etc.)
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
};

// Email de confirmation de commande
export const sendOrderConfirmation = async (user, order) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: user.email,
      subject: `BEAUTY-51 - Confirmation de votre commande #${order._id}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #d4af37;">Merci pour votre commande !</h2>
          <p>Bonjour ${user.firstName},</p>
          <p>Votre commande <strong>#${order._id}</strong> a bien été reçue.</p>
          
          <h3>Détails de la commande :</h3>
          <div style="background: #f9f9f9; padding: 15px; border-radius: 5px;">
            ${order.orderItems.map(item => `
              <p>${item.quantity}x ${item.name} - ${item.price}€</p>
            `).join('')}
            <hr>
            <p><strong>Total : ${order.totalPrice}€</strong></p>
          </div>
          
          <p>Nous vous tiendrons informé de l'expédition.</p>
          <p>L'équipe BEAUTY-51 💄</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log('✅ Email de confirmation envoyé à:', user.email);
  } catch (error) {
    console.error('❌ Erreur envoi email:', error);
  }
};

// Email de bienvenue
export const sendWelcomeEmail = async (user) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: user.email,
      subject: 'Bienvenue chez BEAUTY-51 !',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #d4af37;">Bienvenue ${user.firstName} !</h2>
          <p>Merci de vous être inscrit(e) sur BEAUTY-51.</p>
          <p>Découvrez nos produits de beauté soigneusement sélectionnés pour vous.</p>
          <p>À très vite sur notre site !</p>
          <p>L'équipe BEAUTY-51 ✨</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log('✅ Email de bienvenue envoyé à:', user.email);
  } catch (error) {
    console.error('❌ Erreur envoi email bienvenue:', error);
  }
};

// Email de réinitialisation de mot de passe
export const sendPasswordReset = async (user, resetToken) => {
  try {
    const transporter = createTransporter();
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
    
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: user.email,
      subject: 'BEAUTY-51 - Réinitialisation de mot de passe',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #d4af37;">Réinitialisez votre mot de passe</h2>
          <p>Bonjour ${user.firstName},</p>
          <p>Cliquez sur le lien ci-dessous pour réinitialiser votre mot de passe :</p>
          <a href="${resetUrl}" 
             style="background: #d4af37; color: white; padding: 12px 24px; 
                    text-decoration: none; border-radius: 5px; display: inline-block;">
            Réinitialiser mon mot de passe
          </a>
          <p style="margin-top: 20px; color: #666;">
            Ce lien expirera dans 1 heure.
          </p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log('✅ Email de reset envoyé à:', user.email);
  } catch (error) {
    console.error('❌ Erreur envoi email reset:', error);
  }
};

export default {
  sendOrderConfirmation,
  sendWelcomeEmail,
  sendPasswordReset
};