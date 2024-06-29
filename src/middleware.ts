import {clerkMiddleware, createRouteMatcher} from "@clerk/nextjs/server";

const isProtected = createRouteMatcher(["(/.*)"]);

export default clerkMiddleware((auth, req) => {
  if (isProtected(req)) {
    auth().protect();
  }
}, {
  secretKey: process.env.CLERK_SECRET_KEY
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
