exports.cMain = function(command, message){
  const fs = require('fs');
  const channel = message.channel.name;
  const datPath = './gameDat/dat.json';
  
  let json = JSON.parse(fs.readFileSync(datPath, 'utf8'));
  let filtered = json.channels.filter(ch => ch.name === channel);
  
  if(filtered.length === 0){
    json.channels.push({
      name:channel,
      members:[
        {
          name:message.author.username,
          id:message.author.id,
          hands:[],
          fields:[
            "1",
            "x",
            "x^2"
          ]
        }
      ]
    });
    
    message.channel.send(channel + 'のデータが作成されました。\n' + message.author + 'が参加しました。');
  }
  else {
    if((filtered[0].members.filter(mem => mem.id === message.author.id)).length === 0){
      filtered[0].members.push({
        name:message.author.name,
        id:message.author.id,
        hands:[],
        fields:[
          "1",
          "x",
          "x^2"
        ]
      });
      
      message.channel.send(message.author + 'が参加しました。');
    }
    else {
      message.reply('すでに参加しています。');
    }
  }
  
  
  console.log(json);
  
  fs.writeFileSync(datPath, JSON.stringify(json));
  
  return 0;
}

exports.description = function(){
  return '\n     ゲームに参加します。';
}