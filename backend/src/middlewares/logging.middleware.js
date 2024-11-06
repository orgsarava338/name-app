exports.requestLogging = async (req, res, next) => {
    console.log(`{REQ} [TIME] ${new Date().toLocaleString()} [PROTOCOL] ${req.protocol} [METHOD] ${req.method} [PATH] ${req.path}`);
    next();
}