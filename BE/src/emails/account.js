const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'psybev@abv.bg',
        subject: 'Thanks for joining in!',
        text: `Welcome to the app, ${name}. Let us know how you get along with the app`
    })
};

const sendGoodbyeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'psybev@abv.bg',
        subject: 'Sorry for loosing you!',
        text: `Goodbye, ${name}. Let us know why you leave us. And how we can improve.`
    })
};

module.exports = {
    sendWelcomeEmail,
    sendGoodbyeEmail
}