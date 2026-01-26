import React from "react";
import { cn } from "@/lib/utils";

interface GlobeProps extends React.HTMLAttributes<HTMLDivElement> {
    size?: number;
    responsiveSize?: {
        sm?: number;
        md?: number;
        lg?: number;
    };
}

const Globe: React.FC<GlobeProps> = ({
    className,
    size = 250,
    responsiveSize,
    ...props
}) => {
    // Calculate the size to use based on responsive settings
    const getResponsiveStyles = () => {
        if (!responsiveSize) {
            return {
                width: size,
                height: size,
            };
        }

        // Use CSS custom properties for responsive sizing
        return {
            width: size,
            height: size,
        };
    };

    return (
        <>
            <style>
                {`
          @keyframes earthRotate {
            0% { background-position: 0 0; }
            100% { background-position: 400px 0; }
          }
          @keyframes twinkling { 0%,100% { opacity:0.1; } 50% { opacity:1; } }
          @keyframes twinkling-slow { 0%,100% { opacity:0.1; } 50% { opacity:1; } }
          @keyframes twinkling-long { 0%,100% { opacity:0.1; } 50% { opacity:1; } }
          @keyframes twinkling-fast { 0%,100% { opacity:0.1; } 50% { opacity:1; } }
          
          .globe-container {
            width: ${responsiveSize?.sm || size}px;
            height: ${responsiveSize?.sm || size}px;
          }
          
          @media (min-width: 768px) {
            .globe-container {
              width: ${responsiveSize?.md || size}px;
              height: ${responsiveSize?.md || size}px;
            }
          }
          
          @media (min-width: 1024px) {
            .globe-container {
              width: ${responsiveSize?.lg || size}px;
              height: ${responsiveSize?.lg || size}px;
            }
          }
        `}
            </style>
            <div
                className={cn("flex items-center justify-center relative overflow-visible", className)}
                {...props}
            >
                <div
                    className="globe-container relative rounded-full overflow-hidden shadow-[0_0_20px_rgba(255,255,255,0.2),-5px_0_8px_#c3f4ff_inset,15px_2px_25px_#000_inset,-24px_-2px_34px_#c3f4ff99_inset,250px_0_44px_#00000066_inset,150px_0_38px_#000000aa_inset]"
                    style={{
                        backgroundImage: "url('https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/globe.jpeg')",
                        backgroundSize: "cover",
                        backgroundPosition: "left",
                        animation: "earthRotate 30s linear infinite",
                    }}
                >
                    {/* Stars - hidden on small screens for cleaner look */}
                    <div className="hidden sm:block">
                        <div
                            className="absolute left-[-20px] w-1 h-1 bg-white rounded-full"
                            style={{ animation: "twinkling 3s infinite" }}
                        />
                        <div
                            className="absolute left-[-40px] top-[30px] w-1 h-1 bg-white rounded-full"
                            style={{ animation: "twinkling-slow 2s infinite" }}
                        />
                        <div
                            className="absolute left-[290px] top-[60px] w-1 h-1 bg-white rounded-full"
                            style={{ animation: "twinkling-slow 2s infinite" }}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Globe;
