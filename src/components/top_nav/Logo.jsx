import cladLogo from "../../assets/clad-logo.svg";

const Logo = () => {
  return (
    <div className="flex gap-2 justify-center items-center">
      <img src={cladLogo} alt="Clad Logo" />
      <span className="font-medium text-3xl tracking-widest">Clad</span>
    </div>
  );
};

export default Logo;
