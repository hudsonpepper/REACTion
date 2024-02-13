import "../App.css";
import { useTheme } from "../utils/GameContext";

const Target = ({ onClickHandler }) => {
  // onclick, delete this and render new button (get new button as prop from create portal)
  const { leftPos, topPos } = useTheme();

  // insert math and set position
  let styling = {
    position: "absolute",
    left: leftPos + "%",
    top: topPos + "%",

    // left: 100 + '%',
    // top: 100 + '%',
  };
  let imgStyling = {};
  return (
    <button style={styling} className="max-w-10" onClick={onClickHandler}>
      <img style={imgStyling} src="../../public/target.png" />
    </button>
  );
};

export default Target;
