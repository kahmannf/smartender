const email = require('emailjs');
const config = require('../config');

const logger = require('../logger');

const server = email.server.connect(config.email);

const sendmail = (message) => {
    server.send(message, (err, message) => {
        if(err) {
            logger.error(err);
        }
        else {
          logger.log('Email send');
        } 
    });
};


module.exports = {
    registrationmail: (user) => {

        var message = {
            text: 'Hello '+ user.alias +',\n\n'
                    + 'To activate your Smartender account please follow this link:\n' 
                    + config.general.baseurl_client + 'complete-register/' + user.registerkey + '\n\n'
                    + '\n\n\n\n'
                    + 'This email was automatically generated. Do not reply to this address. You can always contact the support via support@smartender.kahmann.com \n', 
            from: 'Smartender Account System <noreply@smartender.kahmann.com>',
            to: user.alias + ' <' + user.email + '>', 
            subject: 'Account-Activation',
            attachment:
            [
                {
                    data: '<html><p>Hello '+ user.alias +',</p>'
                    + '<p>To activate your Smartender account please follow this link:</p>' 
                    + '<a href="' + config.general.baseurl_client + 'complete-register/' + user.registerkey + '">Set your password</a>'
                    + '<br/><br/><br/><br/>'
                    + '<p>This email was automatically generated. Do not reply to this address. You can always contact the support via support@smartender.kahmann.com</p>'
                    + '</html>', 
                    alternative:true
                }
            ]
        };

        sendmail(message);
    },
}