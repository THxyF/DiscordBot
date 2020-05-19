exports.cMain = function(command, message){
  const iMax = 20;
  const fs = require('fs');
  let array = [];
  const datPath = './gameDat/dat.json';
  const channel = message.channel.name;
  const id = message.author.id;
  
  let json = JSON.parse(fs.readFileSync(datPath, 'utf8'));
  let chIndex = json.channels.findIndex(ch => ch.name === channel);
  
  if(/^[0-9]+$/.test(command)){
    if(command > iMax){
      message.reply('<num>が大きすぎます。(<num>は' + iMax + '以下でなくてはなりません。)');
      
      return 1;
    }
    else {
      for(let i = 0; i < command; i++){
        switch(Math.round(Math.random()*21)){
          case 0:
            array[i] = 'cos x';
            break;
          case 1:
            array[i] = 'sin x';
            break;
          case 2:
            array[i] = 'cos x';
            break;
          case 3:
            array[i] = 'e^x';
            break;
          case 4:
            array[i] = 'x';
            break;
          case 5:
            array[i] = 'x^2';
            break;
          case 6:
            array[i] = '1';
            break;
          case 7:
            array[i] = '0';
            break;
          case 8:
            array[i] = '∇';
            break;
          case 9:
            array[i] = '∆';
            break;
          case 10:
            array[i] = 'd/dx';
            break;
          case 11:
            array[i] = '∫';
            break;
          case 12:
            array[i] = '*';
            break;
          case 13:
            array[i] = '÷';
            break;
          case 14:
            array[i] = 'lim[x→∞]';
            break;
          case 15:
            array[i] = 'lim[x→-∞]';
            break;
          case 16:
            array[i] = 'lim[x→0]';
            break;
          case 17:
            array[i] = 'limsup[x→∞]';
            break;
          case 18:
            array[i] = 'liminf[x→∞]';
            break;
          case 19:
            array[i] = '√';
            break;
          case 20:
            array[i] = 'f^-1';
            break;
          case 21:
            array[i] = 'log';
            break;
        }
      }
    }
  }else{
    message.reply('構文エラー(<num>は整数でなくてはなりません。)');
    
    return 1;
  }
  
  
  
  message.reply('DMに'+array.length + '枚手札を送りました。')
  message.author.send(array);
  
  return 0;
}

exports.description = function(){
  return '\n     手札を<num>枚ランダムに生成します。';
}