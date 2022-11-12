import Empirica from "meteor/empirica:core";
import "./bots.js";
import "./callbacks.js";

// gameInit is where the structure of a game is defined.
// Just before every game starts, once all the players needed are ready, this
// function is called with the treatment and the list of players.
// You must then add rounds and stages to the game, depending on the treatment
// and the players. You can also get/set initial values on your game, players,
// rounds and stages (with get/set methods), that will be able to use later in
// the game.
Empirica.gameInit(game => {
  game.set("consensusAchieved", false);
  game.players.forEach((player, i) => {
    player.set("avatar", `/avatars/jdenticon/${player._id}`);
    player.set("score", 0);
  });

  _.times(1, i => {
    const round = game.addRound();
    round.addStage({
      name: "response",
      displayName: "Individual Stage",
      durationInSeconds: game.treatment.soloTaskDuration
    });
    round.addStage({
      name: "socialResponse",
      displayName: "Group Stage",
      durationInSeconds: game.treatment.groupTaskDuration
    });
  });
});
