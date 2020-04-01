import { Container, Application } from "pixi.js"
import StageMap from "./stageMap";
import { WIDTH, HEIGHT } from "./const";
import Controller from "./controller";
import Character from "./character";
import Background from "./background";
import Score from "./score";
import ScreenBox from "./screenBox";


const app = new Application({
  width: WIDTH,
  height: HEIGHT
});

// 重なり順をわかりやすくするため先にコンテナーを定義しておく。
const enemyContainer = new Container()
const charactorContainer = new Container()

let isStart = false
let seconds = 0

let score: Score
let bg: Background
let stageMap: StageMap
let controller: Controller
let character: Character
let startBox: ScreenBox
let resultBox: ScreenBox
let intervalEvent: number | null

const updateSeconds = (num: number) => {
  seconds = num
  score.updateSeconds(seconds)
}

const setIntervalEvent = () => {
  intervalEvent = window.setInterval(() => { updateSeconds(seconds + 1) }, 1000)
}

const init = (isDead: boolean) => {
  stageMap.init(isDead)
  character.init()
  score.updateBananas(stageMap.bananas, stageMap.maxBananas)
  updateSeconds(0)
}

const start = () => {
  console.log("start!!")
  setIntervalEvent()
  addKeyboardEvents()
  addControllerEvents()
  startBox.remove()
  isStart = true
  character.visible = true
}

const restart = () => {
  setIntervalEvent()
  init(false)
  resultBox.remove()
}

const move = () => {
  character.move(stageMap.tileInfos, stageMap.width)
  stageMap.updateCamera(character.x, character.vx)
}

const checkItem = () => {
  const itemID = character.gotItemID
  if (itemID !== false) {
    stageMap.removeItem(itemID)
    stageMap.getItem(itemID)
    score.updateBananas(stageMap.bananas, stageMap.maxBananas)
  }
}

const loop = () => {
  requestAnimationFrame(loop)

  if (!isStart) {
    if (startBox.alpha >= 1) {
      return
    }
    startBox.addAlpha()
    if (startBox.alpha >= 1) {
      startBox.btn.on("pointerdown", start)
    }
    return
  }

  if (stageMap.isCleared) {
    if (intervalEvent !== null) {
      resultBox = new ScreenBox(app.stage, "ゲームクリア", "#4F60B0", "#B0F060", `クリアタイム：${seconds}秒`, "再挑戦")
      window.clearInterval(intervalEvent)
      intervalEvent = null
    }

    if (resultBox.alpha >= 1) {
      return
    }
    resultBox.addAlpha()
    if (resultBox.alpha >= 1) {
      resultBox.btn.on("pointerdown", restart)
    }
    return
  }

  move()

  checkItem()

  if (character.isDead()) {
    init(true)
  }
}

const addControllerEvents = () => {
  controller.leftArrowBtn.on("pointerdown", () => {
    character.setKey("ArrowLeft")
  })
  controller.leftArrowBtn.on("pointerup", () => {
    character.unsetKey("ArrowLeft")
  })

  controller.rightArrowBtn.on("pointerdown", () => {
    character.setKey("ArrowRight")
  })
  controller.rightArrowBtn.on("pointerup", () => {
    character.unsetKey("ArrowRight")
  })

  controller.jumpBtn.on("pointerdown", () => {
    character.setKey("ArrowUp")
  })
  controller.jumpBtn.on("pointerup", () => {
    character.unsetKey("ArrowUp")
  })
}

const addKeyboardEvents = () => {
  window.addEventListener("keydown", (e: KeyboardEvent) => {
    e.preventDefault()

    character.setKey(e.key)
  })

  window.addEventListener("keyup", (e: KeyboardEvent) => {
    e.preventDefault()

    character.unsetKey(e.key)
  })
}

const setup = () => {
  bg = new Background(app.stage)
  stageMap = new StageMap(app.stage)
  controller = new Controller(app.stage)
  score = new Score(app.stage, stageMap.maxBananas)
  character = new Character(stageMap)
  startBox = new ScreenBox(app.stage, "ピクシーマン", "#0f660f", "#ff6f6f", "バナナを全部集めて、\n出現したスターを取ると、\nゲームクリアです。", "始める")

  app.stage.addChild(enemyContainer, charactorContainer)

  loop()
}


window.onload = () => {
  const box = document.querySelector('#box')
  if (!box) { return }
  box.appendChild(app.view)

  app.loader
    .add("bg", "imgs/bg.jpg")
    .add("block", "imgs/block.jpg")
    .add("character", "imgs/character.png")
    .add("leftArrowBtn", "imgs/leftArrowBtn.png")
    .add("rightArrowBtn", "imgs/rightArrowBtn.png")
    .add("jumpBtn", "imgs/jumpBtn.png")
    .add("star", "imgs/star.png")
    .add("banana", "imgs/banana.png")

  app.loader.load(setup)
}
