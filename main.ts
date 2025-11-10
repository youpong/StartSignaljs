const LED_BRIGHTNESS = 5;
const LIGHT_INTERVAL = 1000;

function go_wait(): number {
    return randint(2000, 3000);
}

function wait_for(duration: number): boolean {
    let wait_time = input.runningTime() + duration;
    while (wait_time > input.runningTime()) {
        if (input.buttonIsPressed(Button.A)) {
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

function start_sequence(): boolean {
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

function main_routine() {
    while (!input.logoIsPressed()) {
        basic.pause(1);
    }

    if (!start_sequence()) {
        basic.showIcon(IconNames.No);
        return;
    }

    let start_time = input.runningTime();
    while (true) {
        if (input.buttonIsPressed(Button.A)) {
            let reaction_time = input.runningTime() - start_time;
            // Since showNumber() can only display up to the
            // second decimal place, use showString() instead.
            basic.showString(`${reaction_time / 1000.0}`);
            return;
        }
        basic.pause(1);
    }
}

while (true) {
    main_routine();
}