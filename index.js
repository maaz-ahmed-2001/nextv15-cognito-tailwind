
exports.handler = async (event) => {
  
  const {'custom:type':accountType,email, 'custom:first_name': firstName}= event?.request?.userAttributes ||{}
  console.log(event,'<<<---EVENT-----', event?.request?.userAttributes)
  const userPoolId = event?.userPoolId
  const username =  firstName ? firstName.charAt(0).toUpperCase() + firstName.substring(1) : email
  
  
  // TEST
  

// ... existing code for handling SMS forwarding ...

// Function to send email using SES

  // TEST
  let baseURL=''
  
 
  switch (userPoolId) {
    case process.env.COGNITO_USER_POOL_TALENT_ID_DEV:
    case process.env.COGNITO_USER_POOL_ID_DEV:
      
      baseURL=process.env.BASE_URL_DEV
      break;
    case process.env.COGNITO_USER_POOL_TALENT_ID_STAGE:
    case process.env.COGNITO_USER_POOL_ID_STAGE:
      
      baseURL=process.env.BASE_URL_STAGE
      break;
    case process.env.COGNITO_USER_POOL_ADMIN_ID_DEV:
      
      baseURL=process.env.BASE_URL_ADMIN_DEV
      break;
    case process.env.COGNITO_USER_POOL_ADMIN_ID_STAGE:
      
      baseURL=process.env.BASE_URL_ADMIN_STAGE
      break;
    case process.env.COGNITO_USER_POOL_ADMIN_ID_PROD:
      
      baseURL=process.env.BASE_URL_ADMIN_PROD
      break;
    default:
    
    baseURL= process.env.BASE_URL_PROD
      // code
  }
  const forgetPasswordTemplate = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap"
      rel="stylesheet"
    />
  </head>
  <body
    style="
      margin: 0;
      font-family: 'Inter', sans-serif !important;
      background: rgba(0, 0, 0, 0.05);
    "
  >
    <div style="max-width: 640px; margin: 0px auto; padding: 20px 0">
      <table
        style="
          background-color: #fff;
          width: 100%;
          font-family: 'Inter', sans-serif !important;
          padding: 24px 32px 32px 32px;
        "
        cellpadding="0"
        cellspacing="0"
      >
        <thead>
          <!-- message for the user -->

          <tr>
            <td width="100%" style="text-align: center; padding: 0 0 24px 0">
              <img
                src="https://cdn.globallyhired.com/icons/GH-app.png"
                style="display: block; margin: 0px auto; width: 188px"
                alt="8link"
              />
            </td>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>
              <div
                style="
                  color: var(--gray-900, #111827);
                  font-family: 'Inter', sans-serif;
                  word-wrap: break-word;
                "
              >
                <span
                  style="
                    font-family: 'Inter', sans-serif;
                    font-size: 16px;
                    line-height: 26px;
                    display: block;
                  "
                  >Hi ${username},</span
                >
                <span
                  style="
                    font-family: 'Inter', sans-serif;
                    font-size: 16px;
                    line-height: 26px;
                  "
                >
                  <p style="margin: 0; padding: 0; margin-top: 10px">
                    We’ve received a request to reset your password on GloballyHired.
                  </p>
                </span>
              </div>
            </td>
          </tr>

          <tr>
            <td style="font-family: 'Inter', sans-serif">
              <a
                href="${baseURL}/reset-password?mode=resetPassword&email=${email}&type=${accountType}&code={####}"
                target="_blank"
                style="
                  margin-top: 20px;
                  text-decoration: none;
                  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.05);
                  border-radius: 6px;
                  background: #4f46e5;
                  font-weight: 500;
                  font-size: 14px;
                  line-height: 20px;
                  color: #ffffff;
                  display: inline-block;
                  padding: 9px 17px;
                  cursor: pointer;
                "
              >
                Reset password
              </a>
            </td>
          </tr>

          <tr>
            <td>
              <div
                style="
                  color: var(--gray-900, #111827);
                  font-family: 'Inter', sans-serif;
                  word-wrap: break-word;
                  margin-top: 20px;
                "
              >
                <span
                  style="
                    font-family: 'Inter', sans-serif;
                    font-size: 16px;
                    line-height: 26px;
                  "
                >
                  <p style="margin: 0; padding: 0; margin-top: 10px">
                    If you no longer need to change your password, ignore this email and nothing will happen. If you didn’t initiate this request and have concerns of suspected unauthorized activity, please
                    <a
                      style="
                        color: #4f46e5;
                        font-family: 'Inter', sans-serif;
                        font-style: normal;
                        font-weight: 400;
                        text-decoration-line: underline;
                      "
                      target="_blank"
                      href="https://globallyhired.com/"
                      >contact our support team.</a
                    >
                  </p>
                </span>
              </div>
            </td>
          </tr>
        </tbody>

        <tfoot>
          <tr>
            <td style="padding-top: 32px">
              <div
                style="
                  border-top: 2px solid #e5e7eb;
                  padding-top: 12px;
                  font-family: 'Inter', sans-serif;
                  font-size: 12px;
                  font-weight: 500;
                  line-height: 20px;
                "
              >
                <span style="white-space: nowrap">
                  <a
                    href="${baseURL}/account-settings?view=email-notifications"
                    target="_blank"
                    style="
                      color: #4f46e5;
                      line-height: 20px;
                      font-weight: 500;
                      display: inline-block;
                      vertical-align: middle;
                    "
                    >Manage your notifications</a
                  >
                </span>

                <div
                  style="
                    word-wrap: break-word;
                    font-family: 'Inter', sans-serif;
                    font-size: 12px;
                    font-weight: 500;
                    line-height: 20px;
                    margin-top: 5px;
                  "
                >
                  This is an automated notification, so you can’t reply
                  directly. However, you can
                  <a
                    style="
                      color: #4f46e5;
                      font-family: 'Inter', sans-serif;
                      font-style: normal;
                      font-weight: 400;
                      text-decoration-line: underline;
                    "
                    href="https://globallyhired.com/"
                    target="_blank"
                    >message us</a
                  >
                  on GloballyHired or search our
                  <a
                    style="
                      color: #4f46e5;
                      font-family: 'Inter', sans-serif;
                      font-style: normal;
                      font-weight: 400;
                      text-decoration-line: underline;
                    "
                    href="https://globallyhired.com/"
                    target="_blank"
                    >Help Center</a
                  >
                  for faster answers!
                </div>
              </div>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  </body>
</html>
`; 
const signUpTemplate = `<!DOCTYPE html>

<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap"
      rel="stylesheet"
    />
    <title>Document</title>
    <style type="text/css">
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: "Inter", sans-serif !important;
      }
      body {
        font-family: "Inter", sans-serif;
        margin: 0;
        background: rgba(0, 0, 0, 0.05);
      }
      table {
        margin: 0 auto;
        margin-top: 16px;
        background-color: #fff;
        max-width: 640px;
      }
      .logo {
        height: 84px;
        display: flex;
        justify-content: center;
        align-items: center;
        /* background-image: url("globally-FE/public/general/Logo.svg");
        display: flex;
        justify-content: center;
        margin: 0 auto;
        background-position: left center;
        object-fit: cover;
        background-repeat: no-repeat;
        background-size: auto; */
      }
      .logo > img {
        width: 188px;
        height: 36px;
        margin: auto;
      }
      .banner {
        max-width: 640px;
        height: 246px;
        background-image: url("https://cdn.globallyhired.com/icons/email-template-cover-banner.png");
        background-position: center;
        object-fit: cover;
        background-repeat: no-repeat;
        background-size: cover;
      }
      .heading {
        color: #111827;
        font-style: normal;
        font-weight: 700;
        font-size: 24px;
        line-height: 32px;
        margin-top: 32px;
      }
      .content {
        padding: 32px;
      }
      .para {
        font-size: 16px;
        font-weight: 400;
        line-height: 28px;
        color: #6B7280;
        margin-top: 20px;
        margin-bottom: 32px;
      }
      .para-2 {
        font-family: "Inter";
        font-style: normal;
        font-weight: 400;
        font-size: 12px;
        line-height: 20px;
        color: #6B7280;
      }
      .confirm-your-email > button {
        border: none;
        background: #4F46E5;
        color: #fff;
        padding: 13px 25px;
        font-weight: 500;
        font-size: 16px;
        line-height: 24px;
        border-radius: 6px;
        margin-bottom: 32px;
      }
      .divider {
        max-width: 576px;
        height: 1px;
        background: #E5E7EB;
        margin-bottom: 12px;
      }
      .confirm-button {
        cursor: pointer;
      }
    </style>
  </head>
  <body
    style="
      margin: 0;
      font-family: 'Inter', sans-serif !important;
      background: rgba(0, 0, 0, 0.05);
      padding: 16px 10px;
    "
  >
    <table style="border-spacing: 0">
      <tbody>
        <tr>
          <td>
            <div class="main-container">
              <section>
                <div class="sub-container">
                  <div class="head">
                    <div class="logo">
                      <img
                        src="https://cdn.globallyhired.com/icons/GH-app.png"
                      />
                    </div>
                  </div>
                  <div class="main">
                    <div class="banner"></div>
                    <div class="content">
                      <h1 class="heading">Welcome to GloballyHired</h1>
                      <p class="para">
                        Thanks for registering an account with us. Before we get
                        started, we'll need to verify your email.
                      </p>
                      <a
                        href="${baseURL}/signin?type=${accountType}&verify_email=${email}&code={####}"
                        class="confirm-your-email"
                      >
                        <button class="confirm-button">Confirm my email</button>
                      </a>
                      <div class="divider"></div>
                      <p class="para-2">
                        If you did not sign up for a GloballyHired account, you
                        can ignore this email and the account will be deleted.
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </body>
</html>
`;


  
    if (event.triggerSource === "CustomMessage_ForgotPassword") {
      event.response.emailMessage = forgetPasswordTemplate;
      event.response.emailSubject = `Reset your password`;
    } else if  (["CustomMessage_SignUp","CustomMessage_ResendCode"].includes(event.triggerSource)) {
      
      event.response.emailMessage = signUpTemplate;
      event.response.emailSubject = `Confirm your email with GloballyHired`;
    } else if(event.triggerSource ==="CustomMessage_Authentication") {
       console.log(event.response.smsMessage, "AAAAAAA");
        const mfaCode = event.request.codeParameter;
        event.response.smsMessage = `Your verification code is: ${mfaCode}`;
        console.log(event.response.smsMessage, "__event.response.smsMessage__")
        
    }
    
    return event;
  };