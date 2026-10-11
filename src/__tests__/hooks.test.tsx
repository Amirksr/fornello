import { act, render } from "@testing-library/react";
import { useRef } from "react";
import { useActiveScene, useSceneProgress } from "@/hooks";

function Probe({ rect }: { rect: { top: number; height: number } }) {
  const ref = useRef<HTMLElement>(null);
  useSceneProgress(ref);
  return (
    <section
      ref={(el) => {
        if (el) el.getBoundingClientRect = () => ({ top: rect.top, height: rect.height }) as DOMRect;
        (ref as { current: HTMLElement | null }).current = el;
      }}
      data-testid="s"
    />
  );
}

const entry = (id: string, isIntersecting: boolean) =>
  ({ isIntersecting, target: document.getElementById(id)! }) as unknown as IntersectionObserverEntry;

const mockMotion = (reduce: boolean) =>
  (window.matchMedia = jest.fn().mockReturnValue({ matches: reduce }) as unknown as typeof window.matchMedia);

describe("useSceneProgress", () => {
  beforeEach(() => {
    Object.defineProperty(window, "innerHeight", { value: 800, configurable: true });
  });

  it("writes --p from the scene's position", () => {
    mockMotion(false);
    const { getByTestId } = render(<Probe rect={{ top: -600, height: 2000 }} />);
    expect(getByTestId("s").style.getPropertyValue("--p")).toBe("0.5000");
  });

  it("leaves --p alone when reduced motion is requested", () => {
    mockMotion(true);
    const { getByTestId } = render(<Probe rect={{ top: -600, height: 2000 }} />);
    expect(getByTestId("s").style.getPropertyValue("--p")).toBe("");
  });
});

describe("useActiveScene", () => {
  it("follows the scene that intersects the viewport centre", () => {
    let callback: IntersectionObserverCallback = () => {};
    const observe = jest.fn();
    (window as unknown as { IntersectionObserver: unknown }).IntersectionObserver = class {
      constructor(cb: IntersectionObserverCallback) {
        callback = cb;
      }
      observe = observe;
      disconnect = jest.fn();
    };
    document.body.innerHTML = '<div id="a"></div><div id="b"></div>';
    const ids = ["a", "b"] as const;
    let value: string | undefined;
    function Reader() {
      value = useActiveScene(ids);
      return null;
    }
    render(<Reader />);
    expect(value).toBe("a");
    expect(observe).toHaveBeenCalledTimes(2);
    act(() => callback([entry("b", true)], {} as IntersectionObserver));
    expect(value).toBe("b");
    act(() => callback([entry("a", false)], {} as IntersectionObserver));
    expect(value).toBe("b");
  });
});
