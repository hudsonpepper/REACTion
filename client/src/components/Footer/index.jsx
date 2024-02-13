import { useLocation, useNavigate } from "react-router-dom";
import Logo from "../../assets/ReactLogo.svg";

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <footer className="w-100 mt-auto bg-secondary p-4">
      <div className="container text-center mb-5">
        {location.pathname !== "/" && (
          <button className="btn btn-dark mb-3" onClick={() => navigate(-1)}>
            &larr; Go Back
          </button>
        )}
        <h4>REACTion</h4>
        <img className="sm: size-4 md:size-10 justify-center" src={Logo} />
      </div>
    </footer>
  );
};

export default Footer;
