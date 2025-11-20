interface Props {
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
}: Props) => {};
