import React from "react";
import AddPersonBtn from "./AddPersonBtn";
import Logo from "./Logo";

const Header = ({ ...props }) => {
  return (
    <header className="flex justify-between w-full py-4 px-[20vw]">
      <Logo />
      <AddPersonBtn {...props} />
    </header>
  );
};

export default Header;
