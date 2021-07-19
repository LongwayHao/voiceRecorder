<template>
  <div class="record-buttons">
    <button @click="clickLoopPlayback">
      <span
        class="icon-spinner11"
        :class="{'notActive':notShowLoopPlayback||isrecording||isplaying}"
      ></span>
    </button>
    <button @click="clickPlay" :class="{'notActive':!haveResource||isrecording }">
      <span class="icon-stop2" v-if="isplaying"></span>
      <span class="icon-play3" v-else></span>
    </button>
    <button @click="runOrPause">
      <span
        class="icon-mic"
        ref="mic"
        :class="{'notActive':cannotRecord||isplaying,'isrecording':isrecording }"
      ></span>
    </button>
    <button>
      <span
        class="icon-undo2"
        @click="undo"
        :class="{'notActive':cannotUndo||isrecording||isplaying}"
      ></span>
    </button>
    <button>
      <span
        class="icon-redo2"
        @click="redo"
        :class="{'notActive':cannotRedo||isrecording||isplaying}"
      ></span>
    </button>
  </div>
</template>

<script>
import lodash from "lodash";

export default {
  name: "RecordButtons",
  data() {
    return {
      isrecording: false,
      isNotLoopPlayback: true, //是否循环播放
      notShowLoopPlayback: true, //循环播放按钮显示与否

      cannotUndo: true,
      cannotRedo: true,
      cannotRecord: false, //录制按钮显示与否

      isplaying: false,
      playIsPause: false,

      resouse: {} //用于播放使用
    };
  },
  props: {
    propRecorder: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  computed: {
    recorder() {
      console.log("传递给子组件的", this.propRecorder);
      return lodash.cloneDeep(this.propRecorder);
    },
    haveResource() {
      return this.recorder.duration;
    },
    currentVersionInStore() {
      return this.$store.state.currentVersion;
    }
  },
  watch: {
    // 监听版本库版本变化
    currentVersionInStore(val, oldval) {
      console.log("当前版本:" + val);
      this.cannotRedo =
        val === this.$store.state.historyArr.length - 1 ? true : false;
      this.cannotUndo = val === 0 ? true : false;
    }
  },
  methods: {
    redo() {
      this.cannotRedo || this.$emit("controlVersion", { type: "foreVersion" });
    },
    undo() {
      this.cannotUndo || this.$emit("controlVersion", { type: "backVersion" });
    },

    clickLoopPlayback() {
      if (this.isplaying || this.isrecording) {
        return null;
      }
      this.isNotLoopPlayback = !this.isNotLoopPlayback;
      this.notShowLoopPlayback = !this.notShowLoopPlayback;
    },

    // ==================================================================================Recorder中的方法调用=======================
    runOrPause() {
      if (this.cannotRecord || this.isplaying) {
        return null;
      }
      this.isrecording = !this.isrecording;

      //toolbar显示与隐藏
      this.$emit("toolbarShowOrHide", this.isrecording);

      // 在录音->暂停/继续
      if (this.recorder.isrecording) {
        if (this.recorder.ispause) {
          this.resume();
        } else {
          this.pause();
        }
        // 没在录音就开始录音
      } else {
        this.start();
      }
    },
    start() {
      this.recorder.start().then(
        () => {
          this.isrecording = true;
          console.log("开始录音");
          // 开始录音
        },
        error => {
          // 出错了
          console.log(`${error.name} : ${error.message}`);
        }
      );
    },
    resume() {
      console.log("继续录音");
      this.recorder.resume();
      this.isrecording = true;
    },
    stop() {
      this.recorder.stop();
      console.log("停止录音");
      this.isrecording = false;
    },
    pause() {
      this.recorder.pause();
      console.log("暂停录音");
      this.isrecording = false;
      console.log(this.recorder.duration);
      this.$emit("controlVersion", { type: "addversion", data: this.recorder });
    },
    // =========================================================================播放相关的方法===================================
    clickPlay() {
      // 若没有资源或者正在录音，则不能播放
      if (!this.haveResource || this.isrecording) {
        return null;
      }

      // 如果没有循环播放
      if (this.isNotLoopPlayback) {
        // 查看是否在play，若是 则暂停
        if (this.isplaying) {
          this.pausePlay();
        } else {
          //若没在play  1.暂停中  2.没开始
          if (this.playIsPause) {
            this.resumePlay(() => {
              console.log("播放结束");
              this.isplaying = false;
            });
          } else {
            this.play(() => {
              console.log("播放结束");
              this.isplaying = false;
            });
          }
        }
      } else {
        //循环播放的时候
        if (this.isplaying) {
          this.pausePlay();
        } else {
          if (this.playIsPause) {
            this.LoopPlayback("playIsPause");
          } else {
            this.LoopPlayback();
          }
        }
      }
    },

    LoopPlayback(s) {
      if (this.isNotLoopPlayback) {
        this.stopPlay();
        return null;
      }
      if (s === "playIsPause") {
        this.resumePlay(() => {
          this.LoopPlayback();
        });
      } else {
        this.play(() => {
          this.LoopPlayback();
        });
      }
    },
    play(fn) {
      console.log("开始播放");
      this.isplaying = true;
      this.resouse = lodash.cloneDeep(lodash.cloneDeep(this.recorder)); //将当前的录音拷贝   播放使用拷贝的
      this.resouse.onplayend = fn;
      this.resouse.play();
    },
    pausePlay() {
      console.log("暂停播放");
      this.playIsPause = true;
      this.isplaying = false;
      this.resouse.pausePlay();
    },
    resumePlay(fn) {
      console.log("继续播放");
      this.isplaying = true;
      this.playIsPause = false;
      this.resouse.onplayend = fn;
      this.resouse.resumePlay();
    },
    stopPlay() {
      console.log("结束播放");
      this.isplaying = false;
      this.playIsPause = false;
      this.resouse.stopPlay();
    },
    getPlayTime() {
      console.log("time:" + this.resouse.getPlayTime());
    }
  }
};
</script>

<style scoped>
.record-buttons {
  height: 60px;
}
button {
  width: 56px;
  height: 56px;
  font-size: 24px;
  color: #fff;
}
button:nth-child(3) {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin: 0 30px;
  color: rgb(61, 159, 234);
  background: #fff;
  border-radius: 50%;
}
button:nth-child(3) span {
  border: solid 2px rgb(61, 159, 234);
  padding: 12px;
  border-radius: 50%;
}
.notActive {
  opacity: 0.5;
}
.isrecording {
  color: red;
  border: solid 2px red !important;
}
</style>