exports.cMain = function(command, message){
  
  const default_cType = 'text'; 
  let cType;
  let type_list = [
    'text',
    'voice',
    'dm',
    'category',
    'news',
    'store'
  ];
  
  if(command == ''){
    cType = default_cType;
    command = 'empty';
  }
  else if(command.indexOf(' ') > -1){
    cType = command.slice(0, command.indexOf(' '));
    command = command.replace(/^.*?\s/, '');
  }
  else {
    cType = default_cType;
  }
  
  if(type_list.includes(cType)){
    if(message.guild.channels.filter(t => t.name == command).size == 0){
      message.guild.createChannel(command, cType);
      message.reply('added ' + cType + ' channel ,' + command + '.');
    
      return 0;
    }
    else{
      message.reply('すでに同名のチャンネルが存在しています。');
    
      return 1;
    }
  }
  else {
    message.reply('不明な種類のチャンネルです(\"' + cType + '\")。');
    
    return -1;
  }
}

exports.description = function(){
  return ' <Channel_Type> <Channel_Name>\n     チャンネルを追加します。';
}