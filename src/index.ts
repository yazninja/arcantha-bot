import { Client, GatewayIntentBits, Partials, Collection, TextChannel, resolveColor, MessageFlags } from 'discord.js';
import consola from 'consola';
import { readdirSync } from 'node:fs';
import { ServerChannels } from './configs';

declare module 'discord.js' {
	export interface Client {
		commands: Collection<unknown, any>;
		devMode: boolean;
	}
}

// Creates a Client instance with specific intents and partials
export const client = new Client({
	intents: [
		GatewayIntentBits.GuildMembers, // Enables member-related events
		GatewayIntentBits.Guilds, // Enables guild-related events
		GatewayIntentBits.GuildModeration, // Enables moderation-related events
		GatewayIntentBits.GuildExpressions, // Enables emoji and sticker-related events
		GatewayIntentBits.GuildIntegrations, // Enables integration-related events
		GatewayIntentBits.GuildWebhooks, // Enables webhook-related events
		GatewayIntentBits.GuildInvites, // Enables invite-related events
		GatewayIntentBits.GuildVoiceStates, // Enables voice state-related events
		GatewayIntentBits.GuildPresences, // Enables presence-related events
		GatewayIntentBits.GuildMessages, // Enables message-related events
		GatewayIntentBits.GuildMessageReactions, // Enables reaction-related events
		GatewayIntentBits.GuildMessageTyping, // Enables typing-related events
		GatewayIntentBits.DirectMessages, // Enables direct message-related events
		GatewayIntentBits.DirectMessageReactions, // Enables direct message reaction-related events
		GatewayIntentBits.DirectMessageTyping, // Enables direct message typing-related events
		GatewayIntentBits.MessageContent, // Enables message content-related events
		GatewayIntentBits.GuildScheduledEvents, // Enables scheduled event-related events
		GatewayIntentBits.AutoModerationConfiguration, // Enables auto-moderation configuration events
		GatewayIntentBits.AutoModerationExecution // Enables auto-moderation execution events
	],
	partials: [Partials.User, Partials.Channel, Partials.GuildMember, Partials.Message, Partials.Reaction, Partials.GuildScheduledEvent, Partials.ThreadMember] // Specifies which partials to use
});

client.commands = new Collection();
const mainFolder = 'src'; // Main folder where command files are located
const fileType = '.ts'; // File type of command files

/** REGISTER COMMANDS */
const commandFolders = readdirSync(`./${mainFolder}/commands/`);
for (const folder of commandFolders) {
	const commandFiles = readdirSync(`./${mainFolder}/commands/${folder}`).filter((file) => file.endsWith(fileType));
	consola.info(`Loading commands from ${folder}`, commandFiles);
	for (const file of commandFiles) {
		const { command } = await import(`./commands/${folder}/${file}`);
		client.commands.set(command.data.name, command);
		consola.info('\x1b[32m%s\x1b[0m', 'Registered Command:', command.data.name, command?.category);
	}
}

client.login(process.env.BOT_TOKEN);

/*** ERROR HANDLING ***/
process.on('unhandledRejection', (error: Error) => {
	consola.info('Unhandled Rejection');
	consola.error(error);
	consola.error(error.stack);
	(client.channels.cache.get(ServerChannels.botLog) as TextChannel).send({ // TODO: Convert to ComponentsV2
		content: `Unhandled Rejection`,
		embeds: [
			{
				color: resolveColor('Red'),
				title: 'Error',
				description: `${error.name}`,
				fields: [
					{ name: 'Message', value: `${error.message}` },
					{ name: 'Task', value: `${error.stack?.slice(error.stack?.lastIndexOf('at'), error.stack?.length)}` },
					{ name: 'Origin', value: `${error.stack?.slice(0, 255)}` }
				]
			}
		]
	});
});

process.on('uncaughtException', (error: Error) => {
	consola.info('Uncaught Exception');
	consola.error(error);
	consola.error(error.stack);
	(client.channels.cache.get(ServerChannels.botLog) as TextChannel).send({ // TODO: Convert to ComponentsV2
		content: `'Uncaught Exception`,
		embeds: [
			{
				color: resolveColor('Red'),
				title: 'Error',
				description: `${error.name}`,
				fields: [
					{ name: 'Message', value: `${error.message}` },
					{ name: 'Task', value: `${error.stack?.slice(error.stack?.lastIndexOf('at'), error.stack?.length)}` },
					{ name: 'Origin', value: `${error.stack?.slice(0, 255)}` }
				]
			}
		]
	});
});