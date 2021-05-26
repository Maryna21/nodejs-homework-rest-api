const sgMail = require('@sendgrid/mail')
const Mailgen = require('mailgen')
require('dotenv').config()

class EmailService {
    #sender = sgMail
    #GenerateTemplate = Mailgen
    constructor(env){
     switch (env) {
         case 'development':
             this.link = 'http://localhost:3000'
             break;
         case 'production':
                this.link = 'link for production'
                break;
     
         default:
            this.link = 'http://localhost:3000'
             break;
     }
    }
    #createTemplateVerifyEmail(verifyToken, name){
        const mailGenerator = new this.#GenerateTemplate({
            theme: 'cerberus',
            product: {
                name: 'System contacts',
                link: this.link
            }
        });
       const email = {
            body: {
                name,
                intro: 'Welcome to Mailgen! We\'re very excited to have you on board.',
                action: {
                    instructions: 'To get started with Mailgen, please click here:',
                    button: {
                        color: '#22BC66', // Optional action button color
                        text: 'Confirm your account',
                        link: `${this.link}/api/users/verify/${verifyToken}`
                    }
                },
            }
        };
        const emailBody = mailGenerator.generate(email)
        return emailBody
    }
  async sendVerifyEmail(){
      this.#sender.setApiKey(process.env.SENDGRID_API_KEY)
  const msg = {
    to: 'test@example.com', // Change to your recipient
    from: 'test@example.com', // Change to your verified sender
    subject: 'Sending with SendGrid is Fun',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',
  }
  this.#sender.send(msg)
}
}
module.exports = EmailService