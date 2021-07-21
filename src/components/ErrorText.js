import { Typography } from "@material-ui/core";

export default function ErrorText(props) {
  const { text } = props;
  
  return <Typography color='error' variant='h1'>{text}</Typography>
}
