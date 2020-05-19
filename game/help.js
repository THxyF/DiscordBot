exports.cMain = function(command, message){
  let file_list = [], access, len = 0, foo = '';
  const fs = require('fs');
  
  file_list = fs.readdirSync('./game/');
  len = file_list.length;
  
  for(let i = 0; i < len; i ++){   
    access = require('./' + file_list[i]);
    foo += ('game:' + file_list[i].slice(0, -3) +'\n     ' + access.description() + '\n\n');
  }
  
  message.channel.send(foo);
  
  return 0;
}

exports.description = function(){
  return '\n     コマンド一覧を表示します。';
}