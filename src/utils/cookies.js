export const validateCookies = (ctx) => {
  const sessionId = ctx.req.cookies['connect.sid'];

  return sessionId ? ({
    Cookie: `connect.sid=${sessionId}`
  }) : false;
};
