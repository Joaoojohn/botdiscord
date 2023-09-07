

const  { REST, Routes, Guild, bold } =  require("discord.js")
const dotenv = require('dotenv')
dotenv.config()
const { TOKEN, CLIENT_ID, GUID } = process.env

const fs = require("node:fs")
const path = require("node:path")

const commandsPath = path.join(__dirname, "commands")
const commandsFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"))

const commands = []

commandsFiles.forEach(file => {
    const command = require(`./commands/${file}`)
    commands.push(command.data.toJSON())
});

const rest = new REST({version: "10"}).setToken(TOKEN);

(async () => 
{
    try 
    {
        const data = await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUID), { body: commands });
        console.log("comandos registrados!")
    } 
    catch (error) 
    {
        console.error(error)
    }
})()