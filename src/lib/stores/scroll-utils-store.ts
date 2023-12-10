import { readable } from "svelte/store";

const initialState = {
  atBottom: false,
  atTop: true,
  userScrolling: false,
  scrollsDown: false,
  scrollsUp: false,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  scrollTo: (params: ScrollToParams) => {},
};

export type ScrollUtilsStore = typeof initialState;

type ScrollToParams = {
  top?: number;
  left?: number;
  behavior?: "auto" | "smooth";
};

type ScrollUtilsOptions = {
  offset?: number;
  global?: boolean;
  initialValues?: Partial<ScrollUtilsStore>;
};

// TODO: Fix event handler on global change
export function scrollUtilsStore(
  ref: HTMLElement | null,
  { offset = 0, global = false, initialValues = {} }: ScrollUtilsOptions = {}
) {
  if (!ref) {
    return readable({ ...initialState, ...initialValues });
  }

  return readable<ScrollUtilsStore>(initialState, function start(set) {
    let lastScrollTop = ref.scrollTop;
    let state = {
      ...initialState,
      ...initialValues,
      atBottom: ref.scrollHeight - ref.scrollTop <= ref.clientHeight + offset,
      atTop: ref.scrollTop <= offset,
    };

    const updateState = (newState) => {
      // Only update and re-render if state actually changes.
      const hasChanged = Object.keys(newState).some(
        (key) => state[key] !== newState[key]
      );

      if (hasChanged) {
        state = { ...state, ...newState };
        set(state);
      }
    };

    const scrollTo = (params: ScrollToParams) => {
      ref.scrollTo(params);
    };

    const handleScroll = () => {
      const atBottom =
        ref.scrollHeight - ref.scrollTop <= ref.clientHeight + offset;
      const atTop = ref.scrollTop <= offset;
      const scrollsUp = ref.scrollTop < lastScrollTop && !atTop;
      const scrollsDown = !scrollsUp && !atBottom;
      lastScrollTop = ref.scrollTop;

      updateState({ atBottom, atTop, scrollsDown, scrollsUp });
    };

    const handleScrollEnd = () => {
      updateState({
        userScrolling: false,
        scrollsDown: false,
        scrollsUp: false,
      });
    };

    const handleUserScroll = () => {
      const userScrolling = true;
      updateState({ userScrolling });
    };

    const handleKeyDown = (e) => {
      if (e.key === "ArrowUp" || e.key === "ArrowDown") {
        handleUserScroll();
      }
    };

    if (global) {
      window.addEventListener("scroll", handleScroll, { passive: true });
      window.addEventListener("wheel", handleUserScroll, { passive: true });
      window.addEventListener("touchmove", handleUserScroll, { passive: true });
      window.addEventListener("scrollend", handleScrollEnd, { passive: true });
    } else {
      ref.addEventListener("scroll", handleScroll, { passive: true });
      ref.addEventListener("wheel", handleUserScroll, { passive: true });
      ref.addEventListener("scrollend", handleScrollEnd, { passive: true });
      ref.addEventListener("touchmove", handleUserScroll, { passive: true });
    }
    window.addEventListener("keydown", handleKeyDown, { passive: true });

    updateState({ scrollTo });

    return function stop() {
      if (global) {
        window.removeEventListener("scroll", handleScroll);
        window.removeEventListener("wheel", handleUserScroll);
        window.removeEventListener("touchmove", handleUserScroll);
        window.removeEventListener("scrollend", handleScrollEnd);
      } else {
        ref.removeEventListener("scroll", handleScroll);
        ref.removeEventListener("wheel", handleUserScroll);
        ref.removeEventListener("touchmove", handleUserScroll);
        ref.removeEventListener("scrollend", handleScrollEnd);
      }
      window.removeEventListener("keydown", handleKeyDown);
    };
  });
}
