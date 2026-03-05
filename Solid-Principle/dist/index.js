import { manager } from "./manager.js";
async function run() {
    await manager.loadFromApi();
    console.log(manager.getAll());
}
run();
