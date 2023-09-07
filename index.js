const { Client, Events, GatewayIntentBits, Collection } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const dotenv = require('dotenv')
dotenv.config()
const { TOKEN, CLIENT_ID, GUID } = process.env

const fs = require("node:fs")
const path = require("node:path")

const commandsPath = path.join(__dirname, "commands")
const commandsFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"))


client.commands = new Collection()

commandsFiles.forEach(file => {

	const filePath = path.join(commandsPath, file)
	const command = require(filePath)

	if("data" in command && "execute" in command)
		client.commands.set(command.data.name, command)
	else
		console.log(`esse comando ${filePath} está vazio`);
});


client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.login(TOKEN);

client.on(Events.InteractionCreate, async interaction => {
	if(!interaction.isChatInputCommand()) return
	
	const command = interaction.client.commands.get(interaction.commandName)

	if(!command){
		console.error("deu ruim");
		return
	}

	try {
		await command.execute(interaction)	
	} catch (error) {
		console.error(error)
		await interaction.reply("Deu ruim Deu bom nao sei o que eu fiz")
	}
})
