exports.cMain = function(command, message){
  let i = 0;
  const chName = 'ナブラゲームサーバー', chMax = 2;
  
  for(; i < 5; i++){
    if(i >= chMax){
      message.reply('サーバー上限に達しました。');
      
      return 1;
    }
    else if(!message.guild.channels.find( 'name', chName + i)){
      message.guild.createChannel(chName + i, 'text');
      message.guild.createChannel(chName + i + 'v', 'voice');
      
      message.reply('第' + i + 'サーバーを作成ました。');
      
      break;
    }
  }
  
  return 0;
}

exports.description = function(){
  return '\n     ナブラゲーム用のチャンネルを追加します。';
}