exports.cMain = function(command, message){
  let url = 'https://www.tcichemicals.com/JP/ja/search/?text=';
  
  if(command === '(empty)'){
    url = 'https://www.tcichemicals.com/JP/ja/';
  }
  else{
    command = command.replace(/\+/g, '%2B')
    command = command.replace(/\s/g, '+');
    url += command;
  }
  
  message.channel.send(url);
  
  return 0;
}

exports.description = function(){
  return '\n     [command:help実行時に表示されます。]';
}
