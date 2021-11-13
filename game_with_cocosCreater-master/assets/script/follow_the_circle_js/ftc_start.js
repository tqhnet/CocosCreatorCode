cc.Class({
    extends: cc.Component,
    properties: () => ({
        gameMask: {
            default: null,
            type: cc.Node
        },
        circleGroup: {
            default: null,
            type: require('circle_group')
        }
    }),
    onLoad() {

    },
    startGame() {
        this.showGameMask(false);
        this.circleGroup.startCreateCircles();
    },
    showGameMask(bool) {
        if (bool) {
            this.gameMask.active = bool;
            this.gameMask.opacity = 1;
            cc.tween(this.gameMask).to(.3, { opacity: 255 }).start();
        } else {
            cc.tween(this.gameMask).to(.3, { opacity: 1 }).call(() => {
                this.gameMask.active = bool;
            }).start();
        }
    },
    tapCloseBtnToQuitThisGame() {
        this.circleGroup.handleGameOver();
    },
    backList() {
        cc.director.loadScene('startscene');
    }
})
