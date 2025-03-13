"use client";

import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";
import { motion, AnimatePresence } from "framer-motion";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

const RotatingText = forwardRef((props, ref) => {
  const {
    texts,
    transition = { type: "spring", damping: 25, stiffness: 300 },
    initial = { y: "100%", opacity: 0 },
    animate = { y: 0, opacity: 1 },
    exit = { y: "-120%", opacity: 0 },
    animatePresenceMode = "wait",
    animatePresenceInitial = false,
    rotationInterval = 2000,
    staggerDuration = 0,
    staggerFrom = "first",
    loop = true,
    auto = true,
    splitBy = "characters",
    onNext,
    mainClassName,
    splitLevelClassName,
    elementLevelClassName,
    ...rest
  } = props;

  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0
  });

  // Track window size for responsive adjustments
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);
    
    // Initial size
    handleResize();
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);

  const splitIntoCharacters = (text) => {
    if (typeof Intl !== "undefined" && Intl.Segmenter) {
      const segmenter = new Intl.Segmenter("en", { granularity: "grapheme" });
      return Array.from(segmenter.segment(text), (segment) => segment.segment);
    }
    return Array.from(text);
  };

  const elements = useMemo(() => {
    const currentText = texts[currentTextIndex];
    if (splitBy === "characters") {
      const words = currentText.split(" ");
      return words.map((word, i) => ({
        characters: splitIntoCharacters(word),
        needsSpace: i !== words.length - 1,
      }));
    }
    if (splitBy === "words") {
      return currentText.split(" ").map((word, i, arr) => ({
        characters: [word],
        needsSpace: i !== arr.length - 1,
      }));
    }
    if (splitBy === "lines") {
      return currentText.split("\n").map((line, i, arr) => ({
        characters: [line],
        needsSpace: i !== arr.length - 1,
      }));
    }
    // For a custom separator
    return currentText.split(splitBy).map((part, i, arr) => ({
      characters: [part],
      needsSpace: i !== arr.length - 1,
    }));
  }, [texts, currentTextIndex, splitBy]);

  // Adjust stagger duration based on device size
  const adjustedStaggerDuration = useMemo(() => {
    // Faster animations on mobile for better UX
    if (windowSize.width < 640) {
      return staggerDuration * 0.8;
    }
    return staggerDuration;
  }, [staggerDuration, windowSize.width]);

  const getStaggerDelay = useCallback(
    (index, totalChars) => {
      const total = totalChars;
      if (staggerFrom === "first") return index * adjustedStaggerDuration;
      if (staggerFrom === "last") return (total - 1 - index) * adjustedStaggerDuration;
      if (staggerFrom === "center") {
        const center = Math.floor(total / 2);
        return Math.abs(center - index) * adjustedStaggerDuration;
      }
      if (staggerFrom === "random") {
        const randomIndex = Math.floor(Math.random() * total);
        return Math.abs(randomIndex - index) * adjustedStaggerDuration;
      }
      return Math.abs(staggerFrom - index) * adjustedStaggerDuration;
    },
    [staggerFrom, adjustedStaggerDuration]
  );

  const handleIndexChange = useCallback(
    (newIndex) => {
      setCurrentTextIndex(newIndex);
      if (onNext) onNext(newIndex);
    },
    [onNext]
  );

  const next = useCallback(() => {
    const nextIndex =
      currentTextIndex === texts.length - 1
        ? loop
          ? 0
          : currentTextIndex
        : currentTextIndex + 1;
    if (nextIndex !== currentTextIndex) {
      handleIndexChange(nextIndex);
    }
  }, [currentTextIndex, texts.length, loop, handleIndexChange]);

  const previous = useCallback(() => {
    const prevIndex =
      currentTextIndex === 0
        ? loop
          ? texts.length - 1
          : currentTextIndex
        : currentTextIndex - 1;
    if (prevIndex !== currentTextIndex) {
      handleIndexChange(prevIndex);
    }
  }, [currentTextIndex, texts.length, loop, handleIndexChange]);

  const jumpTo = useCallback(
    (index) => {
      const validIndex = Math.max(0, Math.min(index, texts.length - 1));
      if (validIndex !== currentTextIndex) {
        handleIndexChange(validIndex);
      }
    },
    [texts.length, currentTextIndex, handleIndexChange]
  );

  const reset = useCallback(() => {
    if (currentTextIndex !== 0) {
      handleIndexChange(0);
    }
  }, [currentTextIndex, handleIndexChange]);

  useImperativeHandle(
    ref,
    () => ({
      next,
      previous,
      jumpTo,
      reset,
    }),
    [next, previous, jumpTo, reset]
  );

  useEffect(() => {
    if (!auto) return;
    const intervalId = setInterval(next, rotationInterval);
    return () => clearInterval(intervalId);
  }, [next, rotationInterval, auto]);

  // Adjust animation transitions based on device capabilities
  const responsiveTransition = useMemo(() => {
    // Simpler animations for mobile devices
    if (windowSize.width < 640) {
      return {
        ...transition,
        type: "tween", // Use simpler animation type on mobile
        duration: 0.3
      };
    }
    return transition;
  }, [transition, windowSize.width]);

  return (
    <motion.span
      className={cn(
        "flex flex-wrap whitespace-pre-wrap relative",
        mainClassName
      )}
      {...rest}
      layout
      transition={responsiveTransition}
    >
      {/* Screen-reader only text */}
      <span className="sr-only">{texts[currentTextIndex]}</span>
      <AnimatePresence mode={animatePresenceMode} initial={animatePresenceInitial}>
        <motion.div
          key={currentTextIndex}
          className={cn(
            splitBy === "lines"
              ? "flex flex-col w-full"
              : "flex flex-wrap whitespace-pre-wrap relative"
          )}
          layout
          aria-hidden="true"
        >
          {elements.map((wordObj, wordIndex, array) => {
            const previousCharsCount = array
              .slice(0, wordIndex)
              .reduce((sum, word) => sum + word.characters.length, 0);
            return (
              <span key={wordIndex} className={cn("inline-flex", splitLevelClassName)}>
                {wordObj.characters.map((char, charIndex) => (
                  <motion.span
                    key={charIndex}
                    initial={initial}
                    animate={animate}
                    exit={exit}
                    transition={{
                      ...responsiveTransition,
                      delay: getStaggerDelay(
                        previousCharsCount + charIndex,
                        array.reduce((sum, word) => sum + word.characters.length, 0)
                      ),
                    }}
                    className={cn("inline-block", elementLevelClassName)}
                  >
                    {char}
                  </motion.span>
                ))}
                {wordObj.needsSpace && <span className="whitespace-pre"> </span>}
              </span>
            );
          })}
        </motion.div>
      </AnimatePresence>
    </motion.span>
  );
});

RotatingText.displayName = "RotatingText";
export default RotatingText;