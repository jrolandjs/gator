import {
  type CommandsRegistry,
  registerCommand,
  runCommand,
} from "./commands/commands";
import { handlerLogin } from "./commands/users";

function main() {
  // strip off 'npm run start', leaving only the custom commands
  const args = process.argv.slice(2);

  // check if command is provided
  if (args.length < 1) {
    console.log("usage: cli <command> [args...]");
    process.exit(1);
  }

  const cmdName = args[0]; // store given command
  const cmdArgs = args.slice(1); // store the given argument after the command
  const commandsRegistry: CommandsRegistry = {}; // create empty in-memory db storing valid commands

  // add 'login' as command to command DB, providing function called when 'login' is called
  registerCommand(commandsRegistry, "login", handlerLogin);

  try {
    runCommand(commandsRegistry, cmdName, ...cmdArgs);
  } catch (err) {
    if (err instanceof Error) {
      console.error(`Error running command ${cmdName}: ${err.message}`);
    } else {
      console.error(`Error running command ${cmdName}: ${err}`);
    }
    process.exit(1);
  }
}

main();
