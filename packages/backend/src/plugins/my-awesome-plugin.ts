import { Router } from "express-serve-static-core";
import { PluginEnvironment } from "../types";
import { createRouter } from "@dean/plugin-my-awesome-plugin-backend";

const createPlugin = async (env: PluginEnvironment): Promise<Router> =>{
    return await createRouter({
        logger: env.logger,
        config: env.config,
        database: env.database,
    });
}

export default createPlugin