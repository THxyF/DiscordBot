exports.cMain = function(command,message){
  require('date-utils');
  
  let now = new Date();
  let day = now.getDay();
  let date = now.getDate();
  let year = now.getFullYear();
  let hour = now.getHours();
  let milli = now.getMilliseconds();
  let min = now.getMinutes();
  let mon = now.getMonth();
  let sec = now.getSeconds();
  
  switch(day){
    case 0:
      day = '日';
      break;
    case 1:
      day = '月';
      break;
    case 2:
      day = '火';
      break;
    case 3:
      day = '水';
      break;
    case 4:
      day = '木';
      break;
    case 5:
      day = '金';
      break;
    case 6:
      day = '土';
      break;
    default:
      day = '天';
  }
  
  message.channel.send(year+'年'+mon+1+'月'+date+'日'+day+'曜日'+hour+'時'+min+'分'+sec+'.'+milli+'秒をお知らせします');
  
  message.channel.send('OK');
  
  return 0;
}

exports.description=function(){
  return ':time\n     現在時刻をお知らせします\n\n';
}