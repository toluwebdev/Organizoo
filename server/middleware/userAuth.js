import jwt from "jsonwebtoken";

export async function Auth(req, res, next) {
  const token = req.cookies?.token; // <-- Fix 1: use req.cookies.token

  if (!token) {
    return res
      .status(403)
      .json({ success: false, message: "Not Authorized. Login Again." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded?.id) {
      return res
        .status(403)
        .json({ success: false, message: "Not Authorized. Login Again." });
    }

    req.userId = decoded.id;
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
