input.onButtonPressed(Button.A, function () {
    basic.showIcon(IconNames.Heart)
    basic.showLeds(`
        . . # # .
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        `)
    bluetooth.startTemperatureService()
})
function go_wait () {
	
}
function wait_for (duration: number) {
	
}
function light_up(column: number) {

}
function start_sequence() {

}
let LED_BRIGHTNESS = 0
let LIGHT_INTERVAL = 1000
while (true) {
    
}