import consola from 'consola';
import { ActivityType, Client, Events } from 'discord.js'

export default {
	name: Events.ClientReady,
	once: true,
	async execute(client: Client<true>) { // This event runs when the bot is ready
		consola.ready(`Logged in as ${client.user?.tag}`);
		client.user?.setActivity('Ready to serve!', { type: ActivityType.Playing });
	}
};