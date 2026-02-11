// import passport from "passport";
// import { Strategy as GoogleStrategy } from "passport-google-oauth20";
// import crypto from "crypto";
// import { User } from "../Models/User.js";

// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       callbackURL: process.env.NODE_ENV === "production"
//         ? "https://prepvio-main-backend.onrender.com/api/auth/google/callback"
//         : "/api/auth/google/callback",
//       passReqToCallback: true,
//     },
//     async (req, _, __, profile, done) => {
//       try {
//         const email = profile.emails[0].value;
//         const mode = req.query.state;

//         let user = await User.findOne({ email });

//         if (!user) {
//           // 🚫 If mode is 'login', do not create new user
//           if (mode === "login") {
//             return done(null, false, { message: "Account doesn't exist. Please sign up first." });
//           }

//           user = await User.create({
//             name: profile.displayName,
//             email,
//             isVerified: true,
//             authProvider: "google",
//             googleId: profile.id,
//             password: crypto.randomBytes(32).toString("hex"), // dummy
//           });
//           user.isNewUser = true; // ✅ Mark as new user for welcome notification
//         }

//         // 🚫 Prevent password login for Google users
//         if (user.authProvider !== "google") {
//           return done(null, false);
//         }

//         return done(null, user);
//       } catch (err) {
//         return done(err, null);
//       }
//     }
//   )
// );

import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import crypto from "crypto";
import { User } from "../Models/User.js";
import config from "./config.js";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.NODE_ENV === "production"
        ? `${config.API_BASE_URL}/api/auth/google/callback`
        : "/api/auth/google/callback",
      passReqToCallback: true,
      scope: ["profile", "email"], // ✅ ADD THIS LINE
    },
    async (req, _, __, profile, done) => {
      console.log("🔥 Google Strategy Callback Triggered");
      console.log("Profile Email:", profile.emails?.[0]?.value);
      console.log("Mode (state):", req.query.state);

      try {
        const email = profile.emails[0].value;
        const mode = req.query.state;

        let user = await User.findOne({ email });

        console.log("User found in DB:", user ? "Yes" : "No");

        if (!user) {
          console.log("User does not exist. Mode:", mode);
          if (mode === "login") {
            console.log("❌ Blocking login for non-existent user");
            return done(null, false, { message: "Account doesn't exist. Please sign up first." });
          }

          console.log("✅ Creating new Google user");
          user = await User.create({
            name: profile.displayName,
            email,
            isVerified: true,
            authProvider: "google",
            googleId: profile.id,
            password: crypto.randomBytes(32).toString("hex"),
          });
          user.isNewUser = true;
        } else {
          console.log("Existing user provider:", user.authProvider);

          // ❌ BLOCK PROVIDER MISMATCH
          if (user.authProvider !== "google") {
            console.log("❌ Auth provider mismatch: User registered with email/password");
            return done(null, false, { message: "This email is registered with email/password. Please login using your password instead." });
          }
        }

        console.log("✅ Google Auth Success");
        return done(null, user);
      } catch (err) {
        console.error("❌ Google Auth Error:", err);
        return done(err, null);
      }
    }
  )
);
