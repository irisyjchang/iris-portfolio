declare module "vivus" {
  interface VivusOptions {
    type?: string;
    duration?: number;
    delay?: number;
    start?: string;
    onReady?: () => void;
    [key: string]: unknown;
  }
  class Vivus {
    constructor(el: string | HTMLElement | SVGSVGElement, options?: VivusOptions, cb?: () => void);
    play(speed?: number, cb?: () => void): this;
    stop(): this;
    reset(): this;
    finish(): this;
    setFrameProgress(progress: number): this;
    getStatus(): string;
    destroy(): void;
  }
  export default Vivus;
}
