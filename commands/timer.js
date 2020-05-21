exports.cMain = function(command, message){
  let time = [];
  let hour = 0, min = 0, sec = 0;
  let out = '';
  const fs = require('fs');
  const datPath = './commandDat/timer.json';
  const channel = message.channel.name;
  const id = message.author.id;
  let json = JSON.parse(fs.readFileSync(datPath, 'utf8'));
  
  time = command.match(/[0-9]{1,2}/g);
  
  
  if(/^list$/.test(command)){
    out = '\n';
    json.timers.forEach((timer, index) => {
      if(timer.channel != ""){
        out += '[' + index + ']';
        out += timer.channel + ':' + timer.hour + '時' + timer.min + '分' 
        out += timer.sec + '秒に' + timer.text + '\n';
      }
    });
    if(out == '\n')out = '何もない。';
  }
  else if(/^delete /.test(command)){
    command = command.replace(/^delete /, '');
    if(/^[0-9]+$/.test(command)){
      if(json.timers.length > command){
        if(json.timers[command].channel === channel){
          json.timers.splice(command, 1);
        
          out = '消したゾ♥';
        }
        else out = '許可されていません。';
      }
      else out = '見つからないよ！';
    }
    else out = '整数で♥';
  }
  else if(time !== null){
    if(time.length >= 3){
      if(time[0] < 24)hour = +time[0];
      else hour = 23;
    
      if(time[1] < 60)min = +time[1];
      else min = 59;
    
      if(time[2] < 60)sec = +time[2];
      else sec = 59;
    
      command = command.slice(command.search(/[0-9]{1,2}/) + time[0].length,command.length);
      command = command.slice(command.search(/[0-9]{1,2}/) + time[1].length,command.length);
      command = command.slice(command.search(/[0-9]{1,2}/) + time[2].length,command.length);
    
      out = hour + '時' + min + '分' + sec + '秒';
    }
    else if(time.length === 2){
      if(time[0] < 24)hour = +time[0];
      else hour = 23;
      
      if(time[1] < 60)min = +time[1];
      else min = 59;
    
      command = command.slice(command.search(/[0-9]{1,2}/) + time[0].length,command.length);
      command = command.slice(command.search(/[0-9]{1,2}/) + time[1].length,command.length);
    
      out = hour + '時' + min + '分';
    }
    else if(time.length === 1){
      if(time[0] < 60)min = +time[0];
      else min = 59;
    
      command = command.slice(command.search(/[0-9]{1,2}/) + time[0].length,command.length);
    
      out = min + '分';
    }
    if(command != '')out += 'に' + command;
    out += 'ですね。'
    
    json.timers.push({
      hour:hour,
      min:min,
      sec:sec,
      channel:channel,
      user:id,
      text:command
    });
  }
  else{
    message.reply('知らない子(指定方法)ですねぇ。');
    
    return 1;
  }
  
  fs.writeFileSync(datPath, JSON.stringify(json));
  
  console.log(out);
  message.reply(out);
  
  return 0;
}

exports.description = function(){
  return '\n     [command:help実行時に表示されます。]';
}