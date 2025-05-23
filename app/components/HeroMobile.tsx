"use client";

import Rhythm from "./Rhythm";
import Ampersand from "./Ampersand";
import Motion from "./Motion";
import Figure from "./Figure";
import Image from "next/image";
import { CustomPortableText } from "./CustomPortableText";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { HeroProps } from "./Hero";
import { useEffect } from "react";

/*
This helper function makes a group of elements animate along the x-axis in a seamless, responsive loop.

Features:
 - Uses xPercent so that even if the widths change (like if the window gets resized), it should still work in most cases.
 - When each item animates to the left or right enough, it will loop back to the other side
 - Optionally pass in a config object with values like draggable: true, center: true, speed (default: 1, which travels at roughly 100 pixels per second), paused (boolean), repeat, reversed, and paddingRight.
 - The returned timeline will have the following methods added to it:
   - next() - animates to the next element using a timeline.tweenTo() which it returns. You can pass in a vars object to control duration, easing, etc.
   - previous() - animates to the previous element using a timeline.tweenTo() which it returns. You can pass in a vars object to control duration, easing, etc.
   - toIndex() - pass in a zero-based index value of the element that it should animate to, and optionally pass in a vars object to control duration, easing, etc. Always goes in the shortest direction
   - current() - returns the current index (if an animation is in-progress, it reflects the final index)
   - times - an Array of the times on the timeline where each element hits the "starting" spot.
 */
/* eslint-disable */
const horizontalLoop = (items: any, config: any) => {
  let timeline;
  items = gsap.utils.toArray(items);
  config = config || {};
  gsap.context(() => {
    // use a context so that if this is called from within another context or a gsap.matchMedia(), we can perform proper cleanup like the "resize" event handler on the window
    let onChange = config.onChange,
      lastIndex = 0,
      tl = gsap.timeline({
        repeat: config.repeat,
        onUpdate:
          onChange &&
          function () {
            let i = tl.closestIndex();
            if (lastIndex !== i) {
              lastIndex = i;
              onChange(items[i], i);
            }
          },
        paused: config.paused,
        defaults: { ease: "none" },
        // @ts-expect-error
        onReverseComplete: () =>
          tl.totalTime(tl.rawTime() + tl.duration() * 100),
      }),
      length = items.length,
      startX = items[0].offsetLeft,
      times: any[] = [],
      widths: any[] = [],
      spaceBefore: any[] = [],
      xPercents: any[] = [],
      curIndex = 0,
      indexIsDirty = false,
      center = config.center,
      pixelsPerSecond = (config.speed || 1) * 100,
      snap =
        config.snap === false
          ? (v: any) => v
          : gsap.utils.snap(config.snap || 1), // some browsers shift by a pixel to accommodate flex layouts, so for example if width is 20% the first element's width might be 242px, and the next 243px, alternating back and forth. So we snap to 5 percentage points to make things look more natural
      timeOffset = 0,
      container =
        center === true
          ? items[0].parentNode
          : gsap.utils.toArray(center)[0] || items[0].parentNode,
      totalWidth: any,
      getTotalWidth = () =>
        items[length - 1].offsetLeft +
        (xPercents[length - 1] / 100) * widths[length - 1] -
        startX +
        spaceBefore[0] +
        items[length - 1].offsetWidth *
          // @ts-expect-error
          gsap.getProperty(items[length - 1], "scaleX") +
        (parseFloat(config.paddingRight) || 0),
      populateWidths = () => {
        let b1 = container.getBoundingClientRect(),
          b2;
        items.forEach((el: any, i: any) => {
          // @ts-expect-error
          widths[i] = parseFloat(gsap.getProperty(el, "width", "px"));
          xPercents[i] = snap(
            // @ts-expect-error
            (parseFloat(gsap.getProperty(el, "x", "px")) / widths[i]) * 100 +
              gsap.getProperty(el, "xPercent"),
          );
          b2 = el.getBoundingClientRect();
          spaceBefore[i] = b2.left - (i ? b1.right : b1.left);
          b1 = b2;
        });
        gsap.set(items, {
          // convert "x" to "xPercent" to make things responsive, and populate the widths/xPercents Arrays to make lookups faster.
          xPercent: (i) => xPercents[i],
        });
        totalWidth = getTotalWidth();
      },
      timeWrap: any,
      populateOffsets = () => {
        timeOffset = center
          ? (tl.duration() * (container.offsetWidth / 2)) / totalWidth
          : 0;
        center &&
          times.forEach((t, i) => {
            times[i] = timeWrap(
              tl.labels["label" + i] +
                (tl.duration() * widths[i]) / 2 / totalWidth -
                timeOffset,
            );
          });
      },
      getClosest = (values: any, value: any, wrap: any) => {
        let i = values.length,
          closest = 1e10,
          index = 0,
          d;
        while (i--) {
          d = Math.abs(values[i] - value);
          if (d > wrap / 2) {
            d = wrap - d;
          }
          if (d < closest) {
            closest = d;
            index = i;
          }
        }
        return index;
      },
      populateTimeline = () => {
        let i, item, curX, distanceToStart, distanceToLoop;
        tl.clear();
        for (i = 0; i < length; i++) {
          item = items[i];
          curX = (xPercents[i] / 100) * widths[i];
          distanceToStart = item.offsetLeft + curX - startX + spaceBefore[0];
          distanceToLoop =
            // @ts-expect-error
            distanceToStart + widths[i] * gsap.getProperty(item, "scaleX");
          tl.to(
            item,
            {
              xPercent: snap(((curX - distanceToLoop) / widths[i]) * 100),
              duration: distanceToLoop / pixelsPerSecond,
            },
            0,
          )
            .fromTo(
              item,
              {
                xPercent: snap(
                  ((curX - distanceToLoop + totalWidth) / widths[i]) * 100,
                ),
              },
              {
                xPercent: xPercents[i],
                duration:
                  (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond,
                immediateRender: false,
              },
              distanceToLoop / pixelsPerSecond,
            )
            .add("label" + i, distanceToStart / pixelsPerSecond);
          times[i] = distanceToStart / pixelsPerSecond;
        }
        timeWrap = gsap.utils.wrap(0, tl.duration());
      },
      refresh = (deep: any) => {
        let progress = tl.progress();
        tl.progress(0, true);
        populateWidths();
        deep && populateTimeline();
        populateOffsets();
        deep && tl.draggable && tl.paused()
          ? tl.time(times[curIndex], true)
          : tl.progress(progress, true);
      },
      onResize = () => refresh(true),
      proxy: any;
    gsap.set(items, { x: 0 });
    populateWidths();
    populateTimeline();
    populateOffsets();
    window.addEventListener("resize", onResize);
    function toIndex(index: any, vars: any) {
      vars = vars || {};
      Math.abs(index - curIndex) > length / 2 &&
        (index += index > curIndex ? -length : length); // always go in the shortest direction
      let newIndex = gsap.utils.wrap(0, length, index),
        time = times[newIndex];
      if (time > tl.time() !== index > curIndex && index !== curIndex) {
        // if we're wrapping the timeline's playhead, make the proper adjustments
        time += tl.duration() * (index > curIndex ? 1 : -1);
      }
      if (time < 0 || time > tl.duration()) {
        vars.modifiers = { time: timeWrap };
      }
      curIndex = newIndex;
      vars.overwrite = true;
      gsap.killTweensOf(proxy);
      return vars.duration === 0
        ? tl.time(timeWrap(time))
        : tl.tweenTo(time, vars);
    }
    tl.toIndex = (index: any, vars: any) => toIndex(index, vars);
    tl.closestIndex = (setCurrent: any) => {
      let index = getClosest(times, tl.time(), tl.duration());
      if (setCurrent) {
        curIndex = index;
        indexIsDirty = false;
      }
      return index;
    };
    tl.current = () => (indexIsDirty ? tl.closestIndex(true) : curIndex);
    tl.next = (vars: any) => toIndex(tl.current() + 1, vars);
    tl.previous = (vars: any) => toIndex(tl.current() - 1, vars);
    tl.times = times;
    tl.progress(1, true).progress(0, true); // pre-render for performance
    if (config.reversed) {
      // @ts-expect-error
      tl.vars.onReverseComplete();
      tl.reverse();
    }
    if (config.draggable && typeof Draggable === "function") {
      proxy = document.createElement("div");
      let wrap = gsap.utils.wrap(0, 1),
        ratio: any,
        startProgress: any,
        draggable: any,
        dragSnap,
        lastSnap: any,
        initChangeX: any,
        wasPlaying: any,
        align = () =>
          tl.progress(
            wrap(startProgress + (draggable.startX - draggable.x) * ratio),
          ),
        syncIndex = () => tl.closestIndex(true);
      typeof InertiaPlugin === "undefined" &&
        console.warn(
          "InertiaPlugin required for momentum-based scrolling and snapping. https://greensock.com/club",
        );
      draggable = Draggable.create(proxy, {
        trigger: items[0].parentNode,
        type: "x",
        onPressInit() {
          let x = this.x;
          gsap.killTweensOf(tl);
          wasPlaying = !tl.paused();
          tl.pause();
          startProgress = tl.progress();
          // @ts-expect-error
          refresh();
          ratio = 1 / totalWidth;
          initChangeX = startProgress / -ratio - x;
          gsap.set(proxy, { x: startProgress / -ratio });
        },
        // @ts-expect-error
        onDrag: align,
        // @ts-expect-error
        onThrowUpdate: align,
        overshootTolerance: 0,
        inertia: true,
        snap(value) {
          //note: if the user presses and releases in the middle of a throw, due to the sudden correction of proxy.x in the onPressInit(), the velocity could be very large, throwing off the snap. So sense that condition and adjust for it. We also need to set overshootTolerance to 0 to prevent the inertia from causing it to shoot past and come back
          if (Math.abs(startProgress / -ratio - this.x) < 10) {
            return lastSnap + initChangeX;
          }
          let time = -(value * ratio) * tl.duration(),
            wrappedTime = timeWrap(time),
            snapTime = times[getClosest(times, wrappedTime, tl.duration())],
            dif = snapTime - wrappedTime;
          Math.abs(dif) > tl.duration() / 2 &&
            (dif += dif < 0 ? tl.duration() : -tl.duration());
          lastSnap = (time + dif) / tl.duration() / -ratio;
          return lastSnap;
        },
        onRelease() {
          syncIndex();
          draggable.isThrowing && (indexIsDirty = true);
        },
        onThrowComplete: () => {
          syncIndex();
          wasPlaying && tl.play();
        },
      })[0];
      tl.draggable = draggable;
    }
    tl.closestIndex(true);
    lastIndex = curIndex;
    onChange && onChange(items[curIndex], curIndex);
    timeline = tl;
    return () => window.removeEventListener("resize", onResize); // cleanup
  });
  return timeline;
};
/* eslint-enable */

export default function HeroMobile({
  content,
  seenHero,
}: {
  content: HeroProps;
  seenHero: boolean;
}) {
  const { featuredImages, secondaryImages } = content;

  useEffect(() => {
    if (!seenHero) {
      document.cookie = "seenHero=true;max-age=2592000;";
    }
  }, [seenHero]);

  gsap.registerPlugin(ScrollTrigger);

  useGSAP(
    () => {
      if (!seenHero) {
        gsap.set(".headerMobile", { y: "100vh", autoAlpha: 1 });
        gsap.set(".rhythmAndMotionMobile", { y: "50vh", yPercent: "-50" });
        gsap.to(".rhythmAndMotionMobile", { autoAlpha: 1 });

        gsap
          .timeline({
            scrollTrigger: {
              trigger: ".heroTwoColMobile",
              start: "top top",
              end: "bottom top",
              pin: ".bluePanel",
              scrub: 1,
            },
          })
          .to(".rhythmAndMotionMobile", { y: 0, yPercent: "0" }, "<")
          .to(".figureMobile", { autoAlpha: 0 }, "<");

        gsap
          .timeline({
            scrollTrigger: {
              trigger: ".bluePanel",
              start: "top bottom",
              end: "bottom bottom",
              scrub: true,
            },
          })
          .to(".headerMobile", { y: 0, ease: "none" }, "<")
          .set(".heroTwoColMobile", { autoAlpha: 0 });
      } else {
        gsap.set(".headerMobile", { autoAlpha: 1 });
      }
    },
    { dependencies: [seenHero], revertOnUpdate: true },
  );

  useGSAP(() => {
    const secondaryImages = gsap.utils.toArray(".secondaryImage");
    horizontalLoop(secondaryImages, {
      speed: 0.5,
      repeat: -1,
      draggable: true,
    });
  });

  return (
    <div>
      {!seenHero && (
        <div className="heroTwoColMobile relative -z-10 h-screen">
          <div className="rhythmAndMotionMobile invisible fixed top-0 z-10 flex w-full gap-[4.7%]">
            <div className="flex-1 p-[1.6rem]">
              <Rhythm />
            </div>
            <div className="w-[4.3%] py-[1.6rem]">
              <Ampersand />
            </div>
            <div className="flex-1 p-[1.6rem]">
              <Motion />
            </div>
          </div>
          <div className="figureMobile fixed bottom-[55vh] left-1/2 z-10 w-[26.9vw] -translate-x-1/2">
            <Figure />
          </div>
          <div className="fixed top-0 flex size-full flex-col">
            <div className="relative flex-1">
              <Image
                src={featuredImages[0].assetPath}
                alt={featuredImages[0].caption || "missing alt"}
                fill
                sizes="(max-width: 768px) 200vw, 100vw"
                priority
                className="object-cover"
              />
            </div>
            <div className="relative flex-1">
              <Image
                src={featuredImages[1].assetPath}
                alt={featuredImages[1].caption || "missing alt"}
                fill
                sizes="(max-width: 768px) 200vw, 100vw"
                priority
                className="object-cover"
              />
            </div>
          </div>
        </div>
      )}
      <div className="bluePanel relative h-screen bg-blue">
        <div className="flex gap-8 overflow-x-hidden px-[1.6rem] pt-[5.2rem]">
          {secondaryImages[0] && (
            <Image
              src={secondaryImages[0].assetPath}
              alt={secondaryImages[0].caption || "missing alt"}
              height={1000}
              width={520}
              className="secondaryImage w-[26rem] pt-[7.8rem]"
            />
          )}
          {secondaryImages[1] && (
            <Image
              src={secondaryImages[1].assetPath}
              alt={secondaryImages[1].caption || "missing alt"}
              height={1000}
              width={520}
              className="secondaryImage w-[26rem] pb-[7.8rem]"
            />
          )}
          {secondaryImages[2] && (
            <Image
              src={secondaryImages[2].assetPath}
              alt={secondaryImages[2].caption || "missing alt"}
              height={1000}
              width={520}
              className="secondaryImage w-[26rem] pt-[7.8rem]"
            />
          )}
          {secondaryImages[3] && (
            <Image
              src={secondaryImages[3].assetPath}
              alt={secondaryImages[3].caption || "missing alt"}
              height={1000}
              width={520}
              className="secondaryImage w-[26rem] pb-[7.8rem]"
            />
          )}
          {secondaryImages[4] && (
            <Image
              src={secondaryImages[4].assetPath}
              alt={secondaryImages[4].caption || "missing alt"}
              height={1000}
              width={520}
              className="secondaryImage w-[26rem] pt-[7.8rem]"
            />
          )}
          {secondaryImages[5] && (
            <Image
              src={secondaryImages[5].assetPath}
              alt={secondaryImages[5].caption || "missing alt"}
              height={1000}
              width={520}
              className="secondaryImage w-[26rem] pb-[7.8rem]"
            />
          )}
        </div>
        <div className="mt-[5.8rem] px-[4.3rem] text-center text-white">
          <CustomPortableText value={content.content} />
        </div>
      </div>
    </div>
  );
}
