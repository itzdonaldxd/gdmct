import React from "react";
import "./Table.css";
import Table from "./Table.jsx";
import { taskData } from "./constants";

export default class TaskStimulus extends React.Component {

  
  render() {
    const { round, stage, player, game } = this.props;
    const numeracyParams = taskData['numeracy'][game.treatment.numeracy]
    const stimulusParams = taskData['stimuli'][game.treatment.contentious]


    return (
      <div>
        <div dangerouslySetInnerHTML={{__html: JSON.parse(stimulusParams['prompt'])}}></div>
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
    </div>
    );
  }
}
