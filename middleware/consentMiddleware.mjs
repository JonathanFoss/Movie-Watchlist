export default function requireConsent(req, res, next) {
  const { consent } = req.body;
  if (!consent || !consent.tos || !consent.privacy) {
    return res.status(400).json({ message: "User must accept ToS and Privacy Policy" });
  }
  next();
}
