const Gdt = require('globals');
const Utils = require('../utils.js');

cc.Class({
    extends: cc.Component,
    properties: {
        loadingBg: {
            default: null,
            type: cc.Node
        }
    },
    onLoad() {
        cc.director.preloadScene('aircraft_war_game');
        Utils.GD.showWxLoading(true);
        this.loadNoticePic();
    },
    startGame() {
        cc.director.loadScene('aircraft_war_game');
    },
    backList() {
        cc.director.loadScene('startscene');
    },
    //加载背景图片 wx cloud
    loadNoticePic() {
        const self = this;
        const bgSprite = self.loadingBg.getComponent(cc.Sprite);
        if (Gdt.loopBg) {
            cc.loader.load(Gdt.loopBg, (err, texture) => {
                if (!err) bgSprite.spriteFrame = new cc.SpriteFrame(texture);
                Utils.GD.showWxLoading(false);
            });
            return;
        };
        Utils.GD.getAircaftWarBg((res) => {
            Utils.GD.showWxLoading(false);
            if (res) {
                cc.loader.load(res.fileList[0].tempFileURL, (err, texture) => {
                    if (!err) {
                        Gdt.loopBg = texture;
                        bgSprite.spriteFrame = new cc.SpriteFrame(texture);
                    }
                })   
            }
        })
    }
})