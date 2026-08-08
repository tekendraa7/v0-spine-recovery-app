import app from "../artifacts/api-server/src/app";

// Vercel invokes this Express application per request. Do not call app.listen
// here: serverless functions are given the request and response by Vercel.
export default app;
