// Response for Uptime Robot
const http = require('http');
http
  .createServer(function(request, response) {
    response.writeHead(200, { 'Content-Type': 'text/plain' });
    response.end('Discord bot is active now \n');
  })
  .listen(3000);

// Discord bot implements
const discord = require('discord.js');
const fs = require('fs');
const client = new discord.Client();
const default_command = 'help';
const cron = require('node-cron');
//const FormData = require('form-data');
//const { URL, URLSearchParams } = require('url');
const fetch = require('node-fetch');
//const Headers = fetch.Headers;

const ch_name = "一般";

let cronJob = require('cron').CronJob;

let cronTime = " 0 0 * * *";

let job = new cronJob({
  cronTime: cronTime
  , onTick: function() {
    client.channels.forEach(channel => {
      if (channel.name === ch_name && channel.type === 'text') {
        channel.send("日付けが変わりました!!今日も一日頑張るぞい!");
        return;
      }
      return;
    });
  }
  , onComplete: function() {
    console.log('onComplete!')
  }
  , start: false
  
  , timeZone: "Asia/Tokyo"
});

job.start();

client.on("ready", message => {
  client.user.setPresence({ game: { name: "with discord.js" } });
  console.log("bot is ready!");
});

client.on('message', message => {
  
  if(message.author.id === client.user.id)return 0;
  
  if(message.author.bot)return 0;
  
  if(/もふもふ/.test(message.content)){
    message.reply('げしげし?');
    
    if(message.isMemberMentioned(client.user)){
      message.reply('げしげし!');
    }
    
    return 0;
  }
  
  if(/Tbug/.test(message.content)){
    /*
    message.channel.send('there\'s nothing to debug.');
    let emoji = client.emojis.find("name", "AC");
    message.channel.send(':eyes:');
    message.channel.send({
      embed:{
        image:{
          url:'https://cdn.glitch.com/6b8c97d4-ff63-4a60-b806-209a425a028d%2FWJ(2).png?v=1589711667901'
        }
      }
    });
    fs.writeFile("./gameDat/members.txt", "Hello World.", 'utf-8', (err, data) => {
      if(err) console.log(err);
      else console.log('write end');
    });
    let text = fs.readFileSync("./commandDat/timer.json", 'utf-8')
    fs.writeFileSync('./commandDat/timer.json', '', 'utf-8', (err, data) => {
      if(err) console.log(err);
      else console.log('write end');
    });
    fs.unlinkSync('./gameDat/dat.json');
    let authorName = message.author.username;
    message.channel.send(`${authorName},Hello!`);
    
    const url = message.content.replace(/^Tbug\s/, '');
    let titleA = [];
    
    fetch(url)
	    .then(res => res.text(), errc => {
        console.log(errc);
        return '情報の取得に失敗しました。';
      }).then(body => {
        if(body.length > 1000){
          body = body.slice(0, 1000) + '...';
          console.log('それは表示するというにはあまりにも大きすぎた。\n');
        }
      
        titleA = body.match(/<title>.*<\/title>/);
        if(titleA !== null)titleA = titleA[0].match(/>.*</);
        if(titleA !== null)titleA = titleA[0].match(/[^><]+/);
        if(titleA !== null)message.channel.send('title:' + titleA);
        else message.channel.send('titleは見つかりませんでした。');
        
        //message.channel.send(body);
        console.log(body);
        return;
      }, errc => {console.log('?')});
    */
    
    const datPath = './commandDat/timer.json';
    const json = {"timers":[{"hour":"","min":"","sec":"","channel":"","user":"","text":""}]}
    let rjson = JSON.parse(fs.readFileSync(datPath, 'utf8'));
    
    console.log(rjson);
    
    fs.writeFileSync(datPath, JSON.stringify(json));
    
    return 0;
  }
  
  if (message.content.startsWith('THFcommand:') && !message.author.bot) {
    let command = message.content.replace(/^THFcommand:/, '');
    let command_name, access, command_pass;

    if (command == '') {
      command_name = default_command;
      command = '(empty)';
    } 
    else if (command.indexOf(' ') > -1) {
      command_name = command.slice(0, command.indexOf(' '));
      command = command.replace(/^.*?\s/, '');
    } 
    else {
      command_name = command;
      command = '(empty)';
    }

    command_pass = './commands/' + command_name + '.js';

    if (fs.existsSync(command_pass)) {
      access = require(command_pass);

      if (access.cMain(command, message) == -1) {
        message.reply('エラーが発生しました。\n(\'command:help\'を実行してみてください。)');
      }
    } 
    else {
      message.reply('不明なコマンドです。\n(\'command:help\'を実行してみてください。)');
    }
  }
  else if(message.content.startsWith('THFgame:')){
    if(/^ナブラゲームサーバー/.test(message.channel.name)){
      let str = message.content.replace(/^THFgame:/, '');
      let type, path, access;
      
      if (str == '') {
        type = default_command;
        str = '(empty)';
      } 
      else if (str.indexOf(' ') > -1) {
        type = str.slice(0, str.indexOf(' '));
        str = str.replace(/^.*?\s/, '');
      } 
      else {
        type = str;
        str = '(empty)';
      }
      
      path = './game/' + type + '.js';
      
      if (fs.existsSync(path)) {
        access = require(path);

        if (access.cMain(str, message) == -1) {
          message.reply('エラーが発生しました。\n(\'game:help\'を実行してみてください。)');
        }
      } 
      else {
        message.reply('不明なコマンドです。\n(\'game:help\'を実行してみてください。)');
      }
    }
    else{
      message.reply('THFgameコマンドは専用チャンネルでしか使えないゾ。\nTHFcommand:makeNBRChを使うんだ。');
    }
  }
  
  return 0;
});

client.on("messageReactionAdd", (messageReaction, user) => {
    //const rolename = messageReaction.message.guild.roles.find(r => r.name === "test");
  
    console.log('OK');
    /*messageReaction.message.reply(messageReaction.emoji.name);
    if(messageReaction.emoji.name == 'eyes'){
        messageReaction.message.member.addRole(rolename);
        messageReaction.message.reply('Hi!');
    }*/
})

if (process.env.DISCORD_BOT_TOKEN == undefined) {
  console.log('please set ENV: DISCORD_BOT_TOKEN');
  process.exit(0);
}

client.login(process.env.DISCORD_BOT_TOKEN);
