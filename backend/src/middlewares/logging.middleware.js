export async function requestLogging(req, res, next) {
    console.log(`[TIME] ${new Date().toLocaleString()} [PROTOCOL] ${req.protocol} [REQ] ${req.method} [PATH] ${req.path}`);
    next();
}