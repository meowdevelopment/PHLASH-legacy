const Discord = module.require("discord.js");

module.exports.run = async (bot, message, args, cleanArgs) => {
  if (message.channel.type != "dm") return;

  const embed = new Discord.RichEmbed();
  embed.setColor(bot.color);
  embed.setFooter("Please answer all questions.");

  if (message.channel.type !== "dm") return;
  embed.setDescription(
    "Thank you for applying to become a Phantom Developer! I will ask you a few questions.\nSay `cancel` at any time to cancel your application."
  );
  message.author.send(embed);

  setTimeout(function () {
    embed.setDescription(
      "**1.** Is there any particular reason why you want to be a PHLAME Developer?"
    );
    embed.setFooter("");
    message.channel.send(embed);
  }, 1000);
  console.log(message.author.username + " is submitting a request to be a PHLAME Developer.");

  let q = 1;
  let app = [];

  function finish() {
    this.reviewRoleID = "726332280582176829";
    /* finish function */
    let codeBlock = "```diff\n" + app.join("\n\n") + "```";
    /* create code block with application */
    bot.channels
      .get("704771806699061279")
      .send(message.author.username + "\n" + codeBlock + `<@&${this.reviewRoleID}>`);
    /* send to app review channel */
    //client.channels.get("632360059761983531").send(message.author.username + "\n" + codeBlock);
    /* log the app */
  }

  // This is your collector. It is set to expire after 30 seconds, but you can change that.
  // The filter is set to only accept messages from the one user, and only in the channel it is sent in.
  const collector = new Discord.MessageCollector(
    message.channel,
    (m) => m.author.id === message.author.id,
    { time: 3000000 }
  );

  collector.on("collect", (msg) => {
    /* enter answers */
    if (msg.content == "cancel") {
      q = 0;
      embed.setDescription(":negative_squared_cross_mark: Canceled your application!");
      message.channel.send(embed);
      return;
      /* cancel */
    }
    if (q == 1) {
      app.push("+Is there any particular reason why you want to be a Phantom Developer?");
      app.push(msg.content);

      q = 2;
      embed.setDescription(
        "**2.** Briefly describe what you will be bringing to the team. :exclamation: Please give the main points!"
      );
      message.channel.send(embed);
      return;
    }
    /* question 1-6 */
    if (q == 2) {
      app.push(
        "+Briefly describe what you will be bringing to the team. :exclamation: Please give the main points!"
      );
      app.push(msg.content);

      q = 3;
      embed.setDescription("**3.** Are there any projects you have already worked on?");
      message.channel.send(embed);
      return;
    }
    if (q == 3) {
      app.push("+Are there any projects you have already worked on?");
      app.push(msg.content);

      q = 4;
      embed.setDescription("**4.** If yes, please give us the link to Github or Glitch project.");
      message.channel.send(embed);
      return;
    }
    if (q == 4) {
      app.push("+If yes, please give us the link to Github or Glitch project.");
      app.push(msg.content);

      q = 5;
      embed.setDescription("**5.** Please give us your **Discord Name and Tag**");
      message.channel.send(embed);
      return;
    }
    if (q == 5) {
      app.push("+Please give us your Discord Name and Tag");
      app.push(msg.content);

      q = 0;
      embed.setDescription(
        "Thank you for applying! Your application has been sent off for review!"
      );
      message.channel.send(embed);
      return finish();
    }
    console.log(message.author.username + " submitted a request to be a PHLAME Developer.");
  });
};
module.exports.help = {
  name: "apply-dev",
  description: "Apply for the developer role.",
  usage: "apply-dev",
  type: "development",
  commandAliases: ["developer"],
};
