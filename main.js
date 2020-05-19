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

const ch_name = "一般";

cron.schedule('* 0 * * *', () => {
  client.channels.forEach(channel => {
    if (channel.name === ch_name && channel.type === 'text') {
      channel.send("0分だよ。");
      return;
    }
    return;
  });
  console.log('0分だよ');
})

client.on('ready', message => {
  client.user.setPresence({ game: { name: 'with discord.js' } });
  console.log('bot is ready!');
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
    //message.channel.send('there\'s nothing to debug.');
    //let emoji = client.emojis.find("name", "AC");
    /*message.channel.send(':eyes:');
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
    let text = fs.readFileSync("./gameDat/members.txt", 'utf-8')
    fs.writeFileSync('./gameDat/dat.json', '', 'utf-8', (err, data) => {
      if(err) console.log(err);
      else console.log('write end');
    });
    fs.unlinkSync('./gameDat/dat.json');
    let authorName = message.author.username;
    message.channel.send(`${authorName},Hello!`);*/
    message.channel.send('https://www.google.com/');
    
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
  else if(/^ナブラゲームサーバー/.test(message.channel.name)){
    if(message.content.startsWith('THFgame:')){
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
  }
  
  return 0;
});

client.on("messageReactionAdd", (messageReaction, user) => {
    const rolename = messageReaction.message.guild.roles.find(r => r.name === "test");
  
    console.log('OK');
    messageReaction.message.reply(messageReaction.emoji.name);
    if(messageReaction.emoji.name == 'eyes'){
        messageReaction.message.member.addRole(rolename);
        messageReaction.message.reply('Hi!');
    }
})

if (process.env.DISCORD_BOT_TOKEN == undefined) {
  console.log('please set ENV: DISCORD_BOT_TOKEN');
  process.exit(0);
}

client.login(process.env.DISCORD_BOT_TOKEN);
