import React from "react";
import Slider from "meteor/empirica:slider";
import { taskData } from "../game/constants";

import { Centered } from "meteor/empirica:core";

const Radio = ({ selected, name, value, label, onChange }) => (
  <label>
    <input
      type="radio"
      name={name}
      value={value}
      checked={selected === value}
      onChange={onChange}
    />
    {label}
  </label>
);

export default class ExitSurvey extends React.Component {
  static stepName = "ExitSurvey";
  state = { thoughts: "", otherPlayer1: "", otherPlayer2: "", othersReal:0, feedback: ""};

  handleChange = event => {
    const el = event.currentTarget;
    // console.log({ [el.name]: el.value })
    this.setState({ [el.name]: el.value });
  };

  handleSliderChange = num => {
    this.setState({ ["othersReal"]: num });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.onSubmit(this.state);
  };

  labelSlider = value => {
    if(value == 0){
      return("Very sure they were not real")
    }
    else if(value == 5){
      return("Not sure if they were real or not")
    }
    else if(value == 10){
      return("Very sure they were real")
    }
    else{
      return(value)
    }
  }

  render() {
    const { player, game} = this.props;
    const stimulusParams = taskData['stimuli'][game.treatment.contentious]
    const { thoughts, otherPlayer1, otherPlayer2, othersReal, feedback} = this.state;
    const otherPlayers = _.reject(game.players, p => p._id === player._id);
    const correctSolo = player.get("soloAnswer") == "A"; 
    const correctGroup = game.get("groupAnswer") == "A";; 
    

    return (
      <Centered>
        <div className="exit-survey">
          <h1> Thank you for participating in this study. </h1>
          <p>
          Your individual answer was: 
          "<span dangerouslySetInnerHTML={{__html:JSON.parse(stimulusParams[`answer${player.get("soloAnswer")}`])}}></span>"
          and you were <strong>{correctSolo ? "correct":"incorrect"}</strong>, so you earned {correctSolo ? "$0.50":"$0"} for that decision.
          </p>

          {game.get("consensusAchieved") && 
          <p>
          Your group answer was: 
          "<span dangerouslySetInnerHTML={{__html:JSON.parse(stimulusParams[`answer${game.get("groupAnswer")}`])}}></span>"
          and you were <strong>{correctGroup ? "correct":"incorrect"}</strong>, so you earned {correctGroup ? "$2.00":"$0"} for that decision.
          </p>}

          {!game.get("consensusAchieved") && 
          <p>Your group did not agree on an answer, and is ineligible for the group answer bonus.</p>}

          <br/>
          <h3>
            Please answer the following short survey. You do not have to provide
            any information you feel uncomfortable with.
          </h3>
          <form onSubmit={this.handleSubmit}>
            <div>
                <label htmlFor="thoughts">
                Please take a moment to write a couple lines about your thoughts on your experience.
                </label>
                <div>
                  <textarea
                    dir="auto"
                    id="thoughts"
                    name="thoughts"
                    value={thoughts}
                    onChange={this.handleChange}
                    style={{width:"500px", height:"100px"}}
                  />
                </div>
            </div>
            <div className="form-line thirds">
              <div>
                <label htmlFor="otherPlayer1">
                To the best of your ability, how would you describe your experience with the player "{otherPlayers[0].get("name")}"?
                </label>
                <div>
                  <textarea
                    dir="auto"
                    id="otherPlayer1"
                    name="otherPlayer1"
                    value={otherPlayer1}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="otherPlayer2">
                To the best of your ability, how would you describe your experience with the player "{otherPlayers[1].get("name")}"?
                </label>
                <div>
                  <textarea
                    dir="auto"
                    id="otherPlayer2"
                    name="otherPlayer2"
                    value={otherPlayer2}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
            </div>
            <div>
                <label htmlFor="othersReal">
                Though the other players you just interacted with were in fact real, some participants can be skeptical that they are playing with real people. Using the below scale, how confident would you say you are that the other two players you just interacted with were in fact real people?
                </label>
                <Slider
                    min={0}
                    max={10}
                    stepSize={1}
                    id="othersReal"
                    name="othersReal"
                    // labelStepSize={10}
                    onChange={this.handleSliderChange}
                    labelRenderer={this.labelSlider}
                    showTrackFill={false}
                    value={othersReal}
                    isHandleTooltip={false}
                    // vertical={vertical}
                    // handleHtmlProps={{ "aria-label": "example 3" }}
                />
            </div>
            <br/><br/>
            <div>
                <label htmlFor="feedback">
                Please take a moment to write a couple lines about your thoughts on your experience.
                </label>
                <div>
                  <textarea
                    dir="auto"
                    id="feedback"
                    name="feedback"
                    value={feedback}
                    onChange={this.handleChange}
                    style={{width:"500px", height:"100px"}}
                  />
                </div>
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      </Centered>
    );
  }
}
