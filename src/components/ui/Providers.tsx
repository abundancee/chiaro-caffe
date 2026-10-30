"use client";

import dynamic from "next/dynamic";
import { LazyMotion, MotionConfig } from "motion/react";
import type { ReactNode } from "react";
import { PicksProvider } from "@/lib/picks";
import { ItemSheetProvider } from "@/lib/item-sheet";
import { SmoothScroll } from "./SmoothScroll";
import { PageTransition } from "./PageTransition";

// Overlays are only needed after a tap, so they load separately from the first paint.
const ItemSheet = dynamic(() => import("@/components/menu/ItemSheet").then((m) => m.ItemSheet), { ssr: false });
const PicksDrawer = dynamic(() => import("@/components/picks/PicksDrawer").then((m) => m.PicksDrawer), { ssr: false });
const StaffView = dynamic(() => import("@/components/picks/StaffView").then((m) => m.StaffView), { ssr: false });

const features = () => import("./motion-features").then((m) => m.default);

export function Providers({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={features}>
        <SmoothScroll>
          <PicksProvider>
            <ItemSheetProvider>
              <PageTransition />
              {children}
              <ItemSheet />
              <PicksDrawer />
              <StaffView />
            </ItemSheetProvider>
          </PicksProvider>
        </SmoothScroll>
      </LazyMotion>
    </MotionConfig>
  );
}
