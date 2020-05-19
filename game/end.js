exports.cMain = function(command, message){
  const fs = require('fs');
  const channel = message.channel.name;
  const datPath = './gameDat/dat.json';
  
  let json = JSON.parse(fs.readFileSync(datPath, 'utf8'));
  
  let index = json.channels.findIndex(ch => ch.name === channel);
  
  if(index > -1){
    json.channels.splice(index, 1);
  
    message.reply(channel + 'のデータを削除しました。');
    
    console.log(json);
    
    fs.writeFileSync(datPath, JSON.stringify(json));
  }
  else {
    message.reply(channel + 'のデータは存在しません。');
  }
  
  return 0;
}

exports.description = function(){
  return '\n     ゲームをリセットします。';
}