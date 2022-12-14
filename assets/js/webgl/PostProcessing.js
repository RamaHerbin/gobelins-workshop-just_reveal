
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { SAOPass } from "three/addons/postprocessing/SAOPass.js";

export default class PostProcessing {
  constructor(_option) {
    this.composer = null;
    this.scene = _option.scene;
    this.renderer = _option.renderer;
    this.camera = _option.camera;

    this.init();
  }

  init() {
    this.composer = new EffectComposer(this.renderer.instance);
    const renderPass = new RenderPass(
      this.scene.instance,
      this.camera.instance
    );
    this.composer.addPass(renderPass);
    const saoPass = new SAOPass(
      this.scene.instance,
      this.camera.instance,
      false,
      true
    );
    saoPass.params.saoIntensity = 1;

    // comment ligne en dessous pour desac oclusion ambiant
    // this.composer.addPass(saoPass);
      this.saoPass = saoPass;
      

  }

  initGui() {
    const gui = new GUI();
    gui
      .add(saoPass.params, "output", {
        Beauty: SAOPass.OUTPUT.Beauty,
        "Beauty+SAO": SAOPass.OUTPUT.Default,
        SAO: SAOPass.OUTPUT.SAO,
        Depth: SAOPass.OUTPUT.Depth,
        Normal: SAOPass.OUTPUT.Normal,
      })
      .onChange(function (value) {
        saoPass.params.output = parseInt(value);
      });

    //   // console.log('SAOPass.OUTPUT.Depth :>> ', SAOPass.OUTPUT.Depth);

    // gui.add(saoPass.params, "saoBias", -1, 1);
    // gui.add(saoPass.params, "saoIntensity", 0, 1);
    // gui.add(saoPass.params, "saoScale", 0, 10);
    // gui.add(saoPass.params, "saoKernelRadius", 1, 100);
    // gui.add(saoPass.params, "saoMinResolution", 0, 1);
    // gui.add(saoPass.params, "saoBlur");
    // gui.add(saoPass.params, "saoBlurRadius", 0, 200);
    // gui.add(saoPass.params, "saoBlurStdDev", 0.5, 150);
    // gui.add(saoPass.params, "saoBlurDepthCutoff", 0.0, 0.1);
  }

  update() {
    this.composer?.render();
  }
}
