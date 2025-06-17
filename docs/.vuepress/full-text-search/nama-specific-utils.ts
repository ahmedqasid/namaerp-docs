const ARABIC_REPLACE___ = [`إ`, `ا`, `أ`, `آ`, `ء`, `ة`, `ه`, `ى`, `ئ`, `ؤ`, `و`]
const ARABIC_REPLACE_BY = [`ا`, `ا`, `ا`, `ا`, `ا`, `ه`, `ه`, `ي`, `ي`, `و`, `و`]
function replaceChars(str: string, replace: string[], replaceBy: string[]) {
  if (!str)
    return str;
  for (let i = 0; i < replace.length; i++)
    str = str.replaceAll(replace[i], replaceBy[i]);
  return str;
}

export function normalizeArabic(arabic: string) {
  return replaceChars(arabic, ARABIC_REPLACE___, ARABIC_REPLACE_BY);
}
