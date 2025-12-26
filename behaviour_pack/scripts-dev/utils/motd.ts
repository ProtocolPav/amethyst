import { Player, world } from '@minecraft/server';
import { MinecraftDimensionTypes } from '@minecraft/vanilla-data';
import QuestProgress from "../api/quests/quest_progress";

export default function send_motd(player: Player, quest_progress: QuestProgress | null) {
    const motd_shorts = [
        "You're a star! ",
        "Your adventure awaits...",
        "Don't forget to eat! ",
        "Ready to explore?",
        "First we mine, then we craft.",
        "It's craftin' time! ",
        "I lava you! ",
        "RISE AND GRIND!!!",
        "Got what it takes?",
        "Dream big, build bigger. ",
        "We missed you!!!",
        "Hey, you dropped this ",
        "Together We Stand ",
        "Do some quests!",
    ]

    const motd_longs = [
        "§oDo our quests by running §l§5/quests view§r§o on discord!",
        "§oPssst... Have you checked out this month's §l§gMonthly Market§r§o yet?",
        "§oExplore different projects by traversing our §lroad network§r§ro.",
        "§oHave you seen our AMAZING §l§nSubway System§r§o? Ask about it!",
        "§oCheck out our §lLive Map§r§o on §9everthorn.net/map§r§o!",
        "§oBuild to your heart's content, and become part of Everthorn's history.",
        "§oRemember, projects §lmust§r§o be connected to our §lroad network§r§o.",
        "§oFeelin' lonely? Ping the §l@Get On The Server§r§o ping :))",
    ]

    const randomShort = motd_shorts[Math.floor(Math.random() * motd_shorts.length)]
    let randomLong = motd_longs[Math.floor(Math.random() * motd_longs.length)]
    let questReminder = ""

    if (Math.random() < 0.005) {
        randomLong = "§o§p§lLucky you! You just found 1 Nug! Send a screenshot in #general and ping a CM to claim it!"
    }

    if (quest_progress) {
        const quest = quest_progress.quest
        questReminder = `§l§aActive Quest:§r ${quest.title}\n---------\n`
    }

    world.getDimension(MinecraftDimensionTypes.Overworld).runCommand(
        `title "${player.name}" actionbar §a§lWelcome to Everthorn!§r ${randomShort}`
    )

    player.sendMessage(
        `§aWelcome to Everthorn, §l${player.name}§r\n§7${randomShort}§r\n${randomLong}§r\n---------\n${questReminder}`
    )
}
