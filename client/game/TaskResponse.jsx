import React from "react";
import Slider from "meteor/empirica:slider";
import { taskData } from "./constants";
import { TimeSync } from "meteor/mizzao:timesync";
import moment from "moment";

export default class TaskResponse extends React.Component {
  
  handleSubmit = event => {
    event.preventDefault();
    this.props.player.stage.submit();
  };

  handleSubmitA = event => {
    event.preventDefault();
    const {game, stage, player} = this.props; 

    this.props.player.round.set("satisfied", false)
    if (this.props.stage.name == "response"){
      this.props.player.round.set("soloAnswer", "A");
      this.props.player.set("soloAnswer", "A");
      stage.append("log", {
        verb: "selectAnswer",
        subjectId: player._id,
        state: "A",
        at: moment(TimeSync.serverTime(null, 1000)),
      });
    }
    else{
      const prevSocialAnswer = this.props.player.round.get("socialAnswer");
      if (prevSocialAnswer != "A") {
        game.players.forEach((p) => {
          if (p._id !== player._id){
            p.round.set(`update${player.get("name")}`, true);
          }
        })
        this.props.player.round.set("prevSocialAnswer", prevSocialAnswer);
      }

      this.props.player.round.set("socialAnswer", "A");
      stage.append("log", {
        verb: "selectAnswer",
        subjectId: player._id,
        state: "A",
        at: moment(TimeSync.serverTime(null, 1000)),
      });
    }

  };

  handleSubmitB = event => {
    event.preventDefault();
    const {game, stage, player} = this.props; 

    this.props.player.round.set("satisfied", false)
    if (this.props.stage.name == "response"){
      this.props.player.round.set("soloAnswer", "B");
      this.props.player.set("soloAnswer", "A");
      stage.append("log", {
        verb: "selectAnswer",
        subjectId: player._id,
        state: "B",
        at: moment(TimeSync.serverTime(null, 1000)),
      });
    }
    else{
      const prevSocialAnswer = this.props.player.round.get("socialAnswer");
      if (prevSocialAnswer != "B") {
        game.players.forEach((p) => {
          if (p._id !== player._id){
            p.round.set(`update${player.get("name")}`, true);
          }        
        })
        this.props.player.round.set("prevSocialAnswer", prevSocialAnswer);
      }

      this.props.player.round.set("socialAnswer", "B");
      stage.append("log", {
        verb: "selectAnswer",
        subjectId: player._id,
        state: "A",
        at: moment(TimeSync.serverTime(null, 1000)),
      });
    }
    
  };

  submitAnswer = event => {
    const { player, stage } = this.props;
    event.preventDefault();
    if(player.round.get("soloAnswer") != null & stage.name == "response"){
      this.props.player.stage.submit();
    }
    else if (player.round.get("socialAnswer") != null & stage.name == "socialResponse"){
      this.props.player.stage.submit();
    }
    else{
      alert("Please choose an answer before submitting.")
    }
    
  };

  renderSubmitted() {
    return (
      <div className="task-response">
        <div className="response-submitted">
          <h5>Waiting on other players...</h5>
          Please wait until all players are ready
        </div>
      </div>
    );
  }

  buttonStyler(buttonName){
    const { player, stage} = this.props;

    if(player.round.get("soloAnswer") == buttonName & stage.name == "response"){
      return ({backgroundColor:'blue', color:"white", margin:5})
    }
    else if (player.round.get("socialAnswer") == buttonName & stage.name == "socialResponse"){
      return ({backgroundColor:'blue', color:"white", margin:5})
    }
    else{
      return({margin:5})
    }
}

  handleConsensusButton = event =>{
    const {game, stage, player} = this.props;
    stage.append("log", {
      verb: "playerSatisfaction",
      subjectId: player._id,
      state: !player.round.get("satisfied"),
      at: moment(TimeSync.serverTime(null, 1000)),
    });

    game.players.forEach((p) => {
      if (p._id !== player._id){
        p.round.set(`update${player.get("name")}`, true);
      }        
    })

    player.round.set("satisfied", !player.round.get("satisfied"))
    
  }

  allEqual = arr => arr.every(val => val === arr[0]);

  consensusButton(){
    const {game, player} = this.props; 
    const submissionStatuses = game.players.map(x => x.round.get("satisfied"))
    const socialAnswers = game.players.map(x => x.round.get("socialAnswer"))
    if(submissionStatuses.every(Boolean)){
      if(this.allEqual(socialAnswers)){
        game.set("consensusAchieved", true);
        game.set("groupAnswer", socialAnswers[0]);
        game.players.forEach((player, i) => {
          player.stage.submit();
        });
      }
    }
    if(player.round.get("satisfied")){
      return <button onClick={() => player.round.get("socialAnswer") != null? this.handleConsensusButton(): alert("Please choose an answer before submitting.")}>Revoke submission</button>
    }
    if(!player.round.get("satisfied")){
      return <button onClick={() => player.round.get("socialAnswer") != null? this.handleConsensusButton(): alert("Please choose an answer before submitting.")}>Submit answer</button>
    }
  }

  // renderSoloResponse(){
  //   const {game} = this.props;
  //   const stimulusParams = taskData['stimuli'][game.treatment.contentious];
  //   return (
  //     <div>
  //       {/* <button style = {this.buttonStyler("A")} onClick={this.handleSubmitA}>Option A</button>
  //       <button style = {this.buttonStyler("B")} onClick={this.handleSubmitB}>Option B</button> */}
  //       <div><button style = {{margin:5}} onClick={this.submitAnswer}>Submit Answer</button></div>
  //       <form>
  //         <div>
  //           <input type="radio" name="testing" value="A" id="A" onClick={this.handleSubmitA}></input>
  //           <label for="A" dangerouslySetInnerHTML={{__html: JSON.parse(stimulusParams['answerA'])}}></label>
  //         </div>
  //         <div>
  //           <input type="radio" name="testing" value="B" id="B" onClick={this.handleSubmitB}></input>
  //           <label for="B" dangerouslySetInnerHTML={{__html: JSON.parse(stimulusParams['answerB'])}}></label>
  //         </div>
  //     </form>
  //     </div>
  //   );
  // }

  renderSoloResponse(){
    const {game, player} = this.props;
    const stimulusParams = taskData['stimuli'][game.treatment.contentious];
    return (
      <form>
          <div>
            <input type="radio" name="testing" value="A" id="A" onClick={this.handleSubmitA} checked={player.round.get("soloAnswer") == "A"}></input>
            <label for="A" dangerouslySetInnerHTML={{__html: `  ${JSON.parse(stimulusParams['answerA'])}`}}></label>
          </div>
          <br/>
          <div>
            <input type="radio" name="testing" value="B" id="B" onClick={this.handleSubmitB} checked={player.round.get("soloAnswer") == "B"}></input>
            <label for="B" dangerouslySetInnerHTML={{__html: `  ${JSON.parse(stimulusParams['answerB'])}`}}></label>
          </div>
          <br></br>
          <div><button style = {{margin:0}} onClick={this.submitAnswer}>Submit Answer</button></div>
      </form>  
    );
  }

  renderSocialResponse(){
    const {game, player} = this.props;
    const stimulusParams = taskData['stimuli'][game.treatment.contentious];
    return (
      <div>
      <div>
        <input type="radio" name="testing" value="A" id="A" onClick={this.handleSubmitA} checked={player.round.get("socialAnswer") == "A"}></input>
        <label> A) </label>
        <label for="A" dangerouslySetInnerHTML={{__html: `  ${JSON.parse(stimulusParams['answerA'])}`}}></label>
      </div>
      <br/>
      <div>
        <input type="radio" name="testing" value="B" id="B" onClick={this.handleSubmitB} checked={player.round.get("socialAnswer") == "B"}></input>
        <label> B) </label>
        <label for="B" dangerouslySetInnerHTML={{__html: `  ${JSON.parse(stimulusParams['answerB'])}`}}></label>
      </div>
      <br></br>
      <div>{this.consensusButton()}</div>
    </div>
    );
  }

  render() {
    const { player, stage } = this.props;
    const stimulusParams = taskData['stimuli']['noncontentious']

    // If the player already submitted, don't show the slider or submit button
    if (player.stage.submitted) {
      return this.renderSubmitted();
    }
 
    if(stage.name == "response"){
      return this.renderSoloResponse();
    }

    if(stage.name == "socialResponse"){
      return this.renderSocialResponse();
    }
  }
}


