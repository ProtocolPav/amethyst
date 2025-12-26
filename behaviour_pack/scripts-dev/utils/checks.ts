import { differenceInSeconds } from 'date-fns';


/**
 * Checks if the distance between two points falls within
 * the given radius
 */
function distance_check(
    c1: [number, number, number],
    c2: [number, number, number],
    horizontalRadius: number,
    verticalRadius: number,
): boolean {
    const dx = c1[0] - c2[0]
    const dy = c1[1] - c2[1]
    const dz = c1[2] - c2[2]

    const horizontalDistance = Math.sqrt(dx * dx + dz * dz)
    const verticalDistance = Math.abs(dy)

    return horizontalDistance <= horizontalRadius && verticalDistance <= verticalRadius
}


function timer_check(now: Date, start: Date, seconds: number): boolean {
    return differenceInSeconds(now, start) <= seconds;
}

const checks = {
    timer_check: timer_check,
    distance_check: distance_check
}

export default checks