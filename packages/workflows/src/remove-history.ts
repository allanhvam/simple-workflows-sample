import { cron } from "@simple-workflows-sample/schedule";
import ms from "ms";
import { workflow, WorkflowWorker } from "simple-workflows";
import { Node } from "./services/Node.js";

export const removeHistory = workflow({
    name: "remove-history",
    trigger: cron({ cronTime: "*/5 * * * *" }),
    description: "Each 5 minutes removes history that is more than 10 minutes old.",
    services: {
        node: new Node(),
    },
    run: (services) => async () => {
        const { node } = services;

        const date = new Date(Date.now() - ms("10m"));
        const store = WorkflowWorker.getInstance().store;
        let result = await store.getInstances();
        let count = 0;
        while (result.instances.length !== 0) {
            for (let i = 0; i !== result.instances.length; i++) {
                const instance = result.instances[i];
                if (instance && instance.start < date) {
                    await store.removeInstance(instance.instanceId);
                    count++;
                }
            }
            if (!result.continuationToken) {
                break;
            }
            result = await store.getInstances({ continuationToken: result.continuationToken });
        }
        await node.log(`Removed '${count}' instances.`);
    },
});
