<template>
    <!--<div style="width:100%;height:300px;overflow: hidden">-->
      <!--<input class="knob" data-angleOffset=180 data-displayPrevious=true data-width="200" data-min="16" data-max="30" data-cursor=true value="18"  readonly="readonly">-->
  <div style="width:100%;height:300px;">
      <div v-bind:style="{width: opt.width + 'px', height:'100%', margin:'auto'}">
        <input class="initStyle" v-bind:style="{width:opt.width / 2 + 'px' ,marginTop : (opt.width * 5 / 18) + 'px' , marginLeft : '-' + (opt.width / 4 + 10 ) + 'px',fontSize : (opt.width / 3) + 'px'}" ref="knob"  :angleOffset=180  :width="200" :min="16" :max="30"  value="18"  readonly="readonly">
        <span style="position: absolute;top: 2.5rem;right:3rem;font-size: 1rem;display: inline-block;color: #fff;">℃</span>
        <canvas @touchstart="startDrag($event)" @touchmove="startDrag($event)" ref='cvs'  :width=opt.width  :height=opt.width />
      </div>
  </div>
    <!--</div>-->
</template>

<script>
export default {
  name: 'temperatureControl',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
      angleOffset: 180,
      width: 200,
      min: '16',
      max: '30',
      opt: {},
      v: null,
      mx: '',
      my: '',
      x: '', // 圆心点x坐标
      y: '', // 圆心点y坐标
      PI2: 2 * Math.PI,
      initStyle: {},
      ctx: '',
      self: '',
    };
  },
  beforeMount() {
    this.self = this;
    this.opt = {
      // Config
      min: this.min || 0,
      max: this.max || 100,
      stopper: true,
      readOnly: true,

      // UI
      thickness: 0.35,
      width: (this.width * window.screen.width * 4) / 1080 || 200,
      fgColor: '#87CEEB',
      cgColor: '#87CEEB',
      bgColor: '#EEEEEE',
      skin: 'default',
      angleOffset: this.self.angleOffset,
    };
    this.opt.angleOffset = this.degreeToRadians(this.angleOffset);
  },
  mounted() {
    this.ctx = this.$refs.cvs.getContext('2d');
    let vl = this.$refs.knob.value;

    vl || (vl = this.opt.min);

    this.val(vl);
  },
  methods: {
    onChange() {},
    onCancel() {},
    onRelease() {},
    // 计算弧度
    val(v) {
      let nv = v;
      if (nv != null) {
        nv = Math.max(Math.min(nv, this.opt.max), this.opt.min);
        this.v = nv;
        this.setVal(nv);
        this.draw(nv);
      } else {
        let b, a;
        // angel=Math.atan2(y,x),angel是一个弧度值
        b = a =
          Math.atan2(
            this.mx - this.x,
            -((this.my - this.y) - (this.opt.width / 2)),
          ) - this.opt.angleOffset;
        a < 0 && (b = a + this.PI2);
        // 四舍五入
        nv =
          Math.round((b * (this.opt.max - this.opt.min)) / this.PI2) +
          Number(this.opt.min);
        this.setVal(nv);
        return nv > this.opt.max ? this.opt.max : nv;
      }
    },
    // 拖拽触发
    change(v) {
      const nv = Math.max(Math.min(v, this.opt.max), this.opt.min);
      this.onChange(nv);
      this.draw(nv);
    },
    // 弧度
    angle(nv) {
      // 弧度
      return ((nv - this.opt.min) * this.PI2) / (this.opt.max - this.opt.min);
    },
    draw(nv) {
      const a = this.angle(nv), // Angle角度
        sa = (1.5 * Math.PI) + this.opt.angleOffset, // Previous start angle先前的起始角度
        sat = sa, // Start angle 起始角度
//        ea = sa + this.angle(this.v), // Previous end angle上一个结束角度
        eat = sat + a, // End angle结束角度
        r = (this.opt.width / 2) - 20, // Radius半径
        lw = r * this.opt.thickness, // Line width行宽
//        cgcolor = '#fff',
        //        ,tick
        o = this.opt.width / 2;
      this.ctx.clearRect(0, 0, this.opt.width, this.opt.width);
      this.ctx.lineWidth = lw;
      switch (this.opt.skin) {
        case 'default':
          // 圆
          this.ctx.save();
          this.ctx.lineWidth = 1;
          this.ctx.beginPath();
          this.ctx.strokeStyle = '#6b6b87';
          this.ctx.arc(o, o, r, 0, this.PI2, true);
          this.ctx.fillStyle = '#6b6b87'; // 填充颜色,默认是黑色
          this.ctx.fill(); // 画实心圆
          this.ctx.stroke();

          // 示意温度弧度
          this.ctx.beginPath();
          this.ctx.strokeStyle = '#fff';
          this.ctx.arc(o, o, r, sat, eat, false);
          this.ctx.stroke();

          // 示意温度实心圆
          this.ctx.restore();
          this.ctx.lineWidth = 1;
          this.ctx.beginPath();
          this.ctx.strokeStyle = '#fff';
          // ctx.arc(r, r, r - lw / 2, sat, eat-0.4, false);
          this.ctx.arc(
            (r * Math.cos(eat - 0.0)) + o,
            (r * Math.sin(eat - 0.0)) + o,
            r / 10,
            this.PI2,
            0,
            true,
          );
          this.ctx.fillStyle = 'white'; // 填充颜色,默认是黑色
          this.ctx.fill(); // 画实心圆
          this.ctx.stroke();
          break;
        default:
          break;
      }
    },
    capture(e) {
      switch (e.type) {
        case 'mousemove':
        case 'mousedown':
          this.mx = e.pageX;
          this.my = e.pageY;
          break;
        case 'touchmove':
        case 'touchstart':
          // 一个手指触碰点集合我们只需要获取第一个点,点击坐标
          this.mx = e.touches[0].pageX;
          this.my = e.touches[0].pageY;
          break;
        default:
          break;
      }
      this.change(this.val());
    },
    startDrag(e) {
      const p = {
        top: this.ctx.canvas.offsetTop,
        left: this.ctx.canvas.offsetLeft,
      };
      // 计算圆点
      this.x = p.left + (this.opt.width / 2);
      this.y = p.top;

      this.capture(e);
    },
    setVal(nv) {
      this.$refs.knob.value = nv;
    },
    degreeToRadians(angle) {
      // 弧度=角度数 * π/180
      return (angle * Math.PI) / 180 || 0;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.initStyle {
  position: absolute;
  border: none;
  background: none;
  font-family: Arial;
  font-weight: bold;
  text-align: center;
  color: #fff;
  padding: 0px;
  -webkit-appearance: none;
  left: 50%;
}
</style>
