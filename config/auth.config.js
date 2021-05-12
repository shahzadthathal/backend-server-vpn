module.exports = {
  secret: process.env.JWAT_SECRET || "jwt-secret-key-vpn-server",
  jwatExpiresIn: 86400,
};