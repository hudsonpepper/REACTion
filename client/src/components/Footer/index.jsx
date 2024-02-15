import { useLocation, useNavigate } from "react-router-dom";
import Logo from "../../assets/ReactLogo.svg";
import GithubLogo from "../../assets/GithubLogo.svg"


const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <footer className="w-100 mt-auto bg-secondary p-4">
      <div className="container flex-row justify-center">
        {/* {location.pathname !== "/" && (
          <button className="btn btn-dark mb-3" onClick={() => navigate(-1)}>
            &larr; Go Back
          </button>
        )} */}
        <a href="https://github.com/hudsonpepper/REACTion/graphs/contributors"><img className="h-10 px-2" src={Logo} /></a>
        <a href="https://github.com/hudsonpepper/REACTion"><img className="h-10 px-2"src={GithubLogo} /></a>
        {/* <img className="sm: size-4 md:size-10 justify-center" src={Logo} /> */}
      </div>
    </footer>
  );
};

export default Footer;
