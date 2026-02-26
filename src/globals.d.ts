// 酒馆助手和酒馆提供的全局变量
declare const jsyaml: any;
declare const _: any;
declare const $: any;
declare const toastr: any;

// 扩展 Element 类型
interface Element {
  dataset: DOMStringMap;
  style: CSSStyleDeclaration;
  offsetWidth: number;
  offsetHeight: number;
  getContext?(contextId: '2d'): CanvasRenderingContext2D | null;
}

// 扩展 HTMLElement 类型
interface HTMLElement {
  width: number;
  height: number;
  disabled: boolean;
  getContext?(contextId: '2d'): CanvasRenderingContext2D | null;
}

// Particle 类型定义
interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  sway: number;
  opacity: number;
}
