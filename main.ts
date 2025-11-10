let LED_BRIGHTNESS = 5;
let LIGHT_INTERVAL = 1000;

let jump_start = false;

function go_wait() {
    return randint(2000, 3000);
}

function wait_for(duration: number) {
    let wait_time = input.runningTime() + duration;
    while (wait_time > input.runningTime()) {
        if (jump_start) {
            return false;
        }
        basic.pause(1);
    }
    return true;
}

function light_up(column: number) {
    led.plot(column, 3);
    led.plot(column, 4);
    music.play(music.tonePlayable(Note.C,
        music.beat(BeatFraction.Quarter)),
        music.PlaybackMode.InBackground);
}

function start_sequence() {
    basic.clearScreen();
    for (let column = 0; column != 5; ++column) {
        if (column != 0 && !wait_for(LIGHT_INTERVAL)) {
            return false;
        }
        light_up(column);
    }

    if (!wait_for(go_wait())) {
        return false;
    }

    basic.clearScreen();
    return true;
}

while (true) {
    jump_start = false;

    while (true) {
        if (input.logoIsPressed()) {
            break;
        }
    }

    input.onButtonPressed(Button.A, function () {
        jump_start = true;
    });

    start_sequence();
    if (jump_start) {
        basic.showIcon(IconNames.No);
        continue;
    }

    let start_time = input.runningTime();
    input.onButtonPressed(Button.A, function () {
        let reaction_time = input.runningTime() - start_time;
        basic.showNumber(reaction_time / 1000.0);
        control.reset();
    });

    while (true) {
        basic.pause(1000);
    }
}
