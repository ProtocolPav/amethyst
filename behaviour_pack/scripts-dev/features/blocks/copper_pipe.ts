import { world, system, Direction, Block, BlockPermutation } from "@minecraft/server";

const PIPE_BLOCK = "everthorn:copper_pipe";

type ConnectorState = "none" | "left" | "right";

/**
 * Given the pipe's cardinal direction and a neighbouring block,
 * returns which connector state the pipe should show.
 *
 * The connector sits on the NORTH face of the raw model.
 * "left" and "right" are relative to the direction the pipe is facing.
 *
 * Pipe facing → left neighbour → right neighbour
 *   north      →  west         →  east
 *   south      →  east         →  west
 *   east       →  north        →  south
 *   west       →  south        →  north
 */
function getConnectorState(block: Block): ConnectorState {
    const facing = block.permutation.getState("minecraft:cardinal_direction") as string;

    const leftDir  = { north: Direction.West,  south: Direction.East,  east: Direction.North, west: Direction.South }[facing];
    const rightDir = { north: Direction.East,  south: Direction.West,  east: Direction.South, west: Direction.North }[facing];

    if (!leftDir || !rightDir) return "none";

    const leftBlock  = block.dimension.getBlock(block.location)?.offset(directionToOffset(leftDir));
    const rightBlock = block.dimension.getBlock(block.location)?.offset(directionToOffset(rightDir));

    const leftConnects  = leftBlock  && canConnect(leftBlock);
    const rightConnects = rightBlock && canConnect(rightBlock);

    // Prefer left if both connect — you can change this logic as needed
    if (leftConnects)  return "left";
    if (rightConnects) return "right";
    return "none";
}

function canConnect(block: Block): boolean {
    // Add any block type IDs that the pipe can connect to
    const connectableBlocks = [
        PIPE_BLOCK,
        "everthorn:copper_valve",
        "everthorn:copper_tank",
    ];
    return connectableBlocks.includes(block.typeId);
}

function directionToOffset(dir: Direction): { x: number; y: number; z: number } {
    switch (dir) {
        case Direction.North: return { x:  0, y: 0, z: -1 };
        case Direction.South: return { x:  0, y: 0, z:  1 };
        case Direction.East:  return { x:  1, y: 0, z:  0 };
        case Direction.West:  return { x: -1, y: 0, z:  0 };
        default:              return { x:  0, y: 0, z:  0 };
    }
}

function updatePipe(block: Block): void {
    if (block.typeId !== PIPE_BLOCK) return;

    const newState = getConnectorState(block);
    const current  = block.permutation.getState("amethyst:connector") as ConnectorState;

    if (current !== newState) {
        block.setPermutation(
            block.permutation.withState("amethyst:connector", newState)
        );
    }
}

/**
 * Update all pipe neighbours when a block is placed or broken next to one.
 */
function updateNeighbours(block: Block): void {
    const offsets = [
        { x:  1, y: 0, z:  0 },
        { x: -1, y: 0, z:  0 },
        { x:  0, y: 0, z:  1 },
        { x:  0, y: 0, z: -1 },
    ];

    for (const offset of offsets) {
        const neighbour = block.dimension.getBlock({
            x: block.location.x + offset.x,
            y: block.location.y + offset.y,
            z: block.location.z + offset.z,
        });
        if (neighbour && neighbour.typeId === PIPE_BLOCK) {
            updatePipe(neighbour);
        }
    }
}

// ── Event listeners ──────────────────────────────────────────────────────────

// When a pipe is placed, evaluate its own state + update neighbours

export default function loadCopperPipeComponent() {
    world.afterEvents.playerPlaceBlock.subscribe((event) => {
        const block = event.block;
        if (block.typeId !== PIPE_BLOCK) return;

        system.run(() => {
            updatePipe(block);
            updateNeighbours(block);
        });
    });

// When any block is broken, update surrounding pipes
    world.afterEvents.playerBreakBlock.subscribe((event) => {
        system.run(() => {
            updateNeighbours(event.block);
        });
    });
}
