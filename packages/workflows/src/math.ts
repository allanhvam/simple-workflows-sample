import { workflow } from "simple-workflows";
import { Node } from "./services/Node.js";
import { cron } from "@simple-workflows-sample/schedule";
import { Math } from "./services/index.js";

export const math = workflow({
    name: "math",
    description: "Adds two numbers each minute",
    trigger: cron({ cronTime: "*/1 * * * *" }),
    services: {
        node: new Node(),
        math: new Math(),
    },
    run: (services) => async () => {
        const { math } = services;

        const result = await math.add(1, 2);

        return result;
    },
});
