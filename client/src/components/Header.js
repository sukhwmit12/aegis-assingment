const Header = ({ title }) => {
  const content = (
    <header>
      <h1>{title}</h1>
    </header>
  );
  return content;
};

Header.defaultProps = {
  title: "App Title",
};

export default Header;
