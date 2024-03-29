const Discord = module.require("discord.js");
const moment = require("moment");

module.exports.run = async (bot, message, args, cleanArgs) => {
  let format = function (date) {
    return require("moment").utc(date).format("dddd, MMMM Do YYYY, HH:mm:ss") + " UTC";
  };
  let member = message.mentions.members.first() || message.member;

  let infoEmbed = new Discord.MessageEmbed()
    .setAuthor(
      `${member.user.tag} (${member.nickname || member.user.username})`,
      member.user.displayAvatarURL()
    )
    .setColor(bot.config.color)
    .setThumbnail(member.user.displayAvatarURL())
    .addField("ID", member.user.id, true)
    .addField("Joined at", format(member.joinedAt), true)
    .addField("Created At", format(member.user.createdAt), true)
    .setFooter(`Requested by ${message.author.tag}.`, message.author.displayAvatarURL());
  message.channel.send(infoEmbed);
};
module.exports.help = {
  name: "userinfo",
  description: "Get info about a user.",
  usage: "userinfo <user>",
  type: "utility",
  commandAliases: ["ui", "avatar"],
};
