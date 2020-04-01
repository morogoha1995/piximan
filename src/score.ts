import { Container, Text, Sprite, utils, Graphics } from "pixi.js"
import { WIDTH, SCORE_PANEL_HEIGHT } from "./const"

export default class Score extends Container {
  bananas: Text
  seconds: Text

  constructor(stage: Container, bananaMaxNum: number) {
    super()
    stage.addChild(this)

    const bg = new Graphics()
    bg.beginFill(0x008080)
    bg.drawRect(0, 0, WIDTH, SCORE_PANEL_HEIGHT)
    bg.endFill()
    this.addChild(bg)


    this.position.set(0, 0)
    this.width = WIDTH
    this.height = SCORE_PANEL_HEIGHT
    const halfSPH = SCORE_PANEL_HEIGHT / 2

    const bananaSprite = new Sprite(utils.TextureCache["banana"])
    bananaSprite.width = 18
    bananaSprite.height = 18
    bananaSprite.position.set(WIDTH / 3, halfSPH)
    bananaSprite.anchor.set(0, 0.5)

    this.bananas = new Text(`0 / ${bananaMaxNum}`, {
      fontSize: 20,
      fill: "white",
      letterSpacing: 2,
      stroke: "#d1e61a",
      strokeThickness: 2
    })
    this.bananas.position.set(WIDTH / 2, halfSPH)
    this.bananas.anchor.set(0.5)

    this.seconds = new Text(`0秒`, {
      fontSize: 20,
      fill: "white",
      letterSpacing: 2,
      stroke: "#F044F0",
      strokeThickness: 2
    })
    this.seconds.position.set(WIDTH * 0.8, halfSPH)
    this.seconds.anchor.set(0.5)
    this.addChild(bananaSprite, this.bananas, this.seconds)
  }

  updateBananas(num: number, maxNum: number) {
    this.bananas.text = `${num} / ${maxNum}`
  }

  updateSeconds(num: number) {
    this.seconds.text = `${num}秒`
  }
}
