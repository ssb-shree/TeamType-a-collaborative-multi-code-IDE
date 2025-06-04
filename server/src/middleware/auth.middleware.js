import jwt from "jsonwebtoken";

export const checkAuth = async (req, res, next) => {
  try {
    // check if user has the token
    const cookieToken = req.cookies.jwt || req.cookies.token;
    const headerToken = req.headers.authorization?.startsWith("Bearer ")
      ? req.headers.authorization.split(" ")[1]
      : null;

    const token = cookieToken || headerToken;

    if (!token) {
      return res
        .status(409)
        .json({ message: "cookie not found", success: false });
    }

    // verify the token
    const decodedUser = jwt.verify(token, process.env.JWT_SECRET);
    if (!decodedUser) {
      return res
        .status(404)
        .json({ message: "Invalid Token Provided", success: false });
    }

    // attaching the info to req obj
    req.user = decodedUser;

    // call the next middleware
    next();
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to complete your request", success: false });
    console.log(`Error in check auth middleware ${error.message || error}`);
  }
};
