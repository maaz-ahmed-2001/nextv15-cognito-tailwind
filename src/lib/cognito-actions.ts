import {
  confirmSignUp,
  resendSignUpCode,
  signIn,
  signOut,
  signUp,
  autoSignIn,
} from "aws-amplify/auth";
import { redirect } from "next/navigation";
import { AllRoutesEnum } from "./enums";
import { getErrorMessage } from "./get-error-message";

const { CONFIRM_SIGNUP, DASHBOARD, LOGIN } = AllRoutesEnum;

export async function handleSignUp(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    const { isSignUpComplete, nextStep, userId } = await signUp({
      username: String(formData.get("email")),
      password: String(formData.get("password")),
      options: {
        userAttributes: {
          email: String(formData.get("email")),
          name: String(formData.get("name")),
        },
        autoSignIn: true,
      },
    });
  } catch (e) {
    getErrorMessage(e);
  }
  redirect(CONFIRM_SIGNUP);
}

export async function handleSendEmailVerificationCode(
  prevState: { message: string; errorMessage: string },
  formData: FormData
) {
  let currentState;
  try {
    await resendSignUpCode({
      username: String(formData.get("email")),
    });
    currentState = {
      ...prevState,
      message: "Verification code sent",
    };
  } catch (e) {
    currentState = {
      ...prevState,
      errorMessage: getErrorMessage(e),
    };
  }
  return currentState;
}

export async function handleConfirmSignUp(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    const { isSignUpComplete, nextStep } = await confirmSignUp({
      username: String(formData.get("email")),
      confirmationCode: String(formData.get("code")),
    });
    await autoSignIn();
  } catch (e) {
    getErrorMessage(e);
  }
  redirect(LOGIN);
}

export async function handleSignIn(
  prevState: string | undefined,
  formData: FormData
) {
  let redirectLink = DASHBOARD;
  try {
    const { isSignedIn, nextStep } = await signIn({
      username: String(formData.get("email")),
      password: String(formData.get("password")),
    });
    if (nextStep.signInStep === "CONFIRM_SIGN_UP") {
      await resendSignUpCode({
        username: String(formData.get("email")),
      });
      redirectLink = CONFIRM_SIGNUP;
    }
  } catch (e) {
    getErrorMessage(e);
  }
  redirect(redirectLink);
}

export async function handleSignOut() {
  try {
    await signOut();
  } catch (error) {
    console.log(getErrorMessage(error));
  }
  redirect(LOGIN);
}
