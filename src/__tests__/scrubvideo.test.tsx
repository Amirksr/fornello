import { render } from "@testing-library/react";
import { ScrubVideo } from "@/components/ScrubVideo";

/** jsdom doesn't implement media playback, so give HTMLMediaElement a minimal fake clock. */
function fakeMedia(duration = 4) {
  const state = { time: 0, seeking: false, sets: [] as number[] };
  Object.defineProperty(HTMLMediaElement.prototype, "duration", { configurable: true, get: () => duration });
  Object.defineProperty(HTMLMediaElement.prototype, "seeking", { configurable: true, get: () => state.seeking });
  Object.defineProperty(HTMLMediaElement.prototype, "currentTime", {
    configurable: true,
    get: () => state.time,
    set: (v: number) => {
      state.time = v;
      state.sets.push(v);
    },
  });
  return state;
}

let queue: FrameRequestCallback[] = [];
const flush = () => {
  for (let i = 0; i < 200 && queue.length; i++) queue.shift()!(0);
};
const setMotion = (reduce: boolean) => (window.matchMedia = jest.fn().mockReturnValue({ matches: reduce }) as unknown as typeof window.matchMedia);

function mount(top: { value: number }) {
  const result = render(
    <section
      ref={(el) => {
        if (el) el.getBoundingClientRect = () => ({ top: top.value, height: 2000 }) as DOMRect;
      }}
    >
      <ScrubVideo src="/v.mp4" poster="/p.jpg" />
    </section>,
  );
  return result;
}

describe("ScrubVideo", () => {
  beforeEach(() => {
    queue = [];
    window.requestAnimationFrame = (cb) => (queue.push(cb), queue.length);
    window.cancelAnimationFrame = () => {};
    Object.defineProperty(window, "innerHeight", { value: 800, configurable: true });
    setMotion(false);
  });

  it("starts on the first frame and plays forward as the scene scrolls", () => {
    const media = fakeMedia();
    const top = { value: 0 };
    mount(top);
    flush();
    expect(media.time).toBe(0);

    top.value = -480; // progress 0.4 => halfway through a clip that plays over 0..0.8
    window.dispatchEvent(new Event("scroll"));
    flush();
    expect(media.time).toBeCloseTo(2, 1);

    top.value = -1200; // scrolled past the end: hold the final frame
    window.dispatchEvent(new Event("scroll"));
    flush();
    expect(media.time).toBeCloseTo(4 - 1 / 24, 2);
  });

  it("eases towards the target instead of jumping", () => {
    const media = fakeMedia();
    const top = { value: 0 };
    mount(top);
    flush();
    media.sets.length = 0;
    top.value = -960; // target = last frame
    window.dispatchEvent(new Event("scroll"));
    flush();
    expect(media.sets.length).toBeGreaterThan(3); // several small steps, not one jump
    expect([...media.sets].sort((a, b) => a - b)).toEqual(media.sets); // monotonic while scrolling down
  });

  it("does not queue a new seek while the previous one is still in progress", () => {
    const media = fakeMedia();
    const top = { value: 0 };
    mount(top);
    flush();
    media.sets.length = 0;
    media.seeking = true;
    top.value = -600;
    window.dispatchEvent(new Event("scroll"));
    for (let i = 0; i < 5 && queue.length; i++) queue.shift()!(0);
    expect(media.sets).toHaveLength(0);
  });

  it("shows a still from the middle and ignores scrolling under reduced motion", () => {
    setMotion(true);
    const media = fakeMedia();
    const top = { value: -900 };
    mount(top);
    flush();
    expect(media.time).toBe(2);
    top.value = 0;
    window.dispatchEvent(new Event("scroll"));
    flush();
    expect(media.time).toBe(2);
  });

  it("upgrades preload to auto once the scene is within two screens", () => {
    fakeMedia();
    const top = { value: 5000 };
    const { container } = mount(top);
    flush();
    expect(container.querySelector("video")).toHaveAttribute("preload", "metadata");
    top.value = 1200;
    window.dispatchEvent(new Event("scroll"));
    flush();
    expect((container.querySelector("video") as HTMLVideoElement).preload).toBe("auto");
  });
});
