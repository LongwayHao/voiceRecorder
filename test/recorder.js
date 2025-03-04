/*!
 *
 * js-audio-recorder - js audio recorder plugin
 *
 * @version v1.0.6
 * @homepage https://github.com/2fps/recorder
 * @author 2fps <echoweb@126.com> (https://www.zhuyuntao.cn)
 * @license MIT
 *
 */
!(function(t, e) {
  "object" == typeof exports && "object" == typeof module
    ? (module.exports = e())
    : "function" == typeof define && define.amd
    ? define([], e)
    : "object" == typeof exports
    ? (exports.Recorder = e())
    : (t.Recorder = e());
})(this, function() {
  return (function(t) {
    var e = {};
    function n(i) {
      if (e[i]) return e[i].exports;
      var o = (e[i] = { i: i, l: !1, exports: {} });
      return t[i].call(o.exports, o, o.exports, n), (o.l = !0), o.exports;
    }
    return (
      (n.m = t),
      (n.c = e),
      (n.d = function(t, e, i) {
        n.o(t, e) || Object.defineProperty(t, e, { enumerable: !0, get: i });
      }),
      (n.r = function(t) {
        "undefined" != typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }),
          Object.defineProperty(t, "__esModule", { value: !0 });
      }),
      (n.t = function(t, e) {
        if ((1 & e && (t = n(t)), 8 & e)) return t;
        if (4 & e && "object" == typeof t && t && t.__esModule) return t;
        var i = Object.create(null);
        if (
          (n.r(i),
          Object.defineProperty(i, "default", { enumerable: !0, value: t }),
          2 & e && "string" != typeof t)
        )
          for (var o in t)
            n.d(
              i,
              o,
              function(e) {
                return t[e];
              }.bind(null, o)
            );
        return i;
      }),
      (n.n = function(t) {
        var e =
          t && t.__esModule
            ? function() {
                return t.default;
              }
            : function() {
                return t;
              };
        return n.d(e, "a", e), e;
      }),
      (n.o = function(t, e) {
        return Object.prototype.hasOwnProperty.call(t, e);
      }),
      (n.p = ""),
      n((n.s = 1))
    );
  })([
    function(t, e, n) {
      "use strict";
      function i(t, e, n) {
        for (var i = 0; i < n.length; i++) t.setUint8(e + i, n.charCodeAt(i));
      }
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.compress = function(t, e, n) {
          for (
            var i = e / n,
              o = Math.max(i, 1),
              r = t.left,
              a = t.right,
              s = Math.floor((r.length + a.length) / i),
              u = new Float32Array(s),
              c = 0,
              l = 0;
            c < s;

          ) {
            var f = Math.floor(l);
            (u[c] = r[f]), c++, a.length && ((u[c] = a[f]), c++), (l += o);
          }
          return u;
        }),
        (e.encodePCM = function(t, e, n) {
          void 0 === n && (n = !0);
          var i = 0,
            o = t.length * (e / 8),
            r = new ArrayBuffer(o),
            a = new DataView(r);
          if (8 === e)
            for (var s = 0; s < t.length; s++, i++) {
              var u =
                (c = Math.max(-1, Math.min(1, t[s]))) < 0 ? 128 * c : 127 * c;
              (u = +u + 128), a.setInt8(i, u);
            }
          else
            for (s = 0; s < t.length; s++, i += 2) {
              var c = Math.max(-1, Math.min(1, t[s]));
              a.setInt16(i, c < 0 ? 32768 * c : 32767 * c, n);
            }
          return a;
        }),
        (e.encodeWAV = function(t, e, n, o, r, a) {
          void 0 === a && (a = !0);
          var s = n > e ? e : n,
            u = r,
            c = new ArrayBuffer(44 + t.byteLength),
            l = new DataView(c),
            f = o,
            p = 0;
          i(l, p, "RIFF"),
            (p += 4),
            l.setUint32(p, 36 + t.byteLength, a),
            i(l, (p += 4), "WAVE"),
            i(l, (p += 4), "fmt "),
            (p += 4),
            l.setUint32(p, 16, a),
            (p += 4),
            l.setUint16(p, 1, a),
            (p += 2),
            l.setUint16(p, f, a),
            (p += 2),
            l.setUint32(p, s, a),
            (p += 4),
            l.setUint32(p, f * s * (u / 8), a),
            (p += 4),
            l.setUint16(p, f * (u / 8), a),
            (p += 2),
            l.setUint16(p, u, a),
            i(l, (p += 2), "data"),
            (p += 4),
            l.setUint32(p, t.byteLength, a),
            (p += 4);
          for (var d = 0; d < t.byteLength; )
            l.setUint8(p, t.getUint8(d)), p++, d++;
          return l;
        });
    },
    function(t, e, n) {
      "use strict";
      var i,
        o =
          (this && this.__extends) ||
          ((i = function(t, e) {
            return (i =
              Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array &&
                function(t, e) {
                  t.__proto__ = e;
                }) ||
              function(t, e) {
                for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
              })(t, e);
          }),
          function(t, e) {
            function n() {
              this.constructor = t;
            }
            i(t, e),
              (t.prototype =
                null === e
                  ? Object.create(e)
                  : ((n.prototype = e.prototype), new n()));
          });
      Object.defineProperty(e, "__esModule", { value: !0 });
      var r = n(2),
        a = n(0),
        s = n(3),
        u = (function(t) {
          function e(e) {
            void 0 === e && (e = {});
            var n = t.call(this, e) || this;
            return (
              (n.isrecording = !1), (n.ispause = !1), (n.isplaying = !1), n
            );
          }
          return (
            o(e, t),
            (e.prototype.setOption = function(t) {
              void 0 === t && (t = {}), this.setNewOption(t);
            }),
            (e.prototype.start = function() {
              return this.isrecording
                ? Promise.reject()
                : ((this.isrecording = !0), this.startRecord());
            }),
            (e.prototype.pause = function() {
              this.isrecording &&
                !this.ispause &&
                ((this.ispause = !0), this.pauseRecord());
            }),
            (e.prototype.resume = function() {
              this.isrecording &&
                this.ispause &&
                ((this.ispause = !1), this.resumeRecord());
            }),
            (e.prototype.stop = function() {
              this.isrecording &&
                ((this.isrecording = !1),
                (this.ispause = !1),
                this.stopRecord());
            }),
            (e.prototype.play = function() {
              this.stop(),
                (this.isplaying = !0),
                this.onplay && this.onplay(),
                s.default.addPlayEnd(this.onplayend);
              var t = this.getWAV();
              t.byteLength > 44 && s.default.play(t.buffer);
            }),
            (e.prototype.getPlayTime = function() {
              return s.default.getPlayTime();
            }),
            (e.prototype.pausePlay = function() {
              !this.isrecording &&
                this.isplaying &&
                ((this.isplaying = !1),
                this.onpauseplay && this.onpauseplay(),
                s.default.pausePlay());
            }),
            (e.prototype.resumePlay = function() {
              this.isrecording ||
                this.isplaying ||
                ((this.isplaying = !0),
                this.onresumeplay && this.onresumeplay(),
                s.default.resumePlay());
            }),
            (e.prototype.stopPlay = function() {
              this.isrecording ||
                ((this.isplaying = !1),
                this.onstopplay && this.onstopplay(),
                s.default.stopPlay());
            }),
            (e.prototype.destroy = function() {
              return s.default.destroyPlay(), this.destroyRecord();
            }),
            (e.prototype.getRecordAnalyseData = function() {
              return this.getAnalyseData();
            }),
            (e.prototype.getPlayAnalyseData = function() {
              return s.default.getAnalyseData();
            }),
            (e.prototype.getPCM = function() {
              this.stop();
              var t = this.getData();
              return (
                (t = a.compress(
                  t,
                  this.inputSampleRate,
                  this.outputSampleRate
                )),
                a.encodePCM(t, this.oututSampleBits, this.littleEdian)
              );
            }),
            (e.prototype.getPCMBlob = function() {
              return new Blob([this.getPCM()]);
            }),
            (e.prototype.downloadPCM = function(t) {
              void 0 === t && (t = "recorder");
              var e = this.getPCMBlob();
              r.downloadPCM(e, t);
            }),
            (e.prototype.getWAV = function() {
              var t = this.getPCM();
              return a.encodeWAV(
                t,
                this.inputSampleRate,
                this.outputSampleRate,
                this.config.numChannels,
                this.oututSampleBits,
                this.littleEdian
              );
            }),
            (e.prototype.getWAVBlob = function() {
              return new Blob([this.getWAV()], { type: "audio/wav" });
            }),
            (e.prototype.downloadWAV = function(t) {
              void 0 === t && (t = "recorder");
              var e = this.getWAVBlob();
              r.downloadWAV(e, t);
            }),
            (e.prototype.download = function(t, e, n) {
              r.download(t, e, n);
            }),
            (e.prototype.getChannelData = function() {
              var t = this.getPCM(),
                e = t.byteLength,
                n = this.littleEdian,
                i = { left: null, right: null };
              if (2 === this.config.numChannels) {
                var o = new DataView(new ArrayBuffer(e / 2)),
                  r = new DataView(new ArrayBuffer(e / 2));
                if (16 === this.config.sampleBits)
                  for (var a = 0; a < e / 2; a += 2)
                    o.setInt16(a, t.getInt16(2 * a, n), n),
                      r.setInt16(a, t.getInt16(2 * a + 2, n), n);
                else
                  for (a = 0; a < e / 2; a += 2)
                    o.setInt8(a, t.getInt8(2 * a)),
                      r.setInt8(a, t.getInt8(2 * a + 1));
                (i.left = o), (i.right = r);
              } else i.left = t;
              return i;
            }),
            e
          );
        })(n(5).default);
      e.default = u;
    },
    function(t, e, n) {
      "use strict";
      function i(t, e, n) {
        var i = document.createElement("a");
        (i.href = window.URL.createObjectURL(t)),
          (i.download = e + "." + n),
          i.click();
      }
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.downloadWAV = function(t, e) {
          void 0 === e && (e = "recorder"), i(t, e, "wav");
        }),
        (e.downloadPCM = function(t, e) {
          void 0 === e && (e = "recorder"), i(t, e, "pcm");
        }),
        (e.download = function(t, e, n) {
          return i(t, e, n);
        });
    },
    function(t, e, n) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 });
      var i = n(4),
        o = null,
        r = 0,
        a = 0,
        s = null,
        u = null,
        c = null,
        l = !1,
        f = 0,
        p = function() {};
      function d() {
        return (
          (l = !1),
          s.decodeAudioData(
            c.slice(0),
            function(t) {
              ((o = s.createBufferSource()).onended = function() {
                l || ((f = s.currentTime - a + r), p());
              }),
                (o.buffer = t),
                o.connect(u),
                u.connect(s.destination),
                o.start(0, r),
                (a = s.currentTime);
            },
            function(t) {
              i.throwError(t);
            }
          )
        );
      }
      function h() {
        o && (o.stop(), (o = null));
      }
      var y = (function() {
        function t() {}
        return (
          (t.play = function(t) {
            return (
              s ||
                ((s = new (window.AudioContext || window.webkitAudioContext)()),
                ((u = s.createAnalyser()).fftSize = 2048)),
              this.stopPlay(),
              (c = t),
              (f = 0),
              d()
            );
          }),
          (t.pausePlay = function() {
            h(), (r += s.currentTime - a), (l = !0);
          }),
          (t.resumePlay = function() {
            return d();
          }),
          (t.stopPlay = function() {
            (r = 0), (c = null), h();
          }),
          (t.destroyPlay = function() {
            this.stopPlay();
          }),
          (t.getAnalyseData = function() {
            var t = new Uint8Array(u.frequencyBinCount);
            return u.getByteTimeDomainData(t), t;
          }),
          (t.addPlayEnd = function(t) {
            void 0 === t && (t = function() {}), (p = t);
          }),
          (t.getPlayTime = function() {
            var t = l ? r : s.currentTime - a + r;
            return f || t;
          }),
          t
        );
      })();
      e.default = y;
    },
    function(t, e, n) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 }),
        (e.throwError = function(t) {
          throw new Error(t);
        });
    },
    function(t, e, n) {
      "use strict";
      Object.defineProperty(e, "__esModule", { value: !0 });
      var i = n(0),
        o = (function() {
          function t(e) {
            void 0 === e && (e = {}),
              (this.size = 0),
              (this.lBuffer = []),
              (this.rBuffer = []),
              (this.tempPCM = []),
              (this.inputSampleBits = 16),
              (this.fileSize = 0),
              (this.duration = 0),
              (this.needRecord = !0);
            var n,
              i = new (window.AudioContext || window.webkitAudioContext)();
            (this.inputSampleRate = i.sampleRate),
              this.setNewOption(e),
              (this.littleEdian =
                ((n = new ArrayBuffer(2)),
                new DataView(n).setInt16(0, 256, !0),
                256 === new Int16Array(n)[0])),
              t.initUserMedia();
          }
          return (
            (t.prototype.setNewOption = function(t) {
              void 0 === t && (t = {}),
                (this.config = {
                  sampleBits: ~[8, 16].indexOf(t.sampleBits)
                    ? t.sampleBits
                    : 16,
                  sampleRate: ~[
                    8e3,
                    11025,
                    16e3,
                    22050,
                    24e3,
                    44100,
                    48e3,
                  ].indexOf(t.sampleRate)
                    ? t.sampleRate
                    : this.inputSampleRate,
                  numChannels: ~[1, 2].indexOf(t.numChannels)
                    ? t.numChannels
                    : 1,
                }),
                (this.outputSampleRate = this.config.sampleRate),
                (this.oututSampleBits = this.config.sampleBits);
            }),
            (t.prototype.startRecord = function() {
              var t = this;
              return (
                this.context && this.destroyRecord(),
                this.initRecorder(),
                navigator.mediaDevices
                  .getUserMedia({ audio: !0 })
                  .then(function(e) {
                    (t.audioInput = t.context.createMediaStreamSource(e)),
                      (t.stream = e);
                  })
                  .then(function() {
                    t.audioInput.connect(t.analyser),
                      t.analyser.connect(t.recorder),
                      t.recorder.connect(t.context.destination);
                  })
              );
            }),
            (t.prototype.pauseRecord = function() {
              this.needRecord = !1;
            }),
            (t.prototype.resumeRecord = function() {
              this.needRecord = !0;
            }),
            (t.prototype.stopRecord = function() {
              this.audioInput && this.audioInput.disconnect(),
                this.source && this.source.stop(),
                this.recorder.disconnect(),
                this.analyser.disconnect();
            }),
            (t.prototype.destroyRecord = function() {
              return (
                this.clearRecordStatus(),
                this.stopStream(),
                this.closeAudioContext()
              );
            }),
            (t.prototype.getAnalyseData = function() {
              var t = new Uint8Array(this.analyser.frequencyBinCount);
              return this.analyser.getByteTimeDomainData(t), t;
            }),
            (t.prototype.getData = function() {
              return this.flat();
            }),
            (t.prototype.clearRecordStatus = function() {
              (this.lBuffer.length = 0),
                (this.rBuffer.length = 0),
                (this.size = 0),
                (this.fileSize = 0),
                (this.PCM = null),
                (this.audioInput = null),
                (this.duration = 0);
            }),
            (t.prototype.flat = function() {
              var t = null,
                e = new Float32Array(0);
              1 === this.config.numChannels
                ? (t = new Float32Array(this.size))
                : ((t = new Float32Array(this.size / 2)),
                  (e = new Float32Array(this.size / 2)));
              for (var n = 0, i = 0; i < this.lBuffer.length; i++)
                t.set(this.lBuffer[i], n), (n += this.lBuffer[i].length);
              n = 0;
              for (i = 0; i < this.rBuffer.length; i++)
                e.set(this.rBuffer[i], n), (n += this.rBuffer[i].length);
              return { left: t, right: e };
            }),
            (t.prototype.initRecorder = function() {
              var t = this;
              this.clearRecordStatus(),
                (this.context = new (window.AudioContext ||
                  window.webkitAudioContext)()),
                (this.analyser = this.context.createAnalyser()),
                (this.analyser.fftSize = 2048);
              var e =
                this.context.createScriptProcessor ||
                this.context.createJavaScriptNode;
              (this.recorder = e.apply(this.context, [
                4096,
                this.config.numChannels,
                this.config.numChannels,
              ])),
                (this.recorder.onaudioprocess = function(e) {
                  if (t.needRecord) {
                    var n,
                      i = e.inputBuffer.getChannelData(0),
                      o = null;
                    t.lBuffer.push(new Float32Array(i)),
                      (t.size += i.length),
                      2 === t.config.numChannels &&
                        ((o = e.inputBuffer.getChannelData(1)),
                        t.rBuffer.push(new Float32Array(o)),
                        (t.size += o.length)),
                      (t.fileSize =
                        Math.floor(
                          t.size /
                            Math.max(t.inputSampleRate / t.outputSampleRate, 1)
                        ) *
                        (t.oututSampleBits / 8)),
                      (n = 100 * Math.max.apply(Math, i)),
                      (t.duration += 4096 / t.inputSampleRate),
                      t.onprocess && t.onprocess(t.duration),
                      t.onprogress &&
                        t.onprogress({
                          duration: t.duration,
                          fileSize: t.fileSize,
                          vol: n,
                        });
                  }
                });
            }),
            (t.prototype.stopStream = function() {
              this.stream &&
                this.stream.getTracks &&
                (this.stream.getTracks().forEach(function(t) {
                  return t.stop();
                }),
                (this.stream = null));
            }),
            (t.prototype.closeAudioContext = function() {
              return this.context &&
                this.context.close &&
                "closed" !== this.context.state
                ? this.context.close()
                : new Promise(function(t) {
                    t();
                  });
            }),
            (t.initUserMedia = function() {
              void 0 === navigator.mediaDevices &&
                (navigator.mediaDevices = {}),
                void 0 === navigator.mediaDevices.getUserMedia &&
                  (navigator.mediaDevices.getUserMedia = function(t) {
                    var e =
                      navigator.getUserMedia ||
                      navigator.webkitGetUserMedia ||
                      navigator.mozGetUserMedia;
                    return e
                      ? new Promise(function(n, i) {
                          e.call(navigator, t, n, i);
                        })
                      : Promise.reject(
                          new Error("浏览器不支持 getUserMedia !")
                        );
                  });
            }),
            (t.prototype.transformIntoPCM = function(t, e) {
              var n = new Float32Array(t),
                o = new Float32Array(e),
                r = i.compress(
                  { left: n, right: o },
                  this.inputSampleRate,
                  this.outputSampleRate
                );
              return i.encodePCM(r, this.oututSampleBits, this.littleEdian);
            }),
            (t.getPermission = function() {
              return (
                this.initUserMedia(),
                navigator.mediaDevices
                  .getUserMedia({ audio: !0 })
                  .then(function(t) {
                    t.getTracks().forEach(function(t) {
                      return t.stop();
                    });
                  })
              );
            }),
            t
          );
        })();
      e.default = o;
    },
  ]).default;
});
//# sourceMappingURL=recorder.js.map
