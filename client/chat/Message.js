import PropTypes from "prop-types";
import React from "react";
import { isString } from 'lodash';


export default class Message extends React.Component {
  renderTime = (timeStamp) => {
    const hours = new Date(timeStamp).getHours();
    const minutes = new Date(timeStamp).getMinutes();

    if (!hours || !minutes) {
      return null;
    }

    const time = `${hours
      .toString()
      .padStart(2, 0)}:${minutes.toString().padStart(2, 0)}`;

    return <div className="timeStamp">{time}</div>;
  };

  renderName = (isSelf, name, color) => {
    return <div className="name" style={{color: color}} >{isSelf ? "You" : name}</div>;
  };

  render() {
    const { game, message, player, hideName, hideAvatar, svgAvatar, avatar } = this.props;
    const { player: msgPlayer, text, timeStamp } = message;
    const isSelf = player._id == msgPlayer._id;
    const msgPlayerObj = game.players.find((p) => p._id === msgPlayer._id);
    const nameColor = isSelf ? player.get("nameColor") : msgPlayerObj.get("nameColor");
    let avatarImg;
    const useAvatar = !hideAvatar;
    if (useAvatar) {
      if (isSelf && player.get("avatar")) {
        avatarImg = <img className="avatar" src={player.get("avatar")} />
      } else if (!isSelf && msgPlayerObj.get("avatar")) {
        avatarImg = <img className="avatar" src={msgPlayerObj.get("avatar")} />

      }
    }


    return (
      <div className="message">
        {useAvatar ? avatarImg : ''}
        <div className="text-container">
          {!hideName && this.renderName(isSelf, msgPlayer.name, nameColor )}
          <div className="text">{text}</div>
          {/* {timeStamp &&
            new Date(timeStamp).getTime() > 0 &&
            this.renderTime(timeStamp)} */}
        </div>
      </div>
    );
  }
}

Message.propTypes = {
  message: PropTypes.shape({
    text: PropTypes.string.isRequired,
    player: PropTypes.shape({
      name: PropTypes.string.isRequired,
      avatar: PropTypes.string,
    }),
  }).isRequired,
  self: PropTypes.bool,
  hideAvatar: PropTypes.bool,
  hideName: PropTypes.bool,
  svgAvatar: PropTypes.bool,
  avatar: PropTypes.shape({
    svg:  PropTypes.string,
    src:  PropTypes.string,
    alt:  PropTypes.string,
  }),
};
