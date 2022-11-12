import React from "react";

import { Centered } from "meteor/empirica:core";

export default class InstructionStepOne extends React.Component {
  render() {
    const { hasPrev, hasNext, onNext, onPrev, game } = this.props;

    return (
      <Centered>
        <div className="instructions">
          <h1> Introduction </h1>
          <p>On the following pages you will see some instructions and information describing a study plus some data related to what this study found. You will be asked to indicate what you think this data is showing, given the study’s setup. This task has 2 stages:</p>
          
          <h2>1. Individual Stage</h2>
          <p>You will first give an <strong>individual</strong> answer to what you think the study results showed. It will remain private <i>for the rest of this study</i> - no one will see what you said in this stage. If you give the correct answer individually, you will earn an additional $0.50 on top of your current base payment for this study.</p>
          <p>To submit an answer as an individual, all you need to do is identify the option that you think is correct, select that option, and submit your answer.</p>
          <img src="./images/solosubmit.jpg" width="700px" style={{border:"1px solid #000000"}}/>

          {/* <p>Again, the individual answer you will give has no effect on the group stage of the study - no one will see anyone's initial answers.</p> */}


          
          
          {/* <p>Please continue on to the next section to begin.</p> */}

          <p>
            {/* <button type="button" onClick={onPrev} disabled={!hasPrev}>
              Previous
            </button> */}
            <button type="button" onClick={onNext} disabled={!hasNext}>
              Next
            </button>
          </p>
        </div>
      </Centered>
    );
  }
}
