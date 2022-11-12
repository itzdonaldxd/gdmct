import React from "react";

import TaskResponse from "./TaskResponse";
import TaskStimulus from "./TaskStimulus";

export default class Task extends React.Component {
  render() {
    const {stage} = this.props;

    return (
      <div className="task">
        <TaskStimulus {...this.props} />
        <TaskResponse {...this.props} />
      </div>
    );
     
}
}