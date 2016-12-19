(function (w) {
    
    function Sprite(ctx, x, y, size, index, speed) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.size = size;
        this.index = index || 0;  // 指定精灵的开始帧，默认从第0帧开始
        this.speed = speed || 3; // 指定精灵运动的速度
    }

   
    Sprite.init = function (spriteImg, clipWidth, clipHeight) {
        Sprite.spriteImg = spriteImg;
        Sprite.clipWidth = clipWidth;
        Sprite.clipHeight = clipHeight;
    };

    // 给精灵类的原型扩展方法
    Sprite.prototype = {
        constructor: Sprite,

        // 绘制方法
        draw: function () {
            this.ctx.drawImage(Sprite.spriteImg,
                256*this.index, 0,  Sprite.clipWidth, Sprite.clipHeight,
                this.x, this.y, this.size, this.size);
        },

        // 更新精灵下一帧所需的数据
        update: function () {
            // 为了调用draw的时，绘制的精灵是不同的帧，所以每次让index自增
            this.index = ++this.index > 7? 0 : this.index;

            // 为了调用draw的时，绘制的精灵像是在向左走，
            // 所以每次让x轴坐标减减，当精灵贴着画布时，
            // 让精灵重新从200的位置再向左走。
            this.x -= this.speed;
            this.x = this.x < 0? 200 : this.x;
        }
    };

    // 把Sprite构造函数暴漏到全局
    w.Sprite = Sprite;
}(window));
