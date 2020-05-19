exports.cMain = function(command, message){  
  if(!message.guild.channels.exists( 'name', command)){
    message.guild.createChannel(command,'voice');
    message.reply('added voice channel.');
    
    return 0;
  }
  else{
    message.reply('same channel already exists.');
    
    return 1;
  }
}

exports.description = function(){
  return 'command:addTextCh <Channel_Name>\n     ボイスチャンネル<Channel_Name>を追加します。\n\n';
}