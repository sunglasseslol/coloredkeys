import { DependencyContainer } from "tsyringe";

// Servers
import { DatabaseServer } from "@spt-aki/servers/DatabaseServer";

// Mod load types
import { IPostDBLoadMod } from "@spt-aki/models/external/IPostDBLoadMod";

// Generic
import { ILogger } from "@spt-aki/models/spt/utils/ILogger";
import { BaseClasses } from "@spt-aki/models/enums/BaseClasses";
import { LogTextColor } from "@spt-aki/models/spt/logging/LogTextColor";
import * as fs from "fs";

// Config
import * as config from "../config/config.json";
import * as keys from "../config/keys.json";

class Mod implements IPostDBLoadMod
{
    public isPluginLoaded(): boolean
    {
        const pluginName = "rairai.colorconverterapi.dll";
        try 
        {
            const pluginList = fs.readdirSync("./BepInEx/plugins").map(plugin => plugin.toLowerCase());
            return pluginList.includes(pluginName);
        }
        catch 
        {
            return false;  
        }
    }

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

        // check if colorconverter is in bepinex/plugins

        if (this.isPluginLoaded()) {
            for (const item in items) {
                const itemProps = items[item]._props;
                const itemId = items[item]._id;
    
                // fuck this if statement is ugly af
                // maybe convert to switch statement
                if (items[item]._parent == BaseClasses.KEY_MECHANICAL) {
                    if (keys.customs.includes(itemId))
                        itemProps.BackgroundColor = config.customsColor
                    if (keys.groundzero.includes(itemId))
                        itemProps.BackgroundColor = config.groundZeroColor
                    if (keys.factory.includes(itemId))
                        itemProps.BackgroundColor = config.factoryColor
                    if (keys.lighthouse.includes(itemId))
                        itemProps.BackgroundColor = config.lightouseColor
                    if (keys.shoreline.includes(itemId))
                        itemProps.BackgroundColor = config.shorelineColor
                    if (keys.interchange.includes(itemId))
                        itemProps.BackgroundColor = config.interchangeColor
                    if (keys.reserve.includes(itemId))
                        itemProps.BackgroundColor = config.reserveColor
                    if (keys.streets.includes(itemId))
                        itemProps.BackgroundColor = config.streetsColor
                    if (keys.woods.includes(itemId))
                        itemProps.BackgroundColor = config.woodsColor
                    if (keys.labs.includes(itemId))
                        itemProps.BackgroundColor = config.labsColor
                }
            }
            logger.logWithColor("[ ColorCodedKeys ] All key background colors have been changed",  LogTextColor.CYAN);
        }
    }
}

module.exports = { mod: new Mod() }