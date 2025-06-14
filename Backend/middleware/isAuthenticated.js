import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token; // corrected: req.cookie ➜ req.cookies

        if (!token) {
            return res.status(401).json({
                message: "Unauthorized User",
                success: false,
            });
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        if (!decoded) {
            return res.status(401).json({
                message: "Unauthorized token",
                success: false,
            });
        }

        req.id = decoded.userid;
        next();

    } catch (error) {
        console.error("Authentication error:", error);
        return res.status(401).json({
            message: "Authentication failed",
            success: false,
        });
    }
};

export default isAuthenticated;
