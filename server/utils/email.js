const nodemailer = require('nodemailer');
const nodemailerSendgrid = require('nodemailer-sendgrid');

const sendEmail = async opt => {
  const transport = nodemailer.createTransport(
    nodemailerSendgrid({
      apiKey: process.env.SEND_GRID_API_KEY
    })
  );

  let email = {};
  switch (opt.type) {
    case 'profileActivation':
      email = {
        from: 'mediabiro.temp@gmail.com',
        to: opt.email,
        subject: opt.subject,
        text: opt.message,
        html: `
      <div>
        <h4>Novi korisnik ${opt.user.name}, zatražio je aktiviranje profila.</h4>
        <p>Medij: ${opt.user.company}</p>
        <p>E-mail: ${opt.user.email}</p>
        <p>Mobilni telefon: ${opt.user.mobilePhone}</p>
        <p>Broj telefona redakcije: ${opt.user.editorsPhoneNumber}</p>
        <p>Puno ime glavnog urednika: ${opt.user.mainEditorFullName}</p>
        <p>E-mail glavnog urednika: ${opt.user.mainEditorEmail}</p>
      </div>
      `
      };
      break;
    case 'activationSuccessful':
      email = {
        from: 'mediabiro.temp@gmail.com',
        to: opt.user.email,
        subject: opt.subject,
        html: `
        <!doctype html>
        <html lang="en">      
          <head>
            <meta charset="utf-8">
          </head>

          <body>
            <h1 style="margin-bottom: 50px">Dobrodošli: <span style="color:#FF4500; font-size:2rem">${
              opt.user.name
            }</span></h1>
            <p>Dobrodošli na <span style="color:#FF4500">MEDIABIRO</span>, uspešno ste aktivirali svoj profil. Pridružite name se u pregledu dešavanja iz regiona.</p>
            <h3 style="margin-bottom: 50px">Klikom na dugme ispod pristupite našoj web-aplikaciji</h3>
            <table width="100%" border="0" cellspacing="0" cellpadding="0">
              <tr>
                <td>
                  <table border="0" cellspacing="0" cellpadding="0">
                    <tr>
                      <td align="center" style="border-radius: 3px;" bgcolor="#FF4500"><a href="http://localhost:3000/" target="_blank" style=" font-size: 16px; font-family: Helvetica, Arial, sans-serif; color: #ffffff; text-decoration: none; text-decoration: none;border-radius: 3px; padding: 12px 18px; border: 1px solid #e9703e; display: inline-block;">Idi na MEDIABIRO</a></td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>

          </body>
        </html>     
  `
      };
      break;
    case 'passwordChanged':
      email = {
        from: 'mediabiro.temp@gmail.com',
        to: opt.user.email,
        subject: opt.subject,
        html: `
      <!doctype html>
      <html lang="en">      
        <head>
          <meta charset="utf-8">
        </head>

        <body>
          <h1 style="margin-bottom: 50px">Poštovani: <span style="color:#FF4500; font-size:2rem">${
            opt.user.name
          }</span></h1>
          <p>Vaša lozinka za pristup aplikaciji <span style="color:#FF4500">MEDIABIRO</span> je promenjena.</p>
          <p>Ukoliko niste Vi promenili lozinku molimo Vas da kontaktirate našu podršku putem live-chat prozora na našoj strani.</p>
          <h3 style="margin-bottom: 50px">Klikom na dugme ispod pristupite našoj web-aplikaciji</h3>
          <table width="100%" border="0" cellspacing="0" cellpadding="0">
            <tr>
              <td>
                <table border="0" cellspacing="0" cellpadding="0">
                  <tr>
                    <td align="center" style="border-radius: 3px;" bgcolor="#FF4500"><a href="http://localhost:3000/" target="_blank" style=" font-size: 16px; font-family: Helvetica, Arial, sans-serif; color: #ffffff; text-decoration: none; text-decoration: none;border-radius: 3px; padding: 12px 18px; border: 1px solid #e9703e; display: inline-block;">Idi na MEDIABIRO</a></td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>

        </body>
      </html>     
`
      };
      break;
    default:
      email = {
        from: 'mediabiro.temp@gmail.com',
        to: opt.email,
        subject: opt.subject,
        text: opt.message,
        html: `
      <div>
        <p>${opt.message}</p>
        <h4>Naslov: <span style="color:#FF4500">${opt.title}</span></h4>
      </div>
      <table width="100%" border="0" cellspacing="0" cellpadding="0">
      <tr>
        <td>
          <table border="0" cellspacing="0" cellpadding="0">
            <tr>
              <td align="center" style="border-radius: 3px;" bgcolor="#FF4500"><a href=${
                opt.link
              } target="_blank" style=" font-size: 16px; font-family: Helvetica, Arial, sans-serif; color: #ffffff; text-decoration: none; text-decoration: none;border-radius: 3px; padding: 12px 18px; border: 1px solid #e9703e; display: inline-block;">Pogledaj &rarr;</a></td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
    
    <p>Ukoliko više ne želite da primate obaveštenja stranice MediaBiro kliknite <a href=${'#'}>OVDE</a></p>
    `
      };
  }

  await transport.sendMail(email);
};

module.exports = sendEmail;
