<template>
  <div id="voice_recorder">
    <time-line
      :recorders="recorders"
      :recorder="recorder"
      @addANew="addANew"
      @select="changeSelect"
      ref="timeLine"
    />
    <record-buttons
      :propRecorder="recorder"
      @getCurrentRecorders="getCurrentRecorders"
      @toolbarShowOrHide="toolbarShowOrHide"
      @controlVersion="controlVersion"
      ref="recordButtons"
    />
    <timer />
    <toolbar class="toolbar" ref="toolbar" @popupShow="popupShow" />
    <popup class="popup" ref="popup" :recorder="recorder" />
  </div>
</template>

<script>
import lodash from "lodash";
import Recorder from "js-audio-recorder";

import { id } from "../../common/utils";

import TimeLine from "./TimeLine";
import RecordButtons from "./RecordButtons";
import Timer from "./Timer";
import Toolbar from "./Toolbar";
import Popup from "./Popup";

export default {
  name: "VioceRecorder",
  data() {
    return {
      recorders: [],
      recorder: {},
    };
  },
  components: {
    TimeLine,
    RecordButtons,
    Timer,
    Toolbar,
    Popup,
  },

  methods: {
    controlVersion(o) {
      if (o.type === "addversion") {
        this.recorders.forEach((item, index) => {
          if (item.id === o.data.id) {
            console.log("ok", index, item);
            this.recorders[index] = o.data;
            this.recorder = this.recorders[index];
          }
        });
        this.$store.commit(o.type, this.recorders);
      } else {
        this.$store.commit(o.type);
      }
      this.getCurrentRecorders();
    },
    getCurrentRecorders() {
      this.recorders = lodash.cloneDeep(
        this.$store.state.historyArr[this.$store.state.currentVersion]
      );
      // 如果选择的不存在，就变成最下面的那个
      const temp = this.recorders.find((item) => {
        return item.id === this.recorder.id;
      });
      if (temp) {
        this.recorder = temp;
        console.log(this.recorder === temp);
      } else {
        this.changeSelect(this.recorders[this.recorders.length - 1]);
      }

      console.log("getcurrentrecorder的", this.recorder);
    },
    // add a new layer
    addANew() {
      const recorder = new Recorder({
        sampleBits: 16, // 采样位数，支持 8 或 16，默认是16
        sampleRate: 16000, // 采样率，支持 11025、16000、22050、24000、44100、48000，根据浏览器默认值，我的chrome是48000
        numChannels: 1,
      });
      recorder.id = id();
      this.recorders.push(recorder);
      this.recorder = recorder;
      this.$store.commit("addversion", this.recorders);
    },

    // 修改  select
    changeSelect(recorder) {
      this.$refs.recordButtons.isrecording || (this.recorder = recorder);
      console.log("changeSelect");
    },

    //=========================================================================底部toolbar显示
    toolbarShowOrHide(recording) {
      const toolvar = this.$refs.toolbar.$el;
      if (recording) {
        toolvar.style.display = "none";
      } else {
        toolvar.style.display = "block";
      }
    },
    popupShow() {
      this.$refs.popup.$el.style.display = "block";
    },
  },

  mounted() {
    this.addANew();
  },
};
</script>

<style scoped>
#voice_recorder {
  padding: 0 20px;
}
</style>