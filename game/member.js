exports.cMain = function(command, message){
  const fs = require('fs');
  const channel = message.channel.name;
  const datPath = './gameDat/dat.json';
  
  let json = JSON.parse(fs.readFileSync(datPath, 'utf8'));
  let filtered = json.channels.filter(ch => ch.name === channel);
  let send = '参加者:', len;
  
  if(filtered.length === 0){
    message.reply(channel + 'のデータは存在しません。');
  }
  else{
    len = (filtered[0].members).length
    
    if(len > 0){
      for(let i = 0; i < len; i++){
        send += '<@!' + filtered[0].members[i].id + '>,';
      }
      
      message.channel.send(send);
    }
    else{
      message.reply('警告:オフ会の参加者は0人です。\n');
      message.reply('オイィィィィィイイイイイイイ↑ッス！！ どうもォ～シャムでぇ～す。\nまぁ今日は、オフ会当日ですけども。\n参加者は、誰一人･･･来ませんでした･･･。');
    }
    
  }
  
  return 0;
}

exports.description = function(){
  return '\n     ゲームの参加者を表示します。';
}