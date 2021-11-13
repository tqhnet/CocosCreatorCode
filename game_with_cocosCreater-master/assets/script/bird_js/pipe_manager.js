const PipeGroup = require('pipe_group');
cc.Class({
    extends: cc.Component,
    properties: {
        //管道节点预制资源
        pipePrefab: cc.Prefab,
        //管道移动速度，单位px/s 
        pipeMoveSpeed: -300,
        //每对管道之间的间距，单位px
        pipeSpacing: 300
    },
    onLoad() {
        this.pipeList = [];
        this.pipeIsRunning = false;
        // 创建pipe对象池
        this.pipePool = new cc.NodePool();
        const initCount = 3;
        for (let i = 0; i < initCount; ++i) {
            let pipe = cc.instantiate(this.pipePrefab); // 创建节点
            this.pipePool.put(pipe); // 通过 putInPool 接口放入对象池
        };
    },
    // 定时生成管道
    startSpawn() {
        this.spawnPipe();
        let spawnInterval = Math.abs(this.pipeSpacing / this.pipeMoveSpeed);
        this.schedule(this.spawnPipe, spawnInterval);
        this.pipeIsRunning = true;
    },
    spawnPipe() {
        let pipeGroup = null;
        if (this.pipePool.size() > 0) {
            pipeGroup = this.pipePool.get().getComponent(PipeGroup);
        } else {
            pipeGroup = cc.instantiate(this.pipePrefab).getComponent(PipeGroup);
        };
        this.node.addChild(pipeGroup.node);
        pipeGroup.node.active = true;
        pipeGroup.init(this);
        this.pipeList.push(pipeGroup);
    },
    // 回收管道
    recyclePipe(pipe) {
        pipe.node.active = false;
        this.pipePool.put(pipe.node);
    },
    // 获取下个未通过的水管
    getNext() {
        return this.pipeList.shift();
    },
    // 重置
    reset() {
        this.unschedule(this.spawnPipe);
        this.pipeList = [];
        this.pipeIsRunning = false;
    }
})
