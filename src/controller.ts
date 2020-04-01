import { Container, Sprite, utils, Graphics } from "pixi.js"
import { GAME_HEIGHT, PANEL_HEIGHT, WIDTH, SCORE_PANEL_HEIGHT } from "./const"

export default class Controller extends Container {
  leftArrowBtn: Sprite
  rightArrowBtn: Sprite
  jumpBtn: Sprite

  constructor(stage: Container) {
    super()
    stage.addChild(this)
    this.position.set(0, SCORE_PANEL_HEIGHT + GAME_HEIGHT)

    const bg = new Graphics()
    bg.beginFill(0x008080)
    bg.drawRect(0, 0, WIDTH, PANEL_HEIGHT)
    bg.endFill()
    this.addChild(bg)

    const btnY = PANEL_HEIGHT / 2

    this.leftArrowBtn = new Sprite(utils.TextureCache["leftArrowBtn"])
    this.leftArrowBtn.scale.set(2)
    this.leftArrowBtn.anchor.set(0, 0.5)
    this.leftArrowBtn.position.set(20, btnY)
    this.leftArrowBtn.interactive = true

    this.rightArrowBtn = new Sprite(utils.TextureCache["rightArrowBtn"])
    this.rightArrowBtn.scale.set(2)
    this.rightArrowBtn.anchor.set(0, 0.5)
    this.rightArrowBtn.position.set((20 + 32) * 2, btnY)
    this.rightArrowBtn.interactive = true

    this.jumpBtn = new Sprite(utils.TextureCache["jumpBtn"])
    this.jumpBtn.scale.set(2)
    this.jumpBtn.anchor.set(0, 0.5)
    this.jumpBtn.position.set(WIDTH - 80, btnY)
    this.jumpBtn.interactive = true

    this.addChild(this.leftArrowBtn, this.rightArrowBtn, this.jumpBtn)
  }
}
