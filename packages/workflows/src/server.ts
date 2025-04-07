import { math } from "./math.js";
import { removeHistory } from "./remove-history.js";
import "./store.js";

process.on("uncaughtException", (error) => {
    console.error("Uncaught exception:");
    console.error(error);
});

process.on("unhandledRejection", (reason) => {
    console.error("Unhandled rejection:");
    console.error(reason);
});

await removeHistory.start();
await math.start();

// Begin reading from stdin so the process does not exit.
process.stdin.resume();
