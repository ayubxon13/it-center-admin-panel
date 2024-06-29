import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtected = createRouteMatcher(["(/.*)"]);

const middlewareHandler = (auth: () => { protect: () => void }, req: any) => {
  try {
    if (isProtected(req)) {
      auth().protect();
    }
  } catch (error) {
    console.error("Error in Clerk middleware:", error);
    throw error; // Rethrow the error to ensure Vercel logs it
  }
};

export default clerkMiddleware(middlewareHandler);

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
