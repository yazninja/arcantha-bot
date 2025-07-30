import { ChatInputCommandInteraction, MessageFlags, SlashCommandBuilder, TextDisplayBuilder } from "discord.js";

// This is an example command file for a Discord bot using the Discord.js library.
// It defines a simple "ping" command that replies with "Pong!" when invoked.
export const command = {
	data: new SlashCommandBuilder()
		.setName("ping")
		.setDescription("Replies with Pong!"),
	// The execute function is called when the command is invoked
	async execute(interaction: ChatInputCommandInteraction) {
		await interaction.reply({
			flags: MessageFlags.IsComponentsV2, // This flag is important for new commands
			components: [
				new TextDisplayBuilder().setContent(`Pong! 🏓 Latency: ${Date.now() - interaction.createdTimestamp}ms`)
			],
		})
	}
};