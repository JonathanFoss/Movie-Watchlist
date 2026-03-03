function requireConsent(req, res, next) {
  const { consent } = req.body;
  if (!consent || !consent.privacy) {
    return res.status(400).json({ message: "You must accept ToS and Privacy Policy to create an account!" });
  }
  if (!consent.tos) {
    return res.status(400).json({ message: "You must accept the Terms of Service!" });
  }
  if (!consent.privacy) {
    return res.status(400).json({ message: "You must accept the privacy settings!" });
  }
  next();
}

export default requireConsent;