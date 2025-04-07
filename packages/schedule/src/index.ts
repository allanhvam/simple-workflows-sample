import type { CronJobParams } from "cron";
import { CronJob } from "cron";
import type { Trigger } from "simple-workflows";

export const cron = (options: { cronTime: string, runOnInit?: boolean }) => {
    let cronJob: undefined | CronJob<null, null> = undefined;
    return {
        name: "cron",
        description: "Trigger runs based on a cron schedule",
        options,
        start: (workflow: { name: string }, run) => {
            const cronJobParams = {
                cronTime: options.cronTime,
                onTick: async () => {
                    const id = new Date().getTime().toString();

                    await run(id);
                },
                start: true,
                runOnInit: options.runOnInit,
            } satisfies CronJobParams<() => void, void>;

            cronJob = CronJob.from(cronJobParams);
            console.log(`cron: Next ${workflow.name}: ${cronJob.nextDate().toString()}`);
        },
        stop: (workflow: { name: string }) => {
            cronJob?.stop();
            console.log(`cron: ${workflow.name} stopped.`);
        }
    } satisfies Trigger<void>;
};
