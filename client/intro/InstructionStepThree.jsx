import React from "react";

import { Centered } from "meteor/empirica:core";
const checks = {check1: false, check2: false, check3: false, check4: false}

export default class InstructionStepThree extends React.Component {

   

  handleCheckChange = (checks, e) => {
    checks[e.target.name] = e.target.checked;
  }

  render() {
    const { hasPrev, hasNext, onNext, onPrev, game } = this.props;
        
    return (
      <Centered>
        <div className="instructions">
          <h1> Introduction </h1>

          <p>You are now going to be matched with <strong>two other workers from Prolific</strong> to complete this task.</p>
          <p>To give you some perspective on what your group may think about the study and topic, <u>the other two members of your group identify as <strong>{game.treatment.politicalParty}</strong>.</u></p>
          <br/><br/>
          <h3><strong>Before we move on, please confirm that you understand the following by ticking the boxes:</strong></h3>

          
            <label><input id="check1" name="check1" type="checkbox" onChange={(e) => this.handleCheckChange(checks, e)}/>   All group members have been given the same information.</label>
            <label><input id="check2" name="check2" type="checkbox" onChange={(e) => this.handleCheckChange(checks, e)}/>   You all must submit your group answer <strong><i>before the time runs out.</i></strong></label>
            <label><input id="check3" name="check3" type="checkbox" onChange={(e) => this.handleCheckChange(checks, e)}/>   If the 5 minutes runs out and you have not submitted the group answer, <strong>you will all lose your chance at earning an additional $2.</strong></label>
            <label><input id="check4" name="check4" type="checkbox" onChange={(e) => this.handleCheckChange(checks, e)}/>   You all must all come to the <strong><i>same</i> answer to continue</strong> and submit the group answer.</label>
          

          <br/><br/>
          <p>Please continue on when ready.</p>
          <button type="button" onClick={onPrev} disabled={!hasPrev}>
              Previous
            </button>
          <button type="submit" onClick={() => checks["check1"] & checks["check2"] & checks["check3"] & checks["check4"] ? this.props.onNext() : alert("One or more instructions are not checked.")}>Continue</button>
        </div>
      </Centered>
    );
  }
}
