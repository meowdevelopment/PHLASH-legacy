const Discord = module.require("discord.js");

module.exports.run = async (bot, message, args, cleanArgs) => {
  let cmds = Object.keys(bot.commandDescriptions);
  cmds.sort();

  let commandTypes = {};
  let totalCommands = 0;

  let disabledCommandTypes = [];
  if (!bot.config.admins.includes(message.author.id)) disabledCommandTypes.push("admin");
  if (message.guild.id !== bot.guild.id) disabledCommandTypes.push("server");

  cmds.forEach((cmd) => {
    let type = bot.commandTypes[cmd].toTitleCase();
    if (disabledCommandTypes.includes(type.toLowerCase())) return;

    commandTypes[type] = commandTypes[type] || [];
    commandTypes[type].push(cmd);
    totalCommands++;
  });

  var sorted = {},
    key,
    a = [];
  for (key in commandTypes) {
    if (commandTypes.hasOwnProperty(key)) {
      a.push(key);
    }
  }
  a.sort();

  for (key = 0; key < a.length; key++) {
    sorted[a[key]] = commandTypes[a[key]];
  }
  commandTypes = sorted;

  const helpEmbed = new Discord.MessageEmbed()
    .setAuthor("Help", message.author.displayAvatarURL())
    .setFooter("Commands", bot.user.displayAvatarURL())
    .setColor(bot.config.color);

  let cmd = args[1];

  if (!cmd) {
    helpEmbed.setDescription(
      "Use `" +
        bot.prefix +
        "help <command>` to view help on a specific command.\nThese are **[**required**]** and **<**optional**>** fields."
    );
    helpEmbed.addField(
      "**All Commands** | **" + totalCommands + "**",
      "`" + cmds.join("`, `") + "`"
    );

    Object.keys(commandTypes).forEach((type) => {
      let types = commandTypes[type];
      helpEmbed.addField(
        `**${type} Commands** | **${Object.keys(types).length}**`,
        `\`${types.join("`\n`")}\``
      );
    });

    message.channel.send(helpEmbed);
    return;
  }

  if (cmd in bot.commandDescriptions) {
    let aliases = [];

    bot.commandAliases.forEach((a) => {
      if (a.for == cmd) aliases = a.aliases;
    });

    if (aliases.length >= 1) {
      aliases = "`" + aliases.join("`, `") + "`";
    } else {
      aliases = "none";
    }

    helpEmbed.setFooter("The " + cmd + " Command");
    helpEmbed.setDescription(
      `${bot.commandDescriptions[cmd]}

**Usage:** ${bot.commandUsages[cmd]}
**Aliases:** ${aliases}`
    );
    message.channel.send(helpEmbed);
    return;
  }
  if (!(cmd in bot.commandDescriptions))
    return message.channel.send("That command does not exist!");
};
module.exports.help = {
  name: "help",
  description: "Shows you the commands in the bot.",
  usage: "help <command>",
  type: "other",
  commandAliases: ["commands", "cmds"],
};
