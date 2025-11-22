export interface PasswordConfig {
  hasLowercase?: boolean;
  hasUppercase?: boolean;
  hasNumbers?: boolean;
  hasSymbols?: boolean;
  length?: number;
}

export const generatePassword = ({
  hasLowercase = true,
  hasUppercase = false,
  hasNumbers = false,
  hasSymbols = false,
  length = 8,
}: PasswordConfig = {}) => {
  const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
  const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numberChars = "0123456789";
  const symbolChars = "!@#$%^&*()_+~`|}{[]:;?><,./-=";

  let availableChars = "";
  if (hasLowercase) availableChars += lowercaseChars;
  if (hasUppercase) availableChars += uppercaseChars;
  if (hasNumbers) availableChars += numberChars;
  if (hasSymbols) availableChars += symbolChars;

  if (availableChars.length === 0) {
    availableChars = lowercaseChars;
  }

  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * availableChars.length);
    password += availableChars[randomIndex];
  }

  return password;
};
