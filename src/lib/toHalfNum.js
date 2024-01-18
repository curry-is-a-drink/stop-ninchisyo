export function toHalfNum(val) {
    var regex = /[Ａ-Ｚａ-ｚ０-９！＂＃＄％＆＇（）＊＋，－．／：；＜＝＞？＠［＼］＾＿｀｛｜｝]/g;
  
    // 入力値の全角を半角の文字に置換
    return val
      .replace(regex, function (s) {
        return String.fromCharCode(s.charCodeAt(0) - 0xfee0);
      })
      .replace(/[‐－―]/g, "-") // ハイフンなど
      .replace(/[～〜]/g, "~") // チルダ
      .replace(/　/g, " "); // スペース
    }