exports.cMain = function(command, message){
  const fs = require('fs');
  const channel = message.channel.name;
  const id = message.author.id;
  const datPath = './gameDat/dat.json';
  
  let json = JSON.parse(fs.readFileSync(datPath, 'utf8'));
  let chIndex = json.channels.findIndex(ch => ch.name === channel);
  
  if(chIndex > -1){
    
    let memIndex = json.channels[chIndex].members.findIndex(mem => mem.id === id);
  
    if(chIndex > -1){
      json.channels[chIndex].members.splice(memIndex, 1);
  
      message.reply('あなたのデータを削除しました。');
    
      console.log(json);
    
      fs.writeFileSync(datPath, JSON.stringify(json));
    }
    else {
      message.reply('あなたのデータは存在しません。');
    }
  }
  else {
    message.reply(channel + 'のデータは存在しません。');
  }
  
  return 0;
}

exports.description = function(){
  return '\n     ゲームから離脱します。';
}