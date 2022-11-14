import EventEmitter from './EventEmitter';

export default class Sizes extends EventEmitter {
    constructor() {
        super();

        this.viewport = {};

        this.resize = this.resize.bind(this);
        window.addEventListener('resize', this.resize);

        this.resize();
    }

    resize() {

        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.viewport.width = this.width
        this.viewport.height = this.height

        this.trigger('resize');
    }
}