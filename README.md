# arc-bot

A Discord bot built with Bun and TypeScript. This bot is designed to handle various events and commands within a Discord server, providing a robust framework for interaction.

# Getting Started
To install dependencies:

```bash
bun install
```

To run:

```bash
bun run start-bot
```


# Contributing Guide
If you want to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them with a clear message.
4. Push your changes to your fork.
5. Create a pull request against the main branch of the original repository.

Events - `/src/events/`
Contains event handlers for various Discord events. Each file corresponds to a specific event, such as `messageCreate.ts` for handling new messages.

Commands - `/src/commands/`
Contains command handlers for the bot. Each file corresponds to a specific command, such as `ping.ts` for the ping command.

# Features
- **Event Handling**: The bot listens for various Discord events and responds accordingly.
- **Command Handling**: The bot can execute commands based on user input.
- **Environment Configuration**: Uses a `.env` file to manage sensitive information like the bot token.
- **TypeScript Support**: The project is written in TypeScript for better type safety and development experience.
- **Bun as Runtime**: The project uses Bun as the JavaScript runtime for fast execution and development.

# Requirements
- Node.js or Bun installed on your machine.



# License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details

This project was created using `bun init` in bun v1.2.19. [Bun](https://bun.com) is a fast all-in-one JavaScript runtime.
