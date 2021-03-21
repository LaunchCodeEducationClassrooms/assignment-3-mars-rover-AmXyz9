class Rover {
  constructor(position, mode = 'NORMAL', generatorWatts = 110){
    this.position = position;
    this.mode = mode;
    this.generatorWatts = generatorWatts;
  }
  receiveMessage(message){
    let messageReceived = {
      message: message.name,
      results: []
    };

    let response = {};
    
    for (let i = 0; i <= message.commands.length - 1; i++){
      response['completed'] = true;
      let command = message.commands[i];
      if (command.commandType === "STATUS_CHECK"){
        response['roverStatus'] = {
        mode: this.mode,
        generatorWatts: this.generatorWatts,
        position: this.position
        };
      } else if (command.commandType === "MODE_CHANGE"){
        this.mode = command.value;
      } else if (command.commandType === "MOVE"){
        if (this.mode === "LOW_POWER"){
          response["completed"] = false;
          } else {
          this.position = command.value;
          }
        }     
      messageReceived['results'].push(response);
    }  
    return messageReceived;
  }  
}

module.exports = Rover;