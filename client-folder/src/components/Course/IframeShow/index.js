import React, { useState, useEffect, useRef } from "react";
import "./styles.scss";
import { connect } from "react-redux";
import { ReactComponent as LeftArrow } from "../../../assets/images/LeftArrow.svg"
import { ReactComponent as RightArrow } from "../../../assets/images/RightArrow.svg"
import { ReactComponent as SkipIcon } from "../../../assets/images/SkipIcon.svg"
import { ReactComponent as TroubleshootIcon } from "../../../assets/images/TroubleshootIcon.svg"
import { ReactComponent as HideIcon } from "../../../assets/images/HideIcon.svg"
import { bindActionCreators } from "redux";
import { changeStep } from "../action";

const IframeShow = (
  { steps, changeStep, simulation }
) => {


  const [iFrame, setIframe] = useState("");
  const [currentStep, setCurrentStep] = useState(0);
  const [overlayIsOpen, setOverlayIsOpen] = useState(true);

  useEffect(() => {
    const ifr = simulation || "";
    setIframe(ifr);

  }, [steps]);

  const closeOverlay = () => {
    setOverlayIsOpen(false);
  };

  const goLeft = () => {
    onSlide(currentStep - 1 === -1 ? 0 : currentStep - 1);
  };

  const goRight = () => {
    onSlide(
      currentStep + 1 === steps.length ? currentStep : currentStep + 1
    );
  };

  const onSlide = (slideNo) => {
    setCurrentStep(slideNo)
    changeStep(slideNo)
  }

  return (
    <div className="slideshow" style={{ width: "65%", margin: "0 20%" }}>
      <div className={overlayIsOpen ? "overlayed gallerycontainer" : "gallerycontainer"}>
        <div className="resp-container">
          <iframe className="resp-iframe" src={iFrame} scrolling="yes" allowfullscreen></iframe>
          {/* media query TODO */}
        </div>
        {/* <div class="wrap">
            <iframe className="frame" src={iFrame}></iframe>
        </div> */}
        {overlayIsOpen &&
          <div className="overlay-content">
            <span>You have successfuly built the circuit. Now lets start the experiment.</span>
          </div>
        }
      </div>

      <div className={overlayIsOpen ? "overlayed code-step" : "code-step"}>
        Step {currentStep + 1} : {steps[currentStep].description}
      </div>
      <div className="nav">
        <div onClick={goLeft} className="left-arrow">
          <LeftArrow />

        </div>
        <div className="divider"></div>

        {overlayIsOpen &&
          <>
            <div onClick={closeOverlay} className="codeUp-btn">
              <SkipIcon />
          CODE UPLOAD SUCCESSFUL
        </div>
            {/* <div className="divider"></div>
        <div onClick={()=>{}} className="hide-btn">
          <HideIcon />
          SHOW PIN DIAGRAMS
        </div> */}
          </>
        }
        {!overlayIsOpen &&
          <div onClick={() => { }} className="troubleshoot-btn">
            <TroubleshootIcon />
          TROUBLESHOOT
        </div>
        }
        <div className="divider"></div>

        <div onClick={goRight} className="right-arrow">
          <RightArrow />
        </div>
      </div>

    </div >
  );
};

const mapStateToProps = state => ({
  expSteps: state.courseReducer.currentExpSteps,
})

const mapDispatchToProps = dispatch => ({
  changeStep: bindActionCreators(changeStep, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(IframeShow);