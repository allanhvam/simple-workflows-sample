import { FileSystemWorkflowHistoryStore, MemoryWorkflowHistoryStore, WorkflowWorker } from "simple-workflows";
import superjson from "superjson";

const worker = WorkflowWorker.getInstance();

worker.log = (s: string) => {
    const message = `[${new Date().toISOString()}] ${s}`;
    console.log(message);
};

if (process.env.USE_FS) {
    console.log("store: Using FileSystemWorkflowHistoryStore");
    worker.store = new FileSystemWorkflowHistoryStore({ path: "./workflow-history/" });

    if (process.env.USE_SUPERJSON) {
        worker.store = new FileSystemWorkflowHistoryStore({ path: "./workflow-history/", serializer: superjson });
    }
} else {
    console.log("store: Using MemoryWorkflowHistoryStore");
    worker.store = new MemoryWorkflowHistoryStore();
}
