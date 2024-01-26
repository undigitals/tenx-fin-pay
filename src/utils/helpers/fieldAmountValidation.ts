// number1: 48 | number9: 57 | numpad1: 96 | numpad9: 105

const allowedKeys = [8, 46, 37, 39, 48, 57, 96, 105];

export const isNumberPressed = (charCode: any) => (charCode < allowedKeys[4] || charCode > allowedKeys[5]) && (charCode < allowedKeys[6] || charCode > allowedKeys[7]);

export const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
  const charCode = e.which || e.charCode || e.keyCode || 0;

  if (!allowedKeys.includes(charCode) && isNumberPressed(charCode)) {
    e.preventDefault();
  }
};
