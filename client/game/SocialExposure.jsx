import React from "react";
import { Chat } from "@empirica/chat";
import { taskData } from "./constants";
import { TimeSync } from "meteor/mizzao:timesync";


export default class SocialExposure extends React.Component {  

  renderSocialInteraction(otherPlayer) {
    const {game} = this.props; 
    const stimulusParams = taskData['stimuli'][game.treatment.contentious];

    return (
      <div className="alter" key={otherPlayer._id}>
        <div>
        <span style={{color:otherPlayer.get("nameColor")}}>{otherPlayer.get("name")}</span>
        <br></br>
        <img src={otherPlayer.get("avatar")} className="profile-avatar" />
        </div>
        <div style={{"width": "20em", "font-size":"0.9em"}}>
          <br/>
          <span dangerouslySetInnerHTML={{__html:`<strong>Selected: </strong>${otherPlayer.round.get("socialAnswer") ? otherPlayer.round.get("socialAnswer") : "No answer selected."}`}}></span>
        </div>
        <div>
        <br/>
        <span className={`bp3-tag bp3-round ${otherPlayer.round.get("satisfied") ? "bp3-intent-success" : "bp3-intent-danger"}`} 
          style={{"margin":10,"margin-top":10}}>{otherPlayer.round.get("satisfied") ? "Submitted" : "Not submitted"}</span>
        </div>
      </div>
    );
  }

  render() {
    const { game, player, stage } = this.props;
    const timeStamp = new Date(TimeSync.serverTime(null, 1000));
    const otherPlayers = _.reject(game.players, p => p._id === player._id);
    

    if (otherPlayers.length === 0) {
      return null;
    }

    return (
      <div className="social-exposure">
        <p>
          <strong>There are {otherPlayers.length} other players:</strong>
        </p>
        {otherPlayers.map(p => this.renderSocialInteraction(p))}
        <h2>Discussion</h2>
        <Chat player={player} scope={stage} timeStamp={timeStamp}/>
      </div>
    );
  }
}
