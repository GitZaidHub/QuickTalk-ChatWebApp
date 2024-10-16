import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
    const authorization = req.headers.authorization;

    if (authorization && authorization.startsWith("Bearer")) {
        const token = authorization.split(' ')[1]; // Extract token from "Bearer <token>"

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({ error: "Unauthorized access. Invalid token" });
            }

            // Assign the decoded token to req.user (in your case, the token contains only the id)
            req.user = decoded; // decoded contains {id}

            next(); // Proceed to the next middleware
        });
    } else {
        return res.status(401).json({ error: "Unauthorized access. No token provided" });
    }
};

export default authMiddleware;
