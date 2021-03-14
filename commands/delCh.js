exports.cMain = function(command, message){ 
      
    let ch = message.guild.channels.find( 'name', command);
    
    if(ch){
      ch.delete();
      message.reply('チャンネルを削除しました。');
      
      return 0;
    }
    else{
      message.reply('チャンネルが見つかりませんでした。');
      
      return 1;
    }
}

exports.description = function(){
  return '\n     <Channel_Name>を削除します。';
}