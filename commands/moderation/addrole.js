const { MessageEmbed } = require("discord.js");
const db = require('quick.db');
 
module.exports = {
  name: "addrole",
  aliases: ["ar"],
  enabled: true,			
  memberPermissions: [ "MANAGE_ROLES" ],			
  botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],		
  ownerOnly: false,			
  cooldown: 8000,
 
    run: async (bot, message, args) => {
 
        if (!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send("**You Dont Have The Permissions To Add Roles To Users! - ```[MANAGE_ROLES]```**");
        if (!message.guild.me.hasPermission("MANAGE_ROLES")) return message.channel.send("**I Dont Have The Permissions To Add Roles To Users! - ```[MANAGE_ROLES]```**");
 
        if (!args[0]) return message.channel.send("**Please Enter A Role!**")
 
        let rMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase());
        if (!rMember) return message.channel.send("**Please Enter A User Name!**");
        if (rMember.roles.highest.comparePositionTo(message.guild.me.roles.highest) >= 0) return message.channel.send('**Cannot Add Role To This User!**')
 
        let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[1]) || message.guild.roles.cache.find(rp => rp.name.toLowerCase() === args.slice(1).join(' ').toLocaleLowerCase());
        if (!args[1]) return message.channel.send("**Please Enter A Role!**")
 
        if (!role) return message.channel.send("**Could Not Find That Role!**")
 
        if (role.managed) return message.channel.send("**Cannot Add That Role To The User!**")
        if (message.guild.me.roles.highest.comparePositionTo(role) <= 0) return message.channel.send('**Role Is Currently Higher Than Me Therefore Cannot Add It To The User!**')
 
        if (rMember.roles.cache.has(role.id)) return message.channel.send("**User Already Has The Role!**")
        if (!rMember.roles.cache.has(role.id)) await rMember.roles.add(role.id);
        var sembed = new MessageEmbed()
            .setColor("#000000")
            .setAuthor(message.guild.name, message.guild.iconURL())
            .setDescription(`**Role has been added to:** ${rMember.user.username}`)
        message.channel.send(sembed);
    }
};
