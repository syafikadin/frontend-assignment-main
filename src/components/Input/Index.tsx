import TextField, { type TextFieldProps } from "@mui/material/TextField";

export const Input = ({ variant, ...props }: TextFieldProps) => {
  const variantUsed = variant ?? "standard";

  return (
    <TextField
      sx={{ bgcolor: variant == "filled" ? "background.paper" : undefined }}
      variant={variantUsed == "filled" ? undefined : variantUsed}
      size="small"
      {...props}
    />
  );
};

export default Input;