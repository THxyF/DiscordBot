exports.cMain = function(command, message){
  let url = 'https://www.google.com/search?q=';
  
  if(command === '(empty)'){
    url = 'https://www.google.com/';
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