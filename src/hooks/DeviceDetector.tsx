"use client"
import { useEffect, useState } from "react";

enum DeviceType {
    Mobile = "mobile",
    Desktop = "desktop",
}

function determineDeviceType(): DeviceType {
    if (typeof window === "undefined") return DeviceType.Desktop;
    return window.innerWidth <= 767 ? DeviceType.Mobile : DeviceType.Desktop;
}
export function useIsDesktop(initial = false) {
    const [desktop, setDesktop] = useState<boolean>(initial);

    useEffect(() => {
        function update() {
            setDesktop(determineDeviceType() === DeviceType.Desktop);
        }

        // Initial call
        update();

        // Resize Listener
        const ro = typeof ResizeObserver !== "undefined"
            ? new ResizeObserver(update)
            : null;
        ro?.observe(document.body);

        // Cleanup
        return () => {
            ro?.disconnect();
        };
    }, []);

    return desktop;
}