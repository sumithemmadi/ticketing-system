import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

export function SmallCopyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://locahost:3000/">
        Tickenting System
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
