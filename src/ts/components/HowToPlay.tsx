import { useState } from "react";
import $ from "jquery";

const HowToPlay = () => {
  const [showInstructions, setShowInstructions] = useState(false);

  return (
    <>
      <div>
        <button
          className="button-link"
          onClick={() => {
            setShowInstructions(!showInstructions);
            if ($("#instructions").css("display") === "none") {
              $("#instructions").slideDown();
            } else {
              $("#instructions").slideUp();
            }
          }}
          type="submit"
        >
          {`How to play ${showInstructions ? "-" : "+"}`}
        </button>
      </div>
      <div id="instructions">
        <div className="intro">
          Flex your lexicographical skills in this simple word game! Enter as
          many words as you can that contain the following letters in
          consecutive order.
        </div>
      </div>
    </>
  );
};

export default HowToPlay;
