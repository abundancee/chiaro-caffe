"use client";

import dynamic from "next/dynamic";
import { LazyMotion, MotionConfig } from "motion/react";
import type { ReactNode } from "react";
import { PicksProvider } from "@/lib/picks";
import { ItemSheetProvider } from "@/lib/item-sheet";
import { SmoothScroll } from "./SmoothScroll";
import { PageTransition } from "./PageTransition";
import { SurpriseProvider } from "@/lib/surprise";
import { Dock } from "./Dock";

// Overlays are only needed after a tap, so they load separately from the first paint.
const ItemSheet = dynamic(() => import("@/components/menu/ItemSheet").then((m) => m.ItemSheet), { ssr: false });
const PicksDrawer = dynamic(() => import("@/components/picks/PicksDrawer").then((m) => m.PicksDrawer), { ssr: false });
const StaffView = dynamic(() => import("@/components/picks/StaffView").then((m) => m.StaffView), { ssr: false });

const Surprise = dynamic(() => import("@/components/menu/Surprise").then((m) => m.Surprise), { ssr: false });
const Toast = dynamic(() => import("@/components/ui/Toast").then((m) => m.Toast), { ssr: false });

const features = () => import("./motion-features").then((m) => m.default);

export function Providers({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={features}>
        <SmoothScroll>
          <PicksProvider>
            <ItemSheetProvider>
              <SurpriseProvider>
                <PageTransition />
                {children}
                <Dock />
                <ItemSheet />
                <PicksDrawer />
                <StaffView />
                <Surprise />
                <Toast />
              </SurpriseProvider>
            </ItemSheetProvider>
          </PicksProvider>
        </SmoothScroll>
      </LazyMotion>
    </MotionConfig>
  );
}
