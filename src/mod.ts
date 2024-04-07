import { DependencyContainer } from "tsyringe";

// Servers
import { DatabaseServer } from "@spt-aki/servers/DatabaseServer";

// Mod load types
import { IPostDBLoadMod } from "@spt-aki/models/external/IPostDBLoadMod";

// Generic
import { ILogger } from "@spt-aki/models/spt/utils/ILogger";
import { BaseClasses } from "@spt-aki/models/enums/BaseClasses";
import { LogTextColor } from "@spt-aki/models/spt/logging/LogTextColor";

// Config
import * as config from "../config/config.json";
import * as keys from "../config/keys.json";

class Mod implements IPostDBLoadMod
{
    public postDBLoad(container: DependencyContainer): void 
    {
        const logger = container.resolve<ILogger>("WinstonLogger");
        const db = container.resolve<DatabaseServer>("DatabaseServer");
        const tables = db.getTables();
        const items = tables.templates.items;

        const random = Math.floor(Math.random() * 1000 + 1)
        // const random = 1000;
        if (random == 1000)
            logger.logWithColor("[ InfMeds ] its a 1 in 1000 chance to get this message and since you recieved it that means your special", LogTextColor.MAGENTA);

        for (const item in items) {
            const itemProps = items[item]._props;
            const itemId = items[item]._id;

            if (items[item]._parent == BaseClasses.KEY_MECHANICAL) {
                if (keys.customs.includes(itemId))
                    itemProps.BackgroundColor = config.customsColor
            }
        }
        logger.logWithColor("[ ColorCodedKeys ] All key background colors have been altered",  LogTextColor.CYAN);
    }
}

module.exports = { mod: new Mod() }