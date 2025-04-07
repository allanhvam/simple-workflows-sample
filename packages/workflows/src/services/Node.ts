import { WorkflowContext } from "simple-workflows";

export class Node {
    public log = async (message: unknown): Promise<void> => {
        const context = WorkflowContext.current();

        if (context) {
            if (typeof message === "string") {
                context.log(() => `${context.workflowId}: ${message}`);
            } else {
                context.log(() => `${context.workflowId}: ${JSON.stringify(message)}`);
            }
        } else {
            console.log(message);
        }
        return Promise.resolve();
    };
}