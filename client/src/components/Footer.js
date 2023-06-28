import { format } from "date-fns";

const Footer = () => {
  // const dateTime = format(new Date(), "dd MMM, YYY pp");
  const today = new Date();
  const content = (
    <footer>
      <p> Copyright &copy; {today.getFullYear()} </p>
      {/* <p>{dateTime}</p> */}
    </footer>
  );
  return content;
};

export default Footer;
