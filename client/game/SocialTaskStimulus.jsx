import React from "react";
import "./Table.css";
import Table from "./Table.jsx";

export default class SocialTaskStimulus extends React.Component {
  render() {
    const { game, round, stage, player } = this.props;

    return (

      <div>
      <Table 
      action1={"Action 1"}
      action2={"Action 2"}
      result1={"Result 1"}
      result2={"Result 2"}
      a1r1={"A1R1"}
      a1r2={"A1R2"}
      a2r1={"A2R1"}
      a2r2={"A2R2"}
    />

    </div>

    );
  }
}
