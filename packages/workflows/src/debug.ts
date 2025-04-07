import { math } from "./math.js";
import "./store.js";

process.on("uncaughtException", (error) => {
    console.error("Uncaught exception:");
    console.error(error);
});

process.on("unhandledRejection", (reason) => {
    console.error("Unhandled rejection:");
    console.error(reason);
});

await math.invoke();
