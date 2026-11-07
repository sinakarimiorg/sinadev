"use client";

import { useEffect, useState } from "react";

/** Types each word, holds, deletes it, then moves on to the next one. */
export function useTypewriter(words: readonly string[], speed = 90, hold = 1600): string {
  const [text, setText] = useState("");

  useEffect(() => {
    if (words.length === 0) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setText(words[0] ?? "");
      return;
    }

    let wordIndex = 0;
    let charCount = 0;
    let deleting = false;
    let timer: ReturnType<typeof setTimeout>;

    const step = () => {
      const word = words[wordIndex % words.length] ?? "";
      if (!deleting) {
        charCount += 1;
        setText(word.slice(0, charCount));
        if (charCount >= word.length) {
          deleting = true;
          timer = setTimeout(step, hold);
          return;
        }
      } else {
        charCount -= 1;
        setText(word.slice(0, Math.max(charCount, 0)));
        if (charCount <= 0) {
          deleting = false;
          wordIndex += 1;
        }
      }
      timer = setTimeout(step, deleting ? speed / 2 : speed);
    };

    timer = setTimeout(step, 400);
    return () => clearTimeout(timer);
  }, [words, speed, hold]);

  return text;
}
