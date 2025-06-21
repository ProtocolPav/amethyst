import {world} from "@minecraft/server";
import {MinecraftDimensionTypes} from "@minecraft/vanilla-data";

export default class DragonHeartMessage {
    public static heart_mined(heartsMined: number) {
        const heartMessages = {
            1: `§l§5The Ancient Dragon's roar echoes across dimensions...\n§r"NO! You dare shatter my essence? My remaining §l5 Hearts§r beat frantically across the Relic Islands. Each one you destroy weakens my immortal form... I must stop you before it's too late!"`,

            2: `§l§5The Dragon's voice cracks with growing desperation...\n§r"My power... it's draining away! §l4 Hearts§r still pulse on distant islands, but I can feel my strength ebbing. You don't understand - without them, I become... vulnerable. MORTAL."`,

            3: `§l§5Panic seeps into the Dragon's ancient voice...\n§r"Three of my Hearts destroyed! Only §l3 remain§r to sustain my immortality! My scales grow brittle, my fire dims... If you take the rest, I'll be nothing more than flesh and bone. Please... reconsider this madness!"`,

            4: `§l§5The Dragon's terror becomes palpable...\n§r"I BEG YOU, STOP! With only §l2 Hearts§r left, my ancient body begins to fail! My wings tremble, my breath grows weak... Soon I'll be defenseless against mortal weapons. You are not victorious, you are VICIOUS!"`,

            5: `§l§5The Dragon's voice breaks into desperate whispers...\n§r"One... only §l1 Heart§r remains between me and certain death. I can feel mortality creeping through my veins like poison. When it's gone, any blade can pierce my hide, any arrow can find my heart. You've doomed me to die like... like the rest of them."`,

            6: `§l§5The Dragon's final scream pierces reality itself...\n§r"IT IS FINISHED! All §l6 Hearts§r lie shattered! My immortality bleeds away like water through sand! I am... I am just flesh now. Mortal. Killable. The hunt begins, and I... I am the prey."`
        };

        // @ts-ignore
        return heartMessages[heartsMined] || "§cError: Invalid heart count";
    }

    public static health_stage_message(stage: number) {
        if (stage === 1) {
            // Stage 1: 75% health - confident and calling for help
            const stage1Messages = [
                `§l§5The Ancient Dragon roars with fury...\n§r"You think destroying my Hearts makes me weak? I am still DEATH INCARNATE! My minions will feast on your bones!"`,
                `§l§5Draconic power surges through the battlefield...\n§r"Mortal fools! Even weakened, I command legions! Rise, my servants! Show them the price of defiance!"`,
                `§l§5The Dragon's eyes blaze with ancient hatred...\n§r"You may have made me vulnerable, but I am FAR from defeated! Behold the armies that serve the Dragon Lord!"`,
                `§l§5Wings beat like thunder across the End...\n§r"My immortality may be gone, but my RAGE remains eternal! Come forth, children of darkness! Defend your master!"`,
                `§l§5The battlefield trembles with draconic might...\n§r"You celebrate too early, mortals! Even a mortal dragon commands respect! My minions will drown you in shadow!"`
            ];
            return stage1Messages[Math.floor(Math.random() * stage1Messages.length)];
        } else if (stage === 2) {
            // Stage 2: 25% health - desperate and frantic
            const stage2Messages = [
                `§l§5The Dragon's voice cracks with desperation...\n§r"No... NO! This cannot be! My loyal servants, protect me! I refuse to die like some common beast!"`,
                `§l§5Blood drips from ancient scales...\n§r"I am the ANCIENT DRAGON! I will not fall to mortals! Rise, my champions! Give your lives for your master!"`,
                `§l§5The Dragon's roar becomes a pained shriek...\n§r"My strength fades... but my will remains! Every creature in the End, come to my aid! I WILL NOT DIE ALONE!"`,
                `§l§5Panic seeps into the Dragon's ancient voice...\n§r"This is impossible! I have ruled for millennia! My minions, my faithful servants... save me from this humiliation!"`,
                `§l§5The Dragon's breathing grows labored...\n§r"I can feel death approaching... but I will take you all with me! My final army, emerge from the shadows! We die together!"`
            ];
            return stage2Messages[Math.floor(Math.random() * stage2Messages.length)];
        }

        return `§5The Ancient Dragon speaks... §r"Unknown stage of battle reached..."`;
    }

    public static summon_minions() {
        const mob_counts = {
            "amethyst:endstone_golem": 2.2,
            "amethyst:the_breath": 1.4
        }

        const radius = 30;
        const dimension = world.getDimension(MinecraftDimensionTypes.TheEnd)
        const player_count = dimension.getPlayers().length

        // Calculate total mobs to spawn
        const totalMobs = Object.values(mob_counts).reduce((sum, count) => sum + (count * player_count), 0);
        const angleIncrement = (2 * Math.PI) / totalMobs;

        let mobIndex = 0;

        // Iterate through each mob type
        for (const [mobType, countPerPlayer] of Object.entries(mob_counts)) {
            const totalCount = countPerPlayer * player_count;

            // Spawn each mob of this type
            for (let i = 0; i < totalCount; i++) {
                const angle = angleIncrement * mobIndex;
                const x = radius * Math.cos(angle);
                const z = radius * Math.sin(angle);

                // Find ground level at this position
                const groundY = dimension.getTopmostBlock({x: x, z: z})?.y || 70

                // Spawn the mob at ground level
                dimension.spawnEntity(mobType, { x: x, y: groundY + 1, z: z });
                mobIndex++;
            }
        }
    }
}
