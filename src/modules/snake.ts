class Snake {
  // 获取蛇的容器
  element: HTMLElement;
  //获取蛇头的元素
  head: HTMLElement;
  //   蛇身（包括舌头蛇头）自动补充新元素
  bodies: HTMLCollection;
  constructor() {
    this.element = document.getElementById("snake")!;
    //   蛇头
    this.head = document.querySelector("#snake>div") as HTMLElement;
    this.bodies = this.element.getElementsByTagName("div");
  }
  //   获取蛇的坐标(蛇头)
  get X() {
    return this.head.offsetLeft;
  }
  get Y() {
    return this.head.offsetTop;
  }
  //   设置蛇头的坐标 新值和旧值相同就不更改
  set X(value: number) {
    if (this.X === value) {
      return;
    }
    if (value < 0 || value > 290) {
      // 进入判断说明蛇撞墙了 抛出异常
      throw new Error("蛇撞墙了");
    }
    if (
      this.bodies[1] &&
      (this.bodies[1] as HTMLElement).offsetLeft === value
    ) {
      console.log(value, this.X);
      // 发生了掉头，让他继续走
      if (value > this.X) {
        // 如果新值大于旧值，右走
        value = this.X - 10;
      } else {
        value = this.X + 10;
      }
    }
    // 身体移动
    this.movebody();
    // 蛇头移动
    this.head.style.left = value + "px";
    // console.log(value);

    this.checkHeadBody();
  }
  set Y(value: number) {
    if (this.Y === value) {
      return;
    }
    if (value < 0 || value > 290) {
      // 进入判断说明蛇撞墙了
      throw new Error("蛇撞墙了");
    }
    if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop === value) {
      // console.log(value, this.Y);
      // 发生了掉头，让他继续走
      if (value > this.Y) {
        // 如果新值大于旧值，右走
        value = this.Y - 10;
      } else {
        value = this.Y + 10;
      }
    }
    this.movebody();

    this.head.style.top = value + "px";
    // 检查撞自己
    this.checkHeadBody();
  }
  // 增加身体
  addBody() {
    this.element.insertAdjacentHTML("beforeend", "<div></div>");
  }
  //   添加身体移动的方法
  movebody() {
    /***
     *
     * 第四节取代第三节
     * 第三节取代第二节
     * 第二节取代第一节
     */
    //遍历所有的身体
    for (let i = this.bodies.length - 1; i > 0; i--) {
      let X = (this.bodies[i - 1] as HTMLDivElement).offsetLeft;
      let Y = (this.bodies[i - 1] as HTMLDivElement).offsetTop;
      (this.bodies[i] as HTMLElement).style.left = X + "px";
      (this.bodies[i] as HTMLElement).style.top = Y + "px";
    }
  }
  //   检查蛇头撞到自己
  checkHeadBody() {
    //   获取所有的身体，如果重叠 g
    for (let i = 1; i < this.bodies.length; i++) {
      let bd = this.bodies[i] as HTMLElement;
      if (this.X === bd.offsetLeft && this.Y === bd.offsetTop) {
        // 说明撞到身体
        throw new Error("撞到自己");
      }
    }
  }
}

export default Snake;
