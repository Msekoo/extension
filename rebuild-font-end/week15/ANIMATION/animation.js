export class Timeline {
    constructor () {
        this.animations = [];
        this.requestID = null;
        this.state = "inited"
        this.tick = () => {
            let t = Date.now() - this.startTime;
            let animations = this.animations.filter(animation => !animation.finished);
            for (let animation of animations) {
                let { object, duraction, property, timingFunction, template, delay, addTime } = animation;
                let progression = timingFunction((t - delay - addTime) / duraction);
                if (t > duraction + delay + addTime) {
                    progression = 1;
                    animation.finished = true;
                }
                let value = animation.valueFromProgression(progression);
                object[property] = template(value);
            }
            if(animations.length)
                this.requestID = requestAnimationFrame(this.tick);
        }
    }
    pause() {
        if (this.state !== "palying")
            return;
        this.state = "paused"
        this.pauseTime = Date.now();
        if (this.requestID)
            cancelAnimationFrame(this.requestID)        
    }
    resume() {
        if (this.state !== "paused")
            return;
        this.state = "palying"
        this.startTime += Date.now() - this.pauseTime;
        this.tick();
    }
    start() {
        if (this.state !== "inited")
            return;
        this.state = "palying"
        this.startTime = Date.now();
        this.tick();
    }
    restart() {
        if (this.state === "palying")
            this.pause();        
        this.requestID = null;
        this.pauseTime = null;
        this.state = "playing";
        this.startTime = Date.now();
        this.animations.forEach(animation => animation.finished = false);
        this.tick();
    }
    add(animation, addTime) {
        animation.finished = false;
        if (animation.state === "playing")
            animation.addTime = addTime !== void 0 ? addTime : Date.now() - this.startTime;
        else
            animation.addTime = addTime !== void 0 ? addTime : 0;
        this.animations.push(animation);
    }
}

export class Animation {
    constructor(object, property, start, end, duraction, delay, timingFunction, template) {
        this.object = object;
        this.template = template;
        this.property = property;
        this.start = start;
        this.end = end;
        this.duraction = duraction;
        this.delay = delay || 0;
        this.timingFunction = timingFunction;
    }
    valueFromProgression(progression) {
        return this.start + progression * (this.end - this.start);
    }
}

export class ColorAnimation {
    constructor(object, property, start, end, duraction, delay, timingFunction, template) {
        this.object = object;
        this.template = template || (v => `rgba(${v.r}, ${v.g}, ${v.b}, ${v.a})`);
        this.property = property;
        this.start = start;
        this.end = end;
        this.duraction = duraction;
        this.delay = delay || 0;
        this.timingFunction = timingFunction;
    }
    valueFromProgression(progression) {
        return {
            r: this.start.r + progression * (this.end.r - this.start.r),
            g: this.start.g + progression * (this.end.g - this.start.g),
            b: this.start.b + progression * (this.end.b - this.start.b),
            a: this.start.a + progression * (this.end.a - this.start.a),
        }
    }
}