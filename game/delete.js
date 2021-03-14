exports.cMain = function(command, message){
  const fs = require('fs');
  const filePath = './end.js';
  
  let ch = message.guild.channels.find( 'name', message.channel.name);
  let access = require(filePath);
  
  access.cMain(command, message);
    
  if(ch)ch.delete();
  ch = message.guild.channels.find( 'name', message.channel.name + 'v');
  if(ch)ch.delete();
  
  return 0;
}

exports.description = function(){
  return '\n     サーバーを削除します。';
}