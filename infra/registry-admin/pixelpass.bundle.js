(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
    get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
  }) : x)(function(x) {
    if (typeof require !== "undefined") return require.apply(this, arguments);
    throw Error('Dynamic require of "' + x + '" is not supported');
  });
  var __commonJS = (cb, mod) => function __require2() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // node_modules/@mosip/pixelpass/src/types/ECC.js
  var require_ECC = __commonJS({
    "node_modules/@mosip/pixelpass/src/types/ECC.js"(exports) {
      exports.ECC = Object.freeze({
        L: "L",
        M: "M",
        Q: "Q",
        H: "H"
      });
    }
  });

  // node_modules/@mosip/pixelpass/src/shared/Constants.js
  var require_Constants = __commonJS({
    "node_modules/@mosip/pixelpass/src/shared/Constants.js"(exports) {
      var ECC = require_ECC().ECC;
      exports.DEFAULT_ZLIB_COMPRESSION_LEVEL = 9;
      exports.DEFAULT_ECC_LEVEL = ECC.L;
      exports.COLOR_BLACK = "#000000";
      exports.COLOR_WHITE = "#FFFFFF";
      exports.DEFAULT_QR_SCALE = 10;
      exports.DEFAULT_QR_BORDER = 3;
      exports.DEFAULT_QR_QUALITY = 1;
      exports.ZIP_HEADER = "PK";
      exports.DEFAULT_ZIP_FILE_NAME = "certificate.json";
    }
  });

  // node_modules/qrcode/lib/can-promise.js
  var require_can_promise = __commonJS({
    "node_modules/qrcode/lib/can-promise.js"(exports, module) {
      module.exports = function() {
        return typeof Promise === "function" && Promise.prototype && Promise.prototype.then;
      };
    }
  });

  // node_modules/qrcode/lib/core/utils.js
  var require_utils = __commonJS({
    "node_modules/qrcode/lib/core/utils.js"(exports) {
      var toSJISFunction;
      var CODEWORDS_COUNT = [
        0,
        // Not used
        26,
        44,
        70,
        100,
        134,
        172,
        196,
        242,
        292,
        346,
        404,
        466,
        532,
        581,
        655,
        733,
        815,
        901,
        991,
        1085,
        1156,
        1258,
        1364,
        1474,
        1588,
        1706,
        1828,
        1921,
        2051,
        2185,
        2323,
        2465,
        2611,
        2761,
        2876,
        3034,
        3196,
        3362,
        3532,
        3706
      ];
      exports.getSymbolSize = function getSymbolSize(version) {
        if (!version) throw new Error('"version" cannot be null or undefined');
        if (version < 1 || version > 40) throw new Error('"version" should be in range from 1 to 40');
        return version * 4 + 17;
      };
      exports.getSymbolTotalCodewords = function getSymbolTotalCodewords(version) {
        return CODEWORDS_COUNT[version];
      };
      exports.getBCHDigit = function(data) {
        let digit = 0;
        while (data !== 0) {
          digit++;
          data >>>= 1;
        }
        return digit;
      };
      exports.setToSJISFunction = function setToSJISFunction(f) {
        if (typeof f !== "function") {
          throw new Error('"toSJISFunc" is not a valid function.');
        }
        toSJISFunction = f;
      };
      exports.isKanjiModeEnabled = function() {
        return typeof toSJISFunction !== "undefined";
      };
      exports.toSJIS = function toSJIS(kanji) {
        return toSJISFunction(kanji);
      };
    }
  });

  // node_modules/qrcode/lib/core/error-correction-level.js
  var require_error_correction_level = __commonJS({
    "node_modules/qrcode/lib/core/error-correction-level.js"(exports) {
      exports.L = { bit: 1 };
      exports.M = { bit: 0 };
      exports.Q = { bit: 3 };
      exports.H = { bit: 2 };
      function fromString(string) {
        if (typeof string !== "string") {
          throw new Error("Param is not a string");
        }
        const lcStr = string.toLowerCase();
        switch (lcStr) {
          case "l":
          case "low":
            return exports.L;
          case "m":
          case "medium":
            return exports.M;
          case "q":
          case "quartile":
            return exports.Q;
          case "h":
          case "high":
            return exports.H;
          default:
            throw new Error("Unknown EC Level: " + string);
        }
      }
      exports.isValid = function isValid(level) {
        return level && typeof level.bit !== "undefined" && level.bit >= 0 && level.bit < 4;
      };
      exports.from = function from(value, defaultValue) {
        if (exports.isValid(value)) {
          return value;
        }
        try {
          return fromString(value);
        } catch (e) {
          return defaultValue;
        }
      };
    }
  });

  // node_modules/qrcode/lib/core/bit-buffer.js
  var require_bit_buffer = __commonJS({
    "node_modules/qrcode/lib/core/bit-buffer.js"(exports, module) {
      function BitBuffer() {
        this.buffer = [];
        this.length = 0;
      }
      BitBuffer.prototype = {
        get: function(index) {
          const bufIndex = Math.floor(index / 8);
          return (this.buffer[bufIndex] >>> 7 - index % 8 & 1) === 1;
        },
        put: function(num, length) {
          for (let i = 0; i < length; i++) {
            this.putBit((num >>> length - i - 1 & 1) === 1);
          }
        },
        getLengthInBits: function() {
          return this.length;
        },
        putBit: function(bit) {
          const bufIndex = Math.floor(this.length / 8);
          if (this.buffer.length <= bufIndex) {
            this.buffer.push(0);
          }
          if (bit) {
            this.buffer[bufIndex] |= 128 >>> this.length % 8;
          }
          this.length++;
        }
      };
      module.exports = BitBuffer;
    }
  });

  // node_modules/qrcode/lib/core/bit-matrix.js
  var require_bit_matrix = __commonJS({
    "node_modules/qrcode/lib/core/bit-matrix.js"(exports, module) {
      function BitMatrix(size) {
        if (!size || size < 1) {
          throw new Error("BitMatrix size must be defined and greater than 0");
        }
        this.size = size;
        this.data = new Uint8Array(size * size);
        this.reservedBit = new Uint8Array(size * size);
      }
      BitMatrix.prototype.set = function(row, col, value, reserved) {
        const index = row * this.size + col;
        this.data[index] = value;
        if (reserved) this.reservedBit[index] = true;
      };
      BitMatrix.prototype.get = function(row, col) {
        return this.data[row * this.size + col];
      };
      BitMatrix.prototype.xor = function(row, col, value) {
        this.data[row * this.size + col] ^= value;
      };
      BitMatrix.prototype.isReserved = function(row, col) {
        return this.reservedBit[row * this.size + col];
      };
      module.exports = BitMatrix;
    }
  });

  // node_modules/qrcode/lib/core/alignment-pattern.js
  var require_alignment_pattern = __commonJS({
    "node_modules/qrcode/lib/core/alignment-pattern.js"(exports) {
      var getSymbolSize = require_utils().getSymbolSize;
      exports.getRowColCoords = function getRowColCoords(version) {
        if (version === 1) return [];
        const posCount = Math.floor(version / 7) + 2;
        const size = getSymbolSize(version);
        const intervals = size === 145 ? 26 : Math.ceil((size - 13) / (2 * posCount - 2)) * 2;
        const positions = [size - 7];
        for (let i = 1; i < posCount - 1; i++) {
          positions[i] = positions[i - 1] - intervals;
        }
        positions.push(6);
        return positions.reverse();
      };
      exports.getPositions = function getPositions(version) {
        const coords = [];
        const pos = exports.getRowColCoords(version);
        const posLength = pos.length;
        for (let i = 0; i < posLength; i++) {
          for (let j = 0; j < posLength; j++) {
            if (i === 0 && j === 0 || // top-left
            i === 0 && j === posLength - 1 || // bottom-left
            i === posLength - 1 && j === 0) {
              continue;
            }
            coords.push([pos[i], pos[j]]);
          }
        }
        return coords;
      };
    }
  });

  // node_modules/qrcode/lib/core/finder-pattern.js
  var require_finder_pattern = __commonJS({
    "node_modules/qrcode/lib/core/finder-pattern.js"(exports) {
      var getSymbolSize = require_utils().getSymbolSize;
      var FINDER_PATTERN_SIZE = 7;
      exports.getPositions = function getPositions(version) {
        const size = getSymbolSize(version);
        return [
          // top-left
          [0, 0],
          // top-right
          [size - FINDER_PATTERN_SIZE, 0],
          // bottom-left
          [0, size - FINDER_PATTERN_SIZE]
        ];
      };
    }
  });

  // node_modules/qrcode/lib/core/mask-pattern.js
  var require_mask_pattern = __commonJS({
    "node_modules/qrcode/lib/core/mask-pattern.js"(exports) {
      exports.Patterns = {
        PATTERN000: 0,
        PATTERN001: 1,
        PATTERN010: 2,
        PATTERN011: 3,
        PATTERN100: 4,
        PATTERN101: 5,
        PATTERN110: 6,
        PATTERN111: 7
      };
      var PenaltyScores = {
        N1: 3,
        N2: 3,
        N3: 40,
        N4: 10
      };
      exports.isValid = function isValid(mask) {
        return mask != null && mask !== "" && !isNaN(mask) && mask >= 0 && mask <= 7;
      };
      exports.from = function from(value) {
        return exports.isValid(value) ? parseInt(value, 10) : void 0;
      };
      exports.getPenaltyN1 = function getPenaltyN1(data) {
        const size = data.size;
        let points = 0;
        let sameCountCol = 0;
        let sameCountRow = 0;
        let lastCol = null;
        let lastRow = null;
        for (let row = 0; row < size; row++) {
          sameCountCol = sameCountRow = 0;
          lastCol = lastRow = null;
          for (let col = 0; col < size; col++) {
            let module2 = data.get(row, col);
            if (module2 === lastCol) {
              sameCountCol++;
            } else {
              if (sameCountCol >= 5) points += PenaltyScores.N1 + (sameCountCol - 5);
              lastCol = module2;
              sameCountCol = 1;
            }
            module2 = data.get(col, row);
            if (module2 === lastRow) {
              sameCountRow++;
            } else {
              if (sameCountRow >= 5) points += PenaltyScores.N1 + (sameCountRow - 5);
              lastRow = module2;
              sameCountRow = 1;
            }
          }
          if (sameCountCol >= 5) points += PenaltyScores.N1 + (sameCountCol - 5);
          if (sameCountRow >= 5) points += PenaltyScores.N1 + (sameCountRow - 5);
        }
        return points;
      };
      exports.getPenaltyN2 = function getPenaltyN2(data) {
        const size = data.size;
        let points = 0;
        for (let row = 0; row < size - 1; row++) {
          for (let col = 0; col < size - 1; col++) {
            const last = data.get(row, col) + data.get(row, col + 1) + data.get(row + 1, col) + data.get(row + 1, col + 1);
            if (last === 4 || last === 0) points++;
          }
        }
        return points * PenaltyScores.N2;
      };
      exports.getPenaltyN3 = function getPenaltyN3(data) {
        const size = data.size;
        let points = 0;
        let bitsCol = 0;
        let bitsRow = 0;
        for (let row = 0; row < size; row++) {
          bitsCol = bitsRow = 0;
          for (let col = 0; col < size; col++) {
            bitsCol = bitsCol << 1 & 2047 | data.get(row, col);
            if (col >= 10 && (bitsCol === 1488 || bitsCol === 93)) points++;
            bitsRow = bitsRow << 1 & 2047 | data.get(col, row);
            if (col >= 10 && (bitsRow === 1488 || bitsRow === 93)) points++;
          }
        }
        return points * PenaltyScores.N3;
      };
      exports.getPenaltyN4 = function getPenaltyN4(data) {
        let darkCount = 0;
        const modulesCount = data.data.length;
        for (let i = 0; i < modulesCount; i++) darkCount += data.data[i];
        const k = Math.abs(Math.ceil(darkCount * 100 / modulesCount / 5) - 10);
        return k * PenaltyScores.N4;
      };
      function getMaskAt(maskPattern, i, j) {
        switch (maskPattern) {
          case exports.Patterns.PATTERN000:
            return (i + j) % 2 === 0;
          case exports.Patterns.PATTERN001:
            return i % 2 === 0;
          case exports.Patterns.PATTERN010:
            return j % 3 === 0;
          case exports.Patterns.PATTERN011:
            return (i + j) % 3 === 0;
          case exports.Patterns.PATTERN100:
            return (Math.floor(i / 2) + Math.floor(j / 3)) % 2 === 0;
          case exports.Patterns.PATTERN101:
            return i * j % 2 + i * j % 3 === 0;
          case exports.Patterns.PATTERN110:
            return (i * j % 2 + i * j % 3) % 2 === 0;
          case exports.Patterns.PATTERN111:
            return (i * j % 3 + (i + j) % 2) % 2 === 0;
          default:
            throw new Error("bad maskPattern:" + maskPattern);
        }
      }
      exports.applyMask = function applyMask(pattern, data) {
        const size = data.size;
        for (let col = 0; col < size; col++) {
          for (let row = 0; row < size; row++) {
            if (data.isReserved(row, col)) continue;
            data.xor(row, col, getMaskAt(pattern, row, col));
          }
        }
      };
      exports.getBestMask = function getBestMask(data, setupFormatFunc) {
        const numPatterns = Object.keys(exports.Patterns).length;
        let bestPattern = 0;
        let lowerPenalty = Infinity;
        for (let p = 0; p < numPatterns; p++) {
          setupFormatFunc(p);
          exports.applyMask(p, data);
          const penalty = exports.getPenaltyN1(data) + exports.getPenaltyN2(data) + exports.getPenaltyN3(data) + exports.getPenaltyN4(data);
          exports.applyMask(p, data);
          if (penalty < lowerPenalty) {
            lowerPenalty = penalty;
            bestPattern = p;
          }
        }
        return bestPattern;
      };
    }
  });

  // node_modules/qrcode/lib/core/error-correction-code.js
  var require_error_correction_code = __commonJS({
    "node_modules/qrcode/lib/core/error-correction-code.js"(exports) {
      var ECLevel = require_error_correction_level();
      var EC_BLOCKS_TABLE = [
        // L  M  Q  H
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        1,
        2,
        2,
        1,
        2,
        2,
        4,
        1,
        2,
        4,
        4,
        2,
        4,
        4,
        4,
        2,
        4,
        6,
        5,
        2,
        4,
        6,
        6,
        2,
        5,
        8,
        8,
        4,
        5,
        8,
        8,
        4,
        5,
        8,
        11,
        4,
        8,
        10,
        11,
        4,
        9,
        12,
        16,
        4,
        9,
        16,
        16,
        6,
        10,
        12,
        18,
        6,
        10,
        17,
        16,
        6,
        11,
        16,
        19,
        6,
        13,
        18,
        21,
        7,
        14,
        21,
        25,
        8,
        16,
        20,
        25,
        8,
        17,
        23,
        25,
        9,
        17,
        23,
        34,
        9,
        18,
        25,
        30,
        10,
        20,
        27,
        32,
        12,
        21,
        29,
        35,
        12,
        23,
        34,
        37,
        12,
        25,
        34,
        40,
        13,
        26,
        35,
        42,
        14,
        28,
        38,
        45,
        15,
        29,
        40,
        48,
        16,
        31,
        43,
        51,
        17,
        33,
        45,
        54,
        18,
        35,
        48,
        57,
        19,
        37,
        51,
        60,
        19,
        38,
        53,
        63,
        20,
        40,
        56,
        66,
        21,
        43,
        59,
        70,
        22,
        45,
        62,
        74,
        24,
        47,
        65,
        77,
        25,
        49,
        68,
        81
      ];
      var EC_CODEWORDS_TABLE = [
        // L  M  Q  H
        7,
        10,
        13,
        17,
        10,
        16,
        22,
        28,
        15,
        26,
        36,
        44,
        20,
        36,
        52,
        64,
        26,
        48,
        72,
        88,
        36,
        64,
        96,
        112,
        40,
        72,
        108,
        130,
        48,
        88,
        132,
        156,
        60,
        110,
        160,
        192,
        72,
        130,
        192,
        224,
        80,
        150,
        224,
        264,
        96,
        176,
        260,
        308,
        104,
        198,
        288,
        352,
        120,
        216,
        320,
        384,
        132,
        240,
        360,
        432,
        144,
        280,
        408,
        480,
        168,
        308,
        448,
        532,
        180,
        338,
        504,
        588,
        196,
        364,
        546,
        650,
        224,
        416,
        600,
        700,
        224,
        442,
        644,
        750,
        252,
        476,
        690,
        816,
        270,
        504,
        750,
        900,
        300,
        560,
        810,
        960,
        312,
        588,
        870,
        1050,
        336,
        644,
        952,
        1110,
        360,
        700,
        1020,
        1200,
        390,
        728,
        1050,
        1260,
        420,
        784,
        1140,
        1350,
        450,
        812,
        1200,
        1440,
        480,
        868,
        1290,
        1530,
        510,
        924,
        1350,
        1620,
        540,
        980,
        1440,
        1710,
        570,
        1036,
        1530,
        1800,
        570,
        1064,
        1590,
        1890,
        600,
        1120,
        1680,
        1980,
        630,
        1204,
        1770,
        2100,
        660,
        1260,
        1860,
        2220,
        720,
        1316,
        1950,
        2310,
        750,
        1372,
        2040,
        2430
      ];
      exports.getBlocksCount = function getBlocksCount(version, errorCorrectionLevel) {
        switch (errorCorrectionLevel) {
          case ECLevel.L:
            return EC_BLOCKS_TABLE[(version - 1) * 4 + 0];
          case ECLevel.M:
            return EC_BLOCKS_TABLE[(version - 1) * 4 + 1];
          case ECLevel.Q:
            return EC_BLOCKS_TABLE[(version - 1) * 4 + 2];
          case ECLevel.H:
            return EC_BLOCKS_TABLE[(version - 1) * 4 + 3];
          default:
            return void 0;
        }
      };
      exports.getTotalCodewordsCount = function getTotalCodewordsCount(version, errorCorrectionLevel) {
        switch (errorCorrectionLevel) {
          case ECLevel.L:
            return EC_CODEWORDS_TABLE[(version - 1) * 4 + 0];
          case ECLevel.M:
            return EC_CODEWORDS_TABLE[(version - 1) * 4 + 1];
          case ECLevel.Q:
            return EC_CODEWORDS_TABLE[(version - 1) * 4 + 2];
          case ECLevel.H:
            return EC_CODEWORDS_TABLE[(version - 1) * 4 + 3];
          default:
            return void 0;
        }
      };
    }
  });

  // node_modules/qrcode/lib/core/galois-field.js
  var require_galois_field = __commonJS({
    "node_modules/qrcode/lib/core/galois-field.js"(exports) {
      var EXP_TABLE = new Uint8Array(512);
      var LOG_TABLE = new Uint8Array(256);
      (function initTables() {
        let x = 1;
        for (let i = 0; i < 255; i++) {
          EXP_TABLE[i] = x;
          LOG_TABLE[x] = i;
          x <<= 1;
          if (x & 256) {
            x ^= 285;
          }
        }
        for (let i = 255; i < 512; i++) {
          EXP_TABLE[i] = EXP_TABLE[i - 255];
        }
      })();
      exports.log = function log(n) {
        if (n < 1) throw new Error("log(" + n + ")");
        return LOG_TABLE[n];
      };
      exports.exp = function exp(n) {
        return EXP_TABLE[n];
      };
      exports.mul = function mul(x, y) {
        if (x === 0 || y === 0) return 0;
        return EXP_TABLE[LOG_TABLE[x] + LOG_TABLE[y]];
      };
    }
  });

  // node_modules/qrcode/lib/core/polynomial.js
  var require_polynomial = __commonJS({
    "node_modules/qrcode/lib/core/polynomial.js"(exports) {
      var GF = require_galois_field();
      exports.mul = function mul(p1, p2) {
        const coeff = new Uint8Array(p1.length + p2.length - 1);
        for (let i = 0; i < p1.length; i++) {
          for (let j = 0; j < p2.length; j++) {
            coeff[i + j] ^= GF.mul(p1[i], p2[j]);
          }
        }
        return coeff;
      };
      exports.mod = function mod(divident, divisor) {
        let result = new Uint8Array(divident);
        while (result.length - divisor.length >= 0) {
          const coeff = result[0];
          for (let i = 0; i < divisor.length; i++) {
            result[i] ^= GF.mul(divisor[i], coeff);
          }
          let offset = 0;
          while (offset < result.length && result[offset] === 0) offset++;
          result = result.slice(offset);
        }
        return result;
      };
      exports.generateECPolynomial = function generateECPolynomial(degree) {
        let poly = new Uint8Array([1]);
        for (let i = 0; i < degree; i++) {
          poly = exports.mul(poly, new Uint8Array([1, GF.exp(i)]));
        }
        return poly;
      };
    }
  });

  // node_modules/qrcode/lib/core/reed-solomon-encoder.js
  var require_reed_solomon_encoder = __commonJS({
    "node_modules/qrcode/lib/core/reed-solomon-encoder.js"(exports, module) {
      var Polynomial = require_polynomial();
      function ReedSolomonEncoder(degree) {
        this.genPoly = void 0;
        this.degree = degree;
        if (this.degree) this.initialize(this.degree);
      }
      ReedSolomonEncoder.prototype.initialize = function initialize(degree) {
        this.degree = degree;
        this.genPoly = Polynomial.generateECPolynomial(this.degree);
      };
      ReedSolomonEncoder.prototype.encode = function encode(data) {
        if (!this.genPoly) {
          throw new Error("Encoder not initialized");
        }
        const paddedData = new Uint8Array(data.length + this.degree);
        paddedData.set(data);
        const remainder = Polynomial.mod(paddedData, this.genPoly);
        const start = this.degree - remainder.length;
        if (start > 0) {
          const buff = new Uint8Array(this.degree);
          buff.set(remainder, start);
          return buff;
        }
        return remainder;
      };
      module.exports = ReedSolomonEncoder;
    }
  });

  // node_modules/qrcode/lib/core/version-check.js
  var require_version_check = __commonJS({
    "node_modules/qrcode/lib/core/version-check.js"(exports) {
      exports.isValid = function isValid(version) {
        return !isNaN(version) && version >= 1 && version <= 40;
      };
    }
  });

  // node_modules/qrcode/lib/core/regex.js
  var require_regex = __commonJS({
    "node_modules/qrcode/lib/core/regex.js"(exports) {
      var numeric = "[0-9]+";
      var alphanumeric = "[A-Z $%*+\\-./:]+";
      var kanji = "(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+";
      kanji = kanji.replace(/u/g, "\\u");
      var byte = "(?:(?![A-Z0-9 $%*+\\-./:]|" + kanji + ")(?:.|[\r\n]))+";
      exports.KANJI = new RegExp(kanji, "g");
      exports.BYTE_KANJI = new RegExp("[^A-Z0-9 $%*+\\-./:]+", "g");
      exports.BYTE = new RegExp(byte, "g");
      exports.NUMERIC = new RegExp(numeric, "g");
      exports.ALPHANUMERIC = new RegExp(alphanumeric, "g");
      var TEST_KANJI = new RegExp("^" + kanji + "$");
      var TEST_NUMERIC = new RegExp("^" + numeric + "$");
      var TEST_ALPHANUMERIC = new RegExp("^[A-Z0-9 $%*+\\-./:]+$");
      exports.testKanji = function testKanji(str) {
        return TEST_KANJI.test(str);
      };
      exports.testNumeric = function testNumeric(str) {
        return TEST_NUMERIC.test(str);
      };
      exports.testAlphanumeric = function testAlphanumeric(str) {
        return TEST_ALPHANUMERIC.test(str);
      };
    }
  });

  // node_modules/qrcode/lib/core/mode.js
  var require_mode = __commonJS({
    "node_modules/qrcode/lib/core/mode.js"(exports) {
      var VersionCheck = require_version_check();
      var Regex = require_regex();
      exports.NUMERIC = {
        id: "Numeric",
        bit: 1 << 0,
        ccBits: [10, 12, 14]
      };
      exports.ALPHANUMERIC = {
        id: "Alphanumeric",
        bit: 1 << 1,
        ccBits: [9, 11, 13]
      };
      exports.BYTE = {
        id: "Byte",
        bit: 1 << 2,
        ccBits: [8, 16, 16]
      };
      exports.KANJI = {
        id: "Kanji",
        bit: 1 << 3,
        ccBits: [8, 10, 12]
      };
      exports.MIXED = {
        bit: -1
      };
      exports.getCharCountIndicator = function getCharCountIndicator(mode, version) {
        if (!mode.ccBits) throw new Error("Invalid mode: " + mode);
        if (!VersionCheck.isValid(version)) {
          throw new Error("Invalid version: " + version);
        }
        if (version >= 1 && version < 10) return mode.ccBits[0];
        else if (version < 27) return mode.ccBits[1];
        return mode.ccBits[2];
      };
      exports.getBestModeForData = function getBestModeForData(dataStr) {
        if (Regex.testNumeric(dataStr)) return exports.NUMERIC;
        else if (Regex.testAlphanumeric(dataStr)) return exports.ALPHANUMERIC;
        else if (Regex.testKanji(dataStr)) return exports.KANJI;
        else return exports.BYTE;
      };
      exports.toString = function toString(mode) {
        if (mode && mode.id) return mode.id;
        throw new Error("Invalid mode");
      };
      exports.isValid = function isValid(mode) {
        return mode && mode.bit && mode.ccBits;
      };
      function fromString(string) {
        if (typeof string !== "string") {
          throw new Error("Param is not a string");
        }
        const lcStr = string.toLowerCase();
        switch (lcStr) {
          case "numeric":
            return exports.NUMERIC;
          case "alphanumeric":
            return exports.ALPHANUMERIC;
          case "kanji":
            return exports.KANJI;
          case "byte":
            return exports.BYTE;
          default:
            throw new Error("Unknown mode: " + string);
        }
      }
      exports.from = function from(value, defaultValue) {
        if (exports.isValid(value)) {
          return value;
        }
        try {
          return fromString(value);
        } catch (e) {
          return defaultValue;
        }
      };
    }
  });

  // node_modules/qrcode/lib/core/version.js
  var require_version = __commonJS({
    "node_modules/qrcode/lib/core/version.js"(exports) {
      var Utils = require_utils();
      var ECCode = require_error_correction_code();
      var ECLevel = require_error_correction_level();
      var Mode = require_mode();
      var VersionCheck = require_version_check();
      var G18 = 1 << 12 | 1 << 11 | 1 << 10 | 1 << 9 | 1 << 8 | 1 << 5 | 1 << 2 | 1 << 0;
      var G18_BCH = Utils.getBCHDigit(G18);
      function getBestVersionForDataLength(mode, length, errorCorrectionLevel) {
        for (let currentVersion = 1; currentVersion <= 40; currentVersion++) {
          if (length <= exports.getCapacity(currentVersion, errorCorrectionLevel, mode)) {
            return currentVersion;
          }
        }
        return void 0;
      }
      function getReservedBitsCount(mode, version) {
        return Mode.getCharCountIndicator(mode, version) + 4;
      }
      function getTotalBitsFromDataArray(segments, version) {
        let totalBits = 0;
        segments.forEach(function(data) {
          const reservedBits = getReservedBitsCount(data.mode, version);
          totalBits += reservedBits + data.getBitsLength();
        });
        return totalBits;
      }
      function getBestVersionForMixedData(segments, errorCorrectionLevel) {
        for (let currentVersion = 1; currentVersion <= 40; currentVersion++) {
          const length = getTotalBitsFromDataArray(segments, currentVersion);
          if (length <= exports.getCapacity(currentVersion, errorCorrectionLevel, Mode.MIXED)) {
            return currentVersion;
          }
        }
        return void 0;
      }
      exports.from = function from(value, defaultValue) {
        if (VersionCheck.isValid(value)) {
          return parseInt(value, 10);
        }
        return defaultValue;
      };
      exports.getCapacity = function getCapacity(version, errorCorrectionLevel, mode) {
        if (!VersionCheck.isValid(version)) {
          throw new Error("Invalid QR Code version");
        }
        if (typeof mode === "undefined") mode = Mode.BYTE;
        const totalCodewords = Utils.getSymbolTotalCodewords(version);
        const ecTotalCodewords = ECCode.getTotalCodewordsCount(version, errorCorrectionLevel);
        const dataTotalCodewordsBits = (totalCodewords - ecTotalCodewords) * 8;
        if (mode === Mode.MIXED) return dataTotalCodewordsBits;
        const usableBits = dataTotalCodewordsBits - getReservedBitsCount(mode, version);
        switch (mode) {
          case Mode.NUMERIC:
            return Math.floor(usableBits / 10 * 3);
          case Mode.ALPHANUMERIC:
            return Math.floor(usableBits / 11 * 2);
          case Mode.KANJI:
            return Math.floor(usableBits / 13);
          case Mode.BYTE:
          default:
            return Math.floor(usableBits / 8);
        }
      };
      exports.getBestVersionForData = function getBestVersionForData(data, errorCorrectionLevel) {
        let seg;
        const ecl = ECLevel.from(errorCorrectionLevel, ECLevel.M);
        if (Array.isArray(data)) {
          if (data.length > 1) {
            return getBestVersionForMixedData(data, ecl);
          }
          if (data.length === 0) {
            return 1;
          }
          seg = data[0];
        } else {
          seg = data;
        }
        return getBestVersionForDataLength(seg.mode, seg.getLength(), ecl);
      };
      exports.getEncodedBits = function getEncodedBits(version) {
        if (!VersionCheck.isValid(version) || version < 7) {
          throw new Error("Invalid QR Code version");
        }
        let d = version << 12;
        while (Utils.getBCHDigit(d) - G18_BCH >= 0) {
          d ^= G18 << Utils.getBCHDigit(d) - G18_BCH;
        }
        return version << 12 | d;
      };
    }
  });

  // node_modules/qrcode/lib/core/format-info.js
  var require_format_info = __commonJS({
    "node_modules/qrcode/lib/core/format-info.js"(exports) {
      var Utils = require_utils();
      var G15 = 1 << 10 | 1 << 8 | 1 << 5 | 1 << 4 | 1 << 2 | 1 << 1 | 1 << 0;
      var G15_MASK = 1 << 14 | 1 << 12 | 1 << 10 | 1 << 4 | 1 << 1;
      var G15_BCH = Utils.getBCHDigit(G15);
      exports.getEncodedBits = function getEncodedBits(errorCorrectionLevel, mask) {
        const data = errorCorrectionLevel.bit << 3 | mask;
        let d = data << 10;
        while (Utils.getBCHDigit(d) - G15_BCH >= 0) {
          d ^= G15 << Utils.getBCHDigit(d) - G15_BCH;
        }
        return (data << 10 | d) ^ G15_MASK;
      };
    }
  });

  // node_modules/qrcode/lib/core/numeric-data.js
  var require_numeric_data = __commonJS({
    "node_modules/qrcode/lib/core/numeric-data.js"(exports, module) {
      var Mode = require_mode();
      function NumericData(data) {
        this.mode = Mode.NUMERIC;
        this.data = data.toString();
      }
      NumericData.getBitsLength = function getBitsLength(length) {
        return 10 * Math.floor(length / 3) + (length % 3 ? length % 3 * 3 + 1 : 0);
      };
      NumericData.prototype.getLength = function getLength() {
        return this.data.length;
      };
      NumericData.prototype.getBitsLength = function getBitsLength() {
        return NumericData.getBitsLength(this.data.length);
      };
      NumericData.prototype.write = function write(bitBuffer) {
        let i, group, value;
        for (i = 0; i + 3 <= this.data.length; i += 3) {
          group = this.data.substr(i, 3);
          value = parseInt(group, 10);
          bitBuffer.put(value, 10);
        }
        const remainingNum = this.data.length - i;
        if (remainingNum > 0) {
          group = this.data.substr(i);
          value = parseInt(group, 10);
          bitBuffer.put(value, remainingNum * 3 + 1);
        }
      };
      module.exports = NumericData;
    }
  });

  // node_modules/qrcode/lib/core/alphanumeric-data.js
  var require_alphanumeric_data = __commonJS({
    "node_modules/qrcode/lib/core/alphanumeric-data.js"(exports, module) {
      var Mode = require_mode();
      var ALPHA_NUM_CHARS = [
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z",
        " ",
        "$",
        "%",
        "*",
        "+",
        "-",
        ".",
        "/",
        ":"
      ];
      function AlphanumericData(data) {
        this.mode = Mode.ALPHANUMERIC;
        this.data = data;
      }
      AlphanumericData.getBitsLength = function getBitsLength(length) {
        return 11 * Math.floor(length / 2) + 6 * (length % 2);
      };
      AlphanumericData.prototype.getLength = function getLength() {
        return this.data.length;
      };
      AlphanumericData.prototype.getBitsLength = function getBitsLength() {
        return AlphanumericData.getBitsLength(this.data.length);
      };
      AlphanumericData.prototype.write = function write(bitBuffer) {
        let i;
        for (i = 0; i + 2 <= this.data.length; i += 2) {
          let value = ALPHA_NUM_CHARS.indexOf(this.data[i]) * 45;
          value += ALPHA_NUM_CHARS.indexOf(this.data[i + 1]);
          bitBuffer.put(value, 11);
        }
        if (this.data.length % 2) {
          bitBuffer.put(ALPHA_NUM_CHARS.indexOf(this.data[i]), 6);
        }
      };
      module.exports = AlphanumericData;
    }
  });

  // node_modules/qrcode/lib/core/byte-data.js
  var require_byte_data = __commonJS({
    "node_modules/qrcode/lib/core/byte-data.js"(exports, module) {
      var Mode = require_mode();
      function ByteData(data) {
        this.mode = Mode.BYTE;
        if (typeof data === "string") {
          this.data = new TextEncoder().encode(data);
        } else {
          this.data = new Uint8Array(data);
        }
      }
      ByteData.getBitsLength = function getBitsLength(length) {
        return length * 8;
      };
      ByteData.prototype.getLength = function getLength() {
        return this.data.length;
      };
      ByteData.prototype.getBitsLength = function getBitsLength() {
        return ByteData.getBitsLength(this.data.length);
      };
      ByteData.prototype.write = function(bitBuffer) {
        for (let i = 0, l = this.data.length; i < l; i++) {
          bitBuffer.put(this.data[i], 8);
        }
      };
      module.exports = ByteData;
    }
  });

  // node_modules/qrcode/lib/core/kanji-data.js
  var require_kanji_data = __commonJS({
    "node_modules/qrcode/lib/core/kanji-data.js"(exports, module) {
      var Mode = require_mode();
      var Utils = require_utils();
      function KanjiData(data) {
        this.mode = Mode.KANJI;
        this.data = data;
      }
      KanjiData.getBitsLength = function getBitsLength(length) {
        return length * 13;
      };
      KanjiData.prototype.getLength = function getLength() {
        return this.data.length;
      };
      KanjiData.prototype.getBitsLength = function getBitsLength() {
        return KanjiData.getBitsLength(this.data.length);
      };
      KanjiData.prototype.write = function(bitBuffer) {
        let i;
        for (i = 0; i < this.data.length; i++) {
          let value = Utils.toSJIS(this.data[i]);
          if (value >= 33088 && value <= 40956) {
            value -= 33088;
          } else if (value >= 57408 && value <= 60351) {
            value -= 49472;
          } else {
            throw new Error(
              "Invalid SJIS character: " + this.data[i] + "\nMake sure your charset is UTF-8"
            );
          }
          value = (value >>> 8 & 255) * 192 + (value & 255);
          bitBuffer.put(value, 13);
        }
      };
      module.exports = KanjiData;
    }
  });

  // node_modules/dijkstrajs/dijkstra.js
  var require_dijkstra = __commonJS({
    "node_modules/dijkstrajs/dijkstra.js"(exports, module) {
      "use strict";
      var dijkstra = {
        single_source_shortest_paths: function(graph, s, d) {
          var predecessors = {};
          var costs = {};
          costs[s] = 0;
          var open = dijkstra.PriorityQueue.make();
          open.push(s, 0);
          var closest, u, v, cost_of_s_to_u, adjacent_nodes, cost_of_e, cost_of_s_to_u_plus_cost_of_e, cost_of_s_to_v, first_visit;
          while (!open.empty()) {
            closest = open.pop();
            u = closest.value;
            cost_of_s_to_u = closest.cost;
            adjacent_nodes = graph[u] || {};
            for (v in adjacent_nodes) {
              if (adjacent_nodes.hasOwnProperty(v)) {
                cost_of_e = adjacent_nodes[v];
                cost_of_s_to_u_plus_cost_of_e = cost_of_s_to_u + cost_of_e;
                cost_of_s_to_v = costs[v];
                first_visit = typeof costs[v] === "undefined";
                if (first_visit || cost_of_s_to_v > cost_of_s_to_u_plus_cost_of_e) {
                  costs[v] = cost_of_s_to_u_plus_cost_of_e;
                  open.push(v, cost_of_s_to_u_plus_cost_of_e);
                  predecessors[v] = u;
                }
              }
            }
          }
          if (typeof d !== "undefined" && typeof costs[d] === "undefined") {
            var msg = ["Could not find a path from ", s, " to ", d, "."].join("");
            throw new Error(msg);
          }
          return predecessors;
        },
        extract_shortest_path_from_predecessor_list: function(predecessors, d) {
          var nodes = [];
          var u = d;
          var predecessor;
          while (u) {
            nodes.push(u);
            predecessor = predecessors[u];
            u = predecessors[u];
          }
          nodes.reverse();
          return nodes;
        },
        find_path: function(graph, s, d) {
          var predecessors = dijkstra.single_source_shortest_paths(graph, s, d);
          return dijkstra.extract_shortest_path_from_predecessor_list(
            predecessors,
            d
          );
        },
        /**
         * A very naive priority queue implementation.
         */
        PriorityQueue: {
          make: function(opts) {
            var T = dijkstra.PriorityQueue, t = {}, key;
            opts = opts || {};
            for (key in T) {
              if (T.hasOwnProperty(key)) {
                t[key] = T[key];
              }
            }
            t.queue = [];
            t.sorter = opts.sorter || T.default_sorter;
            return t;
          },
          default_sorter: function(a, b) {
            return a.cost - b.cost;
          },
          /**
           * Add a new item to the queue and ensure the highest priority element
           * is at the front of the queue.
           */
          push: function(value, cost) {
            var item = { value, cost };
            this.queue.push(item);
            this.queue.sort(this.sorter);
          },
          /**
           * Return the highest priority element in the queue.
           */
          pop: function() {
            return this.queue.shift();
          },
          empty: function() {
            return this.queue.length === 0;
          }
        }
      };
      if (typeof module !== "undefined") {
        module.exports = dijkstra;
      }
    }
  });

  // node_modules/qrcode/lib/core/segments.js
  var require_segments = __commonJS({
    "node_modules/qrcode/lib/core/segments.js"(exports) {
      var Mode = require_mode();
      var NumericData = require_numeric_data();
      var AlphanumericData = require_alphanumeric_data();
      var ByteData = require_byte_data();
      var KanjiData = require_kanji_data();
      var Regex = require_regex();
      var Utils = require_utils();
      var dijkstra = require_dijkstra();
      function getStringByteLength(str) {
        return unescape(encodeURIComponent(str)).length;
      }
      function getSegments(regex, mode, str) {
        const segments = [];
        let result;
        while ((result = regex.exec(str)) !== null) {
          segments.push({
            data: result[0],
            index: result.index,
            mode,
            length: result[0].length
          });
        }
        return segments;
      }
      function getSegmentsFromString(dataStr) {
        const numSegs = getSegments(Regex.NUMERIC, Mode.NUMERIC, dataStr);
        const alphaNumSegs = getSegments(Regex.ALPHANUMERIC, Mode.ALPHANUMERIC, dataStr);
        let byteSegs;
        let kanjiSegs;
        if (Utils.isKanjiModeEnabled()) {
          byteSegs = getSegments(Regex.BYTE, Mode.BYTE, dataStr);
          kanjiSegs = getSegments(Regex.KANJI, Mode.KANJI, dataStr);
        } else {
          byteSegs = getSegments(Regex.BYTE_KANJI, Mode.BYTE, dataStr);
          kanjiSegs = [];
        }
        const segs = numSegs.concat(alphaNumSegs, byteSegs, kanjiSegs);
        return segs.sort(function(s1, s2) {
          return s1.index - s2.index;
        }).map(function(obj) {
          return {
            data: obj.data,
            mode: obj.mode,
            length: obj.length
          };
        });
      }
      function getSegmentBitsLength(length, mode) {
        switch (mode) {
          case Mode.NUMERIC:
            return NumericData.getBitsLength(length);
          case Mode.ALPHANUMERIC:
            return AlphanumericData.getBitsLength(length);
          case Mode.KANJI:
            return KanjiData.getBitsLength(length);
          case Mode.BYTE:
            return ByteData.getBitsLength(length);
        }
      }
      function mergeSegments(segs) {
        return segs.reduce(function(acc, curr) {
          const prevSeg = acc.length - 1 >= 0 ? acc[acc.length - 1] : null;
          if (prevSeg && prevSeg.mode === curr.mode) {
            acc[acc.length - 1].data += curr.data;
            return acc;
          }
          acc.push(curr);
          return acc;
        }, []);
      }
      function buildNodes(segs) {
        const nodes = [];
        for (let i = 0; i < segs.length; i++) {
          const seg = segs[i];
          switch (seg.mode) {
            case Mode.NUMERIC:
              nodes.push([
                seg,
                { data: seg.data, mode: Mode.ALPHANUMERIC, length: seg.length },
                { data: seg.data, mode: Mode.BYTE, length: seg.length }
              ]);
              break;
            case Mode.ALPHANUMERIC:
              nodes.push([
                seg,
                { data: seg.data, mode: Mode.BYTE, length: seg.length }
              ]);
              break;
            case Mode.KANJI:
              nodes.push([
                seg,
                { data: seg.data, mode: Mode.BYTE, length: getStringByteLength(seg.data) }
              ]);
              break;
            case Mode.BYTE:
              nodes.push([
                { data: seg.data, mode: Mode.BYTE, length: getStringByteLength(seg.data) }
              ]);
          }
        }
        return nodes;
      }
      function buildGraph(nodes, version) {
        const table = {};
        const graph = { start: {} };
        let prevNodeIds = ["start"];
        for (let i = 0; i < nodes.length; i++) {
          const nodeGroup = nodes[i];
          const currentNodeIds = [];
          for (let j = 0; j < nodeGroup.length; j++) {
            const node = nodeGroup[j];
            const key = "" + i + j;
            currentNodeIds.push(key);
            table[key] = { node, lastCount: 0 };
            graph[key] = {};
            for (let n = 0; n < prevNodeIds.length; n++) {
              const prevNodeId = prevNodeIds[n];
              if (table[prevNodeId] && table[prevNodeId].node.mode === node.mode) {
                graph[prevNodeId][key] = getSegmentBitsLength(table[prevNodeId].lastCount + node.length, node.mode) - getSegmentBitsLength(table[prevNodeId].lastCount, node.mode);
                table[prevNodeId].lastCount += node.length;
              } else {
                if (table[prevNodeId]) table[prevNodeId].lastCount = node.length;
                graph[prevNodeId][key] = getSegmentBitsLength(node.length, node.mode) + 4 + Mode.getCharCountIndicator(node.mode, version);
              }
            }
          }
          prevNodeIds = currentNodeIds;
        }
        for (let n = 0; n < prevNodeIds.length; n++) {
          graph[prevNodeIds[n]].end = 0;
        }
        return { map: graph, table };
      }
      function buildSingleSegment(data, modesHint) {
        let mode;
        const bestMode = Mode.getBestModeForData(data);
        mode = Mode.from(modesHint, bestMode);
        if (mode !== Mode.BYTE && mode.bit < bestMode.bit) {
          throw new Error('"' + data + '" cannot be encoded with mode ' + Mode.toString(mode) + ".\n Suggested mode is: " + Mode.toString(bestMode));
        }
        if (mode === Mode.KANJI && !Utils.isKanjiModeEnabled()) {
          mode = Mode.BYTE;
        }
        switch (mode) {
          case Mode.NUMERIC:
            return new NumericData(data);
          case Mode.ALPHANUMERIC:
            return new AlphanumericData(data);
          case Mode.KANJI:
            return new KanjiData(data);
          case Mode.BYTE:
            return new ByteData(data);
        }
      }
      exports.fromArray = function fromArray(array) {
        return array.reduce(function(acc, seg) {
          if (typeof seg === "string") {
            acc.push(buildSingleSegment(seg, null));
          } else if (seg.data) {
            acc.push(buildSingleSegment(seg.data, seg.mode));
          }
          return acc;
        }, []);
      };
      exports.fromString = function fromString(data, version) {
        const segs = getSegmentsFromString(data, Utils.isKanjiModeEnabled());
        const nodes = buildNodes(segs);
        const graph = buildGraph(nodes, version);
        const path = dijkstra.find_path(graph.map, "start", "end");
        const optimizedSegs = [];
        for (let i = 1; i < path.length - 1; i++) {
          optimizedSegs.push(graph.table[path[i]].node);
        }
        return exports.fromArray(mergeSegments(optimizedSegs));
      };
      exports.rawSplit = function rawSplit(data) {
        return exports.fromArray(
          getSegmentsFromString(data, Utils.isKanjiModeEnabled())
        );
      };
    }
  });

  // node_modules/qrcode/lib/core/qrcode.js
  var require_qrcode = __commonJS({
    "node_modules/qrcode/lib/core/qrcode.js"(exports) {
      var Utils = require_utils();
      var ECLevel = require_error_correction_level();
      var BitBuffer = require_bit_buffer();
      var BitMatrix = require_bit_matrix();
      var AlignmentPattern = require_alignment_pattern();
      var FinderPattern = require_finder_pattern();
      var MaskPattern = require_mask_pattern();
      var ECCode = require_error_correction_code();
      var ReedSolomonEncoder = require_reed_solomon_encoder();
      var Version = require_version();
      var FormatInfo = require_format_info();
      var Mode = require_mode();
      var Segments = require_segments();
      function setupFinderPattern(matrix, version) {
        const size = matrix.size;
        const pos = FinderPattern.getPositions(version);
        for (let i = 0; i < pos.length; i++) {
          const row = pos[i][0];
          const col = pos[i][1];
          for (let r = -1; r <= 7; r++) {
            if (row + r <= -1 || size <= row + r) continue;
            for (let c = -1; c <= 7; c++) {
              if (col + c <= -1 || size <= col + c) continue;
              if (r >= 0 && r <= 6 && (c === 0 || c === 6) || c >= 0 && c <= 6 && (r === 0 || r === 6) || r >= 2 && r <= 4 && c >= 2 && c <= 4) {
                matrix.set(row + r, col + c, true, true);
              } else {
                matrix.set(row + r, col + c, false, true);
              }
            }
          }
        }
      }
      function setupTimingPattern(matrix) {
        const size = matrix.size;
        for (let r = 8; r < size - 8; r++) {
          const value = r % 2 === 0;
          matrix.set(r, 6, value, true);
          matrix.set(6, r, value, true);
        }
      }
      function setupAlignmentPattern(matrix, version) {
        const pos = AlignmentPattern.getPositions(version);
        for (let i = 0; i < pos.length; i++) {
          const row = pos[i][0];
          const col = pos[i][1];
          for (let r = -2; r <= 2; r++) {
            for (let c = -2; c <= 2; c++) {
              if (r === -2 || r === 2 || c === -2 || c === 2 || r === 0 && c === 0) {
                matrix.set(row + r, col + c, true, true);
              } else {
                matrix.set(row + r, col + c, false, true);
              }
            }
          }
        }
      }
      function setupVersionInfo(matrix, version) {
        const size = matrix.size;
        const bits = Version.getEncodedBits(version);
        let row, col, mod;
        for (let i = 0; i < 18; i++) {
          row = Math.floor(i / 3);
          col = i % 3 + size - 8 - 3;
          mod = (bits >> i & 1) === 1;
          matrix.set(row, col, mod, true);
          matrix.set(col, row, mod, true);
        }
      }
      function setupFormatInfo(matrix, errorCorrectionLevel, maskPattern) {
        const size = matrix.size;
        const bits = FormatInfo.getEncodedBits(errorCorrectionLevel, maskPattern);
        let i, mod;
        for (i = 0; i < 15; i++) {
          mod = (bits >> i & 1) === 1;
          if (i < 6) {
            matrix.set(i, 8, mod, true);
          } else if (i < 8) {
            matrix.set(i + 1, 8, mod, true);
          } else {
            matrix.set(size - 15 + i, 8, mod, true);
          }
          if (i < 8) {
            matrix.set(8, size - i - 1, mod, true);
          } else if (i < 9) {
            matrix.set(8, 15 - i - 1 + 1, mod, true);
          } else {
            matrix.set(8, 15 - i - 1, mod, true);
          }
        }
        matrix.set(size - 8, 8, 1, true);
      }
      function setupData(matrix, data) {
        const size = matrix.size;
        let inc = -1;
        let row = size - 1;
        let bitIndex = 7;
        let byteIndex = 0;
        for (let col = size - 1; col > 0; col -= 2) {
          if (col === 6) col--;
          while (true) {
            for (let c = 0; c < 2; c++) {
              if (!matrix.isReserved(row, col - c)) {
                let dark = false;
                if (byteIndex < data.length) {
                  dark = (data[byteIndex] >>> bitIndex & 1) === 1;
                }
                matrix.set(row, col - c, dark);
                bitIndex--;
                if (bitIndex === -1) {
                  byteIndex++;
                  bitIndex = 7;
                }
              }
            }
            row += inc;
            if (row < 0 || size <= row) {
              row -= inc;
              inc = -inc;
              break;
            }
          }
        }
      }
      function createData(version, errorCorrectionLevel, segments) {
        const buffer = new BitBuffer();
        segments.forEach(function(data) {
          buffer.put(data.mode.bit, 4);
          buffer.put(data.getLength(), Mode.getCharCountIndicator(data.mode, version));
          data.write(buffer);
        });
        const totalCodewords = Utils.getSymbolTotalCodewords(version);
        const ecTotalCodewords = ECCode.getTotalCodewordsCount(version, errorCorrectionLevel);
        const dataTotalCodewordsBits = (totalCodewords - ecTotalCodewords) * 8;
        if (buffer.getLengthInBits() + 4 <= dataTotalCodewordsBits) {
          buffer.put(0, 4);
        }
        while (buffer.getLengthInBits() % 8 !== 0) {
          buffer.putBit(0);
        }
        const remainingByte = (dataTotalCodewordsBits - buffer.getLengthInBits()) / 8;
        for (let i = 0; i < remainingByte; i++) {
          buffer.put(i % 2 ? 17 : 236, 8);
        }
        return createCodewords(buffer, version, errorCorrectionLevel);
      }
      function createCodewords(bitBuffer, version, errorCorrectionLevel) {
        const totalCodewords = Utils.getSymbolTotalCodewords(version);
        const ecTotalCodewords = ECCode.getTotalCodewordsCount(version, errorCorrectionLevel);
        const dataTotalCodewords = totalCodewords - ecTotalCodewords;
        const ecTotalBlocks = ECCode.getBlocksCount(version, errorCorrectionLevel);
        const blocksInGroup2 = totalCodewords % ecTotalBlocks;
        const blocksInGroup1 = ecTotalBlocks - blocksInGroup2;
        const totalCodewordsInGroup1 = Math.floor(totalCodewords / ecTotalBlocks);
        const dataCodewordsInGroup1 = Math.floor(dataTotalCodewords / ecTotalBlocks);
        const dataCodewordsInGroup2 = dataCodewordsInGroup1 + 1;
        const ecCount = totalCodewordsInGroup1 - dataCodewordsInGroup1;
        const rs = new ReedSolomonEncoder(ecCount);
        let offset = 0;
        const dcData = new Array(ecTotalBlocks);
        const ecData = new Array(ecTotalBlocks);
        let maxDataSize = 0;
        const buffer = new Uint8Array(bitBuffer.buffer);
        for (let b = 0; b < ecTotalBlocks; b++) {
          const dataSize = b < blocksInGroup1 ? dataCodewordsInGroup1 : dataCodewordsInGroup2;
          dcData[b] = buffer.slice(offset, offset + dataSize);
          ecData[b] = rs.encode(dcData[b]);
          offset += dataSize;
          maxDataSize = Math.max(maxDataSize, dataSize);
        }
        const data = new Uint8Array(totalCodewords);
        let index = 0;
        let i, r;
        for (i = 0; i < maxDataSize; i++) {
          for (r = 0; r < ecTotalBlocks; r++) {
            if (i < dcData[r].length) {
              data[index++] = dcData[r][i];
            }
          }
        }
        for (i = 0; i < ecCount; i++) {
          for (r = 0; r < ecTotalBlocks; r++) {
            data[index++] = ecData[r][i];
          }
        }
        return data;
      }
      function createSymbol(data, version, errorCorrectionLevel, maskPattern) {
        let segments;
        if (Array.isArray(data)) {
          segments = Segments.fromArray(data);
        } else if (typeof data === "string") {
          let estimatedVersion = version;
          if (!estimatedVersion) {
            const rawSegments = Segments.rawSplit(data);
            estimatedVersion = Version.getBestVersionForData(rawSegments, errorCorrectionLevel);
          }
          segments = Segments.fromString(data, estimatedVersion || 40);
        } else {
          throw new Error("Invalid data");
        }
        const bestVersion = Version.getBestVersionForData(segments, errorCorrectionLevel);
        if (!bestVersion) {
          throw new Error("The amount of data is too big to be stored in a QR Code");
        }
        if (!version) {
          version = bestVersion;
        } else if (version < bestVersion) {
          throw new Error(
            "\nThe chosen QR Code version cannot contain this amount of data.\nMinimum version required to store current data is: " + bestVersion + ".\n"
          );
        }
        const dataBits = createData(version, errorCorrectionLevel, segments);
        const moduleCount = Utils.getSymbolSize(version);
        const modules = new BitMatrix(moduleCount);
        setupFinderPattern(modules, version);
        setupTimingPattern(modules);
        setupAlignmentPattern(modules, version);
        setupFormatInfo(modules, errorCorrectionLevel, 0);
        if (version >= 7) {
          setupVersionInfo(modules, version);
        }
        setupData(modules, dataBits);
        if (isNaN(maskPattern)) {
          maskPattern = MaskPattern.getBestMask(
            modules,
            setupFormatInfo.bind(null, modules, errorCorrectionLevel)
          );
        }
        MaskPattern.applyMask(maskPattern, modules);
        setupFormatInfo(modules, errorCorrectionLevel, maskPattern);
        return {
          modules,
          version,
          errorCorrectionLevel,
          maskPattern,
          segments
        };
      }
      exports.create = function create(data, options) {
        if (typeof data === "undefined" || data === "") {
          throw new Error("No input text");
        }
        let errorCorrectionLevel = ECLevel.M;
        let version;
        let mask;
        if (typeof options !== "undefined") {
          errorCorrectionLevel = ECLevel.from(options.errorCorrectionLevel, ECLevel.M);
          version = Version.from(options.version);
          mask = MaskPattern.from(options.maskPattern);
          if (options.toSJISFunc) {
            Utils.setToSJISFunction(options.toSJISFunc);
          }
        }
        return createSymbol(data, version, errorCorrectionLevel, mask);
      };
    }
  });

  // node_modules/qrcode/lib/renderer/utils.js
  var require_utils2 = __commonJS({
    "node_modules/qrcode/lib/renderer/utils.js"(exports) {
      function hex2rgba(hex) {
        if (typeof hex === "number") {
          hex = hex.toString();
        }
        if (typeof hex !== "string") {
          throw new Error("Color should be defined as hex string");
        }
        let hexCode = hex.slice().replace("#", "").split("");
        if (hexCode.length < 3 || hexCode.length === 5 || hexCode.length > 8) {
          throw new Error("Invalid hex color: " + hex);
        }
        if (hexCode.length === 3 || hexCode.length === 4) {
          hexCode = Array.prototype.concat.apply([], hexCode.map(function(c) {
            return [c, c];
          }));
        }
        if (hexCode.length === 6) hexCode.push("F", "F");
        const hexValue = parseInt(hexCode.join(""), 16);
        return {
          r: hexValue >> 24 & 255,
          g: hexValue >> 16 & 255,
          b: hexValue >> 8 & 255,
          a: hexValue & 255,
          hex: "#" + hexCode.slice(0, 6).join("")
        };
      }
      exports.getOptions = function getOptions(options) {
        if (!options) options = {};
        if (!options.color) options.color = {};
        const margin = typeof options.margin === "undefined" || options.margin === null || options.margin < 0 ? 4 : options.margin;
        const width = options.width && options.width >= 21 ? options.width : void 0;
        const scale = options.scale || 4;
        return {
          width,
          scale: width ? 4 : scale,
          margin,
          color: {
            dark: hex2rgba(options.color.dark || "#000000ff"),
            light: hex2rgba(options.color.light || "#ffffffff")
          },
          type: options.type,
          rendererOpts: options.rendererOpts || {}
        };
      };
      exports.getScale = function getScale(qrSize, opts) {
        return opts.width && opts.width >= qrSize + opts.margin * 2 ? opts.width / (qrSize + opts.margin * 2) : opts.scale;
      };
      exports.getImageWidth = function getImageWidth(qrSize, opts) {
        const scale = exports.getScale(qrSize, opts);
        return Math.floor((qrSize + opts.margin * 2) * scale);
      };
      exports.qrToImageData = function qrToImageData(imgData, qr, opts) {
        const size = qr.modules.size;
        const data = qr.modules.data;
        const scale = exports.getScale(size, opts);
        const symbolSize = Math.floor((size + opts.margin * 2) * scale);
        const scaledMargin = opts.margin * scale;
        const palette = [opts.color.light, opts.color.dark];
        for (let i = 0; i < symbolSize; i++) {
          for (let j = 0; j < symbolSize; j++) {
            let posDst = (i * symbolSize + j) * 4;
            let pxColor = opts.color.light;
            if (i >= scaledMargin && j >= scaledMargin && i < symbolSize - scaledMargin && j < symbolSize - scaledMargin) {
              const iSrc = Math.floor((i - scaledMargin) / scale);
              const jSrc = Math.floor((j - scaledMargin) / scale);
              pxColor = palette[data[iSrc * size + jSrc] ? 1 : 0];
            }
            imgData[posDst++] = pxColor.r;
            imgData[posDst++] = pxColor.g;
            imgData[posDst++] = pxColor.b;
            imgData[posDst] = pxColor.a;
          }
        }
      };
    }
  });

  // node_modules/qrcode/lib/renderer/canvas.js
  var require_canvas = __commonJS({
    "node_modules/qrcode/lib/renderer/canvas.js"(exports) {
      var Utils = require_utils2();
      function clearCanvas(ctx, canvas, size) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (!canvas.style) canvas.style = {};
        canvas.height = size;
        canvas.width = size;
        canvas.style.height = size + "px";
        canvas.style.width = size + "px";
      }
      function getCanvasElement() {
        try {
          return document.createElement("canvas");
        } catch (e) {
          throw new Error("You need to specify a canvas element");
        }
      }
      exports.render = function render(qrData, canvas, options) {
        let opts = options;
        let canvasEl = canvas;
        if (typeof opts === "undefined" && (!canvas || !canvas.getContext)) {
          opts = canvas;
          canvas = void 0;
        }
        if (!canvas) {
          canvasEl = getCanvasElement();
        }
        opts = Utils.getOptions(opts);
        const size = Utils.getImageWidth(qrData.modules.size, opts);
        const ctx = canvasEl.getContext("2d");
        const image = ctx.createImageData(size, size);
        Utils.qrToImageData(image.data, qrData, opts);
        clearCanvas(ctx, canvasEl, size);
        ctx.putImageData(image, 0, 0);
        return canvasEl;
      };
      exports.renderToDataURL = function renderToDataURL(qrData, canvas, options) {
        let opts = options;
        if (typeof opts === "undefined" && (!canvas || !canvas.getContext)) {
          opts = canvas;
          canvas = void 0;
        }
        if (!opts) opts = {};
        const canvasEl = exports.render(qrData, canvas, opts);
        const type = opts.type || "image/png";
        const rendererOpts = opts.rendererOpts || {};
        return canvasEl.toDataURL(type, rendererOpts.quality);
      };
    }
  });

  // node_modules/qrcode/lib/renderer/svg-tag.js
  var require_svg_tag = __commonJS({
    "node_modules/qrcode/lib/renderer/svg-tag.js"(exports) {
      var Utils = require_utils2();
      function getColorAttrib(color, attrib) {
        const alpha = color.a / 255;
        const str = attrib + '="' + color.hex + '"';
        return alpha < 1 ? str + " " + attrib + '-opacity="' + alpha.toFixed(2).slice(1) + '"' : str;
      }
      function svgCmd(cmd, x, y) {
        let str = cmd + x;
        if (typeof y !== "undefined") str += " " + y;
        return str;
      }
      function qrToPath(data, size, margin) {
        let path = "";
        let moveBy = 0;
        let newRow = false;
        let lineLength = 0;
        for (let i = 0; i < data.length; i++) {
          const col = Math.floor(i % size);
          const row = Math.floor(i / size);
          if (!col && !newRow) newRow = true;
          if (data[i]) {
            lineLength++;
            if (!(i > 0 && col > 0 && data[i - 1])) {
              path += newRow ? svgCmd("M", col + margin, 0.5 + row + margin) : svgCmd("m", moveBy, 0);
              moveBy = 0;
              newRow = false;
            }
            if (!(col + 1 < size && data[i + 1])) {
              path += svgCmd("h", lineLength);
              lineLength = 0;
            }
          } else {
            moveBy++;
          }
        }
        return path;
      }
      exports.render = function render(qrData, options, cb) {
        const opts = Utils.getOptions(options);
        const size = qrData.modules.size;
        const data = qrData.modules.data;
        const qrcodesize = size + opts.margin * 2;
        const bg = !opts.color.light.a ? "" : "<path " + getColorAttrib(opts.color.light, "fill") + ' d="M0 0h' + qrcodesize + "v" + qrcodesize + 'H0z"/>';
        const path = "<path " + getColorAttrib(opts.color.dark, "stroke") + ' d="' + qrToPath(data, size, opts.margin) + '"/>';
        const viewBox = 'viewBox="0 0 ' + qrcodesize + " " + qrcodesize + '"';
        const width = !opts.width ? "" : 'width="' + opts.width + '" height="' + opts.width + '" ';
        const svgTag = '<svg xmlns="http://www.w3.org/2000/svg" ' + width + viewBox + ' shape-rendering="crispEdges">' + bg + path + "</svg>\n";
        if (typeof cb === "function") {
          cb(null, svgTag);
        }
        return svgTag;
      };
    }
  });

  // node_modules/qrcode/lib/browser.js
  var require_browser = __commonJS({
    "node_modules/qrcode/lib/browser.js"(exports) {
      var canPromise = require_can_promise();
      var QRCode = require_qrcode();
      var CanvasRenderer = require_canvas();
      var SvgRenderer = require_svg_tag();
      function renderCanvas(renderFunc, canvas, text, opts, cb) {
        const args = [].slice.call(arguments, 1);
        const argsNum = args.length;
        const isLastArgCb = typeof args[argsNum - 1] === "function";
        if (!isLastArgCb && !canPromise()) {
          throw new Error("Callback required as last argument");
        }
        if (isLastArgCb) {
          if (argsNum < 2) {
            throw new Error("Too few arguments provided");
          }
          if (argsNum === 2) {
            cb = text;
            text = canvas;
            canvas = opts = void 0;
          } else if (argsNum === 3) {
            if (canvas.getContext && typeof cb === "undefined") {
              cb = opts;
              opts = void 0;
            } else {
              cb = opts;
              opts = text;
              text = canvas;
              canvas = void 0;
            }
          }
        } else {
          if (argsNum < 1) {
            throw new Error("Too few arguments provided");
          }
          if (argsNum === 1) {
            text = canvas;
            canvas = opts = void 0;
          } else if (argsNum === 2 && !canvas.getContext) {
            opts = text;
            text = canvas;
            canvas = void 0;
          }
          return new Promise(function(resolve, reject) {
            try {
              const data = QRCode.create(text, opts);
              resolve(renderFunc(data, canvas, opts));
            } catch (e) {
              reject(e);
            }
          });
        }
        try {
          const data = QRCode.create(text, opts);
          cb(null, renderFunc(data, canvas, opts));
        } catch (e) {
          cb(e);
        }
      }
      exports.create = QRCode.create;
      exports.toCanvas = renderCanvas.bind(null, CanvasRenderer.render);
      exports.toDataURL = renderCanvas.bind(null, CanvasRenderer.renderToDataURL);
      exports.toString = renderCanvas.bind(null, function(data, _, opts) {
        return SvgRenderer.render(data, opts);
      });
    }
  });

  // node_modules/base45-web/lib/base45-js.js
  var require_base45_js = __commonJS({
    "node_modules/base45-web/lib/base45-js.js"(exports, module) {
      (function() {
        "use strict";
        const baseSize = 45;
        const baseSizeSquared = 2025;
        const chunkSize = 2;
        const encodedChunkSize = 3;
        const smallEncodedChunkSize = 2;
        const byteSize = 256;
        const encoding = [
          "0",
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "A",
          "B",
          "C",
          "D",
          "E",
          "F",
          "G",
          "H",
          "I",
          "J",
          "K",
          "L",
          "M",
          "N",
          "O",
          "P",
          "Q",
          "R",
          "S",
          "T",
          "U",
          "V",
          "W",
          "X",
          "Y",
          "Z",
          " ",
          "$",
          "%",
          "*",
          "+",
          "-",
          ".",
          "/",
          ":"
        ];
        var decoding;
        function encode(byteArrayArg) {
          if (byteArrayArg === null || byteArrayArg === void 0)
            throw new Error("byteArrayArg is null or undefined.");
          const wholeChunkCount = Math.trunc(byteArrayArg.length / chunkSize);
          const resultSize = wholeChunkCount * encodedChunkSize + (byteArrayArg.length % chunkSize === 1 ? smallEncodedChunkSize : 0);
          if (resultSize === 0)
            return "";
          const result = new Array(resultSize);
          var resultIndex = 0;
          const wholeChunkLength = wholeChunkCount * chunkSize;
          for (let i = 0; i < wholeChunkLength; ) {
            const value = byteArrayArg[i++] * byteSize + byteArrayArg[i++];
            result[resultIndex++] = encoding[value % baseSize];
            result[resultIndex++] = encoding[Math.trunc(value / baseSize) % baseSize];
            result[resultIndex++] = encoding[Math.trunc(value / baseSizeSquared) % baseSize];
          }
          if (byteArrayArg.length % chunkSize === 0)
            return result.join("");
          result[result.length - 2] = encoding[byteArrayArg[byteArrayArg.length - 1] % baseSize];
          result[result.length - 1] = byteArrayArg[byteArrayArg.length - 1] < baseSize ? encoding[0] : encoding[Math.trunc(byteArrayArg[byteArrayArg.length - 1] / baseSize) % baseSize];
          return result.join("");
        }
        ;
        function decode(utf8StringArg) {
          if (utf8StringArg === null || utf8StringArg === void 0)
            throw new Error("utf8StringArg is null or undefined.");
          if (utf8StringArg.length === 0)
            return [];
          var remainderSize = utf8StringArg.length % encodedChunkSize;
          if (remainderSize === 1)
            throw new Error("utf8StringArg has incorrect length.");
          if (decoding === void 0) {
            decoding = {};
            for (let i = 0; i < encoding.length; ++i)
              decoding[encoding[i]] = i;
          }
          const buffer = new Array(utf8StringArg.length);
          for (let i = 0; i < utf8StringArg.length; ++i) {
            const found = decoding[utf8StringArg[i]];
            if (found === void 0)
              throw new Error("Invalid character at position ".concat(i).concat("."));
            buffer[i] = found;
          }
          const wholeChunkCount = Math.trunc(buffer.length / encodedChunkSize);
          var result = new Array(wholeChunkCount * chunkSize + (remainderSize === chunkSize ? 1 : 0));
          var resultIndex = 0;
          const wholeChunkLength = wholeChunkCount * encodedChunkSize;
          for (let i = 0; i < wholeChunkLength; ) {
            const val = buffer[i++] + baseSize * buffer[i++] + baseSizeSquared * buffer[i++];
            result[resultIndex++] = Math.trunc(val / byteSize);
            result[resultIndex++] = val % byteSize;
          }
          if (remainderSize === 0)
            return result;
          result[result.length - 1] = buffer[buffer.length - 2] + baseSize * buffer[buffer.length - 1];
          return result;
        }
        function decodeToUtf8String(utf8StringArg) {
          var data = decode(utf8StringArg);
          var str = "";
          var count = data.length;
          for (let i = 0; i < count; ++i)
            str += String.fromCharCode(data[i]);
          return str;
        }
        module.exports = {
          encode,
          decode,
          decodeToUtf8String
        };
      })();
    }
  });

  // node_modules/pako/lib/zlib/trees.js
  var require_trees = __commonJS({
    "node_modules/pako/lib/zlib/trees.js"(exports, module) {
      "use strict";
      var Z_FIXED = 4;
      var Z_BINARY = 0;
      var Z_TEXT = 1;
      var Z_UNKNOWN = 2;
      function zero(buf) {
        let len = buf.length;
        while (--len >= 0) {
          buf[len] = 0;
        }
      }
      var STORED_BLOCK = 0;
      var STATIC_TREES = 1;
      var DYN_TREES = 2;
      var MIN_MATCH = 3;
      var MAX_MATCH = 258;
      var LENGTH_CODES = 29;
      var LITERALS = 256;
      var L_CODES = LITERALS + 1 + LENGTH_CODES;
      var D_CODES = 30;
      var BL_CODES = 19;
      var HEAP_SIZE = 2 * L_CODES + 1;
      var MAX_BITS = 15;
      var Buf_size = 16;
      var MAX_BL_BITS = 7;
      var END_BLOCK = 256;
      var REP_3_6 = 16;
      var REPZ_3_10 = 17;
      var REPZ_11_138 = 18;
      var extra_lbits = (
        /* extra bits for each length code */
        new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0])
      );
      var extra_dbits = (
        /* extra bits for each distance code */
        new Uint8Array([0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13])
      );
      var extra_blbits = (
        /* extra bits for each bit length code */
        new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7])
      );
      var bl_order = new Uint8Array([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]);
      var DIST_CODE_LEN = 512;
      var static_ltree = new Array((L_CODES + 2) * 2);
      zero(static_ltree);
      var static_dtree = new Array(D_CODES * 2);
      zero(static_dtree);
      var _dist_code = new Array(DIST_CODE_LEN);
      zero(_dist_code);
      var _length_code = new Array(MAX_MATCH - MIN_MATCH + 1);
      zero(_length_code);
      var base_length = new Array(LENGTH_CODES);
      zero(base_length);
      var base_dist = new Array(D_CODES);
      zero(base_dist);
      function StaticTreeDesc(static_tree, extra_bits, extra_base, elems, max_length) {
        this.static_tree = static_tree;
        this.extra_bits = extra_bits;
        this.extra_base = extra_base;
        this.elems = elems;
        this.max_length = max_length;
        this.has_stree = static_tree && static_tree.length;
      }
      var static_l_desc;
      var static_d_desc;
      var static_bl_desc;
      function TreeDesc(dyn_tree, stat_desc) {
        this.dyn_tree = dyn_tree;
        this.max_code = 0;
        this.stat_desc = stat_desc;
      }
      var d_code = (dist) => {
        return dist < 256 ? _dist_code[dist] : _dist_code[256 + (dist >>> 7)];
      };
      var put_short = (s, w) => {
        s.pending_buf[s.pending++] = w & 255;
        s.pending_buf[s.pending++] = w >>> 8 & 255;
      };
      var send_bits = (s, value, length) => {
        if (s.bi_valid > Buf_size - length) {
          s.bi_buf |= value << s.bi_valid & 65535;
          put_short(s, s.bi_buf);
          s.bi_buf = value >> Buf_size - s.bi_valid;
          s.bi_valid += length - Buf_size;
        } else {
          s.bi_buf |= value << s.bi_valid & 65535;
          s.bi_valid += length;
        }
      };
      var send_code = (s, c, tree) => {
        send_bits(
          s,
          tree[c * 2],
          tree[c * 2 + 1]
          /*.Len*/
        );
      };
      var bi_reverse = (code, len) => {
        let res = 0;
        do {
          res |= code & 1;
          code >>>= 1;
          res <<= 1;
        } while (--len > 0);
        return res >>> 1;
      };
      var bi_flush = (s) => {
        if (s.bi_valid === 16) {
          put_short(s, s.bi_buf);
          s.bi_buf = 0;
          s.bi_valid = 0;
        } else if (s.bi_valid >= 8) {
          s.pending_buf[s.pending++] = s.bi_buf & 255;
          s.bi_buf >>= 8;
          s.bi_valid -= 8;
        }
      };
      var gen_bitlen = (s, desc) => {
        const tree = desc.dyn_tree;
        const max_code = desc.max_code;
        const stree = desc.stat_desc.static_tree;
        const has_stree = desc.stat_desc.has_stree;
        const extra = desc.stat_desc.extra_bits;
        const base = desc.stat_desc.extra_base;
        const max_length = desc.stat_desc.max_length;
        let h;
        let n, m;
        let bits;
        let xbits;
        let f;
        let overflow = 0;
        for (bits = 0; bits <= MAX_BITS; bits++) {
          s.bl_count[bits] = 0;
        }
        tree[s.heap[s.heap_max] * 2 + 1] = 0;
        for (h = s.heap_max + 1; h < HEAP_SIZE; h++) {
          n = s.heap[h];
          bits = tree[tree[n * 2 + 1] * 2 + 1] + 1;
          if (bits > max_length) {
            bits = max_length;
            overflow++;
          }
          tree[n * 2 + 1] = bits;
          if (n > max_code) {
            continue;
          }
          s.bl_count[bits]++;
          xbits = 0;
          if (n >= base) {
            xbits = extra[n - base];
          }
          f = tree[n * 2];
          s.opt_len += f * (bits + xbits);
          if (has_stree) {
            s.static_len += f * (stree[n * 2 + 1] + xbits);
          }
        }
        if (overflow === 0) {
          return;
        }
        do {
          bits = max_length - 1;
          while (s.bl_count[bits] === 0) {
            bits--;
          }
          s.bl_count[bits]--;
          s.bl_count[bits + 1] += 2;
          s.bl_count[max_length]--;
          overflow -= 2;
        } while (overflow > 0);
        for (bits = max_length; bits !== 0; bits--) {
          n = s.bl_count[bits];
          while (n !== 0) {
            m = s.heap[--h];
            if (m > max_code) {
              continue;
            }
            if (tree[m * 2 + 1] !== bits) {
              s.opt_len += (bits - tree[m * 2 + 1]) * tree[m * 2];
              tree[m * 2 + 1] = bits;
            }
            n--;
          }
        }
      };
      var gen_codes = (tree, max_code, bl_count) => {
        const next_code = new Array(MAX_BITS + 1);
        let code = 0;
        let bits;
        let n;
        for (bits = 1; bits <= MAX_BITS; bits++) {
          code = code + bl_count[bits - 1] << 1;
          next_code[bits] = code;
        }
        for (n = 0; n <= max_code; n++) {
          let len = tree[n * 2 + 1];
          if (len === 0) {
            continue;
          }
          tree[n * 2] = bi_reverse(next_code[len]++, len);
        }
      };
      var tr_static_init = () => {
        let n;
        let bits;
        let length;
        let code;
        let dist;
        const bl_count = new Array(MAX_BITS + 1);
        length = 0;
        for (code = 0; code < LENGTH_CODES - 1; code++) {
          base_length[code] = length;
          for (n = 0; n < 1 << extra_lbits[code]; n++) {
            _length_code[length++] = code;
          }
        }
        _length_code[length - 1] = code;
        dist = 0;
        for (code = 0; code < 16; code++) {
          base_dist[code] = dist;
          for (n = 0; n < 1 << extra_dbits[code]; n++) {
            _dist_code[dist++] = code;
          }
        }
        dist >>= 7;
        for (; code < D_CODES; code++) {
          base_dist[code] = dist << 7;
          for (n = 0; n < 1 << extra_dbits[code] - 7; n++) {
            _dist_code[256 + dist++] = code;
          }
        }
        for (bits = 0; bits <= MAX_BITS; bits++) {
          bl_count[bits] = 0;
        }
        n = 0;
        while (n <= 143) {
          static_ltree[n * 2 + 1] = 8;
          n++;
          bl_count[8]++;
        }
        while (n <= 255) {
          static_ltree[n * 2 + 1] = 9;
          n++;
          bl_count[9]++;
        }
        while (n <= 279) {
          static_ltree[n * 2 + 1] = 7;
          n++;
          bl_count[7]++;
        }
        while (n <= 287) {
          static_ltree[n * 2 + 1] = 8;
          n++;
          bl_count[8]++;
        }
        gen_codes(static_ltree, L_CODES + 1, bl_count);
        for (n = 0; n < D_CODES; n++) {
          static_dtree[n * 2 + 1] = 5;
          static_dtree[n * 2] = bi_reverse(n, 5);
        }
        static_l_desc = new StaticTreeDesc(static_ltree, extra_lbits, LITERALS + 1, L_CODES, MAX_BITS);
        static_d_desc = new StaticTreeDesc(static_dtree, extra_dbits, 0, D_CODES, MAX_BITS);
        static_bl_desc = new StaticTreeDesc(new Array(0), extra_blbits, 0, BL_CODES, MAX_BL_BITS);
      };
      var init_block = (s) => {
        let n;
        for (n = 0; n < L_CODES; n++) {
          s.dyn_ltree[n * 2] = 0;
        }
        for (n = 0; n < D_CODES; n++) {
          s.dyn_dtree[n * 2] = 0;
        }
        for (n = 0; n < BL_CODES; n++) {
          s.bl_tree[n * 2] = 0;
        }
        s.dyn_ltree[END_BLOCK * 2] = 1;
        s.opt_len = s.static_len = 0;
        s.sym_next = s.matches = 0;
      };
      var bi_windup = (s) => {
        if (s.bi_valid > 8) {
          put_short(s, s.bi_buf);
        } else if (s.bi_valid > 0) {
          s.pending_buf[s.pending++] = s.bi_buf;
        }
        s.bi_buf = 0;
        s.bi_valid = 0;
      };
      var smaller = (tree, n, m, depth) => {
        const _n2 = n * 2;
        const _m2 = m * 2;
        return tree[_n2] < tree[_m2] || tree[_n2] === tree[_m2] && depth[n] <= depth[m];
      };
      var pqdownheap = (s, tree, k) => {
        const v = s.heap[k];
        let j = k << 1;
        while (j <= s.heap_len) {
          if (j < s.heap_len && smaller(tree, s.heap[j + 1], s.heap[j], s.depth)) {
            j++;
          }
          if (smaller(tree, v, s.heap[j], s.depth)) {
            break;
          }
          s.heap[k] = s.heap[j];
          k = j;
          j <<= 1;
        }
        s.heap[k] = v;
      };
      var compress_block = (s, ltree, dtree) => {
        let dist;
        let lc;
        let sx = 0;
        let code;
        let extra;
        if (s.sym_next !== 0) {
          do {
            dist = s.pending_buf[s.sym_buf + sx++] & 255;
            dist += (s.pending_buf[s.sym_buf + sx++] & 255) << 8;
            lc = s.pending_buf[s.sym_buf + sx++];
            if (dist === 0) {
              send_code(s, lc, ltree);
            } else {
              code = _length_code[lc];
              send_code(s, code + LITERALS + 1, ltree);
              extra = extra_lbits[code];
              if (extra !== 0) {
                lc -= base_length[code];
                send_bits(s, lc, extra);
              }
              dist--;
              code = d_code(dist);
              send_code(s, code, dtree);
              extra = extra_dbits[code];
              if (extra !== 0) {
                dist -= base_dist[code];
                send_bits(s, dist, extra);
              }
            }
          } while (sx < s.sym_next);
        }
        send_code(s, END_BLOCK, ltree);
      };
      var build_tree = (s, desc) => {
        const tree = desc.dyn_tree;
        const stree = desc.stat_desc.static_tree;
        const has_stree = desc.stat_desc.has_stree;
        const elems = desc.stat_desc.elems;
        let n, m;
        let max_code = -1;
        let node;
        s.heap_len = 0;
        s.heap_max = HEAP_SIZE;
        for (n = 0; n < elems; n++) {
          if (tree[n * 2] !== 0) {
            s.heap[++s.heap_len] = max_code = n;
            s.depth[n] = 0;
          } else {
            tree[n * 2 + 1] = 0;
          }
        }
        while (s.heap_len < 2) {
          node = s.heap[++s.heap_len] = max_code < 2 ? ++max_code : 0;
          tree[node * 2] = 1;
          s.depth[node] = 0;
          s.opt_len--;
          if (has_stree) {
            s.static_len -= stree[node * 2 + 1];
          }
        }
        desc.max_code = max_code;
        for (n = s.heap_len >> 1; n >= 1; n--) {
          pqdownheap(s, tree, n);
        }
        node = elems;
        do {
          n = s.heap[
            1
            /*SMALLEST*/
          ];
          s.heap[
            1
            /*SMALLEST*/
          ] = s.heap[s.heap_len--];
          pqdownheap(
            s,
            tree,
            1
            /*SMALLEST*/
          );
          m = s.heap[
            1
            /*SMALLEST*/
          ];
          s.heap[--s.heap_max] = n;
          s.heap[--s.heap_max] = m;
          tree[node * 2] = tree[n * 2] + tree[m * 2];
          s.depth[node] = (s.depth[n] >= s.depth[m] ? s.depth[n] : s.depth[m]) + 1;
          tree[n * 2 + 1] = tree[m * 2 + 1] = node;
          s.heap[
            1
            /*SMALLEST*/
          ] = node++;
          pqdownheap(
            s,
            tree,
            1
            /*SMALLEST*/
          );
        } while (s.heap_len >= 2);
        s.heap[--s.heap_max] = s.heap[
          1
          /*SMALLEST*/
        ];
        gen_bitlen(s, desc);
        gen_codes(tree, max_code, s.bl_count);
      };
      var scan_tree = (s, tree, max_code) => {
        let n;
        let prevlen = -1;
        let curlen;
        let nextlen = tree[0 * 2 + 1];
        let count = 0;
        let max_count = 7;
        let min_count = 4;
        if (nextlen === 0) {
          max_count = 138;
          min_count = 3;
        }
        tree[(max_code + 1) * 2 + 1] = 65535;
        for (n = 0; n <= max_code; n++) {
          curlen = nextlen;
          nextlen = tree[(n + 1) * 2 + 1];
          if (++count < max_count && curlen === nextlen) {
            continue;
          } else if (count < min_count) {
            s.bl_tree[curlen * 2] += count;
          } else if (curlen !== 0) {
            if (curlen !== prevlen) {
              s.bl_tree[curlen * 2]++;
            }
            s.bl_tree[REP_3_6 * 2]++;
          } else if (count <= 10) {
            s.bl_tree[REPZ_3_10 * 2]++;
          } else {
            s.bl_tree[REPZ_11_138 * 2]++;
          }
          count = 0;
          prevlen = curlen;
          if (nextlen === 0) {
            max_count = 138;
            min_count = 3;
          } else if (curlen === nextlen) {
            max_count = 6;
            min_count = 3;
          } else {
            max_count = 7;
            min_count = 4;
          }
        }
      };
      var send_tree = (s, tree, max_code) => {
        let n;
        let prevlen = -1;
        let curlen;
        let nextlen = tree[0 * 2 + 1];
        let count = 0;
        let max_count = 7;
        let min_count = 4;
        if (nextlen === 0) {
          max_count = 138;
          min_count = 3;
        }
        for (n = 0; n <= max_code; n++) {
          curlen = nextlen;
          nextlen = tree[(n + 1) * 2 + 1];
          if (++count < max_count && curlen === nextlen) {
            continue;
          } else if (count < min_count) {
            do {
              send_code(s, curlen, s.bl_tree);
            } while (--count !== 0);
          } else if (curlen !== 0) {
            if (curlen !== prevlen) {
              send_code(s, curlen, s.bl_tree);
              count--;
            }
            send_code(s, REP_3_6, s.bl_tree);
            send_bits(s, count - 3, 2);
          } else if (count <= 10) {
            send_code(s, REPZ_3_10, s.bl_tree);
            send_bits(s, count - 3, 3);
          } else {
            send_code(s, REPZ_11_138, s.bl_tree);
            send_bits(s, count - 11, 7);
          }
          count = 0;
          prevlen = curlen;
          if (nextlen === 0) {
            max_count = 138;
            min_count = 3;
          } else if (curlen === nextlen) {
            max_count = 6;
            min_count = 3;
          } else {
            max_count = 7;
            min_count = 4;
          }
        }
      };
      var build_bl_tree = (s) => {
        let max_blindex;
        scan_tree(s, s.dyn_ltree, s.l_desc.max_code);
        scan_tree(s, s.dyn_dtree, s.d_desc.max_code);
        build_tree(s, s.bl_desc);
        for (max_blindex = BL_CODES - 1; max_blindex >= 3; max_blindex--) {
          if (s.bl_tree[bl_order[max_blindex] * 2 + 1] !== 0) {
            break;
          }
        }
        s.opt_len += 3 * (max_blindex + 1) + 5 + 5 + 4;
        return max_blindex;
      };
      var send_all_trees = (s, lcodes, dcodes, blcodes) => {
        let rank;
        send_bits(s, lcodes - 257, 5);
        send_bits(s, dcodes - 1, 5);
        send_bits(s, blcodes - 4, 4);
        for (rank = 0; rank < blcodes; rank++) {
          send_bits(s, s.bl_tree[bl_order[rank] * 2 + 1], 3);
        }
        send_tree(s, s.dyn_ltree, lcodes - 1);
        send_tree(s, s.dyn_dtree, dcodes - 1);
      };
      var detect_data_type = (s) => {
        let block_mask = 4093624447;
        let n;
        for (n = 0; n <= 31; n++, block_mask >>>= 1) {
          if (block_mask & 1 && s.dyn_ltree[n * 2] !== 0) {
            return Z_BINARY;
          }
        }
        if (s.dyn_ltree[9 * 2] !== 0 || s.dyn_ltree[10 * 2] !== 0 || s.dyn_ltree[13 * 2] !== 0) {
          return Z_TEXT;
        }
        for (n = 32; n < LITERALS; n++) {
          if (s.dyn_ltree[n * 2] !== 0) {
            return Z_TEXT;
          }
        }
        return Z_BINARY;
      };
      var static_init_done = false;
      var _tr_init = (s) => {
        if (!static_init_done) {
          tr_static_init();
          static_init_done = true;
        }
        s.l_desc = new TreeDesc(s.dyn_ltree, static_l_desc);
        s.d_desc = new TreeDesc(s.dyn_dtree, static_d_desc);
        s.bl_desc = new TreeDesc(s.bl_tree, static_bl_desc);
        s.bi_buf = 0;
        s.bi_valid = 0;
        init_block(s);
      };
      var _tr_stored_block = (s, buf, stored_len, last) => {
        send_bits(s, (STORED_BLOCK << 1) + (last ? 1 : 0), 3);
        bi_windup(s);
        put_short(s, stored_len);
        put_short(s, ~stored_len);
        if (stored_len) {
          s.pending_buf.set(s.window.subarray(buf, buf + stored_len), s.pending);
        }
        s.pending += stored_len;
      };
      var _tr_align = (s) => {
        send_bits(s, STATIC_TREES << 1, 3);
        send_code(s, END_BLOCK, static_ltree);
        bi_flush(s);
      };
      var _tr_flush_block = (s, buf, stored_len, last) => {
        let opt_lenb, static_lenb;
        let max_blindex = 0;
        if (s.level > 0) {
          if (s.strm.data_type === Z_UNKNOWN) {
            s.strm.data_type = detect_data_type(s);
          }
          build_tree(s, s.l_desc);
          build_tree(s, s.d_desc);
          max_blindex = build_bl_tree(s);
          opt_lenb = s.opt_len + 3 + 7 >>> 3;
          static_lenb = s.static_len + 3 + 7 >>> 3;
          if (static_lenb <= opt_lenb) {
            opt_lenb = static_lenb;
          }
        } else {
          opt_lenb = static_lenb = stored_len + 5;
        }
        if (stored_len + 4 <= opt_lenb && buf !== -1) {
          _tr_stored_block(s, buf, stored_len, last);
        } else if (s.strategy === Z_FIXED || static_lenb === opt_lenb) {
          send_bits(s, (STATIC_TREES << 1) + (last ? 1 : 0), 3);
          compress_block(s, static_ltree, static_dtree);
        } else {
          send_bits(s, (DYN_TREES << 1) + (last ? 1 : 0), 3);
          send_all_trees(s, s.l_desc.max_code + 1, s.d_desc.max_code + 1, max_blindex + 1);
          compress_block(s, s.dyn_ltree, s.dyn_dtree);
        }
        init_block(s);
        if (last) {
          bi_windup(s);
        }
      };
      var _tr_tally = (s, dist, lc) => {
        s.pending_buf[s.sym_buf + s.sym_next++] = dist;
        s.pending_buf[s.sym_buf + s.sym_next++] = dist >> 8;
        s.pending_buf[s.sym_buf + s.sym_next++] = lc;
        if (dist === 0) {
          s.dyn_ltree[lc * 2]++;
        } else {
          s.matches++;
          dist--;
          s.dyn_ltree[(_length_code[lc] + LITERALS + 1) * 2]++;
          s.dyn_dtree[d_code(dist) * 2]++;
        }
        return s.sym_next === s.sym_end;
      };
      module.exports._tr_init = _tr_init;
      module.exports._tr_stored_block = _tr_stored_block;
      module.exports._tr_flush_block = _tr_flush_block;
      module.exports._tr_tally = _tr_tally;
      module.exports._tr_align = _tr_align;
    }
  });

  // node_modules/pako/lib/zlib/adler32.js
  var require_adler32 = __commonJS({
    "node_modules/pako/lib/zlib/adler32.js"(exports, module) {
      "use strict";
      var adler32 = (adler, buf, len, pos) => {
        let s1 = adler & 65535 | 0, s2 = adler >>> 16 & 65535 | 0, n = 0;
        while (len !== 0) {
          n = len > 2e3 ? 2e3 : len;
          len -= n;
          do {
            s1 = s1 + buf[pos++] | 0;
            s2 = s2 + s1 | 0;
          } while (--n);
          s1 %= 65521;
          s2 %= 65521;
        }
        return s1 | s2 << 16 | 0;
      };
      module.exports = adler32;
    }
  });

  // node_modules/pako/lib/zlib/crc32.js
  var require_crc32 = __commonJS({
    "node_modules/pako/lib/zlib/crc32.js"(exports, module) {
      "use strict";
      var makeTable = () => {
        let c, table = [];
        for (var n = 0; n < 256; n++) {
          c = n;
          for (var k = 0; k < 8; k++) {
            c = c & 1 ? 3988292384 ^ c >>> 1 : c >>> 1;
          }
          table[n] = c;
        }
        return table;
      };
      var crcTable = new Uint32Array(makeTable());
      var crc32 = (crc, buf, len, pos) => {
        const t = crcTable;
        const end = pos + len;
        crc ^= -1;
        for (let i = pos; i < end; i++) {
          crc = crc >>> 8 ^ t[(crc ^ buf[i]) & 255];
        }
        return crc ^ -1;
      };
      module.exports = crc32;
    }
  });

  // node_modules/pako/lib/zlib/messages.js
  var require_messages = __commonJS({
    "node_modules/pako/lib/zlib/messages.js"(exports, module) {
      "use strict";
      module.exports = {
        2: "need dictionary",
        /* Z_NEED_DICT       2  */
        1: "stream end",
        /* Z_STREAM_END      1  */
        0: "",
        /* Z_OK              0  */
        "-1": "file error",
        /* Z_ERRNO         (-1) */
        "-2": "stream error",
        /* Z_STREAM_ERROR  (-2) */
        "-3": "data error",
        /* Z_DATA_ERROR    (-3) */
        "-4": "insufficient memory",
        /* Z_MEM_ERROR     (-4) */
        "-5": "buffer error",
        /* Z_BUF_ERROR     (-5) */
        "-6": "incompatible version"
        /* Z_VERSION_ERROR (-6) */
      };
    }
  });

  // node_modules/pako/lib/zlib/constants.js
  var require_constants = __commonJS({
    "node_modules/pako/lib/zlib/constants.js"(exports, module) {
      "use strict";
      module.exports = {
        /* Allowed flush values; see deflate() and inflate() below for details */
        Z_NO_FLUSH: 0,
        Z_PARTIAL_FLUSH: 1,
        Z_SYNC_FLUSH: 2,
        Z_FULL_FLUSH: 3,
        Z_FINISH: 4,
        Z_BLOCK: 5,
        Z_TREES: 6,
        /* Return codes for the compression/decompression functions. Negative values
        * are errors, positive values are used for special but normal events.
        */
        Z_OK: 0,
        Z_STREAM_END: 1,
        Z_NEED_DICT: 2,
        Z_ERRNO: -1,
        Z_STREAM_ERROR: -2,
        Z_DATA_ERROR: -3,
        Z_MEM_ERROR: -4,
        Z_BUF_ERROR: -5,
        //Z_VERSION_ERROR: -6,
        /* compression levels */
        Z_NO_COMPRESSION: 0,
        Z_BEST_SPEED: 1,
        Z_BEST_COMPRESSION: 9,
        Z_DEFAULT_COMPRESSION: -1,
        Z_FILTERED: 1,
        Z_HUFFMAN_ONLY: 2,
        Z_RLE: 3,
        Z_FIXED: 4,
        Z_DEFAULT_STRATEGY: 0,
        /* Possible values of the data_type field (though see inflate()) */
        Z_BINARY: 0,
        Z_TEXT: 1,
        //Z_ASCII:                1, // = Z_TEXT (deprecated)
        Z_UNKNOWN: 2,
        /* The deflate compression method */
        Z_DEFLATED: 8
        //Z_NULL:                 null // Use -1 or null inline, depending on var type
      };
    }
  });

  // node_modules/pako/lib/zlib/deflate.js
  var require_deflate = __commonJS({
    "node_modules/pako/lib/zlib/deflate.js"(exports, module) {
      "use strict";
      var { _tr_init, _tr_stored_block, _tr_flush_block, _tr_tally, _tr_align } = require_trees();
      var adler32 = require_adler32();
      var crc32 = require_crc32();
      var msg = require_messages();
      var {
        Z_NO_FLUSH,
        Z_PARTIAL_FLUSH,
        Z_FULL_FLUSH,
        Z_FINISH,
        Z_BLOCK,
        Z_OK,
        Z_STREAM_END,
        Z_STREAM_ERROR,
        Z_DATA_ERROR,
        Z_BUF_ERROR,
        Z_DEFAULT_COMPRESSION,
        Z_FILTERED,
        Z_HUFFMAN_ONLY,
        Z_RLE,
        Z_FIXED,
        Z_DEFAULT_STRATEGY,
        Z_UNKNOWN,
        Z_DEFLATED
      } = require_constants();
      var MAX_MEM_LEVEL = 9;
      var MAX_WBITS = 15;
      var DEF_MEM_LEVEL = 8;
      var LENGTH_CODES = 29;
      var LITERALS = 256;
      var L_CODES = LITERALS + 1 + LENGTH_CODES;
      var D_CODES = 30;
      var BL_CODES = 19;
      var HEAP_SIZE = 2 * L_CODES + 1;
      var MAX_BITS = 15;
      var MIN_MATCH = 3;
      var MAX_MATCH = 258;
      var MIN_LOOKAHEAD = MAX_MATCH + MIN_MATCH + 1;
      var PRESET_DICT = 32;
      var INIT_STATE = 42;
      var GZIP_STATE = 57;
      var EXTRA_STATE = 69;
      var NAME_STATE = 73;
      var COMMENT_STATE = 91;
      var HCRC_STATE = 103;
      var BUSY_STATE = 113;
      var FINISH_STATE = 666;
      var BS_NEED_MORE = 1;
      var BS_BLOCK_DONE = 2;
      var BS_FINISH_STARTED = 3;
      var BS_FINISH_DONE = 4;
      var OS_CODE = 3;
      var err = (strm, errorCode) => {
        strm.msg = msg[errorCode];
        return errorCode;
      };
      var rank = (f) => {
        return f * 2 - (f > 4 ? 9 : 0);
      };
      var zero = (buf) => {
        let len = buf.length;
        while (--len >= 0) {
          buf[len] = 0;
        }
      };
      var slide_hash = (s) => {
        let n, m;
        let p;
        let wsize = s.w_size;
        n = s.hash_size;
        p = n;
        do {
          m = s.head[--p];
          s.head[p] = m >= wsize ? m - wsize : 0;
        } while (--n);
        n = wsize;
        p = n;
        do {
          m = s.prev[--p];
          s.prev[p] = m >= wsize ? m - wsize : 0;
        } while (--n);
      };
      var HASH_ZLIB = (s, prev, data) => (prev << s.hash_shift ^ data) & s.hash_mask;
      var HASH = HASH_ZLIB;
      var flush_pending = (strm) => {
        const s = strm.state;
        let len = s.pending;
        if (len > strm.avail_out) {
          len = strm.avail_out;
        }
        if (len === 0) {
          return;
        }
        strm.output.set(s.pending_buf.subarray(s.pending_out, s.pending_out + len), strm.next_out);
        strm.next_out += len;
        s.pending_out += len;
        strm.total_out += len;
        strm.avail_out -= len;
        s.pending -= len;
        if (s.pending === 0) {
          s.pending_out = 0;
        }
      };
      var flush_block_only = (s, last) => {
        _tr_flush_block(s, s.block_start >= 0 ? s.block_start : -1, s.strstart - s.block_start, last);
        s.block_start = s.strstart;
        flush_pending(s.strm);
      };
      var put_byte = (s, b) => {
        s.pending_buf[s.pending++] = b;
      };
      var putShortMSB = (s, b) => {
        s.pending_buf[s.pending++] = b >>> 8 & 255;
        s.pending_buf[s.pending++] = b & 255;
      };
      var read_buf = (strm, buf, start, size) => {
        let len = strm.avail_in;
        if (len > size) {
          len = size;
        }
        if (len === 0) {
          return 0;
        }
        strm.avail_in -= len;
        buf.set(strm.input.subarray(strm.next_in, strm.next_in + len), start);
        if (strm.state.wrap === 1) {
          strm.adler = adler32(strm.adler, buf, len, start);
        } else if (strm.state.wrap === 2) {
          strm.adler = crc32(strm.adler, buf, len, start);
        }
        strm.next_in += len;
        strm.total_in += len;
        return len;
      };
      var longest_match = (s, cur_match) => {
        let chain_length = s.max_chain_length;
        let scan = s.strstart;
        let match;
        let len;
        let best_len = s.prev_length;
        let nice_match = s.nice_match;
        const limit = s.strstart > s.w_size - MIN_LOOKAHEAD ? s.strstart - (s.w_size - MIN_LOOKAHEAD) : 0;
        const _win = s.window;
        const wmask = s.w_mask;
        const prev = s.prev;
        const strend = s.strstart + MAX_MATCH;
        let scan_end1 = _win[scan + best_len - 1];
        let scan_end = _win[scan + best_len];
        if (s.prev_length >= s.good_match) {
          chain_length >>= 2;
        }
        if (nice_match > s.lookahead) {
          nice_match = s.lookahead;
        }
        do {
          match = cur_match;
          if (_win[match + best_len] !== scan_end || _win[match + best_len - 1] !== scan_end1 || _win[match] !== _win[scan] || _win[++match] !== _win[scan + 1]) {
            continue;
          }
          scan += 2;
          match++;
          do {
          } while (_win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && scan < strend);
          len = MAX_MATCH - (strend - scan);
          scan = strend - MAX_MATCH;
          if (len > best_len) {
            s.match_start = cur_match;
            best_len = len;
            if (len >= nice_match) {
              break;
            }
            scan_end1 = _win[scan + best_len - 1];
            scan_end = _win[scan + best_len];
          }
        } while ((cur_match = prev[cur_match & wmask]) > limit && --chain_length !== 0);
        if (best_len <= s.lookahead) {
          return best_len;
        }
        return s.lookahead;
      };
      var fill_window = (s) => {
        const _w_size = s.w_size;
        let n, more, str;
        do {
          more = s.window_size - s.lookahead - s.strstart;
          if (s.strstart >= _w_size + (_w_size - MIN_LOOKAHEAD)) {
            s.window.set(s.window.subarray(_w_size, _w_size + _w_size - more), 0);
            s.match_start -= _w_size;
            s.strstart -= _w_size;
            s.block_start -= _w_size;
            if (s.insert > s.strstart) {
              s.insert = s.strstart;
            }
            slide_hash(s);
            more += _w_size;
          }
          if (s.strm.avail_in === 0) {
            break;
          }
          n = read_buf(s.strm, s.window, s.strstart + s.lookahead, more);
          s.lookahead += n;
          if (s.lookahead + s.insert >= MIN_MATCH) {
            str = s.strstart - s.insert;
            s.ins_h = s.window[str];
            s.ins_h = HASH(s, s.ins_h, s.window[str + 1]);
            while (s.insert) {
              s.ins_h = HASH(s, s.ins_h, s.window[str + MIN_MATCH - 1]);
              s.prev[str & s.w_mask] = s.head[s.ins_h];
              s.head[s.ins_h] = str;
              str++;
              s.insert--;
              if (s.lookahead + s.insert < MIN_MATCH) {
                break;
              }
            }
          }
        } while (s.lookahead < MIN_LOOKAHEAD && s.strm.avail_in !== 0);
      };
      var deflate_stored = (s, flush) => {
        let min_block = s.pending_buf_size - 5 > s.w_size ? s.w_size : s.pending_buf_size - 5;
        let len, left, have, last = 0;
        let used = s.strm.avail_in;
        do {
          len = 65535;
          have = s.bi_valid + 42 >> 3;
          if (s.strm.avail_out < have) {
            break;
          }
          have = s.strm.avail_out - have;
          left = s.strstart - s.block_start;
          if (len > left + s.strm.avail_in) {
            len = left + s.strm.avail_in;
          }
          if (len > have) {
            len = have;
          }
          if (len < min_block && (len === 0 && flush !== Z_FINISH || flush === Z_NO_FLUSH || len !== left + s.strm.avail_in)) {
            break;
          }
          last = flush === Z_FINISH && len === left + s.strm.avail_in ? 1 : 0;
          _tr_stored_block(s, 0, 0, last);
          s.pending_buf[s.pending - 4] = len;
          s.pending_buf[s.pending - 3] = len >> 8;
          s.pending_buf[s.pending - 2] = ~len;
          s.pending_buf[s.pending - 1] = ~len >> 8;
          flush_pending(s.strm);
          if (left) {
            if (left > len) {
              left = len;
            }
            s.strm.output.set(s.window.subarray(s.block_start, s.block_start + left), s.strm.next_out);
            s.strm.next_out += left;
            s.strm.avail_out -= left;
            s.strm.total_out += left;
            s.block_start += left;
            len -= left;
          }
          if (len) {
            read_buf(s.strm, s.strm.output, s.strm.next_out, len);
            s.strm.next_out += len;
            s.strm.avail_out -= len;
            s.strm.total_out += len;
          }
        } while (last === 0);
        used -= s.strm.avail_in;
        if (used) {
          if (used >= s.w_size) {
            s.matches = 2;
            s.window.set(s.strm.input.subarray(s.strm.next_in - s.w_size, s.strm.next_in), 0);
            s.strstart = s.w_size;
            s.insert = s.strstart;
          } else {
            if (s.window_size - s.strstart <= used) {
              s.strstart -= s.w_size;
              s.window.set(s.window.subarray(s.w_size, s.w_size + s.strstart), 0);
              if (s.matches < 2) {
                s.matches++;
              }
              if (s.insert > s.strstart) {
                s.insert = s.strstart;
              }
            }
            s.window.set(s.strm.input.subarray(s.strm.next_in - used, s.strm.next_in), s.strstart);
            s.strstart += used;
            s.insert += used > s.w_size - s.insert ? s.w_size - s.insert : used;
          }
          s.block_start = s.strstart;
        }
        if (s.high_water < s.strstart) {
          s.high_water = s.strstart;
        }
        if (last) {
          return BS_FINISH_DONE;
        }
        if (flush !== Z_NO_FLUSH && flush !== Z_FINISH && s.strm.avail_in === 0 && s.strstart === s.block_start) {
          return BS_BLOCK_DONE;
        }
        have = s.window_size - s.strstart;
        if (s.strm.avail_in > have && s.block_start >= s.w_size) {
          s.block_start -= s.w_size;
          s.strstart -= s.w_size;
          s.window.set(s.window.subarray(s.w_size, s.w_size + s.strstart), 0);
          if (s.matches < 2) {
            s.matches++;
          }
          have += s.w_size;
          if (s.insert > s.strstart) {
            s.insert = s.strstart;
          }
        }
        if (have > s.strm.avail_in) {
          have = s.strm.avail_in;
        }
        if (have) {
          read_buf(s.strm, s.window, s.strstart, have);
          s.strstart += have;
          s.insert += have > s.w_size - s.insert ? s.w_size - s.insert : have;
        }
        if (s.high_water < s.strstart) {
          s.high_water = s.strstart;
        }
        have = s.bi_valid + 42 >> 3;
        have = s.pending_buf_size - have > 65535 ? 65535 : s.pending_buf_size - have;
        min_block = have > s.w_size ? s.w_size : have;
        left = s.strstart - s.block_start;
        if (left >= min_block || (left || flush === Z_FINISH) && flush !== Z_NO_FLUSH && s.strm.avail_in === 0 && left <= have) {
          len = left > have ? have : left;
          last = flush === Z_FINISH && s.strm.avail_in === 0 && len === left ? 1 : 0;
          _tr_stored_block(s, s.block_start, len, last);
          s.block_start += len;
          flush_pending(s.strm);
        }
        return last ? BS_FINISH_STARTED : BS_NEED_MORE;
      };
      var deflate_fast = (s, flush) => {
        let hash_head;
        let bflush;
        for (; ; ) {
          if (s.lookahead < MIN_LOOKAHEAD) {
            fill_window(s);
            if (s.lookahead < MIN_LOOKAHEAD && flush === Z_NO_FLUSH) {
              return BS_NEED_MORE;
            }
            if (s.lookahead === 0) {
              break;
            }
          }
          hash_head = 0;
          if (s.lookahead >= MIN_MATCH) {
            s.ins_h = HASH(s, s.ins_h, s.window[s.strstart + MIN_MATCH - 1]);
            hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
            s.head[s.ins_h] = s.strstart;
          }
          if (hash_head !== 0 && s.strstart - hash_head <= s.w_size - MIN_LOOKAHEAD) {
            s.match_length = longest_match(s, hash_head);
          }
          if (s.match_length >= MIN_MATCH) {
            bflush = _tr_tally(s, s.strstart - s.match_start, s.match_length - MIN_MATCH);
            s.lookahead -= s.match_length;
            if (s.match_length <= s.max_lazy_match && s.lookahead >= MIN_MATCH) {
              s.match_length--;
              do {
                s.strstart++;
                s.ins_h = HASH(s, s.ins_h, s.window[s.strstart + MIN_MATCH - 1]);
                hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
                s.head[s.ins_h] = s.strstart;
              } while (--s.match_length !== 0);
              s.strstart++;
            } else {
              s.strstart += s.match_length;
              s.match_length = 0;
              s.ins_h = s.window[s.strstart];
              s.ins_h = HASH(s, s.ins_h, s.window[s.strstart + 1]);
            }
          } else {
            bflush = _tr_tally(s, 0, s.window[s.strstart]);
            s.lookahead--;
            s.strstart++;
          }
          if (bflush) {
            flush_block_only(s, false);
            if (s.strm.avail_out === 0) {
              return BS_NEED_MORE;
            }
          }
        }
        s.insert = s.strstart < MIN_MATCH - 1 ? s.strstart : MIN_MATCH - 1;
        if (flush === Z_FINISH) {
          flush_block_only(s, true);
          if (s.strm.avail_out === 0) {
            return BS_FINISH_STARTED;
          }
          return BS_FINISH_DONE;
        }
        if (s.sym_next) {
          flush_block_only(s, false);
          if (s.strm.avail_out === 0) {
            return BS_NEED_MORE;
          }
        }
        return BS_BLOCK_DONE;
      };
      var deflate_slow = (s, flush) => {
        let hash_head;
        let bflush;
        let max_insert;
        for (; ; ) {
          if (s.lookahead < MIN_LOOKAHEAD) {
            fill_window(s);
            if (s.lookahead < MIN_LOOKAHEAD && flush === Z_NO_FLUSH) {
              return BS_NEED_MORE;
            }
            if (s.lookahead === 0) {
              break;
            }
          }
          hash_head = 0;
          if (s.lookahead >= MIN_MATCH) {
            s.ins_h = HASH(s, s.ins_h, s.window[s.strstart + MIN_MATCH - 1]);
            hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
            s.head[s.ins_h] = s.strstart;
          }
          s.prev_length = s.match_length;
          s.prev_match = s.match_start;
          s.match_length = MIN_MATCH - 1;
          if (hash_head !== 0 && s.prev_length < s.max_lazy_match && s.strstart - hash_head <= s.w_size - MIN_LOOKAHEAD) {
            s.match_length = longest_match(s, hash_head);
            if (s.match_length <= 5 && (s.strategy === Z_FILTERED || s.match_length === MIN_MATCH && s.strstart - s.match_start > 4096)) {
              s.match_length = MIN_MATCH - 1;
            }
          }
          if (s.prev_length >= MIN_MATCH && s.match_length <= s.prev_length) {
            max_insert = s.strstart + s.lookahead - MIN_MATCH;
            bflush = _tr_tally(s, s.strstart - 1 - s.prev_match, s.prev_length - MIN_MATCH);
            s.lookahead -= s.prev_length - 1;
            s.prev_length -= 2;
            do {
              if (++s.strstart <= max_insert) {
                s.ins_h = HASH(s, s.ins_h, s.window[s.strstart + MIN_MATCH - 1]);
                hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
                s.head[s.ins_h] = s.strstart;
              }
            } while (--s.prev_length !== 0);
            s.match_available = 0;
            s.match_length = MIN_MATCH - 1;
            s.strstart++;
            if (bflush) {
              flush_block_only(s, false);
              if (s.strm.avail_out === 0) {
                return BS_NEED_MORE;
              }
            }
          } else if (s.match_available) {
            bflush = _tr_tally(s, 0, s.window[s.strstart - 1]);
            if (bflush) {
              flush_block_only(s, false);
            }
            s.strstart++;
            s.lookahead--;
            if (s.strm.avail_out === 0) {
              return BS_NEED_MORE;
            }
          } else {
            s.match_available = 1;
            s.strstart++;
            s.lookahead--;
          }
        }
        if (s.match_available) {
          bflush = _tr_tally(s, 0, s.window[s.strstart - 1]);
          s.match_available = 0;
        }
        s.insert = s.strstart < MIN_MATCH - 1 ? s.strstart : MIN_MATCH - 1;
        if (flush === Z_FINISH) {
          flush_block_only(s, true);
          if (s.strm.avail_out === 0) {
            return BS_FINISH_STARTED;
          }
          return BS_FINISH_DONE;
        }
        if (s.sym_next) {
          flush_block_only(s, false);
          if (s.strm.avail_out === 0) {
            return BS_NEED_MORE;
          }
        }
        return BS_BLOCK_DONE;
      };
      var deflate_rle = (s, flush) => {
        let bflush;
        let prev;
        let scan, strend;
        const _win = s.window;
        for (; ; ) {
          if (s.lookahead <= MAX_MATCH) {
            fill_window(s);
            if (s.lookahead <= MAX_MATCH && flush === Z_NO_FLUSH) {
              return BS_NEED_MORE;
            }
            if (s.lookahead === 0) {
              break;
            }
          }
          s.match_length = 0;
          if (s.lookahead >= MIN_MATCH && s.strstart > 0) {
            scan = s.strstart - 1;
            prev = _win[scan];
            if (prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan]) {
              strend = s.strstart + MAX_MATCH;
              do {
              } while (prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && scan < strend);
              s.match_length = MAX_MATCH - (strend - scan);
              if (s.match_length > s.lookahead) {
                s.match_length = s.lookahead;
              }
            }
          }
          if (s.match_length >= MIN_MATCH) {
            bflush = _tr_tally(s, 1, s.match_length - MIN_MATCH);
            s.lookahead -= s.match_length;
            s.strstart += s.match_length;
            s.match_length = 0;
          } else {
            bflush = _tr_tally(s, 0, s.window[s.strstart]);
            s.lookahead--;
            s.strstart++;
          }
          if (bflush) {
            flush_block_only(s, false);
            if (s.strm.avail_out === 0) {
              return BS_NEED_MORE;
            }
          }
        }
        s.insert = 0;
        if (flush === Z_FINISH) {
          flush_block_only(s, true);
          if (s.strm.avail_out === 0) {
            return BS_FINISH_STARTED;
          }
          return BS_FINISH_DONE;
        }
        if (s.sym_next) {
          flush_block_only(s, false);
          if (s.strm.avail_out === 0) {
            return BS_NEED_MORE;
          }
        }
        return BS_BLOCK_DONE;
      };
      var deflate_huff = (s, flush) => {
        let bflush;
        for (; ; ) {
          if (s.lookahead === 0) {
            fill_window(s);
            if (s.lookahead === 0) {
              if (flush === Z_NO_FLUSH) {
                return BS_NEED_MORE;
              }
              break;
            }
          }
          s.match_length = 0;
          bflush = _tr_tally(s, 0, s.window[s.strstart]);
          s.lookahead--;
          s.strstart++;
          if (bflush) {
            flush_block_only(s, false);
            if (s.strm.avail_out === 0) {
              return BS_NEED_MORE;
            }
          }
        }
        s.insert = 0;
        if (flush === Z_FINISH) {
          flush_block_only(s, true);
          if (s.strm.avail_out === 0) {
            return BS_FINISH_STARTED;
          }
          return BS_FINISH_DONE;
        }
        if (s.sym_next) {
          flush_block_only(s, false);
          if (s.strm.avail_out === 0) {
            return BS_NEED_MORE;
          }
        }
        return BS_BLOCK_DONE;
      };
      function Config(good_length, max_lazy, nice_length, max_chain, func) {
        this.good_length = good_length;
        this.max_lazy = max_lazy;
        this.nice_length = nice_length;
        this.max_chain = max_chain;
        this.func = func;
      }
      var configuration_table = [
        /*      good lazy nice chain */
        new Config(0, 0, 0, 0, deflate_stored),
        /* 0 store only */
        new Config(4, 4, 8, 4, deflate_fast),
        /* 1 max speed, no lazy matches */
        new Config(4, 5, 16, 8, deflate_fast),
        /* 2 */
        new Config(4, 6, 32, 32, deflate_fast),
        /* 3 */
        new Config(4, 4, 16, 16, deflate_slow),
        /* 4 lazy matches */
        new Config(8, 16, 32, 32, deflate_slow),
        /* 5 */
        new Config(8, 16, 128, 128, deflate_slow),
        /* 6 */
        new Config(8, 32, 128, 256, deflate_slow),
        /* 7 */
        new Config(32, 128, 258, 1024, deflate_slow),
        /* 8 */
        new Config(32, 258, 258, 4096, deflate_slow)
        /* 9 max compression */
      ];
      var lm_init = (s) => {
        s.window_size = 2 * s.w_size;
        zero(s.head);
        s.max_lazy_match = configuration_table[s.level].max_lazy;
        s.good_match = configuration_table[s.level].good_length;
        s.nice_match = configuration_table[s.level].nice_length;
        s.max_chain_length = configuration_table[s.level].max_chain;
        s.strstart = 0;
        s.block_start = 0;
        s.lookahead = 0;
        s.insert = 0;
        s.match_length = s.prev_length = MIN_MATCH - 1;
        s.match_available = 0;
        s.ins_h = 0;
      };
      function DeflateState() {
        this.strm = null;
        this.status = 0;
        this.pending_buf = null;
        this.pending_buf_size = 0;
        this.pending_out = 0;
        this.pending = 0;
        this.wrap = 0;
        this.gzhead = null;
        this.gzindex = 0;
        this.method = Z_DEFLATED;
        this.last_flush = -1;
        this.w_size = 0;
        this.w_bits = 0;
        this.w_mask = 0;
        this.window = null;
        this.window_size = 0;
        this.prev = null;
        this.head = null;
        this.ins_h = 0;
        this.hash_size = 0;
        this.hash_bits = 0;
        this.hash_mask = 0;
        this.hash_shift = 0;
        this.block_start = 0;
        this.match_length = 0;
        this.prev_match = 0;
        this.match_available = 0;
        this.strstart = 0;
        this.match_start = 0;
        this.lookahead = 0;
        this.prev_length = 0;
        this.max_chain_length = 0;
        this.max_lazy_match = 0;
        this.level = 0;
        this.strategy = 0;
        this.good_match = 0;
        this.nice_match = 0;
        this.dyn_ltree = new Uint16Array(HEAP_SIZE * 2);
        this.dyn_dtree = new Uint16Array((2 * D_CODES + 1) * 2);
        this.bl_tree = new Uint16Array((2 * BL_CODES + 1) * 2);
        zero(this.dyn_ltree);
        zero(this.dyn_dtree);
        zero(this.bl_tree);
        this.l_desc = null;
        this.d_desc = null;
        this.bl_desc = null;
        this.bl_count = new Uint16Array(MAX_BITS + 1);
        this.heap = new Uint16Array(2 * L_CODES + 1);
        zero(this.heap);
        this.heap_len = 0;
        this.heap_max = 0;
        this.depth = new Uint16Array(2 * L_CODES + 1);
        zero(this.depth);
        this.sym_buf = 0;
        this.lit_bufsize = 0;
        this.sym_next = 0;
        this.sym_end = 0;
        this.opt_len = 0;
        this.static_len = 0;
        this.matches = 0;
        this.insert = 0;
        this.bi_buf = 0;
        this.bi_valid = 0;
      }
      var deflateStateCheck = (strm) => {
        if (!strm) {
          return 1;
        }
        const s = strm.state;
        if (!s || s.strm !== strm || s.status !== INIT_STATE && //#ifdef GZIP
        s.status !== GZIP_STATE && //#endif
        s.status !== EXTRA_STATE && s.status !== NAME_STATE && s.status !== COMMENT_STATE && s.status !== HCRC_STATE && s.status !== BUSY_STATE && s.status !== FINISH_STATE) {
          return 1;
        }
        return 0;
      };
      var deflateResetKeep = (strm) => {
        if (deflateStateCheck(strm)) {
          return err(strm, Z_STREAM_ERROR);
        }
        strm.total_in = strm.total_out = 0;
        strm.data_type = Z_UNKNOWN;
        const s = strm.state;
        s.pending = 0;
        s.pending_out = 0;
        if (s.wrap < 0) {
          s.wrap = -s.wrap;
        }
        s.status = //#ifdef GZIP
        s.wrap === 2 ? GZIP_STATE : (
          //#endif
          s.wrap ? INIT_STATE : BUSY_STATE
        );
        strm.adler = s.wrap === 2 ? 0 : 1;
        s.last_flush = -2;
        _tr_init(s);
        return Z_OK;
      };
      var deflateReset = (strm) => {
        const ret = deflateResetKeep(strm);
        if (ret === Z_OK) {
          lm_init(strm.state);
        }
        return ret;
      };
      var deflateSetHeader = (strm, head) => {
        if (deflateStateCheck(strm) || strm.state.wrap !== 2) {
          return Z_STREAM_ERROR;
        }
        strm.state.gzhead = head;
        return Z_OK;
      };
      var deflateInit2 = (strm, level, method, windowBits, memLevel, strategy) => {
        if (!strm) {
          return Z_STREAM_ERROR;
        }
        let wrap = 1;
        if (level === Z_DEFAULT_COMPRESSION) {
          level = 6;
        }
        if (windowBits < 0) {
          wrap = 0;
          windowBits = -windowBits;
        } else if (windowBits > 15) {
          wrap = 2;
          windowBits -= 16;
        }
        if (memLevel < 1 || memLevel > MAX_MEM_LEVEL || method !== Z_DEFLATED || windowBits < 8 || windowBits > 15 || level < 0 || level > 9 || strategy < 0 || strategy > Z_FIXED || windowBits === 8 && wrap !== 1) {
          return err(strm, Z_STREAM_ERROR);
        }
        if (windowBits === 8) {
          windowBits = 9;
        }
        const s = new DeflateState();
        strm.state = s;
        s.strm = strm;
        s.status = INIT_STATE;
        s.wrap = wrap;
        s.gzhead = null;
        s.w_bits = windowBits;
        s.w_size = 1 << s.w_bits;
        s.w_mask = s.w_size - 1;
        s.hash_bits = memLevel + 7;
        s.hash_size = 1 << s.hash_bits;
        s.hash_mask = s.hash_size - 1;
        s.hash_shift = ~~((s.hash_bits + MIN_MATCH - 1) / MIN_MATCH);
        s.window = new Uint8Array(s.w_size * 2);
        s.head = new Uint16Array(s.hash_size);
        s.prev = new Uint16Array(s.w_size);
        s.lit_bufsize = 1 << memLevel + 6;
        s.pending_buf_size = s.lit_bufsize * 4;
        s.pending_buf = new Uint8Array(s.pending_buf_size);
        s.sym_buf = s.lit_bufsize;
        s.sym_end = (s.lit_bufsize - 1) * 3;
        s.level = level;
        s.strategy = strategy;
        s.method = method;
        return deflateReset(strm);
      };
      var deflateInit = (strm, level) => {
        return deflateInit2(strm, level, Z_DEFLATED, MAX_WBITS, DEF_MEM_LEVEL, Z_DEFAULT_STRATEGY);
      };
      var deflate = (strm, flush) => {
        if (deflateStateCheck(strm) || flush > Z_BLOCK || flush < 0) {
          return strm ? err(strm, Z_STREAM_ERROR) : Z_STREAM_ERROR;
        }
        const s = strm.state;
        if (!strm.output || strm.avail_in !== 0 && !strm.input || s.status === FINISH_STATE && flush !== Z_FINISH) {
          return err(strm, strm.avail_out === 0 ? Z_BUF_ERROR : Z_STREAM_ERROR);
        }
        const old_flush = s.last_flush;
        s.last_flush = flush;
        if (s.pending !== 0) {
          flush_pending(strm);
          if (strm.avail_out === 0) {
            s.last_flush = -1;
            return Z_OK;
          }
        } else if (strm.avail_in === 0 && rank(flush) <= rank(old_flush) && flush !== Z_FINISH) {
          return err(strm, Z_BUF_ERROR);
        }
        if (s.status === FINISH_STATE && strm.avail_in !== 0) {
          return err(strm, Z_BUF_ERROR);
        }
        if (s.status === INIT_STATE && s.wrap === 0) {
          s.status = BUSY_STATE;
        }
        if (s.status === INIT_STATE) {
          let header = Z_DEFLATED + (s.w_bits - 8 << 4) << 8;
          let level_flags = -1;
          if (s.strategy >= Z_HUFFMAN_ONLY || s.level < 2) {
            level_flags = 0;
          } else if (s.level < 6) {
            level_flags = 1;
          } else if (s.level === 6) {
            level_flags = 2;
          } else {
            level_flags = 3;
          }
          header |= level_flags << 6;
          if (s.strstart !== 0) {
            header |= PRESET_DICT;
          }
          header += 31 - header % 31;
          putShortMSB(s, header);
          if (s.strstart !== 0) {
            putShortMSB(s, strm.adler >>> 16);
            putShortMSB(s, strm.adler & 65535);
          }
          strm.adler = 1;
          s.status = BUSY_STATE;
          flush_pending(strm);
          if (s.pending !== 0) {
            s.last_flush = -1;
            return Z_OK;
          }
        }
        if (s.status === GZIP_STATE) {
          strm.adler = 0;
          put_byte(s, 31);
          put_byte(s, 139);
          put_byte(s, 8);
          if (!s.gzhead) {
            put_byte(s, 0);
            put_byte(s, 0);
            put_byte(s, 0);
            put_byte(s, 0);
            put_byte(s, 0);
            put_byte(s, s.level === 9 ? 2 : s.strategy >= Z_HUFFMAN_ONLY || s.level < 2 ? 4 : 0);
            put_byte(s, OS_CODE);
            s.status = BUSY_STATE;
            flush_pending(strm);
            if (s.pending !== 0) {
              s.last_flush = -1;
              return Z_OK;
            }
          } else {
            put_byte(
              s,
              (s.gzhead.text ? 1 : 0) + (s.gzhead.hcrc ? 2 : 0) + (!s.gzhead.extra ? 0 : 4) + (!s.gzhead.name ? 0 : 8) + (!s.gzhead.comment ? 0 : 16)
            );
            put_byte(s, s.gzhead.time & 255);
            put_byte(s, s.gzhead.time >> 8 & 255);
            put_byte(s, s.gzhead.time >> 16 & 255);
            put_byte(s, s.gzhead.time >> 24 & 255);
            put_byte(s, s.level === 9 ? 2 : s.strategy >= Z_HUFFMAN_ONLY || s.level < 2 ? 4 : 0);
            put_byte(s, s.gzhead.os & 255);
            if (s.gzhead.extra && s.gzhead.extra.length) {
              put_byte(s, s.gzhead.extra.length & 255);
              put_byte(s, s.gzhead.extra.length >> 8 & 255);
            }
            if (s.gzhead.hcrc) {
              strm.adler = crc32(strm.adler, s.pending_buf, s.pending, 0);
            }
            s.gzindex = 0;
            s.status = EXTRA_STATE;
          }
        }
        if (s.status === EXTRA_STATE) {
          if (s.gzhead.extra) {
            let beg = s.pending;
            let left = (s.gzhead.extra.length & 65535) - s.gzindex;
            while (s.pending + left > s.pending_buf_size) {
              let copy = s.pending_buf_size - s.pending;
              s.pending_buf.set(s.gzhead.extra.subarray(s.gzindex, s.gzindex + copy), s.pending);
              s.pending = s.pending_buf_size;
              if (s.gzhead.hcrc && s.pending > beg) {
                strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
              }
              s.gzindex += copy;
              flush_pending(strm);
              if (s.pending !== 0) {
                s.last_flush = -1;
                return Z_OK;
              }
              beg = 0;
              left -= copy;
            }
            let gzhead_extra = new Uint8Array(s.gzhead.extra);
            s.pending_buf.set(gzhead_extra.subarray(s.gzindex, s.gzindex + left), s.pending);
            s.pending += left;
            if (s.gzhead.hcrc && s.pending > beg) {
              strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
            }
            s.gzindex = 0;
          }
          s.status = NAME_STATE;
        }
        if (s.status === NAME_STATE) {
          if (s.gzhead.name) {
            let beg = s.pending;
            let val;
            do {
              if (s.pending === s.pending_buf_size) {
                if (s.gzhead.hcrc && s.pending > beg) {
                  strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
                }
                flush_pending(strm);
                if (s.pending !== 0) {
                  s.last_flush = -1;
                  return Z_OK;
                }
                beg = 0;
              }
              if (s.gzindex < s.gzhead.name.length) {
                val = s.gzhead.name.charCodeAt(s.gzindex++) & 255;
              } else {
                val = 0;
              }
              put_byte(s, val);
            } while (val !== 0);
            if (s.gzhead.hcrc && s.pending > beg) {
              strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
            }
            s.gzindex = 0;
          }
          s.status = COMMENT_STATE;
        }
        if (s.status === COMMENT_STATE) {
          if (s.gzhead.comment) {
            let beg = s.pending;
            let val;
            do {
              if (s.pending === s.pending_buf_size) {
                if (s.gzhead.hcrc && s.pending > beg) {
                  strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
                }
                flush_pending(strm);
                if (s.pending !== 0) {
                  s.last_flush = -1;
                  return Z_OK;
                }
                beg = 0;
              }
              if (s.gzindex < s.gzhead.comment.length) {
                val = s.gzhead.comment.charCodeAt(s.gzindex++) & 255;
              } else {
                val = 0;
              }
              put_byte(s, val);
            } while (val !== 0);
            if (s.gzhead.hcrc && s.pending > beg) {
              strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
            }
          }
          s.status = HCRC_STATE;
        }
        if (s.status === HCRC_STATE) {
          if (s.gzhead.hcrc) {
            if (s.pending + 2 > s.pending_buf_size) {
              flush_pending(strm);
              if (s.pending !== 0) {
                s.last_flush = -1;
                return Z_OK;
              }
            }
            put_byte(s, strm.adler & 255);
            put_byte(s, strm.adler >> 8 & 255);
            strm.adler = 0;
          }
          s.status = BUSY_STATE;
          flush_pending(strm);
          if (s.pending !== 0) {
            s.last_flush = -1;
            return Z_OK;
          }
        }
        if (strm.avail_in !== 0 || s.lookahead !== 0 || flush !== Z_NO_FLUSH && s.status !== FINISH_STATE) {
          let bstate = s.level === 0 ? deflate_stored(s, flush) : s.strategy === Z_HUFFMAN_ONLY ? deflate_huff(s, flush) : s.strategy === Z_RLE ? deflate_rle(s, flush) : configuration_table[s.level].func(s, flush);
          if (bstate === BS_FINISH_STARTED || bstate === BS_FINISH_DONE) {
            s.status = FINISH_STATE;
          }
          if (bstate === BS_NEED_MORE || bstate === BS_FINISH_STARTED) {
            if (strm.avail_out === 0) {
              s.last_flush = -1;
            }
            return Z_OK;
          }
          if (bstate === BS_BLOCK_DONE) {
            if (flush === Z_PARTIAL_FLUSH) {
              _tr_align(s);
            } else if (flush !== Z_BLOCK) {
              _tr_stored_block(s, 0, 0, false);
              if (flush === Z_FULL_FLUSH) {
                zero(s.head);
                if (s.lookahead === 0) {
                  s.strstart = 0;
                  s.block_start = 0;
                  s.insert = 0;
                }
              }
            }
            flush_pending(strm);
            if (strm.avail_out === 0) {
              s.last_flush = -1;
              return Z_OK;
            }
          }
        }
        if (flush !== Z_FINISH) {
          return Z_OK;
        }
        if (s.wrap <= 0) {
          return Z_STREAM_END;
        }
        if (s.wrap === 2) {
          put_byte(s, strm.adler & 255);
          put_byte(s, strm.adler >> 8 & 255);
          put_byte(s, strm.adler >> 16 & 255);
          put_byte(s, strm.adler >> 24 & 255);
          put_byte(s, strm.total_in & 255);
          put_byte(s, strm.total_in >> 8 & 255);
          put_byte(s, strm.total_in >> 16 & 255);
          put_byte(s, strm.total_in >> 24 & 255);
        } else {
          putShortMSB(s, strm.adler >>> 16);
          putShortMSB(s, strm.adler & 65535);
        }
        flush_pending(strm);
        if (s.wrap > 0) {
          s.wrap = -s.wrap;
        }
        return s.pending !== 0 ? Z_OK : Z_STREAM_END;
      };
      var deflateEnd = (strm) => {
        if (deflateStateCheck(strm)) {
          return Z_STREAM_ERROR;
        }
        const status = strm.state.status;
        strm.state = null;
        return status === BUSY_STATE ? err(strm, Z_DATA_ERROR) : Z_OK;
      };
      var deflateSetDictionary = (strm, dictionary) => {
        let dictLength = dictionary.length;
        if (deflateStateCheck(strm)) {
          return Z_STREAM_ERROR;
        }
        const s = strm.state;
        const wrap = s.wrap;
        if (wrap === 2 || wrap === 1 && s.status !== INIT_STATE || s.lookahead) {
          return Z_STREAM_ERROR;
        }
        if (wrap === 1) {
          strm.adler = adler32(strm.adler, dictionary, dictLength, 0);
        }
        s.wrap = 0;
        if (dictLength >= s.w_size) {
          if (wrap === 0) {
            zero(s.head);
            s.strstart = 0;
            s.block_start = 0;
            s.insert = 0;
          }
          let tmpDict = new Uint8Array(s.w_size);
          tmpDict.set(dictionary.subarray(dictLength - s.w_size, dictLength), 0);
          dictionary = tmpDict;
          dictLength = s.w_size;
        }
        const avail = strm.avail_in;
        const next = strm.next_in;
        const input = strm.input;
        strm.avail_in = dictLength;
        strm.next_in = 0;
        strm.input = dictionary;
        fill_window(s);
        while (s.lookahead >= MIN_MATCH) {
          let str = s.strstart;
          let n = s.lookahead - (MIN_MATCH - 1);
          do {
            s.ins_h = HASH(s, s.ins_h, s.window[str + MIN_MATCH - 1]);
            s.prev[str & s.w_mask] = s.head[s.ins_h];
            s.head[s.ins_h] = str;
            str++;
          } while (--n);
          s.strstart = str;
          s.lookahead = MIN_MATCH - 1;
          fill_window(s);
        }
        s.strstart += s.lookahead;
        s.block_start = s.strstart;
        s.insert = s.lookahead;
        s.lookahead = 0;
        s.match_length = s.prev_length = MIN_MATCH - 1;
        s.match_available = 0;
        strm.next_in = next;
        strm.input = input;
        strm.avail_in = avail;
        s.wrap = wrap;
        return Z_OK;
      };
      module.exports.deflateInit = deflateInit;
      module.exports.deflateInit2 = deflateInit2;
      module.exports.deflateReset = deflateReset;
      module.exports.deflateResetKeep = deflateResetKeep;
      module.exports.deflateSetHeader = deflateSetHeader;
      module.exports.deflate = deflate;
      module.exports.deflateEnd = deflateEnd;
      module.exports.deflateSetDictionary = deflateSetDictionary;
      module.exports.deflateInfo = "pako deflate (from Nodeca project)";
    }
  });

  // node_modules/pako/lib/utils/common.js
  var require_common = __commonJS({
    "node_modules/pako/lib/utils/common.js"(exports, module) {
      "use strict";
      var _has = (obj, key) => {
        return Object.prototype.hasOwnProperty.call(obj, key);
      };
      module.exports.assign = function(obj) {
        const sources = Array.prototype.slice.call(arguments, 1);
        while (sources.length) {
          const source = sources.shift();
          if (!source) {
            continue;
          }
          if (typeof source !== "object") {
            throw new TypeError(source + "must be non-object");
          }
          for (const p in source) {
            if (_has(source, p)) {
              obj[p] = source[p];
            }
          }
        }
        return obj;
      };
      module.exports.flattenChunks = (chunks) => {
        let len = 0;
        for (let i = 0, l = chunks.length; i < l; i++) {
          len += chunks[i].length;
        }
        const result = new Uint8Array(len);
        for (let i = 0, pos = 0, l = chunks.length; i < l; i++) {
          let chunk = chunks[i];
          result.set(chunk, pos);
          pos += chunk.length;
        }
        return result;
      };
    }
  });

  // node_modules/pako/lib/utils/strings.js
  var require_strings = __commonJS({
    "node_modules/pako/lib/utils/strings.js"(exports, module) {
      "use strict";
      var STR_APPLY_UIA_OK = true;
      try {
        String.fromCharCode.apply(null, new Uint8Array(1));
      } catch (__) {
        STR_APPLY_UIA_OK = false;
      }
      var _utf8len = new Uint8Array(256);
      for (let q = 0; q < 256; q++) {
        _utf8len[q] = q >= 252 ? 6 : q >= 248 ? 5 : q >= 240 ? 4 : q >= 224 ? 3 : q >= 192 ? 2 : 1;
      }
      _utf8len[254] = _utf8len[254] = 1;
      module.exports.string2buf = (str) => {
        if (typeof TextEncoder === "function" && TextEncoder.prototype.encode) {
          return new TextEncoder().encode(str);
        }
        let buf, c, c2, m_pos, i, str_len = str.length, buf_len = 0;
        for (m_pos = 0; m_pos < str_len; m_pos++) {
          c = str.charCodeAt(m_pos);
          if ((c & 64512) === 55296 && m_pos + 1 < str_len) {
            c2 = str.charCodeAt(m_pos + 1);
            if ((c2 & 64512) === 56320) {
              c = 65536 + (c - 55296 << 10) + (c2 - 56320);
              m_pos++;
            }
          }
          buf_len += c < 128 ? 1 : c < 2048 ? 2 : c < 65536 ? 3 : 4;
        }
        buf = new Uint8Array(buf_len);
        for (i = 0, m_pos = 0; i < buf_len; m_pos++) {
          c = str.charCodeAt(m_pos);
          if ((c & 64512) === 55296 && m_pos + 1 < str_len) {
            c2 = str.charCodeAt(m_pos + 1);
            if ((c2 & 64512) === 56320) {
              c = 65536 + (c - 55296 << 10) + (c2 - 56320);
              m_pos++;
            }
          }
          if (c < 128) {
            buf[i++] = c;
          } else if (c < 2048) {
            buf[i++] = 192 | c >>> 6;
            buf[i++] = 128 | c & 63;
          } else if (c < 65536) {
            buf[i++] = 224 | c >>> 12;
            buf[i++] = 128 | c >>> 6 & 63;
            buf[i++] = 128 | c & 63;
          } else {
            buf[i++] = 240 | c >>> 18;
            buf[i++] = 128 | c >>> 12 & 63;
            buf[i++] = 128 | c >>> 6 & 63;
            buf[i++] = 128 | c & 63;
          }
        }
        return buf;
      };
      var buf2binstring = (buf, len) => {
        if (len < 65534) {
          if (buf.subarray && STR_APPLY_UIA_OK) {
            return String.fromCharCode.apply(null, buf.length === len ? buf : buf.subarray(0, len));
          }
        }
        let result = "";
        for (let i = 0; i < len; i++) {
          result += String.fromCharCode(buf[i]);
        }
        return result;
      };
      module.exports.buf2string = (buf, max) => {
        const len = max || buf.length;
        if (typeof TextDecoder === "function" && TextDecoder.prototype.decode) {
          return new TextDecoder().decode(buf.subarray(0, max));
        }
        let i, out;
        const utf16buf = new Array(len * 2);
        for (out = 0, i = 0; i < len; ) {
          let c = buf[i++];
          if (c < 128) {
            utf16buf[out++] = c;
            continue;
          }
          let c_len = _utf8len[c];
          if (c_len > 4) {
            utf16buf[out++] = 65533;
            i += c_len - 1;
            continue;
          }
          c &= c_len === 2 ? 31 : c_len === 3 ? 15 : 7;
          while (c_len > 1 && i < len) {
            c = c << 6 | buf[i++] & 63;
            c_len--;
          }
          if (c_len > 1) {
            utf16buf[out++] = 65533;
            continue;
          }
          if (c < 65536) {
            utf16buf[out++] = c;
          } else {
            c -= 65536;
            utf16buf[out++] = 55296 | c >> 10 & 1023;
            utf16buf[out++] = 56320 | c & 1023;
          }
        }
        return buf2binstring(utf16buf, out);
      };
      module.exports.utf8border = (buf, max) => {
        max = max || buf.length;
        if (max > buf.length) {
          max = buf.length;
        }
        let pos = max - 1;
        while (pos >= 0 && (buf[pos] & 192) === 128) {
          pos--;
        }
        if (pos < 0) {
          return max;
        }
        if (pos === 0) {
          return max;
        }
        return pos + _utf8len[buf[pos]] > max ? pos : max;
      };
    }
  });

  // node_modules/pako/lib/zlib/zstream.js
  var require_zstream = __commonJS({
    "node_modules/pako/lib/zlib/zstream.js"(exports, module) {
      "use strict";
      function ZStream() {
        this.input = null;
        this.next_in = 0;
        this.avail_in = 0;
        this.total_in = 0;
        this.output = null;
        this.next_out = 0;
        this.avail_out = 0;
        this.total_out = 0;
        this.msg = "";
        this.state = null;
        this.data_type = 2;
        this.adler = 0;
      }
      module.exports = ZStream;
    }
  });

  // node_modules/pako/lib/deflate.js
  var require_deflate2 = __commonJS({
    "node_modules/pako/lib/deflate.js"(exports, module) {
      "use strict";
      var zlib_deflate = require_deflate();
      var utils = require_common();
      var strings = require_strings();
      var msg = require_messages();
      var ZStream = require_zstream();
      var toString = Object.prototype.toString;
      var {
        Z_NO_FLUSH,
        Z_SYNC_FLUSH,
        Z_FULL_FLUSH,
        Z_FINISH,
        Z_OK,
        Z_STREAM_END,
        Z_DEFAULT_COMPRESSION,
        Z_DEFAULT_STRATEGY,
        Z_DEFLATED
      } = require_constants();
      function Deflate(options) {
        this.options = utils.assign({
          level: Z_DEFAULT_COMPRESSION,
          method: Z_DEFLATED,
          chunkSize: 16384,
          windowBits: 15,
          memLevel: 8,
          strategy: Z_DEFAULT_STRATEGY
        }, options || {});
        let opt = this.options;
        if (opt.raw && opt.windowBits > 0) {
          opt.windowBits = -opt.windowBits;
        } else if (opt.gzip && opt.windowBits > 0 && opt.windowBits < 16) {
          opt.windowBits += 16;
        }
        this.err = 0;
        this.msg = "";
        this.ended = false;
        this.chunks = [];
        this.strm = new ZStream();
        this.strm.avail_out = 0;
        let status = zlib_deflate.deflateInit2(
          this.strm,
          opt.level,
          opt.method,
          opt.windowBits,
          opt.memLevel,
          opt.strategy
        );
        if (status !== Z_OK) {
          throw new Error(msg[status]);
        }
        if (opt.header) {
          zlib_deflate.deflateSetHeader(this.strm, opt.header);
        }
        if (opt.dictionary) {
          let dict;
          if (typeof opt.dictionary === "string") {
            dict = strings.string2buf(opt.dictionary);
          } else if (toString.call(opt.dictionary) === "[object ArrayBuffer]") {
            dict = new Uint8Array(opt.dictionary);
          } else {
            dict = opt.dictionary;
          }
          status = zlib_deflate.deflateSetDictionary(this.strm, dict);
          if (status !== Z_OK) {
            throw new Error(msg[status]);
          }
          this._dict_set = true;
        }
      }
      Deflate.prototype.push = function(data, flush_mode) {
        const strm = this.strm;
        const chunkSize = this.options.chunkSize;
        let status, _flush_mode;
        if (this.ended) {
          return false;
        }
        if (flush_mode === ~~flush_mode) _flush_mode = flush_mode;
        else _flush_mode = flush_mode === true ? Z_FINISH : Z_NO_FLUSH;
        if (typeof data === "string") {
          strm.input = strings.string2buf(data);
        } else if (toString.call(data) === "[object ArrayBuffer]") {
          strm.input = new Uint8Array(data);
        } else {
          strm.input = data;
        }
        strm.next_in = 0;
        strm.avail_in = strm.input.length;
        for (; ; ) {
          if (strm.avail_out === 0) {
            strm.output = new Uint8Array(chunkSize);
            strm.next_out = 0;
            strm.avail_out = chunkSize;
          }
          if ((_flush_mode === Z_SYNC_FLUSH || _flush_mode === Z_FULL_FLUSH) && strm.avail_out <= 6) {
            this.onData(strm.output.subarray(0, strm.next_out));
            strm.avail_out = 0;
            continue;
          }
          status = zlib_deflate.deflate(strm, _flush_mode);
          if (status === Z_STREAM_END) {
            if (strm.next_out > 0) {
              this.onData(strm.output.subarray(0, strm.next_out));
            }
            status = zlib_deflate.deflateEnd(this.strm);
            this.onEnd(status);
            this.ended = true;
            return status === Z_OK;
          }
          if (strm.avail_out === 0) {
            this.onData(strm.output);
            continue;
          }
          if (_flush_mode > 0 && strm.next_out > 0) {
            this.onData(strm.output.subarray(0, strm.next_out));
            strm.avail_out = 0;
            continue;
          }
          if (strm.avail_in === 0) break;
        }
        return true;
      };
      Deflate.prototype.onData = function(chunk) {
        this.chunks.push(chunk);
      };
      Deflate.prototype.onEnd = function(status) {
        if (status === Z_OK) {
          this.result = utils.flattenChunks(this.chunks);
        }
        this.chunks = [];
        this.err = status;
        this.msg = this.strm.msg;
      };
      function deflate(input, options) {
        const deflator = new Deflate(options);
        deflator.push(input, true);
        if (deflator.err) {
          throw deflator.msg || msg[deflator.err];
        }
        return deflator.result;
      }
      function deflateRaw(input, options) {
        options = options || {};
        options.raw = true;
        return deflate(input, options);
      }
      function gzip(input, options) {
        options = options || {};
        options.gzip = true;
        return deflate(input, options);
      }
      module.exports.Deflate = Deflate;
      module.exports.deflate = deflate;
      module.exports.deflateRaw = deflateRaw;
      module.exports.gzip = gzip;
      module.exports.constants = require_constants();
    }
  });

  // node_modules/pako/lib/zlib/inffast.js
  var require_inffast = __commonJS({
    "node_modules/pako/lib/zlib/inffast.js"(exports, module) {
      "use strict";
      var BAD = 16209;
      var TYPE = 16191;
      module.exports = function inflate_fast(strm, start) {
        let _in;
        let last;
        let _out;
        let beg;
        let end;
        let dmax;
        let wsize;
        let whave;
        let wnext;
        let s_window;
        let hold;
        let bits;
        let lcode;
        let dcode;
        let lmask;
        let dmask;
        let here;
        let op;
        let len;
        let dist;
        let from;
        let from_source;
        let input, output;
        const state = strm.state;
        _in = strm.next_in;
        input = strm.input;
        last = _in + (strm.avail_in - 5);
        _out = strm.next_out;
        output = strm.output;
        beg = _out - (start - strm.avail_out);
        end = _out + (strm.avail_out - 257);
        dmax = state.dmax;
        wsize = state.wsize;
        whave = state.whave;
        wnext = state.wnext;
        s_window = state.window;
        hold = state.hold;
        bits = state.bits;
        lcode = state.lencode;
        dcode = state.distcode;
        lmask = (1 << state.lenbits) - 1;
        dmask = (1 << state.distbits) - 1;
        top:
          do {
            if (bits < 15) {
              hold += input[_in++] << bits;
              bits += 8;
              hold += input[_in++] << bits;
              bits += 8;
            }
            here = lcode[hold & lmask];
            dolen:
              for (; ; ) {
                op = here >>> 24;
                hold >>>= op;
                bits -= op;
                op = here >>> 16 & 255;
                if (op === 0) {
                  output[_out++] = here & 65535;
                } else if (op & 16) {
                  len = here & 65535;
                  op &= 15;
                  if (op) {
                    if (bits < op) {
                      hold += input[_in++] << bits;
                      bits += 8;
                    }
                    len += hold & (1 << op) - 1;
                    hold >>>= op;
                    bits -= op;
                  }
                  if (bits < 15) {
                    hold += input[_in++] << bits;
                    bits += 8;
                    hold += input[_in++] << bits;
                    bits += 8;
                  }
                  here = dcode[hold & dmask];
                  dodist:
                    for (; ; ) {
                      op = here >>> 24;
                      hold >>>= op;
                      bits -= op;
                      op = here >>> 16 & 255;
                      if (op & 16) {
                        dist = here & 65535;
                        op &= 15;
                        if (bits < op) {
                          hold += input[_in++] << bits;
                          bits += 8;
                          if (bits < op) {
                            hold += input[_in++] << bits;
                            bits += 8;
                          }
                        }
                        dist += hold & (1 << op) - 1;
                        if (dist > dmax) {
                          strm.msg = "invalid distance too far back";
                          state.mode = BAD;
                          break top;
                        }
                        hold >>>= op;
                        bits -= op;
                        op = _out - beg;
                        if (dist > op) {
                          op = dist - op;
                          if (op > whave) {
                            if (state.sane) {
                              strm.msg = "invalid distance too far back";
                              state.mode = BAD;
                              break top;
                            }
                          }
                          from = 0;
                          from_source = s_window;
                          if (wnext === 0) {
                            from += wsize - op;
                            if (op < len) {
                              len -= op;
                              do {
                                output[_out++] = s_window[from++];
                              } while (--op);
                              from = _out - dist;
                              from_source = output;
                            }
                          } else if (wnext < op) {
                            from += wsize + wnext - op;
                            op -= wnext;
                            if (op < len) {
                              len -= op;
                              do {
                                output[_out++] = s_window[from++];
                              } while (--op);
                              from = 0;
                              if (wnext < len) {
                                op = wnext;
                                len -= op;
                                do {
                                  output[_out++] = s_window[from++];
                                } while (--op);
                                from = _out - dist;
                                from_source = output;
                              }
                            }
                          } else {
                            from += wnext - op;
                            if (op < len) {
                              len -= op;
                              do {
                                output[_out++] = s_window[from++];
                              } while (--op);
                              from = _out - dist;
                              from_source = output;
                            }
                          }
                          while (len > 2) {
                            output[_out++] = from_source[from++];
                            output[_out++] = from_source[from++];
                            output[_out++] = from_source[from++];
                            len -= 3;
                          }
                          if (len) {
                            output[_out++] = from_source[from++];
                            if (len > 1) {
                              output[_out++] = from_source[from++];
                            }
                          }
                        } else {
                          from = _out - dist;
                          do {
                            output[_out++] = output[from++];
                            output[_out++] = output[from++];
                            output[_out++] = output[from++];
                            len -= 3;
                          } while (len > 2);
                          if (len) {
                            output[_out++] = output[from++];
                            if (len > 1) {
                              output[_out++] = output[from++];
                            }
                          }
                        }
                      } else if ((op & 64) === 0) {
                        here = dcode[(here & 65535) + (hold & (1 << op) - 1)];
                        continue dodist;
                      } else {
                        strm.msg = "invalid distance code";
                        state.mode = BAD;
                        break top;
                      }
                      break;
                    }
                } else if ((op & 64) === 0) {
                  here = lcode[(here & 65535) + (hold & (1 << op) - 1)];
                  continue dolen;
                } else if (op & 32) {
                  state.mode = TYPE;
                  break top;
                } else {
                  strm.msg = "invalid literal/length code";
                  state.mode = BAD;
                  break top;
                }
                break;
              }
          } while (_in < last && _out < end);
        len = bits >> 3;
        _in -= len;
        bits -= len << 3;
        hold &= (1 << bits) - 1;
        strm.next_in = _in;
        strm.next_out = _out;
        strm.avail_in = _in < last ? 5 + (last - _in) : 5 - (_in - last);
        strm.avail_out = _out < end ? 257 + (end - _out) : 257 - (_out - end);
        state.hold = hold;
        state.bits = bits;
        return;
      };
    }
  });

  // node_modules/pako/lib/zlib/inftrees.js
  var require_inftrees = __commonJS({
    "node_modules/pako/lib/zlib/inftrees.js"(exports, module) {
      "use strict";
      var MAXBITS = 15;
      var ENOUGH_LENS = 852;
      var ENOUGH_DISTS = 592;
      var CODES = 0;
      var LENS = 1;
      var DISTS = 2;
      var lbase = new Uint16Array([
        /* Length codes 257..285 base */
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        13,
        15,
        17,
        19,
        23,
        27,
        31,
        35,
        43,
        51,
        59,
        67,
        83,
        99,
        115,
        131,
        163,
        195,
        227,
        258,
        0,
        0
      ]);
      var lext = new Uint8Array([
        /* Length codes 257..285 extra */
        16,
        16,
        16,
        16,
        16,
        16,
        16,
        16,
        17,
        17,
        17,
        17,
        18,
        18,
        18,
        18,
        19,
        19,
        19,
        19,
        20,
        20,
        20,
        20,
        21,
        21,
        21,
        21,
        16,
        72,
        78
      ]);
      var dbase = new Uint16Array([
        /* Distance codes 0..29 base */
        1,
        2,
        3,
        4,
        5,
        7,
        9,
        13,
        17,
        25,
        33,
        49,
        65,
        97,
        129,
        193,
        257,
        385,
        513,
        769,
        1025,
        1537,
        2049,
        3073,
        4097,
        6145,
        8193,
        12289,
        16385,
        24577,
        0,
        0
      ]);
      var dext = new Uint8Array([
        /* Distance codes 0..29 extra */
        16,
        16,
        16,
        16,
        17,
        17,
        18,
        18,
        19,
        19,
        20,
        20,
        21,
        21,
        22,
        22,
        23,
        23,
        24,
        24,
        25,
        25,
        26,
        26,
        27,
        27,
        28,
        28,
        29,
        29,
        64,
        64
      ]);
      var inflate_table = (type, lens, lens_index, codes, table, table_index, work, opts) => {
        const bits = opts.bits;
        let len = 0;
        let sym = 0;
        let min = 0, max = 0;
        let root = 0;
        let curr = 0;
        let drop = 0;
        let left = 0;
        let used = 0;
        let huff = 0;
        let incr;
        let fill;
        let low;
        let mask;
        let next;
        let base = null;
        let match;
        const count = new Uint16Array(MAXBITS + 1);
        const offs = new Uint16Array(MAXBITS + 1);
        let extra = null;
        let here_bits, here_op, here_val;
        for (len = 0; len <= MAXBITS; len++) {
          count[len] = 0;
        }
        for (sym = 0; sym < codes; sym++) {
          count[lens[lens_index + sym]]++;
        }
        root = bits;
        for (max = MAXBITS; max >= 1; max--) {
          if (count[max] !== 0) {
            break;
          }
        }
        if (root > max) {
          root = max;
        }
        if (max === 0) {
          table[table_index++] = 1 << 24 | 64 << 16 | 0;
          table[table_index++] = 1 << 24 | 64 << 16 | 0;
          opts.bits = 1;
          return 0;
        }
        for (min = 1; min < max; min++) {
          if (count[min] !== 0) {
            break;
          }
        }
        if (root < min) {
          root = min;
        }
        left = 1;
        for (len = 1; len <= MAXBITS; len++) {
          left <<= 1;
          left -= count[len];
          if (left < 0) {
            return -1;
          }
        }
        if (left > 0 && (type === CODES || max !== 1)) {
          return -1;
        }
        offs[1] = 0;
        for (len = 1; len < MAXBITS; len++) {
          offs[len + 1] = offs[len] + count[len];
        }
        for (sym = 0; sym < codes; sym++) {
          if (lens[lens_index + sym] !== 0) {
            work[offs[lens[lens_index + sym]]++] = sym;
          }
        }
        if (type === CODES) {
          base = extra = work;
          match = 20;
        } else if (type === LENS) {
          base = lbase;
          extra = lext;
          match = 257;
        } else {
          base = dbase;
          extra = dext;
          match = 0;
        }
        huff = 0;
        sym = 0;
        len = min;
        next = table_index;
        curr = root;
        drop = 0;
        low = -1;
        used = 1 << root;
        mask = used - 1;
        if (type === LENS && used > ENOUGH_LENS || type === DISTS && used > ENOUGH_DISTS) {
          return 1;
        }
        for (; ; ) {
          here_bits = len - drop;
          if (work[sym] + 1 < match) {
            here_op = 0;
            here_val = work[sym];
          } else if (work[sym] >= match) {
            here_op = extra[work[sym] - match];
            here_val = base[work[sym] - match];
          } else {
            here_op = 32 + 64;
            here_val = 0;
          }
          incr = 1 << len - drop;
          fill = 1 << curr;
          min = fill;
          do {
            fill -= incr;
            table[next + (huff >> drop) + fill] = here_bits << 24 | here_op << 16 | here_val | 0;
          } while (fill !== 0);
          incr = 1 << len - 1;
          while (huff & incr) {
            incr >>= 1;
          }
          if (incr !== 0) {
            huff &= incr - 1;
            huff += incr;
          } else {
            huff = 0;
          }
          sym++;
          if (--count[len] === 0) {
            if (len === max) {
              break;
            }
            len = lens[lens_index + work[sym]];
          }
          if (len > root && (huff & mask) !== low) {
            if (drop === 0) {
              drop = root;
            }
            next += min;
            curr = len - drop;
            left = 1 << curr;
            while (curr + drop < max) {
              left -= count[curr + drop];
              if (left <= 0) {
                break;
              }
              curr++;
              left <<= 1;
            }
            used += 1 << curr;
            if (type === LENS && used > ENOUGH_LENS || type === DISTS && used > ENOUGH_DISTS) {
              return 1;
            }
            low = huff & mask;
            table[low] = root << 24 | curr << 16 | next - table_index | 0;
          }
        }
        if (huff !== 0) {
          table[next + huff] = len - drop << 24 | 64 << 16 | 0;
        }
        opts.bits = root;
        return 0;
      };
      module.exports = inflate_table;
    }
  });

  // node_modules/pako/lib/zlib/inflate.js
  var require_inflate = __commonJS({
    "node_modules/pako/lib/zlib/inflate.js"(exports, module) {
      "use strict";
      var adler32 = require_adler32();
      var crc32 = require_crc32();
      var inflate_fast = require_inffast();
      var inflate_table = require_inftrees();
      var CODES = 0;
      var LENS = 1;
      var DISTS = 2;
      var {
        Z_FINISH,
        Z_BLOCK,
        Z_TREES,
        Z_OK,
        Z_STREAM_END,
        Z_NEED_DICT,
        Z_STREAM_ERROR,
        Z_DATA_ERROR,
        Z_MEM_ERROR,
        Z_BUF_ERROR,
        Z_DEFLATED
      } = require_constants();
      var HEAD = 16180;
      var FLAGS = 16181;
      var TIME = 16182;
      var OS = 16183;
      var EXLEN = 16184;
      var EXTRA = 16185;
      var NAME = 16186;
      var COMMENT = 16187;
      var HCRC = 16188;
      var DICTID = 16189;
      var DICT = 16190;
      var TYPE = 16191;
      var TYPEDO = 16192;
      var STORED = 16193;
      var COPY_ = 16194;
      var COPY = 16195;
      var TABLE = 16196;
      var LENLENS = 16197;
      var CODELENS = 16198;
      var LEN_ = 16199;
      var LEN = 16200;
      var LENEXT = 16201;
      var DIST = 16202;
      var DISTEXT = 16203;
      var MATCH = 16204;
      var LIT = 16205;
      var CHECK = 16206;
      var LENGTH = 16207;
      var DONE = 16208;
      var BAD = 16209;
      var MEM = 16210;
      var SYNC = 16211;
      var ENOUGH_LENS = 852;
      var ENOUGH_DISTS = 592;
      var MAX_WBITS = 15;
      var DEF_WBITS = MAX_WBITS;
      var zswap32 = (q) => {
        return (q >>> 24 & 255) + (q >>> 8 & 65280) + ((q & 65280) << 8) + ((q & 255) << 24);
      };
      function InflateState() {
        this.strm = null;
        this.mode = 0;
        this.last = false;
        this.wrap = 0;
        this.havedict = false;
        this.flags = 0;
        this.dmax = 0;
        this.check = 0;
        this.total = 0;
        this.head = null;
        this.wbits = 0;
        this.wsize = 0;
        this.whave = 0;
        this.wnext = 0;
        this.window = null;
        this.hold = 0;
        this.bits = 0;
        this.length = 0;
        this.offset = 0;
        this.extra = 0;
        this.lencode = null;
        this.distcode = null;
        this.lenbits = 0;
        this.distbits = 0;
        this.ncode = 0;
        this.nlen = 0;
        this.ndist = 0;
        this.have = 0;
        this.next = null;
        this.lens = new Uint16Array(320);
        this.work = new Uint16Array(288);
        this.lendyn = null;
        this.distdyn = null;
        this.sane = 0;
        this.back = 0;
        this.was = 0;
      }
      var inflateStateCheck = (strm) => {
        if (!strm) {
          return 1;
        }
        const state = strm.state;
        if (!state || state.strm !== strm || state.mode < HEAD || state.mode > SYNC) {
          return 1;
        }
        return 0;
      };
      var inflateResetKeep = (strm) => {
        if (inflateStateCheck(strm)) {
          return Z_STREAM_ERROR;
        }
        const state = strm.state;
        strm.total_in = strm.total_out = state.total = 0;
        strm.msg = "";
        if (state.wrap) {
          strm.adler = state.wrap & 1;
        }
        state.mode = HEAD;
        state.last = 0;
        state.havedict = 0;
        state.flags = -1;
        state.dmax = 32768;
        state.head = null;
        state.hold = 0;
        state.bits = 0;
        state.lencode = state.lendyn = new Int32Array(ENOUGH_LENS);
        state.distcode = state.distdyn = new Int32Array(ENOUGH_DISTS);
        state.sane = 1;
        state.back = -1;
        return Z_OK;
      };
      var inflateReset = (strm) => {
        if (inflateStateCheck(strm)) {
          return Z_STREAM_ERROR;
        }
        const state = strm.state;
        state.wsize = 0;
        state.whave = 0;
        state.wnext = 0;
        return inflateResetKeep(strm);
      };
      var inflateReset2 = (strm, windowBits) => {
        let wrap;
        if (inflateStateCheck(strm)) {
          return Z_STREAM_ERROR;
        }
        const state = strm.state;
        if (windowBits < 0) {
          wrap = 0;
          windowBits = -windowBits;
        } else {
          wrap = (windowBits >> 4) + 5;
          if (windowBits < 48) {
            windowBits &= 15;
          }
        }
        if (windowBits && (windowBits < 8 || windowBits > 15)) {
          return Z_STREAM_ERROR;
        }
        if (state.window !== null && state.wbits !== windowBits) {
          state.window = null;
        }
        state.wrap = wrap;
        state.wbits = windowBits;
        return inflateReset(strm);
      };
      var inflateInit2 = (strm, windowBits) => {
        if (!strm) {
          return Z_STREAM_ERROR;
        }
        const state = new InflateState();
        strm.state = state;
        state.strm = strm;
        state.window = null;
        state.mode = HEAD;
        const ret = inflateReset2(strm, windowBits);
        if (ret !== Z_OK) {
          strm.state = null;
        }
        return ret;
      };
      var inflateInit = (strm) => {
        return inflateInit2(strm, DEF_WBITS);
      };
      var virgin = true;
      var lenfix;
      var distfix;
      var fixedtables = (state) => {
        if (virgin) {
          lenfix = new Int32Array(512);
          distfix = new Int32Array(32);
          let sym = 0;
          while (sym < 144) {
            state.lens[sym++] = 8;
          }
          while (sym < 256) {
            state.lens[sym++] = 9;
          }
          while (sym < 280) {
            state.lens[sym++] = 7;
          }
          while (sym < 288) {
            state.lens[sym++] = 8;
          }
          inflate_table(LENS, state.lens, 0, 288, lenfix, 0, state.work, { bits: 9 });
          sym = 0;
          while (sym < 32) {
            state.lens[sym++] = 5;
          }
          inflate_table(DISTS, state.lens, 0, 32, distfix, 0, state.work, { bits: 5 });
          virgin = false;
        }
        state.lencode = lenfix;
        state.lenbits = 9;
        state.distcode = distfix;
        state.distbits = 5;
      };
      var updatewindow = (strm, src, end, copy) => {
        let dist;
        const state = strm.state;
        if (state.window === null) {
          state.wsize = 1 << state.wbits;
          state.wnext = 0;
          state.whave = 0;
          state.window = new Uint8Array(state.wsize);
        }
        if (copy >= state.wsize) {
          state.window.set(src.subarray(end - state.wsize, end), 0);
          state.wnext = 0;
          state.whave = state.wsize;
        } else {
          dist = state.wsize - state.wnext;
          if (dist > copy) {
            dist = copy;
          }
          state.window.set(src.subarray(end - copy, end - copy + dist), state.wnext);
          copy -= dist;
          if (copy) {
            state.window.set(src.subarray(end - copy, end), 0);
            state.wnext = copy;
            state.whave = state.wsize;
          } else {
            state.wnext += dist;
            if (state.wnext === state.wsize) {
              state.wnext = 0;
            }
            if (state.whave < state.wsize) {
              state.whave += dist;
            }
          }
        }
        return 0;
      };
      var inflate = (strm, flush) => {
        let state;
        let input, output;
        let next;
        let put;
        let have, left;
        let hold;
        let bits;
        let _in, _out;
        let copy;
        let from;
        let from_source;
        let here = 0;
        let here_bits, here_op, here_val;
        let last_bits, last_op, last_val;
        let len;
        let ret;
        const hbuf = new Uint8Array(4);
        let opts;
        let n;
        const order = (
          /* permutation of code lengths */
          new Uint8Array([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15])
        );
        if (inflateStateCheck(strm) || !strm.output || !strm.input && strm.avail_in !== 0) {
          return Z_STREAM_ERROR;
        }
        state = strm.state;
        if (state.mode === TYPE) {
          state.mode = TYPEDO;
        }
        put = strm.next_out;
        output = strm.output;
        left = strm.avail_out;
        next = strm.next_in;
        input = strm.input;
        have = strm.avail_in;
        hold = state.hold;
        bits = state.bits;
        _in = have;
        _out = left;
        ret = Z_OK;
        inf_leave:
          for (; ; ) {
            switch (state.mode) {
              case HEAD:
                if (state.wrap === 0) {
                  state.mode = TYPEDO;
                  break;
                }
                while (bits < 16) {
                  if (have === 0) {
                    break inf_leave;
                  }
                  have--;
                  hold += input[next++] << bits;
                  bits += 8;
                }
                if (state.wrap & 2 && hold === 35615) {
                  if (state.wbits === 0) {
                    state.wbits = 15;
                  }
                  state.check = 0;
                  hbuf[0] = hold & 255;
                  hbuf[1] = hold >>> 8 & 255;
                  state.check = crc32(state.check, hbuf, 2, 0);
                  hold = 0;
                  bits = 0;
                  state.mode = FLAGS;
                  break;
                }
                if (state.head) {
                  state.head.done = false;
                }
                if (!(state.wrap & 1) || /* check if zlib header allowed */
                (((hold & 255) << 8) + (hold >> 8)) % 31) {
                  strm.msg = "incorrect header check";
                  state.mode = BAD;
                  break;
                }
                if ((hold & 15) !== Z_DEFLATED) {
                  strm.msg = "unknown compression method";
                  state.mode = BAD;
                  break;
                }
                hold >>>= 4;
                bits -= 4;
                len = (hold & 15) + 8;
                if (state.wbits === 0) {
                  state.wbits = len;
                }
                if (len > 15 || len > state.wbits) {
                  strm.msg = "invalid window size";
                  state.mode = BAD;
                  break;
                }
                state.dmax = 1 << state.wbits;
                state.flags = 0;
                strm.adler = state.check = 1;
                state.mode = hold & 512 ? DICTID : TYPE;
                hold = 0;
                bits = 0;
                break;
              case FLAGS:
                while (bits < 16) {
                  if (have === 0) {
                    break inf_leave;
                  }
                  have--;
                  hold += input[next++] << bits;
                  bits += 8;
                }
                state.flags = hold;
                if ((state.flags & 255) !== Z_DEFLATED) {
                  strm.msg = "unknown compression method";
                  state.mode = BAD;
                  break;
                }
                if (state.flags & 57344) {
                  strm.msg = "unknown header flags set";
                  state.mode = BAD;
                  break;
                }
                if (state.head) {
                  state.head.text = hold >> 8 & 1;
                }
                if (state.flags & 512 && state.wrap & 4) {
                  hbuf[0] = hold & 255;
                  hbuf[1] = hold >>> 8 & 255;
                  state.check = crc32(state.check, hbuf, 2, 0);
                }
                hold = 0;
                bits = 0;
                state.mode = TIME;
              /* falls through */
              case TIME:
                while (bits < 32) {
                  if (have === 0) {
                    break inf_leave;
                  }
                  have--;
                  hold += input[next++] << bits;
                  bits += 8;
                }
                if (state.head) {
                  state.head.time = hold;
                }
                if (state.flags & 512 && state.wrap & 4) {
                  hbuf[0] = hold & 255;
                  hbuf[1] = hold >>> 8 & 255;
                  hbuf[2] = hold >>> 16 & 255;
                  hbuf[3] = hold >>> 24 & 255;
                  state.check = crc32(state.check, hbuf, 4, 0);
                }
                hold = 0;
                bits = 0;
                state.mode = OS;
              /* falls through */
              case OS:
                while (bits < 16) {
                  if (have === 0) {
                    break inf_leave;
                  }
                  have--;
                  hold += input[next++] << bits;
                  bits += 8;
                }
                if (state.head) {
                  state.head.xflags = hold & 255;
                  state.head.os = hold >> 8;
                }
                if (state.flags & 512 && state.wrap & 4) {
                  hbuf[0] = hold & 255;
                  hbuf[1] = hold >>> 8 & 255;
                  state.check = crc32(state.check, hbuf, 2, 0);
                }
                hold = 0;
                bits = 0;
                state.mode = EXLEN;
              /* falls through */
              case EXLEN:
                if (state.flags & 1024) {
                  while (bits < 16) {
                    if (have === 0) {
                      break inf_leave;
                    }
                    have--;
                    hold += input[next++] << bits;
                    bits += 8;
                  }
                  state.length = hold;
                  if (state.head) {
                    state.head.extra_len = hold;
                  }
                  if (state.flags & 512 && state.wrap & 4) {
                    hbuf[0] = hold & 255;
                    hbuf[1] = hold >>> 8 & 255;
                    state.check = crc32(state.check, hbuf, 2, 0);
                  }
                  hold = 0;
                  bits = 0;
                } else if (state.head) {
                  state.head.extra = null;
                }
                state.mode = EXTRA;
              /* falls through */
              case EXTRA:
                if (state.flags & 1024) {
                  copy = state.length;
                  if (copy > have) {
                    copy = have;
                  }
                  if (copy) {
                    if (state.head) {
                      len = state.head.extra_len - state.length;
                      if (!state.head.extra) {
                        state.head.extra = new Uint8Array(state.head.extra_len);
                      }
                      state.head.extra.set(
                        input.subarray(
                          next,
                          // extra field is limited to 65536 bytes
                          // - no need for additional size check
                          next + copy
                        ),
                        /*len + copy > state.head.extra_max - len ? state.head.extra_max : copy,*/
                        len
                      );
                    }
                    if (state.flags & 512 && state.wrap & 4) {
                      state.check = crc32(state.check, input, copy, next);
                    }
                    have -= copy;
                    next += copy;
                    state.length -= copy;
                  }
                  if (state.length) {
                    break inf_leave;
                  }
                }
                state.length = 0;
                state.mode = NAME;
              /* falls through */
              case NAME:
                if (state.flags & 2048) {
                  if (have === 0) {
                    break inf_leave;
                  }
                  copy = 0;
                  do {
                    len = input[next + copy++];
                    if (state.head && len && state.length < 65536) {
                      state.head.name += String.fromCharCode(len);
                    }
                  } while (len && copy < have);
                  if (state.flags & 512 && state.wrap & 4) {
                    state.check = crc32(state.check, input, copy, next);
                  }
                  have -= copy;
                  next += copy;
                  if (len) {
                    break inf_leave;
                  }
                } else if (state.head) {
                  state.head.name = null;
                }
                state.length = 0;
                state.mode = COMMENT;
              /* falls through */
              case COMMENT:
                if (state.flags & 4096) {
                  if (have === 0) {
                    break inf_leave;
                  }
                  copy = 0;
                  do {
                    len = input[next + copy++];
                    if (state.head && len && state.length < 65536) {
                      state.head.comment += String.fromCharCode(len);
                    }
                  } while (len && copy < have);
                  if (state.flags & 512 && state.wrap & 4) {
                    state.check = crc32(state.check, input, copy, next);
                  }
                  have -= copy;
                  next += copy;
                  if (len) {
                    break inf_leave;
                  }
                } else if (state.head) {
                  state.head.comment = null;
                }
                state.mode = HCRC;
              /* falls through */
              case HCRC:
                if (state.flags & 512) {
                  while (bits < 16) {
                    if (have === 0) {
                      break inf_leave;
                    }
                    have--;
                    hold += input[next++] << bits;
                    bits += 8;
                  }
                  if (state.wrap & 4 && hold !== (state.check & 65535)) {
                    strm.msg = "header crc mismatch";
                    state.mode = BAD;
                    break;
                  }
                  hold = 0;
                  bits = 0;
                }
                if (state.head) {
                  state.head.hcrc = state.flags >> 9 & 1;
                  state.head.done = true;
                }
                strm.adler = state.check = 0;
                state.mode = TYPE;
                break;
              case DICTID:
                while (bits < 32) {
                  if (have === 0) {
                    break inf_leave;
                  }
                  have--;
                  hold += input[next++] << bits;
                  bits += 8;
                }
                strm.adler = state.check = zswap32(hold);
                hold = 0;
                bits = 0;
                state.mode = DICT;
              /* falls through */
              case DICT:
                if (state.havedict === 0) {
                  strm.next_out = put;
                  strm.avail_out = left;
                  strm.next_in = next;
                  strm.avail_in = have;
                  state.hold = hold;
                  state.bits = bits;
                  return Z_NEED_DICT;
                }
                strm.adler = state.check = 1;
                state.mode = TYPE;
              /* falls through */
              case TYPE:
                if (flush === Z_BLOCK || flush === Z_TREES) {
                  break inf_leave;
                }
              /* falls through */
              case TYPEDO:
                if (state.last) {
                  hold >>>= bits & 7;
                  bits -= bits & 7;
                  state.mode = CHECK;
                  break;
                }
                while (bits < 3) {
                  if (have === 0) {
                    break inf_leave;
                  }
                  have--;
                  hold += input[next++] << bits;
                  bits += 8;
                }
                state.last = hold & 1;
                hold >>>= 1;
                bits -= 1;
                switch (hold & 3) {
                  case 0:
                    state.mode = STORED;
                    break;
                  case 1:
                    fixedtables(state);
                    state.mode = LEN_;
                    if (flush === Z_TREES) {
                      hold >>>= 2;
                      bits -= 2;
                      break inf_leave;
                    }
                    break;
                  case 2:
                    state.mode = TABLE;
                    break;
                  case 3:
                    strm.msg = "invalid block type";
                    state.mode = BAD;
                }
                hold >>>= 2;
                bits -= 2;
                break;
              case STORED:
                hold >>>= bits & 7;
                bits -= bits & 7;
                while (bits < 32) {
                  if (have === 0) {
                    break inf_leave;
                  }
                  have--;
                  hold += input[next++] << bits;
                  bits += 8;
                }
                if ((hold & 65535) !== (hold >>> 16 ^ 65535)) {
                  strm.msg = "invalid stored block lengths";
                  state.mode = BAD;
                  break;
                }
                state.length = hold & 65535;
                hold = 0;
                bits = 0;
                state.mode = COPY_;
                if (flush === Z_TREES) {
                  break inf_leave;
                }
              /* falls through */
              case COPY_:
                state.mode = COPY;
              /* falls through */
              case COPY:
                copy = state.length;
                if (copy) {
                  if (copy > have) {
                    copy = have;
                  }
                  if (copy > left) {
                    copy = left;
                  }
                  if (copy === 0) {
                    break inf_leave;
                  }
                  output.set(input.subarray(next, next + copy), put);
                  have -= copy;
                  next += copy;
                  left -= copy;
                  put += copy;
                  state.length -= copy;
                  break;
                }
                state.mode = TYPE;
                break;
              case TABLE:
                while (bits < 14) {
                  if (have === 0) {
                    break inf_leave;
                  }
                  have--;
                  hold += input[next++] << bits;
                  bits += 8;
                }
                state.nlen = (hold & 31) + 257;
                hold >>>= 5;
                bits -= 5;
                state.ndist = (hold & 31) + 1;
                hold >>>= 5;
                bits -= 5;
                state.ncode = (hold & 15) + 4;
                hold >>>= 4;
                bits -= 4;
                if (state.nlen > 286 || state.ndist > 30) {
                  strm.msg = "too many length or distance symbols";
                  state.mode = BAD;
                  break;
                }
                state.have = 0;
                state.mode = LENLENS;
              /* falls through */
              case LENLENS:
                while (state.have < state.ncode) {
                  while (bits < 3) {
                    if (have === 0) {
                      break inf_leave;
                    }
                    have--;
                    hold += input[next++] << bits;
                    bits += 8;
                  }
                  state.lens[order[state.have++]] = hold & 7;
                  hold >>>= 3;
                  bits -= 3;
                }
                while (state.have < 19) {
                  state.lens[order[state.have++]] = 0;
                }
                state.lencode = state.lendyn;
                state.lenbits = 7;
                opts = { bits: state.lenbits };
                ret = inflate_table(CODES, state.lens, 0, 19, state.lencode, 0, state.work, opts);
                state.lenbits = opts.bits;
                if (ret) {
                  strm.msg = "invalid code lengths set";
                  state.mode = BAD;
                  break;
                }
                state.have = 0;
                state.mode = CODELENS;
              /* falls through */
              case CODELENS:
                while (state.have < state.nlen + state.ndist) {
                  for (; ; ) {
                    here = state.lencode[hold & (1 << state.lenbits) - 1];
                    here_bits = here >>> 24;
                    here_op = here >>> 16 & 255;
                    here_val = here & 65535;
                    if (here_bits <= bits) {
                      break;
                    }
                    if (have === 0) {
                      break inf_leave;
                    }
                    have--;
                    hold += input[next++] << bits;
                    bits += 8;
                  }
                  if (here_val < 16) {
                    hold >>>= here_bits;
                    bits -= here_bits;
                    state.lens[state.have++] = here_val;
                  } else {
                    if (here_val === 16) {
                      n = here_bits + 2;
                      while (bits < n) {
                        if (have === 0) {
                          break inf_leave;
                        }
                        have--;
                        hold += input[next++] << bits;
                        bits += 8;
                      }
                      hold >>>= here_bits;
                      bits -= here_bits;
                      if (state.have === 0) {
                        strm.msg = "invalid bit length repeat";
                        state.mode = BAD;
                        break;
                      }
                      len = state.lens[state.have - 1];
                      copy = 3 + (hold & 3);
                      hold >>>= 2;
                      bits -= 2;
                    } else if (here_val === 17) {
                      n = here_bits + 3;
                      while (bits < n) {
                        if (have === 0) {
                          break inf_leave;
                        }
                        have--;
                        hold += input[next++] << bits;
                        bits += 8;
                      }
                      hold >>>= here_bits;
                      bits -= here_bits;
                      len = 0;
                      copy = 3 + (hold & 7);
                      hold >>>= 3;
                      bits -= 3;
                    } else {
                      n = here_bits + 7;
                      while (bits < n) {
                        if (have === 0) {
                          break inf_leave;
                        }
                        have--;
                        hold += input[next++] << bits;
                        bits += 8;
                      }
                      hold >>>= here_bits;
                      bits -= here_bits;
                      len = 0;
                      copy = 11 + (hold & 127);
                      hold >>>= 7;
                      bits -= 7;
                    }
                    if (state.have + copy > state.nlen + state.ndist) {
                      strm.msg = "invalid bit length repeat";
                      state.mode = BAD;
                      break;
                    }
                    while (copy--) {
                      state.lens[state.have++] = len;
                    }
                  }
                }
                if (state.mode === BAD) {
                  break;
                }
                if (state.lens[256] === 0) {
                  strm.msg = "invalid code -- missing end-of-block";
                  state.mode = BAD;
                  break;
                }
                state.lenbits = 9;
                opts = { bits: state.lenbits };
                ret = inflate_table(LENS, state.lens, 0, state.nlen, state.lencode, 0, state.work, opts);
                state.lenbits = opts.bits;
                if (ret) {
                  strm.msg = "invalid literal/lengths set";
                  state.mode = BAD;
                  break;
                }
                state.distbits = 6;
                state.distcode = state.distdyn;
                opts = { bits: state.distbits };
                ret = inflate_table(DISTS, state.lens, state.nlen, state.ndist, state.distcode, 0, state.work, opts);
                state.distbits = opts.bits;
                if (ret) {
                  strm.msg = "invalid distances set";
                  state.mode = BAD;
                  break;
                }
                state.mode = LEN_;
                if (flush === Z_TREES) {
                  break inf_leave;
                }
              /* falls through */
              case LEN_:
                state.mode = LEN;
              /* falls through */
              case LEN:
                if (have >= 6 && left >= 258) {
                  strm.next_out = put;
                  strm.avail_out = left;
                  strm.next_in = next;
                  strm.avail_in = have;
                  state.hold = hold;
                  state.bits = bits;
                  inflate_fast(strm, _out);
                  put = strm.next_out;
                  output = strm.output;
                  left = strm.avail_out;
                  next = strm.next_in;
                  input = strm.input;
                  have = strm.avail_in;
                  hold = state.hold;
                  bits = state.bits;
                  if (state.mode === TYPE) {
                    state.back = -1;
                  }
                  break;
                }
                state.back = 0;
                for (; ; ) {
                  here = state.lencode[hold & (1 << state.lenbits) - 1];
                  here_bits = here >>> 24;
                  here_op = here >>> 16 & 255;
                  here_val = here & 65535;
                  if (here_bits <= bits) {
                    break;
                  }
                  if (have === 0) {
                    break inf_leave;
                  }
                  have--;
                  hold += input[next++] << bits;
                  bits += 8;
                }
                if (here_op && (here_op & 240) === 0) {
                  last_bits = here_bits;
                  last_op = here_op;
                  last_val = here_val;
                  for (; ; ) {
                    here = state.lencode[last_val + ((hold & (1 << last_bits + last_op) - 1) >> last_bits)];
                    here_bits = here >>> 24;
                    here_op = here >>> 16 & 255;
                    here_val = here & 65535;
                    if (last_bits + here_bits <= bits) {
                      break;
                    }
                    if (have === 0) {
                      break inf_leave;
                    }
                    have--;
                    hold += input[next++] << bits;
                    bits += 8;
                  }
                  hold >>>= last_bits;
                  bits -= last_bits;
                  state.back += last_bits;
                }
                hold >>>= here_bits;
                bits -= here_bits;
                state.back += here_bits;
                state.length = here_val;
                if (here_op === 0) {
                  state.mode = LIT;
                  break;
                }
                if (here_op & 32) {
                  state.back = -1;
                  state.mode = TYPE;
                  break;
                }
                if (here_op & 64) {
                  strm.msg = "invalid literal/length code";
                  state.mode = BAD;
                  break;
                }
                state.extra = here_op & 15;
                state.mode = LENEXT;
              /* falls through */
              case LENEXT:
                if (state.extra) {
                  n = state.extra;
                  while (bits < n) {
                    if (have === 0) {
                      break inf_leave;
                    }
                    have--;
                    hold += input[next++] << bits;
                    bits += 8;
                  }
                  state.length += hold & (1 << state.extra) - 1;
                  hold >>>= state.extra;
                  bits -= state.extra;
                  state.back += state.extra;
                }
                state.was = state.length;
                state.mode = DIST;
              /* falls through */
              case DIST:
                for (; ; ) {
                  here = state.distcode[hold & (1 << state.distbits) - 1];
                  here_bits = here >>> 24;
                  here_op = here >>> 16 & 255;
                  here_val = here & 65535;
                  if (here_bits <= bits) {
                    break;
                  }
                  if (have === 0) {
                    break inf_leave;
                  }
                  have--;
                  hold += input[next++] << bits;
                  bits += 8;
                }
                if ((here_op & 240) === 0) {
                  last_bits = here_bits;
                  last_op = here_op;
                  last_val = here_val;
                  for (; ; ) {
                    here = state.distcode[last_val + ((hold & (1 << last_bits + last_op) - 1) >> last_bits)];
                    here_bits = here >>> 24;
                    here_op = here >>> 16 & 255;
                    here_val = here & 65535;
                    if (last_bits + here_bits <= bits) {
                      break;
                    }
                    if (have === 0) {
                      break inf_leave;
                    }
                    have--;
                    hold += input[next++] << bits;
                    bits += 8;
                  }
                  hold >>>= last_bits;
                  bits -= last_bits;
                  state.back += last_bits;
                }
                hold >>>= here_bits;
                bits -= here_bits;
                state.back += here_bits;
                if (here_op & 64) {
                  strm.msg = "invalid distance code";
                  state.mode = BAD;
                  break;
                }
                state.offset = here_val;
                state.extra = here_op & 15;
                state.mode = DISTEXT;
              /* falls through */
              case DISTEXT:
                if (state.extra) {
                  n = state.extra;
                  while (bits < n) {
                    if (have === 0) {
                      break inf_leave;
                    }
                    have--;
                    hold += input[next++] << bits;
                    bits += 8;
                  }
                  state.offset += hold & (1 << state.extra) - 1;
                  hold >>>= state.extra;
                  bits -= state.extra;
                  state.back += state.extra;
                }
                if (state.offset > state.dmax) {
                  strm.msg = "invalid distance too far back";
                  state.mode = BAD;
                  break;
                }
                state.mode = MATCH;
              /* falls through */
              case MATCH:
                if (left === 0) {
                  break inf_leave;
                }
                copy = _out - left;
                if (state.offset > copy) {
                  copy = state.offset - copy;
                  if (copy > state.whave) {
                    if (state.sane) {
                      strm.msg = "invalid distance too far back";
                      state.mode = BAD;
                      break;
                    }
                  }
                  if (copy > state.wnext) {
                    copy -= state.wnext;
                    from = state.wsize - copy;
                  } else {
                    from = state.wnext - copy;
                  }
                  if (copy > state.length) {
                    copy = state.length;
                  }
                  from_source = state.window;
                } else {
                  from_source = output;
                  from = put - state.offset;
                  copy = state.length;
                }
                if (copy > left) {
                  copy = left;
                }
                left -= copy;
                state.length -= copy;
                do {
                  output[put++] = from_source[from++];
                } while (--copy);
                if (state.length === 0) {
                  state.mode = LEN;
                }
                break;
              case LIT:
                if (left === 0) {
                  break inf_leave;
                }
                output[put++] = state.length;
                left--;
                state.mode = LEN;
                break;
              case CHECK:
                if (state.wrap) {
                  while (bits < 32) {
                    if (have === 0) {
                      break inf_leave;
                    }
                    have--;
                    hold |= input[next++] << bits;
                    bits += 8;
                  }
                  _out -= left;
                  strm.total_out += _out;
                  state.total += _out;
                  if (state.wrap & 4 && _out) {
                    strm.adler = state.check = /*UPDATE_CHECK(state.check, put - _out, _out);*/
                    state.flags ? crc32(state.check, output, _out, put - _out) : adler32(state.check, output, _out, put - _out);
                  }
                  _out = left;
                  if (state.wrap & 4 && (state.flags ? hold : zswap32(hold)) !== state.check) {
                    strm.msg = "incorrect data check";
                    state.mode = BAD;
                    break;
                  }
                  hold = 0;
                  bits = 0;
                }
                state.mode = LENGTH;
              /* falls through */
              case LENGTH:
                if (state.wrap && state.flags) {
                  while (bits < 32) {
                    if (have === 0) {
                      break inf_leave;
                    }
                    have--;
                    hold += input[next++] << bits;
                    bits += 8;
                  }
                  if (state.wrap & 4 && hold !== (state.total & 4294967295)) {
                    strm.msg = "incorrect length check";
                    state.mode = BAD;
                    break;
                  }
                  hold = 0;
                  bits = 0;
                }
                state.mode = DONE;
              /* falls through */
              case DONE:
                ret = Z_STREAM_END;
                break inf_leave;
              case BAD:
                ret = Z_DATA_ERROR;
                break inf_leave;
              case MEM:
                return Z_MEM_ERROR;
              case SYNC:
              /* falls through */
              default:
                return Z_STREAM_ERROR;
            }
          }
        strm.next_out = put;
        strm.avail_out = left;
        strm.next_in = next;
        strm.avail_in = have;
        state.hold = hold;
        state.bits = bits;
        if (state.wsize || _out !== strm.avail_out && state.mode < BAD && (state.mode < CHECK || flush !== Z_FINISH)) {
          if (updatewindow(strm, strm.output, strm.next_out, _out - strm.avail_out)) {
            state.mode = MEM;
            return Z_MEM_ERROR;
          }
        }
        _in -= strm.avail_in;
        _out -= strm.avail_out;
        strm.total_in += _in;
        strm.total_out += _out;
        state.total += _out;
        if (state.wrap & 4 && _out) {
          strm.adler = state.check = /*UPDATE_CHECK(state.check, strm.next_out - _out, _out);*/
          state.flags ? crc32(state.check, output, _out, strm.next_out - _out) : adler32(state.check, output, _out, strm.next_out - _out);
        }
        strm.data_type = state.bits + (state.last ? 64 : 0) + (state.mode === TYPE ? 128 : 0) + (state.mode === LEN_ || state.mode === COPY_ ? 256 : 0);
        if ((_in === 0 && _out === 0 || flush === Z_FINISH) && ret === Z_OK) {
          ret = Z_BUF_ERROR;
        }
        return ret;
      };
      var inflateEnd = (strm) => {
        if (inflateStateCheck(strm)) {
          return Z_STREAM_ERROR;
        }
        let state = strm.state;
        if (state.window) {
          state.window = null;
        }
        strm.state = null;
        return Z_OK;
      };
      var inflateGetHeader = (strm, head) => {
        if (inflateStateCheck(strm)) {
          return Z_STREAM_ERROR;
        }
        const state = strm.state;
        if ((state.wrap & 2) === 0) {
          return Z_STREAM_ERROR;
        }
        state.head = head;
        head.done = false;
        return Z_OK;
      };
      var inflateSetDictionary = (strm, dictionary) => {
        const dictLength = dictionary.length;
        let state;
        let dictid;
        let ret;
        if (inflateStateCheck(strm)) {
          return Z_STREAM_ERROR;
        }
        state = strm.state;
        if (state.wrap !== 0 && state.mode !== DICT) {
          return Z_STREAM_ERROR;
        }
        if (state.mode === DICT) {
          dictid = 1;
          dictid = adler32(dictid, dictionary, dictLength, 0);
          if (dictid !== state.check) {
            return Z_DATA_ERROR;
          }
        }
        ret = updatewindow(strm, dictionary, dictLength, dictLength);
        if (ret) {
          state.mode = MEM;
          return Z_MEM_ERROR;
        }
        state.havedict = 1;
        return Z_OK;
      };
      module.exports.inflateReset = inflateReset;
      module.exports.inflateReset2 = inflateReset2;
      module.exports.inflateResetKeep = inflateResetKeep;
      module.exports.inflateInit = inflateInit;
      module.exports.inflateInit2 = inflateInit2;
      module.exports.inflate = inflate;
      module.exports.inflateEnd = inflateEnd;
      module.exports.inflateGetHeader = inflateGetHeader;
      module.exports.inflateSetDictionary = inflateSetDictionary;
      module.exports.inflateInfo = "pako inflate (from Nodeca project)";
    }
  });

  // node_modules/pako/lib/zlib/gzheader.js
  var require_gzheader = __commonJS({
    "node_modules/pako/lib/zlib/gzheader.js"(exports, module) {
      "use strict";
      function GZheader() {
        this.text = 0;
        this.time = 0;
        this.xflags = 0;
        this.os = 0;
        this.extra = null;
        this.extra_len = 0;
        this.name = "";
        this.comment = "";
        this.hcrc = 0;
        this.done = false;
      }
      module.exports = GZheader;
    }
  });

  // node_modules/pako/lib/inflate.js
  var require_inflate2 = __commonJS({
    "node_modules/pako/lib/inflate.js"(exports, module) {
      "use strict";
      var zlib_inflate = require_inflate();
      var utils = require_common();
      var strings = require_strings();
      var msg = require_messages();
      var ZStream = require_zstream();
      var GZheader = require_gzheader();
      var toString = Object.prototype.toString;
      var {
        Z_NO_FLUSH,
        Z_FINISH,
        Z_OK,
        Z_STREAM_END,
        Z_NEED_DICT,
        Z_STREAM_ERROR,
        Z_DATA_ERROR,
        Z_MEM_ERROR
      } = require_constants();
      function Inflate(options) {
        this.options = utils.assign({
          chunkSize: 1024 * 64,
          windowBits: 15,
          to: ""
        }, options || {});
        const opt = this.options;
        if (opt.raw && opt.windowBits >= 0 && opt.windowBits < 16) {
          opt.windowBits = -opt.windowBits;
          if (opt.windowBits === 0) {
            opt.windowBits = -15;
          }
        }
        if (opt.windowBits >= 0 && opt.windowBits < 16 && !(options && options.windowBits)) {
          opt.windowBits += 32;
        }
        if (opt.windowBits > 15 && opt.windowBits < 48) {
          if ((opt.windowBits & 15) === 0) {
            opt.windowBits |= 15;
          }
        }
        this.err = 0;
        this.msg = "";
        this.ended = false;
        this.chunks = [];
        this.strm = new ZStream();
        this.strm.avail_out = 0;
        let status = zlib_inflate.inflateInit2(
          this.strm,
          opt.windowBits
        );
        if (status !== Z_OK) {
          throw new Error(msg[status]);
        }
        this.header = new GZheader();
        zlib_inflate.inflateGetHeader(this.strm, this.header);
        if (opt.dictionary) {
          if (typeof opt.dictionary === "string") {
            opt.dictionary = strings.string2buf(opt.dictionary);
          } else if (toString.call(opt.dictionary) === "[object ArrayBuffer]") {
            opt.dictionary = new Uint8Array(opt.dictionary);
          }
          if (opt.raw) {
            status = zlib_inflate.inflateSetDictionary(this.strm, opt.dictionary);
            if (status !== Z_OK) {
              throw new Error(msg[status]);
            }
          }
        }
      }
      Inflate.prototype.push = function(data, flush_mode) {
        const strm = this.strm;
        const chunkSize = this.options.chunkSize;
        const dictionary = this.options.dictionary;
        let status, _flush_mode, last_avail_out;
        if (this.ended) return false;
        if (flush_mode === ~~flush_mode) _flush_mode = flush_mode;
        else _flush_mode = flush_mode === true ? Z_FINISH : Z_NO_FLUSH;
        if (toString.call(data) === "[object ArrayBuffer]") {
          strm.input = new Uint8Array(data);
        } else {
          strm.input = data;
        }
        strm.next_in = 0;
        strm.avail_in = strm.input.length;
        for (; ; ) {
          if (strm.avail_out === 0) {
            strm.output = new Uint8Array(chunkSize);
            strm.next_out = 0;
            strm.avail_out = chunkSize;
          }
          status = zlib_inflate.inflate(strm, _flush_mode);
          if (status === Z_NEED_DICT && dictionary) {
            status = zlib_inflate.inflateSetDictionary(strm, dictionary);
            if (status === Z_OK) {
              status = zlib_inflate.inflate(strm, _flush_mode);
            } else if (status === Z_DATA_ERROR) {
              status = Z_NEED_DICT;
            }
          }
          while (strm.avail_in > 0 && status === Z_STREAM_END && strm.state.wrap > 0 && data[strm.next_in] !== 0) {
            zlib_inflate.inflateReset(strm);
            status = zlib_inflate.inflate(strm, _flush_mode);
          }
          switch (status) {
            case Z_STREAM_ERROR:
            case Z_DATA_ERROR:
            case Z_NEED_DICT:
            case Z_MEM_ERROR:
              this.onEnd(status);
              this.ended = true;
              return false;
          }
          last_avail_out = strm.avail_out;
          if (strm.next_out) {
            if (strm.avail_out === 0 || status === Z_STREAM_END) {
              if (this.options.to === "string") {
                let next_out_utf8 = strings.utf8border(strm.output, strm.next_out);
                let tail = strm.next_out - next_out_utf8;
                let utf8str = strings.buf2string(strm.output, next_out_utf8);
                strm.next_out = tail;
                strm.avail_out = chunkSize - tail;
                if (tail) strm.output.set(strm.output.subarray(next_out_utf8, next_out_utf8 + tail), 0);
                this.onData(utf8str);
              } else {
                this.onData(strm.output.length === strm.next_out ? strm.output : strm.output.subarray(0, strm.next_out));
              }
            }
          }
          if (status === Z_OK && last_avail_out === 0) continue;
          if (status === Z_STREAM_END) {
            status = zlib_inflate.inflateEnd(this.strm);
            this.onEnd(status);
            this.ended = true;
            return true;
          }
          if (strm.avail_in === 0) break;
        }
        return true;
      };
      Inflate.prototype.onData = function(chunk) {
        this.chunks.push(chunk);
      };
      Inflate.prototype.onEnd = function(status) {
        if (status === Z_OK) {
          if (this.options.to === "string") {
            this.result = this.chunks.join("");
          } else {
            this.result = utils.flattenChunks(this.chunks);
          }
        }
        this.chunks = [];
        this.err = status;
        this.msg = this.strm.msg;
      };
      function inflate(input, options) {
        const inflator = new Inflate(options);
        inflator.push(input);
        if (inflator.err) throw inflator.msg || msg[inflator.err];
        return inflator.result;
      }
      function inflateRaw(input, options) {
        options = options || {};
        options.raw = true;
        return inflate(input, options);
      }
      module.exports.Inflate = Inflate;
      module.exports.inflate = inflate;
      module.exports.inflateRaw = inflateRaw;
      module.exports.ungzip = inflate;
      module.exports.constants = require_constants();
    }
  });

  // node_modules/pako/index.js
  var require_pako = __commonJS({
    "node_modules/pako/index.js"(exports, module) {
      "use strict";
      var { Deflate, deflate, deflateRaw, gzip } = require_deflate2();
      var { Inflate, inflate, inflateRaw, ungzip } = require_inflate2();
      var constants = require_constants();
      module.exports.Deflate = Deflate;
      module.exports.deflate = deflate;
      module.exports.deflateRaw = deflateRaw;
      module.exports.gzip = gzip;
      module.exports.Inflate = Inflate;
      module.exports.inflate = inflate;
      module.exports.inflateRaw = inflateRaw;
      module.exports.ungzip = ungzip;
      module.exports.constants = constants;
    }
  });

  // node_modules/cbor-web/dist/cbor.js
  var require_cbor = __commonJS({
    "node_modules/cbor-web/dist/cbor.js"(exports, module) {
      !(function(e, t) {
        "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports.cbor = t() : e.cbor = t();
      })(exports, (() => (() => {
        var e = { 8599: (e2) => {
          "use strict";
          const { AbortController: t2, AbortSignal: r2 } = "undefined" != typeof self ? self : "undefined" != typeof window ? window : void 0;
          e2.exports = t2, e2.exports.AbortSignal = r2, e2.exports.default = t2;
        }, 9742: (e2, t2) => {
          "use strict";
          t2.byteLength = function(e3) {
            var t3 = a(e3), r3 = t3[0], n3 = t3[1];
            return 3 * (r3 + n3) / 4 - n3;
          }, t2.toByteArray = function(e3) {
            var t3, r3, o2 = a(e3), s2 = o2[0], l2 = o2[1], u = new i((function(e4, t4, r4) {
              return 3 * (t4 + r4) / 4 - r4;
            })(0, s2, l2)), c = 0, f = l2 > 0 ? s2 - 4 : s2;
            for (r3 = 0; r3 < f; r3 += 4) t3 = n2[e3.charCodeAt(r3)] << 18 | n2[e3.charCodeAt(r3 + 1)] << 12 | n2[e3.charCodeAt(r3 + 2)] << 6 | n2[e3.charCodeAt(r3 + 3)], u[c++] = t3 >> 16 & 255, u[c++] = t3 >> 8 & 255, u[c++] = 255 & t3;
            return 2 === l2 && (t3 = n2[e3.charCodeAt(r3)] << 2 | n2[e3.charCodeAt(r3 + 1)] >> 4, u[c++] = 255 & t3), 1 === l2 && (t3 = n2[e3.charCodeAt(r3)] << 10 | n2[e3.charCodeAt(r3 + 1)] << 4 | n2[e3.charCodeAt(r3 + 2)] >> 2, u[c++] = t3 >> 8 & 255, u[c++] = 255 & t3), u;
          }, t2.fromByteArray = function(e3) {
            for (var t3, n3 = e3.length, i2 = n3 % 3, o2 = [], s2 = 16383, a2 = 0, u = n3 - i2; a2 < u; a2 += s2) o2.push(l(e3, a2, a2 + s2 > u ? u : a2 + s2));
            return 1 === i2 ? (t3 = e3[n3 - 1], o2.push(r2[t3 >> 2] + r2[t3 << 4 & 63] + "==")) : 2 === i2 && (t3 = (e3[n3 - 2] << 8) + e3[n3 - 1], o2.push(r2[t3 >> 10] + r2[t3 >> 4 & 63] + r2[t3 << 2 & 63] + "=")), o2.join("");
          };
          for (var r2 = [], n2 = [], i = "undefined" != typeof Uint8Array ? Uint8Array : Array, o = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", s = 0; s < 64; ++s) r2[s] = o[s], n2[o.charCodeAt(s)] = s;
          function a(e3) {
            var t3 = e3.length;
            if (t3 % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
            var r3 = e3.indexOf("=");
            return -1 === r3 && (r3 = t3), [r3, r3 === t3 ? 0 : 4 - r3 % 4];
          }
          function l(e3, t3, n3) {
            for (var i2, o2, s2 = [], a2 = t3; a2 < n3; a2 += 3) i2 = (e3[a2] << 16 & 16711680) + (e3[a2 + 1] << 8 & 65280) + (255 & e3[a2 + 2]), s2.push(r2[(o2 = i2) >> 18 & 63] + r2[o2 >> 12 & 63] + r2[o2 >> 6 & 63] + r2[63 & o2]);
            return s2.join("");
          }
          n2["-".charCodeAt(0)] = 62, n2["_".charCodeAt(0)] = 63;
        }, 8764: (e2, t2, r2) => {
          "use strict";
          const n2 = r2(9742), i = r2(645), o = "function" == typeof Symbol && "function" == typeof Symbol.for ? /* @__PURE__ */ Symbol.for("nodejs.util.inspect.custom") : null;
          t2.Buffer = l, t2.SlowBuffer = function(e3) {
            return +e3 != e3 && (e3 = 0), l.alloc(+e3);
          }, t2.INSPECT_MAX_BYTES = 50;
          const s = 2147483647;
          function a(e3) {
            if (e3 > s) throw new RangeError('The value "' + e3 + '" is invalid for option "size"');
            const t3 = new Uint8Array(e3);
            return Object.setPrototypeOf(t3, l.prototype), t3;
          }
          function l(e3, t3, r3) {
            if ("number" == typeof e3) {
              if ("string" == typeof t3) throw new TypeError('The "string" argument must be of type string. Received type number');
              return f(e3);
            }
            return u(e3, t3, r3);
          }
          function u(e3, t3, r3) {
            if ("string" == typeof e3) return (function(e4, t4) {
              if ("string" == typeof t4 && "" !== t4 || (t4 = "utf8"), !l.isEncoding(t4)) throw new TypeError("Unknown encoding: " + t4);
              const r4 = 0 | b(e4, t4);
              let n4 = a(r4);
              const i3 = n4.write(e4, t4);
              return i3 !== r4 && (n4 = n4.slice(0, i3)), n4;
            })(e3, t3);
            if (ArrayBuffer.isView(e3)) return (function(e4) {
              if (z(e4, Uint8Array)) {
                const t4 = new Uint8Array(e4);
                return d(t4.buffer, t4.byteOffset, t4.byteLength);
              }
              return h(e4);
            })(e3);
            if (null == e3) throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof e3);
            if (z(e3, ArrayBuffer) || e3 && z(e3.buffer, ArrayBuffer)) return d(e3, t3, r3);
            if ("undefined" != typeof SharedArrayBuffer && (z(e3, SharedArrayBuffer) || e3 && z(e3.buffer, SharedArrayBuffer))) return d(e3, t3, r3);
            if ("number" == typeof e3) throw new TypeError('The "value" argument must not be of type number. Received type number');
            const n3 = e3.valueOf && e3.valueOf();
            if (null != n3 && n3 !== e3) return l.from(n3, t3, r3);
            const i2 = (function(e4) {
              if (l.isBuffer(e4)) {
                const t4 = 0 | p(e4.length), r4 = a(t4);
                return 0 === r4.length || e4.copy(r4, 0, 0, t4), r4;
              }
              return void 0 !== e4.length ? "number" != typeof e4.length || X(e4.length) ? a(0) : h(e4) : "Buffer" === e4.type && Array.isArray(e4.data) ? h(e4.data) : void 0;
            })(e3);
            if (i2) return i2;
            if ("undefined" != typeof Symbol && null != Symbol.toPrimitive && "function" == typeof e3[Symbol.toPrimitive]) return l.from(e3[Symbol.toPrimitive]("string"), t3, r3);
            throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof e3);
          }
          function c(e3) {
            if ("number" != typeof e3) throw new TypeError('"size" argument must be of type number');
            if (e3 < 0) throw new RangeError('The value "' + e3 + '" is invalid for option "size"');
          }
          function f(e3) {
            return c(e3), a(e3 < 0 ? 0 : 0 | p(e3));
          }
          function h(e3) {
            const t3 = e3.length < 0 ? 0 : 0 | p(e3.length), r3 = a(t3);
            for (let n3 = 0; n3 < t3; n3 += 1) r3[n3] = 255 & e3[n3];
            return r3;
          }
          function d(e3, t3, r3) {
            if (t3 < 0 || e3.byteLength < t3) throw new RangeError('"offset" is outside of buffer bounds');
            if (e3.byteLength < t3 + (r3 || 0)) throw new RangeError('"length" is outside of buffer bounds');
            let n3;
            return n3 = void 0 === t3 && void 0 === r3 ? new Uint8Array(e3) : void 0 === r3 ? new Uint8Array(e3, t3) : new Uint8Array(e3, t3, r3), Object.setPrototypeOf(n3, l.prototype), n3;
          }
          function p(e3) {
            if (e3 >= s) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + s.toString(16) + " bytes");
            return 0 | e3;
          }
          function b(e3, t3) {
            if (l.isBuffer(e3)) return e3.length;
            if (ArrayBuffer.isView(e3) || z(e3, ArrayBuffer)) return e3.byteLength;
            if ("string" != typeof e3) throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof e3);
            const r3 = e3.length, n3 = arguments.length > 2 && true === arguments[2];
            if (!n3 && 0 === r3) return 0;
            let i2 = false;
            for (; ; ) switch (t3) {
              case "ascii":
              case "latin1":
              case "binary":
                return r3;
              case "utf8":
              case "utf-8":
                return V(e3).length;
              case "ucs2":
              case "ucs-2":
              case "utf16le":
              case "utf-16le":
                return 2 * r3;
              case "hex":
                return r3 >>> 1;
              case "base64":
                return K(e3).length;
              default:
                if (i2) return n3 ? -1 : V(e3).length;
                t3 = ("" + t3).toLowerCase(), i2 = true;
            }
          }
          function y(e3, t3, r3) {
            let n3 = false;
            if ((void 0 === t3 || t3 < 0) && (t3 = 0), t3 > this.length) return "";
            if ((void 0 === r3 || r3 > this.length) && (r3 = this.length), r3 <= 0) return "";
            if ((r3 >>>= 0) <= (t3 >>>= 0)) return "";
            for (e3 || (e3 = "utf8"); ; ) switch (e3) {
              case "hex":
                return L(this, t3, r3);
              case "utf8":
              case "utf-8":
                return T(this, t3, r3);
              case "ascii":
                return B(this, t3, r3);
              case "latin1":
              case "binary":
                return N(this, t3, r3);
              case "base64":
                return I(this, t3, r3);
              case "ucs2":
              case "ucs-2":
              case "utf16le":
              case "utf-16le":
                return U(this, t3, r3);
              default:
                if (n3) throw new TypeError("Unknown encoding: " + e3);
                e3 = (e3 + "").toLowerCase(), n3 = true;
            }
          }
          function g(e3, t3, r3) {
            const n3 = e3[t3];
            e3[t3] = e3[r3], e3[r3] = n3;
          }
          function w(e3, t3, r3, n3, i2) {
            if (0 === e3.length) return -1;
            if ("string" == typeof r3 ? (n3 = r3, r3 = 0) : r3 > 2147483647 ? r3 = 2147483647 : r3 < -2147483648 && (r3 = -2147483648), X(r3 = +r3) && (r3 = i2 ? 0 : e3.length - 1), r3 < 0 && (r3 = e3.length + r3), r3 >= e3.length) {
              if (i2) return -1;
              r3 = e3.length - 1;
            } else if (r3 < 0) {
              if (!i2) return -1;
              r3 = 0;
            }
            if ("string" == typeof t3 && (t3 = l.from(t3, n3)), l.isBuffer(t3)) return 0 === t3.length ? -1 : _(e3, t3, r3, n3, i2);
            if ("number" == typeof t3) return t3 &= 255, "function" == typeof Uint8Array.prototype.indexOf ? i2 ? Uint8Array.prototype.indexOf.call(e3, t3, r3) : Uint8Array.prototype.lastIndexOf.call(e3, t3, r3) : _(e3, [t3], r3, n3, i2);
            throw new TypeError("val must be string, number or Buffer");
          }
          function _(e3, t3, r3, n3, i2) {
            let o2, s2 = 1, a2 = e3.length, l2 = t3.length;
            if (void 0 !== n3 && ("ucs2" === (n3 = String(n3).toLowerCase()) || "ucs-2" === n3 || "utf16le" === n3 || "utf-16le" === n3)) {
              if (e3.length < 2 || t3.length < 2) return -1;
              s2 = 2, a2 /= 2, l2 /= 2, r3 /= 2;
            }
            function u2(e4, t4) {
              return 1 === s2 ? e4[t4] : e4.readUInt16BE(t4 * s2);
            }
            if (i2) {
              let n4 = -1;
              for (o2 = r3; o2 < a2; o2++) if (u2(e3, o2) === u2(t3, -1 === n4 ? 0 : o2 - n4)) {
                if (-1 === n4 && (n4 = o2), o2 - n4 + 1 === l2) return n4 * s2;
              } else -1 !== n4 && (o2 -= o2 - n4), n4 = -1;
            } else for (r3 + l2 > a2 && (r3 = a2 - l2), o2 = r3; o2 >= 0; o2--) {
              let r4 = true;
              for (let n4 = 0; n4 < l2; n4++) if (u2(e3, o2 + n4) !== u2(t3, n4)) {
                r4 = false;
                break;
              }
              if (r4) return o2;
            }
            return -1;
          }
          function m(e3, t3, r3, n3) {
            r3 = Number(r3) || 0;
            const i2 = e3.length - r3;
            n3 ? (n3 = Number(n3)) > i2 && (n3 = i2) : n3 = i2;
            const o2 = t3.length;
            let s2;
            for (n3 > o2 / 2 && (n3 = o2 / 2), s2 = 0; s2 < n3; ++s2) {
              const n4 = parseInt(t3.substr(2 * s2, 2), 16);
              if (X(n4)) return s2;
              e3[r3 + s2] = n4;
            }
            return s2;
          }
          function E(e3, t3, r3, n3) {
            return q(V(t3, e3.length - r3), e3, r3, n3);
          }
          function S(e3, t3, r3, n3) {
            return q((function(e4) {
              const t4 = [];
              for (let r4 = 0; r4 < e4.length; ++r4) t4.push(255 & e4.charCodeAt(r4));
              return t4;
            })(t3), e3, r3, n3);
          }
          function v(e3, t3, r3, n3) {
            return q(K(t3), e3, r3, n3);
          }
          function A(e3, t3, r3, n3) {
            return q((function(e4, t4) {
              let r4, n4, i2;
              const o2 = [];
              for (let s2 = 0; s2 < e4.length && !((t4 -= 2) < 0); ++s2) r4 = e4.charCodeAt(s2), n4 = r4 >> 8, i2 = r4 % 256, o2.push(i2), o2.push(n4);
              return o2;
            })(t3, e3.length - r3), e3, r3, n3);
          }
          function I(e3, t3, r3) {
            return 0 === t3 && r3 === e3.length ? n2.fromByteArray(e3) : n2.fromByteArray(e3.slice(t3, r3));
          }
          function T(e3, t3, r3) {
            r3 = Math.min(e3.length, r3);
            const n3 = [];
            let i2 = t3;
            for (; i2 < r3; ) {
              const t4 = e3[i2];
              let o2 = null, s2 = t4 > 239 ? 4 : t4 > 223 ? 3 : t4 > 191 ? 2 : 1;
              if (i2 + s2 <= r3) {
                let r4, n4, a2, l2;
                switch (s2) {
                  case 1:
                    t4 < 128 && (o2 = t4);
                    break;
                  case 2:
                    r4 = e3[i2 + 1], 128 == (192 & r4) && (l2 = (31 & t4) << 6 | 63 & r4, l2 > 127 && (o2 = l2));
                    break;
                  case 3:
                    r4 = e3[i2 + 1], n4 = e3[i2 + 2], 128 == (192 & r4) && 128 == (192 & n4) && (l2 = (15 & t4) << 12 | (63 & r4) << 6 | 63 & n4, l2 > 2047 && (l2 < 55296 || l2 > 57343) && (o2 = l2));
                    break;
                  case 4:
                    r4 = e3[i2 + 1], n4 = e3[i2 + 2], a2 = e3[i2 + 3], 128 == (192 & r4) && 128 == (192 & n4) && 128 == (192 & a2) && (l2 = (15 & t4) << 18 | (63 & r4) << 12 | (63 & n4) << 6 | 63 & a2, l2 > 65535 && l2 < 1114112 && (o2 = l2));
                }
              }
              null === o2 ? (o2 = 65533, s2 = 1) : o2 > 65535 && (o2 -= 65536, n3.push(o2 >>> 10 & 1023 | 55296), o2 = 56320 | 1023 & o2), n3.push(o2), i2 += s2;
            }
            return (function(e4) {
              const t4 = e4.length;
              if (t4 <= R) return String.fromCharCode.apply(String, e4);
              let r4 = "", n4 = 0;
              for (; n4 < t4; ) r4 += String.fromCharCode.apply(String, e4.slice(n4, n4 += R));
              return r4;
            })(n3);
          }
          t2.kMaxLength = s, l.TYPED_ARRAY_SUPPORT = (function() {
            try {
              const e3 = new Uint8Array(1), t3 = { foo: function() {
                return 42;
              } };
              return Object.setPrototypeOf(t3, Uint8Array.prototype), Object.setPrototypeOf(e3, t3), 42 === e3.foo();
            } catch (e3) {
              return false;
            }
          })(), l.TYPED_ARRAY_SUPPORT || "undefined" == typeof console || "function" != typeof console.error || console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."), Object.defineProperty(l.prototype, "parent", { enumerable: true, get: function() {
            if (l.isBuffer(this)) return this.buffer;
          } }), Object.defineProperty(l.prototype, "offset", { enumerable: true, get: function() {
            if (l.isBuffer(this)) return this.byteOffset;
          } }), l.poolSize = 8192, l.from = function(e3, t3, r3) {
            return u(e3, t3, r3);
          }, Object.setPrototypeOf(l.prototype, Uint8Array.prototype), Object.setPrototypeOf(l, Uint8Array), l.alloc = function(e3, t3, r3) {
            return (function(e4, t4, r4) {
              return c(e4), e4 <= 0 ? a(e4) : void 0 !== t4 ? "string" == typeof r4 ? a(e4).fill(t4, r4) : a(e4).fill(t4) : a(e4);
            })(e3, t3, r3);
          }, l.allocUnsafe = function(e3) {
            return f(e3);
          }, l.allocUnsafeSlow = function(e3) {
            return f(e3);
          }, l.isBuffer = function(e3) {
            return null != e3 && true === e3._isBuffer && e3 !== l.prototype;
          }, l.compare = function(e3, t3) {
            if (z(e3, Uint8Array) && (e3 = l.from(e3, e3.offset, e3.byteLength)), z(t3, Uint8Array) && (t3 = l.from(t3, t3.offset, t3.byteLength)), !l.isBuffer(e3) || !l.isBuffer(t3)) throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');
            if (e3 === t3) return 0;
            let r3 = e3.length, n3 = t3.length;
            for (let i2 = 0, o2 = Math.min(r3, n3); i2 < o2; ++i2) if (e3[i2] !== t3[i2]) {
              r3 = e3[i2], n3 = t3[i2];
              break;
            }
            return r3 < n3 ? -1 : n3 < r3 ? 1 : 0;
          }, l.isEncoding = function(e3) {
            switch (String(e3).toLowerCase()) {
              case "hex":
              case "utf8":
              case "utf-8":
              case "ascii":
              case "latin1":
              case "binary":
              case "base64":
              case "ucs2":
              case "ucs-2":
              case "utf16le":
              case "utf-16le":
                return true;
              default:
                return false;
            }
          }, l.concat = function(e3, t3) {
            if (!Array.isArray(e3)) throw new TypeError('"list" argument must be an Array of Buffers');
            if (0 === e3.length) return l.alloc(0);
            let r3;
            if (void 0 === t3) for (t3 = 0, r3 = 0; r3 < e3.length; ++r3) t3 += e3[r3].length;
            const n3 = l.allocUnsafe(t3);
            let i2 = 0;
            for (r3 = 0; r3 < e3.length; ++r3) {
              let t4 = e3[r3];
              if (z(t4, Uint8Array)) i2 + t4.length > n3.length ? (l.isBuffer(t4) || (t4 = l.from(t4)), t4.copy(n3, i2)) : Uint8Array.prototype.set.call(n3, t4, i2);
              else {
                if (!l.isBuffer(t4)) throw new TypeError('"list" argument must be an Array of Buffers');
                t4.copy(n3, i2);
              }
              i2 += t4.length;
            }
            return n3;
          }, l.byteLength = b, l.prototype._isBuffer = true, l.prototype.swap16 = function() {
            const e3 = this.length;
            if (e3 % 2 != 0) throw new RangeError("Buffer size must be a multiple of 16-bits");
            for (let t3 = 0; t3 < e3; t3 += 2) g(this, t3, t3 + 1);
            return this;
          }, l.prototype.swap32 = function() {
            const e3 = this.length;
            if (e3 % 4 != 0) throw new RangeError("Buffer size must be a multiple of 32-bits");
            for (let t3 = 0; t3 < e3; t3 += 4) g(this, t3, t3 + 3), g(this, t3 + 1, t3 + 2);
            return this;
          }, l.prototype.swap64 = function() {
            const e3 = this.length;
            if (e3 % 8 != 0) throw new RangeError("Buffer size must be a multiple of 64-bits");
            for (let t3 = 0; t3 < e3; t3 += 8) g(this, t3, t3 + 7), g(this, t3 + 1, t3 + 6), g(this, t3 + 2, t3 + 5), g(this, t3 + 3, t3 + 4);
            return this;
          }, l.prototype.toString = function() {
            const e3 = this.length;
            return 0 === e3 ? "" : 0 === arguments.length ? T(this, 0, e3) : y.apply(this, arguments);
          }, l.prototype.toLocaleString = l.prototype.toString, l.prototype.equals = function(e3) {
            if (!l.isBuffer(e3)) throw new TypeError("Argument must be a Buffer");
            return this === e3 || 0 === l.compare(this, e3);
          }, l.prototype.inspect = function() {
            let e3 = "";
            const r3 = t2.INSPECT_MAX_BYTES;
            return e3 = this.toString("hex", 0, r3).replace(/(.{2})/g, "$1 ").trim(), this.length > r3 && (e3 += " ... "), "<Buffer " + e3 + ">";
          }, o && (l.prototype[o] = l.prototype.inspect), l.prototype.compare = function(e3, t3, r3, n3, i2) {
            if (z(e3, Uint8Array) && (e3 = l.from(e3, e3.offset, e3.byteLength)), !l.isBuffer(e3)) throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof e3);
            if (void 0 === t3 && (t3 = 0), void 0 === r3 && (r3 = e3 ? e3.length : 0), void 0 === n3 && (n3 = 0), void 0 === i2 && (i2 = this.length), t3 < 0 || r3 > e3.length || n3 < 0 || i2 > this.length) throw new RangeError("out of range index");
            if (n3 >= i2 && t3 >= r3) return 0;
            if (n3 >= i2) return -1;
            if (t3 >= r3) return 1;
            if (this === e3) return 0;
            let o2 = (i2 >>>= 0) - (n3 >>>= 0), s2 = (r3 >>>= 0) - (t3 >>>= 0);
            const a2 = Math.min(o2, s2), u2 = this.slice(n3, i2), c2 = e3.slice(t3, r3);
            for (let e4 = 0; e4 < a2; ++e4) if (u2[e4] !== c2[e4]) {
              o2 = u2[e4], s2 = c2[e4];
              break;
            }
            return o2 < s2 ? -1 : s2 < o2 ? 1 : 0;
          }, l.prototype.includes = function(e3, t3, r3) {
            return -1 !== this.indexOf(e3, t3, r3);
          }, l.prototype.indexOf = function(e3, t3, r3) {
            return w(this, e3, t3, r3, true);
          }, l.prototype.lastIndexOf = function(e3, t3, r3) {
            return w(this, e3, t3, r3, false);
          }, l.prototype.write = function(e3, t3, r3, n3) {
            if (void 0 === t3) n3 = "utf8", r3 = this.length, t3 = 0;
            else if (void 0 === r3 && "string" == typeof t3) n3 = t3, r3 = this.length, t3 = 0;
            else {
              if (!isFinite(t3)) throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
              t3 >>>= 0, isFinite(r3) ? (r3 >>>= 0, void 0 === n3 && (n3 = "utf8")) : (n3 = r3, r3 = void 0);
            }
            const i2 = this.length - t3;
            if ((void 0 === r3 || r3 > i2) && (r3 = i2), e3.length > 0 && (r3 < 0 || t3 < 0) || t3 > this.length) throw new RangeError("Attempt to write outside buffer bounds");
            n3 || (n3 = "utf8");
            let o2 = false;
            for (; ; ) switch (n3) {
              case "hex":
                return m(this, e3, t3, r3);
              case "utf8":
              case "utf-8":
                return E(this, e3, t3, r3);
              case "ascii":
              case "latin1":
              case "binary":
                return S(this, e3, t3, r3);
              case "base64":
                return v(this, e3, t3, r3);
              case "ucs2":
              case "ucs-2":
              case "utf16le":
              case "utf-16le":
                return A(this, e3, t3, r3);
              default:
                if (o2) throw new TypeError("Unknown encoding: " + n3);
                n3 = ("" + n3).toLowerCase(), o2 = true;
            }
          }, l.prototype.toJSON = function() {
            return { type: "Buffer", data: Array.prototype.slice.call(this._arr || this, 0) };
          };
          const R = 4096;
          function B(e3, t3, r3) {
            let n3 = "";
            r3 = Math.min(e3.length, r3);
            for (let i2 = t3; i2 < r3; ++i2) n3 += String.fromCharCode(127 & e3[i2]);
            return n3;
          }
          function N(e3, t3, r3) {
            let n3 = "";
            r3 = Math.min(e3.length, r3);
            for (let i2 = t3; i2 < r3; ++i2) n3 += String.fromCharCode(e3[i2]);
            return n3;
          }
          function L(e3, t3, r3) {
            const n3 = e3.length;
            (!t3 || t3 < 0) && (t3 = 0), (!r3 || r3 < 0 || r3 > n3) && (r3 = n3);
            let i2 = "";
            for (let n4 = t3; n4 < r3; ++n4) i2 += J[e3[n4]];
            return i2;
          }
          function U(e3, t3, r3) {
            const n3 = e3.slice(t3, r3);
            let i2 = "";
            for (let e4 = 0; e4 < n3.length - 1; e4 += 2) i2 += String.fromCharCode(n3[e4] + 256 * n3[e4 + 1]);
            return i2;
          }
          function M(e3, t3, r3) {
            if (e3 % 1 != 0 || e3 < 0) throw new RangeError("offset is not uint");
            if (e3 + t3 > r3) throw new RangeError("Trying to access beyond buffer length");
          }
          function O(e3, t3, r3, n3, i2, o2) {
            if (!l.isBuffer(e3)) throw new TypeError('"buffer" argument must be a Buffer instance');
            if (t3 > i2 || t3 < o2) throw new RangeError('"value" argument is out of bounds');
            if (r3 + n3 > e3.length) throw new RangeError("Index out of range");
          }
          function x(e3, t3, r3, n3, i2) {
            W(t3, n3, i2, e3, r3, 7);
            let o2 = Number(t3 & BigInt(4294967295));
            e3[r3++] = o2, o2 >>= 8, e3[r3++] = o2, o2 >>= 8, e3[r3++] = o2, o2 >>= 8, e3[r3++] = o2;
            let s2 = Number(t3 >> BigInt(32) & BigInt(4294967295));
            return e3[r3++] = s2, s2 >>= 8, e3[r3++] = s2, s2 >>= 8, e3[r3++] = s2, s2 >>= 8, e3[r3++] = s2, r3;
          }
          function k(e3, t3, r3, n3, i2) {
            W(t3, n3, i2, e3, r3, 7);
            let o2 = Number(t3 & BigInt(4294967295));
            e3[r3 + 7] = o2, o2 >>= 8, e3[r3 + 6] = o2, o2 >>= 8, e3[r3 + 5] = o2, o2 >>= 8, e3[r3 + 4] = o2;
            let s2 = Number(t3 >> BigInt(32) & BigInt(4294967295));
            return e3[r3 + 3] = s2, s2 >>= 8, e3[r3 + 2] = s2, s2 >>= 8, e3[r3 + 1] = s2, s2 >>= 8, e3[r3] = s2, r3 + 8;
          }
          function P2(e3, t3, r3, n3, i2, o2) {
            if (r3 + n3 > e3.length) throw new RangeError("Index out of range");
            if (r3 < 0) throw new RangeError("Index out of range");
          }
          function j(e3, t3, r3, n3, o2) {
            return t3 = +t3, r3 >>>= 0, o2 || P2(e3, 0, r3, 4), i.write(e3, t3, r3, n3, 23, 4), r3 + 4;
          }
          function D(e3, t3, r3, n3, o2) {
            return t3 = +t3, r3 >>>= 0, o2 || P2(e3, 0, r3, 8), i.write(e3, t3, r3, n3, 52, 8), r3 + 8;
          }
          l.prototype.slice = function(e3, t3) {
            const r3 = this.length;
            (e3 = ~~e3) < 0 ? (e3 += r3) < 0 && (e3 = 0) : e3 > r3 && (e3 = r3), (t3 = void 0 === t3 ? r3 : ~~t3) < 0 ? (t3 += r3) < 0 && (t3 = 0) : t3 > r3 && (t3 = r3), t3 < e3 && (t3 = e3);
            const n3 = this.subarray(e3, t3);
            return Object.setPrototypeOf(n3, l.prototype), n3;
          }, l.prototype.readUintLE = l.prototype.readUIntLE = function(e3, t3, r3) {
            e3 >>>= 0, t3 >>>= 0, r3 || M(e3, t3, this.length);
            let n3 = this[e3], i2 = 1, o2 = 0;
            for (; ++o2 < t3 && (i2 *= 256); ) n3 += this[e3 + o2] * i2;
            return n3;
          }, l.prototype.readUintBE = l.prototype.readUIntBE = function(e3, t3, r3) {
            e3 >>>= 0, t3 >>>= 0, r3 || M(e3, t3, this.length);
            let n3 = this[e3 + --t3], i2 = 1;
            for (; t3 > 0 && (i2 *= 256); ) n3 += this[e3 + --t3] * i2;
            return n3;
          }, l.prototype.readUint8 = l.prototype.readUInt8 = function(e3, t3) {
            return e3 >>>= 0, t3 || M(e3, 1, this.length), this[e3];
          }, l.prototype.readUint16LE = l.prototype.readUInt16LE = function(e3, t3) {
            return e3 >>>= 0, t3 || M(e3, 2, this.length), this[e3] | this[e3 + 1] << 8;
          }, l.prototype.readUint16BE = l.prototype.readUInt16BE = function(e3, t3) {
            return e3 >>>= 0, t3 || M(e3, 2, this.length), this[e3] << 8 | this[e3 + 1];
          }, l.prototype.readUint32LE = l.prototype.readUInt32LE = function(e3, t3) {
            return e3 >>>= 0, t3 || M(e3, 4, this.length), (this[e3] | this[e3 + 1] << 8 | this[e3 + 2] << 16) + 16777216 * this[e3 + 3];
          }, l.prototype.readUint32BE = l.prototype.readUInt32BE = function(e3, t3) {
            return e3 >>>= 0, t3 || M(e3, 4, this.length), 16777216 * this[e3] + (this[e3 + 1] << 16 | this[e3 + 2] << 8 | this[e3 + 3]);
          }, l.prototype.readBigUInt64LE = Z((function(e3) {
            G(e3 >>>= 0, "offset");
            const t3 = this[e3], r3 = this[e3 + 7];
            void 0 !== t3 && void 0 !== r3 || Y(e3, this.length - 8);
            const n3 = t3 + 256 * this[++e3] + 65536 * this[++e3] + this[++e3] * 2 ** 24, i2 = this[++e3] + 256 * this[++e3] + 65536 * this[++e3] + r3 * 2 ** 24;
            return BigInt(n3) + (BigInt(i2) << BigInt(32));
          })), l.prototype.readBigUInt64BE = Z((function(e3) {
            G(e3 >>>= 0, "offset");
            const t3 = this[e3], r3 = this[e3 + 7];
            void 0 !== t3 && void 0 !== r3 || Y(e3, this.length - 8);
            const n3 = t3 * 2 ** 24 + 65536 * this[++e3] + 256 * this[++e3] + this[++e3], i2 = this[++e3] * 2 ** 24 + 65536 * this[++e3] + 256 * this[++e3] + r3;
            return (BigInt(n3) << BigInt(32)) + BigInt(i2);
          })), l.prototype.readIntLE = function(e3, t3, r3) {
            e3 >>>= 0, t3 >>>= 0, r3 || M(e3, t3, this.length);
            let n3 = this[e3], i2 = 1, o2 = 0;
            for (; ++o2 < t3 && (i2 *= 256); ) n3 += this[e3 + o2] * i2;
            return i2 *= 128, n3 >= i2 && (n3 -= Math.pow(2, 8 * t3)), n3;
          }, l.prototype.readIntBE = function(e3, t3, r3) {
            e3 >>>= 0, t3 >>>= 0, r3 || M(e3, t3, this.length);
            let n3 = t3, i2 = 1, o2 = this[e3 + --n3];
            for (; n3 > 0 && (i2 *= 256); ) o2 += this[e3 + --n3] * i2;
            return i2 *= 128, o2 >= i2 && (o2 -= Math.pow(2, 8 * t3)), o2;
          }, l.prototype.readInt8 = function(e3, t3) {
            return e3 >>>= 0, t3 || M(e3, 1, this.length), 128 & this[e3] ? -1 * (255 - this[e3] + 1) : this[e3];
          }, l.prototype.readInt16LE = function(e3, t3) {
            e3 >>>= 0, t3 || M(e3, 2, this.length);
            const r3 = this[e3] | this[e3 + 1] << 8;
            return 32768 & r3 ? 4294901760 | r3 : r3;
          }, l.prototype.readInt16BE = function(e3, t3) {
            e3 >>>= 0, t3 || M(e3, 2, this.length);
            const r3 = this[e3 + 1] | this[e3] << 8;
            return 32768 & r3 ? 4294901760 | r3 : r3;
          }, l.prototype.readInt32LE = function(e3, t3) {
            return e3 >>>= 0, t3 || M(e3, 4, this.length), this[e3] | this[e3 + 1] << 8 | this[e3 + 2] << 16 | this[e3 + 3] << 24;
          }, l.prototype.readInt32BE = function(e3, t3) {
            return e3 >>>= 0, t3 || M(e3, 4, this.length), this[e3] << 24 | this[e3 + 1] << 16 | this[e3 + 2] << 8 | this[e3 + 3];
          }, l.prototype.readBigInt64LE = Z((function(e3) {
            G(e3 >>>= 0, "offset");
            const t3 = this[e3], r3 = this[e3 + 7];
            void 0 !== t3 && void 0 !== r3 || Y(e3, this.length - 8);
            const n3 = this[e3 + 4] + 256 * this[e3 + 5] + 65536 * this[e3 + 6] + (r3 << 24);
            return (BigInt(n3) << BigInt(32)) + BigInt(t3 + 256 * this[++e3] + 65536 * this[++e3] + this[++e3] * 2 ** 24);
          })), l.prototype.readBigInt64BE = Z((function(e3) {
            G(e3 >>>= 0, "offset");
            const t3 = this[e3], r3 = this[e3 + 7];
            void 0 !== t3 && void 0 !== r3 || Y(e3, this.length - 8);
            const n3 = (t3 << 24) + 65536 * this[++e3] + 256 * this[++e3] + this[++e3];
            return (BigInt(n3) << BigInt(32)) + BigInt(this[++e3] * 2 ** 24 + 65536 * this[++e3] + 256 * this[++e3] + r3);
          })), l.prototype.readFloatLE = function(e3, t3) {
            return e3 >>>= 0, t3 || M(e3, 4, this.length), i.read(this, e3, true, 23, 4);
          }, l.prototype.readFloatBE = function(e3, t3) {
            return e3 >>>= 0, t3 || M(e3, 4, this.length), i.read(this, e3, false, 23, 4);
          }, l.prototype.readDoubleLE = function(e3, t3) {
            return e3 >>>= 0, t3 || M(e3, 8, this.length), i.read(this, e3, true, 52, 8);
          }, l.prototype.readDoubleBE = function(e3, t3) {
            return e3 >>>= 0, t3 || M(e3, 8, this.length), i.read(this, e3, false, 52, 8);
          }, l.prototype.writeUintLE = l.prototype.writeUIntLE = function(e3, t3, r3, n3) {
            e3 = +e3, t3 >>>= 0, r3 >>>= 0, n3 || O(this, e3, t3, r3, Math.pow(2, 8 * r3) - 1, 0);
            let i2 = 1, o2 = 0;
            for (this[t3] = 255 & e3; ++o2 < r3 && (i2 *= 256); ) this[t3 + o2] = e3 / i2 & 255;
            return t3 + r3;
          }, l.prototype.writeUintBE = l.prototype.writeUIntBE = function(e3, t3, r3, n3) {
            e3 = +e3, t3 >>>= 0, r3 >>>= 0, n3 || O(this, e3, t3, r3, Math.pow(2, 8 * r3) - 1, 0);
            let i2 = r3 - 1, o2 = 1;
            for (this[t3 + i2] = 255 & e3; --i2 >= 0 && (o2 *= 256); ) this[t3 + i2] = e3 / o2 & 255;
            return t3 + r3;
          }, l.prototype.writeUint8 = l.prototype.writeUInt8 = function(e3, t3, r3) {
            return e3 = +e3, t3 >>>= 0, r3 || O(this, e3, t3, 1, 255, 0), this[t3] = 255 & e3, t3 + 1;
          }, l.prototype.writeUint16LE = l.prototype.writeUInt16LE = function(e3, t3, r3) {
            return e3 = +e3, t3 >>>= 0, r3 || O(this, e3, t3, 2, 65535, 0), this[t3] = 255 & e3, this[t3 + 1] = e3 >>> 8, t3 + 2;
          }, l.prototype.writeUint16BE = l.prototype.writeUInt16BE = function(e3, t3, r3) {
            return e3 = +e3, t3 >>>= 0, r3 || O(this, e3, t3, 2, 65535, 0), this[t3] = e3 >>> 8, this[t3 + 1] = 255 & e3, t3 + 2;
          }, l.prototype.writeUint32LE = l.prototype.writeUInt32LE = function(e3, t3, r3) {
            return e3 = +e3, t3 >>>= 0, r3 || O(this, e3, t3, 4, 4294967295, 0), this[t3 + 3] = e3 >>> 24, this[t3 + 2] = e3 >>> 16, this[t3 + 1] = e3 >>> 8, this[t3] = 255 & e3, t3 + 4;
          }, l.prototype.writeUint32BE = l.prototype.writeUInt32BE = function(e3, t3, r3) {
            return e3 = +e3, t3 >>>= 0, r3 || O(this, e3, t3, 4, 4294967295, 0), this[t3] = e3 >>> 24, this[t3 + 1] = e3 >>> 16, this[t3 + 2] = e3 >>> 8, this[t3 + 3] = 255 & e3, t3 + 4;
          }, l.prototype.writeBigUInt64LE = Z((function(e3, t3 = 0) {
            return x(this, e3, t3, BigInt(0), BigInt("0xffffffffffffffff"));
          })), l.prototype.writeBigUInt64BE = Z((function(e3, t3 = 0) {
            return k(this, e3, t3, BigInt(0), BigInt("0xffffffffffffffff"));
          })), l.prototype.writeIntLE = function(e3, t3, r3, n3) {
            if (e3 = +e3, t3 >>>= 0, !n3) {
              const n4 = Math.pow(2, 8 * r3 - 1);
              O(this, e3, t3, r3, n4 - 1, -n4);
            }
            let i2 = 0, o2 = 1, s2 = 0;
            for (this[t3] = 255 & e3; ++i2 < r3 && (o2 *= 256); ) e3 < 0 && 0 === s2 && 0 !== this[t3 + i2 - 1] && (s2 = 1), this[t3 + i2] = (e3 / o2 >> 0) - s2 & 255;
            return t3 + r3;
          }, l.prototype.writeIntBE = function(e3, t3, r3, n3) {
            if (e3 = +e3, t3 >>>= 0, !n3) {
              const n4 = Math.pow(2, 8 * r3 - 1);
              O(this, e3, t3, r3, n4 - 1, -n4);
            }
            let i2 = r3 - 1, o2 = 1, s2 = 0;
            for (this[t3 + i2] = 255 & e3; --i2 >= 0 && (o2 *= 256); ) e3 < 0 && 0 === s2 && 0 !== this[t3 + i2 + 1] && (s2 = 1), this[t3 + i2] = (e3 / o2 >> 0) - s2 & 255;
            return t3 + r3;
          }, l.prototype.writeInt8 = function(e3, t3, r3) {
            return e3 = +e3, t3 >>>= 0, r3 || O(this, e3, t3, 1, 127, -128), e3 < 0 && (e3 = 255 + e3 + 1), this[t3] = 255 & e3, t3 + 1;
          }, l.prototype.writeInt16LE = function(e3, t3, r3) {
            return e3 = +e3, t3 >>>= 0, r3 || O(this, e3, t3, 2, 32767, -32768), this[t3] = 255 & e3, this[t3 + 1] = e3 >>> 8, t3 + 2;
          }, l.prototype.writeInt16BE = function(e3, t3, r3) {
            return e3 = +e3, t3 >>>= 0, r3 || O(this, e3, t3, 2, 32767, -32768), this[t3] = e3 >>> 8, this[t3 + 1] = 255 & e3, t3 + 2;
          }, l.prototype.writeInt32LE = function(e3, t3, r3) {
            return e3 = +e3, t3 >>>= 0, r3 || O(this, e3, t3, 4, 2147483647, -2147483648), this[t3] = 255 & e3, this[t3 + 1] = e3 >>> 8, this[t3 + 2] = e3 >>> 16, this[t3 + 3] = e3 >>> 24, t3 + 4;
          }, l.prototype.writeInt32BE = function(e3, t3, r3) {
            return e3 = +e3, t3 >>>= 0, r3 || O(this, e3, t3, 4, 2147483647, -2147483648), e3 < 0 && (e3 = 4294967295 + e3 + 1), this[t3] = e3 >>> 24, this[t3 + 1] = e3 >>> 16, this[t3 + 2] = e3 >>> 8, this[t3 + 3] = 255 & e3, t3 + 4;
          }, l.prototype.writeBigInt64LE = Z((function(e3, t3 = 0) {
            return x(this, e3, t3, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
          })), l.prototype.writeBigInt64BE = Z((function(e3, t3 = 0) {
            return k(this, e3, t3, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
          })), l.prototype.writeFloatLE = function(e3, t3, r3) {
            return j(this, e3, t3, true, r3);
          }, l.prototype.writeFloatBE = function(e3, t3, r3) {
            return j(this, e3, t3, false, r3);
          }, l.prototype.writeDoubleLE = function(e3, t3, r3) {
            return D(this, e3, t3, true, r3);
          }, l.prototype.writeDoubleBE = function(e3, t3, r3) {
            return D(this, e3, t3, false, r3);
          }, l.prototype.copy = function(e3, t3, r3, n3) {
            if (!l.isBuffer(e3)) throw new TypeError("argument should be a Buffer");
            if (r3 || (r3 = 0), n3 || 0 === n3 || (n3 = this.length), t3 >= e3.length && (t3 = e3.length), t3 || (t3 = 0), n3 > 0 && n3 < r3 && (n3 = r3), n3 === r3) return 0;
            if (0 === e3.length || 0 === this.length) return 0;
            if (t3 < 0) throw new RangeError("targetStart out of bounds");
            if (r3 < 0 || r3 >= this.length) throw new RangeError("Index out of range");
            if (n3 < 0) throw new RangeError("sourceEnd out of bounds");
            n3 > this.length && (n3 = this.length), e3.length - t3 < n3 - r3 && (n3 = e3.length - t3 + r3);
            const i2 = n3 - r3;
            return this === e3 && "function" == typeof Uint8Array.prototype.copyWithin ? this.copyWithin(t3, r3, n3) : Uint8Array.prototype.set.call(e3, this.subarray(r3, n3), t3), i2;
          }, l.prototype.fill = function(e3, t3, r3, n3) {
            if ("string" == typeof e3) {
              if ("string" == typeof t3 ? (n3 = t3, t3 = 0, r3 = this.length) : "string" == typeof r3 && (n3 = r3, r3 = this.length), void 0 !== n3 && "string" != typeof n3) throw new TypeError("encoding must be a string");
              if ("string" == typeof n3 && !l.isEncoding(n3)) throw new TypeError("Unknown encoding: " + n3);
              if (1 === e3.length) {
                const t4 = e3.charCodeAt(0);
                ("utf8" === n3 && t4 < 128 || "latin1" === n3) && (e3 = t4);
              }
            } else "number" == typeof e3 ? e3 &= 255 : "boolean" == typeof e3 && (e3 = Number(e3));
            if (t3 < 0 || this.length < t3 || this.length < r3) throw new RangeError("Out of range index");
            if (r3 <= t3) return this;
            let i2;
            if (t3 >>>= 0, r3 = void 0 === r3 ? this.length : r3 >>> 0, e3 || (e3 = 0), "number" == typeof e3) for (i2 = t3; i2 < r3; ++i2) this[i2] = e3;
            else {
              const o2 = l.isBuffer(e3) ? e3 : l.from(e3, n3), s2 = o2.length;
              if (0 === s2) throw new TypeError('The value "' + e3 + '" is invalid for argument "value"');
              for (i2 = 0; i2 < r3 - t3; ++i2) this[i2 + t3] = o2[i2 % s2];
            }
            return this;
          };
          const F = {};
          function C(e3, t3, r3) {
            F[e3] = class extends r3 {
              constructor() {
                super(), Object.defineProperty(this, "message", { value: t3.apply(this, arguments), writable: true, configurable: true }), this.name = `${this.name} [${e3}]`, this.stack, delete this.name;
              }
              get code() {
                return e3;
              }
              set code(e4) {
                Object.defineProperty(this, "code", { configurable: true, enumerable: true, value: e4, writable: true });
              }
              toString() {
                return `${this.name} [${e3}]: ${this.message}`;
              }
            };
          }
          function $(e3) {
            let t3 = "", r3 = e3.length;
            const n3 = "-" === e3[0] ? 1 : 0;
            for (; r3 >= n3 + 4; r3 -= 3) t3 = `_${e3.slice(r3 - 3, r3)}${t3}`;
            return `${e3.slice(0, r3)}${t3}`;
          }
          function W(e3, t3, r3, n3, i2, o2) {
            if (e3 > r3 || e3 < t3) {
              const n4 = "bigint" == typeof t3 ? "n" : "";
              let i3;
              throw i3 = o2 > 3 ? 0 === t3 || t3 === BigInt(0) ? `>= 0${n4} and < 2${n4} ** ${8 * (o2 + 1)}${n4}` : `>= -(2${n4} ** ${8 * (o2 + 1) - 1}${n4}) and < 2 ** ${8 * (o2 + 1) - 1}${n4}` : `>= ${t3}${n4} and <= ${r3}${n4}`, new F.ERR_OUT_OF_RANGE("value", i3, e3);
            }
            !(function(e4, t4, r4) {
              G(t4, "offset"), void 0 !== e4[t4] && void 0 !== e4[t4 + r4] || Y(t4, e4.length - (r4 + 1));
            })(n3, i2, o2);
          }
          function G(e3, t3) {
            if ("number" != typeof e3) throw new F.ERR_INVALID_ARG_TYPE(t3, "number", e3);
          }
          function Y(e3, t3, r3) {
            if (Math.floor(e3) !== e3) throw G(e3, r3), new F.ERR_OUT_OF_RANGE(r3 || "offset", "an integer", e3);
            if (t3 < 0) throw new F.ERR_BUFFER_OUT_OF_BOUNDS();
            throw new F.ERR_OUT_OF_RANGE(r3 || "offset", `>= ${r3 ? 1 : 0} and <= ${t3}`, e3);
          }
          C("ERR_BUFFER_OUT_OF_BOUNDS", (function(e3) {
            return e3 ? `${e3} is outside of buffer bounds` : "Attempt to access memory outside buffer bounds";
          }), RangeError), C("ERR_INVALID_ARG_TYPE", (function(e3, t3) {
            return `The "${e3}" argument must be of type number. Received type ${typeof t3}`;
          }), TypeError), C("ERR_OUT_OF_RANGE", (function(e3, t3, r3) {
            let n3 = `The value of "${e3}" is out of range.`, i2 = r3;
            return Number.isInteger(r3) && Math.abs(r3) > 2 ** 32 ? i2 = $(String(r3)) : "bigint" == typeof r3 && (i2 = String(r3), (r3 > BigInt(2) ** BigInt(32) || r3 < -(BigInt(2) ** BigInt(32))) && (i2 = $(i2)), i2 += "n"), n3 += ` It must be ${t3}. Received ${i2}`, n3;
          }), RangeError);
          const H = /[^+/0-9A-Za-z-_]/g;
          function V(e3, t3) {
            let r3;
            t3 = t3 || 1 / 0;
            const n3 = e3.length;
            let i2 = null;
            const o2 = [];
            for (let s2 = 0; s2 < n3; ++s2) {
              if (r3 = e3.charCodeAt(s2), r3 > 55295 && r3 < 57344) {
                if (!i2) {
                  if (r3 > 56319) {
                    (t3 -= 3) > -1 && o2.push(239, 191, 189);
                    continue;
                  }
                  if (s2 + 1 === n3) {
                    (t3 -= 3) > -1 && o2.push(239, 191, 189);
                    continue;
                  }
                  i2 = r3;
                  continue;
                }
                if (r3 < 56320) {
                  (t3 -= 3) > -1 && o2.push(239, 191, 189), i2 = r3;
                  continue;
                }
                r3 = 65536 + (i2 - 55296 << 10 | r3 - 56320);
              } else i2 && (t3 -= 3) > -1 && o2.push(239, 191, 189);
              if (i2 = null, r3 < 128) {
                if ((t3 -= 1) < 0) break;
                o2.push(r3);
              } else if (r3 < 2048) {
                if ((t3 -= 2) < 0) break;
                o2.push(r3 >> 6 | 192, 63 & r3 | 128);
              } else if (r3 < 65536) {
                if ((t3 -= 3) < 0) break;
                o2.push(r3 >> 12 | 224, r3 >> 6 & 63 | 128, 63 & r3 | 128);
              } else {
                if (!(r3 < 1114112)) throw new Error("Invalid code point");
                if ((t3 -= 4) < 0) break;
                o2.push(r3 >> 18 | 240, r3 >> 12 & 63 | 128, r3 >> 6 & 63 | 128, 63 & r3 | 128);
              }
            }
            return o2;
          }
          function K(e3) {
            return n2.toByteArray((function(e4) {
              if ((e4 = (e4 = e4.split("=")[0]).trim().replace(H, "")).length < 2) return "";
              for (; e4.length % 4 != 0; ) e4 += "=";
              return e4;
            })(e3));
          }
          function q(e3, t3, r3, n3) {
            let i2;
            for (i2 = 0; i2 < n3 && !(i2 + r3 >= t3.length || i2 >= e3.length); ++i2) t3[i2 + r3] = e3[i2];
            return i2;
          }
          function z(e3, t3) {
            return e3 instanceof t3 || null != e3 && null != e3.constructor && null != e3.constructor.name && e3.constructor.name === t3.name;
          }
          function X(e3) {
            return e3 != e3;
          }
          const J = (function() {
            const e3 = "0123456789abcdef", t3 = new Array(256);
            for (let r3 = 0; r3 < 16; ++r3) {
              const n3 = 16 * r3;
              for (let i2 = 0; i2 < 16; ++i2) t3[n3 + i2] = e3[r3] + e3[i2];
            }
            return t3;
          })();
          function Z(e3) {
            return "undefined" == typeof BigInt ? Q : e3;
          }
          function Q() {
            throw new Error("BigInt not supported");
          }
        }, 2141: (e2, t2, r2) => {
          "use strict";
          const n2 = r2(2020), i = r2(4694), o = r2(6774), s = r2(4666), a = r2(9032), l = r2(4785), u = r2(3070), c = r2(8112);
          e2.exports = { Commented: n2, Diagnose: i, Decoder: o, Encoder: s, Simple: a, Tagged: l, Map: u, SharedValueEncoder: c, comment: n2.comment, decodeAll: o.decodeAll, decodeFirst: o.decodeFirst, decodeAllSync: o.decodeAllSync, decodeFirstSync: o.decodeFirstSync, diagnose: i.diagnose, encode: s.encode, encodeCanonical: s.encodeCanonical, encodeOne: s.encodeOne, encodeAsync: s.encodeAsync, decode: o.decodeFirstSync, leveldb: { decode: o.decodeFirstSync, encode: s.encode, buffer: true, name: "cbor" }, reset() {
            s.reset(), l.reset();
          } };
        }, 2020: (e2, t2, r2) => {
          "use strict";
          const n2 = r2(2830), i = r2(9873), o = r2(6774), s = r2(4202), { MT: a, NUMBYTES: l, SYMS: u } = r2(9066), { Buffer: c } = r2(8764);
          function f(e3) {
            return e3 > 1 ? "s" : "";
          }
          class h extends n2.Transform {
            constructor(e3 = {}) {
              const { depth: t3 = 1, max_depth: r3 = 10, no_summary: n3 = false, tags: i2 = {}, preferWeb: a2, encoding: l2, ...u2 } = e3;
              super({ ...u2, readableObjectMode: false, writableObjectMode: false }), this.depth = t3, this.max_depth = r3, this.all = new s(), i2[24] || (i2[24] = this._tag_24.bind(this)), this.parser = new o({ tags: i2, max_depth: r3, preferWeb: a2, encoding: l2 }), this.parser.on("value", this._on_value.bind(this)), this.parser.on("start", this._on_start.bind(this)), this.parser.on("start-string", this._on_start_string.bind(this)), this.parser.on("stop", this._on_stop.bind(this)), this.parser.on("more-bytes", this._on_more.bind(this)), this.parser.on("error", this._on_error.bind(this)), n3 || this.parser.on("data", this._on_data.bind(this)), this.parser.bs.on("read", this._on_read.bind(this));
            }
            _tag_24(e3) {
              const t3 = new h({ depth: this.depth + 1, no_summary: true });
              t3.on("data", ((e4) => this.push(e4))), t3.on("error", ((e4) => this.emit("error", e4))), t3.end(e3);
            }
            _transform(e3, t3, r3) {
              this.parser.write(e3, t3, r3);
            }
            _flush(e3) {
              return this.parser._flush(e3);
            }
            static comment(e3, t3 = {}, r3 = null) {
              if (null == e3) throw new Error("input required");
              ({ options: t3, cb: r3 } = (function(e4, t4) {
                switch (typeof e4) {
                  case "function":
                    return { options: {}, cb: e4 };
                  case "string":
                    return { options: { encoding: e4 }, cb: t4 };
                  case "number":
                    return { options: { max_depth: e4 }, cb: t4 };
                  case "object":
                    return { options: e4 || {}, cb: t4 };
                  default:
                    throw new TypeError("Unknown option type");
                }
              })(t3, r3));
              const n3 = new s(), { encoding: o2 = "hex", ...a2 } = t3, l2 = new h(a2);
              let u2 = null;
              return "function" == typeof r3 ? (l2.on("end", (() => {
                r3(null, n3.toString("utf8"));
              })), l2.on("error", r3)) : u2 = new Promise(((e4, t4) => {
                l2.on("end", (() => {
                  e4(n3.toString("utf8"));
                })), l2.on("error", t4);
              })), l2.pipe(n3), i.guessEncoding(e3, o2).pipe(l2), u2;
            }
            _on_error(e3) {
              this.push("ERROR: "), this.push(e3.toString()), this.push("\n");
            }
            _on_read(e3) {
              this.all.write(e3);
              const t3 = e3.toString("hex");
              this.push(new Array(this.depth + 1).join("  ")), this.push(t3);
              let r3 = 2 * (this.max_depth - this.depth) - t3.length;
              r3 < 1 && (r3 = 1), this.push(new Array(r3 + 1).join(" ")), this.push("-- ");
            }
            _on_more(e3, t3, r3, n3) {
              let i2 = "";
              switch (this.depth++, e3) {
                case a.POS_INT:
                  i2 = "Positive number,";
                  break;
                case a.NEG_INT:
                  i2 = "Negative number,";
                  break;
                case a.ARRAY:
                  i2 = "Array, length";
                  break;
                case a.MAP:
                  i2 = "Map, count";
                  break;
                case a.BYTE_STRING:
                  i2 = "Bytes, length";
                  break;
                case a.UTF8_STRING:
                  i2 = "String, length";
                  break;
                case a.SIMPLE_FLOAT:
                  i2 = 1 === t3 ? "Simple value," : "Float,";
              }
              this.push(`${i2} next ${t3} byte${f(t3)}
`);
            }
            _on_start_string(e3, t3, r3, n3) {
              let i2 = "";
              switch (this.depth++, e3) {
                case a.BYTE_STRING:
                  i2 = `Bytes, length: ${t3}`;
                  break;
                case a.UTF8_STRING:
                  i2 = `String, length: ${t3.toString()}`;
              }
              this.push(`${i2}
`);
            }
            _on_start(e3, t3, r3, n3) {
              switch (this.depth++, r3) {
                case a.ARRAY:
                  this.push(`[${n3}], `);
                  break;
                case a.MAP:
                  n3 % 2 ? this.push(`{Val:${Math.floor(n3 / 2)}}, `) : this.push(`{Key:${Math.floor(n3 / 2)}}, `);
              }
              switch (e3) {
                case a.TAG:
                  this.push(`Tag #${t3}`), 24 === t3 && this.push(" Encoded CBOR data item");
                  break;
                case a.ARRAY:
                  t3 === u.STREAM ? this.push("Array (streaming)") : this.push(`Array, ${t3} item${f(t3)}`);
                  break;
                case a.MAP:
                  t3 === u.STREAM ? this.push("Map (streaming)") : this.push(`Map, ${t3} pair${f(t3)}`);
                  break;
                case a.BYTE_STRING:
                  this.push("Bytes (streaming)");
                  break;
                case a.UTF8_STRING:
                  this.push("String (streaming)");
              }
              this.push("\n");
            }
            _on_stop(e3) {
              this.depth--;
            }
            _on_value(e3, t3, r3, n3) {
              if (e3 !== u.BREAK) switch (t3) {
                case a.ARRAY:
                  this.push(`[${r3}], `);
                  break;
                case a.MAP:
                  r3 % 2 ? this.push(`{Val:${Math.floor(r3 / 2)}}, `) : this.push(`{Key:${Math.floor(r3 / 2)}}, `);
              }
              const o2 = i.cborValueToString(e3, -1 / 0);
              switch ("string" == typeof e3 || c.isBuffer(e3) ? (e3.length > 0 && (this.push(o2), this.push("\n")), this.depth--) : (this.push(o2), this.push("\n")), n3) {
                case l.ONE:
                case l.TWO:
                case l.FOUR:
                case l.EIGHT:
                  this.depth--;
              }
            }
            _on_data() {
              this.push("0x"), this.push(this.all.read().toString("hex")), this.push("\n");
            }
          }
          e2.exports = h;
        }, 9066: (e2, t2) => {
          "use strict";
          t2.MT = { POS_INT: 0, NEG_INT: 1, BYTE_STRING: 2, UTF8_STRING: 3, ARRAY: 4, MAP: 5, TAG: 6, SIMPLE_FLOAT: 7 }, t2.TAG = { DATE_STRING: 0, DATE_EPOCH: 1, POS_BIGINT: 2, NEG_BIGINT: 3, DECIMAL_FRAC: 4, BIGFLOAT: 5, BASE64URL_EXPECTED: 21, BASE64_EXPECTED: 22, BASE16_EXPECTED: 23, CBOR: 24, URI: 32, BASE64URL: 33, BASE64: 34, REGEXP: 35, MIME: 36, SET: 258 }, t2.NUMBYTES = { ZERO: 0, ONE: 24, TWO: 25, FOUR: 26, EIGHT: 27, INDEFINITE: 31 }, t2.SIMPLE = { FALSE: 20, TRUE: 21, NULL: 22, UNDEFINED: 23 }, t2.SYMS = { NULL: /* @__PURE__ */ Symbol.for("github.com/hildjj/node-cbor/null"), UNDEFINED: /* @__PURE__ */ Symbol.for("github.com/hildjj/node-cbor/undef"), PARENT: /* @__PURE__ */ Symbol.for("github.com/hildjj/node-cbor/parent"), BREAK: /* @__PURE__ */ Symbol.for("github.com/hildjj/node-cbor/break"), STREAM: /* @__PURE__ */ Symbol.for("github.com/hildjj/node-cbor/stream") }, t2.SHIFT32 = 4294967296, t2.BI = { MINUS_ONE: BigInt(-1), NEG_MAX: BigInt(-1) - BigInt(Number.MAX_SAFE_INTEGER), MAXINT32: BigInt("0xffffffff"), MAXINT64: BigInt("0xffffffffffffffff"), SHIFT32: BigInt(t2.SHIFT32) };
        }, 6774: (e2, t2, r2) => {
          "use strict";
          const n2 = r2(71), i = r2(4785), o = r2(9032), s = r2(9873), a = r2(4202), l = (r2(2830), r2(9066)), { MT: u, NUMBYTES: c, SYMS: f, BI: h } = l, { Buffer: d } = r2(8764), p = /* @__PURE__ */ Symbol("count"), b = /* @__PURE__ */ Symbol("major type"), y = /* @__PURE__ */ Symbol("error"), g = /* @__PURE__ */ Symbol("not found");
          function w(e3, t3, r3) {
            const n3 = [];
            return n3[p] = r3, n3[f.PARENT] = e3, n3[b] = t3, n3;
          }
          function _(e3, t3) {
            const r3 = new a();
            return r3[p] = -1, r3[f.PARENT] = e3, r3[b] = t3, r3;
          }
          class m extends Error {
            constructor(e3, t3) {
              super(`Unexpected data: 0x${e3.toString(16)}`), this.name = "UnexpectedDataError", this.byte = e3, this.value = t3;
            }
          }
          function E(e3, t3) {
            switch (typeof e3) {
              case "function":
                return { options: {}, cb: e3 };
              case "string":
                return { options: { encoding: e3 }, cb: t3 };
              case "object":
                return { options: e3 || {}, cb: t3 };
              default:
                throw new TypeError("Unknown option type");
            }
          }
          class S extends n2 {
            constructor(e3 = {}) {
              const { tags: t3 = {}, max_depth: r3 = -1, preferMap: n3 = false, preferWeb: i2 = false, required: o2 = false, encoding: s2 = "hex", extendedResults: l2 = false, preventDuplicateKeys: u2 = false, ...c2 } = e3;
              super({ defaultEncoding: s2, ...c2 }), this.running = true, this.max_depth = r3, this.tags = t3, this.preferMap = n3, this.preferWeb = i2, this.extendedResults = l2, this.required = o2, this.preventDuplicateKeys = u2, l2 && (this.bs.on("read", this._onRead.bind(this)), this.valueBytes = new a());
            }
            static nullcheck(e3) {
              switch (e3) {
                case f.NULL:
                  return null;
                case f.UNDEFINED:
                  return;
                case g:
                  throw new Error("Value not found");
                default:
                  return e3;
              }
            }
            static decodeFirstSync(e3, t3 = {}) {
              if (null == e3) throw new TypeError("input required");
              ({ options: t3 } = E(t3));
              const { encoding: r3 = "hex", ...n3 } = t3, i2 = new S(n3), o2 = s.guessEncoding(e3, r3), a2 = i2._parse();
              let l2 = a2.next();
              for (; !l2.done; ) {
                const e4 = o2.read(l2.value);
                if (null == e4 || e4.length !== l2.value) throw new Error("Insufficient data");
                i2.extendedResults && i2.valueBytes.write(e4), l2 = a2.next(e4);
              }
              let u2 = null;
              if (i2.extendedResults) u2 = l2.value, u2.unused = o2.read();
              else if (u2 = S.nullcheck(l2.value), o2.length > 0) {
                const e4 = o2.read(1);
                throw o2.unshift(e4), new m(e4[0], u2);
              }
              return u2;
            }
            static decodeAllSync(e3, t3 = {}) {
              if (null == e3) throw new TypeError("input required");
              ({ options: t3 } = E(t3));
              const { encoding: r3 = "hex", ...n3 } = t3, i2 = new S(n3), o2 = s.guessEncoding(e3, r3), a2 = [];
              for (; o2.length > 0; ) {
                const e4 = i2._parse();
                let t4 = e4.next();
                for (; !t4.done; ) {
                  const r4 = o2.read(t4.value);
                  if (null == r4 || r4.length !== t4.value) throw new Error("Insufficient data");
                  i2.extendedResults && i2.valueBytes.write(r4), t4 = e4.next(r4);
                }
                a2.push(S.nullcheck(t4.value));
              }
              return a2;
            }
            static decodeFirst(e3, t3 = {}, r3 = null) {
              if (null == e3) throw new TypeError("input required");
              ({ options: t3, cb: r3 } = E(t3, r3));
              const { encoding: n3 = "hex", required: i2 = false, ...o2 } = t3, a2 = new S(o2);
              let l2 = g;
              const u2 = s.guessEncoding(e3, n3), c2 = new Promise(((e4, t4) => {
                a2.on("data", ((e5) => {
                  l2 = S.nullcheck(e5), a2.close();
                })), a2.once("error", ((r4) => a2.extendedResults && r4 instanceof m ? (l2.unused = a2.bs.slice(), e4(l2)) : (l2 !== g && (r4.value = l2), l2 = y, a2.close(), t4(r4)))), a2.once("end", (() => {
                  switch (l2) {
                    case g:
                      return i2 ? t4(new Error("No CBOR found")) : e4(l2);
                    case y:
                      return;
                    default:
                      return e4(l2);
                  }
                }));
              }));
              return "function" == typeof r3 && c2.then(((e4) => r3(null, e4)), r3), u2.pipe(a2), c2;
            }
            static decodeAll(e3, t3 = {}, r3 = null) {
              if (null == e3) throw new TypeError("input required");
              ({ options: t3, cb: r3 } = E(t3, r3));
              const { encoding: n3 = "hex", ...i2 } = t3, o2 = new S(i2), a2 = [];
              o2.on("data", ((e4) => a2.push(S.nullcheck(e4))));
              const l2 = new Promise(((e4, t4) => {
                o2.on("error", t4), o2.on("end", (() => e4(a2)));
              }));
              return "function" == typeof r3 && l2.then(((e4) => r3(void 0, e4)), ((e4) => r3(e4, void 0))), s.guessEncoding(e3, n3).pipe(o2), l2;
            }
            close() {
              this.running = false, this.__fresh = true;
            }
            _onRead(e3) {
              this.valueBytes.write(e3);
            }
            *_parse() {
              let e3 = null, t3 = 0, r3 = null;
              for (; ; ) {
                if (this.max_depth >= 0 && t3 > this.max_depth) throw new Error(`Maximum depth ${this.max_depth} exceeded`);
                const [n3] = yield 1;
                if (!this.running) throw this.bs.unshift(d.from([n3])), new m(n3);
                const l2 = n3 >> 5, y2 = 31 & n3, g2 = null == e3 ? void 0 : e3[b], E2 = null == e3 ? void 0 : e3.length;
                switch (y2) {
                  case c.ONE:
                    this.emit("more-bytes", l2, 1, g2, E2), [r3] = yield 1;
                    break;
                  case c.TWO:
                  case c.FOUR:
                  case c.EIGHT: {
                    const e4 = 1 << y2 - 24;
                    this.emit("more-bytes", l2, e4, g2, E2);
                    const t4 = yield e4;
                    r3 = l2 === u.SIMPLE_FLOAT ? t4 : s.parseCBORint(y2, t4);
                    break;
                  }
                  case 28:
                  case 29:
                  case 30:
                    throw this.running = false, new Error(`Additional info not implemented: ${y2}`);
                  case c.INDEFINITE:
                    switch (l2) {
                      case u.POS_INT:
                      case u.NEG_INT:
                      case u.TAG:
                        throw new Error(`Invalid indefinite encoding for MT ${l2}`);
                    }
                    r3 = -1;
                    break;
                  default:
                    r3 = y2;
                }
                switch (l2) {
                  case u.POS_INT:
                    break;
                  case u.NEG_INT:
                    r3 = r3 === Number.MAX_SAFE_INTEGER ? h.NEG_MAX : "bigint" == typeof r3 ? h.MINUS_ONE - r3 : -1 - r3;
                    break;
                  case u.BYTE_STRING:
                  case u.UTF8_STRING:
                    switch (r3) {
                      case 0:
                        this.emit("start-string", l2, r3, g2, E2), r3 = l2 === u.UTF8_STRING ? "" : this.preferWeb ? new Uint8Array(0) : d.allocUnsafe(0);
                        break;
                      case -1:
                        this.emit("start", l2, f.STREAM, g2, E2), e3 = _(e3, l2), t3++;
                        continue;
                      default:
                        this.emit("start-string", l2, r3, g2, E2), r3 = yield r3, l2 === u.UTF8_STRING ? r3 = s.utf8(r3) : this.preferWeb && (r3 = new Uint8Array(r3.buffer, r3.byteOffset, r3.length));
                    }
                    break;
                  case u.ARRAY:
                  case u.MAP:
                    switch (r3) {
                      case 0:
                        r3 = l2 === u.MAP ? this.preferMap ? /* @__PURE__ */ new Map() : {} : [];
                        break;
                      case -1:
                        this.emit("start", l2, f.STREAM, g2, E2), e3 = w(e3, l2, -1), t3++;
                        continue;
                      default:
                        this.emit("start", l2, r3, g2, E2), e3 = w(e3, l2, r3 * (l2 - 3)), t3++;
                        continue;
                    }
                    break;
                  case u.TAG:
                    this.emit("start", l2, r3, g2, E2), e3 = w(e3, l2, 1), e3.push(r3), t3++;
                    continue;
                  case u.SIMPLE_FLOAT:
                    if ("number" == typeof r3) {
                      if (y2 === c.ONE && r3 < 32) throw new Error(`Invalid two-byte encoding of simple value ${r3}`);
                      const t4 = null != e3;
                      r3 = o.decode(r3, t4, t4 && e3[p] < 0);
                    } else r3 = s.parseCBORfloat(r3);
                }
                this.emit("value", r3, g2, E2, y2);
                let v = false;
                for (; null != e3; ) {
                  if (r3 === f.BREAK) e3[p] = 1;
                  else if (Array.isArray(e3)) e3.push(r3);
                  else {
                    const t4 = e3[b];
                    if (null != t4 && t4 !== l2) throw this.running = false, new Error("Invalid major type in indefinite encoding");
                    e3.write(r3);
                  }
                  if (0 != --e3[p]) {
                    v = true;
                    break;
                  }
                  if (--t3, delete e3[p], Array.isArray(e3)) switch (e3[b]) {
                    case u.ARRAY:
                      r3 = e3;
                      break;
                    case u.MAP: {
                      let t4 = !this.preferMap;
                      if (e3.length % 2 != 0) throw new Error(`Invalid map length: ${e3.length}`);
                      for (let r4 = 0, n5 = e3.length; t4 && r4 < n5; r4 += 2) if ("string" != typeof e3[r4] || "__proto__" === e3[r4]) {
                        t4 = false;
                        break;
                      }
                      if (t4) {
                        r3 = {};
                        for (let t5 = 0, n5 = e3.length; t5 < n5; t5 += 2) {
                          if (this.preventDuplicateKeys && Object.prototype.hasOwnProperty.call(r3, e3[t5])) throw new Error("Duplicate keys in a map");
                          r3[e3[t5]] = e3[t5 + 1];
                        }
                      } else {
                        r3 = /* @__PURE__ */ new Map();
                        for (let t5 = 0, n5 = e3.length; t5 < n5; t5 += 2) {
                          if (this.preventDuplicateKeys && r3.has(e3[t5])) throw new Error("Duplicate keys in a map");
                          r3.set(e3[t5], e3[t5 + 1]);
                        }
                      }
                      break;
                    }
                    case u.TAG:
                      r3 = new i(e3[0], e3[1]).convert(this.tags);
                  }
                  else if (e3 instanceof a) switch (e3[b]) {
                    case u.BYTE_STRING:
                      r3 = e3.slice(), this.preferWeb && (r3 = new Uint8Array(r3.buffer, r3.byteOffset, r3.length));
                      break;
                    case u.UTF8_STRING:
                      r3 = e3.toString("utf-8");
                  }
                  this.emit("stop", e3[b]);
                  const n4 = e3;
                  e3 = e3[f.PARENT], delete n4[f.PARENT], delete n4[b];
                }
                if (!v) {
                  if (this.extendedResults) {
                    const e4 = this.valueBytes.slice(), t4 = { value: S.nullcheck(r3), bytes: e4, length: e4.length };
                    return this.valueBytes = new a(), t4;
                  }
                  return r3;
                }
              }
            }
          }
          S.NOT_FOUND = g, e2.exports = S;
        }, 4694: (e2, t2, r2) => {
          "use strict";
          const n2 = r2(2830), i = r2(6774), o = r2(9873), s = r2(4202), { MT: a, SYMS: l } = r2(9066);
          class u extends n2.Transform {
            constructor(e3 = {}) {
              const { separator: t3 = "\n", stream_errors: r3 = false, tags: n3, max_depth: o2, preferWeb: s2, encoding: a2, ...l2 } = e3;
              super({ ...l2, readableObjectMode: false, writableObjectMode: false }), this.float_bytes = -1, this.separator = t3, this.stream_errors = r3, this.parser = new i({ tags: n3, max_depth: o2, preferWeb: s2, encoding: a2 }), this.parser.on("more-bytes", this._on_more.bind(this)), this.parser.on("value", this._on_value.bind(this)), this.parser.on("start", this._on_start.bind(this)), this.parser.on("stop", this._on_stop.bind(this)), this.parser.on("data", this._on_data.bind(this)), this.parser.on("error", this._on_error.bind(this));
            }
            _transform(e3, t3, r3) {
              this.parser.write(e3, t3, r3);
            }
            _flush(e3) {
              this.parser._flush(((t3) => this.stream_errors ? (t3 && this._on_error(t3), e3()) : e3(t3)));
            }
            static diagnose(e3, t3 = {}, r3 = null) {
              if (null == e3) throw new TypeError("input required");
              ({ options: t3, cb: r3 } = (function(e4, t4) {
                switch (typeof e4) {
                  case "function":
                    return { options: {}, cb: e4 };
                  case "string":
                    return { options: { encoding: e4 }, cb: t4 };
                  case "object":
                    return { options: e4 || {}, cb: t4 };
                  default:
                    throw new TypeError("Unknown option type");
                }
              })(t3, r3));
              const { encoding: n3 = "hex", ...i2 } = t3, a2 = new s(), l2 = new u(i2);
              let c = null;
              return "function" == typeof r3 ? (l2.on("end", (() => r3(null, a2.toString("utf8")))), l2.on("error", r3)) : c = new Promise(((e4, t4) => {
                l2.on("end", (() => e4(a2.toString("utf8")))), l2.on("error", t4);
              })), l2.pipe(a2), o.guessEncoding(e3, n3).pipe(l2), c;
            }
            _on_error(e3) {
              this.stream_errors ? this.push(e3.toString()) : this.emit("error", e3);
            }
            _on_more(e3, t3, r3, n3) {
              e3 === a.SIMPLE_FLOAT && (this.float_bytes = { 2: 1, 4: 2, 8: 3 }[t3]);
            }
            _fore(e3, t3) {
              switch (e3) {
                case a.BYTE_STRING:
                case a.UTF8_STRING:
                case a.ARRAY:
                  t3 > 0 && this.push(", ");
                  break;
                case a.MAP:
                  t3 > 0 && (t3 % 2 ? this.push(": ") : this.push(", "));
              }
            }
            _on_value(e3, t3, r3) {
              if (e3 === l.BREAK) return;
              this._fore(t3, r3);
              const n3 = this.float_bytes;
              this.float_bytes = -1, this.push(o.cborValueToString(e3, n3));
            }
            _on_start(e3, t3, r3, n3) {
              switch (this._fore(r3, n3), e3) {
                case a.TAG:
                  this.push(`${t3}(`);
                  break;
                case a.ARRAY:
                  this.push("[");
                  break;
                case a.MAP:
                  this.push("{");
                  break;
                case a.BYTE_STRING:
                case a.UTF8_STRING:
                  this.push("(");
              }
              t3 === l.STREAM && this.push("_ ");
            }
            _on_stop(e3) {
              switch (e3) {
                case a.TAG:
                  this.push(")");
                  break;
                case a.ARRAY:
                  this.push("]");
                  break;
                case a.MAP:
                  this.push("}");
                  break;
                case a.BYTE_STRING:
                case a.UTF8_STRING:
                  this.push(")");
              }
            }
            _on_data() {
              this.push(this.separator);
            }
          }
          e2.exports = u;
        }, 4666: (e2, t2, r2) => {
          "use strict";
          const n2 = r2(2830), i = r2(4202), o = r2(9873), s = r2(9066), { MT: a, NUMBYTES: l, SHIFT32: u, SIMPLE: c, SYMS: f, TAG: h, BI: d } = s, { Buffer: p } = r2(8764), b = a.SIMPLE_FLOAT << 5 | l.TWO, y = a.SIMPLE_FLOAT << 5 | l.FOUR, g = a.SIMPLE_FLOAT << 5 | l.EIGHT, w = a.SIMPLE_FLOAT << 5 | c.TRUE, _ = a.SIMPLE_FLOAT << 5 | c.FALSE, m = a.SIMPLE_FLOAT << 5 | c.UNDEFINED, E = a.SIMPLE_FLOAT << 5 | c.NULL, S = p.from([255]), v = p.from("f97e00", "hex"), A = p.from("f9fc00", "hex"), I = p.from("f97c00", "hex"), T = p.from("f98000", "hex"), R = {};
          let B = {};
          class N extends n2.Transform {
            constructor(e3 = {}) {
              const { canonical: t3 = false, encodeUndefined: r3, disallowUndefinedKeys: n3 = false, dateType: i2 = "number", collapseBigIntegers: o2 = false, detectLoops: s2 = false, omitUndefinedProperties: a2 = false, genTypes: l2 = [], ...u2 } = e3;
              if (super({ ...u2, readableObjectMode: false, writableObjectMode: true }), this.canonical = t3, this.encodeUndefined = r3, this.disallowUndefinedKeys = n3, this.dateType = (function(e4) {
                if (!e4) return "number";
                switch (e4.toLowerCase()) {
                  case "number":
                    return "number";
                  case "float":
                    return "float";
                  case "int":
                  case "integer":
                    return "int";
                  case "string":
                    return "string";
                }
                throw new TypeError(`dateType invalid, got "${e4}"`);
              })(i2), this.collapseBigIntegers = !!this.canonical || o2, this.detectLoops = void 0, "boolean" == typeof s2) s2 && (this.detectLoops = /* @__PURE__ */ new WeakSet());
              else {
                if (!(s2 instanceof WeakSet)) throw new TypeError("detectLoops must be boolean or WeakSet");
                this.detectLoops = s2;
              }
              if (this.omitUndefinedProperties = a2, this.semanticTypes = { ...N.SEMANTIC_TYPES }, Array.isArray(l2)) for (let e4 = 0, t4 = l2.length; e4 < t4; e4 += 2) this.addSemanticType(l2[e4], l2[e4 + 1]);
              else for (const [e4, t4] of Object.entries(l2)) this.addSemanticType(e4, t4);
            }
            _transform(e3, t3, r3) {
              r3(false === this.pushAny(e3) ? new Error("Push Error") : void 0);
            }
            _flush(e3) {
              e3();
            }
            _pushUInt8(e3) {
              const t3 = p.allocUnsafe(1);
              return t3.writeUInt8(e3, 0), this.push(t3);
            }
            _pushUInt16BE(e3) {
              const t3 = p.allocUnsafe(2);
              return t3.writeUInt16BE(e3, 0), this.push(t3);
            }
            _pushUInt32BE(e3) {
              const t3 = p.allocUnsafe(4);
              return t3.writeUInt32BE(e3, 0), this.push(t3);
            }
            _pushFloatBE(e3) {
              const t3 = p.allocUnsafe(4);
              return t3.writeFloatBE(e3, 0), this.push(t3);
            }
            _pushDoubleBE(e3) {
              const t3 = p.allocUnsafe(8);
              return t3.writeDoubleBE(e3, 0), this.push(t3);
            }
            _pushNaN() {
              return this.push(v);
            }
            _pushInfinity(e3) {
              const t3 = e3 < 0 ? A : I;
              return this.push(t3);
            }
            _pushFloat(e3) {
              if (this.canonical) {
                const t3 = p.allocUnsafe(2);
                if (o.writeHalf(t3, e3)) return this._pushUInt8(b) && this.push(t3);
              }
              return Math.fround(e3) === e3 ? this._pushUInt8(y) && this._pushFloatBE(e3) : this._pushUInt8(g) && this._pushDoubleBE(e3);
            }
            _pushInt(e3, t3, r3) {
              const n3 = t3 << 5;
              if (e3 < 24) return this._pushUInt8(n3 | e3);
              if (e3 <= 255) return this._pushUInt8(n3 | l.ONE) && this._pushUInt8(e3);
              if (e3 <= 65535) return this._pushUInt8(n3 | l.TWO) && this._pushUInt16BE(e3);
              if (e3 <= 4294967295) return this._pushUInt8(n3 | l.FOUR) && this._pushUInt32BE(e3);
              let i2 = Number.MAX_SAFE_INTEGER;
              return t3 === a.NEG_INT && i2--, e3 <= i2 ? this._pushUInt8(n3 | l.EIGHT) && this._pushUInt32BE(Math.floor(e3 / u)) && this._pushUInt32BE(e3 % u) : t3 === a.NEG_INT ? this._pushFloat(r3) : this._pushFloat(e3);
            }
            _pushIntNum(e3) {
              return Object.is(e3, -0) ? this.push(T) : e3 < 0 ? this._pushInt(-e3 - 1, a.NEG_INT, e3) : this._pushInt(e3, a.POS_INT);
            }
            _pushNumber(e3) {
              return isNaN(e3) ? this._pushNaN() : isFinite(e3) ? Math.round(e3) === e3 ? this._pushIntNum(e3) : this._pushFloat(e3) : this._pushInfinity(e3);
            }
            _pushString(e3) {
              const t3 = p.byteLength(e3, "utf8");
              return this._pushInt(t3, a.UTF8_STRING) && this.push(e3, "utf8");
            }
            _pushBoolean(e3) {
              return this._pushUInt8(e3 ? w : _);
            }
            _pushUndefined(e3) {
              switch (typeof this.encodeUndefined) {
                case "undefined":
                  return this._pushUInt8(m);
                case "function":
                  return this.pushAny(this.encodeUndefined(e3));
                case "object": {
                  const e4 = o.bufferishToBuffer(this.encodeUndefined);
                  if (e4) return this.push(e4);
                }
              }
              return this.pushAny(this.encodeUndefined);
            }
            _pushNull(e3) {
              return this._pushUInt8(E);
            }
            _pushTag(e3) {
              return this._pushInt(e3, a.TAG);
            }
            _pushJSBigint(e3) {
              let t3 = a.POS_INT, r3 = h.POS_BIGINT;
              if (e3 < 0 && (e3 = -e3 + d.MINUS_ONE, t3 = a.NEG_INT, r3 = h.NEG_BIGINT), this.collapseBigIntegers && e3 <= d.MAXINT64) return e3 <= 4294967295 ? this._pushInt(Number(e3), t3) : this._pushUInt8(t3 << 5 | l.EIGHT) && this._pushUInt32BE(Number(e3 / d.SHIFT32)) && this._pushUInt32BE(Number(e3 % d.SHIFT32));
              let n3 = e3.toString(16);
              n3.length % 2 && (n3 = `0${n3}`);
              const i2 = p.from(n3, "hex");
              return this._pushTag(r3) && N._pushBuffer(this, i2);
            }
            _pushObject(e3, t3) {
              if (!e3) return this._pushNull(e3);
              if (!(t3 = { indefinite: false, skipTypes: false, ...t3 }).indefinite && this.detectLoops) {
                if (this.detectLoops.has(e3)) throw new Error("Loop detected while CBOR encoding.\nCall removeLoopDetectors before resuming.");
                this.detectLoops.add(e3);
              }
              if (!t3.skipTypes) {
                const t4 = e3.encodeCBOR;
                if ("function" == typeof t4) return t4.call(e3, this);
                const r4 = this.semanticTypes[e3.constructor.name];
                if (r4) return r4.call(e3, this, e3);
              }
              const r3 = Object.keys(e3).filter(((t4) => {
                const r4 = typeof e3[t4];
                return "function" !== r4 && (!this.omitUndefinedProperties || "undefined" !== r4);
              })), n3 = {};
              if (this.canonical && r3.sort(((e4, t4) => {
                const r4 = n3[e4] || (n3[e4] = N.encode(e4)), i3 = n3[t4] || (n3[t4] = N.encode(t4));
                return r4.compare(i3);
              })), t3.indefinite) {
                if (!this._pushUInt8(a.MAP << 5 | l.INDEFINITE)) return false;
              } else if (!this._pushInt(r3.length, a.MAP)) return false;
              let i2 = null;
              for (let t4 = 0, o2 = r3.length; t4 < o2; t4++) {
                const o3 = r3[t4];
                if (this.canonical && (i2 = n3[o3])) {
                  if (!this.push(i2)) return false;
                } else if (!this._pushString(o3)) return false;
                if (!this.pushAny(e3[o3])) return false;
              }
              if (t3.indefinite) {
                if (!this.push(S)) return false;
              } else this.detectLoops && this.detectLoops.delete(e3);
              return true;
            }
            _encodeAll(e3) {
              const t3 = new i({ highWaterMark: this.readableHighWaterMark });
              this.pipe(t3);
              for (const t4 of e3) this.pushAny(t4);
              return this.end(), t3.read();
            }
            addSemanticType(e3, t3) {
              const r3 = "string" == typeof e3 ? e3 : e3.name, n3 = this.semanticTypes[r3];
              if (t3) {
                if ("function" != typeof t3) throw new TypeError("fun must be of type function");
                this.semanticTypes[r3] = t3;
              } else n3 && delete this.semanticTypes[r3];
              return n3;
            }
            pushAny(e3) {
              switch (typeof e3) {
                case "number":
                  return this._pushNumber(e3);
                case "bigint":
                  return this._pushJSBigint(e3);
                case "string":
                  return this._pushString(e3);
                case "boolean":
                  return this._pushBoolean(e3);
                case "undefined":
                  return this._pushUndefined(e3);
                case "object":
                  return this._pushObject(e3);
                case "symbol":
                  switch (e3) {
                    case f.NULL:
                      return this._pushNull(null);
                    case f.UNDEFINED:
                      return this._pushUndefined(void 0);
                    default:
                      throw new TypeError(`Unknown symbol: ${e3.toString()}`);
                  }
                default:
                  throw new TypeError(`Unknown type: ${typeof e3}, ${"function" == typeof e3.toString ? e3.toString() : ""}`);
              }
            }
            static pushArray(e3, t3, r3) {
              r3 = { indefinite: false, ...r3 };
              const n3 = t3.length;
              if (r3.indefinite) {
                if (!e3._pushUInt8(a.ARRAY << 5 | l.INDEFINITE)) return false;
              } else if (!e3._pushInt(n3, a.ARRAY)) return false;
              for (let r4 = 0; r4 < n3; r4++) if (!e3.pushAny(t3[r4])) return false;
              return !(r3.indefinite && !e3.push(S));
            }
            removeLoopDetectors() {
              return !!this.detectLoops && (this.detectLoops = /* @__PURE__ */ new WeakSet(), true);
            }
            static _pushDate(e3, t3) {
              switch (e3.dateType) {
                case "string":
                  return e3._pushTag(h.DATE_STRING) && e3._pushString(t3.toISOString());
                case "int":
                  return e3._pushTag(h.DATE_EPOCH) && e3._pushIntNum(Math.round(t3.getTime() / 1e3));
                case "float":
                  return e3._pushTag(h.DATE_EPOCH) && e3._pushFloat(t3.getTime() / 1e3);
                default:
                  return e3._pushTag(h.DATE_EPOCH) && e3.pushAny(t3.getTime() / 1e3);
              }
            }
            static _pushBuffer(e3, t3) {
              return e3._pushInt(t3.length, a.BYTE_STRING) && e3.push(t3);
            }
            static _pushNoFilter(e3, t3) {
              return N._pushBuffer(e3, t3.slice());
            }
            static _pushRegexp(e3, t3) {
              return e3._pushTag(h.REGEXP) && e3.pushAny(t3.source);
            }
            static _pushSet(e3, t3) {
              if (!e3._pushTag(h.SET)) return false;
              if (!e3._pushInt(t3.size, a.ARRAY)) return false;
              for (const r3 of t3) if (!e3.pushAny(r3)) return false;
              return true;
            }
            static _pushURL(e3, t3) {
              return e3._pushTag(h.URI) && e3.pushAny(t3.toString());
            }
            static _pushBoxed(e3, t3) {
              return e3.pushAny(t3.valueOf());
            }
            static _pushMap(e3, t3, r3) {
              r3 = { indefinite: false, ...r3 };
              let n3 = [...t3.entries()];
              if (e3.omitUndefinedProperties && (n3 = n3.filter((([e4, t4]) => void 0 !== t4))), r3.indefinite) {
                if (!e3._pushUInt8(a.MAP << 5 | l.INDEFINITE)) return false;
              } else if (!e3._pushInt(n3.length, a.MAP)) return false;
              if (e3.canonical) {
                const t4 = new N({ genTypes: e3.semanticTypes, canonical: e3.canonical, detectLoops: Boolean(e3.detectLoops), dateType: e3.dateType, disallowUndefinedKeys: e3.disallowUndefinedKeys, collapseBigIntegers: e3.collapseBigIntegers }), r4 = new i({ highWaterMark: e3.readableHighWaterMark });
                t4.pipe(r4), n3.sort((([e4], [n4]) => {
                  t4.pushAny(e4);
                  const i2 = r4.read();
                  t4.pushAny(n4);
                  const o2 = r4.read();
                  return i2.compare(o2);
                }));
                for (const [t5, r5] of n3) {
                  if (e3.disallowUndefinedKeys && void 0 === t5) throw new Error("Invalid Map key: undefined");
                  if (!e3.pushAny(t5) || !e3.pushAny(r5)) return false;
                }
              } else for (const [t4, r4] of n3) {
                if (e3.disallowUndefinedKeys && void 0 === t4) throw new Error("Invalid Map key: undefined");
                if (!e3.pushAny(t4) || !e3.pushAny(r4)) return false;
              }
              return !(r3.indefinite && !e3.push(S));
            }
            static _pushTypedArray(e3, t3) {
              let r3 = 64, n3 = t3.BYTES_PER_ELEMENT;
              const { name: i2 } = t3.constructor;
              return i2.startsWith("Float") ? (r3 |= 16, n3 /= 2) : i2.includes("U") || (r3 |= 8), (i2.includes("Clamped") || 1 !== n3 && !o.isBigEndian()) && (r3 |= 4), r3 |= { 1: 0, 2: 1, 4: 2, 8: 3 }[n3], !!e3._pushTag(r3) && N._pushBuffer(e3, p.from(t3.buffer, t3.byteOffset, t3.byteLength));
            }
            static _pushArrayBuffer(e3, t3) {
              return N._pushBuffer(e3, p.from(t3));
            }
            static encodeIndefinite(e3, t3, r3 = {}) {
              if (null == t3) {
                if (null == this) throw new Error("No object to encode");
                t3 = this;
              }
              const { chunkSize: n3 = 4096 } = r3;
              let i2 = true;
              const s2 = typeof t3;
              let u2 = null;
              if ("string" === s2) {
                i2 = i2 && e3._pushUInt8(a.UTF8_STRING << 5 | l.INDEFINITE);
                let r4 = 0;
                for (; r4 < t3.length; ) {
                  const o2 = r4 + n3;
                  i2 = i2 && e3._pushString(t3.slice(r4, o2)), r4 = o2;
                }
                i2 = i2 && e3.push(S);
              } else if (u2 = o.bufferishToBuffer(t3)) {
                i2 = i2 && e3._pushUInt8(a.BYTE_STRING << 5 | l.INDEFINITE);
                let t4 = 0;
                for (; t4 < u2.length; ) {
                  const r4 = t4 + n3;
                  i2 = i2 && N._pushBuffer(e3, u2.slice(t4, r4)), t4 = r4;
                }
                i2 = i2 && e3.push(S);
              } else if (Array.isArray(t3)) i2 = i2 && N.pushArray(e3, t3, { indefinite: true });
              else if (t3 instanceof Map) i2 = i2 && N._pushMap(e3, t3, { indefinite: true });
              else {
                if ("object" !== s2) throw new Error("Invalid indefinite encoding");
                i2 = i2 && e3._pushObject(t3, { indefinite: true, skipTypes: true });
              }
              return i2;
            }
            static encode(...e3) {
              return new N()._encodeAll(e3);
            }
            static encodeCanonical(...e3) {
              return new N({ canonical: true })._encodeAll(e3);
            }
            static encodeOne(e3, t3) {
              return new N(t3)._encodeAll([e3]);
            }
            static encodeAsync(e3, t3) {
              return new Promise(((r3, n3) => {
                const i2 = [], o2 = new N(t3);
                o2.on("data", ((e4) => i2.push(e4))), o2.on("error", n3), o2.on("finish", (() => r3(p.concat(i2)))), o2.pushAny(e3), o2.end();
              }));
            }
            static get SEMANTIC_TYPES() {
              return B;
            }
            static set SEMANTIC_TYPES(e3) {
              B = e3;
            }
            static reset() {
              N.SEMANTIC_TYPES = { ...R };
            }
          }
          Object.assign(R, { Array: N.pushArray, Date: N._pushDate, Buffer: N._pushBuffer, [p.name]: N._pushBuffer, Map: N._pushMap, NoFilter: N._pushNoFilter, [i.name]: N._pushNoFilter, RegExp: N._pushRegexp, Set: N._pushSet, ArrayBuffer: N._pushArrayBuffer, Uint8ClampedArray: N._pushTypedArray, Uint8Array: N._pushTypedArray, Uint16Array: N._pushTypedArray, Uint32Array: N._pushTypedArray, Int8Array: N._pushTypedArray, Int16Array: N._pushTypedArray, Int32Array: N._pushTypedArray, Float32Array: N._pushTypedArray, Float64Array: N._pushTypedArray, URL: N._pushURL, Boolean: N._pushBoxed, Number: N._pushBoxed, String: N._pushBoxed }), "undefined" != typeof BigUint64Array && (R[BigUint64Array.name] = N._pushTypedArray), "undefined" != typeof BigInt64Array && (R[BigInt64Array.name] = N._pushTypedArray), N.reset(), e2.exports = N;
        }, 3070: (e2, t2, r2) => {
          "use strict";
          const { Buffer: n2 } = r2(8764), i = r2(4666), o = r2(6774), { MT: s } = r2(9066);
          class a extends Map {
            constructor(e3) {
              super(e3);
            }
            static _encode(e3) {
              return i.encodeCanonical(e3).toString("base64");
            }
            static _decode(e3) {
              return o.decodeFirstSync(e3, "base64");
            }
            get(e3) {
              return super.get(a._encode(e3));
            }
            set(e3, t3) {
              return super.set(a._encode(e3), t3);
            }
            delete(e3) {
              return super.delete(a._encode(e3));
            }
            has(e3) {
              return super.has(a._encode(e3));
            }
            *keys() {
              for (const e3 of super.keys()) yield a._decode(e3);
            }
            *entries() {
              for (const e3 of super.entries()) yield [a._decode(e3[0]), e3[1]];
            }
            [Symbol.iterator]() {
              return this.entries();
            }
            forEach(e3, t3) {
              if ("function" != typeof e3) throw new TypeError("Must be function");
              for (const t4 of super.entries()) e3.call(this, t4[1], a._decode(t4[0]), this);
            }
            encodeCBOR(e3) {
              if (!e3._pushInt(this.size, s.MAP)) return false;
              if (e3.canonical) {
                const t3 = Array.from(super.entries()).map(((e4) => [n2.from(e4[0], "base64"), e4[1]]));
                t3.sort(((e4, t4) => e4[0].compare(t4[0])));
                for (const r3 of t3) if (!e3.push(r3[0]) || !e3.pushAny(r3[1])) return false;
              } else for (const t3 of super.entries()) if (!e3.push(n2.from(t3[0], "base64")) || !e3.pushAny(t3[1])) return false;
              return true;
            }
          }
          e2.exports = a;
        }, 1226: (e2) => {
          "use strict";
          class t2 {
            constructor() {
              this.clear();
            }
            clear() {
              this.map = /* @__PURE__ */ new WeakMap(), this.count = 0, this.recording = true;
            }
            stop() {
              this.recording = false;
            }
            check(e3) {
              const r2 = this.map.get(e3);
              if (r2) return r2.length > 1 ? r2[0] || this.recording ? r2[1] : (r2[0] = true, t2.FIRST) : this.recording ? (r2.push(this.count++), r2[1]) : t2.NEVER;
              if (!this.recording) throw new Error("New object detected when not recording");
              return this.map.set(e3, [false]), t2.NEVER;
            }
          }
          t2.NEVER = -1, t2.FIRST = -2, e2.exports = t2;
        }, 8112: (e2, t2, r2) => {
          "use strict";
          const n2 = r2(4666), i = r2(1226), { Buffer: o } = r2(8764);
          class s extends n2 {
            constructor(e3) {
              super(e3), this.valueSharing = new i();
            }
            _pushObject(e3, t3) {
              if (null !== e3) {
                const t4 = this.valueSharing.check(e3);
                switch (t4) {
                  case i.FIRST:
                    this._pushTag(28);
                    break;
                  case i.NEVER:
                    break;
                  default:
                    return this._pushTag(29) && this._pushIntNum(t4);
                }
              }
              return super._pushObject(e3, t3);
            }
            stopRecording() {
              this.valueSharing.stop();
            }
            clearRecording() {
              this.valueSharing.clear();
            }
            static encode(...e3) {
              const t3 = new s();
              t3.on("data", (() => {
              }));
              for (const r3 of e3) t3.pushAny(r3);
              return t3.stopRecording(), t3.removeAllListeners("data"), t3._encodeAll(e3);
            }
            static encodeCanonical(...e3) {
              throw new Error("Cannot encode canonically in a SharedValueEncoder, which serializes objects multiple times.");
            }
            static encodeOne(e3, t3) {
              const r3 = new s(t3);
              return r3.on("data", (() => {
              })), r3.pushAny(e3), r3.stopRecording(), r3.removeAllListeners("data"), r3._encodeAll([e3]);
            }
            static encodeAsync(e3, t3) {
              return new Promise(((r3, n3) => {
                const i2 = [], a = new s(t3);
                a.on("data", (() => {
                })), a.on("error", n3), a.on("finish", (() => r3(o.concat(i2)))), a.pushAny(e3), a.stopRecording(), a.removeAllListeners("data"), a.on("data", ((e4) => i2.push(e4))), a.pushAny(e3), a.end();
              }));
            }
          }
          e2.exports = s;
        }, 9032: (e2, t2, r2) => {
          "use strict";
          const { MT: n2, SIMPLE: i, SYMS: o } = r2(9066);
          class s {
            constructor(e3) {
              if ("number" != typeof e3) throw new Error("Invalid Simple type: " + typeof e3);
              if (e3 < 0 || e3 > 255 || (0 | e3) !== e3) throw new Error(`value must be a small positive integer: ${e3}`);
              this.value = e3;
            }
            toString() {
              return `simple(${this.value})`;
            }
            [/* @__PURE__ */ Symbol.for("nodejs.util.inspect.custom")](e3, t3) {
              return `simple(${this.value})`;
            }
            encodeCBOR(e3) {
              return e3._pushInt(this.value, n2.SIMPLE_FLOAT);
            }
            static isSimple(e3) {
              return e3 instanceof s;
            }
            static decode(e3, t3 = true, r3 = false) {
              switch (e3) {
                case i.FALSE:
                  return false;
                case i.TRUE:
                  return true;
                case i.NULL:
                  return t3 ? null : o.NULL;
                case i.UNDEFINED:
                  if (t3) return;
                  return o.UNDEFINED;
                case -1:
                  if (!t3 || !r3) throw new Error("Invalid BREAK");
                  return o.BREAK;
                default:
                  return new s(e3);
              }
            }
          }
          e2.exports = s;
        }, 4785: (e2, t2, r2) => {
          "use strict";
          const n2 = r2(9066), i = r2(9873), o = /* @__PURE__ */ Symbol("INTERNAL_JSON");
          function s(e3, t3) {
            if (i.isBufferish(e3)) e3.toJSON = t3;
            else if (Array.isArray(e3)) for (const r3 of e3) s(r3, t3);
            else if (e3 && "object" == typeof e3 && (!(e3 instanceof p) || e3.tag < 21 || e3.tag > 23)) for (const r3 of Object.values(e3)) s(r3, t3);
          }
          function a() {
            return i.base64(this);
          }
          function l() {
            return i.base64url(this);
          }
          function u() {
            return this.toString("hex");
          }
          const c = { 0: (e3) => new Date(e3), 1: (e3) => new Date(1e3 * e3), 2: (e3) => i.bufferToBigInt(e3), 3: (e3) => n2.BI.MINUS_ONE - i.bufferToBigInt(e3), 21: (e3, t3) => (i.isBufferish(e3) ? t3[o] = l : s(e3, l), t3), 22: (e3, t3) => (i.isBufferish(e3) ? t3[o] = a : s(e3, a), t3), 23: (e3, t3) => (i.isBufferish(e3) ? t3[o] = u : s(e3, u), t3), 32: (e3) => new URL(e3), 33: (e3, t3) => {
            if (!e3.match(/^[a-zA-Z0-9_-]+$/)) throw new Error("Invalid base64url characters");
            const r3 = e3.length % 4;
            if (1 === r3) throw new Error("Invalid base64url length");
            if (2 === r3) {
              if (-1 === "AQgw".indexOf(e3[e3.length - 1])) throw new Error("Invalid base64 padding");
            } else if (3 === r3 && -1 === "AEIMQUYcgkosw048".indexOf(e3[e3.length - 1])) throw new Error("Invalid base64 padding");
            return t3;
          }, 34: (e3, t3) => {
            const r3 = e3.match(/^[a-zA-Z0-9+/]+(?<padding>={0,2})$/);
            if (!r3) throw new Error("Invalid base64 characters");
            if (e3.length % 4 != 0) throw new Error("Invalid base64 length");
            if ("=" === r3.groups.padding) {
              if (-1 === "AQgw".indexOf(e3[e3.length - 2])) throw new Error("Invalid base64 padding");
            } else if ("==" === r3.groups.padding && -1 === "AEIMQUYcgkosw048".indexOf(e3[e3.length - 3])) throw new Error("Invalid base64 padding");
            return t3;
          }, 35: (e3) => new RegExp(e3), 258: (e3) => new Set(e3) }, f = { 64: Uint8Array, 65: Uint16Array, 66: Uint32Array, 68: Uint8ClampedArray, 69: Uint16Array, 70: Uint32Array, 72: Int8Array, 73: Int16Array, 74: Int32Array, 77: Int16Array, 78: Int32Array, 81: Float32Array, 82: Float64Array, 85: Float32Array, 86: Float64Array };
          function h(e3, t3) {
            if (!i.isBufferish(e3)) throw new TypeError("val not a buffer");
            const { tag: r3 } = t3, n3 = f[r3];
            if (!n3) throw new Error(`Invalid typed array tag: ${r3}`);
            const o2 = 2 ** (((16 & r3) >> 4) + (3 & r3));
            return !(4 & r3) !== i.isBigEndian() && o2 > 1 && (function(e4, t4, r4, n4) {
              const i2 = new DataView(e4), [o3, s2] = { 2: [i2.getUint16, i2.setUint16], 4: [i2.getUint32, i2.setUint32], 8: [i2.getBigUint64, i2.setBigUint64] }[t4], a2 = r4 + n4;
              for (let e5 = r4; e5 < a2; e5 += t4) s2.call(i2, e5, o3.call(i2, e5, true));
            })(e3.buffer, o2, e3.byteOffset, e3.byteLength), new n3(e3.buffer.slice(e3.byteOffset, e3.byteOffset + e3.byteLength));
          }
          "undefined" != typeof BigUint64Array && (f[67] = BigUint64Array, f[71] = BigUint64Array), "undefined" != typeof BigInt64Array && (f[75] = BigInt64Array, f[79] = BigInt64Array);
          for (const e3 of Object.keys(f)) c[e3] = h;
          let d = {};
          class p {
            constructor(e3, t3, r3) {
              if (this.tag = e3, this.value = t3, this.err = r3, "number" != typeof this.tag) throw new Error(`Invalid tag type (${typeof this.tag})`);
              if (this.tag < 0 || (0 | this.tag) !== this.tag) throw new Error(`Tag must be a positive integer: ${this.tag}`);
            }
            toJSON() {
              if (this[o]) return this[o].call(this.value);
              const e3 = { tag: this.tag, value: this.value };
              return this.err && (e3.err = this.err), e3;
            }
            toString() {
              return `${this.tag}(${JSON.stringify(this.value)})`;
            }
            encodeCBOR(e3) {
              return e3._pushTag(this.tag), e3.pushAny(this.value);
            }
            convert(e3) {
              let t3 = null == e3 ? void 0 : e3[this.tag];
              if (null === t3) return this;
              if ("function" != typeof t3 && (t3 = p.TAGS[this.tag], "function" != typeof t3)) return this;
              try {
                return t3.call(this, this.value, this);
              } catch (e4) {
                return e4 && e4.message && e4.message.length > 0 ? this.err = e4.message : this.err = e4, this;
              }
            }
            static get TAGS() {
              return d;
            }
            static set TAGS(e3) {
              d = e3;
            }
            static reset() {
              p.TAGS = { ...c };
            }
          }
          p.INTERNAL_JSON = o, p.reset(), e2.exports = p;
        }, 9873: (e2, t2, r2) => {
          "use strict";
          const { Buffer: n2 } = r2(8764), i = r2(4202), o = r2(2830), s = r2(9066), { NUMBYTES: a, SHIFT32: l, BI: u, SYMS: c } = s, f = new TextDecoder("utf8", { fatal: true, ignoreBOM: true });
          t2.utf8 = (e3) => f.decode(e3), t2.utf8.checksUTF8 = true, t2.isBufferish = function(e3) {
            return e3 && "object" == typeof e3 && (n2.isBuffer(e3) || e3 instanceof Uint8Array || e3 instanceof Uint8ClampedArray || e3 instanceof ArrayBuffer || e3 instanceof DataView);
          }, t2.bufferishToBuffer = function(e3) {
            return n2.isBuffer(e3) ? e3 : ArrayBuffer.isView(e3) ? n2.from(e3.buffer, e3.byteOffset, e3.byteLength) : e3 instanceof ArrayBuffer ? n2.from(e3) : null;
          }, t2.parseCBORint = function(e3, t3) {
            switch (e3) {
              case a.ONE:
                return t3.readUInt8(0);
              case a.TWO:
                return t3.readUInt16BE(0);
              case a.FOUR:
                return t3.readUInt32BE(0);
              case a.EIGHT: {
                const e4 = t3.readUInt32BE(0), r3 = t3.readUInt32BE(4);
                return e4 > 2097151 ? BigInt(e4) * u.SHIFT32 + BigInt(r3) : e4 * l + r3;
              }
              default:
                throw new Error(`Invalid additional info for int: ${e3}`);
            }
          }, t2.writeHalf = function(e3, t3) {
            const r3 = n2.allocUnsafe(4);
            r3.writeFloatBE(t3, 0);
            const i2 = r3.readUInt32BE(0);
            if (0 != (8191 & i2)) return false;
            let o2 = i2 >> 16 & 32768;
            const s2 = i2 >> 23 & 255, a2 = 8388607 & i2;
            if (s2 >= 113 && s2 <= 142) o2 += (s2 - 112 << 10) + (a2 >> 13);
            else {
              if (!(s2 >= 103 && s2 < 113)) return false;
              if (a2 & (1 << 126 - s2) - 1) return false;
              o2 += a2 + 8388608 >> 126 - s2;
            }
            return e3.writeUInt16BE(o2), true;
          }, t2.parseHalf = function(e3) {
            const t3 = 128 & e3[0] ? -1 : 1, r3 = (124 & e3[0]) >> 2, n3 = (3 & e3[0]) << 8 | e3[1];
            return r3 ? 31 === r3 ? t3 * (n3 ? NaN : 1 / 0) : t3 * 2 ** (r3 - 25) * (1024 + n3) : 5960464477539063e-23 * t3 * n3;
          }, t2.parseCBORfloat = function(e3) {
            switch (e3.length) {
              case 2:
                return t2.parseHalf(e3);
              case 4:
                return e3.readFloatBE(0);
              case 8:
                return e3.readDoubleBE(0);
              default:
                throw new Error(`Invalid float size: ${e3.length}`);
            }
          }, t2.hex = function(e3) {
            return n2.from(e3.replace(/^0x/, ""), "hex");
          }, t2.bin = function(e3) {
            let t3 = 0, r3 = (e3 = e3.replace(/\s/g, "")).length % 8 || 8;
            const i2 = [];
            for (; r3 <= e3.length; ) i2.push(parseInt(e3.slice(t3, r3), 2)), t3 = r3, r3 += 8;
            return n2.from(i2);
          }, t2.arrayEqual = function(e3, t3) {
            return null == e3 && null == t3 || null != e3 && null != t3 && e3.length === t3.length && e3.every(((e4, r3) => e4 === t3[r3]));
          }, t2.bufferToBigInt = function(e3) {
            return BigInt(`0x${e3.toString("hex")}`);
          }, t2.cborValueToString = function(e3, r3 = -1) {
            switch (typeof e3) {
              case "symbol": {
                switch (e3) {
                  case c.NULL:
                    return "null";
                  case c.UNDEFINED:
                    return "undefined";
                  case c.BREAK:
                    return "BREAK";
                }
                if (e3.description) return e3.description;
                const t3 = e3.toString().match(/^Symbol\((?<name>.*)\)/);
                return t3 && t3.groups.name ? t3.groups.name : "Symbol";
              }
              case "string":
                return JSON.stringify(e3);
              case "bigint":
                return e3.toString();
              case "number": {
                const t3 = Object.is(e3, -0) ? "-0" : String(e3);
                return r3 > 0 ? `${t3}_${r3}` : t3;
              }
              case "object": {
                if (!e3) return "null";
                const n3 = t2.bufferishToBuffer(e3);
                if (n3) {
                  const e4 = n3.toString("hex");
                  return r3 === -1 / 0 ? e4 : `h'${e4}'`;
                }
                return e3 && "function" == typeof e3[/* @__PURE__ */ Symbol.for("nodejs.util.inspect.custom")] ? e3[/* @__PURE__ */ Symbol.for("nodejs.util.inspect.custom")]() : Array.isArray(e3) ? "[]" : "{}";
              }
            }
            return String(e3);
          }, t2.guessEncoding = function(e3, r3) {
            if ("string" == typeof e3) return new i(e3, null == r3 ? "hex" : r3);
            const n3 = t2.bufferishToBuffer(e3);
            if (n3) return new i(n3);
            if ((s2 = e3) instanceof o.Readable || ["read", "on", "pipe"].every(((e4) => "function" == typeof s2[e4]))) return e3;
            var s2;
            throw new Error("Unknown input type");
          };
          const h = { "=": "", "+": "-", "/": "_" };
          t2.base64url = function(e3) {
            return t2.bufferishToBuffer(e3).toString("base64").replace(/[=+/]/g, ((e4) => h[e4]));
          }, t2.base64 = function(e3) {
            return t2.bufferishToBuffer(e3).toString("base64");
          }, t2.isBigEndian = function() {
            const e3 = new Uint8Array(4);
            return !((new Uint32Array(e3.buffer)[0] = 1) & e3[0]);
          };
        }, 4202: (e2, t2, r2) => {
          "use strict";
          const n2 = r2(2830), { Buffer: i } = r2(8764), o = new TextDecoder("utf8", { fatal: true, ignoreBOM: true });
          class s extends n2.Transform {
            constructor(e3, t3, r3 = {}) {
              let n3 = null, o2 = null;
              switch (typeof e3) {
                case "object":
                  i.isBuffer(e3) ? n3 = e3 : e3 && (r3 = e3);
                  break;
                case "string":
                  n3 = e3;
                  break;
                case "undefined":
                  break;
                default:
                  throw new TypeError("Invalid input");
              }
              switch (typeof t3) {
                case "object":
                  t3 && (r3 = t3);
                  break;
                case "string":
                  o2 = t3;
                  break;
                case "undefined":
                  break;
                default:
                  throw new TypeError("Invalid inputEncoding");
              }
              if (!r3 || "object" != typeof r3) throw new TypeError("Invalid options");
              null == n3 && (n3 = r3.input), null == o2 && (o2 = r3.inputEncoding), delete r3.input, delete r3.inputEncoding;
              const s2 = null == r3.watchPipe || r3.watchPipe;
              delete r3.watchPipe;
              const a = Boolean(r3.readError);
              delete r3.readError, super(r3), this.readError = a, s2 && this.on("pipe", ((e4) => {
                const t4 = e4._readableState.objectMode;
                if (this.length > 0 && t4 !== this._readableState.objectMode) throw new Error("Do not switch objectMode in the middle of the stream");
                this._readableState.objectMode = t4, this._writableState.objectMode = t4;
              })), null != n3 && this.end(n3, o2);
            }
            static isNoFilter(e3) {
              return e3 instanceof this;
            }
            static compare(e3, t3) {
              if (!(e3 instanceof this)) throw new TypeError("Arguments must be NoFilters");
              return e3 === t3 ? 0 : e3.compare(t3);
            }
            static concat(e3, t3) {
              if (!Array.isArray(e3)) throw new TypeError("list argument must be an Array of NoFilters");
              if (0 === e3.length || 0 === t3) return i.alloc(0);
              null == t3 && (t3 = e3.reduce(((e4, t4) => {
                if (!(t4 instanceof s)) throw new TypeError("list argument must be an Array of NoFilters");
                return e4 + t4.length;
              }), 0));
              let r3 = true, n3 = true;
              const o2 = e3.map(((e4) => {
                if (!(e4 instanceof s)) throw new TypeError("list argument must be an Array of NoFilters");
                const t4 = e4.slice();
                return i.isBuffer(t4) ? n3 = false : r3 = false, t4;
              }));
              if (r3) return i.concat(o2, t3);
              if (n3) return [].concat(...o2).slice(0, t3);
              throw new Error("Concatenating mixed object and byte streams not supported");
            }
            _transform(e3, t3, r3) {
              this._readableState.objectMode || i.isBuffer(e3) || (e3 = i.from(e3, t3)), this.push(e3), r3();
            }
            _bufArray() {
              let e3 = this._readableState.buffer;
              if (!Array.isArray(e3)) {
                let t3 = e3.head;
                for (e3 = []; null != t3; ) e3.push(t3.data), t3 = t3.next;
              }
              return e3;
            }
            read(e3) {
              const t3 = super.read(e3);
              if (null != t3) {
                if (this.emit("read", t3), this.readError && t3.length < e3) throw new Error(`Read ${t3.length}, wanted ${e3}`);
              } else if (this.readError) throw new Error(`No data available, wanted ${e3}`);
              return t3;
            }
            readFull(e3) {
              let t3 = null, r3 = null, n3 = null;
              return new Promise(((i2, o2) => {
                this.length >= e3 ? i2(this.read(e3)) : this.writableFinished ? o2(new Error(`Stream finished before ${e3} bytes were available`)) : (t3 = (t4) => {
                  this.length >= e3 && i2(this.read(e3));
                }, r3 = () => {
                  o2(new Error(`Stream finished before ${e3} bytes were available`));
                }, n3 = o2, this.on("readable", t3), this.on("error", n3), this.on("finish", r3));
              })).finally((() => {
                t3 && (this.removeListener("readable", t3), this.removeListener("error", n3), this.removeListener("finish", r3));
              }));
            }
            promise(e3) {
              let t3 = false;
              return new Promise(((r3, n3) => {
                this.on("finish", (() => {
                  const n4 = this.read();
                  null == e3 || t3 || (t3 = true, e3(null, n4)), r3(n4);
                })), this.on("error", ((r4) => {
                  null == e3 || t3 || (t3 = true, e3(r4)), n3(r4);
                }));
              }));
            }
            compare(e3) {
              if (!(e3 instanceof s)) throw new TypeError("Arguments must be NoFilters");
              if (this === e3) return 0;
              const t3 = this.slice(), r3 = e3.slice();
              if (i.isBuffer(t3) && i.isBuffer(r3)) return t3.compare(r3);
              throw new Error("Cannot compare streams in object mode");
            }
            equals(e3) {
              return 0 === this.compare(e3);
            }
            slice(e3, t3) {
              if (this._readableState.objectMode) return this._bufArray().slice(e3, t3);
              const r3 = this._bufArray();
              switch (r3.length) {
                case 0:
                  return i.alloc(0);
                case 1:
                  return r3[0].slice(e3, t3);
                default:
                  return i.concat(r3).slice(e3, t3);
              }
            }
            get(e3) {
              return this.slice()[e3];
            }
            toJSON() {
              const e3 = this.slice();
              return i.isBuffer(e3) ? e3.toJSON() : e3;
            }
            toString(e3, t3, r3) {
              const n3 = this.slice(t3, r3);
              return i.isBuffer(n3) ? e3 && "utf8" !== e3 ? n3.toString(e3) : o.decode(n3) : JSON.stringify(n3);
            }
            [/* @__PURE__ */ Symbol.for("nodejs.util.inspect.custom")](e3, t3) {
              const r3 = this._bufArray().map(((e4) => i.isBuffer(e4) ? t3.stylize(e4.toString("hex"), "string") : JSON.stringify(e4))).join(", ");
              return `${this.constructor.name} [${r3}]`;
            }
            get length() {
              return this._readableState.length;
            }
            writeBigInt(e3) {
              let t3 = e3.toString(16);
              if (e3 < 0) {
                const r3 = BigInt(Math.floor(t3.length / 2));
                t3 = (e3 = (BigInt(1) << r3 * BigInt(8)) + e3).toString(16);
              }
              return t3.length % 2 && (t3 = `0${t3}`), this.push(i.from(t3, "hex"));
            }
            readUBigInt(e3) {
              const t3 = this.read(e3);
              return i.isBuffer(t3) ? BigInt(`0x${t3.toString("hex")}`) : null;
            }
            readBigInt(e3) {
              const t3 = this.read(e3);
              if (!i.isBuffer(t3)) return null;
              let r3 = BigInt(`0x${t3.toString("hex")}`);
              return 128 & t3[0] && (r3 -= BigInt(1) << BigInt(t3.length) * BigInt(8)), r3;
            }
            writeUInt8(e3) {
              const t3 = i.from([e3]);
              return this.push(t3);
            }
            writeUInt16LE(e3) {
              const t3 = i.alloc(2);
              return t3.writeUInt16LE(e3), this.push(t3);
            }
            writeUInt16BE(e3) {
              const t3 = i.alloc(2);
              return t3.writeUInt16BE(e3), this.push(t3);
            }
            writeUInt32LE(e3) {
              const t3 = i.alloc(4);
              return t3.writeUInt32LE(e3), this.push(t3);
            }
            writeUInt32BE(e3) {
              const t3 = i.alloc(4);
              return t3.writeUInt32BE(e3), this.push(t3);
            }
            writeInt8(e3) {
              const t3 = i.from([e3]);
              return this.push(t3);
            }
            writeInt16LE(e3) {
              const t3 = i.alloc(2);
              return t3.writeUInt16LE(e3), this.push(t3);
            }
            writeInt16BE(e3) {
              const t3 = i.alloc(2);
              return t3.writeUInt16BE(e3), this.push(t3);
            }
            writeInt32LE(e3) {
              const t3 = i.alloc(4);
              return t3.writeUInt32LE(e3), this.push(t3);
            }
            writeInt32BE(e3) {
              const t3 = i.alloc(4);
              return t3.writeUInt32BE(e3), this.push(t3);
            }
            writeFloatLE(e3) {
              const t3 = i.alloc(4);
              return t3.writeFloatLE(e3), this.push(t3);
            }
            writeFloatBE(e3) {
              const t3 = i.alloc(4);
              return t3.writeFloatBE(e3), this.push(t3);
            }
            writeDoubleLE(e3) {
              const t3 = i.alloc(8);
              return t3.writeDoubleLE(e3), this.push(t3);
            }
            writeDoubleBE(e3) {
              const t3 = i.alloc(8);
              return t3.writeDoubleBE(e3), this.push(t3);
            }
            writeBigInt64LE(e3) {
              const t3 = i.alloc(8);
              return t3.writeBigInt64LE(e3), this.push(t3);
            }
            writeBigInt64BE(e3) {
              const t3 = i.alloc(8);
              return t3.writeBigInt64BE(e3), this.push(t3);
            }
            writeBigUInt64LE(e3) {
              const t3 = i.alloc(8);
              return t3.writeBigUInt64LE(e3), this.push(t3);
            }
            writeBigUInt64BE(e3) {
              const t3 = i.alloc(8);
              return t3.writeBigUInt64BE(e3), this.push(t3);
            }
            readUInt8() {
              const e3 = this.read(1);
              return i.isBuffer(e3) ? e3.readUInt8() : null;
            }
            readUInt16LE() {
              const e3 = this.read(2);
              return i.isBuffer(e3) ? e3.readUInt16LE() : null;
            }
            readUInt16BE() {
              const e3 = this.read(2);
              return i.isBuffer(e3) ? e3.readUInt16BE() : null;
            }
            readUInt32LE() {
              const e3 = this.read(4);
              return i.isBuffer(e3) ? e3.readUInt32LE() : null;
            }
            readUInt32BE() {
              const e3 = this.read(4);
              return i.isBuffer(e3) ? e3.readUInt32BE() : null;
            }
            readInt8() {
              const e3 = this.read(1);
              return i.isBuffer(e3) ? e3.readInt8() : null;
            }
            readInt16LE() {
              const e3 = this.read(2);
              return i.isBuffer(e3) ? e3.readInt16LE() : null;
            }
            readInt16BE() {
              const e3 = this.read(2);
              return i.isBuffer(e3) ? e3.readInt16BE() : null;
            }
            readInt32LE() {
              const e3 = this.read(4);
              return i.isBuffer(e3) ? e3.readInt32LE() : null;
            }
            readInt32BE() {
              const e3 = this.read(4);
              return i.isBuffer(e3) ? e3.readInt32BE() : null;
            }
            readFloatLE() {
              const e3 = this.read(4);
              return i.isBuffer(e3) ? e3.readFloatLE() : null;
            }
            readFloatBE() {
              const e3 = this.read(4);
              return i.isBuffer(e3) ? e3.readFloatBE() : null;
            }
            readDoubleLE() {
              const e3 = this.read(8);
              return i.isBuffer(e3) ? e3.readDoubleLE() : null;
            }
            readDoubleBE() {
              const e3 = this.read(8);
              return i.isBuffer(e3) ? e3.readDoubleBE() : null;
            }
            readBigInt64LE() {
              const e3 = this.read(8);
              return i.isBuffer(e3) ? e3.readBigInt64LE() : null;
            }
            readBigInt64BE() {
              const e3 = this.read(8);
              return i.isBuffer(e3) ? e3.readBigInt64BE() : null;
            }
            readBigUInt64LE() {
              const e3 = this.read(8);
              return i.isBuffer(e3) ? e3.readBigUInt64LE() : null;
            }
            readBigUInt64BE() {
              const e3 = this.read(8);
              return i.isBuffer(e3) ? e3.readBigUInt64BE() : null;
            }
          }
          e2.exports = s;
        }, 71: (e2, t2, r2) => {
          "use strict";
          const n2 = r2(2830), i = r2(4202);
          class o extends n2.Transform {
            constructor(e3) {
              super(e3), this._writableState.objectMode = false, this._readableState.objectMode = true, this.bs = new i(), this.__restart();
            }
            _transform(e3, t3, r3) {
              for (this.bs.write(e3); this.bs.length >= this.__needed; ) {
                let e4 = null;
                const t4 = null === this.__needed ? void 0 : this.bs.read(this.__needed);
                try {
                  e4 = this.__parser.next(t4);
                } catch (e5) {
                  return r3(e5);
                }
                this.__needed && (this.__fresh = false), e4.done ? (this.push(e4.value), this.__restart()) : this.__needed = e4.value || 1 / 0;
              }
              return r3();
            }
            *_parse() {
              throw new Error("Must be implemented in subclass");
            }
            __restart() {
              this.__needed = null, this.__parser = this._parse(), this.__fresh = true;
            }
            _flush(e3) {
              e3(this.__fresh ? null : new Error("unexpected end of input"));
            }
          }
          e2.exports = o;
        }, 7187: (e2) => {
          "use strict";
          var t2, r2 = "object" == typeof Reflect ? Reflect : null, n2 = r2 && "function" == typeof r2.apply ? r2.apply : function(e3, t3, r3) {
            return Function.prototype.apply.call(e3, t3, r3);
          };
          t2 = r2 && "function" == typeof r2.ownKeys ? r2.ownKeys : Object.getOwnPropertySymbols ? function(e3) {
            return Object.getOwnPropertyNames(e3).concat(Object.getOwnPropertySymbols(e3));
          } : function(e3) {
            return Object.getOwnPropertyNames(e3);
          };
          var i = Number.isNaN || function(e3) {
            return e3 != e3;
          };
          function o() {
            o.init.call(this);
          }
          e2.exports = o, e2.exports.once = function(e3, t3) {
            return new Promise((function(r3, n3) {
              function i2(r4) {
                e3.removeListener(t3, o2), n3(r4);
              }
              function o2() {
                "function" == typeof e3.removeListener && e3.removeListener("error", i2), r3([].slice.call(arguments));
              }
              b(e3, t3, o2, { once: true }), "error" !== t3 && (function(e4, t4, r4) {
                "function" == typeof e4.on && b(e4, "error", t4, { once: true });
              })(e3, i2);
            }));
          }, o.EventEmitter = o, o.prototype._events = void 0, o.prototype._eventsCount = 0, o.prototype._maxListeners = void 0;
          var s = 10;
          function a(e3) {
            if ("function" != typeof e3) throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof e3);
          }
          function l(e3) {
            return void 0 === e3._maxListeners ? o.defaultMaxListeners : e3._maxListeners;
          }
          function u(e3, t3, r3, n3) {
            var i2, o2, s2, u2;
            if (a(r3), void 0 === (o2 = e3._events) ? (o2 = e3._events = /* @__PURE__ */ Object.create(null), e3._eventsCount = 0) : (void 0 !== o2.newListener && (e3.emit("newListener", t3, r3.listener ? r3.listener : r3), o2 = e3._events), s2 = o2[t3]), void 0 === s2) s2 = o2[t3] = r3, ++e3._eventsCount;
            else if ("function" == typeof s2 ? s2 = o2[t3] = n3 ? [r3, s2] : [s2, r3] : n3 ? s2.unshift(r3) : s2.push(r3), (i2 = l(e3)) > 0 && s2.length > i2 && !s2.warned) {
              s2.warned = true;
              var c2 = new Error("Possible EventEmitter memory leak detected. " + s2.length + " " + String(t3) + " listeners added. Use emitter.setMaxListeners() to increase limit");
              c2.name = "MaxListenersExceededWarning", c2.emitter = e3, c2.type = t3, c2.count = s2.length, u2 = c2, console && console.warn && console.warn(u2);
            }
            return e3;
          }
          function c() {
            if (!this.fired) return this.target.removeListener(this.type, this.wrapFn), this.fired = true, 0 === arguments.length ? this.listener.call(this.target) : this.listener.apply(this.target, arguments);
          }
          function f(e3, t3, r3) {
            var n3 = { fired: false, wrapFn: void 0, target: e3, type: t3, listener: r3 }, i2 = c.bind(n3);
            return i2.listener = r3, n3.wrapFn = i2, i2;
          }
          function h(e3, t3, r3) {
            var n3 = e3._events;
            if (void 0 === n3) return [];
            var i2 = n3[t3];
            return void 0 === i2 ? [] : "function" == typeof i2 ? r3 ? [i2.listener || i2] : [i2] : r3 ? (function(e4) {
              for (var t4 = new Array(e4.length), r4 = 0; r4 < t4.length; ++r4) t4[r4] = e4[r4].listener || e4[r4];
              return t4;
            })(i2) : p(i2, i2.length);
          }
          function d(e3) {
            var t3 = this._events;
            if (void 0 !== t3) {
              var r3 = t3[e3];
              if ("function" == typeof r3) return 1;
              if (void 0 !== r3) return r3.length;
            }
            return 0;
          }
          function p(e3, t3) {
            for (var r3 = new Array(t3), n3 = 0; n3 < t3; ++n3) r3[n3] = e3[n3];
            return r3;
          }
          function b(e3, t3, r3, n3) {
            if ("function" == typeof e3.on) n3.once ? e3.once(t3, r3) : e3.on(t3, r3);
            else {
              if ("function" != typeof e3.addEventListener) throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof e3);
              e3.addEventListener(t3, (function i2(o2) {
                n3.once && e3.removeEventListener(t3, i2), r3(o2);
              }));
            }
          }
          Object.defineProperty(o, "defaultMaxListeners", { enumerable: true, get: function() {
            return s;
          }, set: function(e3) {
            if ("number" != typeof e3 || e3 < 0 || i(e3)) throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + e3 + ".");
            s = e3;
          } }), o.init = function() {
            void 0 !== this._events && this._events !== Object.getPrototypeOf(this)._events || (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0), this._maxListeners = this._maxListeners || void 0;
          }, o.prototype.setMaxListeners = function(e3) {
            if ("number" != typeof e3 || e3 < 0 || i(e3)) throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + e3 + ".");
            return this._maxListeners = e3, this;
          }, o.prototype.getMaxListeners = function() {
            return l(this);
          }, o.prototype.emit = function(e3) {
            for (var t3 = [], r3 = 1; r3 < arguments.length; r3++) t3.push(arguments[r3]);
            var i2 = "error" === e3, o2 = this._events;
            if (void 0 !== o2) i2 = i2 && void 0 === o2.error;
            else if (!i2) return false;
            if (i2) {
              var s2;
              if (t3.length > 0 && (s2 = t3[0]), s2 instanceof Error) throw s2;
              var a2 = new Error("Unhandled error." + (s2 ? " (" + s2.message + ")" : ""));
              throw a2.context = s2, a2;
            }
            var l2 = o2[e3];
            if (void 0 === l2) return false;
            if ("function" == typeof l2) n2(l2, this, t3);
            else {
              var u2 = l2.length, c2 = p(l2, u2);
              for (r3 = 0; r3 < u2; ++r3) n2(c2[r3], this, t3);
            }
            return true;
          }, o.prototype.addListener = function(e3, t3) {
            return u(this, e3, t3, false);
          }, o.prototype.on = o.prototype.addListener, o.prototype.prependListener = function(e3, t3) {
            return u(this, e3, t3, true);
          }, o.prototype.once = function(e3, t3) {
            return a(t3), this.on(e3, f(this, e3, t3)), this;
          }, o.prototype.prependOnceListener = function(e3, t3) {
            return a(t3), this.prependListener(e3, f(this, e3, t3)), this;
          }, o.prototype.removeListener = function(e3, t3) {
            var r3, n3, i2, o2, s2;
            if (a(t3), void 0 === (n3 = this._events)) return this;
            if (void 0 === (r3 = n3[e3])) return this;
            if (r3 === t3 || r3.listener === t3) 0 == --this._eventsCount ? this._events = /* @__PURE__ */ Object.create(null) : (delete n3[e3], n3.removeListener && this.emit("removeListener", e3, r3.listener || t3));
            else if ("function" != typeof r3) {
              for (i2 = -1, o2 = r3.length - 1; o2 >= 0; o2--) if (r3[o2] === t3 || r3[o2].listener === t3) {
                s2 = r3[o2].listener, i2 = o2;
                break;
              }
              if (i2 < 0) return this;
              0 === i2 ? r3.shift() : (function(e4, t4) {
                for (; t4 + 1 < e4.length; t4++) e4[t4] = e4[t4 + 1];
                e4.pop();
              })(r3, i2), 1 === r3.length && (n3[e3] = r3[0]), void 0 !== n3.removeListener && this.emit("removeListener", e3, s2 || t3);
            }
            return this;
          }, o.prototype.off = o.prototype.removeListener, o.prototype.removeAllListeners = function(e3) {
            var t3, r3, n3;
            if (void 0 === (r3 = this._events)) return this;
            if (void 0 === r3.removeListener) return 0 === arguments.length ? (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0) : void 0 !== r3[e3] && (0 == --this._eventsCount ? this._events = /* @__PURE__ */ Object.create(null) : delete r3[e3]), this;
            if (0 === arguments.length) {
              var i2, o2 = Object.keys(r3);
              for (n3 = 0; n3 < o2.length; ++n3) "removeListener" !== (i2 = o2[n3]) && this.removeAllListeners(i2);
              return this.removeAllListeners("removeListener"), this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0, this;
            }
            if ("function" == typeof (t3 = r3[e3])) this.removeListener(e3, t3);
            else if (void 0 !== t3) for (n3 = t3.length - 1; n3 >= 0; n3--) this.removeListener(e3, t3[n3]);
            return this;
          }, o.prototype.listeners = function(e3) {
            return h(this, e3, true);
          }, o.prototype.rawListeners = function(e3) {
            return h(this, e3, false);
          }, o.listenerCount = function(e3, t3) {
            return "function" == typeof e3.listenerCount ? e3.listenerCount(t3) : d.call(e3, t3);
          }, o.prototype.listenerCount = d, o.prototype.eventNames = function() {
            return this._eventsCount > 0 ? t2(this._events) : [];
          };
        }, 645: (e2, t2) => {
          t2.read = function(e3, t3, r2, n2, i) {
            var o, s, a = 8 * i - n2 - 1, l = (1 << a) - 1, u = l >> 1, c = -7, f = r2 ? i - 1 : 0, h = r2 ? -1 : 1, d = e3[t3 + f];
            for (f += h, o = d & (1 << -c) - 1, d >>= -c, c += a; c > 0; o = 256 * o + e3[t3 + f], f += h, c -= 8) ;
            for (s = o & (1 << -c) - 1, o >>= -c, c += n2; c > 0; s = 256 * s + e3[t3 + f], f += h, c -= 8) ;
            if (0 === o) o = 1 - u;
            else {
              if (o === l) return s ? NaN : 1 / 0 * (d ? -1 : 1);
              s += Math.pow(2, n2), o -= u;
            }
            return (d ? -1 : 1) * s * Math.pow(2, o - n2);
          }, t2.write = function(e3, t3, r2, n2, i, o) {
            var s, a, l, u = 8 * o - i - 1, c = (1 << u) - 1, f = c >> 1, h = 23 === i ? Math.pow(2, -24) - Math.pow(2, -77) : 0, d = n2 ? 0 : o - 1, p = n2 ? 1 : -1, b = t3 < 0 || 0 === t3 && 1 / t3 < 0 ? 1 : 0;
            for (t3 = Math.abs(t3), isNaN(t3) || t3 === 1 / 0 ? (a = isNaN(t3) ? 1 : 0, s = c) : (s = Math.floor(Math.log(t3) / Math.LN2), t3 * (l = Math.pow(2, -s)) < 1 && (s--, l *= 2), (t3 += s + f >= 1 ? h / l : h * Math.pow(2, 1 - f)) * l >= 2 && (s++, l /= 2), s + f >= c ? (a = 0, s = c) : s + f >= 1 ? (a = (t3 * l - 1) * Math.pow(2, i), s += f) : (a = t3 * Math.pow(2, f - 1) * Math.pow(2, i), s = 0)); i >= 8; e3[r2 + d] = 255 & a, d += p, a /= 256, i -= 8) ;
            for (s = s << i | a, u += i; u > 0; e3[r2 + d] = 255 & s, d += p, s /= 256, u -= 8) ;
            e3[r2 + d - p] |= 128 * b;
          };
        }, 5717: (e2) => {
          "function" == typeof Object.create ? e2.exports = function(e3, t2) {
            t2 && (e3.super_ = t2, e3.prototype = Object.create(t2.prototype, { constructor: { value: e3, enumerable: false, writable: true, configurable: true } }));
          } : e2.exports = function(e3, t2) {
            if (t2) {
              e3.super_ = t2;
              var r2 = function() {
              };
              r2.prototype = t2.prototype, e3.prototype = new r2(), e3.prototype.constructor = e3;
            }
          };
        }, 4155: (e2) => {
          var t2, r2, n2 = e2.exports = {};
          function i() {
            throw new Error("setTimeout has not been defined");
          }
          function o() {
            throw new Error("clearTimeout has not been defined");
          }
          function s(e3) {
            if (t2 === setTimeout) return setTimeout(e3, 0);
            if ((t2 === i || !t2) && setTimeout) return t2 = setTimeout, setTimeout(e3, 0);
            try {
              return t2(e3, 0);
            } catch (r3) {
              try {
                return t2.call(null, e3, 0);
              } catch (r4) {
                return t2.call(this, e3, 0);
              }
            }
          }
          !(function() {
            try {
              t2 = "function" == typeof setTimeout ? setTimeout : i;
            } catch (e3) {
              t2 = i;
            }
            try {
              r2 = "function" == typeof clearTimeout ? clearTimeout : o;
            } catch (e3) {
              r2 = o;
            }
          })();
          var a, l = [], u = false, c = -1;
          function f() {
            u && a && (u = false, a.length ? l = a.concat(l) : c = -1, l.length && h());
          }
          function h() {
            if (!u) {
              var e3 = s(f);
              u = true;
              for (var t3 = l.length; t3; ) {
                for (a = l, l = []; ++c < t3; ) a && a[c].run();
                c = -1, t3 = l.length;
              }
              a = null, u = false, (function(e4) {
                if (r2 === clearTimeout) return clearTimeout(e4);
                if ((r2 === o || !r2) && clearTimeout) return r2 = clearTimeout, clearTimeout(e4);
                try {
                  return r2(e4);
                } catch (t4) {
                  try {
                    return r2.call(null, e4);
                  } catch (t5) {
                    return r2.call(this, e4);
                  }
                }
              })(e3);
            }
          }
          function d(e3, t3) {
            this.fun = e3, this.array = t3;
          }
          function p() {
          }
          n2.nextTick = function(e3) {
            var t3 = new Array(arguments.length - 1);
            if (arguments.length > 1) for (var r3 = 1; r3 < arguments.length; r3++) t3[r3 - 1] = arguments[r3];
            l.push(new d(e3, t3)), 1 !== l.length || u || s(h);
          }, d.prototype.run = function() {
            this.fun.apply(null, this.array);
          }, n2.title = "browser", n2.browser = true, n2.env = {}, n2.argv = [], n2.version = "", n2.versions = {}, n2.on = p, n2.addListener = p, n2.once = p, n2.off = p, n2.removeListener = p, n2.removeAllListeners = p, n2.emit = p, n2.prependListener = p, n2.prependOnceListener = p, n2.listeners = function(e3) {
            return [];
          }, n2.binding = function(e3) {
            throw new Error("process.binding is not supported");
          }, n2.cwd = function() {
            return "/";
          }, n2.chdir = function(e3) {
            throw new Error("process.chdir is not supported");
          }, n2.umask = function() {
            return 0;
          };
        }, 6753: (e2, t2, r2) => {
          "use strict";
          e2.exports = r2(5099).Duplex;
        }, 2725: (e2, t2, r2) => {
          "use strict";
          e2.exports = r2(5099).PassThrough;
        }, 9481: (e2, t2, r2) => {
          "use strict";
          e2.exports = r2(5099).Readable;
        }, 4605: (e2, t2, r2) => {
          "use strict";
          e2.exports = r2(5099).Transform;
        }, 4229: (e2, t2, r2) => {
          "use strict";
          e2.exports = r2(5099).Writable;
        }, 196: (e2, t2, r2) => {
          "use strict";
          const { SymbolDispose: n2 } = r2(9061), { AbortError: i, codes: o } = r2(4381), { isNodeStream: s, isWebStream: a, kControllerErrorFunction: l } = r2(5874), u = r2(8610), { ERR_INVALID_ARG_TYPE: c } = o;
          let f;
          e2.exports.addAbortSignal = function(t3, r3) {
            if (((e3, t4) => {
              if ("object" != typeof e3 || !("aborted" in e3)) throw new c("signal", "AbortSignal", e3);
            })(t3), !s(r3) && !a(r3)) throw new c("stream", ["ReadableStream", "WritableStream", "Stream"], r3);
            return e2.exports.addAbortSignalNoValidate(t3, r3);
          }, e2.exports.addAbortSignalNoValidate = function(e3, t3) {
            if ("object" != typeof e3 || !("aborted" in e3)) return t3;
            const o2 = s(t3) ? () => {
              t3.destroy(new i(void 0, { cause: e3.reason }));
            } : () => {
              t3[l](new i(void 0, { cause: e3.reason }));
            };
            if (e3.aborted) o2();
            else {
              f = f || r2(6087).addAbortListener;
              const i2 = f(e3, o2);
              u(t3, i2[n2]);
            }
            return t3;
          };
        }, 7327: (e2, t2, r2) => {
          "use strict";
          const { StringPrototypeSlice: n2, SymbolIterator: i, TypedArrayPrototypeSet: o, Uint8Array: s } = r2(9061), { Buffer: a } = r2(8764), { inspect: l } = r2(6087);
          e2.exports = class {
            constructor() {
              this.head = null, this.tail = null, this.length = 0;
            }
            push(e3) {
              const t3 = { data: e3, next: null };
              this.length > 0 ? this.tail.next = t3 : this.head = t3, this.tail = t3, ++this.length;
            }
            unshift(e3) {
              const t3 = { data: e3, next: this.head };
              0 === this.length && (this.tail = t3), this.head = t3, ++this.length;
            }
            shift() {
              if (0 === this.length) return;
              const e3 = this.head.data;
              return 1 === this.length ? this.head = this.tail = null : this.head = this.head.next, --this.length, e3;
            }
            clear() {
              this.head = this.tail = null, this.length = 0;
            }
            join(e3) {
              if (0 === this.length) return "";
              let t3 = this.head, r3 = "" + t3.data;
              for (; null !== (t3 = t3.next); ) r3 += e3 + t3.data;
              return r3;
            }
            concat(e3) {
              if (0 === this.length) return a.alloc(0);
              const t3 = a.allocUnsafe(e3 >>> 0);
              let r3 = this.head, n3 = 0;
              for (; r3; ) o(t3, r3.data, n3), n3 += r3.data.length, r3 = r3.next;
              return t3;
            }
            consume(e3, t3) {
              const r3 = this.head.data;
              if (e3 < r3.length) {
                const t4 = r3.slice(0, e3);
                return this.head.data = r3.slice(e3), t4;
              }
              return e3 === r3.length ? this.shift() : t3 ? this._getString(e3) : this._getBuffer(e3);
            }
            first() {
              return this.head.data;
            }
            *[i]() {
              for (let e3 = this.head; e3; e3 = e3.next) yield e3.data;
            }
            _getString(e3) {
              let t3 = "", r3 = this.head, i2 = 0;
              do {
                const o2 = r3.data;
                if (!(e3 > o2.length)) {
                  e3 === o2.length ? (t3 += o2, ++i2, r3.next ? this.head = r3.next : this.head = this.tail = null) : (t3 += n2(o2, 0, e3), this.head = r3, r3.data = n2(o2, e3));
                  break;
                }
                t3 += o2, e3 -= o2.length, ++i2;
              } while (null !== (r3 = r3.next));
              return this.length -= i2, t3;
            }
            _getBuffer(e3) {
              const t3 = a.allocUnsafe(e3), r3 = e3;
              let n3 = this.head, i2 = 0;
              do {
                const a2 = n3.data;
                if (!(e3 > a2.length)) {
                  e3 === a2.length ? (o(t3, a2, r3 - e3), ++i2, n3.next ? this.head = n3.next : this.head = this.tail = null) : (o(t3, new s(a2.buffer, a2.byteOffset, e3), r3 - e3), this.head = n3, n3.data = a2.slice(e3));
                  break;
                }
                o(t3, a2, r3 - e3), e3 -= a2.length, ++i2;
              } while (null !== (n3 = n3.next));
              return this.length -= i2, t3;
            }
            [/* @__PURE__ */ Symbol.for("nodejs.util.inspect.custom")](e3, t3) {
              return l(this, { ...t3, depth: 0, customInspect: false });
            }
          };
        }, 299: (e2, t2, r2) => {
          "use strict";
          const { pipeline: n2 } = r2(9946), i = r2(8672), { destroyer: o } = r2(1195), { isNodeStream: s, isReadable: a, isWritable: l, isWebStream: u, isTransformStream: c, isWritableStream: f, isReadableStream: h } = r2(5874), { AbortError: d, codes: { ERR_INVALID_ARG_VALUE: p, ERR_MISSING_ARGS: b } } = r2(4381), y = r2(8610);
          e2.exports = function(...e3) {
            if (0 === e3.length) throw new b("streams");
            if (1 === e3.length) return i.from(e3[0]);
            const t3 = [...e3];
            if ("function" == typeof e3[0] && (e3[0] = i.from(e3[0])), "function" == typeof e3[e3.length - 1]) {
              const t4 = e3.length - 1;
              e3[t4] = i.from(e3[t4]);
            }
            for (let r4 = 0; r4 < e3.length; ++r4) if (s(e3[r4]) || u(e3[r4])) {
              if (r4 < e3.length - 1 && !(a(e3[r4]) || h(e3[r4]) || c(e3[r4]))) throw new p(`streams[${r4}]`, t3[r4], "must be readable");
              if (r4 > 0 && !(l(e3[r4]) || f(e3[r4]) || c(e3[r4]))) throw new p(`streams[${r4}]`, t3[r4], "must be writable");
            }
            let r3, g, w, _, m;
            const E = e3[0], S = n2(e3, (function(e4) {
              const t4 = _;
              _ = null, t4 ? t4(e4) : e4 ? m.destroy(e4) : A || v || m.destroy();
            })), v = !!(l(E) || f(E) || c(E)), A = !!(a(S) || h(S) || c(S));
            if (m = new i({ writableObjectMode: !(null == E || !E.writableObjectMode), readableObjectMode: !(null == S || !S.readableObjectMode), writable: v, readable: A }), v) {
              if (s(E)) m._write = function(e5, t4, n3) {
                E.write(e5, t4) ? n3() : r3 = n3;
              }, m._final = function(e5) {
                E.end(), g = e5;
              }, E.on("drain", (function() {
                if (r3) {
                  const e5 = r3;
                  r3 = null, e5();
                }
              }));
              else if (u(E)) {
                const e5 = (c(E) ? E.writable : E).getWriter();
                m._write = async function(t4, r4, n3) {
                  try {
                    await e5.ready, e5.write(t4).catch((() => {
                    })), n3();
                  } catch (e6) {
                    n3(e6);
                  }
                }, m._final = async function(t4) {
                  try {
                    await e5.ready, e5.close().catch((() => {
                    })), g = t4;
                  } catch (e6) {
                    t4(e6);
                  }
                };
              }
              const e4 = c(S) ? S.readable : S;
              y(e4, (() => {
                if (g) {
                  const e5 = g;
                  g = null, e5();
                }
              }));
            }
            if (A) {
              if (s(S)) S.on("readable", (function() {
                if (w) {
                  const e4 = w;
                  w = null, e4();
                }
              })), S.on("end", (function() {
                m.push(null);
              })), m._read = function() {
                for (; ; ) {
                  const e4 = S.read();
                  if (null === e4) return void (w = m._read);
                  if (!m.push(e4)) return;
                }
              };
              else if (u(S)) {
                const e4 = (c(S) ? S.readable : S).getReader();
                m._read = async function() {
                  for (; ; ) try {
                    const { value: t4, done: r4 } = await e4.read();
                    if (!m.push(t4)) return;
                    if (r4) return void m.push(null);
                  } catch {
                    return;
                  }
                };
              }
            }
            return m._destroy = function(e4, t4) {
              e4 || null === _ || (e4 = new d()), w = null, r3 = null, g = null, null === _ ? t4(e4) : (_ = t4, s(S) && o(S, e4));
            }, m;
          };
        }, 1195: (e2, t2, r2) => {
          "use strict";
          const n2 = r2(4155), { aggregateTwoErrors: i, codes: { ERR_MULTIPLE_CALLBACK: o }, AbortError: s } = r2(4381), { Symbol: a } = r2(9061), { kIsDestroyed: l, isDestroyed: u, isFinished: c, isServerRequest: f } = r2(5874), h = a("kDestroy"), d = a("kConstruct");
          function p(e3, t3, r3) {
            e3 && (e3.stack, t3 && !t3.errored && (t3.errored = e3), r3 && !r3.errored && (r3.errored = e3));
          }
          function b(e3, t3, r3) {
            let i2 = false;
            function o2(t4) {
              if (i2) return;
              i2 = true;
              const o3 = e3._readableState, s2 = e3._writableState;
              p(t4, s2, o3), s2 && (s2.closed = true), o3 && (o3.closed = true), "function" == typeof r3 && r3(t4), t4 ? n2.nextTick(y, e3, t4) : n2.nextTick(g, e3);
            }
            try {
              e3._destroy(t3 || null, o2);
            } catch (t4) {
              o2(t4);
            }
          }
          function y(e3, t3) {
            w(e3, t3), g(e3);
          }
          function g(e3) {
            const t3 = e3._readableState, r3 = e3._writableState;
            r3 && (r3.closeEmitted = true), t3 && (t3.closeEmitted = true), (null != r3 && r3.emitClose || null != t3 && t3.emitClose) && e3.emit("close");
          }
          function w(e3, t3) {
            const r3 = e3._readableState, n3 = e3._writableState;
            null != n3 && n3.errorEmitted || null != r3 && r3.errorEmitted || (n3 && (n3.errorEmitted = true), r3 && (r3.errorEmitted = true), e3.emit("error", t3));
          }
          function _(e3, t3, r3) {
            const i2 = e3._readableState, o2 = e3._writableState;
            if (null != o2 && o2.destroyed || null != i2 && i2.destroyed) return this;
            null != i2 && i2.autoDestroy || null != o2 && o2.autoDestroy ? e3.destroy(t3) : t3 && (t3.stack, o2 && !o2.errored && (o2.errored = t3), i2 && !i2.errored && (i2.errored = t3), r3 ? n2.nextTick(w, e3, t3) : w(e3, t3));
          }
          function m(e3) {
            let t3 = false;
            function r3(r4) {
              if (t3) return void _(e3, null != r4 ? r4 : new o());
              t3 = true;
              const i2 = e3._readableState, s2 = e3._writableState, a2 = s2 || i2;
              i2 && (i2.constructed = true), s2 && (s2.constructed = true), a2.destroyed ? e3.emit(h, r4) : r4 ? _(e3, r4, true) : n2.nextTick(E, e3);
            }
            try {
              e3._construct(((e4) => {
                n2.nextTick(r3, e4);
              }));
            } catch (e4) {
              n2.nextTick(r3, e4);
            }
          }
          function E(e3) {
            e3.emit(d);
          }
          function S(e3) {
            return (null == e3 ? void 0 : e3.setHeader) && "function" == typeof e3.abort;
          }
          function v(e3) {
            e3.emit("close");
          }
          function A(e3, t3) {
            e3.emit("error", t3), n2.nextTick(v, e3);
          }
          e2.exports = { construct: function(e3, t3) {
            if ("function" != typeof e3._construct) return;
            const r3 = e3._readableState, i2 = e3._writableState;
            r3 && (r3.constructed = false), i2 && (i2.constructed = false), e3.once(d, t3), e3.listenerCount(d) > 1 || n2.nextTick(m, e3);
          }, destroyer: function(e3, t3) {
            e3 && !u(e3) && (t3 || c(e3) || (t3 = new s()), f(e3) ? (e3.socket = null, e3.destroy(t3)) : S(e3) ? e3.abort() : S(e3.req) ? e3.req.abort() : "function" == typeof e3.destroy ? e3.destroy(t3) : "function" == typeof e3.close ? e3.close() : t3 ? n2.nextTick(A, e3, t3) : n2.nextTick(v, e3), e3.destroyed || (e3[l] = true));
          }, destroy: function(e3, t3) {
            const r3 = this._readableState, n3 = this._writableState, o2 = n3 || r3;
            return null != n3 && n3.destroyed || null != r3 && r3.destroyed ? ("function" == typeof t3 && t3(), this) : (p(e3, n3, r3), n3 && (n3.destroyed = true), r3 && (r3.destroyed = true), o2.constructed ? b(this, e3, t3) : this.once(h, (function(r4) {
              b(this, i(r4, e3), t3);
            })), this);
          }, undestroy: function() {
            const e3 = this._readableState, t3 = this._writableState;
            e3 && (e3.constructed = true, e3.closed = false, e3.closeEmitted = false, e3.destroyed = false, e3.errored = null, e3.errorEmitted = false, e3.reading = false, e3.ended = false === e3.readable, e3.endEmitted = false === e3.readable), t3 && (t3.constructed = true, t3.destroyed = false, t3.closed = false, t3.closeEmitted = false, t3.errored = null, t3.errorEmitted = false, t3.finalCalled = false, t3.prefinished = false, t3.ended = false === t3.writable, t3.ending = false === t3.writable, t3.finished = false === t3.writable);
          }, errorOrDestroy: _ };
        }, 8672: (e2, t2, r2) => {
          "use strict";
          const { ObjectDefineProperties: n2, ObjectGetOwnPropertyDescriptor: i, ObjectKeys: o, ObjectSetPrototypeOf: s } = r2(9061);
          e2.exports = u;
          const a = r2(911), l = r2(6304);
          s(u.prototype, a.prototype), s(u, a);
          {
            const e3 = o(l.prototype);
            for (let t3 = 0; t3 < e3.length; t3++) {
              const r3 = e3[t3];
              u.prototype[r3] || (u.prototype[r3] = l.prototype[r3]);
            }
          }
          function u(e3) {
            if (!(this instanceof u)) return new u(e3);
            a.call(this, e3), l.call(this, e3), e3 ? (this.allowHalfOpen = false !== e3.allowHalfOpen, false === e3.readable && (this._readableState.readable = false, this._readableState.ended = true, this._readableState.endEmitted = true), false === e3.writable && (this._writableState.writable = false, this._writableState.ending = true, this._writableState.ended = true, this._writableState.finished = true)) : this.allowHalfOpen = true;
          }
          let c, f;
          function h() {
            return void 0 === c && (c = {}), c;
          }
          n2(u.prototype, { writable: { __proto__: null, ...i(l.prototype, "writable") }, writableHighWaterMark: { __proto__: null, ...i(l.prototype, "writableHighWaterMark") }, writableObjectMode: { __proto__: null, ...i(l.prototype, "writableObjectMode") }, writableBuffer: { __proto__: null, ...i(l.prototype, "writableBuffer") }, writableLength: { __proto__: null, ...i(l.prototype, "writableLength") }, writableFinished: { __proto__: null, ...i(l.prototype, "writableFinished") }, writableCorked: { __proto__: null, ...i(l.prototype, "writableCorked") }, writableEnded: { __proto__: null, ...i(l.prototype, "writableEnded") }, writableNeedDrain: { __proto__: null, ...i(l.prototype, "writableNeedDrain") }, destroyed: { __proto__: null, get() {
            return void 0 !== this._readableState && void 0 !== this._writableState && this._readableState.destroyed && this._writableState.destroyed;
          }, set(e3) {
            this._readableState && this._writableState && (this._readableState.destroyed = e3, this._writableState.destroyed = e3);
          } } }), u.fromWeb = function(e3, t3) {
            return h().newStreamDuplexFromReadableWritablePair(e3, t3);
          }, u.toWeb = function(e3) {
            return h().newReadableWritablePairFromDuplex(e3);
          }, u.from = function(e3) {
            return f || (f = r2(7946)), f(e3, "body");
          };
        }, 7946: (e2, t2, r2) => {
          const n2 = r2(4155), i = r2(8764), { isReadable: o, isWritable: s, isIterable: a, isNodeStream: l, isReadableNodeStream: u, isWritableNodeStream: c, isDuplexNodeStream: f, isReadableStream: h, isWritableStream: d } = r2(5874), p = r2(8610), { AbortError: b, codes: { ERR_INVALID_ARG_TYPE: y, ERR_INVALID_RETURN_VALUE: g } } = r2(4381), { destroyer: w } = r2(1195), _ = r2(8672), m = r2(911), E = r2(6304), { createDeferredPromise: S } = r2(6087), v = r2(6307), A = globalThis.Blob || i.Blob, I = void 0 !== A ? function(e3) {
            return e3 instanceof A;
          } : function(e3) {
            return false;
          }, T = globalThis.AbortController || r2(8599).AbortController, { FunctionPrototypeCall: R } = r2(9061);
          class B extends _ {
            constructor(e3) {
              super(e3), false === (null == e3 ? void 0 : e3.readable) && (this._readableState.readable = false, this._readableState.ended = true, this._readableState.endEmitted = true), false === (null == e3 ? void 0 : e3.writable) && (this._writableState.writable = false, this._writableState.ending = true, this._writableState.ended = true, this._writableState.finished = true);
            }
          }
          function N(e3) {
            const t3 = e3.readable && "function" != typeof e3.readable.read ? m.wrap(e3.readable) : e3.readable, r3 = e3.writable;
            let n3, i2, a2, l2, u2, c2 = !!o(t3), f2 = !!s(r3);
            function h2(e4) {
              const t4 = l2;
              l2 = null, t4 ? t4(e4) : e4 && u2.destroy(e4);
            }
            return u2 = new B({ readableObjectMode: !(null == t3 || !t3.readableObjectMode), writableObjectMode: !(null == r3 || !r3.writableObjectMode), readable: c2, writable: f2 }), f2 && (p(r3, ((e4) => {
              f2 = false, e4 && w(t3, e4), h2(e4);
            })), u2._write = function(e4, t4, i3) {
              r3.write(e4, t4) ? i3() : n3 = i3;
            }, u2._final = function(e4) {
              r3.end(), i2 = e4;
            }, r3.on("drain", (function() {
              if (n3) {
                const e4 = n3;
                n3 = null, e4();
              }
            })), r3.on("finish", (function() {
              if (i2) {
                const e4 = i2;
                i2 = null, e4();
              }
            }))), c2 && (p(t3, ((e4) => {
              c2 = false, e4 && w(t3, e4), h2(e4);
            })), t3.on("readable", (function() {
              if (a2) {
                const e4 = a2;
                a2 = null, e4();
              }
            })), t3.on("end", (function() {
              u2.push(null);
            })), u2._read = function() {
              for (; ; ) {
                const e4 = t3.read();
                if (null === e4) return void (a2 = u2._read);
                if (!u2.push(e4)) return;
              }
            }), u2._destroy = function(e4, o2) {
              e4 || null === l2 || (e4 = new b()), a2 = null, n3 = null, i2 = null, null === l2 ? o2(e4) : (l2 = o2, w(r3, e4), w(t3, e4));
            }, u2;
          }
          e2.exports = function e3(t3, r3) {
            if (f(t3)) return t3;
            if (u(t3)) return N({ readable: t3 });
            if (c(t3)) return N({ writable: t3 });
            if (l(t3)) return N({ writable: false, readable: false });
            if (h(t3)) return N({ readable: m.fromWeb(t3) });
            if (d(t3)) return N({ writable: E.fromWeb(t3) });
            if ("function" == typeof t3) {
              const { value: e4, write: i3, final: o2, destroy: s2 } = (function(e5) {
                let { promise: t4, resolve: r4 } = S();
                const i4 = new T(), o3 = i4.signal;
                return { value: e5((async function* () {
                  for (; ; ) {
                    const e6 = t4;
                    t4 = null;
                    const { chunk: i5, done: s3, cb: a2 } = await e6;
                    if (n2.nextTick(a2), s3) return;
                    if (o3.aborted) throw new b(void 0, { cause: o3.reason });
                    ({ promise: t4, resolve: r4 } = S()), yield i5;
                  }
                })(), { signal: o3 }), write(e6, t5, n3) {
                  const i5 = r4;
                  r4 = null, i5({ chunk: e6, done: false, cb: n3 });
                }, final(e6) {
                  const t5 = r4;
                  r4 = null, t5({ done: true, cb: e6 });
                }, destroy(e6, t5) {
                  i4.abort(), t5(e6);
                } };
              })(t3);
              if (a(e4)) return v(B, e4, { objectMode: true, write: i3, final: o2, destroy: s2 });
              const l2 = null == e4 ? void 0 : e4.then;
              if ("function" == typeof l2) {
                let t4;
                const r4 = R(l2, e4, ((e5) => {
                  if (null != e5) throw new g("nully", "body", e5);
                }), ((e5) => {
                  w(t4, e5);
                }));
                return t4 = new B({ objectMode: true, readable: false, write: i3, final(e5) {
                  o2((async () => {
                    try {
                      await r4, n2.nextTick(e5, null);
                    } catch (t5) {
                      n2.nextTick(e5, t5);
                    }
                  }));
                }, destroy: s2 });
              }
              throw new g("Iterable, AsyncIterable or AsyncFunction", r3, e4);
            }
            if (I(t3)) return e3(t3.arrayBuffer());
            if (a(t3)) return v(B, t3, { objectMode: true, writable: false });
            if (h(null == t3 ? void 0 : t3.readable) && d(null == t3 ? void 0 : t3.writable)) return B.fromWeb(t3);
            if ("object" == typeof (null == t3 ? void 0 : t3.writable) || "object" == typeof (null == t3 ? void 0 : t3.readable)) return N({ readable: null != t3 && t3.readable ? u(null == t3 ? void 0 : t3.readable) ? null == t3 ? void 0 : t3.readable : e3(t3.readable) : void 0, writable: null != t3 && t3.writable ? c(null == t3 ? void 0 : t3.writable) ? null == t3 ? void 0 : t3.writable : e3(t3.writable) : void 0 });
            const i2 = null == t3 ? void 0 : t3.then;
            if ("function" == typeof i2) {
              let e4;
              return R(i2, t3, ((t4) => {
                null != t4 && e4.push(t4), e4.push(null);
              }), ((t4) => {
                w(e4, t4);
              })), e4 = new B({ objectMode: true, writable: false, read() {
              } });
            }
            throw new y(r3, ["Blob", "ReadableStream", "WritableStream", "Stream", "Iterable", "AsyncIterable", "Function", "{ readable, writable } pair", "Promise"], t3);
          };
        }, 8610: (e2, t2, r2) => {
          const n2 = r2(4155), { AbortError: i, codes: o } = r2(4381), { ERR_INVALID_ARG_TYPE: s, ERR_STREAM_PREMATURE_CLOSE: a } = o, { kEmptyObject: l, once: u } = r2(6087), { validateAbortSignal: c, validateFunction: f, validateObject: h, validateBoolean: d } = r2(6547), { Promise: p, PromisePrototypeThen: b, SymbolDispose: y } = r2(9061), { isClosed: g, isReadable: w, isReadableNodeStream: _, isReadableStream: m, isReadableFinished: E, isReadableErrored: S, isWritable: v, isWritableNodeStream: A, isWritableStream: I, isWritableFinished: T, isWritableErrored: R, isNodeStream: B, willEmitClose: N, kIsClosedPromise: L } = r2(5874);
          let U;
          const M = () => {
          };
          function O(e3, t3, o2) {
            var d2, p2;
            if (2 === arguments.length ? (o2 = t3, t3 = l) : null == t3 ? t3 = l : h(t3, "options"), f(o2, "callback"), c(t3.signal, "options.signal"), o2 = u(o2), m(e3) || I(e3)) return (function(e4, t4, o3) {
              let s2 = false, a2 = M;
              if (t4.signal) if (a2 = () => {
                s2 = true, o3.call(e4, new i(void 0, { cause: t4.signal.reason }));
              }, t4.signal.aborted) n2.nextTick(a2);
              else {
                U = U || r2(6087).addAbortListener;
                const n3 = U(t4.signal, a2), i2 = o3;
                o3 = u(((...t5) => {
                  n3[y](), i2.apply(e4, t5);
                }));
              }
              const l2 = (...t5) => {
                s2 || n2.nextTick((() => o3.apply(e4, t5)));
              };
              return b(e4[L].promise, l2, l2), M;
            })(e3, t3, o2);
            if (!B(e3)) throw new s("stream", ["ReadableStream", "WritableStream", "Stream"], e3);
            const O2 = null !== (d2 = t3.readable) && void 0 !== d2 ? d2 : _(e3), x = null !== (p2 = t3.writable) && void 0 !== p2 ? p2 : A(e3), k = e3._writableState, P2 = e3._readableState, j = () => {
              e3.writable || C();
            };
            let D = N(e3) && _(e3) === O2 && A(e3) === x, F = T(e3, false);
            const C = () => {
              F = true, e3.destroyed && (D = false), (!D || e3.readable && !O2) && (O2 && !$ || o2.call(e3));
            };
            let $ = E(e3, false);
            const W = () => {
              $ = true, e3.destroyed && (D = false), (!D || e3.writable && !x) && (x && !F || o2.call(e3));
            }, G = (t4) => {
              o2.call(e3, t4);
            };
            let Y = g(e3);
            const H = () => {
              Y = true;
              const t4 = R(e3) || S(e3);
              return t4 && "boolean" != typeof t4 ? o2.call(e3, t4) : O2 && !$ && _(e3, true) && !E(e3, false) ? o2.call(e3, new a()) : !x || F || T(e3, false) ? void o2.call(e3) : o2.call(e3, new a());
            }, V = () => {
              Y = true;
              const t4 = R(e3) || S(e3);
              if (t4 && "boolean" != typeof t4) return o2.call(e3, t4);
              o2.call(e3);
            }, K = () => {
              e3.req.on("finish", C);
            };
            !(function(e4) {
              return e4.setHeader && "function" == typeof e4.abort;
            })(e3) ? x && !k && (e3.on("end", j), e3.on("close", j)) : (e3.on("complete", C), D || e3.on("abort", H), e3.req ? K() : e3.on("request", K)), D || "boolean" != typeof e3.aborted || e3.on("aborted", H), e3.on("end", W), e3.on("finish", C), false !== t3.error && e3.on("error", G), e3.on("close", H), Y ? n2.nextTick(H) : null != k && k.errorEmitted || null != P2 && P2.errorEmitted ? D || n2.nextTick(V) : (O2 || D && !w(e3) || !F && false !== v(e3)) && (x || D && !v(e3) || !$ && false !== w(e3)) ? P2 && e3.req && e3.aborted && n2.nextTick(V) : n2.nextTick(V);
            const q = () => {
              o2 = M, e3.removeListener("aborted", H), e3.removeListener("complete", C), e3.removeListener("abort", H), e3.removeListener("request", K), e3.req && e3.req.removeListener("finish", C), e3.removeListener("end", j), e3.removeListener("close", j), e3.removeListener("finish", C), e3.removeListener("end", W), e3.removeListener("error", G), e3.removeListener("close", H);
            };
            if (t3.signal && !Y) {
              const s2 = () => {
                const r3 = o2;
                q(), r3.call(e3, new i(void 0, { cause: t3.signal.reason }));
              };
              if (t3.signal.aborted) n2.nextTick(s2);
              else {
                U = U || r2(6087).addAbortListener;
                const n3 = U(t3.signal, s2), i2 = o2;
                o2 = u(((...t4) => {
                  n3[y](), i2.apply(e3, t4);
                }));
              }
            }
            return q;
          }
          e2.exports = O, e2.exports.finished = function(e3, t3) {
            var r3;
            let n3 = false;
            return null === t3 && (t3 = l), null !== (r3 = t3) && void 0 !== r3 && r3.cleanup && (d(t3.cleanup, "cleanup"), n3 = t3.cleanup), new p(((r4, i2) => {
              const o2 = O(e3, t3, ((e4) => {
                n3 && o2(), e4 ? i2(e4) : r4();
              }));
            }));
          };
        }, 6307: (e2, t2, r2) => {
          "use strict";
          const n2 = r2(4155), { PromisePrototypeThen: i, SymbolAsyncIterator: o, SymbolIterator: s } = r2(9061), { Buffer: a } = r2(8764), { ERR_INVALID_ARG_TYPE: l, ERR_STREAM_NULL_VALUES: u } = r2(4381).codes;
          e2.exports = function(e3, t3, r3) {
            let c, f;
            if ("string" == typeof t3 || t3 instanceof a) return new e3({ objectMode: true, ...r3, read() {
              this.push(t3), this.push(null);
            } });
            if (t3 && t3[o]) f = true, c = t3[o]();
            else {
              if (!t3 || !t3[s]) throw new l("iterable", ["Iterable"], t3);
              f = false, c = t3[s]();
            }
            const h = new e3({ objectMode: true, highWaterMark: 1, ...r3 });
            let d = false;
            return h._read = function() {
              d || (d = true, (async function() {
                for (; ; ) {
                  try {
                    const { value: e4, done: t4 } = f ? await c.next() : c.next();
                    if (t4) h.push(null);
                    else {
                      const t5 = e4 && "function" == typeof e4.then ? await e4 : e4;
                      if (null === t5) throw d = false, new u();
                      if (h.push(t5)) continue;
                      d = false;
                    }
                  } catch (e4) {
                    h.destroy(e4);
                  }
                  break;
                }
              })());
            }, h._destroy = function(e4, t4) {
              i((async function(e5) {
                const t5 = null != e5, r4 = "function" == typeof c.throw;
                if (t5 && r4) {
                  const { value: t6, done: r5 } = await c.throw(e5);
                  if (await t6, r5) return;
                }
                if ("function" == typeof c.return) {
                  const { value: e6 } = await c.return();
                  await e6;
                }
              })(e4), (() => n2.nextTick(t4, e4)), ((r4) => n2.nextTick(t4, r4 || e4)));
            }, h;
          };
        }, 4870: (e2, t2, r2) => {
          "use strict";
          const { ArrayIsArray: n2, ObjectSetPrototypeOf: i } = r2(9061), { EventEmitter: o } = r2(7187);
          function s(e3) {
            o.call(this, e3);
          }
          function a(e3, t3, r3) {
            if ("function" == typeof e3.prependListener) return e3.prependListener(t3, r3);
            e3._events && e3._events[t3] ? n2(e3._events[t3]) ? e3._events[t3].unshift(r3) : e3._events[t3] = [r3, e3._events[t3]] : e3.on(t3, r3);
          }
          i(s.prototype, o.prototype), i(s, o), s.prototype.pipe = function(e3, t3) {
            const r3 = this;
            function n3(t4) {
              e3.writable && false === e3.write(t4) && r3.pause && r3.pause();
            }
            function i2() {
              r3.readable && r3.resume && r3.resume();
            }
            r3.on("data", n3), e3.on("drain", i2), e3._isStdio || t3 && false === t3.end || (r3.on("end", l), r3.on("close", u));
            let s2 = false;
            function l() {
              s2 || (s2 = true, e3.end());
            }
            function u() {
              s2 || (s2 = true, "function" == typeof e3.destroy && e3.destroy());
            }
            function c(e4) {
              f(), 0 === o.listenerCount(this, "error") && this.emit("error", e4);
            }
            function f() {
              r3.removeListener("data", n3), e3.removeListener("drain", i2), r3.removeListener("end", l), r3.removeListener("close", u), r3.removeListener("error", c), e3.removeListener("error", c), r3.removeListener("end", f), r3.removeListener("close", f), e3.removeListener("close", f);
            }
            return a(r3, "error", c), a(e3, "error", c), r3.on("end", f), r3.on("close", f), e3.on("close", f), e3.emit("pipe", r3), e3;
          }, e2.exports = { Stream: s, prependListener: a };
        }, 4382: (e2, t2, r2) => {
          "use strict";
          const n2 = globalThis.AbortController || r2(8599).AbortController, { codes: { ERR_INVALID_ARG_VALUE: i, ERR_INVALID_ARG_TYPE: o, ERR_MISSING_ARGS: s, ERR_OUT_OF_RANGE: a }, AbortError: l } = r2(4381), { validateAbortSignal: u, validateInteger: c, validateObject: f } = r2(6547), h = r2(9061).Symbol("kWeak"), d = r2(9061).Symbol("kResistStopPropagation"), { finished: p } = r2(8610), b = r2(299), { addAbortSignalNoValidate: y } = r2(196), { isWritable: g, isNodeStream: w } = r2(5874), { deprecate: _ } = r2(6087), { ArrayPrototypePush: m, Boolean: E, MathFloor: S, Number: v, NumberIsNaN: A, Promise: I, PromiseReject: T, PromiseResolve: R, PromisePrototypeThen: B, Symbol: N } = r2(9061), L = N("kEmpty"), U = N("kEof");
          function M(e3, t3) {
            if ("function" != typeof e3) throw new o("fn", ["Function", "AsyncFunction"], e3);
            null != t3 && f(t3, "options"), null != (null == t3 ? void 0 : t3.signal) && u(t3.signal, "options.signal");
            let n3 = 1;
            null != (null == t3 ? void 0 : t3.concurrency) && (n3 = S(t3.concurrency));
            let i2 = n3 - 1;
            return null != (null == t3 ? void 0 : t3.highWaterMark) && (i2 = S(t3.highWaterMark)), c(n3, "options.concurrency", 1), c(i2, "options.highWaterMark", 0), i2 += n3, async function* () {
              const o2 = r2(6087).AbortSignalAny([null == t3 ? void 0 : t3.signal].filter(E)), s2 = this, a2 = [], u2 = { signal: o2 };
              let c2, f2, h2 = false, d2 = 0;
              function p2() {
                h2 = true, b2();
              }
              function b2() {
                d2 -= 1, y2();
              }
              function y2() {
                f2 && !h2 && d2 < n3 && a2.length < i2 && (f2(), f2 = null);
              }
              !(async function() {
                try {
                  for await (let t4 of s2) {
                    if (h2) return;
                    if (o2.aborted) throw new l();
                    try {
                      if (t4 = e3(t4, u2), t4 === L) continue;
                      t4 = R(t4);
                    } catch (e4) {
                      t4 = T(e4);
                    }
                    d2 += 1, B(t4, b2, p2), a2.push(t4), c2 && (c2(), c2 = null), !h2 && (a2.length >= i2 || d2 >= n3) && await new I(((e4) => {
                      f2 = e4;
                    }));
                  }
                  a2.push(U);
                } catch (e4) {
                  const t4 = T(e4);
                  B(t4, b2, p2), a2.push(t4);
                } finally {
                  h2 = true, c2 && (c2(), c2 = null);
                }
              })();
              try {
                for (; ; ) {
                  for (; a2.length > 0; ) {
                    const e4 = await a2[0];
                    if (e4 === U) return;
                    if (o2.aborted) throw new l();
                    e4 !== L && (yield e4), a2.shift(), y2();
                  }
                  await new I(((e4) => {
                    c2 = e4;
                  }));
                }
              } finally {
                h2 = true, f2 && (f2(), f2 = null);
              }
            }.call(this);
          }
          async function O(e3, t3 = void 0) {
            for await (const r3 of x.call(this, e3, t3)) return true;
            return false;
          }
          function x(e3, t3) {
            if ("function" != typeof e3) throw new o("fn", ["Function", "AsyncFunction"], e3);
            return M.call(this, (async function(t4, r3) {
              return await e3(t4, r3) ? t4 : L;
            }), t3);
          }
          class k extends s {
            constructor() {
              super("reduce"), this.message = "Reduce of an empty stream requires an initial value";
            }
          }
          function P2(e3) {
            if (e3 = v(e3), A(e3)) return 0;
            if (e3 < 0) throw new a("number", ">= 0", e3);
            return e3;
          }
          e2.exports.streamReturningOperators = { asIndexedPairs: _((function(e3 = void 0) {
            return null != e3 && f(e3, "options"), null != (null == e3 ? void 0 : e3.signal) && u(e3.signal, "options.signal"), async function* () {
              let t3 = 0;
              for await (const n3 of this) {
                var r3;
                if (null != e3 && null !== (r3 = e3.signal) && void 0 !== r3 && r3.aborted) throw new l({ cause: e3.signal.reason });
                yield [t3++, n3];
              }
            }.call(this);
          }), "readable.asIndexedPairs will be removed in a future version."), drop: function(e3, t3 = void 0) {
            return null != t3 && f(t3, "options"), null != (null == t3 ? void 0 : t3.signal) && u(t3.signal, "options.signal"), e3 = P2(e3), async function* () {
              var r3;
              if (null != t3 && null !== (r3 = t3.signal) && void 0 !== r3 && r3.aborted) throw new l();
              for await (const r4 of this) {
                var n3;
                if (null != t3 && null !== (n3 = t3.signal) && void 0 !== n3 && n3.aborted) throw new l();
                e3-- <= 0 && (yield r4);
              }
            }.call(this);
          }, filter: x, flatMap: function(e3, t3) {
            const r3 = M.call(this, e3, t3);
            return async function* () {
              for await (const e4 of r3) yield* e4;
            }.call(this);
          }, map: M, take: function(e3, t3 = void 0) {
            return null != t3 && f(t3, "options"), null != (null == t3 ? void 0 : t3.signal) && u(t3.signal, "options.signal"), e3 = P2(e3), async function* () {
              var r3;
              if (null != t3 && null !== (r3 = t3.signal) && void 0 !== r3 && r3.aborted) throw new l();
              for await (const r4 of this) {
                var n3;
                if (null != t3 && null !== (n3 = t3.signal) && void 0 !== n3 && n3.aborted) throw new l();
                if (e3-- > 0 && (yield r4), e3 <= 0) return;
              }
            }.call(this);
          }, compose: function(e3, t3) {
            if (null != t3 && f(t3, "options"), null != (null == t3 ? void 0 : t3.signal) && u(t3.signal, "options.signal"), w(e3) && !g(e3)) throw new i("stream", e3, "must be writable");
            const r3 = b(this, e3);
            return null != t3 && t3.signal && y(t3.signal, r3), r3;
          } }, e2.exports.promiseReturningOperators = { every: async function(e3, t3 = void 0) {
            if ("function" != typeof e3) throw new o("fn", ["Function", "AsyncFunction"], e3);
            return !await O.call(this, (async (...t4) => !await e3(...t4)), t3);
          }, forEach: async function(e3, t3) {
            if ("function" != typeof e3) throw new o("fn", ["Function", "AsyncFunction"], e3);
            for await (const r3 of M.call(this, (async function(t4, r4) {
              return await e3(t4, r4), L;
            }), t3)) ;
          }, reduce: async function(e3, t3, r3) {
            var i2;
            if ("function" != typeof e3) throw new o("reducer", ["Function", "AsyncFunction"], e3);
            null != r3 && f(r3, "options"), null != (null == r3 ? void 0 : r3.signal) && u(r3.signal, "options.signal");
            let s2 = arguments.length > 1;
            if (null != r3 && null !== (i2 = r3.signal) && void 0 !== i2 && i2.aborted) {
              const e4 = new l(void 0, { cause: r3.signal.reason });
              throw this.once("error", (() => {
              })), await p(this.destroy(e4)), e4;
            }
            const a2 = new n2(), c2 = a2.signal;
            if (null != r3 && r3.signal) {
              const e4 = { once: true, [h]: this, [d]: true };
              r3.signal.addEventListener("abort", (() => a2.abort()), e4);
            }
            let b2 = false;
            try {
              for await (const n3 of this) {
                var y2;
                if (b2 = true, null != r3 && null !== (y2 = r3.signal) && void 0 !== y2 && y2.aborted) throw new l();
                s2 ? t3 = await e3(t3, n3, { signal: c2 }) : (t3 = n3, s2 = true);
              }
              if (!b2 && !s2) throw new k();
            } finally {
              a2.abort();
            }
            return t3;
          }, toArray: async function(e3) {
            null != e3 && f(e3, "options"), null != (null == e3 ? void 0 : e3.signal) && u(e3.signal, "options.signal");
            const t3 = [];
            for await (const n3 of this) {
              var r3;
              if (null != e3 && null !== (r3 = e3.signal) && void 0 !== r3 && r3.aborted) throw new l(void 0, { cause: e3.signal.reason });
              m(t3, n3);
            }
            return t3;
          }, some: O, find: async function(e3, t3) {
            for await (const r3 of x.call(this, e3, t3)) return r3;
          } };
        }, 917: (e2, t2, r2) => {
          "use strict";
          const { ObjectSetPrototypeOf: n2 } = r2(9061);
          e2.exports = o;
          const i = r2(1161);
          function o(e3) {
            if (!(this instanceof o)) return new o(e3);
            i.call(this, e3);
          }
          n2(o.prototype, i.prototype), n2(o, i), o.prototype._transform = function(e3, t3, r3) {
            r3(null, e3);
          };
        }, 9946: (e2, t2, r2) => {
          const n2 = r2(4155), { ArrayIsArray: i, Promise: o, SymbolAsyncIterator: s, SymbolDispose: a } = r2(9061), l = r2(8610), { once: u } = r2(6087), c = r2(1195), f = r2(8672), { aggregateTwoErrors: h, codes: { ERR_INVALID_ARG_TYPE: d, ERR_INVALID_RETURN_VALUE: p, ERR_MISSING_ARGS: b, ERR_STREAM_DESTROYED: y, ERR_STREAM_PREMATURE_CLOSE: g }, AbortError: w } = r2(4381), { validateFunction: _, validateAbortSignal: m } = r2(6547), { isIterable: E, isReadable: S, isReadableNodeStream: v, isNodeStream: A, isTransformStream: I, isWebStream: T, isReadableStream: R, isReadableFinished: B } = r2(5874), N = globalThis.AbortController || r2(8599).AbortController;
          let L, U, M;
          function O(e3, t3, r3) {
            let n3 = false;
            return e3.on("close", (() => {
              n3 = true;
            })), { destroy: (t4) => {
              n3 || (n3 = true, c.destroyer(e3, t4 || new y("pipe")));
            }, cleanup: l(e3, { readable: t3, writable: r3 }, ((e4) => {
              n3 = !e4;
            })) };
          }
          function x(e3) {
            if (E(e3)) return e3;
            if (v(e3)) return (async function* (e4) {
              U || (U = r2(911)), yield* U.prototype[s].call(e4);
            })(e3);
            throw new d("val", ["Readable", "Iterable", "AsyncIterable"], e3);
          }
          async function k(e3, t3, r3, { end: n3 }) {
            let i2, s2 = null;
            const a2 = (e4) => {
              if (e4 && (i2 = e4), s2) {
                const e5 = s2;
                s2 = null, e5();
              }
            }, u2 = () => new o(((e4, t4) => {
              i2 ? t4(i2) : s2 = () => {
                i2 ? t4(i2) : e4();
              };
            }));
            t3.on("drain", a2);
            const c2 = l(t3, { readable: false }, a2);
            try {
              t3.writableNeedDrain && await u2();
              for await (const r4 of e3) t3.write(r4) || await u2();
              n3 && (t3.end(), await u2()), r3();
            } catch (e4) {
              r3(i2 !== e4 ? h(i2, e4) : e4);
            } finally {
              c2(), t3.off("drain", a2);
            }
          }
          async function P2(e3, t3, r3, { end: n3 }) {
            I(t3) && (t3 = t3.writable);
            const i2 = t3.getWriter();
            try {
              for await (const t4 of e3) await i2.ready, i2.write(t4).catch((() => {
              }));
              await i2.ready, n3 && await i2.close(), r3();
            } catch (e4) {
              try {
                await i2.abort(e4), r3(e4);
              } catch (e5) {
                r3(e5);
              }
            }
          }
          function j(e3, t3, o2) {
            if (1 === e3.length && i(e3[0]) && (e3 = e3[0]), e3.length < 2) throw new b("streams");
            const s2 = new N(), l2 = s2.signal, u2 = null == o2 ? void 0 : o2.signal, c2 = [];
            function h2() {
              C(new w());
            }
            let y2, g2, _2;
            m(u2, "options.signal"), M = M || r2(6087).addAbortListener, u2 && (y2 = M(u2, h2));
            const B2 = [];
            let U2, j2 = 0;
            function F(e4) {
              C(e4, 0 == --j2);
            }
            function C(e4, r3) {
              var i2;
              if (!e4 || g2 && "ERR_STREAM_PREMATURE_CLOSE" !== g2.code || (g2 = e4), g2 || r3) {
                for (; B2.length; ) B2.shift()(g2);
                null === (i2 = y2) || void 0 === i2 || i2[a](), s2.abort(), r3 && (g2 || c2.forEach(((e5) => e5())), n2.nextTick(t3, g2, _2));
              }
            }
            for (let Y = 0; Y < e3.length; Y++) {
              const H = e3[Y], V = Y < e3.length - 1, K = Y > 0, q = V || false !== (null == o2 ? void 0 : o2.end), z = Y === e3.length - 1;
              if (A(H)) {
                let $2 = function(e4) {
                  e4 && "AbortError" !== e4.name && "ERR_STREAM_PREMATURE_CLOSE" !== e4.code && F(e4);
                };
                var $ = $2;
                if (q) {
                  const { destroy: X, cleanup: J } = O(H, V, K);
                  B2.push(X), S(H) && z && c2.push(J);
                }
                H.on("error", $2), S(H) && z && c2.push((() => {
                  H.removeListener("error", $2);
                }));
              }
              if (0 === Y) if ("function" == typeof H) {
                if (U2 = H({ signal: l2 }), !E(U2)) throw new p("Iterable, AsyncIterable or Stream", "source", U2);
              } else U2 = E(H) || v(H) || I(H) ? H : f.from(H);
              else if ("function" == typeof H) {
                var W;
                if (U2 = I(U2) ? x(null === (W = U2) || void 0 === W ? void 0 : W.readable) : x(U2), U2 = H(U2, { signal: l2 }), V) {
                  if (!E(U2, true)) throw new p("AsyncIterable", `transform[${Y - 1}]`, U2);
                } else {
                  var G;
                  L || (L = r2(917));
                  const Z = new L({ objectMode: true }), Q = null === (G = U2) || void 0 === G ? void 0 : G.then;
                  if ("function" == typeof Q) j2++, Q.call(U2, ((e4) => {
                    _2 = e4, null != e4 && Z.write(e4), q && Z.end(), n2.nextTick(F);
                  }), ((e4) => {
                    Z.destroy(e4), n2.nextTick(F, e4);
                  }));
                  else if (E(U2, true)) j2++, k(U2, Z, F, { end: q });
                  else {
                    if (!R(U2) && !I(U2)) throw new p("AsyncIterable or Promise", "destination", U2);
                    {
                      const re = U2.readable || U2;
                      j2++, k(re, Z, F, { end: q });
                    }
                  }
                  U2 = Z;
                  const { destroy: ee, cleanup: te } = O(U2, false, true);
                  B2.push(ee), z && c2.push(te);
                }
              } else if (A(H)) {
                if (v(U2)) {
                  j2 += 2;
                  const ne = D(U2, H, F, { end: q });
                  S(H) && z && c2.push(ne);
                } else if (I(U2) || R(U2)) {
                  const ie = U2.readable || U2;
                  j2++, k(ie, H, F, { end: q });
                } else {
                  if (!E(U2)) throw new d("val", ["Readable", "Iterable", "AsyncIterable", "ReadableStream", "TransformStream"], U2);
                  j2++, k(U2, H, F, { end: q });
                }
                U2 = H;
              } else if (T(H)) {
                if (v(U2)) j2++, P2(x(U2), H, F, { end: q });
                else if (R(U2) || E(U2)) j2++, P2(U2, H, F, { end: q });
                else {
                  if (!I(U2)) throw new d("val", ["Readable", "Iterable", "AsyncIterable", "ReadableStream", "TransformStream"], U2);
                  j2++, P2(U2.readable, H, F, { end: q });
                }
                U2 = H;
              } else U2 = f.from(H);
            }
            return (null != l2 && l2.aborted || null != u2 && u2.aborted) && n2.nextTick(h2), U2;
          }
          function D(e3, t3, r3, { end: i2 }) {
            let o2 = false;
            if (t3.on("close", (() => {
              o2 || r3(new g());
            })), e3.pipe(t3, { end: false }), i2) {
              let s3 = function() {
                o2 = true, t3.end();
              };
              var s2 = s3;
              B(e3) ? n2.nextTick(s3) : e3.once("end", s3);
            } else r3();
            return l(e3, { readable: true, writable: false }, ((t4) => {
              const n3 = e3._readableState;
              t4 && "ERR_STREAM_PREMATURE_CLOSE" === t4.code && n3 && n3.ended && !n3.errored && !n3.errorEmitted ? e3.once("end", r3).once("error", r3) : r3(t4);
            })), l(t3, { readable: false, writable: true }, r3);
          }
          e2.exports = { pipelineImpl: j, pipeline: function(...e3) {
            return j(e3, u((function(e4) {
              return _(e4[e4.length - 1], "streams[stream.length - 1]"), e4.pop();
            })(e3)));
          } };
        }, 911: (e2, t2, r2) => {
          const n2 = r2(4155), { ArrayPrototypeIndexOf: i, NumberIsInteger: o, NumberIsNaN: s, NumberParseInt: a, ObjectDefineProperties: l, ObjectKeys: u, ObjectSetPrototypeOf: c, Promise: f, SafeSet: h, SymbolAsyncDispose: d, SymbolAsyncIterator: p, Symbol: b } = r2(9061);
          e2.exports = z, z.ReadableState = q;
          const { EventEmitter: y } = r2(7187), { Stream: g, prependListener: w } = r2(4870), { Buffer: _ } = r2(8764), { addAbortSignal: m } = r2(196), E = r2(8610);
          let S = r2(6087).debuglog("stream", ((e3) => {
            S = e3;
          }));
          const v = r2(7327), A = r2(1195), { getHighWaterMark: I, getDefaultHighWaterMark: T } = r2(2457), { aggregateTwoErrors: R, codes: { ERR_INVALID_ARG_TYPE: B, ERR_METHOD_NOT_IMPLEMENTED: N, ERR_OUT_OF_RANGE: L, ERR_STREAM_PUSH_AFTER_EOF: U, ERR_STREAM_UNSHIFT_AFTER_END_EVENT: M }, AbortError: O } = r2(4381), { validateObject: x } = r2(6547), k = b("kPaused"), { StringDecoder: P2 } = r2(2553), j = r2(6307);
          c(z.prototype, g.prototype), c(z, g);
          const D = () => {
          }, { errorOrDestroy: F } = A, C = 1, $ = 16, W = 32, G = 64, Y = 2048, H = 4096, V = 65536;
          function K(e3) {
            return { enumerable: false, get() {
              return 0 != (this.state & e3);
            }, set(t3) {
              t3 ? this.state |= e3 : this.state &= ~e3;
            } };
          }
          function q(e3, t3, n3) {
            "boolean" != typeof n3 && (n3 = t3 instanceof r2(8672)), this.state = Y | H | $ | W, e3 && e3.objectMode && (this.state |= C), n3 && e3 && e3.readableObjectMode && (this.state |= C), this.highWaterMark = e3 ? I(this, e3, "readableHighWaterMark", n3) : T(false), this.buffer = new v(), this.length = 0, this.pipes = [], this.flowing = null, this[k] = null, e3 && false === e3.emitClose && (this.state &= ~Y), e3 && false === e3.autoDestroy && (this.state &= ~H), this.errored = null, this.defaultEncoding = e3 && e3.defaultEncoding || "utf8", this.awaitDrainWriters = null, this.decoder = null, this.encoding = null, e3 && e3.encoding && (this.decoder = new P2(e3.encoding), this.encoding = e3.encoding);
          }
          function z(e3) {
            if (!(this instanceof z)) return new z(e3);
            const t3 = this instanceof r2(8672);
            this._readableState = new q(e3, this, t3), e3 && ("function" == typeof e3.read && (this._read = e3.read), "function" == typeof e3.destroy && (this._destroy = e3.destroy), "function" == typeof e3.construct && (this._construct = e3.construct), e3.signal && !t3 && m(e3.signal, this)), g.call(this, e3), A.construct(this, (() => {
              this._readableState.needReadable && te(this, this._readableState);
            }));
          }
          function X(e3, t3, r3, n3) {
            S("readableAddChunk", t3);
            const i2 = e3._readableState;
            let o2;
            if (0 == (i2.state & C) && ("string" == typeof t3 ? (r3 = r3 || i2.defaultEncoding, i2.encoding !== r3 && (n3 && i2.encoding ? t3 = _.from(t3, r3).toString(i2.encoding) : (t3 = _.from(t3, r3), r3 = ""))) : t3 instanceof _ ? r3 = "" : g._isUint8Array(t3) ? (t3 = g._uint8ArrayToBuffer(t3), r3 = "") : null != t3 && (o2 = new B("chunk", ["string", "Buffer", "Uint8Array"], t3))), o2) F(e3, o2);
            else if (null === t3) i2.state &= -9, (function(e4, t4) {
              if (S("onEofChunk"), !t4.ended) {
                if (t4.decoder) {
                  const e5 = t4.decoder.end();
                  e5 && e5.length && (t4.buffer.push(e5), t4.length += t4.objectMode ? 1 : e5.length);
                }
                t4.ended = true, t4.sync ? Q(e4) : (t4.needReadable = false, t4.emittedReadable = true, ee(e4));
              }
            })(e3, i2);
            else if (0 != (i2.state & C) || t3 && t3.length > 0) if (n3) if (0 != (4 & i2.state)) F(e3, new M());
            else {
              if (i2.destroyed || i2.errored) return false;
              J(e3, i2, t3, true);
            }
            else if (i2.ended) F(e3, new U());
            else {
              if (i2.destroyed || i2.errored) return false;
              i2.state &= -9, i2.decoder && !r3 ? (t3 = i2.decoder.write(t3), i2.objectMode || 0 !== t3.length ? J(e3, i2, t3, false) : te(e3, i2)) : J(e3, i2, t3, false);
            }
            else n3 || (i2.state &= -9, te(e3, i2));
            return !i2.ended && (i2.length < i2.highWaterMark || 0 === i2.length);
          }
          function J(e3, t3, r3, n3) {
            t3.flowing && 0 === t3.length && !t3.sync && e3.listenerCount("data") > 0 ? (0 != (t3.state & V) ? t3.awaitDrainWriters.clear() : t3.awaitDrainWriters = null, t3.dataEmitted = true, e3.emit("data", r3)) : (t3.length += t3.objectMode ? 1 : r3.length, n3 ? t3.buffer.unshift(r3) : t3.buffer.push(r3), 0 != (t3.state & G) && Q(e3)), te(e3, t3);
          }
          function Z(e3, t3) {
            return e3 <= 0 || 0 === t3.length && t3.ended ? 0 : 0 != (t3.state & C) ? 1 : s(e3) ? t3.flowing && t3.length ? t3.buffer.first().length : t3.length : e3 <= t3.length ? e3 : t3.ended ? t3.length : 0;
          }
          function Q(e3) {
            const t3 = e3._readableState;
            S("emitReadable", t3.needReadable, t3.emittedReadable), t3.needReadable = false, t3.emittedReadable || (S("emitReadable", t3.flowing), t3.emittedReadable = true, n2.nextTick(ee, e3));
          }
          function ee(e3) {
            const t3 = e3._readableState;
            S("emitReadable_", t3.destroyed, t3.length, t3.ended), t3.destroyed || t3.errored || !t3.length && !t3.ended || (e3.emit("readable"), t3.emittedReadable = false), t3.needReadable = !t3.flowing && !t3.ended && t3.length <= t3.highWaterMark, se(e3);
          }
          function te(e3, t3) {
            !t3.readingMore && t3.constructed && (t3.readingMore = true, n2.nextTick(re, e3, t3));
          }
          function re(e3, t3) {
            for (; !t3.reading && !t3.ended && (t3.length < t3.highWaterMark || t3.flowing && 0 === t3.length); ) {
              const r3 = t3.length;
              if (S("maybeReadMore read 0"), e3.read(0), r3 === t3.length) break;
            }
            t3.readingMore = false;
          }
          function ne(e3) {
            const t3 = e3._readableState;
            t3.readableListening = e3.listenerCount("readable") > 0, t3.resumeScheduled && false === t3[k] ? t3.flowing = true : e3.listenerCount("data") > 0 ? e3.resume() : t3.readableListening || (t3.flowing = null);
          }
          function ie(e3) {
            S("readable nexttick read 0"), e3.read(0);
          }
          function oe(e3, t3) {
            S("resume", t3.reading), t3.reading || e3.read(0), t3.resumeScheduled = false, e3.emit("resume"), se(e3), t3.flowing && !t3.reading && e3.read(0);
          }
          function se(e3) {
            const t3 = e3._readableState;
            for (S("flow", t3.flowing); t3.flowing && null !== e3.read(); ) ;
          }
          function ae(e3, t3) {
            "function" != typeof e3.read && (e3 = z.wrap(e3, { objectMode: true }));
            const r3 = (async function* (e4, t4) {
              let r4, n3 = D;
              function i2(t5) {
                this === e4 ? (n3(), n3 = D) : n3 = t5;
              }
              e4.on("readable", i2);
              const o2 = E(e4, { writable: false }, ((e5) => {
                r4 = e5 ? R(r4, e5) : null, n3(), n3 = D;
              }));
              try {
                for (; ; ) {
                  const t5 = e4.destroyed ? null : e4.read();
                  if (null !== t5) yield t5;
                  else {
                    if (r4) throw r4;
                    if (null === r4) return;
                    await new f(i2);
                  }
                }
              } catch (e5) {
                throw r4 = R(r4, e5), r4;
              } finally {
                !r4 && false === (null == t4 ? void 0 : t4.destroyOnReturn) || void 0 !== r4 && !e4._readableState.autoDestroy ? (e4.off("readable", i2), o2()) : A.destroyer(e4, null);
              }
            })(e3, t3);
            return r3.stream = e3, r3;
          }
          function le(e3, t3) {
            if (0 === t3.length) return null;
            let r3;
            return t3.objectMode ? r3 = t3.buffer.shift() : !e3 || e3 >= t3.length ? (r3 = t3.decoder ? t3.buffer.join("") : 1 === t3.buffer.length ? t3.buffer.first() : t3.buffer.concat(t3.length), t3.buffer.clear()) : r3 = t3.buffer.consume(e3, t3.decoder), r3;
          }
          function ue(e3) {
            const t3 = e3._readableState;
            S("endReadable", t3.endEmitted), t3.endEmitted || (t3.ended = true, n2.nextTick(ce, t3, e3));
          }
          function ce(e3, t3) {
            if (S("endReadableNT", e3.endEmitted, e3.length), !e3.errored && !e3.closeEmitted && !e3.endEmitted && 0 === e3.length) {
              if (e3.endEmitted = true, t3.emit("end"), t3.writable && false === t3.allowHalfOpen) n2.nextTick(fe, t3);
              else if (e3.autoDestroy) {
                const e4 = t3._writableState;
                (!e4 || e4.autoDestroy && (e4.finished || false === e4.writable)) && t3.destroy();
              }
            }
          }
          function fe(e3) {
            e3.writable && !e3.writableEnded && !e3.destroyed && e3.end();
          }
          let he;
          function de() {
            return void 0 === he && (he = {}), he;
          }
          l(q.prototype, { objectMode: K(C), ended: K(2), endEmitted: K(4), reading: K(8), constructed: K($), sync: K(W), needReadable: K(G), emittedReadable: K(128), readableListening: K(256), resumeScheduled: K(512), errorEmitted: K(1024), emitClose: K(Y), autoDestroy: K(H), destroyed: K(8192), closed: K(16384), closeEmitted: K(32768), multiAwaitDrain: K(V), readingMore: K(1 << 17), dataEmitted: K(1 << 18) }), z.prototype.destroy = A.destroy, z.prototype._undestroy = A.undestroy, z.prototype._destroy = function(e3, t3) {
            t3(e3);
          }, z.prototype[y.captureRejectionSymbol] = function(e3) {
            this.destroy(e3);
          }, z.prototype[d] = function() {
            let e3;
            return this.destroyed || (e3 = this.readableEnded ? null : new O(), this.destroy(e3)), new f(((t3, r3) => E(this, ((n3) => n3 && n3 !== e3 ? r3(n3) : t3(null)))));
          }, z.prototype.push = function(e3, t3) {
            return X(this, e3, t3, false);
          }, z.prototype.unshift = function(e3, t3) {
            return X(this, e3, t3, true);
          }, z.prototype.isPaused = function() {
            const e3 = this._readableState;
            return true === e3[k] || false === e3.flowing;
          }, z.prototype.setEncoding = function(e3) {
            const t3 = new P2(e3);
            this._readableState.decoder = t3, this._readableState.encoding = this._readableState.decoder.encoding;
            const r3 = this._readableState.buffer;
            let n3 = "";
            for (const e4 of r3) n3 += t3.write(e4);
            return r3.clear(), "" !== n3 && r3.push(n3), this._readableState.length = n3.length, this;
          }, z.prototype.read = function(e3) {
            S("read", e3), void 0 === e3 ? e3 = NaN : o(e3) || (e3 = a(e3, 10));
            const t3 = this._readableState, r3 = e3;
            if (e3 > t3.highWaterMark && (t3.highWaterMark = (function(e4) {
              if (e4 > 1073741824) throw new L("size", "<= 1GiB", e4);
              return e4--, e4 |= e4 >>> 1, e4 |= e4 >>> 2, e4 |= e4 >>> 4, e4 |= e4 >>> 8, e4 |= e4 >>> 16, ++e4;
            })(e3)), 0 !== e3 && (t3.state &= -129), 0 === e3 && t3.needReadable && ((0 !== t3.highWaterMark ? t3.length >= t3.highWaterMark : t3.length > 0) || t3.ended)) return S("read: emitReadable", t3.length, t3.ended), 0 === t3.length && t3.ended ? ue(this) : Q(this), null;
            if (0 === (e3 = Z(e3, t3)) && t3.ended) return 0 === t3.length && ue(this), null;
            let n3, i2 = 0 != (t3.state & G);
            if (S("need readable", i2), (0 === t3.length || t3.length - e3 < t3.highWaterMark) && (i2 = true, S("length less than watermark", i2)), t3.ended || t3.reading || t3.destroyed || t3.errored || !t3.constructed) i2 = false, S("reading, ended or constructing", i2);
            else if (i2) {
              S("do read"), t3.state |= 8 | W, 0 === t3.length && (t3.state |= G);
              try {
                this._read(t3.highWaterMark);
              } catch (e4) {
                F(this, e4);
              }
              t3.state &= ~W, t3.reading || (e3 = Z(r3, t3));
            }
            return n3 = e3 > 0 ? le(e3, t3) : null, null === n3 ? (t3.needReadable = t3.length <= t3.highWaterMark, e3 = 0) : (t3.length -= e3, t3.multiAwaitDrain ? t3.awaitDrainWriters.clear() : t3.awaitDrainWriters = null), 0 === t3.length && (t3.ended || (t3.needReadable = true), r3 !== e3 && t3.ended && ue(this)), null === n3 || t3.errorEmitted || t3.closeEmitted || (t3.dataEmitted = true, this.emit("data", n3)), n3;
          }, z.prototype._read = function(e3) {
            throw new N("_read()");
          }, z.prototype.pipe = function(e3, t3) {
            const r3 = this, i2 = this._readableState;
            1 === i2.pipes.length && (i2.multiAwaitDrain || (i2.multiAwaitDrain = true, i2.awaitDrainWriters = new h(i2.awaitDrainWriters ? [i2.awaitDrainWriters] : []))), i2.pipes.push(e3), S("pipe count=%d opts=%j", i2.pipes.length, t3);
            const o2 = t3 && false === t3.end || e3 === n2.stdout || e3 === n2.stderr ? b2 : s2;
            function s2() {
              S("onend"), e3.end();
            }
            let a2;
            i2.endEmitted ? n2.nextTick(o2) : r3.once("end", o2), e3.on("unpipe", (function t4(n3, o3) {
              S("onunpipe"), n3 === r3 && o3 && false === o3.hasUnpiped && (o3.hasUnpiped = true, S("cleanup"), e3.removeListener("close", d2), e3.removeListener("finish", p2), a2 && e3.removeListener("drain", a2), e3.removeListener("error", f2), e3.removeListener("unpipe", t4), r3.removeListener("end", s2), r3.removeListener("end", b2), r3.removeListener("data", c2), l2 = true, a2 && i2.awaitDrainWriters && (!e3._writableState || e3._writableState.needDrain) && a2());
            }));
            let l2 = false;
            function u2() {
              l2 || (1 === i2.pipes.length && i2.pipes[0] === e3 ? (S("false write response, pause", 0), i2.awaitDrainWriters = e3, i2.multiAwaitDrain = false) : i2.pipes.length > 1 && i2.pipes.includes(e3) && (S("false write response, pause", i2.awaitDrainWriters.size), i2.awaitDrainWriters.add(e3)), r3.pause()), a2 || (a2 = /* @__PURE__ */ (function(e4, t4) {
                return function() {
                  const r4 = e4._readableState;
                  r4.awaitDrainWriters === t4 ? (S("pipeOnDrain", 1), r4.awaitDrainWriters = null) : r4.multiAwaitDrain && (S("pipeOnDrain", r4.awaitDrainWriters.size), r4.awaitDrainWriters.delete(t4)), r4.awaitDrainWriters && 0 !== r4.awaitDrainWriters.size || !e4.listenerCount("data") || e4.resume();
                };
              })(r3, e3), e3.on("drain", a2));
            }
            function c2(t4) {
              S("ondata");
              const r4 = e3.write(t4);
              S("dest.write", r4), false === r4 && u2();
            }
            function f2(t4) {
              if (S("onerror", t4), b2(), e3.removeListener("error", f2), 0 === e3.listenerCount("error")) {
                const r4 = e3._writableState || e3._readableState;
                r4 && !r4.errorEmitted ? F(e3, t4) : e3.emit("error", t4);
              }
            }
            function d2() {
              e3.removeListener("finish", p2), b2();
            }
            function p2() {
              S("onfinish"), e3.removeListener("close", d2), b2();
            }
            function b2() {
              S("unpipe"), r3.unpipe(e3);
            }
            return r3.on("data", c2), w(e3, "error", f2), e3.once("close", d2), e3.once("finish", p2), e3.emit("pipe", r3), true === e3.writableNeedDrain ? u2() : i2.flowing || (S("pipe resume"), r3.resume()), e3;
          }, z.prototype.unpipe = function(e3) {
            const t3 = this._readableState;
            if (0 === t3.pipes.length) return this;
            if (!e3) {
              const e4 = t3.pipes;
              t3.pipes = [], this.pause();
              for (let t4 = 0; t4 < e4.length; t4++) e4[t4].emit("unpipe", this, { hasUnpiped: false });
              return this;
            }
            const r3 = i(t3.pipes, e3);
            return -1 === r3 || (t3.pipes.splice(r3, 1), 0 === t3.pipes.length && this.pause(), e3.emit("unpipe", this, { hasUnpiped: false })), this;
          }, z.prototype.on = function(e3, t3) {
            const r3 = g.prototype.on.call(this, e3, t3), i2 = this._readableState;
            return "data" === e3 ? (i2.readableListening = this.listenerCount("readable") > 0, false !== i2.flowing && this.resume()) : "readable" === e3 && (i2.endEmitted || i2.readableListening || (i2.readableListening = i2.needReadable = true, i2.flowing = false, i2.emittedReadable = false, S("on readable", i2.length, i2.reading), i2.length ? Q(this) : i2.reading || n2.nextTick(ie, this))), r3;
          }, z.prototype.addListener = z.prototype.on, z.prototype.removeListener = function(e3, t3) {
            const r3 = g.prototype.removeListener.call(this, e3, t3);
            return "readable" === e3 && n2.nextTick(ne, this), r3;
          }, z.prototype.off = z.prototype.removeListener, z.prototype.removeAllListeners = function(e3) {
            const t3 = g.prototype.removeAllListeners.apply(this, arguments);
            return "readable" !== e3 && void 0 !== e3 || n2.nextTick(ne, this), t3;
          }, z.prototype.resume = function() {
            const e3 = this._readableState;
            return e3.flowing || (S("resume"), e3.flowing = !e3.readableListening, (function(e4, t3) {
              t3.resumeScheduled || (t3.resumeScheduled = true, n2.nextTick(oe, e4, t3));
            })(this, e3)), e3[k] = false, this;
          }, z.prototype.pause = function() {
            return S("call pause flowing=%j", this._readableState.flowing), false !== this._readableState.flowing && (S("pause"), this._readableState.flowing = false, this.emit("pause")), this._readableState[k] = true, this;
          }, z.prototype.wrap = function(e3) {
            let t3 = false;
            e3.on("data", ((r4) => {
              !this.push(r4) && e3.pause && (t3 = true, e3.pause());
            })), e3.on("end", (() => {
              this.push(null);
            })), e3.on("error", ((e4) => {
              F(this, e4);
            })), e3.on("close", (() => {
              this.destroy();
            })), e3.on("destroy", (() => {
              this.destroy();
            })), this._read = () => {
              t3 && e3.resume && (t3 = false, e3.resume());
            };
            const r3 = u(e3);
            for (let t4 = 1; t4 < r3.length; t4++) {
              const n3 = r3[t4];
              void 0 === this[n3] && "function" == typeof e3[n3] && (this[n3] = e3[n3].bind(e3));
            }
            return this;
          }, z.prototype[p] = function() {
            return ae(this);
          }, z.prototype.iterator = function(e3) {
            return void 0 !== e3 && x(e3, "options"), ae(this, e3);
          }, l(z.prototype, { readable: { __proto__: null, get() {
            const e3 = this._readableState;
            return !(!e3 || false === e3.readable || e3.destroyed || e3.errorEmitted || e3.endEmitted);
          }, set(e3) {
            this._readableState && (this._readableState.readable = !!e3);
          } }, readableDidRead: { __proto__: null, enumerable: false, get: function() {
            return this._readableState.dataEmitted;
          } }, readableAborted: { __proto__: null, enumerable: false, get: function() {
            return !(false === this._readableState.readable || !this._readableState.destroyed && !this._readableState.errored || this._readableState.endEmitted);
          } }, readableHighWaterMark: { __proto__: null, enumerable: false, get: function() {
            return this._readableState.highWaterMark;
          } }, readableBuffer: { __proto__: null, enumerable: false, get: function() {
            return this._readableState && this._readableState.buffer;
          } }, readableFlowing: { __proto__: null, enumerable: false, get: function() {
            return this._readableState.flowing;
          }, set: function(e3) {
            this._readableState && (this._readableState.flowing = e3);
          } }, readableLength: { __proto__: null, enumerable: false, get() {
            return this._readableState.length;
          } }, readableObjectMode: { __proto__: null, enumerable: false, get() {
            return !!this._readableState && this._readableState.objectMode;
          } }, readableEncoding: { __proto__: null, enumerable: false, get() {
            return this._readableState ? this._readableState.encoding : null;
          } }, errored: { __proto__: null, enumerable: false, get() {
            return this._readableState ? this._readableState.errored : null;
          } }, closed: { __proto__: null, get() {
            return !!this._readableState && this._readableState.closed;
          } }, destroyed: { __proto__: null, enumerable: false, get() {
            return !!this._readableState && this._readableState.destroyed;
          }, set(e3) {
            this._readableState && (this._readableState.destroyed = e3);
          } }, readableEnded: { __proto__: null, enumerable: false, get() {
            return !!this._readableState && this._readableState.endEmitted;
          } } }), l(q.prototype, { pipesCount: { __proto__: null, get() {
            return this.pipes.length;
          } }, paused: { __proto__: null, get() {
            return false !== this[k];
          }, set(e3) {
            this[k] = !!e3;
          } } }), z._fromList = le, z.from = function(e3, t3) {
            return j(z, e3, t3);
          }, z.fromWeb = function(e3, t3) {
            return de().newStreamReadableFromReadableStream(e3, t3);
          }, z.toWeb = function(e3, t3) {
            return de().newReadableStreamFromStreamReadable(e3, t3);
          }, z.wrap = function(e3, t3) {
            var r3, n3;
            return new z({ objectMode: null === (r3 = null !== (n3 = e3.readableObjectMode) && void 0 !== n3 ? n3 : e3.objectMode) || void 0 === r3 || r3, ...t3, destroy(t4, r4) {
              A.destroyer(e3, t4), r4(t4);
            } }).wrap(e3);
          };
        }, 2457: (e2, t2, r2) => {
          "use strict";
          const { MathFloor: n2, NumberIsInteger: i } = r2(9061), { validateInteger: o } = r2(6547), { ERR_INVALID_ARG_VALUE: s } = r2(4381).codes;
          let a = 16384, l = 16;
          function u(e3) {
            return e3 ? l : a;
          }
          e2.exports = { getHighWaterMark: function(e3, t3, r3, o2) {
            const a2 = (function(e4, t4, r4) {
              return null != e4.highWaterMark ? e4.highWaterMark : t4 ? e4[r4] : null;
            })(t3, o2, r3);
            if (null != a2) {
              if (!i(a2) || a2 < 0) throw new s(o2 ? `options.${r3}` : "options.highWaterMark", a2);
              return n2(a2);
            }
            return u(e3.objectMode);
          }, getDefaultHighWaterMark: u, setDefaultHighWaterMark: function(e3, t3) {
            o(t3, "value", 0), e3 ? l = t3 : a = t3;
          } };
        }, 1161: (e2, t2, r2) => {
          "use strict";
          const { ObjectSetPrototypeOf: n2, Symbol: i } = r2(9061);
          e2.exports = u;
          const { ERR_METHOD_NOT_IMPLEMENTED: o } = r2(4381).codes, s = r2(8672), { getHighWaterMark: a } = r2(2457);
          n2(u.prototype, s.prototype), n2(u, s);
          const l = i("kCallback");
          function u(e3) {
            if (!(this instanceof u)) return new u(e3);
            const t3 = e3 ? a(this, e3, "readableHighWaterMark", true) : null;
            0 === t3 && (e3 = { ...e3, highWaterMark: null, readableHighWaterMark: t3, writableHighWaterMark: e3.writableHighWaterMark || 0 }), s.call(this, e3), this._readableState.sync = false, this[l] = null, e3 && ("function" == typeof e3.transform && (this._transform = e3.transform), "function" == typeof e3.flush && (this._flush = e3.flush)), this.on("prefinish", f);
          }
          function c(e3) {
            "function" != typeof this._flush || this.destroyed ? (this.push(null), e3 && e3()) : this._flush(((t3, r3) => {
              t3 ? e3 ? e3(t3) : this.destroy(t3) : (null != r3 && this.push(r3), this.push(null), e3 && e3());
            }));
          }
          function f() {
            this._final !== c && c.call(this);
          }
          u.prototype._final = c, u.prototype._transform = function(e3, t3, r3) {
            throw new o("_transform()");
          }, u.prototype._write = function(e3, t3, r3) {
            const n3 = this._readableState, i2 = this._writableState, o2 = n3.length;
            this._transform(e3, t3, ((e4, t4) => {
              e4 ? r3(e4) : (null != t4 && this.push(t4), i2.ended || o2 === n3.length || n3.length < n3.highWaterMark ? r3() : this[l] = r3);
            }));
          }, u.prototype._read = function() {
            if (this[l]) {
              const e3 = this[l];
              this[l] = null, e3();
            }
          };
        }, 5874: (e2, t2, r2) => {
          "use strict";
          const { SymbolAsyncIterator: n2, SymbolIterator: i, SymbolFor: o } = r2(9061), s = o("nodejs.stream.destroyed"), a = o("nodejs.stream.errored"), l = o("nodejs.stream.readable"), u = o("nodejs.stream.writable"), c = o("nodejs.stream.disturbed"), f = o("nodejs.webstream.isClosedPromise"), h = o("nodejs.webstream.controllerErrorFunction");
          function d(e3, t3 = false) {
            var r3;
            return !(!e3 || "function" != typeof e3.pipe || "function" != typeof e3.on || t3 && ("function" != typeof e3.pause || "function" != typeof e3.resume) || e3._writableState && false === (null === (r3 = e3._readableState) || void 0 === r3 ? void 0 : r3.readable) || e3._writableState && !e3._readableState);
          }
          function p(e3) {
            var t3;
            return !(!e3 || "function" != typeof e3.write || "function" != typeof e3.on || e3._readableState && false === (null === (t3 = e3._writableState) || void 0 === t3 ? void 0 : t3.writable));
          }
          function b(e3) {
            return e3 && (e3._readableState || e3._writableState || "function" == typeof e3.write && "function" == typeof e3.on || "function" == typeof e3.pipe && "function" == typeof e3.on);
          }
          function y(e3) {
            return !(!e3 || b(e3) || "function" != typeof e3.pipeThrough || "function" != typeof e3.getReader || "function" != typeof e3.cancel);
          }
          function g(e3) {
            return !(!e3 || b(e3) || "function" != typeof e3.getWriter || "function" != typeof e3.abort);
          }
          function w(e3) {
            return !(!e3 || b(e3) || "object" != typeof e3.readable || "object" != typeof e3.writable);
          }
          function _(e3) {
            if (!b(e3)) return null;
            const t3 = e3._writableState, r3 = e3._readableState, n3 = t3 || r3;
            return !!(e3.destroyed || e3[s] || null != n3 && n3.destroyed);
          }
          function m(e3) {
            if (!p(e3)) return null;
            if (true === e3.writableEnded) return true;
            const t3 = e3._writableState;
            return (null == t3 || !t3.errored) && ("boolean" != typeof (null == t3 ? void 0 : t3.ended) ? null : t3.ended);
          }
          function E(e3, t3) {
            if (!d(e3)) return null;
            const r3 = e3._readableState;
            return (null == r3 || !r3.errored) && ("boolean" != typeof (null == r3 ? void 0 : r3.endEmitted) ? null : !!(r3.endEmitted || false === t3 && true === r3.ended && 0 === r3.length));
          }
          function S(e3) {
            return e3 && null != e3[l] ? e3[l] : "boolean" != typeof (null == e3 ? void 0 : e3.readable) ? null : !_(e3) && d(e3) && e3.readable && !E(e3);
          }
          function v(e3) {
            return e3 && null != e3[u] ? e3[u] : "boolean" != typeof (null == e3 ? void 0 : e3.writable) ? null : !_(e3) && p(e3) && e3.writable && !m(e3);
          }
          function A(e3) {
            return "boolean" == typeof e3._closed && "boolean" == typeof e3._defaultKeepAlive && "boolean" == typeof e3._removedConnection && "boolean" == typeof e3._removedContLen;
          }
          function I(e3) {
            return "boolean" == typeof e3._sent100 && A(e3);
          }
          e2.exports = { isDestroyed: _, kIsDestroyed: s, isDisturbed: function(e3) {
            var t3;
            return !(!e3 || !(null !== (t3 = e3[c]) && void 0 !== t3 ? t3 : e3.readableDidRead || e3.readableAborted));
          }, kIsDisturbed: c, isErrored: function(e3) {
            var t3, r3, n3, i2, o2, s2, l2, u2, c2, f2;
            return !(!e3 || !(null !== (t3 = null !== (r3 = null !== (n3 = null !== (i2 = null !== (o2 = null !== (s2 = e3[a]) && void 0 !== s2 ? s2 : e3.readableErrored) && void 0 !== o2 ? o2 : e3.writableErrored) && void 0 !== i2 ? i2 : null === (l2 = e3._readableState) || void 0 === l2 ? void 0 : l2.errorEmitted) && void 0 !== n3 ? n3 : null === (u2 = e3._writableState) || void 0 === u2 ? void 0 : u2.errorEmitted) && void 0 !== r3 ? r3 : null === (c2 = e3._readableState) || void 0 === c2 ? void 0 : c2.errored) && void 0 !== t3 ? t3 : null === (f2 = e3._writableState) || void 0 === f2 ? void 0 : f2.errored));
          }, kIsErrored: a, isReadable: S, kIsReadable: l, kIsClosedPromise: f, kControllerErrorFunction: h, kIsWritable: u, isClosed: function(e3) {
            if (!b(e3)) return null;
            if ("boolean" == typeof e3.closed) return e3.closed;
            const t3 = e3._writableState, r3 = e3._readableState;
            return "boolean" == typeof (null == t3 ? void 0 : t3.closed) || "boolean" == typeof (null == r3 ? void 0 : r3.closed) ? (null == t3 ? void 0 : t3.closed) || (null == r3 ? void 0 : r3.closed) : "boolean" == typeof e3._closed && A(e3) ? e3._closed : null;
          }, isDuplexNodeStream: function(e3) {
            return !(!e3 || "function" != typeof e3.pipe || !e3._readableState || "function" != typeof e3.on || "function" != typeof e3.write);
          }, isFinished: function(e3, t3) {
            return b(e3) ? !(!_(e3) && (false !== (null == t3 ? void 0 : t3.readable) && S(e3) || false !== (null == t3 ? void 0 : t3.writable) && v(e3))) : null;
          }, isIterable: function(e3, t3) {
            return null != e3 && (true === t3 ? "function" == typeof e3[n2] : false === t3 ? "function" == typeof e3[i] : "function" == typeof e3[n2] || "function" == typeof e3[i]);
          }, isReadableNodeStream: d, isReadableStream: y, isReadableEnded: function(e3) {
            if (!d(e3)) return null;
            if (true === e3.readableEnded) return true;
            const t3 = e3._readableState;
            return !(!t3 || t3.errored) && ("boolean" != typeof (null == t3 ? void 0 : t3.ended) ? null : t3.ended);
          }, isReadableFinished: E, isReadableErrored: function(e3) {
            var t3, r3;
            return b(e3) ? e3.readableErrored ? e3.readableErrored : null !== (t3 = null === (r3 = e3._readableState) || void 0 === r3 ? void 0 : r3.errored) && void 0 !== t3 ? t3 : null : null;
          }, isNodeStream: b, isWebStream: function(e3) {
            return y(e3) || g(e3) || w(e3);
          }, isWritable: v, isWritableNodeStream: p, isWritableStream: g, isWritableEnded: m, isWritableFinished: function(e3, t3) {
            if (!p(e3)) return null;
            if (true === e3.writableFinished) return true;
            const r3 = e3._writableState;
            return (null == r3 || !r3.errored) && ("boolean" != typeof (null == r3 ? void 0 : r3.finished) ? null : !!(r3.finished || false === t3 && true === r3.ended && 0 === r3.length));
          }, isWritableErrored: function(e3) {
            var t3, r3;
            return b(e3) ? e3.writableErrored ? e3.writableErrored : null !== (t3 = null === (r3 = e3._writableState) || void 0 === r3 ? void 0 : r3.errored) && void 0 !== t3 ? t3 : null : null;
          }, isServerRequest: function(e3) {
            var t3;
            return "boolean" == typeof e3._consuming && "boolean" == typeof e3._dumped && void 0 === (null === (t3 = e3.req) || void 0 === t3 ? void 0 : t3.upgradeOrConnect);
          }, isServerResponse: I, willEmitClose: function(e3) {
            if (!b(e3)) return null;
            const t3 = e3._writableState, r3 = e3._readableState, n3 = t3 || r3;
            return !n3 && I(e3) || !!(n3 && n3.autoDestroy && n3.emitClose && false === n3.closed);
          }, isTransformStream: w };
        }, 6304: (e2, t2, r2) => {
          const n2 = r2(4155), { ArrayPrototypeSlice: i, Error: o, FunctionPrototypeSymbolHasInstance: s, ObjectDefineProperty: a, ObjectDefineProperties: l, ObjectSetPrototypeOf: u, StringPrototypeToLowerCase: c, Symbol: f, SymbolHasInstance: h } = r2(9061);
          e2.exports = x, x.WritableState = M;
          const { EventEmitter: d } = r2(7187), p = r2(4870).Stream, { Buffer: b } = r2(8764), y = r2(1195), { addAbortSignal: g } = r2(196), { getHighWaterMark: w, getDefaultHighWaterMark: _ } = r2(2457), { ERR_INVALID_ARG_TYPE: m, ERR_METHOD_NOT_IMPLEMENTED: E, ERR_MULTIPLE_CALLBACK: S, ERR_STREAM_CANNOT_PIPE: v, ERR_STREAM_DESTROYED: A, ERR_STREAM_ALREADY_FINISHED: I, ERR_STREAM_NULL_VALUES: T, ERR_STREAM_WRITE_AFTER_END: R, ERR_UNKNOWN_ENCODING: B } = r2(4381).codes, { errorOrDestroy: N } = y;
          function L() {
          }
          u(x.prototype, p.prototype), u(x, p);
          const U = f("kOnFinished");
          function M(e3, t3, n3) {
            "boolean" != typeof n3 && (n3 = t3 instanceof r2(8672)), this.objectMode = !(!e3 || !e3.objectMode), n3 && (this.objectMode = this.objectMode || !(!e3 || !e3.writableObjectMode)), this.highWaterMark = e3 ? w(this, e3, "writableHighWaterMark", n3) : _(false), this.finalCalled = false, this.needDrain = false, this.ending = false, this.ended = false, this.finished = false, this.destroyed = false;
            const i2 = !(!e3 || false !== e3.decodeStrings);
            this.decodeStrings = !i2, this.defaultEncoding = e3 && e3.defaultEncoding || "utf8", this.length = 0, this.writing = false, this.corked = 0, this.sync = true, this.bufferProcessing = false, this.onwrite = D.bind(void 0, t3), this.writecb = null, this.writelen = 0, this.afterWriteTickInfo = null, O(this), this.pendingcb = 0, this.constructed = true, this.prefinished = false, this.errorEmitted = false, this.emitClose = !e3 || false !== e3.emitClose, this.autoDestroy = !e3 || false !== e3.autoDestroy, this.errored = null, this.closed = false, this.closeEmitted = false, this[U] = [];
          }
          function O(e3) {
            e3.buffered = [], e3.bufferedIndex = 0, e3.allBuffers = true, e3.allNoop = true;
          }
          function x(e3) {
            const t3 = this instanceof r2(8672);
            if (!t3 && !s(x, this)) return new x(e3);
            this._writableState = new M(e3, this, t3), e3 && ("function" == typeof e3.write && (this._write = e3.write), "function" == typeof e3.writev && (this._writev = e3.writev), "function" == typeof e3.destroy && (this._destroy = e3.destroy), "function" == typeof e3.final && (this._final = e3.final), "function" == typeof e3.construct && (this._construct = e3.construct), e3.signal && g(e3.signal, this)), p.call(this, e3), y.construct(this, (() => {
              const e4 = this._writableState;
              e4.writing || W(this, e4), Y(this, e4);
            }));
          }
          function k(e3, t3, r3, i2) {
            const o2 = e3._writableState;
            if ("function" == typeof r3) i2 = r3, r3 = o2.defaultEncoding;
            else {
              if (r3) {
                if ("buffer" !== r3 && !b.isEncoding(r3)) throw new B(r3);
              } else r3 = o2.defaultEncoding;
              "function" != typeof i2 && (i2 = L);
            }
            if (null === t3) throw new T();
            if (!o2.objectMode) if ("string" == typeof t3) false !== o2.decodeStrings && (t3 = b.from(t3, r3), r3 = "buffer");
            else if (t3 instanceof b) r3 = "buffer";
            else {
              if (!p._isUint8Array(t3)) throw new m("chunk", ["string", "Buffer", "Uint8Array"], t3);
              t3 = p._uint8ArrayToBuffer(t3), r3 = "buffer";
            }
            let s2;
            return o2.ending ? s2 = new R() : o2.destroyed && (s2 = new A("write")), s2 ? (n2.nextTick(i2, s2), N(e3, s2, true), s2) : (o2.pendingcb++, (function(e4, t4, r4, n3, i3) {
              const o3 = t4.objectMode ? 1 : r4.length;
              t4.length += o3;
              const s3 = t4.length < t4.highWaterMark;
              return s3 || (t4.needDrain = true), t4.writing || t4.corked || t4.errored || !t4.constructed ? (t4.buffered.push({ chunk: r4, encoding: n3, callback: i3 }), t4.allBuffers && "buffer" !== n3 && (t4.allBuffers = false), t4.allNoop && i3 !== L && (t4.allNoop = false)) : (t4.writelen = o3, t4.writecb = i3, t4.writing = true, t4.sync = true, e4._write(r4, n3, t4.onwrite), t4.sync = false), s3 && !t4.errored && !t4.destroyed;
            })(e3, o2, t3, r3, i2));
          }
          function P2(e3, t3, r3, n3, i2, o2, s2) {
            t3.writelen = n3, t3.writecb = s2, t3.writing = true, t3.sync = true, t3.destroyed ? t3.onwrite(new A("write")) : r3 ? e3._writev(i2, t3.onwrite) : e3._write(i2, o2, t3.onwrite), t3.sync = false;
          }
          function j(e3, t3, r3, n3) {
            --t3.pendingcb, n3(r3), $(t3), N(e3, r3);
          }
          function D(e3, t3) {
            const r3 = e3._writableState, i2 = r3.sync, o2 = r3.writecb;
            "function" == typeof o2 ? (r3.writing = false, r3.writecb = null, r3.length -= r3.writelen, r3.writelen = 0, t3 ? (t3.stack, r3.errored || (r3.errored = t3), e3._readableState && !e3._readableState.errored && (e3._readableState.errored = t3), i2 ? n2.nextTick(j, e3, r3, t3, o2) : j(e3, r3, t3, o2)) : (r3.buffered.length > r3.bufferedIndex && W(e3, r3), i2 ? null !== r3.afterWriteTickInfo && r3.afterWriteTickInfo.cb === o2 ? r3.afterWriteTickInfo.count++ : (r3.afterWriteTickInfo = { count: 1, cb: o2, stream: e3, state: r3 }, n2.nextTick(F, r3.afterWriteTickInfo)) : C(e3, r3, 1, o2))) : N(e3, new S());
          }
          function F({ stream: e3, state: t3, count: r3, cb: n3 }) {
            return t3.afterWriteTickInfo = null, C(e3, t3, r3, n3);
          }
          function C(e3, t3, r3, n3) {
            for (!t3.ending && !e3.destroyed && 0 === t3.length && t3.needDrain && (t3.needDrain = false, e3.emit("drain")); r3-- > 0; ) t3.pendingcb--, n3();
            t3.destroyed && $(t3), Y(e3, t3);
          }
          function $(e3) {
            if (e3.writing) return;
            for (let r4 = e3.bufferedIndex; r4 < e3.buffered.length; ++r4) {
              var t3;
              const { chunk: n4, callback: i2 } = e3.buffered[r4], o2 = e3.objectMode ? 1 : n4.length;
              e3.length -= o2, i2(null !== (t3 = e3.errored) && void 0 !== t3 ? t3 : new A("write"));
            }
            const r3 = e3[U].splice(0);
            for (let t4 = 0; t4 < r3.length; t4++) {
              var n3;
              r3[t4](null !== (n3 = e3.errored) && void 0 !== n3 ? n3 : new A("end"));
            }
            O(e3);
          }
          function W(e3, t3) {
            if (t3.corked || t3.bufferProcessing || t3.destroyed || !t3.constructed) return;
            const { buffered: r3, bufferedIndex: n3, objectMode: o2 } = t3, s2 = r3.length - n3;
            if (!s2) return;
            let a2 = n3;
            if (t3.bufferProcessing = true, s2 > 1 && e3._writev) {
              t3.pendingcb -= s2 - 1;
              const n4 = t3.allNoop ? L : (e4) => {
                for (let t4 = a2; t4 < r3.length; ++t4) r3[t4].callback(e4);
              }, o3 = t3.allNoop && 0 === a2 ? r3 : i(r3, a2);
              o3.allBuffers = t3.allBuffers, P2(e3, t3, true, t3.length, o3, "", n4), O(t3);
            } else {
              do {
                const { chunk: n4, encoding: i2, callback: s3 } = r3[a2];
                r3[a2++] = null, P2(e3, t3, false, o2 ? 1 : n4.length, n4, i2, s3);
              } while (a2 < r3.length && !t3.writing);
              a2 === r3.length ? O(t3) : a2 > 256 ? (r3.splice(0, a2), t3.bufferedIndex = 0) : t3.bufferedIndex = a2;
            }
            t3.bufferProcessing = false;
          }
          function G(e3) {
            return e3.ending && !e3.destroyed && e3.constructed && 0 === e3.length && !e3.errored && 0 === e3.buffered.length && !e3.finished && !e3.writing && !e3.errorEmitted && !e3.closeEmitted;
          }
          function Y(e3, t3, r3) {
            G(t3) && ((function(e4, t4) {
              t4.prefinished || t4.finalCalled || ("function" != typeof e4._final || t4.destroyed ? (t4.prefinished = true, e4.emit("prefinish")) : (t4.finalCalled = true, (function(e5, t5) {
                let r4 = false;
                function i2(i3) {
                  if (r4) N(e5, null != i3 ? i3 : S());
                  else if (r4 = true, t5.pendingcb--, i3) {
                    const r5 = t5[U].splice(0);
                    for (let e6 = 0; e6 < r5.length; e6++) r5[e6](i3);
                    N(e5, i3, t5.sync);
                  } else G(t5) && (t5.prefinished = true, e5.emit("prefinish"), t5.pendingcb++, n2.nextTick(H, e5, t5));
                }
                t5.sync = true, t5.pendingcb++;
                try {
                  e5._final(i2);
                } catch (e6) {
                  i2(e6);
                }
                t5.sync = false;
              })(e4, t4)));
            })(e3, t3), 0 === t3.pendingcb && (r3 ? (t3.pendingcb++, n2.nextTick(((e4, t4) => {
              G(t4) ? H(e4, t4) : t4.pendingcb--;
            }), e3, t3)) : G(t3) && (t3.pendingcb++, H(e3, t3))));
          }
          function H(e3, t3) {
            t3.pendingcb--, t3.finished = true;
            const r3 = t3[U].splice(0);
            for (let e4 = 0; e4 < r3.length; e4++) r3[e4]();
            if (e3.emit("finish"), t3.autoDestroy) {
              const t4 = e3._readableState;
              (!t4 || t4.autoDestroy && (t4.endEmitted || false === t4.readable)) && e3.destroy();
            }
          }
          M.prototype.getBuffer = function() {
            return i(this.buffered, this.bufferedIndex);
          }, a(M.prototype, "bufferedRequestCount", { __proto__: null, get() {
            return this.buffered.length - this.bufferedIndex;
          } }), a(x, h, { __proto__: null, value: function(e3) {
            return !!s(this, e3) || this === x && e3 && e3._writableState instanceof M;
          } }), x.prototype.pipe = function() {
            N(this, new v());
          }, x.prototype.write = function(e3, t3, r3) {
            return true === k(this, e3, t3, r3);
          }, x.prototype.cork = function() {
            this._writableState.corked++;
          }, x.prototype.uncork = function() {
            const e3 = this._writableState;
            e3.corked && (e3.corked--, e3.writing || W(this, e3));
          }, x.prototype.setDefaultEncoding = function(e3) {
            if ("string" == typeof e3 && (e3 = c(e3)), !b.isEncoding(e3)) throw new B(e3);
            return this._writableState.defaultEncoding = e3, this;
          }, x.prototype._write = function(e3, t3, r3) {
            if (!this._writev) throw new E("_write()");
            this._writev([{ chunk: e3, encoding: t3 }], r3);
          }, x.prototype._writev = null, x.prototype.end = function(e3, t3, r3) {
            const i2 = this._writableState;
            let s2;
            if ("function" == typeof e3 ? (r3 = e3, e3 = null, t3 = null) : "function" == typeof t3 && (r3 = t3, t3 = null), null != e3) {
              const r4 = k(this, e3, t3);
              r4 instanceof o && (s2 = r4);
            }
            return i2.corked && (i2.corked = 1, this.uncork()), s2 || (i2.errored || i2.ending ? i2.finished ? s2 = new I("end") : i2.destroyed && (s2 = new A("end")) : (i2.ending = true, Y(this, i2, true), i2.ended = true)), "function" == typeof r3 && (s2 || i2.finished ? n2.nextTick(r3, s2) : i2[U].push(r3)), this;
          }, l(x.prototype, { closed: { __proto__: null, get() {
            return !!this._writableState && this._writableState.closed;
          } }, destroyed: { __proto__: null, get() {
            return !!this._writableState && this._writableState.destroyed;
          }, set(e3) {
            this._writableState && (this._writableState.destroyed = e3);
          } }, writable: { __proto__: null, get() {
            const e3 = this._writableState;
            return !(!e3 || false === e3.writable || e3.destroyed || e3.errored || e3.ending || e3.ended);
          }, set(e3) {
            this._writableState && (this._writableState.writable = !!e3);
          } }, writableFinished: { __proto__: null, get() {
            return !!this._writableState && this._writableState.finished;
          } }, writableObjectMode: { __proto__: null, get() {
            return !!this._writableState && this._writableState.objectMode;
          } }, writableBuffer: { __proto__: null, get() {
            return this._writableState && this._writableState.getBuffer();
          } }, writableEnded: { __proto__: null, get() {
            return !!this._writableState && this._writableState.ending;
          } }, writableNeedDrain: { __proto__: null, get() {
            const e3 = this._writableState;
            return !!e3 && !e3.destroyed && !e3.ending && e3.needDrain;
          } }, writableHighWaterMark: { __proto__: null, get() {
            return this._writableState && this._writableState.highWaterMark;
          } }, writableCorked: { __proto__: null, get() {
            return this._writableState ? this._writableState.corked : 0;
          } }, writableLength: { __proto__: null, get() {
            return this._writableState && this._writableState.length;
          } }, errored: { __proto__: null, enumerable: false, get() {
            return this._writableState ? this._writableState.errored : null;
          } }, writableAborted: { __proto__: null, enumerable: false, get: function() {
            return !(false === this._writableState.writable || !this._writableState.destroyed && !this._writableState.errored || this._writableState.finished);
          } } });
          const V = y.destroy;
          let K;
          function q() {
            return void 0 === K && (K = {}), K;
          }
          x.prototype.destroy = function(e3, t3) {
            const r3 = this._writableState;
            return !r3.destroyed && (r3.bufferedIndex < r3.buffered.length || r3[U].length) && n2.nextTick($, r3), V.call(this, e3, t3), this;
          }, x.prototype._undestroy = y.undestroy, x.prototype._destroy = function(e3, t3) {
            t3(e3);
          }, x.prototype[d.captureRejectionSymbol] = function(e3) {
            this.destroy(e3);
          }, x.fromWeb = function(e3, t3) {
            return q().newStreamWritableFromWritableStream(e3, t3);
          }, x.toWeb = function(e3) {
            return q().newWritableStreamFromStreamWritable(e3);
          };
        }, 6547: (e2, t2, r2) => {
          "use strict";
          const { ArrayIsArray: n2, ArrayPrototypeIncludes: i, ArrayPrototypeJoin: o, ArrayPrototypeMap: s, NumberIsInteger: a, NumberIsNaN: l, NumberMAX_SAFE_INTEGER: u, NumberMIN_SAFE_INTEGER: c, NumberParseInt: f, ObjectPrototypeHasOwnProperty: h, RegExpPrototypeExec: d, String: p, StringPrototypeToUpperCase: b, StringPrototypeTrim: y } = r2(9061), { hideStackFrames: g, codes: { ERR_SOCKET_BAD_PORT: w, ERR_INVALID_ARG_TYPE: _, ERR_INVALID_ARG_VALUE: m, ERR_OUT_OF_RANGE: E, ERR_UNKNOWN_SIGNAL: S } } = r2(4381), { normalizeEncoding: v } = r2(6087), { isAsyncFunction: A, isArrayBufferView: I } = r2(6087).types, T = {}, R = /^[0-7]+$/, B = g(((e3, t3, r3 = c, n3 = u) => {
            if ("number" != typeof e3) throw new _(t3, "number", e3);
            if (!a(e3)) throw new E(t3, "an integer", e3);
            if (e3 < r3 || e3 > n3) throw new E(t3, `>= ${r3} && <= ${n3}`, e3);
          })), N = g(((e3, t3, r3 = -2147483648, n3 = 2147483647) => {
            if ("number" != typeof e3) throw new _(t3, "number", e3);
            if (!a(e3)) throw new E(t3, "an integer", e3);
            if (e3 < r3 || e3 > n3) throw new E(t3, `>= ${r3} && <= ${n3}`, e3);
          })), L = g(((e3, t3, r3 = false) => {
            if ("number" != typeof e3) throw new _(t3, "number", e3);
            if (!a(e3)) throw new E(t3, "an integer", e3);
            const n3 = r3 ? 1 : 0, i2 = 4294967295;
            if (e3 < n3 || e3 > i2) throw new E(t3, `>= ${n3} && <= ${i2}`, e3);
          }));
          function U(e3, t3) {
            if ("string" != typeof e3) throw new _(t3, "string", e3);
          }
          const M = g(((e3, t3, r3) => {
            if (!i(r3, e3)) {
              const n3 = o(s(r3, ((e4) => "string" == typeof e4 ? `'${e4}'` : p(e4))), ", ");
              throw new m(t3, e3, "must be one of: " + n3);
            }
          }));
          function O(e3, t3) {
            if ("boolean" != typeof e3) throw new _(t3, "boolean", e3);
          }
          function x(e3, t3, r3) {
            return null != e3 && h(e3, t3) ? e3[t3] : r3;
          }
          const k = g(((e3, t3, r3 = null) => {
            const i2 = x(r3, "allowArray", false), o2 = x(r3, "allowFunction", false);
            if (!x(r3, "nullable", false) && null === e3 || !i2 && n2(e3) || "object" != typeof e3 && (!o2 || "function" != typeof e3)) throw new _(t3, "Object", e3);
          })), P2 = g(((e3, t3) => {
            if (null != e3 && "object" != typeof e3 && "function" != typeof e3) throw new _(t3, "a dictionary", e3);
          })), j = g(((e3, t3, r3 = 0) => {
            if (!n2(e3)) throw new _(t3, "Array", e3);
            if (e3.length < r3) throw new m(t3, e3, `must be longer than ${r3}`);
          })), D = g(((e3, t3 = "buffer") => {
            if (!I(e3)) throw new _(t3, ["Buffer", "TypedArray", "DataView"], e3);
          })), F = g(((e3, t3) => {
            if (void 0 !== e3 && (null === e3 || "object" != typeof e3 || !("aborted" in e3))) throw new _(t3, "AbortSignal", e3);
          })), C = g(((e3, t3) => {
            if ("function" != typeof e3) throw new _(t3, "Function", e3);
          })), $ = g(((e3, t3) => {
            if ("function" != typeof e3 || A(e3)) throw new _(t3, "Function", e3);
          })), W = g(((e3, t3) => {
            if (void 0 !== e3) throw new _(t3, "undefined", e3);
          })), G = /^(?:<[^>]*>)(?:\s*;\s*[^;"\s]+(?:=(")?[^;"\s]*\1)?)*$/;
          function Y(e3, t3) {
            if (void 0 === e3 || !d(G, e3)) throw new m(t3, e3, 'must be an array or string of format "</styles.css>; rel=preload; as=style"');
          }
          e2.exports = { isInt32: function(e3) {
            return e3 === (0 | e3);
          }, isUint32: function(e3) {
            return e3 === e3 >>> 0;
          }, parseFileMode: function(e3, t3, r3) {
            if (void 0 === e3 && (e3 = r3), "string" == typeof e3) {
              if (null === d(R, e3)) throw new m(t3, e3, "must be a 32-bit unsigned integer or an octal string");
              e3 = f(e3, 8);
            }
            return L(e3, t3), e3;
          }, validateArray: j, validateStringArray: function(e3, t3) {
            j(e3, t3);
            for (let r3 = 0; r3 < e3.length; r3++) U(e3[r3], `${t3}[${r3}]`);
          }, validateBooleanArray: function(e3, t3) {
            j(e3, t3);
            for (let r3 = 0; r3 < e3.length; r3++) O(e3[r3], `${t3}[${r3}]`);
          }, validateAbortSignalArray: function(e3, t3) {
            j(e3, t3);
            for (let r3 = 0; r3 < e3.length; r3++) {
              const n3 = e3[r3], i2 = `${t3}[${r3}]`;
              if (null == n3) throw new _(i2, "AbortSignal", n3);
              F(n3, i2);
            }
          }, validateBoolean: O, validateBuffer: D, validateDictionary: P2, validateEncoding: function(e3, t3) {
            const r3 = v(t3), n3 = e3.length;
            if ("hex" === r3 && n3 % 2 != 0) throw new m("encoding", t3, `is invalid for data of length ${n3}`);
          }, validateFunction: C, validateInt32: N, validateInteger: B, validateNumber: function(e3, t3, r3 = void 0, n3) {
            if ("number" != typeof e3) throw new _(t3, "number", e3);
            if (null != r3 && e3 < r3 || null != n3 && e3 > n3 || (null != r3 || null != n3) && l(e3)) throw new E(t3, `${null != r3 ? `>= ${r3}` : ""}${null != r3 && null != n3 ? " && " : ""}${null != n3 ? `<= ${n3}` : ""}`, e3);
          }, validateObject: k, validateOneOf: M, validatePlainFunction: $, validatePort: function(e3, t3 = "Port", r3 = true) {
            if ("number" != typeof e3 && "string" != typeof e3 || "string" == typeof e3 && 0 === y(e3).length || +e3 != +e3 >>> 0 || e3 > 65535 || 0 === e3 && !r3) throw new w(t3, e3, r3);
            return 0 | e3;
          }, validateSignalName: function(e3, t3 = "signal") {
            if (U(e3, t3), void 0 === T[e3]) {
              if (void 0 !== T[b(e3)]) throw new S(e3 + " (signals must use all capital letters)");
              throw new S(e3);
            }
          }, validateString: U, validateUint32: L, validateUndefined: W, validateUnion: function(e3, t3, r3) {
            if (!i(r3, e3)) throw new _(t3, `('${o(r3, "|")}')`, e3);
          }, validateAbortSignal: F, validateLinkHeaderValue: function(e3) {
            if ("string" == typeof e3) return Y(e3, "hints"), e3;
            if (n2(e3)) {
              const t3 = e3.length;
              let r3 = "";
              if (0 === t3) return r3;
              for (let n3 = 0; n3 < t3; n3++) {
                const i2 = e3[n3];
                Y(i2, "hints"), r3 += i2, n3 !== t3 - 1 && (r3 += ", ");
              }
              return r3;
            }
            throw new m("hints", e3, 'must be an array or string of format "</styles.css>; rel=preload; as=style"');
          } };
        }, 4381: (e2, t2, r2) => {
          "use strict";
          const { format: n2, inspect: i, AggregateError: o } = r2(6087), s = globalThis.AggregateError || o, a = /* @__PURE__ */ Symbol("kIsNodeError"), l = ["string", "function", "number", "object", "Function", "Object", "boolean", "bigint", "symbol"], u = /^([A-Z][a-z0-9]*)+$/, c = {};
          function f(e3, t3) {
            if (!e3) throw new c.ERR_INTERNAL_ASSERTION(t3);
          }
          function h(e3) {
            let t3 = "", r3 = e3.length;
            const n3 = "-" === e3[0] ? 1 : 0;
            for (; r3 >= n3 + 4; r3 -= 3) t3 = `_${e3.slice(r3 - 3, r3)}${t3}`;
            return `${e3.slice(0, r3)}${t3}`;
          }
          function d(e3, t3, r3) {
            r3 || (r3 = Error);
            class i2 extends r3 {
              constructor(...r4) {
                super((function(e4, t4, r5) {
                  if ("function" == typeof t4) return f(t4.length <= r5.length, `Code: ${e4}; The provided arguments length (${r5.length}) does not match the required ones (${t4.length}).`), t4(...r5);
                  const i3 = (t4.match(/%[dfijoOs]/g) || []).length;
                  return f(i3 === r5.length, `Code: ${e4}; The provided arguments length (${r5.length}) does not match the required ones (${i3}).`), 0 === r5.length ? t4 : n2(t4, ...r5);
                })(e3, t3, r4));
              }
              toString() {
                return `${this.name} [${e3}]: ${this.message}`;
              }
            }
            Object.defineProperties(i2.prototype, { name: { value: r3.name, writable: true, enumerable: false, configurable: true }, toString: { value() {
              return `${this.name} [${e3}]: ${this.message}`;
            }, writable: true, enumerable: false, configurable: true } }), i2.prototype.code = e3, i2.prototype[a] = true, c[e3] = i2;
          }
          function p(e3) {
            const t3 = "__node_internal_" + e3.name;
            return Object.defineProperty(e3, "name", { value: t3 }), e3;
          }
          class b extends Error {
            constructor(e3 = "The operation was aborted", t3 = void 0) {
              if (void 0 !== t3 && "object" != typeof t3) throw new c.ERR_INVALID_ARG_TYPE("options", "Object", t3);
              super(e3, t3), this.code = "ABORT_ERR", this.name = "AbortError";
            }
          }
          d("ERR_ASSERTION", "%s", Error), d("ERR_INVALID_ARG_TYPE", ((e3, t3, r3) => {
            f("string" == typeof e3, "'name' must be a string"), Array.isArray(t3) || (t3 = [t3]);
            let n3 = "The ";
            e3.endsWith(" argument") ? n3 += `${e3} ` : n3 += `"${e3}" ${e3.includes(".") ? "property" : "argument"} `, n3 += "must be ";
            const o2 = [], s2 = [], a2 = [];
            for (const e4 of t3) f("string" == typeof e4, "All expected entries have to be of type string"), l.includes(e4) ? o2.push(e4.toLowerCase()) : u.test(e4) ? s2.push(e4) : (f("object" !== e4, 'The value "object" should be written as "Object"'), a2.push(e4));
            if (s2.length > 0) {
              const e4 = o2.indexOf("object");
              -1 !== e4 && (o2.splice(o2, e4, 1), s2.push("Object"));
            }
            if (o2.length > 0) {
              switch (o2.length) {
                case 1:
                  n3 += `of type ${o2[0]}`;
                  break;
                case 2:
                  n3 += `one of type ${o2[0]} or ${o2[1]}`;
                  break;
                default: {
                  const e4 = o2.pop();
                  n3 += `one of type ${o2.join(", ")}, or ${e4}`;
                }
              }
              (s2.length > 0 || a2.length > 0) && (n3 += " or ");
            }
            if (s2.length > 0) {
              switch (s2.length) {
                case 1:
                  n3 += `an instance of ${s2[0]}`;
                  break;
                case 2:
                  n3 += `an instance of ${s2[0]} or ${s2[1]}`;
                  break;
                default: {
                  const e4 = s2.pop();
                  n3 += `an instance of ${s2.join(", ")}, or ${e4}`;
                }
              }
              a2.length > 0 && (n3 += " or ");
            }
            switch (a2.length) {
              case 0:
                break;
              case 1:
                a2[0].toLowerCase() !== a2[0] && (n3 += "an "), n3 += `${a2[0]}`;
                break;
              case 2:
                n3 += `one of ${a2[0]} or ${a2[1]}`;
                break;
              default: {
                const e4 = a2.pop();
                n3 += `one of ${a2.join(", ")}, or ${e4}`;
              }
            }
            if (null == r3) n3 += `. Received ${r3}`;
            else if ("function" == typeof r3 && r3.name) n3 += `. Received function ${r3.name}`;
            else if ("object" == typeof r3) {
              var c2;
              null !== (c2 = r3.constructor) && void 0 !== c2 && c2.name ? n3 += `. Received an instance of ${r3.constructor.name}` : n3 += `. Received ${i(r3, { depth: -1 })}`;
            } else {
              let e4 = i(r3, { colors: false });
              e4.length > 25 && (e4 = `${e4.slice(0, 25)}...`), n3 += `. Received type ${typeof r3} (${e4})`;
            }
            return n3;
          }), TypeError), d("ERR_INVALID_ARG_VALUE", ((e3, t3, r3 = "is invalid") => {
            let n3 = i(t3);
            return n3.length > 128 && (n3 = n3.slice(0, 128) + "..."), `The ${e3.includes(".") ? "property" : "argument"} '${e3}' ${r3}. Received ${n3}`;
          }), TypeError), d("ERR_INVALID_RETURN_VALUE", ((e3, t3, r3) => {
            var n3;
            return `Expected ${e3} to be returned from the "${t3}" function but got ${null != r3 && null !== (n3 = r3.constructor) && void 0 !== n3 && n3.name ? `instance of ${r3.constructor.name}` : "type " + typeof r3}.`;
          }), TypeError), d("ERR_MISSING_ARGS", ((...e3) => {
            let t3;
            f(e3.length > 0, "At least one arg needs to be specified");
            const r3 = e3.length;
            switch (e3 = (Array.isArray(e3) ? e3 : [e3]).map(((e4) => `"${e4}"`)).join(" or "), r3) {
              case 1:
                t3 += `The ${e3[0]} argument`;
                break;
              case 2:
                t3 += `The ${e3[0]} and ${e3[1]} arguments`;
                break;
              default: {
                const r4 = e3.pop();
                t3 += `The ${e3.join(", ")}, and ${r4} arguments`;
              }
            }
            return `${t3} must be specified`;
          }), TypeError), d("ERR_OUT_OF_RANGE", ((e3, t3, r3) => {
            let n3;
            return f(t3, 'Missing "range" argument'), Number.isInteger(r3) && Math.abs(r3) > 2 ** 32 ? n3 = h(String(r3)) : "bigint" == typeof r3 ? (n3 = String(r3), (r3 > 2n ** 32n || r3 < -(2n ** 32n)) && (n3 = h(n3)), n3 += "n") : n3 = i(r3), `The value of "${e3}" is out of range. It must be ${t3}. Received ${n3}`;
          }), RangeError), d("ERR_MULTIPLE_CALLBACK", "Callback called multiple times", Error), d("ERR_METHOD_NOT_IMPLEMENTED", "The %s method is not implemented", Error), d("ERR_STREAM_ALREADY_FINISHED", "Cannot call %s after a stream was finished", Error), d("ERR_STREAM_CANNOT_PIPE", "Cannot pipe, not readable", Error), d("ERR_STREAM_DESTROYED", "Cannot call %s after a stream was destroyed", Error), d("ERR_STREAM_NULL_VALUES", "May not write null values to stream", TypeError), d("ERR_STREAM_PREMATURE_CLOSE", "Premature close", Error), d("ERR_STREAM_PUSH_AFTER_EOF", "stream.push() after EOF", Error), d("ERR_STREAM_UNSHIFT_AFTER_END_EVENT", "stream.unshift() after end event", Error), d("ERR_STREAM_WRITE_AFTER_END", "write after end", Error), d("ERR_UNKNOWN_ENCODING", "Unknown encoding: %s", TypeError), e2.exports = { AbortError: b, aggregateTwoErrors: p((function(e3, t3) {
            if (e3 && t3 && e3 !== t3) {
              if (Array.isArray(t3.errors)) return t3.errors.push(e3), t3;
              const r3 = new s([t3, e3], t3.message);
              return r3.code = t3.code, r3;
            }
            return e3 || t3;
          })), hideStackFrames: p, codes: c };
        }, 9061: (e2) => {
          "use strict";
          e2.exports = { ArrayIsArray: (e3) => Array.isArray(e3), ArrayPrototypeIncludes: (e3, t2) => e3.includes(t2), ArrayPrototypeIndexOf: (e3, t2) => e3.indexOf(t2), ArrayPrototypeJoin: (e3, t2) => e3.join(t2), ArrayPrototypeMap: (e3, t2) => e3.map(t2), ArrayPrototypePop: (e3, t2) => e3.pop(t2), ArrayPrototypePush: (e3, t2) => e3.push(t2), ArrayPrototypeSlice: (e3, t2, r2) => e3.slice(t2, r2), Error, FunctionPrototypeCall: (e3, t2, ...r2) => e3.call(t2, ...r2), FunctionPrototypeSymbolHasInstance: (e3, t2) => Function.prototype[Symbol.hasInstance].call(e3, t2), MathFloor: Math.floor, Number, NumberIsInteger: Number.isInteger, NumberIsNaN: Number.isNaN, NumberMAX_SAFE_INTEGER: Number.MAX_SAFE_INTEGER, NumberMIN_SAFE_INTEGER: Number.MIN_SAFE_INTEGER, NumberParseInt: Number.parseInt, ObjectDefineProperties: (e3, t2) => Object.defineProperties(e3, t2), ObjectDefineProperty: (e3, t2, r2) => Object.defineProperty(e3, t2, r2), ObjectGetOwnPropertyDescriptor: (e3, t2) => Object.getOwnPropertyDescriptor(e3, t2), ObjectKeys: (e3) => Object.keys(e3), ObjectSetPrototypeOf: (e3, t2) => Object.setPrototypeOf(e3, t2), Promise, PromisePrototypeCatch: (e3, t2) => e3.catch(t2), PromisePrototypeThen: (e3, t2, r2) => e3.then(t2, r2), PromiseReject: (e3) => Promise.reject(e3), PromiseResolve: (e3) => Promise.resolve(e3), ReflectApply: Reflect.apply, RegExpPrototypeTest: (e3, t2) => e3.test(t2), SafeSet: Set, String, StringPrototypeSlice: (e3, t2, r2) => e3.slice(t2, r2), StringPrototypeToLowerCase: (e3) => e3.toLowerCase(), StringPrototypeToUpperCase: (e3) => e3.toUpperCase(), StringPrototypeTrim: (e3) => e3.trim(), Symbol, SymbolFor: Symbol.for, SymbolAsyncIterator: Symbol.asyncIterator, SymbolHasInstance: Symbol.hasInstance, SymbolIterator: Symbol.iterator, SymbolDispose: Symbol.dispose || /* @__PURE__ */ Symbol("Symbol.dispose"), SymbolAsyncDispose: Symbol.asyncDispose || /* @__PURE__ */ Symbol("Symbol.asyncDispose"), TypedArrayPrototypeSet: (e3, t2, r2) => e3.set(t2, r2), Boolean, Uint8Array };
        }, 6087: (e2, t2, r2) => {
          "use strict";
          const n2 = r2(8764), { kResistStopPropagation: i, SymbolDispose: o } = r2(9061), s = globalThis.AbortSignal || r2(8599).AbortSignal, a = globalThis.AbortController || r2(8599).AbortController, l = Object.getPrototypeOf((async function() {
          })).constructor, u = globalThis.Blob || n2.Blob, c = void 0 !== u ? function(e3) {
            return e3 instanceof u;
          } : function(e3) {
            return false;
          }, f = (e3, t3) => {
            if (void 0 !== e3 && (null === e3 || "object" != typeof e3 || !("aborted" in e3))) throw new ERR_INVALID_ARG_TYPE(t3, "AbortSignal", e3);
          };
          class h extends Error {
            constructor(e3) {
              if (!Array.isArray(e3)) throw new TypeError("Expected input to be an Array, got " + typeof e3);
              let t3 = "";
              for (let r3 = 0; r3 < e3.length; r3++) t3 += `    ${e3[r3].stack}
`;
              super(t3), this.name = "AggregateError", this.errors = e3;
            }
          }
          e2.exports = { AggregateError: h, kEmptyObject: Object.freeze({}), once(e3) {
            let t3 = false;
            return function(...r3) {
              t3 || (t3 = true, e3.apply(this, r3));
            };
          }, createDeferredPromise: function() {
            let e3, t3;
            return { promise: new Promise(((r3, n3) => {
              e3 = r3, t3 = n3;
            })), resolve: e3, reject: t3 };
          }, promisify: (e3) => new Promise(((t3, r3) => {
            e3(((e4, ...n3) => e4 ? r3(e4) : t3(...n3)));
          })), debuglog: () => function() {
          }, format: (e3, ...t3) => e3.replace(/%([sdifj])/g, (function(...[e4, r3]) {
            const n3 = t3.shift();
            return "f" === r3 ? n3.toFixed(6) : "j" === r3 ? JSON.stringify(n3) : "s" === r3 && "object" == typeof n3 ? `${n3.constructor !== Object ? n3.constructor.name : ""} {}`.trim() : n3.toString();
          })), inspect(e3) {
            switch (typeof e3) {
              case "string":
                if (e3.includes("'")) {
                  if (!e3.includes('"')) return `"${e3}"`;
                  if (!e3.includes("`") && !e3.includes("${")) return `\`${e3}\``;
                }
                return `'${e3}'`;
              case "number":
                return isNaN(e3) ? "NaN" : Object.is(e3, -0) ? String(e3) : e3;
              case "bigint":
                return `${String(e3)}n`;
              case "boolean":
              case "undefined":
                return String(e3);
              case "object":
                return "{}";
            }
          }, types: { isAsyncFunction: (e3) => e3 instanceof l, isArrayBufferView: (e3) => ArrayBuffer.isView(e3) }, isBlob: c, deprecate: (e3, t3) => e3, addAbortListener: r2(7187).addAbortListener || function(e3, t3) {
            if (void 0 === e3) throw new ERR_INVALID_ARG_TYPE("signal", "AbortSignal", e3);
            let r3;
            return f(e3, "signal"), ((e4, t4) => {
              if ("function" != typeof e4) throw new ERR_INVALID_ARG_TYPE("listener", "Function", e4);
            })(t3), e3.aborted ? queueMicrotask((() => t3())) : (e3.addEventListener("abort", t3, { __proto__: null, once: true, [i]: true }), r3 = () => {
              e3.removeEventListener("abort", t3);
            }), { __proto__: null, [o]() {
              var e4;
              null === (e4 = r3) || void 0 === e4 || e4();
            } };
          }, AbortSignalAny: s.any || function(e3) {
            if (1 === e3.length) return e3[0];
            const t3 = new a(), r3 = () => t3.abort();
            return e3.forEach(((e4) => {
              f(e4, "signals"), e4.addEventListener("abort", r3, { once: true });
            })), t3.signal.addEventListener("abort", (() => {
              e3.forEach(((e4) => e4.removeEventListener("abort", r3)));
            }), { once: true }), t3.signal;
          } }, e2.exports.promisify.custom = /* @__PURE__ */ Symbol.for("nodejs.util.promisify.custom");
        }, 5099: (e2, t2, r2) => {
          const { Buffer: n2 } = r2(8764), { ObjectDefineProperty: i, ObjectKeys: o, ReflectApply: s } = r2(9061), { promisify: { custom: a } } = r2(6087), { streamReturningOperators: l, promiseReturningOperators: u } = r2(4382), { codes: { ERR_ILLEGAL_CONSTRUCTOR: c } } = r2(4381), f = r2(299), { setDefaultHighWaterMark: h, getDefaultHighWaterMark: d } = r2(2457), { pipeline: p } = r2(9946), { destroyer: b } = r2(1195), y = r2(8610), g = r2(7854), w = r2(5874), _ = e2.exports = r2(4870).Stream;
          _.isDestroyed = w.isDestroyed, _.isDisturbed = w.isDisturbed, _.isErrored = w.isErrored, _.isReadable = w.isReadable, _.isWritable = w.isWritable, _.Readable = r2(911);
          for (const S of o(l)) {
            let m2 = function(...e3) {
              if (new.target) throw c();
              return _.Readable.from(s(v, this, e3));
            };
            var m = m2;
            const v = l[S];
            i(m2, "name", { __proto__: null, value: v.name }), i(m2, "length", { __proto__: null, value: v.length }), i(_.Readable.prototype, S, { __proto__: null, value: m2, enumerable: false, configurable: true, writable: true });
          }
          for (const A of o(u)) {
            let m2 = function(...e3) {
              if (new.target) throw c();
              return s(I, this, e3);
            };
            var m = m2;
            const I = u[A];
            i(m2, "name", { __proto__: null, value: I.name }), i(m2, "length", { __proto__: null, value: I.length }), i(_.Readable.prototype, A, { __proto__: null, value: m2, enumerable: false, configurable: true, writable: true });
          }
          _.Writable = r2(6304), _.Duplex = r2(8672), _.Transform = r2(1161), _.PassThrough = r2(917), _.pipeline = p;
          const { addAbortSignal: E } = r2(196);
          _.addAbortSignal = E, _.finished = y, _.destroy = b, _.compose = f, _.setDefaultHighWaterMark = h, _.getDefaultHighWaterMark = d, i(_, "promises", { __proto__: null, configurable: true, enumerable: true, get: () => g }), i(p, a, { __proto__: null, enumerable: true, get: () => g.pipeline }), i(y, a, { __proto__: null, enumerable: true, get: () => g.finished }), _.Stream = _, _._isUint8Array = function(e3) {
            return e3 instanceof Uint8Array;
          }, _._uint8ArrayToBuffer = function(e3) {
            return n2.from(e3.buffer, e3.byteOffset, e3.byteLength);
          };
        }, 7854: (e2, t2, r2) => {
          "use strict";
          const { ArrayPrototypePop: n2, Promise: i } = r2(9061), { isIterable: o, isNodeStream: s, isWebStream: a } = r2(5874), { pipelineImpl: l } = r2(9946), { finished: u } = r2(8610);
          r2(5099), e2.exports = { finished: u, pipeline: function(...e3) {
            return new i(((t3, r3) => {
              let i2, u2;
              const c = e3[e3.length - 1];
              if (c && "object" == typeof c && !s(c) && !o(c) && !a(c)) {
                const t4 = n2(e3);
                i2 = t4.signal, u2 = t4.end;
              }
              l(e3, ((e4, n3) => {
                e4 ? r3(e4) : t3(n3);
              }), { signal: i2, end: u2 });
            }));
          } };
        }, 9509: (e2, t2, r2) => {
          var n2 = r2(8764), i = n2.Buffer;
          function o(e3, t3) {
            for (var r3 in e3) t3[r3] = e3[r3];
          }
          function s(e3, t3, r3) {
            return i(e3, t3, r3);
          }
          i.from && i.alloc && i.allocUnsafe && i.allocUnsafeSlow ? e2.exports = n2 : (o(n2, t2), t2.Buffer = s), s.prototype = Object.create(i.prototype), o(i, s), s.from = function(e3, t3, r3) {
            if ("number" == typeof e3) throw new TypeError("Argument must not be a number");
            return i(e3, t3, r3);
          }, s.alloc = function(e3, t3, r3) {
            if ("number" != typeof e3) throw new TypeError("Argument must be a number");
            var n3 = i(e3);
            return void 0 !== t3 ? "string" == typeof r3 ? n3.fill(t3, r3) : n3.fill(t3) : n3.fill(0), n3;
          }, s.allocUnsafe = function(e3) {
            if ("number" != typeof e3) throw new TypeError("Argument must be a number");
            return i(e3);
          }, s.allocUnsafeSlow = function(e3) {
            if ("number" != typeof e3) throw new TypeError("Argument must be a number");
            return n2.SlowBuffer(e3);
          };
        }, 2830: (e2, t2, r2) => {
          e2.exports = i;
          var n2 = r2(7187).EventEmitter;
          function i() {
            n2.call(this);
          }
          r2(5717)(i, n2), i.Readable = r2(9481), i.Writable = r2(4229), i.Duplex = r2(6753), i.Transform = r2(4605), i.PassThrough = r2(2725), i.finished = r2(8610), i.pipeline = r2(9946), i.Stream = i, i.prototype.pipe = function(e3, t3) {
            var r3 = this;
            function i2(t4) {
              e3.writable && false === e3.write(t4) && r3.pause && r3.pause();
            }
            function o() {
              r3.readable && r3.resume && r3.resume();
            }
            r3.on("data", i2), e3.on("drain", o), e3._isStdio || t3 && false === t3.end || (r3.on("end", a), r3.on("close", l));
            var s = false;
            function a() {
              s || (s = true, e3.end());
            }
            function l() {
              s || (s = true, "function" == typeof e3.destroy && e3.destroy());
            }
            function u(e4) {
              if (c(), 0 === n2.listenerCount(this, "error")) throw e4;
            }
            function c() {
              r3.removeListener("data", i2), e3.removeListener("drain", o), r3.removeListener("end", a), r3.removeListener("close", l), r3.removeListener("error", u), e3.removeListener("error", u), r3.removeListener("end", c), r3.removeListener("close", c), e3.removeListener("close", c);
            }
            return r3.on("error", u), e3.on("error", u), r3.on("end", c), r3.on("close", c), e3.on("close", c), e3.emit("pipe", r3), e3;
          };
        }, 2553: (e2, t2, r2) => {
          "use strict";
          var n2 = r2(9509).Buffer, i = n2.isEncoding || function(e3) {
            switch ((e3 = "" + e3) && e3.toLowerCase()) {
              case "hex":
              case "utf8":
              case "utf-8":
              case "ascii":
              case "binary":
              case "base64":
              case "ucs2":
              case "ucs-2":
              case "utf16le":
              case "utf-16le":
              case "raw":
                return true;
              default:
                return false;
            }
          };
          function o(e3) {
            var t3;
            switch (this.encoding = (function(e4) {
              var t4 = (function(e5) {
                if (!e5) return "utf8";
                for (var t5; ; ) switch (e5) {
                  case "utf8":
                  case "utf-8":
                    return "utf8";
                  case "ucs2":
                  case "ucs-2":
                  case "utf16le":
                  case "utf-16le":
                    return "utf16le";
                  case "latin1":
                  case "binary":
                    return "latin1";
                  case "base64":
                  case "ascii":
                  case "hex":
                    return e5;
                  default:
                    if (t5) return;
                    e5 = ("" + e5).toLowerCase(), t5 = true;
                }
              })(e4);
              if ("string" != typeof t4 && (n2.isEncoding === i || !i(e4))) throw new Error("Unknown encoding: " + e4);
              return t4 || e4;
            })(e3), this.encoding) {
              case "utf16le":
                this.text = l, this.end = u, t3 = 4;
                break;
              case "utf8":
                this.fillLast = a, t3 = 4;
                break;
              case "base64":
                this.text = c, this.end = f, t3 = 3;
                break;
              default:
                return this.write = h, void (this.end = d);
            }
            this.lastNeed = 0, this.lastTotal = 0, this.lastChar = n2.allocUnsafe(t3);
          }
          function s(e3) {
            return e3 <= 127 ? 0 : e3 >> 5 == 6 ? 2 : e3 >> 4 == 14 ? 3 : e3 >> 3 == 30 ? 4 : e3 >> 6 == 2 ? -1 : -2;
          }
          function a(e3) {
            var t3 = this.lastTotal - this.lastNeed, r3 = (function(e4, t4, r4) {
              if (128 != (192 & t4[0])) return e4.lastNeed = 0, "\uFFFD";
              if (e4.lastNeed > 1 && t4.length > 1) {
                if (128 != (192 & t4[1])) return e4.lastNeed = 1, "\uFFFD";
                if (e4.lastNeed > 2 && t4.length > 2 && 128 != (192 & t4[2])) return e4.lastNeed = 2, "\uFFFD";
              }
            })(this, e3);
            return void 0 !== r3 ? r3 : this.lastNeed <= e3.length ? (e3.copy(this.lastChar, t3, 0, this.lastNeed), this.lastChar.toString(this.encoding, 0, this.lastTotal)) : (e3.copy(this.lastChar, t3, 0, e3.length), void (this.lastNeed -= e3.length));
          }
          function l(e3, t3) {
            if ((e3.length - t3) % 2 == 0) {
              var r3 = e3.toString("utf16le", t3);
              if (r3) {
                var n3 = r3.charCodeAt(r3.length - 1);
                if (n3 >= 55296 && n3 <= 56319) return this.lastNeed = 2, this.lastTotal = 4, this.lastChar[0] = e3[e3.length - 2], this.lastChar[1] = e3[e3.length - 1], r3.slice(0, -1);
              }
              return r3;
            }
            return this.lastNeed = 1, this.lastTotal = 2, this.lastChar[0] = e3[e3.length - 1], e3.toString("utf16le", t3, e3.length - 1);
          }
          function u(e3) {
            var t3 = e3 && e3.length ? this.write(e3) : "";
            if (this.lastNeed) {
              var r3 = this.lastTotal - this.lastNeed;
              return t3 + this.lastChar.toString("utf16le", 0, r3);
            }
            return t3;
          }
          function c(e3, t3) {
            var r3 = (e3.length - t3) % 3;
            return 0 === r3 ? e3.toString("base64", t3) : (this.lastNeed = 3 - r3, this.lastTotal = 3, 1 === r3 ? this.lastChar[0] = e3[e3.length - 1] : (this.lastChar[0] = e3[e3.length - 2], this.lastChar[1] = e3[e3.length - 1]), e3.toString("base64", t3, e3.length - r3));
          }
          function f(e3) {
            var t3 = e3 && e3.length ? this.write(e3) : "";
            return this.lastNeed ? t3 + this.lastChar.toString("base64", 0, 3 - this.lastNeed) : t3;
          }
          function h(e3) {
            return e3.toString(this.encoding);
          }
          function d(e3) {
            return e3 && e3.length ? this.write(e3) : "";
          }
          t2.StringDecoder = o, o.prototype.write = function(e3) {
            if (0 === e3.length) return "";
            var t3, r3;
            if (this.lastNeed) {
              if (void 0 === (t3 = this.fillLast(e3))) return "";
              r3 = this.lastNeed, this.lastNeed = 0;
            } else r3 = 0;
            return r3 < e3.length ? t3 ? t3 + this.text(e3, r3) : this.text(e3, r3) : t3 || "";
          }, o.prototype.end = function(e3) {
            var t3 = e3 && e3.length ? this.write(e3) : "";
            return this.lastNeed ? t3 + "\uFFFD" : t3;
          }, o.prototype.text = function(e3, t3) {
            var r3 = (function(e4, t4, r4) {
              var n4 = t4.length - 1;
              if (n4 < r4) return 0;
              var i2 = s(t4[n4]);
              return i2 >= 0 ? (i2 > 0 && (e4.lastNeed = i2 - 1), i2) : --n4 < r4 || -2 === i2 ? 0 : (i2 = s(t4[n4])) >= 0 ? (i2 > 0 && (e4.lastNeed = i2 - 2), i2) : --n4 < r4 || -2 === i2 ? 0 : (i2 = s(t4[n4])) >= 0 ? (i2 > 0 && (2 === i2 ? i2 = 0 : e4.lastNeed = i2 - 3), i2) : 0;
            })(this, e3, t3);
            if (!this.lastNeed) return e3.toString("utf8", t3);
            this.lastTotal = r3;
            var n3 = e3.length - (r3 - this.lastNeed);
            return e3.copy(this.lastChar, 0, n3), e3.toString("utf8", t3, n3);
          }, o.prototype.fillLast = function(e3) {
            if (this.lastNeed <= e3.length) return e3.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed), this.lastChar.toString(this.encoding, 0, this.lastTotal);
            e3.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, e3.length), this.lastNeed -= e3.length;
          };
        } }, t = {};
        function r(n2) {
          var i = t[n2];
          if (void 0 !== i) return i.exports;
          var o = t[n2] = { exports: {} };
          return e[n2](o, o.exports, r), o.exports;
        }
        r.n = (e2) => {
          var t2 = e2 && e2.__esModule ? () => e2.default : () => e2;
          return r.d(t2, { a: t2 }), t2;
        }, r.d = (e2, t2) => {
          for (var n2 in t2) r.o(t2, n2) && !r.o(e2, n2) && Object.defineProperty(e2, n2, { enumerable: true, get: t2[n2] });
        }, r.o = (e2, t2) => Object.prototype.hasOwnProperty.call(e2, t2), r.r = (e2) => {
          "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e2, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e2, "__esModule", { value: true });
        };
        var n = {};
        return (() => {
          "use strict";
          r.r(n);
          var e2 = r(2141), t2 = {};
          for (const r2 in e2) "default" !== r2 && (t2[r2] = () => e2[r2]);
          r.d(n, t2);
        })(), n;
      })()));
    }
  });

  // node_modules/jszip/dist/jszip.min.js
  var require_jszip_min = __commonJS({
    "node_modules/jszip/dist/jszip.min.js"(exports, module) {
      !(function(e) {
        if ("object" == typeof exports && "undefined" != typeof module) module.exports = e();
        else if ("function" == typeof define && define.amd) define([], e);
        else {
          ("undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this).JSZip = e();
        }
      })(function() {
        return (function s(a, o, h) {
          function u(r, e2) {
            if (!o[r]) {
              if (!a[r]) {
                var t = "function" == typeof __require && __require;
                if (!e2 && t) return t(r, true);
                if (l) return l(r, true);
                var n = new Error("Cannot find module '" + r + "'");
                throw n.code = "MODULE_NOT_FOUND", n;
              }
              var i = o[r] = { exports: {} };
              a[r][0].call(i.exports, function(e3) {
                var t2 = a[r][1][e3];
                return u(t2 || e3);
              }, i, i.exports, s, a, o, h);
            }
            return o[r].exports;
          }
          for (var l = "function" == typeof __require && __require, e = 0; e < h.length; e++) u(h[e]);
          return u;
        })({ 1: [function(e, t, r) {
          "use strict";
          var d = e("./utils"), c = e("./support"), p = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
          r.encode = function(e2) {
            for (var t2, r2, n, i, s, a, o, h = [], u = 0, l = e2.length, f = l, c2 = "string" !== d.getTypeOf(e2); u < e2.length; ) f = l - u, n = c2 ? (t2 = e2[u++], r2 = u < l ? e2[u++] : 0, u < l ? e2[u++] : 0) : (t2 = e2.charCodeAt(u++), r2 = u < l ? e2.charCodeAt(u++) : 0, u < l ? e2.charCodeAt(u++) : 0), i = t2 >> 2, s = (3 & t2) << 4 | r2 >> 4, a = 1 < f ? (15 & r2) << 2 | n >> 6 : 64, o = 2 < f ? 63 & n : 64, h.push(p.charAt(i) + p.charAt(s) + p.charAt(a) + p.charAt(o));
            return h.join("");
          }, r.decode = function(e2) {
            var t2, r2, n, i, s, a, o = 0, h = 0, u = "data:";
            if (e2.substr(0, u.length) === u) throw new Error("Invalid base64 input, it looks like a data url.");
            var l, f = 3 * (e2 = e2.replace(/[^A-Za-z0-9+/=]/g, "")).length / 4;
            if (e2.charAt(e2.length - 1) === p.charAt(64) && f--, e2.charAt(e2.length - 2) === p.charAt(64) && f--, f % 1 != 0) throw new Error("Invalid base64 input, bad content length.");
            for (l = c.uint8array ? new Uint8Array(0 | f) : new Array(0 | f); o < e2.length; ) t2 = p.indexOf(e2.charAt(o++)) << 2 | (i = p.indexOf(e2.charAt(o++))) >> 4, r2 = (15 & i) << 4 | (s = p.indexOf(e2.charAt(o++))) >> 2, n = (3 & s) << 6 | (a = p.indexOf(e2.charAt(o++))), l[h++] = t2, 64 !== s && (l[h++] = r2), 64 !== a && (l[h++] = n);
            return l;
          };
        }, { "./support": 30, "./utils": 32 }], 2: [function(e, t, r) {
          "use strict";
          var n = e("./external"), i = e("./stream/DataWorker"), s = e("./stream/Crc32Probe"), a = e("./stream/DataLengthProbe");
          function o(e2, t2, r2, n2, i2) {
            this.compressedSize = e2, this.uncompressedSize = t2, this.crc32 = r2, this.compression = n2, this.compressedContent = i2;
          }
          o.prototype = { getContentWorker: function() {
            var e2 = new i(n.Promise.resolve(this.compressedContent)).pipe(this.compression.uncompressWorker()).pipe(new a("data_length")), t2 = this;
            return e2.on("end", function() {
              if (this.streamInfo.data_length !== t2.uncompressedSize) throw new Error("Bug : uncompressed data size mismatch");
            }), e2;
          }, getCompressedWorker: function() {
            return new i(n.Promise.resolve(this.compressedContent)).withStreamInfo("compressedSize", this.compressedSize).withStreamInfo("uncompressedSize", this.uncompressedSize).withStreamInfo("crc32", this.crc32).withStreamInfo("compression", this.compression);
          } }, o.createWorkerFrom = function(e2, t2, r2) {
            return e2.pipe(new s()).pipe(new a("uncompressedSize")).pipe(t2.compressWorker(r2)).pipe(new a("compressedSize")).withStreamInfo("compression", t2);
          }, t.exports = o;
        }, { "./external": 6, "./stream/Crc32Probe": 25, "./stream/DataLengthProbe": 26, "./stream/DataWorker": 27 }], 3: [function(e, t, r) {
          "use strict";
          var n = e("./stream/GenericWorker");
          r.STORE = { magic: "\0\0", compressWorker: function() {
            return new n("STORE compression");
          }, uncompressWorker: function() {
            return new n("STORE decompression");
          } }, r.DEFLATE = e("./flate");
        }, { "./flate": 7, "./stream/GenericWorker": 28 }], 4: [function(e, t, r) {
          "use strict";
          var n = e("./utils");
          var o = (function() {
            for (var e2, t2 = [], r2 = 0; r2 < 256; r2++) {
              e2 = r2;
              for (var n2 = 0; n2 < 8; n2++) e2 = 1 & e2 ? 3988292384 ^ e2 >>> 1 : e2 >>> 1;
              t2[r2] = e2;
            }
            return t2;
          })();
          t.exports = function(e2, t2) {
            return void 0 !== e2 && e2.length ? "string" !== n.getTypeOf(e2) ? (function(e3, t3, r2, n2) {
              var i = o, s = n2 + r2;
              e3 ^= -1;
              for (var a = n2; a < s; a++) e3 = e3 >>> 8 ^ i[255 & (e3 ^ t3[a])];
              return -1 ^ e3;
            })(0 | t2, e2, e2.length, 0) : (function(e3, t3, r2, n2) {
              var i = o, s = n2 + r2;
              e3 ^= -1;
              for (var a = n2; a < s; a++) e3 = e3 >>> 8 ^ i[255 & (e3 ^ t3.charCodeAt(a))];
              return -1 ^ e3;
            })(0 | t2, e2, e2.length, 0) : 0;
          };
        }, { "./utils": 32 }], 5: [function(e, t, r) {
          "use strict";
          r.base64 = false, r.binary = false, r.dir = false, r.createFolders = true, r.date = null, r.compression = null, r.compressionOptions = null, r.comment = null, r.unixPermissions = null, r.dosPermissions = null;
        }, {}], 6: [function(e, t, r) {
          "use strict";
          var n = null;
          n = "undefined" != typeof Promise ? Promise : e("lie"), t.exports = { Promise: n };
        }, { lie: 37 }], 7: [function(e, t, r) {
          "use strict";
          var n = "undefined" != typeof Uint8Array && "undefined" != typeof Uint16Array && "undefined" != typeof Uint32Array, i = e("pako"), s = e("./utils"), a = e("./stream/GenericWorker"), o = n ? "uint8array" : "array";
          function h(e2, t2) {
            a.call(this, "FlateWorker/" + e2), this._pako = null, this._pakoAction = e2, this._pakoOptions = t2, this.meta = {};
          }
          r.magic = "\b\0", s.inherits(h, a), h.prototype.processChunk = function(e2) {
            this.meta = e2.meta, null === this._pako && this._createPako(), this._pako.push(s.transformTo(o, e2.data), false);
          }, h.prototype.flush = function() {
            a.prototype.flush.call(this), null === this._pako && this._createPako(), this._pako.push([], true);
          }, h.prototype.cleanUp = function() {
            a.prototype.cleanUp.call(this), this._pako = null;
          }, h.prototype._createPako = function() {
            this._pako = new i[this._pakoAction]({ raw: true, level: this._pakoOptions.level || -1 });
            var t2 = this;
            this._pako.onData = function(e2) {
              t2.push({ data: e2, meta: t2.meta });
            };
          }, r.compressWorker = function(e2) {
            return new h("Deflate", e2);
          }, r.uncompressWorker = function() {
            return new h("Inflate", {});
          };
        }, { "./stream/GenericWorker": 28, "./utils": 32, pako: 38 }], 8: [function(e, t, r) {
          "use strict";
          function A(e2, t2) {
            var r2, n2 = "";
            for (r2 = 0; r2 < t2; r2++) n2 += String.fromCharCode(255 & e2), e2 >>>= 8;
            return n2;
          }
          function n(e2, t2, r2, n2, i2, s2) {
            var a, o, h = e2.file, u = e2.compression, l = s2 !== O.utf8encode, f = I.transformTo("string", s2(h.name)), c = I.transformTo("string", O.utf8encode(h.name)), d = h.comment, p = I.transformTo("string", s2(d)), m = I.transformTo("string", O.utf8encode(d)), _ = c.length !== h.name.length, g = m.length !== d.length, b = "", v = "", y = "", w = h.dir, k = h.date, x = { crc32: 0, compressedSize: 0, uncompressedSize: 0 };
            t2 && !r2 || (x.crc32 = e2.crc32, x.compressedSize = e2.compressedSize, x.uncompressedSize = e2.uncompressedSize);
            var S = 0;
            t2 && (S |= 8), l || !_ && !g || (S |= 2048);
            var z = 0, C = 0;
            w && (z |= 16), "UNIX" === i2 ? (C = 798, z |= (function(e3, t3) {
              var r3 = e3;
              return e3 || (r3 = t3 ? 16893 : 33204), (65535 & r3) << 16;
            })(h.unixPermissions, w)) : (C = 20, z |= (function(e3) {
              return 63 & (e3 || 0);
            })(h.dosPermissions)), a = k.getUTCHours(), a <<= 6, a |= k.getUTCMinutes(), a <<= 5, a |= k.getUTCSeconds() / 2, o = k.getUTCFullYear() - 1980, o <<= 4, o |= k.getUTCMonth() + 1, o <<= 5, o |= k.getUTCDate(), _ && (v = A(1, 1) + A(B(f), 4) + c, b += "up" + A(v.length, 2) + v), g && (y = A(1, 1) + A(B(p), 4) + m, b += "uc" + A(y.length, 2) + y);
            var E = "";
            return E += "\n\0", E += A(S, 2), E += u.magic, E += A(a, 2), E += A(o, 2), E += A(x.crc32, 4), E += A(x.compressedSize, 4), E += A(x.uncompressedSize, 4), E += A(f.length, 2), E += A(b.length, 2), { fileRecord: R.LOCAL_FILE_HEADER + E + f + b, dirRecord: R.CENTRAL_FILE_HEADER + A(C, 2) + E + A(p.length, 2) + "\0\0\0\0" + A(z, 4) + A(n2, 4) + f + b + p };
          }
          var I = e("../utils"), i = e("../stream/GenericWorker"), O = e("../utf8"), B = e("../crc32"), R = e("../signature");
          function s(e2, t2, r2, n2) {
            i.call(this, "ZipFileWorker"), this.bytesWritten = 0, this.zipComment = t2, this.zipPlatform = r2, this.encodeFileName = n2, this.streamFiles = e2, this.accumulate = false, this.contentBuffer = [], this.dirRecords = [], this.currentSourceOffset = 0, this.entriesCount = 0, this.currentFile = null, this._sources = [];
          }
          I.inherits(s, i), s.prototype.push = function(e2) {
            var t2 = e2.meta.percent || 0, r2 = this.entriesCount, n2 = this._sources.length;
            this.accumulate ? this.contentBuffer.push(e2) : (this.bytesWritten += e2.data.length, i.prototype.push.call(this, { data: e2.data, meta: { currentFile: this.currentFile, percent: r2 ? (t2 + 100 * (r2 - n2 - 1)) / r2 : 100 } }));
          }, s.prototype.openedSource = function(e2) {
            this.currentSourceOffset = this.bytesWritten, this.currentFile = e2.file.name;
            var t2 = this.streamFiles && !e2.file.dir;
            if (t2) {
              var r2 = n(e2, t2, false, this.currentSourceOffset, this.zipPlatform, this.encodeFileName);
              this.push({ data: r2.fileRecord, meta: { percent: 0 } });
            } else this.accumulate = true;
          }, s.prototype.closedSource = function(e2) {
            this.accumulate = false;
            var t2 = this.streamFiles && !e2.file.dir, r2 = n(e2, t2, true, this.currentSourceOffset, this.zipPlatform, this.encodeFileName);
            if (this.dirRecords.push(r2.dirRecord), t2) this.push({ data: (function(e3) {
              return R.DATA_DESCRIPTOR + A(e3.crc32, 4) + A(e3.compressedSize, 4) + A(e3.uncompressedSize, 4);
            })(e2), meta: { percent: 100 } });
            else for (this.push({ data: r2.fileRecord, meta: { percent: 0 } }); this.contentBuffer.length; ) this.push(this.contentBuffer.shift());
            this.currentFile = null;
          }, s.prototype.flush = function() {
            for (var e2 = this.bytesWritten, t2 = 0; t2 < this.dirRecords.length; t2++) this.push({ data: this.dirRecords[t2], meta: { percent: 100 } });
            var r2 = this.bytesWritten - e2, n2 = (function(e3, t3, r3, n3, i2) {
              var s2 = I.transformTo("string", i2(n3));
              return R.CENTRAL_DIRECTORY_END + "\0\0\0\0" + A(e3, 2) + A(e3, 2) + A(t3, 4) + A(r3, 4) + A(s2.length, 2) + s2;
            })(this.dirRecords.length, r2, e2, this.zipComment, this.encodeFileName);
            this.push({ data: n2, meta: { percent: 100 } });
          }, s.prototype.prepareNextSource = function() {
            this.previous = this._sources.shift(), this.openedSource(this.previous.streamInfo), this.isPaused ? this.previous.pause() : this.previous.resume();
          }, s.prototype.registerPrevious = function(e2) {
            this._sources.push(e2);
            var t2 = this;
            return e2.on("data", function(e3) {
              t2.processChunk(e3);
            }), e2.on("end", function() {
              t2.closedSource(t2.previous.streamInfo), t2._sources.length ? t2.prepareNextSource() : t2.end();
            }), e2.on("error", function(e3) {
              t2.error(e3);
            }), this;
          }, s.prototype.resume = function() {
            return !!i.prototype.resume.call(this) && (!this.previous && this._sources.length ? (this.prepareNextSource(), true) : this.previous || this._sources.length || this.generatedError ? void 0 : (this.end(), true));
          }, s.prototype.error = function(e2) {
            var t2 = this._sources;
            if (!i.prototype.error.call(this, e2)) return false;
            for (var r2 = 0; r2 < t2.length; r2++) try {
              t2[r2].error(e2);
            } catch (e3) {
            }
            return true;
          }, s.prototype.lock = function() {
            i.prototype.lock.call(this);
            for (var e2 = this._sources, t2 = 0; t2 < e2.length; t2++) e2[t2].lock();
          }, t.exports = s;
        }, { "../crc32": 4, "../signature": 23, "../stream/GenericWorker": 28, "../utf8": 31, "../utils": 32 }], 9: [function(e, t, r) {
          "use strict";
          var u = e("../compressions"), n = e("./ZipFileWorker");
          r.generateWorker = function(e2, a, t2) {
            var o = new n(a.streamFiles, t2, a.platform, a.encodeFileName), h = 0;
            try {
              e2.forEach(function(e3, t3) {
                h++;
                var r2 = (function(e4, t4) {
                  var r3 = e4 || t4, n3 = u[r3];
                  if (!n3) throw new Error(r3 + " is not a valid compression method !");
                  return n3;
                })(t3.options.compression, a.compression), n2 = t3.options.compressionOptions || a.compressionOptions || {}, i = t3.dir, s = t3.date;
                t3._compressWorker(r2, n2).withStreamInfo("file", { name: e3, dir: i, date: s, comment: t3.comment || "", unixPermissions: t3.unixPermissions, dosPermissions: t3.dosPermissions }).pipe(o);
              }), o.entriesCount = h;
            } catch (e3) {
              o.error(e3);
            }
            return o;
          };
        }, { "../compressions": 3, "./ZipFileWorker": 8 }], 10: [function(e, t, r) {
          "use strict";
          function n() {
            if (!(this instanceof n)) return new n();
            if (arguments.length) throw new Error("The constructor with parameters has been removed in JSZip 3.0, please check the upgrade guide.");
            this.files = /* @__PURE__ */ Object.create(null), this.comment = null, this.root = "", this.clone = function() {
              var e2 = new n();
              for (var t2 in this) "function" != typeof this[t2] && (e2[t2] = this[t2]);
              return e2;
            };
          }
          (n.prototype = e("./object")).loadAsync = e("./load"), n.support = e("./support"), n.defaults = e("./defaults"), n.version = "3.10.1", n.loadAsync = function(e2, t2) {
            return new n().loadAsync(e2, t2);
          }, n.external = e("./external"), t.exports = n;
        }, { "./defaults": 5, "./external": 6, "./load": 11, "./object": 15, "./support": 30 }], 11: [function(e, t, r) {
          "use strict";
          var u = e("./utils"), i = e("./external"), n = e("./utf8"), s = e("./zipEntries"), a = e("./stream/Crc32Probe"), l = e("./nodejsUtils");
          function f(n2) {
            return new i.Promise(function(e2, t2) {
              var r2 = n2.decompressed.getContentWorker().pipe(new a());
              r2.on("error", function(e3) {
                t2(e3);
              }).on("end", function() {
                r2.streamInfo.crc32 !== n2.decompressed.crc32 ? t2(new Error("Corrupted zip : CRC32 mismatch")) : e2();
              }).resume();
            });
          }
          t.exports = function(e2, o) {
            var h = this;
            return o = u.extend(o || {}, { base64: false, checkCRC32: false, optimizedBinaryString: false, createFolders: false, decodeFileName: n.utf8decode }), l.isNode && l.isStream(e2) ? i.Promise.reject(new Error("JSZip can't accept a stream when loading a zip file.")) : u.prepareContent("the loaded zip file", e2, true, o.optimizedBinaryString, o.base64).then(function(e3) {
              var t2 = new s(o);
              return t2.load(e3), t2;
            }).then(function(e3) {
              var t2 = [i.Promise.resolve(e3)], r2 = e3.files;
              if (o.checkCRC32) for (var n2 = 0; n2 < r2.length; n2++) t2.push(f(r2[n2]));
              return i.Promise.all(t2);
            }).then(function(e3) {
              for (var t2 = e3.shift(), r2 = t2.files, n2 = 0; n2 < r2.length; n2++) {
                var i2 = r2[n2], s2 = i2.fileNameStr, a2 = u.resolve(i2.fileNameStr);
                h.file(a2, i2.decompressed, { binary: true, optimizedBinaryString: true, date: i2.date, dir: i2.dir, comment: i2.fileCommentStr.length ? i2.fileCommentStr : null, unixPermissions: i2.unixPermissions, dosPermissions: i2.dosPermissions, createFolders: o.createFolders }), i2.dir || (h.file(a2).unsafeOriginalName = s2);
              }
              return t2.zipComment.length && (h.comment = t2.zipComment), h;
            });
          };
        }, { "./external": 6, "./nodejsUtils": 14, "./stream/Crc32Probe": 25, "./utf8": 31, "./utils": 32, "./zipEntries": 33 }], 12: [function(e, t, r) {
          "use strict";
          var n = e("../utils"), i = e("../stream/GenericWorker");
          function s(e2, t2) {
            i.call(this, "Nodejs stream input adapter for " + e2), this._upstreamEnded = false, this._bindStream(t2);
          }
          n.inherits(s, i), s.prototype._bindStream = function(e2) {
            var t2 = this;
            (this._stream = e2).pause(), e2.on("data", function(e3) {
              t2.push({ data: e3, meta: { percent: 0 } });
            }).on("error", function(e3) {
              t2.isPaused ? this.generatedError = e3 : t2.error(e3);
            }).on("end", function() {
              t2.isPaused ? t2._upstreamEnded = true : t2.end();
            });
          }, s.prototype.pause = function() {
            return !!i.prototype.pause.call(this) && (this._stream.pause(), true);
          }, s.prototype.resume = function() {
            return !!i.prototype.resume.call(this) && (this._upstreamEnded ? this.end() : this._stream.resume(), true);
          }, t.exports = s;
        }, { "../stream/GenericWorker": 28, "../utils": 32 }], 13: [function(e, t, r) {
          "use strict";
          var i = e("readable-stream").Readable;
          function n(e2, t2, r2) {
            i.call(this, t2), this._helper = e2;
            var n2 = this;
            e2.on("data", function(e3, t3) {
              n2.push(e3) || n2._helper.pause(), r2 && r2(t3);
            }).on("error", function(e3) {
              n2.emit("error", e3);
            }).on("end", function() {
              n2.push(null);
            });
          }
          e("../utils").inherits(n, i), n.prototype._read = function() {
            this._helper.resume();
          }, t.exports = n;
        }, { "../utils": 32, "readable-stream": 16 }], 14: [function(e, t, r) {
          "use strict";
          t.exports = { isNode: "undefined" != typeof Buffer, newBufferFrom: function(e2, t2) {
            if (Buffer.from && Buffer.from !== Uint8Array.from) return Buffer.from(e2, t2);
            if ("number" == typeof e2) throw new Error('The "data" argument must not be a number');
            return new Buffer(e2, t2);
          }, allocBuffer: function(e2) {
            if (Buffer.alloc) return Buffer.alloc(e2);
            var t2 = new Buffer(e2);
            return t2.fill(0), t2;
          }, isBuffer: function(e2) {
            return Buffer.isBuffer(e2);
          }, isStream: function(e2) {
            return e2 && "function" == typeof e2.on && "function" == typeof e2.pause && "function" == typeof e2.resume;
          } };
        }, {}], 15: [function(e, t, r) {
          "use strict";
          function s(e2, t2, r2) {
            var n2, i2 = u.getTypeOf(t2), s2 = u.extend(r2 || {}, f);
            s2.date = s2.date || /* @__PURE__ */ new Date(), null !== s2.compression && (s2.compression = s2.compression.toUpperCase()), "string" == typeof s2.unixPermissions && (s2.unixPermissions = parseInt(s2.unixPermissions, 8)), s2.unixPermissions && 16384 & s2.unixPermissions && (s2.dir = true), s2.dosPermissions && 16 & s2.dosPermissions && (s2.dir = true), s2.dir && (e2 = g(e2)), s2.createFolders && (n2 = _(e2)) && b.call(this, n2, true);
            var a2 = "string" === i2 && false === s2.binary && false === s2.base64;
            r2 && void 0 !== r2.binary || (s2.binary = !a2), (t2 instanceof c && 0 === t2.uncompressedSize || s2.dir || !t2 || 0 === t2.length) && (s2.base64 = false, s2.binary = true, t2 = "", s2.compression = "STORE", i2 = "string");
            var o2 = null;
            o2 = t2 instanceof c || t2 instanceof l ? t2 : p.isNode && p.isStream(t2) ? new m(e2, t2) : u.prepareContent(e2, t2, s2.binary, s2.optimizedBinaryString, s2.base64);
            var h2 = new d(e2, o2, s2);
            this.files[e2] = h2;
          }
          var i = e("./utf8"), u = e("./utils"), l = e("./stream/GenericWorker"), a = e("./stream/StreamHelper"), f = e("./defaults"), c = e("./compressedObject"), d = e("./zipObject"), o = e("./generate"), p = e("./nodejsUtils"), m = e("./nodejs/NodejsStreamInputAdapter"), _ = function(e2) {
            "/" === e2.slice(-1) && (e2 = e2.substring(0, e2.length - 1));
            var t2 = e2.lastIndexOf("/");
            return 0 < t2 ? e2.substring(0, t2) : "";
          }, g = function(e2) {
            return "/" !== e2.slice(-1) && (e2 += "/"), e2;
          }, b = function(e2, t2) {
            return t2 = void 0 !== t2 ? t2 : f.createFolders, e2 = g(e2), this.files[e2] || s.call(this, e2, null, { dir: true, createFolders: t2 }), this.files[e2];
          };
          function h(e2) {
            return "[object RegExp]" === Object.prototype.toString.call(e2);
          }
          var n = { load: function() {
            throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
          }, forEach: function(e2) {
            var t2, r2, n2;
            for (t2 in this.files) n2 = this.files[t2], (r2 = t2.slice(this.root.length, t2.length)) && t2.slice(0, this.root.length) === this.root && e2(r2, n2);
          }, filter: function(r2) {
            var n2 = [];
            return this.forEach(function(e2, t2) {
              r2(e2, t2) && n2.push(t2);
            }), n2;
          }, file: function(e2, t2, r2) {
            if (1 !== arguments.length) return e2 = this.root + e2, s.call(this, e2, t2, r2), this;
            if (h(e2)) {
              var n2 = e2;
              return this.filter(function(e3, t3) {
                return !t3.dir && n2.test(e3);
              });
            }
            var i2 = this.files[this.root + e2];
            return i2 && !i2.dir ? i2 : null;
          }, folder: function(r2) {
            if (!r2) return this;
            if (h(r2)) return this.filter(function(e3, t3) {
              return t3.dir && r2.test(e3);
            });
            var e2 = this.root + r2, t2 = b.call(this, e2), n2 = this.clone();
            return n2.root = t2.name, n2;
          }, remove: function(r2) {
            r2 = this.root + r2;
            var e2 = this.files[r2];
            if (e2 || ("/" !== r2.slice(-1) && (r2 += "/"), e2 = this.files[r2]), e2 && !e2.dir) delete this.files[r2];
            else for (var t2 = this.filter(function(e3, t3) {
              return t3.name.slice(0, r2.length) === r2;
            }), n2 = 0; n2 < t2.length; n2++) delete this.files[t2[n2].name];
            return this;
          }, generate: function() {
            throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
          }, generateInternalStream: function(e2) {
            var t2, r2 = {};
            try {
              if ((r2 = u.extend(e2 || {}, { streamFiles: false, compression: "STORE", compressionOptions: null, type: "", platform: "DOS", comment: null, mimeType: "application/zip", encodeFileName: i.utf8encode })).type = r2.type.toLowerCase(), r2.compression = r2.compression.toUpperCase(), "binarystring" === r2.type && (r2.type = "string"), !r2.type) throw new Error("No output type specified.");
              u.checkSupport(r2.type), "darwin" !== r2.platform && "freebsd" !== r2.platform && "linux" !== r2.platform && "sunos" !== r2.platform || (r2.platform = "UNIX"), "win32" === r2.platform && (r2.platform = "DOS");
              var n2 = r2.comment || this.comment || "";
              t2 = o.generateWorker(this, r2, n2);
            } catch (e3) {
              (t2 = new l("error")).error(e3);
            }
            return new a(t2, r2.type || "string", r2.mimeType);
          }, generateAsync: function(e2, t2) {
            return this.generateInternalStream(e2).accumulate(t2);
          }, generateNodeStream: function(e2, t2) {
            return (e2 = e2 || {}).type || (e2.type = "nodebuffer"), this.generateInternalStream(e2).toNodejsStream(t2);
          } };
          t.exports = n;
        }, { "./compressedObject": 2, "./defaults": 5, "./generate": 9, "./nodejs/NodejsStreamInputAdapter": 12, "./nodejsUtils": 14, "./stream/GenericWorker": 28, "./stream/StreamHelper": 29, "./utf8": 31, "./utils": 32, "./zipObject": 35 }], 16: [function(e, t, r) {
          "use strict";
          t.exports = e("stream");
        }, { stream: void 0 }], 17: [function(e, t, r) {
          "use strict";
          var n = e("./DataReader");
          function i(e2) {
            n.call(this, e2);
            for (var t2 = 0; t2 < this.data.length; t2++) e2[t2] = 255 & e2[t2];
          }
          e("../utils").inherits(i, n), i.prototype.byteAt = function(e2) {
            return this.data[this.zero + e2];
          }, i.prototype.lastIndexOfSignature = function(e2) {
            for (var t2 = e2.charCodeAt(0), r2 = e2.charCodeAt(1), n2 = e2.charCodeAt(2), i2 = e2.charCodeAt(3), s = this.length - 4; 0 <= s; --s) if (this.data[s] === t2 && this.data[s + 1] === r2 && this.data[s + 2] === n2 && this.data[s + 3] === i2) return s - this.zero;
            return -1;
          }, i.prototype.readAndCheckSignature = function(e2) {
            var t2 = e2.charCodeAt(0), r2 = e2.charCodeAt(1), n2 = e2.charCodeAt(2), i2 = e2.charCodeAt(3), s = this.readData(4);
            return t2 === s[0] && r2 === s[1] && n2 === s[2] && i2 === s[3];
          }, i.prototype.readData = function(e2) {
            if (this.checkOffset(e2), 0 === e2) return [];
            var t2 = this.data.slice(this.zero + this.index, this.zero + this.index + e2);
            return this.index += e2, t2;
          }, t.exports = i;
        }, { "../utils": 32, "./DataReader": 18 }], 18: [function(e, t, r) {
          "use strict";
          var n = e("../utils");
          function i(e2) {
            this.data = e2, this.length = e2.length, this.index = 0, this.zero = 0;
          }
          i.prototype = { checkOffset: function(e2) {
            this.checkIndex(this.index + e2);
          }, checkIndex: function(e2) {
            if (this.length < this.zero + e2 || e2 < 0) throw new Error("End of data reached (data length = " + this.length + ", asked index = " + e2 + "). Corrupted zip ?");
          }, setIndex: function(e2) {
            this.checkIndex(e2), this.index = e2;
          }, skip: function(e2) {
            this.setIndex(this.index + e2);
          }, byteAt: function() {
          }, readInt: function(e2) {
            var t2, r2 = 0;
            for (this.checkOffset(e2), t2 = this.index + e2 - 1; t2 >= this.index; t2--) r2 = (r2 << 8) + this.byteAt(t2);
            return this.index += e2, r2;
          }, readString: function(e2) {
            return n.transformTo("string", this.readData(e2));
          }, readData: function() {
          }, lastIndexOfSignature: function() {
          }, readAndCheckSignature: function() {
          }, readDate: function() {
            var e2 = this.readInt(4);
            return new Date(Date.UTC(1980 + (e2 >> 25 & 127), (e2 >> 21 & 15) - 1, e2 >> 16 & 31, e2 >> 11 & 31, e2 >> 5 & 63, (31 & e2) << 1));
          } }, t.exports = i;
        }, { "../utils": 32 }], 19: [function(e, t, r) {
          "use strict";
          var n = e("./Uint8ArrayReader");
          function i(e2) {
            n.call(this, e2);
          }
          e("../utils").inherits(i, n), i.prototype.readData = function(e2) {
            this.checkOffset(e2);
            var t2 = this.data.slice(this.zero + this.index, this.zero + this.index + e2);
            return this.index += e2, t2;
          }, t.exports = i;
        }, { "../utils": 32, "./Uint8ArrayReader": 21 }], 20: [function(e, t, r) {
          "use strict";
          var n = e("./DataReader");
          function i(e2) {
            n.call(this, e2);
          }
          e("../utils").inherits(i, n), i.prototype.byteAt = function(e2) {
            return this.data.charCodeAt(this.zero + e2);
          }, i.prototype.lastIndexOfSignature = function(e2) {
            return this.data.lastIndexOf(e2) - this.zero;
          }, i.prototype.readAndCheckSignature = function(e2) {
            return e2 === this.readData(4);
          }, i.prototype.readData = function(e2) {
            this.checkOffset(e2);
            var t2 = this.data.slice(this.zero + this.index, this.zero + this.index + e2);
            return this.index += e2, t2;
          }, t.exports = i;
        }, { "../utils": 32, "./DataReader": 18 }], 21: [function(e, t, r) {
          "use strict";
          var n = e("./ArrayReader");
          function i(e2) {
            n.call(this, e2);
          }
          e("../utils").inherits(i, n), i.prototype.readData = function(e2) {
            if (this.checkOffset(e2), 0 === e2) return new Uint8Array(0);
            var t2 = this.data.subarray(this.zero + this.index, this.zero + this.index + e2);
            return this.index += e2, t2;
          }, t.exports = i;
        }, { "../utils": 32, "./ArrayReader": 17 }], 22: [function(e, t, r) {
          "use strict";
          var n = e("../utils"), i = e("../support"), s = e("./ArrayReader"), a = e("./StringReader"), o = e("./NodeBufferReader"), h = e("./Uint8ArrayReader");
          t.exports = function(e2) {
            var t2 = n.getTypeOf(e2);
            return n.checkSupport(t2), "string" !== t2 || i.uint8array ? "nodebuffer" === t2 ? new o(e2) : i.uint8array ? new h(n.transformTo("uint8array", e2)) : new s(n.transformTo("array", e2)) : new a(e2);
          };
        }, { "../support": 30, "../utils": 32, "./ArrayReader": 17, "./NodeBufferReader": 19, "./StringReader": 20, "./Uint8ArrayReader": 21 }], 23: [function(e, t, r) {
          "use strict";
          r.LOCAL_FILE_HEADER = "PK", r.CENTRAL_FILE_HEADER = "PK", r.CENTRAL_DIRECTORY_END = "PK", r.ZIP64_CENTRAL_DIRECTORY_LOCATOR = "PK\x07", r.ZIP64_CENTRAL_DIRECTORY_END = "PK", r.DATA_DESCRIPTOR = "PK\x07\b";
        }, {}], 24: [function(e, t, r) {
          "use strict";
          var n = e("./GenericWorker"), i = e("../utils");
          function s(e2) {
            n.call(this, "ConvertWorker to " + e2), this.destType = e2;
          }
          i.inherits(s, n), s.prototype.processChunk = function(e2) {
            this.push({ data: i.transformTo(this.destType, e2.data), meta: e2.meta });
          }, t.exports = s;
        }, { "../utils": 32, "./GenericWorker": 28 }], 25: [function(e, t, r) {
          "use strict";
          var n = e("./GenericWorker"), i = e("../crc32");
          function s() {
            n.call(this, "Crc32Probe"), this.withStreamInfo("crc32", 0);
          }
          e("../utils").inherits(s, n), s.prototype.processChunk = function(e2) {
            this.streamInfo.crc32 = i(e2.data, this.streamInfo.crc32 || 0), this.push(e2);
          }, t.exports = s;
        }, { "../crc32": 4, "../utils": 32, "./GenericWorker": 28 }], 26: [function(e, t, r) {
          "use strict";
          var n = e("../utils"), i = e("./GenericWorker");
          function s(e2) {
            i.call(this, "DataLengthProbe for " + e2), this.propName = e2, this.withStreamInfo(e2, 0);
          }
          n.inherits(s, i), s.prototype.processChunk = function(e2) {
            if (e2) {
              var t2 = this.streamInfo[this.propName] || 0;
              this.streamInfo[this.propName] = t2 + e2.data.length;
            }
            i.prototype.processChunk.call(this, e2);
          }, t.exports = s;
        }, { "../utils": 32, "./GenericWorker": 28 }], 27: [function(e, t, r) {
          "use strict";
          var n = e("../utils"), i = e("./GenericWorker");
          function s(e2) {
            i.call(this, "DataWorker");
            var t2 = this;
            this.dataIsReady = false, this.index = 0, this.max = 0, this.data = null, this.type = "", this._tickScheduled = false, e2.then(function(e3) {
              t2.dataIsReady = true, t2.data = e3, t2.max = e3 && e3.length || 0, t2.type = n.getTypeOf(e3), t2.isPaused || t2._tickAndRepeat();
            }, function(e3) {
              t2.error(e3);
            });
          }
          n.inherits(s, i), s.prototype.cleanUp = function() {
            i.prototype.cleanUp.call(this), this.data = null;
          }, s.prototype.resume = function() {
            return !!i.prototype.resume.call(this) && (!this._tickScheduled && this.dataIsReady && (this._tickScheduled = true, n.delay(this._tickAndRepeat, [], this)), true);
          }, s.prototype._tickAndRepeat = function() {
            this._tickScheduled = false, this.isPaused || this.isFinished || (this._tick(), this.isFinished || (n.delay(this._tickAndRepeat, [], this), this._tickScheduled = true));
          }, s.prototype._tick = function() {
            if (this.isPaused || this.isFinished) return false;
            var e2 = null, t2 = Math.min(this.max, this.index + 16384);
            if (this.index >= this.max) return this.end();
            switch (this.type) {
              case "string":
                e2 = this.data.substring(this.index, t2);
                break;
              case "uint8array":
                e2 = this.data.subarray(this.index, t2);
                break;
              case "array":
              case "nodebuffer":
                e2 = this.data.slice(this.index, t2);
            }
            return this.index = t2, this.push({ data: e2, meta: { percent: this.max ? this.index / this.max * 100 : 0 } });
          }, t.exports = s;
        }, { "../utils": 32, "./GenericWorker": 28 }], 28: [function(e, t, r) {
          "use strict";
          function n(e2) {
            this.name = e2 || "default", this.streamInfo = {}, this.generatedError = null, this.extraStreamInfo = {}, this.isPaused = true, this.isFinished = false, this.isLocked = false, this._listeners = { data: [], end: [], error: [] }, this.previous = null;
          }
          n.prototype = { push: function(e2) {
            this.emit("data", e2);
          }, end: function() {
            if (this.isFinished) return false;
            this.flush();
            try {
              this.emit("end"), this.cleanUp(), this.isFinished = true;
            } catch (e2) {
              this.emit("error", e2);
            }
            return true;
          }, error: function(e2) {
            return !this.isFinished && (this.isPaused ? this.generatedError = e2 : (this.isFinished = true, this.emit("error", e2), this.previous && this.previous.error(e2), this.cleanUp()), true);
          }, on: function(e2, t2) {
            return this._listeners[e2].push(t2), this;
          }, cleanUp: function() {
            this.streamInfo = this.generatedError = this.extraStreamInfo = null, this._listeners = [];
          }, emit: function(e2, t2) {
            if (this._listeners[e2]) for (var r2 = 0; r2 < this._listeners[e2].length; r2++) this._listeners[e2][r2].call(this, t2);
          }, pipe: function(e2) {
            return e2.registerPrevious(this);
          }, registerPrevious: function(e2) {
            if (this.isLocked) throw new Error("The stream '" + this + "' has already been used.");
            this.streamInfo = e2.streamInfo, this.mergeStreamInfo(), this.previous = e2;
            var t2 = this;
            return e2.on("data", function(e3) {
              t2.processChunk(e3);
            }), e2.on("end", function() {
              t2.end();
            }), e2.on("error", function(e3) {
              t2.error(e3);
            }), this;
          }, pause: function() {
            return !this.isPaused && !this.isFinished && (this.isPaused = true, this.previous && this.previous.pause(), true);
          }, resume: function() {
            if (!this.isPaused || this.isFinished) return false;
            var e2 = this.isPaused = false;
            return this.generatedError && (this.error(this.generatedError), e2 = true), this.previous && this.previous.resume(), !e2;
          }, flush: function() {
          }, processChunk: function(e2) {
            this.push(e2);
          }, withStreamInfo: function(e2, t2) {
            return this.extraStreamInfo[e2] = t2, this.mergeStreamInfo(), this;
          }, mergeStreamInfo: function() {
            for (var e2 in this.extraStreamInfo) Object.prototype.hasOwnProperty.call(this.extraStreamInfo, e2) && (this.streamInfo[e2] = this.extraStreamInfo[e2]);
          }, lock: function() {
            if (this.isLocked) throw new Error("The stream '" + this + "' has already been used.");
            this.isLocked = true, this.previous && this.previous.lock();
          }, toString: function() {
            var e2 = "Worker " + this.name;
            return this.previous ? this.previous + " -> " + e2 : e2;
          } }, t.exports = n;
        }, {}], 29: [function(e, t, r) {
          "use strict";
          var h = e("../utils"), i = e("./ConvertWorker"), s = e("./GenericWorker"), u = e("../base64"), n = e("../support"), a = e("../external"), o = null;
          if (n.nodestream) try {
            o = e("../nodejs/NodejsStreamOutputAdapter");
          } catch (e2) {
          }
          function l(e2, o2) {
            return new a.Promise(function(t2, r2) {
              var n2 = [], i2 = e2._internalType, s2 = e2._outputType, a2 = e2._mimeType;
              e2.on("data", function(e3, t3) {
                n2.push(e3), o2 && o2(t3);
              }).on("error", function(e3) {
                n2 = [], r2(e3);
              }).on("end", function() {
                try {
                  var e3 = (function(e4, t3, r3) {
                    switch (e4) {
                      case "blob":
                        return h.newBlob(h.transformTo("arraybuffer", t3), r3);
                      case "base64":
                        return u.encode(t3);
                      default:
                        return h.transformTo(e4, t3);
                    }
                  })(s2, (function(e4, t3) {
                    var r3, n3 = 0, i3 = null, s3 = 0;
                    for (r3 = 0; r3 < t3.length; r3++) s3 += t3[r3].length;
                    switch (e4) {
                      case "string":
                        return t3.join("");
                      case "array":
                        return Array.prototype.concat.apply([], t3);
                      case "uint8array":
                        for (i3 = new Uint8Array(s3), r3 = 0; r3 < t3.length; r3++) i3.set(t3[r3], n3), n3 += t3[r3].length;
                        return i3;
                      case "nodebuffer":
                        return Buffer.concat(t3);
                      default:
                        throw new Error("concat : unsupported type '" + e4 + "'");
                    }
                  })(i2, n2), a2);
                  t2(e3);
                } catch (e4) {
                  r2(e4);
                }
                n2 = [];
              }).resume();
            });
          }
          function f(e2, t2, r2) {
            var n2 = t2;
            switch (t2) {
              case "blob":
              case "arraybuffer":
                n2 = "uint8array";
                break;
              case "base64":
                n2 = "string";
            }
            try {
              this._internalType = n2, this._outputType = t2, this._mimeType = r2, h.checkSupport(n2), this._worker = e2.pipe(new i(n2)), e2.lock();
            } catch (e3) {
              this._worker = new s("error"), this._worker.error(e3);
            }
          }
          f.prototype = { accumulate: function(e2) {
            return l(this, e2);
          }, on: function(e2, t2) {
            var r2 = this;
            return "data" === e2 ? this._worker.on(e2, function(e3) {
              t2.call(r2, e3.data, e3.meta);
            }) : this._worker.on(e2, function() {
              h.delay(t2, arguments, r2);
            }), this;
          }, resume: function() {
            return h.delay(this._worker.resume, [], this._worker), this;
          }, pause: function() {
            return this._worker.pause(), this;
          }, toNodejsStream: function(e2) {
            if (h.checkSupport("nodestream"), "nodebuffer" !== this._outputType) throw new Error(this._outputType + " is not supported by this method");
            return new o(this, { objectMode: "nodebuffer" !== this._outputType }, e2);
          } }, t.exports = f;
        }, { "../base64": 1, "../external": 6, "../nodejs/NodejsStreamOutputAdapter": 13, "../support": 30, "../utils": 32, "./ConvertWorker": 24, "./GenericWorker": 28 }], 30: [function(e, t, r) {
          "use strict";
          if (r.base64 = true, r.array = true, r.string = true, r.arraybuffer = "undefined" != typeof ArrayBuffer && "undefined" != typeof Uint8Array, r.nodebuffer = "undefined" != typeof Buffer, r.uint8array = "undefined" != typeof Uint8Array, "undefined" == typeof ArrayBuffer) r.blob = false;
          else {
            var n = new ArrayBuffer(0);
            try {
              r.blob = 0 === new Blob([n], { type: "application/zip" }).size;
            } catch (e2) {
              try {
                var i = new (self.BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || self.MSBlobBuilder)();
                i.append(n), r.blob = 0 === i.getBlob("application/zip").size;
              } catch (e3) {
                r.blob = false;
              }
            }
          }
          try {
            r.nodestream = !!e("readable-stream").Readable;
          } catch (e2) {
            r.nodestream = false;
          }
        }, { "readable-stream": 16 }], 31: [function(e, t, s) {
          "use strict";
          for (var o = e("./utils"), h = e("./support"), r = e("./nodejsUtils"), n = e("./stream/GenericWorker"), u = new Array(256), i = 0; i < 256; i++) u[i] = 252 <= i ? 6 : 248 <= i ? 5 : 240 <= i ? 4 : 224 <= i ? 3 : 192 <= i ? 2 : 1;
          u[254] = u[254] = 1;
          function a() {
            n.call(this, "utf-8 decode"), this.leftOver = null;
          }
          function l() {
            n.call(this, "utf-8 encode");
          }
          s.utf8encode = function(e2) {
            return h.nodebuffer ? r.newBufferFrom(e2, "utf-8") : (function(e3) {
              var t2, r2, n2, i2, s2, a2 = e3.length, o2 = 0;
              for (i2 = 0; i2 < a2; i2++) 55296 == (64512 & (r2 = e3.charCodeAt(i2))) && i2 + 1 < a2 && 56320 == (64512 & (n2 = e3.charCodeAt(i2 + 1))) && (r2 = 65536 + (r2 - 55296 << 10) + (n2 - 56320), i2++), o2 += r2 < 128 ? 1 : r2 < 2048 ? 2 : r2 < 65536 ? 3 : 4;
              for (t2 = h.uint8array ? new Uint8Array(o2) : new Array(o2), i2 = s2 = 0; s2 < o2; i2++) 55296 == (64512 & (r2 = e3.charCodeAt(i2))) && i2 + 1 < a2 && 56320 == (64512 & (n2 = e3.charCodeAt(i2 + 1))) && (r2 = 65536 + (r2 - 55296 << 10) + (n2 - 56320), i2++), r2 < 128 ? t2[s2++] = r2 : (r2 < 2048 ? t2[s2++] = 192 | r2 >>> 6 : (r2 < 65536 ? t2[s2++] = 224 | r2 >>> 12 : (t2[s2++] = 240 | r2 >>> 18, t2[s2++] = 128 | r2 >>> 12 & 63), t2[s2++] = 128 | r2 >>> 6 & 63), t2[s2++] = 128 | 63 & r2);
              return t2;
            })(e2);
          }, s.utf8decode = function(e2) {
            return h.nodebuffer ? o.transformTo("nodebuffer", e2).toString("utf-8") : (function(e3) {
              var t2, r2, n2, i2, s2 = e3.length, a2 = new Array(2 * s2);
              for (t2 = r2 = 0; t2 < s2; ) if ((n2 = e3[t2++]) < 128) a2[r2++] = n2;
              else if (4 < (i2 = u[n2])) a2[r2++] = 65533, t2 += i2 - 1;
              else {
                for (n2 &= 2 === i2 ? 31 : 3 === i2 ? 15 : 7; 1 < i2 && t2 < s2; ) n2 = n2 << 6 | 63 & e3[t2++], i2--;
                1 < i2 ? a2[r2++] = 65533 : n2 < 65536 ? a2[r2++] = n2 : (n2 -= 65536, a2[r2++] = 55296 | n2 >> 10 & 1023, a2[r2++] = 56320 | 1023 & n2);
              }
              return a2.length !== r2 && (a2.subarray ? a2 = a2.subarray(0, r2) : a2.length = r2), o.applyFromCharCode(a2);
            })(e2 = o.transformTo(h.uint8array ? "uint8array" : "array", e2));
          }, o.inherits(a, n), a.prototype.processChunk = function(e2) {
            var t2 = o.transformTo(h.uint8array ? "uint8array" : "array", e2.data);
            if (this.leftOver && this.leftOver.length) {
              if (h.uint8array) {
                var r2 = t2;
                (t2 = new Uint8Array(r2.length + this.leftOver.length)).set(this.leftOver, 0), t2.set(r2, this.leftOver.length);
              } else t2 = this.leftOver.concat(t2);
              this.leftOver = null;
            }
            var n2 = (function(e3, t3) {
              var r3;
              for ((t3 = t3 || e3.length) > e3.length && (t3 = e3.length), r3 = t3 - 1; 0 <= r3 && 128 == (192 & e3[r3]); ) r3--;
              return r3 < 0 ? t3 : 0 === r3 ? t3 : r3 + u[e3[r3]] > t3 ? r3 : t3;
            })(t2), i2 = t2;
            n2 !== t2.length && (h.uint8array ? (i2 = t2.subarray(0, n2), this.leftOver = t2.subarray(n2, t2.length)) : (i2 = t2.slice(0, n2), this.leftOver = t2.slice(n2, t2.length))), this.push({ data: s.utf8decode(i2), meta: e2.meta });
          }, a.prototype.flush = function() {
            this.leftOver && this.leftOver.length && (this.push({ data: s.utf8decode(this.leftOver), meta: {} }), this.leftOver = null);
          }, s.Utf8DecodeWorker = a, o.inherits(l, n), l.prototype.processChunk = function(e2) {
            this.push({ data: s.utf8encode(e2.data), meta: e2.meta });
          }, s.Utf8EncodeWorker = l;
        }, { "./nodejsUtils": 14, "./stream/GenericWorker": 28, "./support": 30, "./utils": 32 }], 32: [function(e, t, a) {
          "use strict";
          var o = e("./support"), h = e("./base64"), r = e("./nodejsUtils"), u = e("./external");
          function n(e2) {
            return e2;
          }
          function l(e2, t2) {
            for (var r2 = 0; r2 < e2.length; ++r2) t2[r2] = 255 & e2.charCodeAt(r2);
            return t2;
          }
          e("setimmediate"), a.newBlob = function(t2, r2) {
            a.checkSupport("blob");
            try {
              return new Blob([t2], { type: r2 });
            } catch (e2) {
              try {
                var n2 = new (self.BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || self.MSBlobBuilder)();
                return n2.append(t2), n2.getBlob(r2);
              } catch (e3) {
                throw new Error("Bug : can't construct the Blob.");
              }
            }
          };
          var i = { stringifyByChunk: function(e2, t2, r2) {
            var n2 = [], i2 = 0, s2 = e2.length;
            if (s2 <= r2) return String.fromCharCode.apply(null, e2);
            for (; i2 < s2; ) "array" === t2 || "nodebuffer" === t2 ? n2.push(String.fromCharCode.apply(null, e2.slice(i2, Math.min(i2 + r2, s2)))) : n2.push(String.fromCharCode.apply(null, e2.subarray(i2, Math.min(i2 + r2, s2)))), i2 += r2;
            return n2.join("");
          }, stringifyByChar: function(e2) {
            for (var t2 = "", r2 = 0; r2 < e2.length; r2++) t2 += String.fromCharCode(e2[r2]);
            return t2;
          }, applyCanBeUsed: { uint8array: (function() {
            try {
              return o.uint8array && 1 === String.fromCharCode.apply(null, new Uint8Array(1)).length;
            } catch (e2) {
              return false;
            }
          })(), nodebuffer: (function() {
            try {
              return o.nodebuffer && 1 === String.fromCharCode.apply(null, r.allocBuffer(1)).length;
            } catch (e2) {
              return false;
            }
          })() } };
          function s(e2) {
            var t2 = 65536, r2 = a.getTypeOf(e2), n2 = true;
            if ("uint8array" === r2 ? n2 = i.applyCanBeUsed.uint8array : "nodebuffer" === r2 && (n2 = i.applyCanBeUsed.nodebuffer), n2) for (; 1 < t2; ) try {
              return i.stringifyByChunk(e2, r2, t2);
            } catch (e3) {
              t2 = Math.floor(t2 / 2);
            }
            return i.stringifyByChar(e2);
          }
          function f(e2, t2) {
            for (var r2 = 0; r2 < e2.length; r2++) t2[r2] = e2[r2];
            return t2;
          }
          a.applyFromCharCode = s;
          var c = {};
          c.string = { string: n, array: function(e2) {
            return l(e2, new Array(e2.length));
          }, arraybuffer: function(e2) {
            return c.string.uint8array(e2).buffer;
          }, uint8array: function(e2) {
            return l(e2, new Uint8Array(e2.length));
          }, nodebuffer: function(e2) {
            return l(e2, r.allocBuffer(e2.length));
          } }, c.array = { string: s, array: n, arraybuffer: function(e2) {
            return new Uint8Array(e2).buffer;
          }, uint8array: function(e2) {
            return new Uint8Array(e2);
          }, nodebuffer: function(e2) {
            return r.newBufferFrom(e2);
          } }, c.arraybuffer = { string: function(e2) {
            return s(new Uint8Array(e2));
          }, array: function(e2) {
            return f(new Uint8Array(e2), new Array(e2.byteLength));
          }, arraybuffer: n, uint8array: function(e2) {
            return new Uint8Array(e2);
          }, nodebuffer: function(e2) {
            return r.newBufferFrom(new Uint8Array(e2));
          } }, c.uint8array = { string: s, array: function(e2) {
            return f(e2, new Array(e2.length));
          }, arraybuffer: function(e2) {
            return e2.buffer;
          }, uint8array: n, nodebuffer: function(e2) {
            return r.newBufferFrom(e2);
          } }, c.nodebuffer = { string: s, array: function(e2) {
            return f(e2, new Array(e2.length));
          }, arraybuffer: function(e2) {
            return c.nodebuffer.uint8array(e2).buffer;
          }, uint8array: function(e2) {
            return f(e2, new Uint8Array(e2.length));
          }, nodebuffer: n }, a.transformTo = function(e2, t2) {
            if (t2 = t2 || "", !e2) return t2;
            a.checkSupport(e2);
            var r2 = a.getTypeOf(t2);
            return c[r2][e2](t2);
          }, a.resolve = function(e2) {
            for (var t2 = e2.split("/"), r2 = [], n2 = 0; n2 < t2.length; n2++) {
              var i2 = t2[n2];
              "." === i2 || "" === i2 && 0 !== n2 && n2 !== t2.length - 1 || (".." === i2 ? r2.pop() : r2.push(i2));
            }
            return r2.join("/");
          }, a.getTypeOf = function(e2) {
            return "string" == typeof e2 ? "string" : "[object Array]" === Object.prototype.toString.call(e2) ? "array" : o.nodebuffer && r.isBuffer(e2) ? "nodebuffer" : o.uint8array && e2 instanceof Uint8Array ? "uint8array" : o.arraybuffer && e2 instanceof ArrayBuffer ? "arraybuffer" : void 0;
          }, a.checkSupport = function(e2) {
            if (!o[e2.toLowerCase()]) throw new Error(e2 + " is not supported by this platform");
          }, a.MAX_VALUE_16BITS = 65535, a.MAX_VALUE_32BITS = -1, a.pretty = function(e2) {
            var t2, r2, n2 = "";
            for (r2 = 0; r2 < (e2 || "").length; r2++) n2 += "\\x" + ((t2 = e2.charCodeAt(r2)) < 16 ? "0" : "") + t2.toString(16).toUpperCase();
            return n2;
          }, a.delay = function(e2, t2, r2) {
            setImmediate(function() {
              e2.apply(r2 || null, t2 || []);
            });
          }, a.inherits = function(e2, t2) {
            function r2() {
            }
            r2.prototype = t2.prototype, e2.prototype = new r2();
          }, a.extend = function() {
            var e2, t2, r2 = {};
            for (e2 = 0; e2 < arguments.length; e2++) for (t2 in arguments[e2]) Object.prototype.hasOwnProperty.call(arguments[e2], t2) && void 0 === r2[t2] && (r2[t2] = arguments[e2][t2]);
            return r2;
          }, a.prepareContent = function(r2, e2, n2, i2, s2) {
            return u.Promise.resolve(e2).then(function(n3) {
              return o.blob && (n3 instanceof Blob || -1 !== ["[object File]", "[object Blob]"].indexOf(Object.prototype.toString.call(n3))) && "undefined" != typeof FileReader ? new u.Promise(function(t2, r3) {
                var e3 = new FileReader();
                e3.onload = function(e4) {
                  t2(e4.target.result);
                }, e3.onerror = function(e4) {
                  r3(e4.target.error);
                }, e3.readAsArrayBuffer(n3);
              }) : n3;
            }).then(function(e3) {
              var t2 = a.getTypeOf(e3);
              return t2 ? ("arraybuffer" === t2 ? e3 = a.transformTo("uint8array", e3) : "string" === t2 && (s2 ? e3 = h.decode(e3) : n2 && true !== i2 && (e3 = (function(e4) {
                return l(e4, o.uint8array ? new Uint8Array(e4.length) : new Array(e4.length));
              })(e3))), e3) : u.Promise.reject(new Error("Can't read the data of '" + r2 + "'. Is it in a supported JavaScript type (String, Blob, ArrayBuffer, etc) ?"));
            });
          };
        }, { "./base64": 1, "./external": 6, "./nodejsUtils": 14, "./support": 30, setimmediate: 54 }], 33: [function(e, t, r) {
          "use strict";
          var n = e("./reader/readerFor"), i = e("./utils"), s = e("./signature"), a = e("./zipEntry"), o = e("./support");
          function h(e2) {
            this.files = [], this.loadOptions = e2;
          }
          h.prototype = { checkSignature: function(e2) {
            if (!this.reader.readAndCheckSignature(e2)) {
              this.reader.index -= 4;
              var t2 = this.reader.readString(4);
              throw new Error("Corrupted zip or bug: unexpected signature (" + i.pretty(t2) + ", expected " + i.pretty(e2) + ")");
            }
          }, isSignature: function(e2, t2) {
            var r2 = this.reader.index;
            this.reader.setIndex(e2);
            var n2 = this.reader.readString(4) === t2;
            return this.reader.setIndex(r2), n2;
          }, readBlockEndOfCentral: function() {
            this.diskNumber = this.reader.readInt(2), this.diskWithCentralDirStart = this.reader.readInt(2), this.centralDirRecordsOnThisDisk = this.reader.readInt(2), this.centralDirRecords = this.reader.readInt(2), this.centralDirSize = this.reader.readInt(4), this.centralDirOffset = this.reader.readInt(4), this.zipCommentLength = this.reader.readInt(2);
            var e2 = this.reader.readData(this.zipCommentLength), t2 = o.uint8array ? "uint8array" : "array", r2 = i.transformTo(t2, e2);
            this.zipComment = this.loadOptions.decodeFileName(r2);
          }, readBlockZip64EndOfCentral: function() {
            this.zip64EndOfCentralSize = this.reader.readInt(8), this.reader.skip(4), this.diskNumber = this.reader.readInt(4), this.diskWithCentralDirStart = this.reader.readInt(4), this.centralDirRecordsOnThisDisk = this.reader.readInt(8), this.centralDirRecords = this.reader.readInt(8), this.centralDirSize = this.reader.readInt(8), this.centralDirOffset = this.reader.readInt(8), this.zip64ExtensibleData = {};
            for (var e2, t2, r2, n2 = this.zip64EndOfCentralSize - 44; 0 < n2; ) e2 = this.reader.readInt(2), t2 = this.reader.readInt(4), r2 = this.reader.readData(t2), this.zip64ExtensibleData[e2] = { id: e2, length: t2, value: r2 };
          }, readBlockZip64EndOfCentralLocator: function() {
            if (this.diskWithZip64CentralDirStart = this.reader.readInt(4), this.relativeOffsetEndOfZip64CentralDir = this.reader.readInt(8), this.disksCount = this.reader.readInt(4), 1 < this.disksCount) throw new Error("Multi-volumes zip are not supported");
          }, readLocalFiles: function() {
            var e2, t2;
            for (e2 = 0; e2 < this.files.length; e2++) t2 = this.files[e2], this.reader.setIndex(t2.localHeaderOffset), this.checkSignature(s.LOCAL_FILE_HEADER), t2.readLocalPart(this.reader), t2.handleUTF8(), t2.processAttributes();
          }, readCentralDir: function() {
            var e2;
            for (this.reader.setIndex(this.centralDirOffset); this.reader.readAndCheckSignature(s.CENTRAL_FILE_HEADER); ) (e2 = new a({ zip64: this.zip64 }, this.loadOptions)).readCentralPart(this.reader), this.files.push(e2);
            if (this.centralDirRecords !== this.files.length && 0 !== this.centralDirRecords && 0 === this.files.length) throw new Error("Corrupted zip or bug: expected " + this.centralDirRecords + " records in central dir, got " + this.files.length);
          }, readEndOfCentral: function() {
            var e2 = this.reader.lastIndexOfSignature(s.CENTRAL_DIRECTORY_END);
            if (e2 < 0) throw !this.isSignature(0, s.LOCAL_FILE_HEADER) ? new Error("Can't find end of central directory : is this a zip file ? If it is, see https://stuk.github.io/jszip/documentation/howto/read_zip.html") : new Error("Corrupted zip: can't find end of central directory");
            this.reader.setIndex(e2);
            var t2 = e2;
            if (this.checkSignature(s.CENTRAL_DIRECTORY_END), this.readBlockEndOfCentral(), this.diskNumber === i.MAX_VALUE_16BITS || this.diskWithCentralDirStart === i.MAX_VALUE_16BITS || this.centralDirRecordsOnThisDisk === i.MAX_VALUE_16BITS || this.centralDirRecords === i.MAX_VALUE_16BITS || this.centralDirSize === i.MAX_VALUE_32BITS || this.centralDirOffset === i.MAX_VALUE_32BITS) {
              if (this.zip64 = true, (e2 = this.reader.lastIndexOfSignature(s.ZIP64_CENTRAL_DIRECTORY_LOCATOR)) < 0) throw new Error("Corrupted zip: can't find the ZIP64 end of central directory locator");
              if (this.reader.setIndex(e2), this.checkSignature(s.ZIP64_CENTRAL_DIRECTORY_LOCATOR), this.readBlockZip64EndOfCentralLocator(), !this.isSignature(this.relativeOffsetEndOfZip64CentralDir, s.ZIP64_CENTRAL_DIRECTORY_END) && (this.relativeOffsetEndOfZip64CentralDir = this.reader.lastIndexOfSignature(s.ZIP64_CENTRAL_DIRECTORY_END), this.relativeOffsetEndOfZip64CentralDir < 0)) throw new Error("Corrupted zip: can't find the ZIP64 end of central directory");
              this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir), this.checkSignature(s.ZIP64_CENTRAL_DIRECTORY_END), this.readBlockZip64EndOfCentral();
            }
            var r2 = this.centralDirOffset + this.centralDirSize;
            this.zip64 && (r2 += 20, r2 += 12 + this.zip64EndOfCentralSize);
            var n2 = t2 - r2;
            if (0 < n2) this.isSignature(t2, s.CENTRAL_FILE_HEADER) || (this.reader.zero = n2);
            else if (n2 < 0) throw new Error("Corrupted zip: missing " + Math.abs(n2) + " bytes.");
          }, prepareReader: function(e2) {
            this.reader = n(e2);
          }, load: function(e2) {
            this.prepareReader(e2), this.readEndOfCentral(), this.readCentralDir(), this.readLocalFiles();
          } }, t.exports = h;
        }, { "./reader/readerFor": 22, "./signature": 23, "./support": 30, "./utils": 32, "./zipEntry": 34 }], 34: [function(e, t, r) {
          "use strict";
          var n = e("./reader/readerFor"), s = e("./utils"), i = e("./compressedObject"), a = e("./crc32"), o = e("./utf8"), h = e("./compressions"), u = e("./support");
          function l(e2, t2) {
            this.options = e2, this.loadOptions = t2;
          }
          l.prototype = { isEncrypted: function() {
            return 1 == (1 & this.bitFlag);
          }, useUTF8: function() {
            return 2048 == (2048 & this.bitFlag);
          }, readLocalPart: function(e2) {
            var t2, r2;
            if (e2.skip(22), this.fileNameLength = e2.readInt(2), r2 = e2.readInt(2), this.fileName = e2.readData(this.fileNameLength), e2.skip(r2), -1 === this.compressedSize || -1 === this.uncompressedSize) throw new Error("Bug or corrupted zip : didn't get enough information from the central directory (compressedSize === -1 || uncompressedSize === -1)");
            if (null === (t2 = (function(e3) {
              for (var t3 in h) if (Object.prototype.hasOwnProperty.call(h, t3) && h[t3].magic === e3) return h[t3];
              return null;
            })(this.compressionMethod))) throw new Error("Corrupted zip : compression " + s.pretty(this.compressionMethod) + " unknown (inner file : " + s.transformTo("string", this.fileName) + ")");
            this.decompressed = new i(this.compressedSize, this.uncompressedSize, this.crc32, t2, e2.readData(this.compressedSize));
          }, readCentralPart: function(e2) {
            this.versionMadeBy = e2.readInt(2), e2.skip(2), this.bitFlag = e2.readInt(2), this.compressionMethod = e2.readString(2), this.date = e2.readDate(), this.crc32 = e2.readInt(4), this.compressedSize = e2.readInt(4), this.uncompressedSize = e2.readInt(4);
            var t2 = e2.readInt(2);
            if (this.extraFieldsLength = e2.readInt(2), this.fileCommentLength = e2.readInt(2), this.diskNumberStart = e2.readInt(2), this.internalFileAttributes = e2.readInt(2), this.externalFileAttributes = e2.readInt(4), this.localHeaderOffset = e2.readInt(4), this.isEncrypted()) throw new Error("Encrypted zip are not supported");
            e2.skip(t2), this.readExtraFields(e2), this.parseZIP64ExtraField(e2), this.fileComment = e2.readData(this.fileCommentLength);
          }, processAttributes: function() {
            this.unixPermissions = null, this.dosPermissions = null;
            var e2 = this.versionMadeBy >> 8;
            this.dir = !!(16 & this.externalFileAttributes), 0 == e2 && (this.dosPermissions = 63 & this.externalFileAttributes), 3 == e2 && (this.unixPermissions = this.externalFileAttributes >> 16 & 65535), this.dir || "/" !== this.fileNameStr.slice(-1) || (this.dir = true);
          }, parseZIP64ExtraField: function() {
            if (this.extraFields[1]) {
              var e2 = n(this.extraFields[1].value);
              this.uncompressedSize === s.MAX_VALUE_32BITS && (this.uncompressedSize = e2.readInt(8)), this.compressedSize === s.MAX_VALUE_32BITS && (this.compressedSize = e2.readInt(8)), this.localHeaderOffset === s.MAX_VALUE_32BITS && (this.localHeaderOffset = e2.readInt(8)), this.diskNumberStart === s.MAX_VALUE_32BITS && (this.diskNumberStart = e2.readInt(4));
            }
          }, readExtraFields: function(e2) {
            var t2, r2, n2, i2 = e2.index + this.extraFieldsLength;
            for (this.extraFields || (this.extraFields = {}); e2.index + 4 < i2; ) t2 = e2.readInt(2), r2 = e2.readInt(2), n2 = e2.readData(r2), this.extraFields[t2] = { id: t2, length: r2, value: n2 };
            e2.setIndex(i2);
          }, handleUTF8: function() {
            var e2 = u.uint8array ? "uint8array" : "array";
            if (this.useUTF8()) this.fileNameStr = o.utf8decode(this.fileName), this.fileCommentStr = o.utf8decode(this.fileComment);
            else {
              var t2 = this.findExtraFieldUnicodePath();
              if (null !== t2) this.fileNameStr = t2;
              else {
                var r2 = s.transformTo(e2, this.fileName);
                this.fileNameStr = this.loadOptions.decodeFileName(r2);
              }
              var n2 = this.findExtraFieldUnicodeComment();
              if (null !== n2) this.fileCommentStr = n2;
              else {
                var i2 = s.transformTo(e2, this.fileComment);
                this.fileCommentStr = this.loadOptions.decodeFileName(i2);
              }
            }
          }, findExtraFieldUnicodePath: function() {
            var e2 = this.extraFields[28789];
            if (e2) {
              var t2 = n(e2.value);
              return 1 !== t2.readInt(1) ? null : a(this.fileName) !== t2.readInt(4) ? null : o.utf8decode(t2.readData(e2.length - 5));
            }
            return null;
          }, findExtraFieldUnicodeComment: function() {
            var e2 = this.extraFields[25461];
            if (e2) {
              var t2 = n(e2.value);
              return 1 !== t2.readInt(1) ? null : a(this.fileComment) !== t2.readInt(4) ? null : o.utf8decode(t2.readData(e2.length - 5));
            }
            return null;
          } }, t.exports = l;
        }, { "./compressedObject": 2, "./compressions": 3, "./crc32": 4, "./reader/readerFor": 22, "./support": 30, "./utf8": 31, "./utils": 32 }], 35: [function(e, t, r) {
          "use strict";
          function n(e2, t2, r2) {
            this.name = e2, this.dir = r2.dir, this.date = r2.date, this.comment = r2.comment, this.unixPermissions = r2.unixPermissions, this.dosPermissions = r2.dosPermissions, this._data = t2, this._dataBinary = r2.binary, this.options = { compression: r2.compression, compressionOptions: r2.compressionOptions };
          }
          var s = e("./stream/StreamHelper"), i = e("./stream/DataWorker"), a = e("./utf8"), o = e("./compressedObject"), h = e("./stream/GenericWorker");
          n.prototype = { internalStream: function(e2) {
            var t2 = null, r2 = "string";
            try {
              if (!e2) throw new Error("No output type specified.");
              var n2 = "string" === (r2 = e2.toLowerCase()) || "text" === r2;
              "binarystring" !== r2 && "text" !== r2 || (r2 = "string"), t2 = this._decompressWorker();
              var i2 = !this._dataBinary;
              i2 && !n2 && (t2 = t2.pipe(new a.Utf8EncodeWorker())), !i2 && n2 && (t2 = t2.pipe(new a.Utf8DecodeWorker()));
            } catch (e3) {
              (t2 = new h("error")).error(e3);
            }
            return new s(t2, r2, "");
          }, async: function(e2, t2) {
            return this.internalStream(e2).accumulate(t2);
          }, nodeStream: function(e2, t2) {
            return this.internalStream(e2 || "nodebuffer").toNodejsStream(t2);
          }, _compressWorker: function(e2, t2) {
            if (this._data instanceof o && this._data.compression.magic === e2.magic) return this._data.getCompressedWorker();
            var r2 = this._decompressWorker();
            return this._dataBinary || (r2 = r2.pipe(new a.Utf8EncodeWorker())), o.createWorkerFrom(r2, e2, t2);
          }, _decompressWorker: function() {
            return this._data instanceof o ? this._data.getContentWorker() : this._data instanceof h ? this._data : new i(this._data);
          } };
          for (var u = ["asText", "asBinary", "asNodeBuffer", "asUint8Array", "asArrayBuffer"], l = function() {
            throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
          }, f = 0; f < u.length; f++) n.prototype[u[f]] = l;
          t.exports = n;
        }, { "./compressedObject": 2, "./stream/DataWorker": 27, "./stream/GenericWorker": 28, "./stream/StreamHelper": 29, "./utf8": 31 }], 36: [function(e, l, t) {
          (function(t2) {
            "use strict";
            var r, n, e2 = t2.MutationObserver || t2.WebKitMutationObserver;
            if (e2) {
              var i = 0, s = new e2(u), a = t2.document.createTextNode("");
              s.observe(a, { characterData: true }), r = function() {
                a.data = i = ++i % 2;
              };
            } else if (t2.setImmediate || void 0 === t2.MessageChannel) r = "document" in t2 && "onreadystatechange" in t2.document.createElement("script") ? function() {
              var e3 = t2.document.createElement("script");
              e3.onreadystatechange = function() {
                u(), e3.onreadystatechange = null, e3.parentNode.removeChild(e3), e3 = null;
              }, t2.document.documentElement.appendChild(e3);
            } : function() {
              setTimeout(u, 0);
            };
            else {
              var o = new t2.MessageChannel();
              o.port1.onmessage = u, r = function() {
                o.port2.postMessage(0);
              };
            }
            var h = [];
            function u() {
              var e3, t3;
              n = true;
              for (var r2 = h.length; r2; ) {
                for (t3 = h, h = [], e3 = -1; ++e3 < r2; ) t3[e3]();
                r2 = h.length;
              }
              n = false;
            }
            l.exports = function(e3) {
              1 !== h.push(e3) || n || r();
            };
          }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
        }, {}], 37: [function(e, t, r) {
          "use strict";
          var i = e("immediate");
          function u() {
          }
          var l = {}, s = ["REJECTED"], a = ["FULFILLED"], n = ["PENDING"];
          function o(e2) {
            if ("function" != typeof e2) throw new TypeError("resolver must be a function");
            this.state = n, this.queue = [], this.outcome = void 0, e2 !== u && d(this, e2);
          }
          function h(e2, t2, r2) {
            this.promise = e2, "function" == typeof t2 && (this.onFulfilled = t2, this.callFulfilled = this.otherCallFulfilled), "function" == typeof r2 && (this.onRejected = r2, this.callRejected = this.otherCallRejected);
          }
          function f(t2, r2, n2) {
            i(function() {
              var e2;
              try {
                e2 = r2(n2);
              } catch (e3) {
                return l.reject(t2, e3);
              }
              e2 === t2 ? l.reject(t2, new TypeError("Cannot resolve promise with itself")) : l.resolve(t2, e2);
            });
          }
          function c(e2) {
            var t2 = e2 && e2.then;
            if (e2 && ("object" == typeof e2 || "function" == typeof e2) && "function" == typeof t2) return function() {
              t2.apply(e2, arguments);
            };
          }
          function d(t2, e2) {
            var r2 = false;
            function n2(e3) {
              r2 || (r2 = true, l.reject(t2, e3));
            }
            function i2(e3) {
              r2 || (r2 = true, l.resolve(t2, e3));
            }
            var s2 = p(function() {
              e2(i2, n2);
            });
            "error" === s2.status && n2(s2.value);
          }
          function p(e2, t2) {
            var r2 = {};
            try {
              r2.value = e2(t2), r2.status = "success";
            } catch (e3) {
              r2.status = "error", r2.value = e3;
            }
            return r2;
          }
          (t.exports = o).prototype.finally = function(t2) {
            if ("function" != typeof t2) return this;
            var r2 = this.constructor;
            return this.then(function(e2) {
              return r2.resolve(t2()).then(function() {
                return e2;
              });
            }, function(e2) {
              return r2.resolve(t2()).then(function() {
                throw e2;
              });
            });
          }, o.prototype.catch = function(e2) {
            return this.then(null, e2);
          }, o.prototype.then = function(e2, t2) {
            if ("function" != typeof e2 && this.state === a || "function" != typeof t2 && this.state === s) return this;
            var r2 = new this.constructor(u);
            this.state !== n ? f(r2, this.state === a ? e2 : t2, this.outcome) : this.queue.push(new h(r2, e2, t2));
            return r2;
          }, h.prototype.callFulfilled = function(e2) {
            l.resolve(this.promise, e2);
          }, h.prototype.otherCallFulfilled = function(e2) {
            f(this.promise, this.onFulfilled, e2);
          }, h.prototype.callRejected = function(e2) {
            l.reject(this.promise, e2);
          }, h.prototype.otherCallRejected = function(e2) {
            f(this.promise, this.onRejected, e2);
          }, l.resolve = function(e2, t2) {
            var r2 = p(c, t2);
            if ("error" === r2.status) return l.reject(e2, r2.value);
            var n2 = r2.value;
            if (n2) d(e2, n2);
            else {
              e2.state = a, e2.outcome = t2;
              for (var i2 = -1, s2 = e2.queue.length; ++i2 < s2; ) e2.queue[i2].callFulfilled(t2);
            }
            return e2;
          }, l.reject = function(e2, t2) {
            e2.state = s, e2.outcome = t2;
            for (var r2 = -1, n2 = e2.queue.length; ++r2 < n2; ) e2.queue[r2].callRejected(t2);
            return e2;
          }, o.resolve = function(e2) {
            if (e2 instanceof this) return e2;
            return l.resolve(new this(u), e2);
          }, o.reject = function(e2) {
            var t2 = new this(u);
            return l.reject(t2, e2);
          }, o.all = function(e2) {
            var r2 = this;
            if ("[object Array]" !== Object.prototype.toString.call(e2)) return this.reject(new TypeError("must be an array"));
            var n2 = e2.length, i2 = false;
            if (!n2) return this.resolve([]);
            var s2 = new Array(n2), a2 = 0, t2 = -1, o2 = new this(u);
            for (; ++t2 < n2; ) h2(e2[t2], t2);
            return o2;
            function h2(e3, t3) {
              r2.resolve(e3).then(function(e4) {
                s2[t3] = e4, ++a2 !== n2 || i2 || (i2 = true, l.resolve(o2, s2));
              }, function(e4) {
                i2 || (i2 = true, l.reject(o2, e4));
              });
            }
          }, o.race = function(e2) {
            var t2 = this;
            if ("[object Array]" !== Object.prototype.toString.call(e2)) return this.reject(new TypeError("must be an array"));
            var r2 = e2.length, n2 = false;
            if (!r2) return this.resolve([]);
            var i2 = -1, s2 = new this(u);
            for (; ++i2 < r2; ) a2 = e2[i2], t2.resolve(a2).then(function(e3) {
              n2 || (n2 = true, l.resolve(s2, e3));
            }, function(e3) {
              n2 || (n2 = true, l.reject(s2, e3));
            });
            var a2;
            return s2;
          };
        }, { immediate: 36 }], 38: [function(e, t, r) {
          "use strict";
          var n = {};
          (0, e("./lib/utils/common").assign)(n, e("./lib/deflate"), e("./lib/inflate"), e("./lib/zlib/constants")), t.exports = n;
        }, { "./lib/deflate": 39, "./lib/inflate": 40, "./lib/utils/common": 41, "./lib/zlib/constants": 44 }], 39: [function(e, t, r) {
          "use strict";
          var a = e("./zlib/deflate"), o = e("./utils/common"), h = e("./utils/strings"), i = e("./zlib/messages"), s = e("./zlib/zstream"), u = Object.prototype.toString, l = 0, f = -1, c = 0, d = 8;
          function p(e2) {
            if (!(this instanceof p)) return new p(e2);
            this.options = o.assign({ level: f, method: d, chunkSize: 16384, windowBits: 15, memLevel: 8, strategy: c, to: "" }, e2 || {});
            var t2 = this.options;
            t2.raw && 0 < t2.windowBits ? t2.windowBits = -t2.windowBits : t2.gzip && 0 < t2.windowBits && t2.windowBits < 16 && (t2.windowBits += 16), this.err = 0, this.msg = "", this.ended = false, this.chunks = [], this.strm = new s(), this.strm.avail_out = 0;
            var r2 = a.deflateInit2(this.strm, t2.level, t2.method, t2.windowBits, t2.memLevel, t2.strategy);
            if (r2 !== l) throw new Error(i[r2]);
            if (t2.header && a.deflateSetHeader(this.strm, t2.header), t2.dictionary) {
              var n2;
              if (n2 = "string" == typeof t2.dictionary ? h.string2buf(t2.dictionary) : "[object ArrayBuffer]" === u.call(t2.dictionary) ? new Uint8Array(t2.dictionary) : t2.dictionary, (r2 = a.deflateSetDictionary(this.strm, n2)) !== l) throw new Error(i[r2]);
              this._dict_set = true;
            }
          }
          function n(e2, t2) {
            var r2 = new p(t2);
            if (r2.push(e2, true), r2.err) throw r2.msg || i[r2.err];
            return r2.result;
          }
          p.prototype.push = function(e2, t2) {
            var r2, n2, i2 = this.strm, s2 = this.options.chunkSize;
            if (this.ended) return false;
            n2 = t2 === ~~t2 ? t2 : true === t2 ? 4 : 0, "string" == typeof e2 ? i2.input = h.string2buf(e2) : "[object ArrayBuffer]" === u.call(e2) ? i2.input = new Uint8Array(e2) : i2.input = e2, i2.next_in = 0, i2.avail_in = i2.input.length;
            do {
              if (0 === i2.avail_out && (i2.output = new o.Buf8(s2), i2.next_out = 0, i2.avail_out = s2), 1 !== (r2 = a.deflate(i2, n2)) && r2 !== l) return this.onEnd(r2), !(this.ended = true);
              0 !== i2.avail_out && (0 !== i2.avail_in || 4 !== n2 && 2 !== n2) || ("string" === this.options.to ? this.onData(h.buf2binstring(o.shrinkBuf(i2.output, i2.next_out))) : this.onData(o.shrinkBuf(i2.output, i2.next_out)));
            } while ((0 < i2.avail_in || 0 === i2.avail_out) && 1 !== r2);
            return 4 === n2 ? (r2 = a.deflateEnd(this.strm), this.onEnd(r2), this.ended = true, r2 === l) : 2 !== n2 || (this.onEnd(l), !(i2.avail_out = 0));
          }, p.prototype.onData = function(e2) {
            this.chunks.push(e2);
          }, p.prototype.onEnd = function(e2) {
            e2 === l && ("string" === this.options.to ? this.result = this.chunks.join("") : this.result = o.flattenChunks(this.chunks)), this.chunks = [], this.err = e2, this.msg = this.strm.msg;
          }, r.Deflate = p, r.deflate = n, r.deflateRaw = function(e2, t2) {
            return (t2 = t2 || {}).raw = true, n(e2, t2);
          }, r.gzip = function(e2, t2) {
            return (t2 = t2 || {}).gzip = true, n(e2, t2);
          };
        }, { "./utils/common": 41, "./utils/strings": 42, "./zlib/deflate": 46, "./zlib/messages": 51, "./zlib/zstream": 53 }], 40: [function(e, t, r) {
          "use strict";
          var c = e("./zlib/inflate"), d = e("./utils/common"), p = e("./utils/strings"), m = e("./zlib/constants"), n = e("./zlib/messages"), i = e("./zlib/zstream"), s = e("./zlib/gzheader"), _ = Object.prototype.toString;
          function a(e2) {
            if (!(this instanceof a)) return new a(e2);
            this.options = d.assign({ chunkSize: 16384, windowBits: 0, to: "" }, e2 || {});
            var t2 = this.options;
            t2.raw && 0 <= t2.windowBits && t2.windowBits < 16 && (t2.windowBits = -t2.windowBits, 0 === t2.windowBits && (t2.windowBits = -15)), !(0 <= t2.windowBits && t2.windowBits < 16) || e2 && e2.windowBits || (t2.windowBits += 32), 15 < t2.windowBits && t2.windowBits < 48 && 0 == (15 & t2.windowBits) && (t2.windowBits |= 15), this.err = 0, this.msg = "", this.ended = false, this.chunks = [], this.strm = new i(), this.strm.avail_out = 0;
            var r2 = c.inflateInit2(this.strm, t2.windowBits);
            if (r2 !== m.Z_OK) throw new Error(n[r2]);
            this.header = new s(), c.inflateGetHeader(this.strm, this.header);
          }
          function o(e2, t2) {
            var r2 = new a(t2);
            if (r2.push(e2, true), r2.err) throw r2.msg || n[r2.err];
            return r2.result;
          }
          a.prototype.push = function(e2, t2) {
            var r2, n2, i2, s2, a2, o2, h = this.strm, u = this.options.chunkSize, l = this.options.dictionary, f = false;
            if (this.ended) return false;
            n2 = t2 === ~~t2 ? t2 : true === t2 ? m.Z_FINISH : m.Z_NO_FLUSH, "string" == typeof e2 ? h.input = p.binstring2buf(e2) : "[object ArrayBuffer]" === _.call(e2) ? h.input = new Uint8Array(e2) : h.input = e2, h.next_in = 0, h.avail_in = h.input.length;
            do {
              if (0 === h.avail_out && (h.output = new d.Buf8(u), h.next_out = 0, h.avail_out = u), (r2 = c.inflate(h, m.Z_NO_FLUSH)) === m.Z_NEED_DICT && l && (o2 = "string" == typeof l ? p.string2buf(l) : "[object ArrayBuffer]" === _.call(l) ? new Uint8Array(l) : l, r2 = c.inflateSetDictionary(this.strm, o2)), r2 === m.Z_BUF_ERROR && true === f && (r2 = m.Z_OK, f = false), r2 !== m.Z_STREAM_END && r2 !== m.Z_OK) return this.onEnd(r2), !(this.ended = true);
              h.next_out && (0 !== h.avail_out && r2 !== m.Z_STREAM_END && (0 !== h.avail_in || n2 !== m.Z_FINISH && n2 !== m.Z_SYNC_FLUSH) || ("string" === this.options.to ? (i2 = p.utf8border(h.output, h.next_out), s2 = h.next_out - i2, a2 = p.buf2string(h.output, i2), h.next_out = s2, h.avail_out = u - s2, s2 && d.arraySet(h.output, h.output, i2, s2, 0), this.onData(a2)) : this.onData(d.shrinkBuf(h.output, h.next_out)))), 0 === h.avail_in && 0 === h.avail_out && (f = true);
            } while ((0 < h.avail_in || 0 === h.avail_out) && r2 !== m.Z_STREAM_END);
            return r2 === m.Z_STREAM_END && (n2 = m.Z_FINISH), n2 === m.Z_FINISH ? (r2 = c.inflateEnd(this.strm), this.onEnd(r2), this.ended = true, r2 === m.Z_OK) : n2 !== m.Z_SYNC_FLUSH || (this.onEnd(m.Z_OK), !(h.avail_out = 0));
          }, a.prototype.onData = function(e2) {
            this.chunks.push(e2);
          }, a.prototype.onEnd = function(e2) {
            e2 === m.Z_OK && ("string" === this.options.to ? this.result = this.chunks.join("") : this.result = d.flattenChunks(this.chunks)), this.chunks = [], this.err = e2, this.msg = this.strm.msg;
          }, r.Inflate = a, r.inflate = o, r.inflateRaw = function(e2, t2) {
            return (t2 = t2 || {}).raw = true, o(e2, t2);
          }, r.ungzip = o;
        }, { "./utils/common": 41, "./utils/strings": 42, "./zlib/constants": 44, "./zlib/gzheader": 47, "./zlib/inflate": 49, "./zlib/messages": 51, "./zlib/zstream": 53 }], 41: [function(e, t, r) {
          "use strict";
          var n = "undefined" != typeof Uint8Array && "undefined" != typeof Uint16Array && "undefined" != typeof Int32Array;
          r.assign = function(e2) {
            for (var t2 = Array.prototype.slice.call(arguments, 1); t2.length; ) {
              var r2 = t2.shift();
              if (r2) {
                if ("object" != typeof r2) throw new TypeError(r2 + "must be non-object");
                for (var n2 in r2) r2.hasOwnProperty(n2) && (e2[n2] = r2[n2]);
              }
            }
            return e2;
          }, r.shrinkBuf = function(e2, t2) {
            return e2.length === t2 ? e2 : e2.subarray ? e2.subarray(0, t2) : (e2.length = t2, e2);
          };
          var i = { arraySet: function(e2, t2, r2, n2, i2) {
            if (t2.subarray && e2.subarray) e2.set(t2.subarray(r2, r2 + n2), i2);
            else for (var s2 = 0; s2 < n2; s2++) e2[i2 + s2] = t2[r2 + s2];
          }, flattenChunks: function(e2) {
            var t2, r2, n2, i2, s2, a;
            for (t2 = n2 = 0, r2 = e2.length; t2 < r2; t2++) n2 += e2[t2].length;
            for (a = new Uint8Array(n2), t2 = i2 = 0, r2 = e2.length; t2 < r2; t2++) s2 = e2[t2], a.set(s2, i2), i2 += s2.length;
            return a;
          } }, s = { arraySet: function(e2, t2, r2, n2, i2) {
            for (var s2 = 0; s2 < n2; s2++) e2[i2 + s2] = t2[r2 + s2];
          }, flattenChunks: function(e2) {
            return [].concat.apply([], e2);
          } };
          r.setTyped = function(e2) {
            e2 ? (r.Buf8 = Uint8Array, r.Buf16 = Uint16Array, r.Buf32 = Int32Array, r.assign(r, i)) : (r.Buf8 = Array, r.Buf16 = Array, r.Buf32 = Array, r.assign(r, s));
          }, r.setTyped(n);
        }, {}], 42: [function(e, t, r) {
          "use strict";
          var h = e("./common"), i = true, s = true;
          try {
            String.fromCharCode.apply(null, [0]);
          } catch (e2) {
            i = false;
          }
          try {
            String.fromCharCode.apply(null, new Uint8Array(1));
          } catch (e2) {
            s = false;
          }
          for (var u = new h.Buf8(256), n = 0; n < 256; n++) u[n] = 252 <= n ? 6 : 248 <= n ? 5 : 240 <= n ? 4 : 224 <= n ? 3 : 192 <= n ? 2 : 1;
          function l(e2, t2) {
            if (t2 < 65537 && (e2.subarray && s || !e2.subarray && i)) return String.fromCharCode.apply(null, h.shrinkBuf(e2, t2));
            for (var r2 = "", n2 = 0; n2 < t2; n2++) r2 += String.fromCharCode(e2[n2]);
            return r2;
          }
          u[254] = u[254] = 1, r.string2buf = function(e2) {
            var t2, r2, n2, i2, s2, a = e2.length, o = 0;
            for (i2 = 0; i2 < a; i2++) 55296 == (64512 & (r2 = e2.charCodeAt(i2))) && i2 + 1 < a && 56320 == (64512 & (n2 = e2.charCodeAt(i2 + 1))) && (r2 = 65536 + (r2 - 55296 << 10) + (n2 - 56320), i2++), o += r2 < 128 ? 1 : r2 < 2048 ? 2 : r2 < 65536 ? 3 : 4;
            for (t2 = new h.Buf8(o), i2 = s2 = 0; s2 < o; i2++) 55296 == (64512 & (r2 = e2.charCodeAt(i2))) && i2 + 1 < a && 56320 == (64512 & (n2 = e2.charCodeAt(i2 + 1))) && (r2 = 65536 + (r2 - 55296 << 10) + (n2 - 56320), i2++), r2 < 128 ? t2[s2++] = r2 : (r2 < 2048 ? t2[s2++] = 192 | r2 >>> 6 : (r2 < 65536 ? t2[s2++] = 224 | r2 >>> 12 : (t2[s2++] = 240 | r2 >>> 18, t2[s2++] = 128 | r2 >>> 12 & 63), t2[s2++] = 128 | r2 >>> 6 & 63), t2[s2++] = 128 | 63 & r2);
            return t2;
          }, r.buf2binstring = function(e2) {
            return l(e2, e2.length);
          }, r.binstring2buf = function(e2) {
            for (var t2 = new h.Buf8(e2.length), r2 = 0, n2 = t2.length; r2 < n2; r2++) t2[r2] = e2.charCodeAt(r2);
            return t2;
          }, r.buf2string = function(e2, t2) {
            var r2, n2, i2, s2, a = t2 || e2.length, o = new Array(2 * a);
            for (r2 = n2 = 0; r2 < a; ) if ((i2 = e2[r2++]) < 128) o[n2++] = i2;
            else if (4 < (s2 = u[i2])) o[n2++] = 65533, r2 += s2 - 1;
            else {
              for (i2 &= 2 === s2 ? 31 : 3 === s2 ? 15 : 7; 1 < s2 && r2 < a; ) i2 = i2 << 6 | 63 & e2[r2++], s2--;
              1 < s2 ? o[n2++] = 65533 : i2 < 65536 ? o[n2++] = i2 : (i2 -= 65536, o[n2++] = 55296 | i2 >> 10 & 1023, o[n2++] = 56320 | 1023 & i2);
            }
            return l(o, n2);
          }, r.utf8border = function(e2, t2) {
            var r2;
            for ((t2 = t2 || e2.length) > e2.length && (t2 = e2.length), r2 = t2 - 1; 0 <= r2 && 128 == (192 & e2[r2]); ) r2--;
            return r2 < 0 ? t2 : 0 === r2 ? t2 : r2 + u[e2[r2]] > t2 ? r2 : t2;
          };
        }, { "./common": 41 }], 43: [function(e, t, r) {
          "use strict";
          t.exports = function(e2, t2, r2, n) {
            for (var i = 65535 & e2 | 0, s = e2 >>> 16 & 65535 | 0, a = 0; 0 !== r2; ) {
              for (r2 -= a = 2e3 < r2 ? 2e3 : r2; s = s + (i = i + t2[n++] | 0) | 0, --a; ) ;
              i %= 65521, s %= 65521;
            }
            return i | s << 16 | 0;
          };
        }, {}], 44: [function(e, t, r) {
          "use strict";
          t.exports = { Z_NO_FLUSH: 0, Z_PARTIAL_FLUSH: 1, Z_SYNC_FLUSH: 2, Z_FULL_FLUSH: 3, Z_FINISH: 4, Z_BLOCK: 5, Z_TREES: 6, Z_OK: 0, Z_STREAM_END: 1, Z_NEED_DICT: 2, Z_ERRNO: -1, Z_STREAM_ERROR: -2, Z_DATA_ERROR: -3, Z_BUF_ERROR: -5, Z_NO_COMPRESSION: 0, Z_BEST_SPEED: 1, Z_BEST_COMPRESSION: 9, Z_DEFAULT_COMPRESSION: -1, Z_FILTERED: 1, Z_HUFFMAN_ONLY: 2, Z_RLE: 3, Z_FIXED: 4, Z_DEFAULT_STRATEGY: 0, Z_BINARY: 0, Z_TEXT: 1, Z_UNKNOWN: 2, Z_DEFLATED: 8 };
        }, {}], 45: [function(e, t, r) {
          "use strict";
          var o = (function() {
            for (var e2, t2 = [], r2 = 0; r2 < 256; r2++) {
              e2 = r2;
              for (var n = 0; n < 8; n++) e2 = 1 & e2 ? 3988292384 ^ e2 >>> 1 : e2 >>> 1;
              t2[r2] = e2;
            }
            return t2;
          })();
          t.exports = function(e2, t2, r2, n) {
            var i = o, s = n + r2;
            e2 ^= -1;
            for (var a = n; a < s; a++) e2 = e2 >>> 8 ^ i[255 & (e2 ^ t2[a])];
            return -1 ^ e2;
          };
        }, {}], 46: [function(e, t, r) {
          "use strict";
          var h, c = e("../utils/common"), u = e("./trees"), d = e("./adler32"), p = e("./crc32"), n = e("./messages"), l = 0, f = 4, m = 0, _ = -2, g = -1, b = 4, i = 2, v = 8, y = 9, s = 286, a = 30, o = 19, w = 2 * s + 1, k = 15, x = 3, S = 258, z = S + x + 1, C = 42, E = 113, A = 1, I = 2, O = 3, B = 4;
          function R(e2, t2) {
            return e2.msg = n[t2], t2;
          }
          function T(e2) {
            return (e2 << 1) - (4 < e2 ? 9 : 0);
          }
          function D(e2) {
            for (var t2 = e2.length; 0 <= --t2; ) e2[t2] = 0;
          }
          function F(e2) {
            var t2 = e2.state, r2 = t2.pending;
            r2 > e2.avail_out && (r2 = e2.avail_out), 0 !== r2 && (c.arraySet(e2.output, t2.pending_buf, t2.pending_out, r2, e2.next_out), e2.next_out += r2, t2.pending_out += r2, e2.total_out += r2, e2.avail_out -= r2, t2.pending -= r2, 0 === t2.pending && (t2.pending_out = 0));
          }
          function N(e2, t2) {
            u._tr_flush_block(e2, 0 <= e2.block_start ? e2.block_start : -1, e2.strstart - e2.block_start, t2), e2.block_start = e2.strstart, F(e2.strm);
          }
          function U(e2, t2) {
            e2.pending_buf[e2.pending++] = t2;
          }
          function P2(e2, t2) {
            e2.pending_buf[e2.pending++] = t2 >>> 8 & 255, e2.pending_buf[e2.pending++] = 255 & t2;
          }
          function L(e2, t2) {
            var r2, n2, i2 = e2.max_chain_length, s2 = e2.strstart, a2 = e2.prev_length, o2 = e2.nice_match, h2 = e2.strstart > e2.w_size - z ? e2.strstart - (e2.w_size - z) : 0, u2 = e2.window, l2 = e2.w_mask, f2 = e2.prev, c2 = e2.strstart + S, d2 = u2[s2 + a2 - 1], p2 = u2[s2 + a2];
            e2.prev_length >= e2.good_match && (i2 >>= 2), o2 > e2.lookahead && (o2 = e2.lookahead);
            do {
              if (u2[(r2 = t2) + a2] === p2 && u2[r2 + a2 - 1] === d2 && u2[r2] === u2[s2] && u2[++r2] === u2[s2 + 1]) {
                s2 += 2, r2++;
                do {
                } while (u2[++s2] === u2[++r2] && u2[++s2] === u2[++r2] && u2[++s2] === u2[++r2] && u2[++s2] === u2[++r2] && u2[++s2] === u2[++r2] && u2[++s2] === u2[++r2] && u2[++s2] === u2[++r2] && u2[++s2] === u2[++r2] && s2 < c2);
                if (n2 = S - (c2 - s2), s2 = c2 - S, a2 < n2) {
                  if (e2.match_start = t2, o2 <= (a2 = n2)) break;
                  d2 = u2[s2 + a2 - 1], p2 = u2[s2 + a2];
                }
              }
            } while ((t2 = f2[t2 & l2]) > h2 && 0 != --i2);
            return a2 <= e2.lookahead ? a2 : e2.lookahead;
          }
          function j(e2) {
            var t2, r2, n2, i2, s2, a2, o2, h2, u2, l2, f2 = e2.w_size;
            do {
              if (i2 = e2.window_size - e2.lookahead - e2.strstart, e2.strstart >= f2 + (f2 - z)) {
                for (c.arraySet(e2.window, e2.window, f2, f2, 0), e2.match_start -= f2, e2.strstart -= f2, e2.block_start -= f2, t2 = r2 = e2.hash_size; n2 = e2.head[--t2], e2.head[t2] = f2 <= n2 ? n2 - f2 : 0, --r2; ) ;
                for (t2 = r2 = f2; n2 = e2.prev[--t2], e2.prev[t2] = f2 <= n2 ? n2 - f2 : 0, --r2; ) ;
                i2 += f2;
              }
              if (0 === e2.strm.avail_in) break;
              if (a2 = e2.strm, o2 = e2.window, h2 = e2.strstart + e2.lookahead, u2 = i2, l2 = void 0, l2 = a2.avail_in, u2 < l2 && (l2 = u2), r2 = 0 === l2 ? 0 : (a2.avail_in -= l2, c.arraySet(o2, a2.input, a2.next_in, l2, h2), 1 === a2.state.wrap ? a2.adler = d(a2.adler, o2, l2, h2) : 2 === a2.state.wrap && (a2.adler = p(a2.adler, o2, l2, h2)), a2.next_in += l2, a2.total_in += l2, l2), e2.lookahead += r2, e2.lookahead + e2.insert >= x) for (s2 = e2.strstart - e2.insert, e2.ins_h = e2.window[s2], e2.ins_h = (e2.ins_h << e2.hash_shift ^ e2.window[s2 + 1]) & e2.hash_mask; e2.insert && (e2.ins_h = (e2.ins_h << e2.hash_shift ^ e2.window[s2 + x - 1]) & e2.hash_mask, e2.prev[s2 & e2.w_mask] = e2.head[e2.ins_h], e2.head[e2.ins_h] = s2, s2++, e2.insert--, !(e2.lookahead + e2.insert < x)); ) ;
            } while (e2.lookahead < z && 0 !== e2.strm.avail_in);
          }
          function Z(e2, t2) {
            for (var r2, n2; ; ) {
              if (e2.lookahead < z) {
                if (j(e2), e2.lookahead < z && t2 === l) return A;
                if (0 === e2.lookahead) break;
              }
              if (r2 = 0, e2.lookahead >= x && (e2.ins_h = (e2.ins_h << e2.hash_shift ^ e2.window[e2.strstart + x - 1]) & e2.hash_mask, r2 = e2.prev[e2.strstart & e2.w_mask] = e2.head[e2.ins_h], e2.head[e2.ins_h] = e2.strstart), 0 !== r2 && e2.strstart - r2 <= e2.w_size - z && (e2.match_length = L(e2, r2)), e2.match_length >= x) if (n2 = u._tr_tally(e2, e2.strstart - e2.match_start, e2.match_length - x), e2.lookahead -= e2.match_length, e2.match_length <= e2.max_lazy_match && e2.lookahead >= x) {
                for (e2.match_length--; e2.strstart++, e2.ins_h = (e2.ins_h << e2.hash_shift ^ e2.window[e2.strstart + x - 1]) & e2.hash_mask, r2 = e2.prev[e2.strstart & e2.w_mask] = e2.head[e2.ins_h], e2.head[e2.ins_h] = e2.strstart, 0 != --e2.match_length; ) ;
                e2.strstart++;
              } else e2.strstart += e2.match_length, e2.match_length = 0, e2.ins_h = e2.window[e2.strstart], e2.ins_h = (e2.ins_h << e2.hash_shift ^ e2.window[e2.strstart + 1]) & e2.hash_mask;
              else n2 = u._tr_tally(e2, 0, e2.window[e2.strstart]), e2.lookahead--, e2.strstart++;
              if (n2 && (N(e2, false), 0 === e2.strm.avail_out)) return A;
            }
            return e2.insert = e2.strstart < x - 1 ? e2.strstart : x - 1, t2 === f ? (N(e2, true), 0 === e2.strm.avail_out ? O : B) : e2.last_lit && (N(e2, false), 0 === e2.strm.avail_out) ? A : I;
          }
          function W(e2, t2) {
            for (var r2, n2, i2; ; ) {
              if (e2.lookahead < z) {
                if (j(e2), e2.lookahead < z && t2 === l) return A;
                if (0 === e2.lookahead) break;
              }
              if (r2 = 0, e2.lookahead >= x && (e2.ins_h = (e2.ins_h << e2.hash_shift ^ e2.window[e2.strstart + x - 1]) & e2.hash_mask, r2 = e2.prev[e2.strstart & e2.w_mask] = e2.head[e2.ins_h], e2.head[e2.ins_h] = e2.strstart), e2.prev_length = e2.match_length, e2.prev_match = e2.match_start, e2.match_length = x - 1, 0 !== r2 && e2.prev_length < e2.max_lazy_match && e2.strstart - r2 <= e2.w_size - z && (e2.match_length = L(e2, r2), e2.match_length <= 5 && (1 === e2.strategy || e2.match_length === x && 4096 < e2.strstart - e2.match_start) && (e2.match_length = x - 1)), e2.prev_length >= x && e2.match_length <= e2.prev_length) {
                for (i2 = e2.strstart + e2.lookahead - x, n2 = u._tr_tally(e2, e2.strstart - 1 - e2.prev_match, e2.prev_length - x), e2.lookahead -= e2.prev_length - 1, e2.prev_length -= 2; ++e2.strstart <= i2 && (e2.ins_h = (e2.ins_h << e2.hash_shift ^ e2.window[e2.strstart + x - 1]) & e2.hash_mask, r2 = e2.prev[e2.strstart & e2.w_mask] = e2.head[e2.ins_h], e2.head[e2.ins_h] = e2.strstart), 0 != --e2.prev_length; ) ;
                if (e2.match_available = 0, e2.match_length = x - 1, e2.strstart++, n2 && (N(e2, false), 0 === e2.strm.avail_out)) return A;
              } else if (e2.match_available) {
                if ((n2 = u._tr_tally(e2, 0, e2.window[e2.strstart - 1])) && N(e2, false), e2.strstart++, e2.lookahead--, 0 === e2.strm.avail_out) return A;
              } else e2.match_available = 1, e2.strstart++, e2.lookahead--;
            }
            return e2.match_available && (n2 = u._tr_tally(e2, 0, e2.window[e2.strstart - 1]), e2.match_available = 0), e2.insert = e2.strstart < x - 1 ? e2.strstart : x - 1, t2 === f ? (N(e2, true), 0 === e2.strm.avail_out ? O : B) : e2.last_lit && (N(e2, false), 0 === e2.strm.avail_out) ? A : I;
          }
          function M(e2, t2, r2, n2, i2) {
            this.good_length = e2, this.max_lazy = t2, this.nice_length = r2, this.max_chain = n2, this.func = i2;
          }
          function H() {
            this.strm = null, this.status = 0, this.pending_buf = null, this.pending_buf_size = 0, this.pending_out = 0, this.pending = 0, this.wrap = 0, this.gzhead = null, this.gzindex = 0, this.method = v, this.last_flush = -1, this.w_size = 0, this.w_bits = 0, this.w_mask = 0, this.window = null, this.window_size = 0, this.prev = null, this.head = null, this.ins_h = 0, this.hash_size = 0, this.hash_bits = 0, this.hash_mask = 0, this.hash_shift = 0, this.block_start = 0, this.match_length = 0, this.prev_match = 0, this.match_available = 0, this.strstart = 0, this.match_start = 0, this.lookahead = 0, this.prev_length = 0, this.max_chain_length = 0, this.max_lazy_match = 0, this.level = 0, this.strategy = 0, this.good_match = 0, this.nice_match = 0, this.dyn_ltree = new c.Buf16(2 * w), this.dyn_dtree = new c.Buf16(2 * (2 * a + 1)), this.bl_tree = new c.Buf16(2 * (2 * o + 1)), D(this.dyn_ltree), D(this.dyn_dtree), D(this.bl_tree), this.l_desc = null, this.d_desc = null, this.bl_desc = null, this.bl_count = new c.Buf16(k + 1), this.heap = new c.Buf16(2 * s + 1), D(this.heap), this.heap_len = 0, this.heap_max = 0, this.depth = new c.Buf16(2 * s + 1), D(this.depth), this.l_buf = 0, this.lit_bufsize = 0, this.last_lit = 0, this.d_buf = 0, this.opt_len = 0, this.static_len = 0, this.matches = 0, this.insert = 0, this.bi_buf = 0, this.bi_valid = 0;
          }
          function G(e2) {
            var t2;
            return e2 && e2.state ? (e2.total_in = e2.total_out = 0, e2.data_type = i, (t2 = e2.state).pending = 0, t2.pending_out = 0, t2.wrap < 0 && (t2.wrap = -t2.wrap), t2.status = t2.wrap ? C : E, e2.adler = 2 === t2.wrap ? 0 : 1, t2.last_flush = l, u._tr_init(t2), m) : R(e2, _);
          }
          function K(e2) {
            var t2 = G(e2);
            return t2 === m && (function(e3) {
              e3.window_size = 2 * e3.w_size, D(e3.head), e3.max_lazy_match = h[e3.level].max_lazy, e3.good_match = h[e3.level].good_length, e3.nice_match = h[e3.level].nice_length, e3.max_chain_length = h[e3.level].max_chain, e3.strstart = 0, e3.block_start = 0, e3.lookahead = 0, e3.insert = 0, e3.match_length = e3.prev_length = x - 1, e3.match_available = 0, e3.ins_h = 0;
            })(e2.state), t2;
          }
          function Y(e2, t2, r2, n2, i2, s2) {
            if (!e2) return _;
            var a2 = 1;
            if (t2 === g && (t2 = 6), n2 < 0 ? (a2 = 0, n2 = -n2) : 15 < n2 && (a2 = 2, n2 -= 16), i2 < 1 || y < i2 || r2 !== v || n2 < 8 || 15 < n2 || t2 < 0 || 9 < t2 || s2 < 0 || b < s2) return R(e2, _);
            8 === n2 && (n2 = 9);
            var o2 = new H();
            return (e2.state = o2).strm = e2, o2.wrap = a2, o2.gzhead = null, o2.w_bits = n2, o2.w_size = 1 << o2.w_bits, o2.w_mask = o2.w_size - 1, o2.hash_bits = i2 + 7, o2.hash_size = 1 << o2.hash_bits, o2.hash_mask = o2.hash_size - 1, o2.hash_shift = ~~((o2.hash_bits + x - 1) / x), o2.window = new c.Buf8(2 * o2.w_size), o2.head = new c.Buf16(o2.hash_size), o2.prev = new c.Buf16(o2.w_size), o2.lit_bufsize = 1 << i2 + 6, o2.pending_buf_size = 4 * o2.lit_bufsize, o2.pending_buf = new c.Buf8(o2.pending_buf_size), o2.d_buf = 1 * o2.lit_bufsize, o2.l_buf = 3 * o2.lit_bufsize, o2.level = t2, o2.strategy = s2, o2.method = r2, K(e2);
          }
          h = [new M(0, 0, 0, 0, function(e2, t2) {
            var r2 = 65535;
            for (r2 > e2.pending_buf_size - 5 && (r2 = e2.pending_buf_size - 5); ; ) {
              if (e2.lookahead <= 1) {
                if (j(e2), 0 === e2.lookahead && t2 === l) return A;
                if (0 === e2.lookahead) break;
              }
              e2.strstart += e2.lookahead, e2.lookahead = 0;
              var n2 = e2.block_start + r2;
              if ((0 === e2.strstart || e2.strstart >= n2) && (e2.lookahead = e2.strstart - n2, e2.strstart = n2, N(e2, false), 0 === e2.strm.avail_out)) return A;
              if (e2.strstart - e2.block_start >= e2.w_size - z && (N(e2, false), 0 === e2.strm.avail_out)) return A;
            }
            return e2.insert = 0, t2 === f ? (N(e2, true), 0 === e2.strm.avail_out ? O : B) : (e2.strstart > e2.block_start && (N(e2, false), e2.strm.avail_out), A);
          }), new M(4, 4, 8, 4, Z), new M(4, 5, 16, 8, Z), new M(4, 6, 32, 32, Z), new M(4, 4, 16, 16, W), new M(8, 16, 32, 32, W), new M(8, 16, 128, 128, W), new M(8, 32, 128, 256, W), new M(32, 128, 258, 1024, W), new M(32, 258, 258, 4096, W)], r.deflateInit = function(e2, t2) {
            return Y(e2, t2, v, 15, 8, 0);
          }, r.deflateInit2 = Y, r.deflateReset = K, r.deflateResetKeep = G, r.deflateSetHeader = function(e2, t2) {
            return e2 && e2.state ? 2 !== e2.state.wrap ? _ : (e2.state.gzhead = t2, m) : _;
          }, r.deflate = function(e2, t2) {
            var r2, n2, i2, s2;
            if (!e2 || !e2.state || 5 < t2 || t2 < 0) return e2 ? R(e2, _) : _;
            if (n2 = e2.state, !e2.output || !e2.input && 0 !== e2.avail_in || 666 === n2.status && t2 !== f) return R(e2, 0 === e2.avail_out ? -5 : _);
            if (n2.strm = e2, r2 = n2.last_flush, n2.last_flush = t2, n2.status === C) if (2 === n2.wrap) e2.adler = 0, U(n2, 31), U(n2, 139), U(n2, 8), n2.gzhead ? (U(n2, (n2.gzhead.text ? 1 : 0) + (n2.gzhead.hcrc ? 2 : 0) + (n2.gzhead.extra ? 4 : 0) + (n2.gzhead.name ? 8 : 0) + (n2.gzhead.comment ? 16 : 0)), U(n2, 255 & n2.gzhead.time), U(n2, n2.gzhead.time >> 8 & 255), U(n2, n2.gzhead.time >> 16 & 255), U(n2, n2.gzhead.time >> 24 & 255), U(n2, 9 === n2.level ? 2 : 2 <= n2.strategy || n2.level < 2 ? 4 : 0), U(n2, 255 & n2.gzhead.os), n2.gzhead.extra && n2.gzhead.extra.length && (U(n2, 255 & n2.gzhead.extra.length), U(n2, n2.gzhead.extra.length >> 8 & 255)), n2.gzhead.hcrc && (e2.adler = p(e2.adler, n2.pending_buf, n2.pending, 0)), n2.gzindex = 0, n2.status = 69) : (U(n2, 0), U(n2, 0), U(n2, 0), U(n2, 0), U(n2, 0), U(n2, 9 === n2.level ? 2 : 2 <= n2.strategy || n2.level < 2 ? 4 : 0), U(n2, 3), n2.status = E);
            else {
              var a2 = v + (n2.w_bits - 8 << 4) << 8;
              a2 |= (2 <= n2.strategy || n2.level < 2 ? 0 : n2.level < 6 ? 1 : 6 === n2.level ? 2 : 3) << 6, 0 !== n2.strstart && (a2 |= 32), a2 += 31 - a2 % 31, n2.status = E, P2(n2, a2), 0 !== n2.strstart && (P2(n2, e2.adler >>> 16), P2(n2, 65535 & e2.adler)), e2.adler = 1;
            }
            if (69 === n2.status) if (n2.gzhead.extra) {
              for (i2 = n2.pending; n2.gzindex < (65535 & n2.gzhead.extra.length) && (n2.pending !== n2.pending_buf_size || (n2.gzhead.hcrc && n2.pending > i2 && (e2.adler = p(e2.adler, n2.pending_buf, n2.pending - i2, i2)), F(e2), i2 = n2.pending, n2.pending !== n2.pending_buf_size)); ) U(n2, 255 & n2.gzhead.extra[n2.gzindex]), n2.gzindex++;
              n2.gzhead.hcrc && n2.pending > i2 && (e2.adler = p(e2.adler, n2.pending_buf, n2.pending - i2, i2)), n2.gzindex === n2.gzhead.extra.length && (n2.gzindex = 0, n2.status = 73);
            } else n2.status = 73;
            if (73 === n2.status) if (n2.gzhead.name) {
              i2 = n2.pending;
              do {
                if (n2.pending === n2.pending_buf_size && (n2.gzhead.hcrc && n2.pending > i2 && (e2.adler = p(e2.adler, n2.pending_buf, n2.pending - i2, i2)), F(e2), i2 = n2.pending, n2.pending === n2.pending_buf_size)) {
                  s2 = 1;
                  break;
                }
                s2 = n2.gzindex < n2.gzhead.name.length ? 255 & n2.gzhead.name.charCodeAt(n2.gzindex++) : 0, U(n2, s2);
              } while (0 !== s2);
              n2.gzhead.hcrc && n2.pending > i2 && (e2.adler = p(e2.adler, n2.pending_buf, n2.pending - i2, i2)), 0 === s2 && (n2.gzindex = 0, n2.status = 91);
            } else n2.status = 91;
            if (91 === n2.status) if (n2.gzhead.comment) {
              i2 = n2.pending;
              do {
                if (n2.pending === n2.pending_buf_size && (n2.gzhead.hcrc && n2.pending > i2 && (e2.adler = p(e2.adler, n2.pending_buf, n2.pending - i2, i2)), F(e2), i2 = n2.pending, n2.pending === n2.pending_buf_size)) {
                  s2 = 1;
                  break;
                }
                s2 = n2.gzindex < n2.gzhead.comment.length ? 255 & n2.gzhead.comment.charCodeAt(n2.gzindex++) : 0, U(n2, s2);
              } while (0 !== s2);
              n2.gzhead.hcrc && n2.pending > i2 && (e2.adler = p(e2.adler, n2.pending_buf, n2.pending - i2, i2)), 0 === s2 && (n2.status = 103);
            } else n2.status = 103;
            if (103 === n2.status && (n2.gzhead.hcrc ? (n2.pending + 2 > n2.pending_buf_size && F(e2), n2.pending + 2 <= n2.pending_buf_size && (U(n2, 255 & e2.adler), U(n2, e2.adler >> 8 & 255), e2.adler = 0, n2.status = E)) : n2.status = E), 0 !== n2.pending) {
              if (F(e2), 0 === e2.avail_out) return n2.last_flush = -1, m;
            } else if (0 === e2.avail_in && T(t2) <= T(r2) && t2 !== f) return R(e2, -5);
            if (666 === n2.status && 0 !== e2.avail_in) return R(e2, -5);
            if (0 !== e2.avail_in || 0 !== n2.lookahead || t2 !== l && 666 !== n2.status) {
              var o2 = 2 === n2.strategy ? (function(e3, t3) {
                for (var r3; ; ) {
                  if (0 === e3.lookahead && (j(e3), 0 === e3.lookahead)) {
                    if (t3 === l) return A;
                    break;
                  }
                  if (e3.match_length = 0, r3 = u._tr_tally(e3, 0, e3.window[e3.strstart]), e3.lookahead--, e3.strstart++, r3 && (N(e3, false), 0 === e3.strm.avail_out)) return A;
                }
                return e3.insert = 0, t3 === f ? (N(e3, true), 0 === e3.strm.avail_out ? O : B) : e3.last_lit && (N(e3, false), 0 === e3.strm.avail_out) ? A : I;
              })(n2, t2) : 3 === n2.strategy ? (function(e3, t3) {
                for (var r3, n3, i3, s3, a3 = e3.window; ; ) {
                  if (e3.lookahead <= S) {
                    if (j(e3), e3.lookahead <= S && t3 === l) return A;
                    if (0 === e3.lookahead) break;
                  }
                  if (e3.match_length = 0, e3.lookahead >= x && 0 < e3.strstart && (n3 = a3[i3 = e3.strstart - 1]) === a3[++i3] && n3 === a3[++i3] && n3 === a3[++i3]) {
                    s3 = e3.strstart + S;
                    do {
                    } while (n3 === a3[++i3] && n3 === a3[++i3] && n3 === a3[++i3] && n3 === a3[++i3] && n3 === a3[++i3] && n3 === a3[++i3] && n3 === a3[++i3] && n3 === a3[++i3] && i3 < s3);
                    e3.match_length = S - (s3 - i3), e3.match_length > e3.lookahead && (e3.match_length = e3.lookahead);
                  }
                  if (e3.match_length >= x ? (r3 = u._tr_tally(e3, 1, e3.match_length - x), e3.lookahead -= e3.match_length, e3.strstart += e3.match_length, e3.match_length = 0) : (r3 = u._tr_tally(e3, 0, e3.window[e3.strstart]), e3.lookahead--, e3.strstart++), r3 && (N(e3, false), 0 === e3.strm.avail_out)) return A;
                }
                return e3.insert = 0, t3 === f ? (N(e3, true), 0 === e3.strm.avail_out ? O : B) : e3.last_lit && (N(e3, false), 0 === e3.strm.avail_out) ? A : I;
              })(n2, t2) : h[n2.level].func(n2, t2);
              if (o2 !== O && o2 !== B || (n2.status = 666), o2 === A || o2 === O) return 0 === e2.avail_out && (n2.last_flush = -1), m;
              if (o2 === I && (1 === t2 ? u._tr_align(n2) : 5 !== t2 && (u._tr_stored_block(n2, 0, 0, false), 3 === t2 && (D(n2.head), 0 === n2.lookahead && (n2.strstart = 0, n2.block_start = 0, n2.insert = 0))), F(e2), 0 === e2.avail_out)) return n2.last_flush = -1, m;
            }
            return t2 !== f ? m : n2.wrap <= 0 ? 1 : (2 === n2.wrap ? (U(n2, 255 & e2.adler), U(n2, e2.adler >> 8 & 255), U(n2, e2.adler >> 16 & 255), U(n2, e2.adler >> 24 & 255), U(n2, 255 & e2.total_in), U(n2, e2.total_in >> 8 & 255), U(n2, e2.total_in >> 16 & 255), U(n2, e2.total_in >> 24 & 255)) : (P2(n2, e2.adler >>> 16), P2(n2, 65535 & e2.adler)), F(e2), 0 < n2.wrap && (n2.wrap = -n2.wrap), 0 !== n2.pending ? m : 1);
          }, r.deflateEnd = function(e2) {
            var t2;
            return e2 && e2.state ? (t2 = e2.state.status) !== C && 69 !== t2 && 73 !== t2 && 91 !== t2 && 103 !== t2 && t2 !== E && 666 !== t2 ? R(e2, _) : (e2.state = null, t2 === E ? R(e2, -3) : m) : _;
          }, r.deflateSetDictionary = function(e2, t2) {
            var r2, n2, i2, s2, a2, o2, h2, u2, l2 = t2.length;
            if (!e2 || !e2.state) return _;
            if (2 === (s2 = (r2 = e2.state).wrap) || 1 === s2 && r2.status !== C || r2.lookahead) return _;
            for (1 === s2 && (e2.adler = d(e2.adler, t2, l2, 0)), r2.wrap = 0, l2 >= r2.w_size && (0 === s2 && (D(r2.head), r2.strstart = 0, r2.block_start = 0, r2.insert = 0), u2 = new c.Buf8(r2.w_size), c.arraySet(u2, t2, l2 - r2.w_size, r2.w_size, 0), t2 = u2, l2 = r2.w_size), a2 = e2.avail_in, o2 = e2.next_in, h2 = e2.input, e2.avail_in = l2, e2.next_in = 0, e2.input = t2, j(r2); r2.lookahead >= x; ) {
              for (n2 = r2.strstart, i2 = r2.lookahead - (x - 1); r2.ins_h = (r2.ins_h << r2.hash_shift ^ r2.window[n2 + x - 1]) & r2.hash_mask, r2.prev[n2 & r2.w_mask] = r2.head[r2.ins_h], r2.head[r2.ins_h] = n2, n2++, --i2; ) ;
              r2.strstart = n2, r2.lookahead = x - 1, j(r2);
            }
            return r2.strstart += r2.lookahead, r2.block_start = r2.strstart, r2.insert = r2.lookahead, r2.lookahead = 0, r2.match_length = r2.prev_length = x - 1, r2.match_available = 0, e2.next_in = o2, e2.input = h2, e2.avail_in = a2, r2.wrap = s2, m;
          }, r.deflateInfo = "pako deflate (from Nodeca project)";
        }, { "../utils/common": 41, "./adler32": 43, "./crc32": 45, "./messages": 51, "./trees": 52 }], 47: [function(e, t, r) {
          "use strict";
          t.exports = function() {
            this.text = 0, this.time = 0, this.xflags = 0, this.os = 0, this.extra = null, this.extra_len = 0, this.name = "", this.comment = "", this.hcrc = 0, this.done = false;
          };
        }, {}], 48: [function(e, t, r) {
          "use strict";
          t.exports = function(e2, t2) {
            var r2, n, i, s, a, o, h, u, l, f, c, d, p, m, _, g, b, v, y, w, k, x, S, z, C;
            r2 = e2.state, n = e2.next_in, z = e2.input, i = n + (e2.avail_in - 5), s = e2.next_out, C = e2.output, a = s - (t2 - e2.avail_out), o = s + (e2.avail_out - 257), h = r2.dmax, u = r2.wsize, l = r2.whave, f = r2.wnext, c = r2.window, d = r2.hold, p = r2.bits, m = r2.lencode, _ = r2.distcode, g = (1 << r2.lenbits) - 1, b = (1 << r2.distbits) - 1;
            e: do {
              p < 15 && (d += z[n++] << p, p += 8, d += z[n++] << p, p += 8), v = m[d & g];
              t: for (; ; ) {
                if (d >>>= y = v >>> 24, p -= y, 0 === (y = v >>> 16 & 255)) C[s++] = 65535 & v;
                else {
                  if (!(16 & y)) {
                    if (0 == (64 & y)) {
                      v = m[(65535 & v) + (d & (1 << y) - 1)];
                      continue t;
                    }
                    if (32 & y) {
                      r2.mode = 12;
                      break e;
                    }
                    e2.msg = "invalid literal/length code", r2.mode = 30;
                    break e;
                  }
                  w = 65535 & v, (y &= 15) && (p < y && (d += z[n++] << p, p += 8), w += d & (1 << y) - 1, d >>>= y, p -= y), p < 15 && (d += z[n++] << p, p += 8, d += z[n++] << p, p += 8), v = _[d & b];
                  r: for (; ; ) {
                    if (d >>>= y = v >>> 24, p -= y, !(16 & (y = v >>> 16 & 255))) {
                      if (0 == (64 & y)) {
                        v = _[(65535 & v) + (d & (1 << y) - 1)];
                        continue r;
                      }
                      e2.msg = "invalid distance code", r2.mode = 30;
                      break e;
                    }
                    if (k = 65535 & v, p < (y &= 15) && (d += z[n++] << p, (p += 8) < y && (d += z[n++] << p, p += 8)), h < (k += d & (1 << y) - 1)) {
                      e2.msg = "invalid distance too far back", r2.mode = 30;
                      break e;
                    }
                    if (d >>>= y, p -= y, (y = s - a) < k) {
                      if (l < (y = k - y) && r2.sane) {
                        e2.msg = "invalid distance too far back", r2.mode = 30;
                        break e;
                      }
                      if (S = c, (x = 0) === f) {
                        if (x += u - y, y < w) {
                          for (w -= y; C[s++] = c[x++], --y; ) ;
                          x = s - k, S = C;
                        }
                      } else if (f < y) {
                        if (x += u + f - y, (y -= f) < w) {
                          for (w -= y; C[s++] = c[x++], --y; ) ;
                          if (x = 0, f < w) {
                            for (w -= y = f; C[s++] = c[x++], --y; ) ;
                            x = s - k, S = C;
                          }
                        }
                      } else if (x += f - y, y < w) {
                        for (w -= y; C[s++] = c[x++], --y; ) ;
                        x = s - k, S = C;
                      }
                      for (; 2 < w; ) C[s++] = S[x++], C[s++] = S[x++], C[s++] = S[x++], w -= 3;
                      w && (C[s++] = S[x++], 1 < w && (C[s++] = S[x++]));
                    } else {
                      for (x = s - k; C[s++] = C[x++], C[s++] = C[x++], C[s++] = C[x++], 2 < (w -= 3); ) ;
                      w && (C[s++] = C[x++], 1 < w && (C[s++] = C[x++]));
                    }
                    break;
                  }
                }
                break;
              }
            } while (n < i && s < o);
            n -= w = p >> 3, d &= (1 << (p -= w << 3)) - 1, e2.next_in = n, e2.next_out = s, e2.avail_in = n < i ? i - n + 5 : 5 - (n - i), e2.avail_out = s < o ? o - s + 257 : 257 - (s - o), r2.hold = d, r2.bits = p;
          };
        }, {}], 49: [function(e, t, r) {
          "use strict";
          var I = e("../utils/common"), O = e("./adler32"), B = e("./crc32"), R = e("./inffast"), T = e("./inftrees"), D = 1, F = 2, N = 0, U = -2, P2 = 1, n = 852, i = 592;
          function L(e2) {
            return (e2 >>> 24 & 255) + (e2 >>> 8 & 65280) + ((65280 & e2) << 8) + ((255 & e2) << 24);
          }
          function s() {
            this.mode = 0, this.last = false, this.wrap = 0, this.havedict = false, this.flags = 0, this.dmax = 0, this.check = 0, this.total = 0, this.head = null, this.wbits = 0, this.wsize = 0, this.whave = 0, this.wnext = 0, this.window = null, this.hold = 0, this.bits = 0, this.length = 0, this.offset = 0, this.extra = 0, this.lencode = null, this.distcode = null, this.lenbits = 0, this.distbits = 0, this.ncode = 0, this.nlen = 0, this.ndist = 0, this.have = 0, this.next = null, this.lens = new I.Buf16(320), this.work = new I.Buf16(288), this.lendyn = null, this.distdyn = null, this.sane = 0, this.back = 0, this.was = 0;
          }
          function a(e2) {
            var t2;
            return e2 && e2.state ? (t2 = e2.state, e2.total_in = e2.total_out = t2.total = 0, e2.msg = "", t2.wrap && (e2.adler = 1 & t2.wrap), t2.mode = P2, t2.last = 0, t2.havedict = 0, t2.dmax = 32768, t2.head = null, t2.hold = 0, t2.bits = 0, t2.lencode = t2.lendyn = new I.Buf32(n), t2.distcode = t2.distdyn = new I.Buf32(i), t2.sane = 1, t2.back = -1, N) : U;
          }
          function o(e2) {
            var t2;
            return e2 && e2.state ? ((t2 = e2.state).wsize = 0, t2.whave = 0, t2.wnext = 0, a(e2)) : U;
          }
          function h(e2, t2) {
            var r2, n2;
            return e2 && e2.state ? (n2 = e2.state, t2 < 0 ? (r2 = 0, t2 = -t2) : (r2 = 1 + (t2 >> 4), t2 < 48 && (t2 &= 15)), t2 && (t2 < 8 || 15 < t2) ? U : (null !== n2.window && n2.wbits !== t2 && (n2.window = null), n2.wrap = r2, n2.wbits = t2, o(e2))) : U;
          }
          function u(e2, t2) {
            var r2, n2;
            return e2 ? (n2 = new s(), (e2.state = n2).window = null, (r2 = h(e2, t2)) !== N && (e2.state = null), r2) : U;
          }
          var l, f, c = true;
          function j(e2) {
            if (c) {
              var t2;
              for (l = new I.Buf32(512), f = new I.Buf32(32), t2 = 0; t2 < 144; ) e2.lens[t2++] = 8;
              for (; t2 < 256; ) e2.lens[t2++] = 9;
              for (; t2 < 280; ) e2.lens[t2++] = 7;
              for (; t2 < 288; ) e2.lens[t2++] = 8;
              for (T(D, e2.lens, 0, 288, l, 0, e2.work, { bits: 9 }), t2 = 0; t2 < 32; ) e2.lens[t2++] = 5;
              T(F, e2.lens, 0, 32, f, 0, e2.work, { bits: 5 }), c = false;
            }
            e2.lencode = l, e2.lenbits = 9, e2.distcode = f, e2.distbits = 5;
          }
          function Z(e2, t2, r2, n2) {
            var i2, s2 = e2.state;
            return null === s2.window && (s2.wsize = 1 << s2.wbits, s2.wnext = 0, s2.whave = 0, s2.window = new I.Buf8(s2.wsize)), n2 >= s2.wsize ? (I.arraySet(s2.window, t2, r2 - s2.wsize, s2.wsize, 0), s2.wnext = 0, s2.whave = s2.wsize) : (n2 < (i2 = s2.wsize - s2.wnext) && (i2 = n2), I.arraySet(s2.window, t2, r2 - n2, i2, s2.wnext), (n2 -= i2) ? (I.arraySet(s2.window, t2, r2 - n2, n2, 0), s2.wnext = n2, s2.whave = s2.wsize) : (s2.wnext += i2, s2.wnext === s2.wsize && (s2.wnext = 0), s2.whave < s2.wsize && (s2.whave += i2))), 0;
          }
          r.inflateReset = o, r.inflateReset2 = h, r.inflateResetKeep = a, r.inflateInit = function(e2) {
            return u(e2, 15);
          }, r.inflateInit2 = u, r.inflate = function(e2, t2) {
            var r2, n2, i2, s2, a2, o2, h2, u2, l2, f2, c2, d, p, m, _, g, b, v, y, w, k, x, S, z, C = 0, E = new I.Buf8(4), A = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];
            if (!e2 || !e2.state || !e2.output || !e2.input && 0 !== e2.avail_in) return U;
            12 === (r2 = e2.state).mode && (r2.mode = 13), a2 = e2.next_out, i2 = e2.output, h2 = e2.avail_out, s2 = e2.next_in, n2 = e2.input, o2 = e2.avail_in, u2 = r2.hold, l2 = r2.bits, f2 = o2, c2 = h2, x = N;
            e: for (; ; ) switch (r2.mode) {
              case P2:
                if (0 === r2.wrap) {
                  r2.mode = 13;
                  break;
                }
                for (; l2 < 16; ) {
                  if (0 === o2) break e;
                  o2--, u2 += n2[s2++] << l2, l2 += 8;
                }
                if (2 & r2.wrap && 35615 === u2) {
                  E[r2.check = 0] = 255 & u2, E[1] = u2 >>> 8 & 255, r2.check = B(r2.check, E, 2, 0), l2 = u2 = 0, r2.mode = 2;
                  break;
                }
                if (r2.flags = 0, r2.head && (r2.head.done = false), !(1 & r2.wrap) || (((255 & u2) << 8) + (u2 >> 8)) % 31) {
                  e2.msg = "incorrect header check", r2.mode = 30;
                  break;
                }
                if (8 != (15 & u2)) {
                  e2.msg = "unknown compression method", r2.mode = 30;
                  break;
                }
                if (l2 -= 4, k = 8 + (15 & (u2 >>>= 4)), 0 === r2.wbits) r2.wbits = k;
                else if (k > r2.wbits) {
                  e2.msg = "invalid window size", r2.mode = 30;
                  break;
                }
                r2.dmax = 1 << k, e2.adler = r2.check = 1, r2.mode = 512 & u2 ? 10 : 12, l2 = u2 = 0;
                break;
              case 2:
                for (; l2 < 16; ) {
                  if (0 === o2) break e;
                  o2--, u2 += n2[s2++] << l2, l2 += 8;
                }
                if (r2.flags = u2, 8 != (255 & r2.flags)) {
                  e2.msg = "unknown compression method", r2.mode = 30;
                  break;
                }
                if (57344 & r2.flags) {
                  e2.msg = "unknown header flags set", r2.mode = 30;
                  break;
                }
                r2.head && (r2.head.text = u2 >> 8 & 1), 512 & r2.flags && (E[0] = 255 & u2, E[1] = u2 >>> 8 & 255, r2.check = B(r2.check, E, 2, 0)), l2 = u2 = 0, r2.mode = 3;
              case 3:
                for (; l2 < 32; ) {
                  if (0 === o2) break e;
                  o2--, u2 += n2[s2++] << l2, l2 += 8;
                }
                r2.head && (r2.head.time = u2), 512 & r2.flags && (E[0] = 255 & u2, E[1] = u2 >>> 8 & 255, E[2] = u2 >>> 16 & 255, E[3] = u2 >>> 24 & 255, r2.check = B(r2.check, E, 4, 0)), l2 = u2 = 0, r2.mode = 4;
              case 4:
                for (; l2 < 16; ) {
                  if (0 === o2) break e;
                  o2--, u2 += n2[s2++] << l2, l2 += 8;
                }
                r2.head && (r2.head.xflags = 255 & u2, r2.head.os = u2 >> 8), 512 & r2.flags && (E[0] = 255 & u2, E[1] = u2 >>> 8 & 255, r2.check = B(r2.check, E, 2, 0)), l2 = u2 = 0, r2.mode = 5;
              case 5:
                if (1024 & r2.flags) {
                  for (; l2 < 16; ) {
                    if (0 === o2) break e;
                    o2--, u2 += n2[s2++] << l2, l2 += 8;
                  }
                  r2.length = u2, r2.head && (r2.head.extra_len = u2), 512 & r2.flags && (E[0] = 255 & u2, E[1] = u2 >>> 8 & 255, r2.check = B(r2.check, E, 2, 0)), l2 = u2 = 0;
                } else r2.head && (r2.head.extra = null);
                r2.mode = 6;
              case 6:
                if (1024 & r2.flags && (o2 < (d = r2.length) && (d = o2), d && (r2.head && (k = r2.head.extra_len - r2.length, r2.head.extra || (r2.head.extra = new Array(r2.head.extra_len)), I.arraySet(r2.head.extra, n2, s2, d, k)), 512 & r2.flags && (r2.check = B(r2.check, n2, d, s2)), o2 -= d, s2 += d, r2.length -= d), r2.length)) break e;
                r2.length = 0, r2.mode = 7;
              case 7:
                if (2048 & r2.flags) {
                  if (0 === o2) break e;
                  for (d = 0; k = n2[s2 + d++], r2.head && k && r2.length < 65536 && (r2.head.name += String.fromCharCode(k)), k && d < o2; ) ;
                  if (512 & r2.flags && (r2.check = B(r2.check, n2, d, s2)), o2 -= d, s2 += d, k) break e;
                } else r2.head && (r2.head.name = null);
                r2.length = 0, r2.mode = 8;
              case 8:
                if (4096 & r2.flags) {
                  if (0 === o2) break e;
                  for (d = 0; k = n2[s2 + d++], r2.head && k && r2.length < 65536 && (r2.head.comment += String.fromCharCode(k)), k && d < o2; ) ;
                  if (512 & r2.flags && (r2.check = B(r2.check, n2, d, s2)), o2 -= d, s2 += d, k) break e;
                } else r2.head && (r2.head.comment = null);
                r2.mode = 9;
              case 9:
                if (512 & r2.flags) {
                  for (; l2 < 16; ) {
                    if (0 === o2) break e;
                    o2--, u2 += n2[s2++] << l2, l2 += 8;
                  }
                  if (u2 !== (65535 & r2.check)) {
                    e2.msg = "header crc mismatch", r2.mode = 30;
                    break;
                  }
                  l2 = u2 = 0;
                }
                r2.head && (r2.head.hcrc = r2.flags >> 9 & 1, r2.head.done = true), e2.adler = r2.check = 0, r2.mode = 12;
                break;
              case 10:
                for (; l2 < 32; ) {
                  if (0 === o2) break e;
                  o2--, u2 += n2[s2++] << l2, l2 += 8;
                }
                e2.adler = r2.check = L(u2), l2 = u2 = 0, r2.mode = 11;
              case 11:
                if (0 === r2.havedict) return e2.next_out = a2, e2.avail_out = h2, e2.next_in = s2, e2.avail_in = o2, r2.hold = u2, r2.bits = l2, 2;
                e2.adler = r2.check = 1, r2.mode = 12;
              case 12:
                if (5 === t2 || 6 === t2) break e;
              case 13:
                if (r2.last) {
                  u2 >>>= 7 & l2, l2 -= 7 & l2, r2.mode = 27;
                  break;
                }
                for (; l2 < 3; ) {
                  if (0 === o2) break e;
                  o2--, u2 += n2[s2++] << l2, l2 += 8;
                }
                switch (r2.last = 1 & u2, l2 -= 1, 3 & (u2 >>>= 1)) {
                  case 0:
                    r2.mode = 14;
                    break;
                  case 1:
                    if (j(r2), r2.mode = 20, 6 !== t2) break;
                    u2 >>>= 2, l2 -= 2;
                    break e;
                  case 2:
                    r2.mode = 17;
                    break;
                  case 3:
                    e2.msg = "invalid block type", r2.mode = 30;
                }
                u2 >>>= 2, l2 -= 2;
                break;
              case 14:
                for (u2 >>>= 7 & l2, l2 -= 7 & l2; l2 < 32; ) {
                  if (0 === o2) break e;
                  o2--, u2 += n2[s2++] << l2, l2 += 8;
                }
                if ((65535 & u2) != (u2 >>> 16 ^ 65535)) {
                  e2.msg = "invalid stored block lengths", r2.mode = 30;
                  break;
                }
                if (r2.length = 65535 & u2, l2 = u2 = 0, r2.mode = 15, 6 === t2) break e;
              case 15:
                r2.mode = 16;
              case 16:
                if (d = r2.length) {
                  if (o2 < d && (d = o2), h2 < d && (d = h2), 0 === d) break e;
                  I.arraySet(i2, n2, s2, d, a2), o2 -= d, s2 += d, h2 -= d, a2 += d, r2.length -= d;
                  break;
                }
                r2.mode = 12;
                break;
              case 17:
                for (; l2 < 14; ) {
                  if (0 === o2) break e;
                  o2--, u2 += n2[s2++] << l2, l2 += 8;
                }
                if (r2.nlen = 257 + (31 & u2), u2 >>>= 5, l2 -= 5, r2.ndist = 1 + (31 & u2), u2 >>>= 5, l2 -= 5, r2.ncode = 4 + (15 & u2), u2 >>>= 4, l2 -= 4, 286 < r2.nlen || 30 < r2.ndist) {
                  e2.msg = "too many length or distance symbols", r2.mode = 30;
                  break;
                }
                r2.have = 0, r2.mode = 18;
              case 18:
                for (; r2.have < r2.ncode; ) {
                  for (; l2 < 3; ) {
                    if (0 === o2) break e;
                    o2--, u2 += n2[s2++] << l2, l2 += 8;
                  }
                  r2.lens[A[r2.have++]] = 7 & u2, u2 >>>= 3, l2 -= 3;
                }
                for (; r2.have < 19; ) r2.lens[A[r2.have++]] = 0;
                if (r2.lencode = r2.lendyn, r2.lenbits = 7, S = { bits: r2.lenbits }, x = T(0, r2.lens, 0, 19, r2.lencode, 0, r2.work, S), r2.lenbits = S.bits, x) {
                  e2.msg = "invalid code lengths set", r2.mode = 30;
                  break;
                }
                r2.have = 0, r2.mode = 19;
              case 19:
                for (; r2.have < r2.nlen + r2.ndist; ) {
                  for (; g = (C = r2.lencode[u2 & (1 << r2.lenbits) - 1]) >>> 16 & 255, b = 65535 & C, !((_ = C >>> 24) <= l2); ) {
                    if (0 === o2) break e;
                    o2--, u2 += n2[s2++] << l2, l2 += 8;
                  }
                  if (b < 16) u2 >>>= _, l2 -= _, r2.lens[r2.have++] = b;
                  else {
                    if (16 === b) {
                      for (z = _ + 2; l2 < z; ) {
                        if (0 === o2) break e;
                        o2--, u2 += n2[s2++] << l2, l2 += 8;
                      }
                      if (u2 >>>= _, l2 -= _, 0 === r2.have) {
                        e2.msg = "invalid bit length repeat", r2.mode = 30;
                        break;
                      }
                      k = r2.lens[r2.have - 1], d = 3 + (3 & u2), u2 >>>= 2, l2 -= 2;
                    } else if (17 === b) {
                      for (z = _ + 3; l2 < z; ) {
                        if (0 === o2) break e;
                        o2--, u2 += n2[s2++] << l2, l2 += 8;
                      }
                      l2 -= _, k = 0, d = 3 + (7 & (u2 >>>= _)), u2 >>>= 3, l2 -= 3;
                    } else {
                      for (z = _ + 7; l2 < z; ) {
                        if (0 === o2) break e;
                        o2--, u2 += n2[s2++] << l2, l2 += 8;
                      }
                      l2 -= _, k = 0, d = 11 + (127 & (u2 >>>= _)), u2 >>>= 7, l2 -= 7;
                    }
                    if (r2.have + d > r2.nlen + r2.ndist) {
                      e2.msg = "invalid bit length repeat", r2.mode = 30;
                      break;
                    }
                    for (; d--; ) r2.lens[r2.have++] = k;
                  }
                }
                if (30 === r2.mode) break;
                if (0 === r2.lens[256]) {
                  e2.msg = "invalid code -- missing end-of-block", r2.mode = 30;
                  break;
                }
                if (r2.lenbits = 9, S = { bits: r2.lenbits }, x = T(D, r2.lens, 0, r2.nlen, r2.lencode, 0, r2.work, S), r2.lenbits = S.bits, x) {
                  e2.msg = "invalid literal/lengths set", r2.mode = 30;
                  break;
                }
                if (r2.distbits = 6, r2.distcode = r2.distdyn, S = { bits: r2.distbits }, x = T(F, r2.lens, r2.nlen, r2.ndist, r2.distcode, 0, r2.work, S), r2.distbits = S.bits, x) {
                  e2.msg = "invalid distances set", r2.mode = 30;
                  break;
                }
                if (r2.mode = 20, 6 === t2) break e;
              case 20:
                r2.mode = 21;
              case 21:
                if (6 <= o2 && 258 <= h2) {
                  e2.next_out = a2, e2.avail_out = h2, e2.next_in = s2, e2.avail_in = o2, r2.hold = u2, r2.bits = l2, R(e2, c2), a2 = e2.next_out, i2 = e2.output, h2 = e2.avail_out, s2 = e2.next_in, n2 = e2.input, o2 = e2.avail_in, u2 = r2.hold, l2 = r2.bits, 12 === r2.mode && (r2.back = -1);
                  break;
                }
                for (r2.back = 0; g = (C = r2.lencode[u2 & (1 << r2.lenbits) - 1]) >>> 16 & 255, b = 65535 & C, !((_ = C >>> 24) <= l2); ) {
                  if (0 === o2) break e;
                  o2--, u2 += n2[s2++] << l2, l2 += 8;
                }
                if (g && 0 == (240 & g)) {
                  for (v = _, y = g, w = b; g = (C = r2.lencode[w + ((u2 & (1 << v + y) - 1) >> v)]) >>> 16 & 255, b = 65535 & C, !(v + (_ = C >>> 24) <= l2); ) {
                    if (0 === o2) break e;
                    o2--, u2 += n2[s2++] << l2, l2 += 8;
                  }
                  u2 >>>= v, l2 -= v, r2.back += v;
                }
                if (u2 >>>= _, l2 -= _, r2.back += _, r2.length = b, 0 === g) {
                  r2.mode = 26;
                  break;
                }
                if (32 & g) {
                  r2.back = -1, r2.mode = 12;
                  break;
                }
                if (64 & g) {
                  e2.msg = "invalid literal/length code", r2.mode = 30;
                  break;
                }
                r2.extra = 15 & g, r2.mode = 22;
              case 22:
                if (r2.extra) {
                  for (z = r2.extra; l2 < z; ) {
                    if (0 === o2) break e;
                    o2--, u2 += n2[s2++] << l2, l2 += 8;
                  }
                  r2.length += u2 & (1 << r2.extra) - 1, u2 >>>= r2.extra, l2 -= r2.extra, r2.back += r2.extra;
                }
                r2.was = r2.length, r2.mode = 23;
              case 23:
                for (; g = (C = r2.distcode[u2 & (1 << r2.distbits) - 1]) >>> 16 & 255, b = 65535 & C, !((_ = C >>> 24) <= l2); ) {
                  if (0 === o2) break e;
                  o2--, u2 += n2[s2++] << l2, l2 += 8;
                }
                if (0 == (240 & g)) {
                  for (v = _, y = g, w = b; g = (C = r2.distcode[w + ((u2 & (1 << v + y) - 1) >> v)]) >>> 16 & 255, b = 65535 & C, !(v + (_ = C >>> 24) <= l2); ) {
                    if (0 === o2) break e;
                    o2--, u2 += n2[s2++] << l2, l2 += 8;
                  }
                  u2 >>>= v, l2 -= v, r2.back += v;
                }
                if (u2 >>>= _, l2 -= _, r2.back += _, 64 & g) {
                  e2.msg = "invalid distance code", r2.mode = 30;
                  break;
                }
                r2.offset = b, r2.extra = 15 & g, r2.mode = 24;
              case 24:
                if (r2.extra) {
                  for (z = r2.extra; l2 < z; ) {
                    if (0 === o2) break e;
                    o2--, u2 += n2[s2++] << l2, l2 += 8;
                  }
                  r2.offset += u2 & (1 << r2.extra) - 1, u2 >>>= r2.extra, l2 -= r2.extra, r2.back += r2.extra;
                }
                if (r2.offset > r2.dmax) {
                  e2.msg = "invalid distance too far back", r2.mode = 30;
                  break;
                }
                r2.mode = 25;
              case 25:
                if (0 === h2) break e;
                if (d = c2 - h2, r2.offset > d) {
                  if ((d = r2.offset - d) > r2.whave && r2.sane) {
                    e2.msg = "invalid distance too far back", r2.mode = 30;
                    break;
                  }
                  p = d > r2.wnext ? (d -= r2.wnext, r2.wsize - d) : r2.wnext - d, d > r2.length && (d = r2.length), m = r2.window;
                } else m = i2, p = a2 - r2.offset, d = r2.length;
                for (h2 < d && (d = h2), h2 -= d, r2.length -= d; i2[a2++] = m[p++], --d; ) ;
                0 === r2.length && (r2.mode = 21);
                break;
              case 26:
                if (0 === h2) break e;
                i2[a2++] = r2.length, h2--, r2.mode = 21;
                break;
              case 27:
                if (r2.wrap) {
                  for (; l2 < 32; ) {
                    if (0 === o2) break e;
                    o2--, u2 |= n2[s2++] << l2, l2 += 8;
                  }
                  if (c2 -= h2, e2.total_out += c2, r2.total += c2, c2 && (e2.adler = r2.check = r2.flags ? B(r2.check, i2, c2, a2 - c2) : O(r2.check, i2, c2, a2 - c2)), c2 = h2, (r2.flags ? u2 : L(u2)) !== r2.check) {
                    e2.msg = "incorrect data check", r2.mode = 30;
                    break;
                  }
                  l2 = u2 = 0;
                }
                r2.mode = 28;
              case 28:
                if (r2.wrap && r2.flags) {
                  for (; l2 < 32; ) {
                    if (0 === o2) break e;
                    o2--, u2 += n2[s2++] << l2, l2 += 8;
                  }
                  if (u2 !== (4294967295 & r2.total)) {
                    e2.msg = "incorrect length check", r2.mode = 30;
                    break;
                  }
                  l2 = u2 = 0;
                }
                r2.mode = 29;
              case 29:
                x = 1;
                break e;
              case 30:
                x = -3;
                break e;
              case 31:
                return -4;
              case 32:
              default:
                return U;
            }
            return e2.next_out = a2, e2.avail_out = h2, e2.next_in = s2, e2.avail_in = o2, r2.hold = u2, r2.bits = l2, (r2.wsize || c2 !== e2.avail_out && r2.mode < 30 && (r2.mode < 27 || 4 !== t2)) && Z(e2, e2.output, e2.next_out, c2 - e2.avail_out) ? (r2.mode = 31, -4) : (f2 -= e2.avail_in, c2 -= e2.avail_out, e2.total_in += f2, e2.total_out += c2, r2.total += c2, r2.wrap && c2 && (e2.adler = r2.check = r2.flags ? B(r2.check, i2, c2, e2.next_out - c2) : O(r2.check, i2, c2, e2.next_out - c2)), e2.data_type = r2.bits + (r2.last ? 64 : 0) + (12 === r2.mode ? 128 : 0) + (20 === r2.mode || 15 === r2.mode ? 256 : 0), (0 == f2 && 0 === c2 || 4 === t2) && x === N && (x = -5), x);
          }, r.inflateEnd = function(e2) {
            if (!e2 || !e2.state) return U;
            var t2 = e2.state;
            return t2.window && (t2.window = null), e2.state = null, N;
          }, r.inflateGetHeader = function(e2, t2) {
            var r2;
            return e2 && e2.state ? 0 == (2 & (r2 = e2.state).wrap) ? U : ((r2.head = t2).done = false, N) : U;
          }, r.inflateSetDictionary = function(e2, t2) {
            var r2, n2 = t2.length;
            return e2 && e2.state ? 0 !== (r2 = e2.state).wrap && 11 !== r2.mode ? U : 11 === r2.mode && O(1, t2, n2, 0) !== r2.check ? -3 : Z(e2, t2, n2, n2) ? (r2.mode = 31, -4) : (r2.havedict = 1, N) : U;
          }, r.inflateInfo = "pako inflate (from Nodeca project)";
        }, { "../utils/common": 41, "./adler32": 43, "./crc32": 45, "./inffast": 48, "./inftrees": 50 }], 50: [function(e, t, r) {
          "use strict";
          var D = e("../utils/common"), F = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0], N = [16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18, 19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 72, 78], U = [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577, 0, 0], P2 = [16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 64, 64];
          t.exports = function(e2, t2, r2, n, i, s, a, o) {
            var h, u, l, f, c, d, p, m, _, g = o.bits, b = 0, v = 0, y = 0, w = 0, k = 0, x = 0, S = 0, z = 0, C = 0, E = 0, A = null, I = 0, O = new D.Buf16(16), B = new D.Buf16(16), R = null, T = 0;
            for (b = 0; b <= 15; b++) O[b] = 0;
            for (v = 0; v < n; v++) O[t2[r2 + v]]++;
            for (k = g, w = 15; 1 <= w && 0 === O[w]; w--) ;
            if (w < k && (k = w), 0 === w) return i[s++] = 20971520, i[s++] = 20971520, o.bits = 1, 0;
            for (y = 1; y < w && 0 === O[y]; y++) ;
            for (k < y && (k = y), b = z = 1; b <= 15; b++) if (z <<= 1, (z -= O[b]) < 0) return -1;
            if (0 < z && (0 === e2 || 1 !== w)) return -1;
            for (B[1] = 0, b = 1; b < 15; b++) B[b + 1] = B[b] + O[b];
            for (v = 0; v < n; v++) 0 !== t2[r2 + v] && (a[B[t2[r2 + v]]++] = v);
            if (d = 0 === e2 ? (A = R = a, 19) : 1 === e2 ? (A = F, I -= 257, R = N, T -= 257, 256) : (A = U, R = P2, -1), b = y, c = s, S = v = E = 0, l = -1, f = (C = 1 << (x = k)) - 1, 1 === e2 && 852 < C || 2 === e2 && 592 < C) return 1;
            for (; ; ) {
              for (p = b - S, _ = a[v] < d ? (m = 0, a[v]) : a[v] > d ? (m = R[T + a[v]], A[I + a[v]]) : (m = 96, 0), h = 1 << b - S, y = u = 1 << x; i[c + (E >> S) + (u -= h)] = p << 24 | m << 16 | _ | 0, 0 !== u; ) ;
              for (h = 1 << b - 1; E & h; ) h >>= 1;
              if (0 !== h ? (E &= h - 1, E += h) : E = 0, v++, 0 == --O[b]) {
                if (b === w) break;
                b = t2[r2 + a[v]];
              }
              if (k < b && (E & f) !== l) {
                for (0 === S && (S = k), c += y, z = 1 << (x = b - S); x + S < w && !((z -= O[x + S]) <= 0); ) x++, z <<= 1;
                if (C += 1 << x, 1 === e2 && 852 < C || 2 === e2 && 592 < C) return 1;
                i[l = E & f] = k << 24 | x << 16 | c - s | 0;
              }
            }
            return 0 !== E && (i[c + E] = b - S << 24 | 64 << 16 | 0), o.bits = k, 0;
          };
        }, { "../utils/common": 41 }], 51: [function(e, t, r) {
          "use strict";
          t.exports = { 2: "need dictionary", 1: "stream end", 0: "", "-1": "file error", "-2": "stream error", "-3": "data error", "-4": "insufficient memory", "-5": "buffer error", "-6": "incompatible version" };
        }, {}], 52: [function(e, t, r) {
          "use strict";
          var i = e("../utils/common"), o = 0, h = 1;
          function n(e2) {
            for (var t2 = e2.length; 0 <= --t2; ) e2[t2] = 0;
          }
          var s = 0, a = 29, u = 256, l = u + 1 + a, f = 30, c = 19, _ = 2 * l + 1, g = 15, d = 16, p = 7, m = 256, b = 16, v = 17, y = 18, w = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0], k = [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13], x = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7], S = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15], z = new Array(2 * (l + 2));
          n(z);
          var C = new Array(2 * f);
          n(C);
          var E = new Array(512);
          n(E);
          var A = new Array(256);
          n(A);
          var I = new Array(a);
          n(I);
          var O, B, R, T = new Array(f);
          function D(e2, t2, r2, n2, i2) {
            this.static_tree = e2, this.extra_bits = t2, this.extra_base = r2, this.elems = n2, this.max_length = i2, this.has_stree = e2 && e2.length;
          }
          function F(e2, t2) {
            this.dyn_tree = e2, this.max_code = 0, this.stat_desc = t2;
          }
          function N(e2) {
            return e2 < 256 ? E[e2] : E[256 + (e2 >>> 7)];
          }
          function U(e2, t2) {
            e2.pending_buf[e2.pending++] = 255 & t2, e2.pending_buf[e2.pending++] = t2 >>> 8 & 255;
          }
          function P2(e2, t2, r2) {
            e2.bi_valid > d - r2 ? (e2.bi_buf |= t2 << e2.bi_valid & 65535, U(e2, e2.bi_buf), e2.bi_buf = t2 >> d - e2.bi_valid, e2.bi_valid += r2 - d) : (e2.bi_buf |= t2 << e2.bi_valid & 65535, e2.bi_valid += r2);
          }
          function L(e2, t2, r2) {
            P2(e2, r2[2 * t2], r2[2 * t2 + 1]);
          }
          function j(e2, t2) {
            for (var r2 = 0; r2 |= 1 & e2, e2 >>>= 1, r2 <<= 1, 0 < --t2; ) ;
            return r2 >>> 1;
          }
          function Z(e2, t2, r2) {
            var n2, i2, s2 = new Array(g + 1), a2 = 0;
            for (n2 = 1; n2 <= g; n2++) s2[n2] = a2 = a2 + r2[n2 - 1] << 1;
            for (i2 = 0; i2 <= t2; i2++) {
              var o2 = e2[2 * i2 + 1];
              0 !== o2 && (e2[2 * i2] = j(s2[o2]++, o2));
            }
          }
          function W(e2) {
            var t2;
            for (t2 = 0; t2 < l; t2++) e2.dyn_ltree[2 * t2] = 0;
            for (t2 = 0; t2 < f; t2++) e2.dyn_dtree[2 * t2] = 0;
            for (t2 = 0; t2 < c; t2++) e2.bl_tree[2 * t2] = 0;
            e2.dyn_ltree[2 * m] = 1, e2.opt_len = e2.static_len = 0, e2.last_lit = e2.matches = 0;
          }
          function M(e2) {
            8 < e2.bi_valid ? U(e2, e2.bi_buf) : 0 < e2.bi_valid && (e2.pending_buf[e2.pending++] = e2.bi_buf), e2.bi_buf = 0, e2.bi_valid = 0;
          }
          function H(e2, t2, r2, n2) {
            var i2 = 2 * t2, s2 = 2 * r2;
            return e2[i2] < e2[s2] || e2[i2] === e2[s2] && n2[t2] <= n2[r2];
          }
          function G(e2, t2, r2) {
            for (var n2 = e2.heap[r2], i2 = r2 << 1; i2 <= e2.heap_len && (i2 < e2.heap_len && H(t2, e2.heap[i2 + 1], e2.heap[i2], e2.depth) && i2++, !H(t2, n2, e2.heap[i2], e2.depth)); ) e2.heap[r2] = e2.heap[i2], r2 = i2, i2 <<= 1;
            e2.heap[r2] = n2;
          }
          function K(e2, t2, r2) {
            var n2, i2, s2, a2, o2 = 0;
            if (0 !== e2.last_lit) for (; n2 = e2.pending_buf[e2.d_buf + 2 * o2] << 8 | e2.pending_buf[e2.d_buf + 2 * o2 + 1], i2 = e2.pending_buf[e2.l_buf + o2], o2++, 0 === n2 ? L(e2, i2, t2) : (L(e2, (s2 = A[i2]) + u + 1, t2), 0 !== (a2 = w[s2]) && P2(e2, i2 -= I[s2], a2), L(e2, s2 = N(--n2), r2), 0 !== (a2 = k[s2]) && P2(e2, n2 -= T[s2], a2)), o2 < e2.last_lit; ) ;
            L(e2, m, t2);
          }
          function Y(e2, t2) {
            var r2, n2, i2, s2 = t2.dyn_tree, a2 = t2.stat_desc.static_tree, o2 = t2.stat_desc.has_stree, h2 = t2.stat_desc.elems, u2 = -1;
            for (e2.heap_len = 0, e2.heap_max = _, r2 = 0; r2 < h2; r2++) 0 !== s2[2 * r2] ? (e2.heap[++e2.heap_len] = u2 = r2, e2.depth[r2] = 0) : s2[2 * r2 + 1] = 0;
            for (; e2.heap_len < 2; ) s2[2 * (i2 = e2.heap[++e2.heap_len] = u2 < 2 ? ++u2 : 0)] = 1, e2.depth[i2] = 0, e2.opt_len--, o2 && (e2.static_len -= a2[2 * i2 + 1]);
            for (t2.max_code = u2, r2 = e2.heap_len >> 1; 1 <= r2; r2--) G(e2, s2, r2);
            for (i2 = h2; r2 = e2.heap[1], e2.heap[1] = e2.heap[e2.heap_len--], G(e2, s2, 1), n2 = e2.heap[1], e2.heap[--e2.heap_max] = r2, e2.heap[--e2.heap_max] = n2, s2[2 * i2] = s2[2 * r2] + s2[2 * n2], e2.depth[i2] = (e2.depth[r2] >= e2.depth[n2] ? e2.depth[r2] : e2.depth[n2]) + 1, s2[2 * r2 + 1] = s2[2 * n2 + 1] = i2, e2.heap[1] = i2++, G(e2, s2, 1), 2 <= e2.heap_len; ) ;
            e2.heap[--e2.heap_max] = e2.heap[1], (function(e3, t3) {
              var r3, n3, i3, s3, a3, o3, h3 = t3.dyn_tree, u3 = t3.max_code, l2 = t3.stat_desc.static_tree, f2 = t3.stat_desc.has_stree, c2 = t3.stat_desc.extra_bits, d2 = t3.stat_desc.extra_base, p2 = t3.stat_desc.max_length, m2 = 0;
              for (s3 = 0; s3 <= g; s3++) e3.bl_count[s3] = 0;
              for (h3[2 * e3.heap[e3.heap_max] + 1] = 0, r3 = e3.heap_max + 1; r3 < _; r3++) p2 < (s3 = h3[2 * h3[2 * (n3 = e3.heap[r3]) + 1] + 1] + 1) && (s3 = p2, m2++), h3[2 * n3 + 1] = s3, u3 < n3 || (e3.bl_count[s3]++, a3 = 0, d2 <= n3 && (a3 = c2[n3 - d2]), o3 = h3[2 * n3], e3.opt_len += o3 * (s3 + a3), f2 && (e3.static_len += o3 * (l2[2 * n3 + 1] + a3)));
              if (0 !== m2) {
                do {
                  for (s3 = p2 - 1; 0 === e3.bl_count[s3]; ) s3--;
                  e3.bl_count[s3]--, e3.bl_count[s3 + 1] += 2, e3.bl_count[p2]--, m2 -= 2;
                } while (0 < m2);
                for (s3 = p2; 0 !== s3; s3--) for (n3 = e3.bl_count[s3]; 0 !== n3; ) u3 < (i3 = e3.heap[--r3]) || (h3[2 * i3 + 1] !== s3 && (e3.opt_len += (s3 - h3[2 * i3 + 1]) * h3[2 * i3], h3[2 * i3 + 1] = s3), n3--);
              }
            })(e2, t2), Z(s2, u2, e2.bl_count);
          }
          function X(e2, t2, r2) {
            var n2, i2, s2 = -1, a2 = t2[1], o2 = 0, h2 = 7, u2 = 4;
            for (0 === a2 && (h2 = 138, u2 = 3), t2[2 * (r2 + 1) + 1] = 65535, n2 = 0; n2 <= r2; n2++) i2 = a2, a2 = t2[2 * (n2 + 1) + 1], ++o2 < h2 && i2 === a2 || (o2 < u2 ? e2.bl_tree[2 * i2] += o2 : 0 !== i2 ? (i2 !== s2 && e2.bl_tree[2 * i2]++, e2.bl_tree[2 * b]++) : o2 <= 10 ? e2.bl_tree[2 * v]++ : e2.bl_tree[2 * y]++, s2 = i2, u2 = (o2 = 0) === a2 ? (h2 = 138, 3) : i2 === a2 ? (h2 = 6, 3) : (h2 = 7, 4));
          }
          function V(e2, t2, r2) {
            var n2, i2, s2 = -1, a2 = t2[1], o2 = 0, h2 = 7, u2 = 4;
            for (0 === a2 && (h2 = 138, u2 = 3), n2 = 0; n2 <= r2; n2++) if (i2 = a2, a2 = t2[2 * (n2 + 1) + 1], !(++o2 < h2 && i2 === a2)) {
              if (o2 < u2) for (; L(e2, i2, e2.bl_tree), 0 != --o2; ) ;
              else 0 !== i2 ? (i2 !== s2 && (L(e2, i2, e2.bl_tree), o2--), L(e2, b, e2.bl_tree), P2(e2, o2 - 3, 2)) : o2 <= 10 ? (L(e2, v, e2.bl_tree), P2(e2, o2 - 3, 3)) : (L(e2, y, e2.bl_tree), P2(e2, o2 - 11, 7));
              s2 = i2, u2 = (o2 = 0) === a2 ? (h2 = 138, 3) : i2 === a2 ? (h2 = 6, 3) : (h2 = 7, 4);
            }
          }
          n(T);
          var q = false;
          function J(e2, t2, r2, n2) {
            P2(e2, (s << 1) + (n2 ? 1 : 0), 3), (function(e3, t3, r3, n3) {
              M(e3), n3 && (U(e3, r3), U(e3, ~r3)), i.arraySet(e3.pending_buf, e3.window, t3, r3, e3.pending), e3.pending += r3;
            })(e2, t2, r2, true);
          }
          r._tr_init = function(e2) {
            q || ((function() {
              var e3, t2, r2, n2, i2, s2 = new Array(g + 1);
              for (n2 = r2 = 0; n2 < a - 1; n2++) for (I[n2] = r2, e3 = 0; e3 < 1 << w[n2]; e3++) A[r2++] = n2;
              for (A[r2 - 1] = n2, n2 = i2 = 0; n2 < 16; n2++) for (T[n2] = i2, e3 = 0; e3 < 1 << k[n2]; e3++) E[i2++] = n2;
              for (i2 >>= 7; n2 < f; n2++) for (T[n2] = i2 << 7, e3 = 0; e3 < 1 << k[n2] - 7; e3++) E[256 + i2++] = n2;
              for (t2 = 0; t2 <= g; t2++) s2[t2] = 0;
              for (e3 = 0; e3 <= 143; ) z[2 * e3 + 1] = 8, e3++, s2[8]++;
              for (; e3 <= 255; ) z[2 * e3 + 1] = 9, e3++, s2[9]++;
              for (; e3 <= 279; ) z[2 * e3 + 1] = 7, e3++, s2[7]++;
              for (; e3 <= 287; ) z[2 * e3 + 1] = 8, e3++, s2[8]++;
              for (Z(z, l + 1, s2), e3 = 0; e3 < f; e3++) C[2 * e3 + 1] = 5, C[2 * e3] = j(e3, 5);
              O = new D(z, w, u + 1, l, g), B = new D(C, k, 0, f, g), R = new D(new Array(0), x, 0, c, p);
            })(), q = true), e2.l_desc = new F(e2.dyn_ltree, O), e2.d_desc = new F(e2.dyn_dtree, B), e2.bl_desc = new F(e2.bl_tree, R), e2.bi_buf = 0, e2.bi_valid = 0, W(e2);
          }, r._tr_stored_block = J, r._tr_flush_block = function(e2, t2, r2, n2) {
            var i2, s2, a2 = 0;
            0 < e2.level ? (2 === e2.strm.data_type && (e2.strm.data_type = (function(e3) {
              var t3, r3 = 4093624447;
              for (t3 = 0; t3 <= 31; t3++, r3 >>>= 1) if (1 & r3 && 0 !== e3.dyn_ltree[2 * t3]) return o;
              if (0 !== e3.dyn_ltree[18] || 0 !== e3.dyn_ltree[20] || 0 !== e3.dyn_ltree[26]) return h;
              for (t3 = 32; t3 < u; t3++) if (0 !== e3.dyn_ltree[2 * t3]) return h;
              return o;
            })(e2)), Y(e2, e2.l_desc), Y(e2, e2.d_desc), a2 = (function(e3) {
              var t3;
              for (X(e3, e3.dyn_ltree, e3.l_desc.max_code), X(e3, e3.dyn_dtree, e3.d_desc.max_code), Y(e3, e3.bl_desc), t3 = c - 1; 3 <= t3 && 0 === e3.bl_tree[2 * S[t3] + 1]; t3--) ;
              return e3.opt_len += 3 * (t3 + 1) + 5 + 5 + 4, t3;
            })(e2), i2 = e2.opt_len + 3 + 7 >>> 3, (s2 = e2.static_len + 3 + 7 >>> 3) <= i2 && (i2 = s2)) : i2 = s2 = r2 + 5, r2 + 4 <= i2 && -1 !== t2 ? J(e2, t2, r2, n2) : 4 === e2.strategy || s2 === i2 ? (P2(e2, 2 + (n2 ? 1 : 0), 3), K(e2, z, C)) : (P2(e2, 4 + (n2 ? 1 : 0), 3), (function(e3, t3, r3, n3) {
              var i3;
              for (P2(e3, t3 - 257, 5), P2(e3, r3 - 1, 5), P2(e3, n3 - 4, 4), i3 = 0; i3 < n3; i3++) P2(e3, e3.bl_tree[2 * S[i3] + 1], 3);
              V(e3, e3.dyn_ltree, t3 - 1), V(e3, e3.dyn_dtree, r3 - 1);
            })(e2, e2.l_desc.max_code + 1, e2.d_desc.max_code + 1, a2 + 1), K(e2, e2.dyn_ltree, e2.dyn_dtree)), W(e2), n2 && M(e2);
          }, r._tr_tally = function(e2, t2, r2) {
            return e2.pending_buf[e2.d_buf + 2 * e2.last_lit] = t2 >>> 8 & 255, e2.pending_buf[e2.d_buf + 2 * e2.last_lit + 1] = 255 & t2, e2.pending_buf[e2.l_buf + e2.last_lit] = 255 & r2, e2.last_lit++, 0 === t2 ? e2.dyn_ltree[2 * r2]++ : (e2.matches++, t2--, e2.dyn_ltree[2 * (A[r2] + u + 1)]++, e2.dyn_dtree[2 * N(t2)]++), e2.last_lit === e2.lit_bufsize - 1;
          }, r._tr_align = function(e2) {
            P2(e2, 2, 3), L(e2, m, z), (function(e3) {
              16 === e3.bi_valid ? (U(e3, e3.bi_buf), e3.bi_buf = 0, e3.bi_valid = 0) : 8 <= e3.bi_valid && (e3.pending_buf[e3.pending++] = 255 & e3.bi_buf, e3.bi_buf >>= 8, e3.bi_valid -= 8);
            })(e2);
          };
        }, { "../utils/common": 41 }], 53: [function(e, t, r) {
          "use strict";
          t.exports = function() {
            this.input = null, this.next_in = 0, this.avail_in = 0, this.total_in = 0, this.output = null, this.next_out = 0, this.avail_out = 0, this.total_out = 0, this.msg = "", this.state = null, this.data_type = 2, this.adler = 0;
          };
        }, {}], 54: [function(e, t, r) {
          (function(e2) {
            !(function(r2, n) {
              "use strict";
              if (!r2.setImmediate) {
                var i, s, t2, a, o = 1, h = {}, u = false, l = r2.document, e3 = Object.getPrototypeOf && Object.getPrototypeOf(r2);
                e3 = e3 && e3.setTimeout ? e3 : r2, i = "[object process]" === {}.toString.call(r2.process) ? function(e4) {
                  process.nextTick(function() {
                    c(e4);
                  });
                } : (function() {
                  if (r2.postMessage && !r2.importScripts) {
                    var e4 = true, t3 = r2.onmessage;
                    return r2.onmessage = function() {
                      e4 = false;
                    }, r2.postMessage("", "*"), r2.onmessage = t3, e4;
                  }
                })() ? (a = "setImmediate$" + Math.random() + "$", r2.addEventListener ? r2.addEventListener("message", d, false) : r2.attachEvent("onmessage", d), function(e4) {
                  r2.postMessage(a + e4, "*");
                }) : r2.MessageChannel ? ((t2 = new MessageChannel()).port1.onmessage = function(e4) {
                  c(e4.data);
                }, function(e4) {
                  t2.port2.postMessage(e4);
                }) : l && "onreadystatechange" in l.createElement("script") ? (s = l.documentElement, function(e4) {
                  var t3 = l.createElement("script");
                  t3.onreadystatechange = function() {
                    c(e4), t3.onreadystatechange = null, s.removeChild(t3), t3 = null;
                  }, s.appendChild(t3);
                }) : function(e4) {
                  setTimeout(c, 0, e4);
                }, e3.setImmediate = function(e4) {
                  "function" != typeof e4 && (e4 = new Function("" + e4));
                  for (var t3 = new Array(arguments.length - 1), r3 = 0; r3 < t3.length; r3++) t3[r3] = arguments[r3 + 1];
                  var n2 = { callback: e4, args: t3 };
                  return h[o] = n2, i(o), o++;
                }, e3.clearImmediate = f;
              }
              function f(e4) {
                delete h[e4];
              }
              function c(e4) {
                if (u) setTimeout(c, 0, e4);
                else {
                  var t3 = h[e4];
                  if (t3) {
                    u = true;
                    try {
                      !(function(e5) {
                        var t4 = e5.callback, r3 = e5.args;
                        switch (r3.length) {
                          case 0:
                            t4();
                            break;
                          case 1:
                            t4(r3[0]);
                            break;
                          case 2:
                            t4(r3[0], r3[1]);
                            break;
                          case 3:
                            t4(r3[0], r3[1], r3[2]);
                            break;
                          default:
                            t4.apply(n, r3);
                        }
                      })(t3);
                    } finally {
                      f(e4), u = false;
                    }
                  }
                }
              }
              function d(e4) {
                e4.source === r2 && "string" == typeof e4.data && 0 === e4.data.indexOf(a) && c(+e4.data.slice(a.length));
              }
            })("undefined" == typeof self ? void 0 === e2 ? this : e2 : self);
          }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
        }, {}] }, {}, [10])(10);
      });
    }
  });

  // node_modules/@mosip/pixelpass/src/index.js
  var require_src = __commonJS({
    "node_modules/@mosip/pixelpass/src/index.js"(exports, module) {
      var {
        DEFAULT_QR_QUALITY,
        DEFAULT_QR_BORDER,
        DEFAULT_QR_SCALE,
        COLOR_BLACK,
        COLOR_WHITE,
        DEFAULT_ZLIB_COMPRESSION_LEVEL,
        DEFAULT_ECC_LEVEL,
        ZIP_HEADER,
        DEFAULT_ZIP_FILE_NAME
      } = require_Constants();
      var QRCode = require_browser();
      var b45 = require_base45_js();
      var pako = require_pako();
      var cbor = require_cbor();
      var JSZip = require_jszip_min();
      function generateQRData(data, header = "") {
        let parsedData = null;
        let compressedData, b45EncodedData;
        try {
          parsedData = JSON.parse(data);
          const cborEncodedData = cbor.encode(parsedData);
          compressedData = pako.deflate(cborEncodedData, { level: DEFAULT_ZLIB_COMPRESSION_LEVEL });
        } catch (e) {
          console.error("Data is not JSON");
          compressedData = pako.deflate(data, { level: DEFAULT_ZLIB_COMPRESSION_LEVEL });
        } finally {
          b45EncodedData = b45.encode(compressedData).toString();
        }
        return header + b45EncodedData;
      }
      async function generateQRCode(data, ecc = DEFAULT_ECC_LEVEL, header = "") {
        const base45Data = generateQRData(data, header);
        const opts = {
          errorCorrectionLevel: ecc,
          quality: DEFAULT_QR_QUALITY,
          margin: DEFAULT_QR_BORDER,
          scale: DEFAULT_QR_SCALE,
          color: {
            dark: COLOR_BLACK,
            light: COLOR_WHITE
          }
        };
        return QRCode.toDataURL(base45Data, opts);
      }
      function decode(data) {
        const decodedBase45Data = b45.decode(data);
        const decompressedData = pako.inflate(decodedBase45Data);
        const textData = new TextDecoder().decode(decompressedData);
        try {
          const decodedCBORData = cbor.decode(decompressedData);
          if (decodedCBORData) return JSON.stringify(decodedCBORData);
          return textData;
        } catch (e) {
          return textData;
        }
      }
      async function decodeBinary(data) {
        let decodedData = new TextDecoder("utf-8").decode(data);
        if (decodedData.startsWith(ZIP_HEADER)) {
          return (await JSZip.loadAsync(decodedData)).file(DEFAULT_ZIP_FILE_NAME).async("text");
        } else {
          throw new Error("Unsupported binary file type");
        }
      }
      function getMappedData(jsonData, mapper, cborEnable = false) {
        const payload = {};
        for (const param in jsonData) {
          const key = mapper[param] ? mapper[param] : param;
          payload[key] = jsonData[param];
        }
        if (cborEnable)
          return cbor.encode(payload);
        else
          return payload;
      }
      function decodeMappedData(data, mapper) {
        try {
          const jsonData = cbor.decode(data);
          return translateToJSON(jsonData, mapper);
        } catch (e) {
          return translateToJSON(data, mapper);
        }
      }
      function translateToJSON(claims, mapper) {
        const result = {};
        if (claims instanceof Map) {
          claims.forEach((value, param) => {
            const key = mapper[param] ? mapper[param] : param;
            result[key] = value;
          });
        } else if (typeof claims === "object" && claims !== null) {
          Object.entries(claims).forEach(([param, value]) => {
            const key = mapper[param] ? mapper[param] : param;
            result[key] = value;
          });
        }
        return result;
      }
      module.exports = {
        generateQRData,
        generateQRCode,
        decode,
        getMappedData,
        decodeMappedData,
        decodeBinary
      };
    }
  });

  // entry.js
  var P = __toESM(require_src());
  window.PixelPass = P;
})();
/*! Bundled license information:

cbor-web/dist/cbor.js:
  (*! For license information please see cbor.js.LICENSE.txt *)

jszip/dist/jszip.min.js:
  (*!
  
  JSZip v3.10.1 - A JavaScript class for generating and reading zip files
  <http://stuartk.com/jszip>
  
  (c) 2009-2016 Stuart Knightley <stuart [at] stuartk.com>
  Dual licenced under the MIT license or GPLv3. See https://raw.github.com/Stuk/jszip/main/LICENSE.markdown.
  
  JSZip uses the library pako released under the MIT license :
  https://github.com/nodeca/pako/blob/main/LICENSE
  *)
*/
