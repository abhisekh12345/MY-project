const notFoundMiddleware = (req,res) => res.status(400).send("Route doesn't exist");

export default notFoundMiddleware;

