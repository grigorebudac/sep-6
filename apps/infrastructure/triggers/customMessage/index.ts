import { CustomMessageTriggerHandler } from 'aws-lambda';

export const handler: CustomMessageTriggerHandler = async (
  event,
  context,
  callback,
) => {
  const code = event.request.codeParameter;
  const username = event.userName;

  const baseUrl =
    process.env.STAGE === 'dev'
      ? 'http://localhost:3000'
      : 'https://sep-6-six.vercel.app/';

  const forgotPasswordMessage = `
      <p>
      Hi, <br /> <br />
      Click <a href="${baseUrl}/forgot-password-submit?code=${code}&username=${username}">here</a> to reset your password.
      </p>
      `;

  const verifyAccountMessage = `
      Hi, <br /> <br />
      Click  <a href="${baseUrl}/callback/confirm-account?code=${code}&username=${username}">Verify Email</a>  to verify your account. <br />
      `;

  if (event.triggerSource === 'CustomMessage_ForgotPassword') {
    event.response.emailSubject = 'Reset your Password';
    event.response.emailMessage = forgotPasswordMessage;
  }

  if (event.triggerSource === 'CustomMessage_SignUp') {
    event.response.emailSubject = 'Confirm your Account';
    event.response.emailMessage = verifyAccountMessage;
  }

  callback(null, event);
};
