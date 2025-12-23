import api from "../api";
import utils from "../utils";
import {system, world} from "@minecraft/server";

async function check_quests() {
    try {
        if (!api.Interaction.is_processing()) {
            api.Interaction.set_processing(true)
            let interaction = api.Interaction.dequeue()

            while (interaction) {
                let thorny_user = api.ThornyUser.fetch_user_by_id(interaction.thorny_id)
                let quest_progress = await api.QuestProgress.get_quest_progress(thorny_user)

                if (quest_progress && await quest_progress.increment_active_objective(interaction)) {
                    await quest_progress.update_user_quest()
                    await thorny_user.update()

                    if (quest_progress.status == 'completed') {
                        api.Relay.event(
                            `${thorny_user.gamertag} has completed *${quest_progress.quest.title}!*`,
                            'Run `/quests view` to start it and reap the rewards!',
                            'other')

                        api.QuestProgress.clear_cache(thorny_user)
                    }
                } else if (quest_progress && quest_progress.status == 'failed') {
                    api.Relay.event(
                        `${thorny_user.gamertag} has failed *${quest_progress.quest.title}!*`,
                        'Better luck next time!',
                        'other')

                    await quest_progress.fail_quest(thorny_user.thorny_id)
                    api.QuestProgress.clear_cache(thorny_user)
                }

                interaction = api.Interaction.dequeue()
            }

            api.Interaction.set_processing(false)
        }
    } catch (e) {
        api.Interaction.set_processing(false)

        throw e
    }
}

async function display_timer() {
    for (let questCacheKey in api.QuestProgress.quest_cache) {
        let active_objective = api.QuestProgress.quest_cache[questCacheKey].get_active_objective()

        if (
            active_objective &&
            active_objective.start_time &&
            active_objective.objective.customizations.timer
        ) {
            let elapsed_seconds = Math.floor((new Date().getTime() - active_objective.start_time.getTime()) / 1000);

            const timer_seconds = active_objective.objective.customizations.timer.seconds

            let remaining_seconds = Math.max(0, timer_seconds - elapsed_seconds);

            let minutes = Math.floor(remaining_seconds / 60);
            let seconds = remaining_seconds % 60;

            let player = world.getPlayers({name: active_objective.thorny_user.gamertag})[0]
            utils.commands.send_title(
                player.dimension.id,
                player.name,
                "actionbar",
                `§l§sObjective ${active_objective.objective.order_index+1}§r | ${minutes.toString().padStart(2, '0')}m${seconds.toString().padStart(2, '0')}s`
                )
        }
    }
}

export default function load_quest_loop() {
    system.runInterval(async () => {await check_quests()}, 1)
    system.runInterval(async () => {await display_timer()}, 10)
    console.log('[Loops] Loaded Quests Loop') 
}