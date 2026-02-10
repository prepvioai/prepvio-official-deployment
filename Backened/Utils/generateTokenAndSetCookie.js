import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = (res, userId, cookieName = "token") => {
  const token = jwt.sign(
    { id: userId }, // ✅ MUST be `id`
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  const isProduction = process.env.NODE_ENV === "production";

  res.cookie(cookieName, token, {
    httpOnly: true,
    secure: isProduction,           // true in production (HTTPS required)
    sameSite: isProduction ? "none" : "lax",  // "none" for cross-domain in production
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return token;
};