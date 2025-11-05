import { test } from "node:test";
import assert from "node:assert";
import { math } from "@simple-workflows-sample/workflows";
import { WorkflowWorker } from "simple-workflows";

const worker = WorkflowWorker.getInstance();
worker.log = (s: string) => {
    const message = `[${new Date().toISOString()}] ${s}`;
    console.log(message);
};

test("math workflow calls math service correctly", async () => {
    // Arrange
    let xArg: number | undefined;
    let yArg: number | undefined;

    // Make fake services
    const services = {
        node: {
            log: async (): Promise<void> => {
                return Promise.resolve();
            }
        },
        math: {
            add: async (x: number, y: number) => {
                if (xArg !== undefined) {
                    throw new Error();
                }
                xArg = x;
                yArg = y;
                return Promise.resolve(42);
            }
        },
    };

    // Act
    const result = await math.run(services)();

    // Assert
    assert.equal(result, 42);
    assert.equal(xArg, 1);
    assert.equal(yArg, 2);
});

test("math workflow handles unstable math service", async () => {
    // Arrange
    let run = 0;
    
    // Make fake services
    const services = {
        node: {
            log: async (): Promise<void> => {
                return Promise.resolve();
            }
        },
        math: {
            add: async (x: number, y: number) => {
                // Fail first run
                if (run === 0) {
                    run = 1;
                    throw new Error();
                }
                return Promise.resolve(x + y);
            }
        },
    };

    // Act
    const result = await math.run(services)();

    // Assert
    assert.equal(result, 3);
});