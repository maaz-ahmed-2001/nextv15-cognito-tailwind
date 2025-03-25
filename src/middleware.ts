import { type NextRequest, NextResponse } from "next/server";
import { authenticatedUser } from "./lib/amplify-server-util";
import { AllRoutesEnum } from "./lib/enums";

async function middleware(request: NextRequest) {
  const { DASHBOARD, LOGIN } = AllRoutesEnum;
  const response = NextResponse.next();
  const user = await authenticatedUser({ request, response });

  const isOnDashboard = request.nextUrl.pathname === DASHBOARD;
  //   const isOnAdminArea =
  //     request.nextUrl.pathname.startsWith("/dashboard/admins");
  if (isOnDashboard) {
    if (!user) return NextResponse.redirect(new URL(LOGIN, request.nextUrl));
    // if (isOnAdminArea && !user.isAdmin)
    //   return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
    return response;
  }
  if (user) {
    return NextResponse.redirect(new URL(DASHBOARD, request.nextUrl));
  }
}

export const config = {
  /*
   * Match all request paths except for the ones starting with
   */
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};

export default middleware;
