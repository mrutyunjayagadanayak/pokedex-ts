import { CLICommand } from "./command.js"

export function commandHelp(commands: Record<string, CLICommand>): void {
  console.log("Welcome to the Pokedex!");
  console.log("Usage:");

  for (let [key, command] of Object.entries(commands)) {
    console.log(`${key}: ${command.description}`)
  }
}
