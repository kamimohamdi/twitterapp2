const verifyIdentifier = (identifier) => {
  const patternEmail = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/g;

  const patternPhone =
    /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/g;

  const verifyEmail = patternEmail.test(identifier);
  const verifyPhone = patternPhone.test(identifier);

  if (verifyEmail) return { type: "email", valid: true };
  if (verifyPhone) return { type: "phone", valid: true };
  return { valid: false };
};

const verifyValidPassword = (password) => {
  const pattern =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/g;
  return pattern.test(password);
};

export { verifyIdentifier, verifyValidPassword };
