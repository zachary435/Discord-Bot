// Discord Calling stuff
const discord = require("discord.js");
const YTDL = require("ytdl-core");
const weather = require('weather-js');
const token = "NDAwODA2MjE0NzI1Nzk1ODUw.DTg_cA.g2uJh_qGv_yJxZOkk6UpQLG4F40";
const prefix = "!";

// Functions

function generateHex() {

return '#' + Math.floor(Math.random() * 16777215).toString(16);

}



// Vars

var fs = require('fs');
var commandslist = fs.readFileSync("Storage/commands.txt", "utf8");

var bot = new discord.Client();


var servers = {};



var ballfortunes = [
  "Yes",
  "No",
  "Maybe",
]


// Main CODE :


bot.on('ready', () => {

  // We can post into the console that the bot launched.
  console.log('Bot started.');

});

bot.on("guildMemberAdd", function(member) {

member.guild.channels.find("name", "general-chat").sendMessage(member.toString() + " Welcome to The Stash Media Share network!");

member.addRole(member.guild.roles.find("name", "[ Guest ]"));


//member.guild.createRole({

  // name: member.user.username,
  // color: generateHex(),
  // permissions: []
  // }).then(function(role) {
  //  member.addRole(role);
  //});
  
});

bot.on("message", function(message) {


  if (message.author.equals(bot.user)) return;

  if (!message.content.startsWith(prefix)) return ;

  var args = message.content.substring(prefix.length).split(" ");

  switch (args[0].toLowerCase()) {


    case "ping":
    message.channel.sendMessage("Pong!");
    break;

    case "info":
    message.channel.sendMessage("Information to be added....");
    break; 
   
    case "8ball":
    if (args[1]) message.channel.sendMessage(ballfortunes[Math.floor(Math.random() * ballfortunes.length)]);
    else message.channel.sendMessage("Cant read that!");
    break;
 
    case "embed":
    var embed = new discord.RichEmbed()
    .addField("Added Field", "Test Description")


    message.channel.sendEmbed(embed);
  

    break;

    case "noticeme":
    message.channel.sendMessage(message.author.toString() + " I Noticed you!");

    break;

    case "removerole":
    
    message.member.removeRole(message.member.guild.roles.find("name", "[ Member ]"));
    message.channel.sendMessage("Removed!")


    break;

    case "accept":
      message.channel.sendMessage(message.author.toString() + " You have just aggred to Accept the TOS.");
      message.member.removeRole(message.member.guild.roles.find("name", "[ Guest ]"));
	    message.member.addRole(message.member.guild.roles.find("name", "[ Member ]"));
    



    break;

    case "clear":
        // Variables - Variables make it easy to call things, since it requires less typing.
        let msg = message.content.toUpperCase(); // This variable takes the message, and turns it all into uppercase so it isn't case sensitive.
        let sender = message.author; // This variable takes the message, and finds who the author is.
        let cont = message.content.slice(prefix.length).split(" "); // This variable slices off the prefix, then puts the rest in an array based off the spaces
        let args = cont.slice(1); // This slices off the command in cont, only leaving the arguments.

        async function purge() {
          message.delete(); // Let's delete the command message, so it doesn't interfere with the messages we are going to delete.

          // Now, we want to check if the user has the `bot-commander` role, you can change this to whatever you want.
          if (!message.member.roles.find("name", "[ BOT - Admin ]")) { // This checks to see if they DONT have it, the "!" inverts the true/false
              message.channel.send('You to be a \`Bot Administrator\` role to use this command.'); // This tells the user in chat that they need the role.
              return; // this returns the code, so the rest doesn't run.
          }

          // We want to check if the argument is a number
          if (isNaN(args[0])) {
              // Sends a message to the channel.
              message.channel.send('Please use a number as your arguments. \n Usage: ' + prefix + 'clear <amount>'); //\n means new line.
              // Cancels out of the script, so the rest doesn't run.
              return;
          }

          const fetched = await message.channel.fetchMessages({limit: args[0]}); // This grabs the last number(args) of messages in the channel.
          console.log(fetched.size + ' messages found, deleting...'); // Lets post into console how many messages we are deleting

          // Deleting the messages
          message.channel.bulkDelete(fetched)
              .catch(error => message.channel.send(`Error: ${error}`)); // If it finds an error, it posts it into the channel.
 
      }

      // We want to make sure we call the function whenever the purge command is run.
      purge(); // Make sure this is inside the if(msg.startsWith)
 
      break;

      case "help":

      message.channel.send(commandslist)


      break;

      case "commands":

      message.channel.send(commandslist)

      break;

    default:

    message.channel.sendMessage("Invalid Command!");
    }
});






bot.login(token);