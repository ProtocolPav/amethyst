import blockInteract from "./block-interact";
import blockBreak from "./block-break";
import blockPlace from "./block-place";
import entityInteract from "./entity-interact";
import entityDie from "./entity-die";

export default function loadInteractionHandlers() {
    blockInteract()
    blockBreak()
    blockPlace()

    entityInteract()
    entityDie()
}