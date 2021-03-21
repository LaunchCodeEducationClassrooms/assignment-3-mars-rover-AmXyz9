const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {
  
  it("constructor sets position and default values for mode and generatorWatts", function(){
    let rover = new Rover(19435);
    expect(rover.position).toEqual(19435);
    expect(rover.mode).toEqual('NORMAL');
    expect(rover.generatorWatts).toEqual(110);
  });

  it("response returned by receiveMessage contains name of message", function(){
    let rover = new Rover(19435);
    let commands = [new Command('STATUS_CHECK')];
    let message = new Message("New Message!", commands);
    let messageReceived = rover.receiveMessage(message);
    expect(messageReceived.message).toEqual("New Message!");
  });
  
  it("response returned by receiveMessage includes two results if two commands are sent in the message",function(){
    let rover = new Rover(19435);
    let commands = [new Command('STATUS_CHECK'), new Command('MOVE', 20)];
    let message = new Message("New Message!", commands);
    let messageReceived = rover.receiveMessage(message);
    expect(messageReceived.results.length).toEqual(2);
  });

  it("responds correctly to status check command", function(){
    let rover = new Rover(19435);
    let commands = [new Command('STATUS_CHECK')];
    let message = new Message("New Message!", commands);
    let messageReceived = rover.receiveMessage(message);
    let results = messageReceived.results;
    let response = results[0];
    let roverStatus = response.roverStatus;
    let complete = response.completed;
    expect(complete).toEqual(true);
    expect(roverStatus.mode).toEqual("NORMAL");
    expect(roverStatus.generatorWatts).toEqual(110);
    expect(roverStatus.position).toEqual(19435);
  });

  it("responds correctly to mode change command", function(){
    let rover = new Rover(19435);
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER')];
    let message = new Message("New Message!", commands);
    let messageReceived = rover.receiveMessage(message);
    let results = messageReceived.results;
    let response = results[0];
    let complete = response.completed;
    expect(complete).toEqual(true);
    expect(rover.mode).toEqual('LOW_POWER');
  });

  it("responds with false completed value when attempting to move in LOW_POWER mode", function(){
    let rover = new Rover(19435);
    rover.mode = 'LOW_POWER';
    let commands = [new Command('MOVE', 20)];
    let message = new Message("New Message!", commands);
    let messageReceived = rover.receiveMessage(message);
    let results = messageReceived.results;
    let response = results[0];
    let complete = response.completed;
    expect(complete).toEqual(false);
  });

  it("responds with position for move command", function(){
    let rover = new Rover(19435);
    let commands = [new Command('MOVE', 20)];
    let message = new Message("New Message!", commands);
    rover.receiveMessage(message);
    expect(rover.position).toEqual(20);
  });

});
