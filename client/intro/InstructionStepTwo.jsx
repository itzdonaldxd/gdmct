import React from "react";
import { taskData } from "../game/constants";
import Table from "../game/Table.jsx";
import { Centered } from "meteor/empirica:core";
import { TimeSync } from "meteor/mizzao:timesync";
import moment from "moment";

export default class InstructionStepTwo extends React.Component {

  handleSubmitA = event => {
    event.preventDefault();
    const {player} = this.props; 

    player.set("soloAnswer", "A");
    player.append("log", {
      verb: "selectSoloAnswer",
      subjectId: player._id,
      state: "A",
      at: moment(TimeSync.serverTime(null, 1000)),
    });
  };

  handleSubmitB = event => {
    event.preventDefault();
    const {player} = this.props; 

    player.set("soloAnswer", "B");
    player.append("log", {
      verb: "selectSoloAnswer",
      subjectId: player._id,
      state: "B",
      at: moment(TimeSync.serverTime(null, 1000)),
    });
  };


  submitAnswer = event => {
    const { player, onNext } = this.props;
    event.preventDefault();
    if(player.get("soloAnswer") != null){
      onNext();
    }
    else{
      alert("You need to select an answer first.")
    }  
  };

  render() {
    const { hasPrev, hasNext, onNext, onPrev, game, player} = this.props;
    const numeracyParams = taskData['numeracy'][game.treatment.numeracy]
    const stimulusParams = taskData['stimuli'][game.treatment.contentious]

    return (
      <Centered>
        <div className="instructions">
          <h1>Introduction</h1>
          <h2>2. Group Stage</h2>
          <p>You will then answer the same question <strong>as a group</strong>.
          Your group of three will be given <strong><i>5 minutes</i></strong> to collectively decide on what you all think is the best answer - note, the individual answer you gave previously <strong>will not affect this decision</strong>, it may be the correct answer, or it may not be. 
          If your group gives the correct answer <strong>you will each earn an additional $2.</strong> If your group does not give the correct answer in the time provided <strong>you will earn nothing for the group stage, and only get what you earned in the individual stage, plus the base payment.</strong></p>

          <p>Also, if you leave the study early at any point, you will lose all earnings and receive nothing.</p>

          <h3>Answering questions as a group</h3>
          To submit an answer as a group, the group must all <strong>submit</strong> the same answer. To help your group with the task, you all will be given some information about what each other are doing when selecting the potential options.
          <ul>
            <li><strong>Selecting an answer:</strong> During the group stage, you will see if either individual has selected an answer by clicking the radio button. Once an answer is selected, it will show your group that you have selected the answer, <i>but not submitted it</i>. For example, Green in the screenshot below has selected Answer B, but <i>not yet</i> submitted it.</li>
            <br/>
            <li><strong>Submitting an answer:</strong> Once someone has selected an answer, you can then click "<i>Submit answer</i>" to submit it, which will also be shown to your group. For example, in the screenshot below, Pink has selected and submitted Answer "<i>A</i>".</li>
            <br/>
            <li><strong>Revoke submissions:</strong> If you have chosen and submitted an answer then change your mind before the group has submitted, you can click "<i>Revoke submission</i>" to un-submit an answer; again, up till the group has submitted.</li>
            <br/>
            <li><strong>Discussion:</strong> We also ask that you use the chat window to talk with your group about the content provided and what you collectively think is the best answer. Remember, that you get paid only if you all submit the correct answer - so do your best as a group to discuss and identify that correct response.</li>
          </ul>

          <p>As soon as all group members have selected and submitted the same answer, the task will proceed; otherwise, the task will automatically proceed after 5 minutes.</p>

          <img src="./images/consensus.jpg" width="1000px" style={{border:"1px solid #000000"}}/>
          
          <p>
            <button type="button" onClick={onPrev} disabled={!hasPrev}>
              Previous
            </button>
            <button type="button" onClick={onNext} disabled={!hasNext}>
              Next
            </button>
          </p>
        </div>
      </Centered>
    );
  }
}


{/* <div dangerouslySetInnerHTML={{__html: JSON.parse(stimulusParams['prompt'])}}></div>
          <Table 
          action1={stimulusParams['action1']}
          action2={stimulusParams['action2']}
          result1={stimulusParams['result1']}
          result2={stimulusParams['result2']}
          a1r1={numeracyParams['a1r1']}
          a1r2={numeracyParams['a1r2']}
          a2r1={numeracyParams['a2r1']}
          a2r2={numeracyParams['a2r2']}
          />
          <h3>What result does the study support?</h3>

          
            <div>
              <input type="radio" name="testing" value="A" id="A" onClick={this.handleSubmitA} checked={player.get("soloAnswer") == "A"}></input>
              <label style={{display:"inline"}} for="A" dangerouslySetInnerHTML={{__html: JSON.parse(stimulusParams['answerA'])}}></label>
            </div>
            <div>
              <input type="radio" name="testing" value="B" id="B" onClick={this.handleSubmitB} checked={player.get("soloAnswer") == "B"}></input>
              <label style={{display:"inline"}} for="B" dangerouslySetInnerHTML={{__html: JSON.parse(stimulusParams['answerB'])}}></label>
            </div>
            <br></br>
            <div><button style = {{margin:0}} onClick={this.submitAnswer}>Submit Answer</button></div>
           */}