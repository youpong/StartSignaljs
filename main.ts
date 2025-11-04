let LED_BRIGHTNESS = 5
let LIGHT_INTERVAL = 1000

function go_wait () {
    return randint(2000, 3000)
}
function wait_for (duration: number) {
    let wait_time = input.runningTime() + duration
    while (wait_time > input.runningTime()) {
        if (input.buttonIsPressed(Button.A)) {
            return false
        }
        basic.pause(1)
    }
    return true
}
function light_up(column: number) {
    led.plot(column, 3)
    led.plot(column, 4)
    music.play(music.tonePlayable(Note.C, music.beat(BeatFraction.Quarter)), music.PlaybackMode.InBackground)
}

function start_sequence() {
    basic.clearScreen()
    for (let column = 0; column != 5; ++column) {
        if (column != 0 && !wait_for(LIGHT_INTERVAL)) {
            return false
        }
        light_up(column)
    }

    if (!wait_for(go_wait())) {
        return false
    }
    basic.clearScreen()
    return true
}

while (true) {
    while (true) {
        if (input.logoIsPressed()) {
            break
        }                
    }

    if (!start_sequence()) {
        basic.showIcon(IconNames.No)
        continue
    }

    let start_time = input.runningTime()
    let reaction_time = 0
    while (true) {
        if (input.buttonIsPressed(Button.A)) {
            reaction_time = input.runningTime() - start_time
            break
        }
        basic.pause(1)
    }

    basic.showNumber(reaction_time / 1000.0)
}
/*
input.onButtonPressed(Button.A, function () {
    reaction_time = input.runningTime() - start_time
})
*/
