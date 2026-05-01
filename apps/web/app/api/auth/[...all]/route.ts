import { auth } from "@/auth";
import { headers } from "next/headers";;
import { toNextJsHandler } from "better-auth/next-js";

export const { GET, POST } = toNextJsHandler(auth);
