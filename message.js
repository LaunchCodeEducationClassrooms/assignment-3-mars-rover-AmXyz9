class Message {
  constructor(name, commands){
    this.name = name;
    this.commands = commands;
    if (name === undefined) {
      throw Error('Message name required.');
    } 
  }
}

module.exports = Message;