import { Container, Sprite, utils } from "pixi.js"
import { WIDTH, GAME_HEIGHT, SCORE_PANEL_HEIGHT } from "./const"

export default class Background extends Sprite {
  constructor(stage: Container) {
    super()
    stage.addChild(this)
    this.position.set(0, SCORE_PANEL_HEIGHT)
    this.texture = utils.TextureCache["bg"]
    this.width = WIDTH
    this.height = GAME_HEIGHT
  }

  setTexture(name: string) {
    this.texture = utils.TextureCache[name]
  }
}
