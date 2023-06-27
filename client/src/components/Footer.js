const Footer = () => {
  const today = new Date();
  const content = (
    <footer>
      <p> Copyright &copy; {today.getFullYear()} </p>
    </footer>
  );
  return content;
};

export default Footer;
