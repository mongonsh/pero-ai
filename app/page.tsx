"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"
import { Menu, MountainIcon, Github } from "lucide-react"
import AvatarWithLipSync from "@/components/AvatarWithLipSync"
// import AvatarViewer from "@/components/avatar-viewer"
import { AvatarGraphic } from "@/components/avatar-graphic"
import { useRouter } from "next/navigation"
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useState, useEffect } from "react"

interface Viseme {
  time: number;
  value: string;
}

export default function LandingPage() {
  const visemeData = [
    { time: 0, value: "A" },
    { time: 200, value: "E" },
    { time: 400, value: "O" },
    { time: 600, value: "I" },
    { time: 800, value: "sil" },
  ];
  const [visemes, setVisemes] = useState<Viseme[]>([]);
  const [startTime, setStartTime] = useState(0);
  
  const handleStart = () => {
    const audio = new Audio("/speech_20250706061700896.mp3");

    // Start lip sync when audio starts
    audio.onplay = () => {
      setStartTime(Date.now());
    };

    setVisemes([
      { time: 0, value: "A" },
      { time: 150, value: "E" },
      { time: 300, value: "O" },
    ]);

    audio.play(); // ✅ Will now be allowed because inside user interaction
  };

  const router = useRouter()
  return (
    <div className="flex flex-col min-h-screen bg-[#0A0A0A] text-gray-300">
      <header className="px-4 lg:px-6 h-14 flex items-center sticky top-0 z-50 backdrop-blur-sm bg-[#0A0A0A]/50">
        <Link href="/" className="flex items-center justify-center" prefetch={false}>
          <MountainIcon className="h-6 w-6 text-violet-400" />
          <span className="ml-2 text-lg font-semibold text-white">PeroAI</span>
        </Link>
        <nav className="ml-auto hidden lg:flex gap-4 sm:gap-6 items-center">
          <Link href="#" className="text-sm font-medium hover:text-violet-300 transition-colors" prefetch={false}>
            Product
          </Link>
          <Link href="#" className="text-sm font-medium hover:text-violet-300 transition-colors" prefetch={false}>
            How It Works
          </Link>
          <Link href="#" className="text-sm font-medium hover:text-violet-300 transition-colors" prefetch={false}>
            Docs
          </Link>
          <Link href="#" className="text-sm font-medium hover:text-violet-300 transition-colors" prefetch={false}>
            <Github className="h-5 w-5" />
          </Link>
          <Link href="/login" passHref>
            <Button
              variant="outline"
              className="border-violet-400 text-violet-400 hover:bg-violet-400 hover:text-black transition-colors bg-transparent"
            >
              Try Now
            </Button>
          </Link>
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden ml-auto">
              <Menu className="h-6 w-6 text-white" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-[#0A0A0A] border-l-gray-800 text-white">
            <div className="grid gap-4 p-4">
              <Link href="#" className="text-lg font-medium hover:text-violet-300 transition-colors" prefetch={false}>
                Product
              </Link>
              <Link href="#" className="text-lg font-medium hover:text-violet-300 transition-colors" prefetch={false}>
                How It Works
              </Link>
              <Link href="#" className="text-lg font-medium hover:text-violet-300 transition-colors" prefetch={false}>
                Docs
              </Link>
              <Link
                href="#"
                className="flex items-center gap-2 text-lg font-medium hover:text-violet-300 transition-colors"
                prefetch={false}
              >
                <Github className="h-5 w-5" />
                GitHub
              </Link>
              <Link href="/login" passHref>
                <Button
                  variant="outline"
                  className="w-full mt-4 border-violet-400 text-violet-400 hover:bg-violet-400 hover:text-black transition-colors bg-transparent"
                >
                  Try Now
                </Button>
              </Link>
            </div>
          </SheetContent>
        </Sheet>
      </header>
      <main className="flex-1">
        <section className="w-full py-20 md:py-32 lg:py-40 bg-grid-small-white/[0.05] relative flex items-center justify-center">
          <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-[#0A0A0A] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
              <div className="space-y-6">
                <div className="space-y-4">
                  <p className="text-violet-400 font-medium">PeroAI</p>
                  <h1 className="text-4xl font-bold tracking-tighter text-white sm:text-5xl md:text-6xl">
                    Let Your AI Speak Safely
                  </h1>
                  <p className="max-w-[600px] text-gray-400 md:text-xl/relaxed">
                    PeroAI moderates, rewrites, and speaks GenAI responses with full policy traceability — powered by
                    AWS Bedrock and Amazon Polly.
                  </p>
                </div>
                <div className="flex flex-col gap-4 min-[400px]:flex-row">
                  <Button
                    size="lg"
                    className="bg-violet-500 text-white hover:bg-violet-600 transition-colors shadow-lg shadow-violet-500/20"
                    onClick={() => router.push("/dashboard")}
                  >
                    Try Prompt Demo
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-gray-700 text-white hover:bg-gray-800 hover:border-gray-600 transition-colors bg-transparent"
                  >
                    <Github className="mr-2 h-5 w-5" />
                    View on GitHub
                  </Button>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center">
              {/* <AvatarViewer/> */}
              <Canvas camera={{ position: [0, 1.5, 3], fov: 40 }}>
              <ambientLight intensity={0.5} />
              <directionalLight position={[2, 2, 2]} intensity={1} />
              <AvatarWithLipSync visemes={visemes} startTime={startTime} />
              <OrbitControls enableZoom={false} />
            </Canvas>
              </div>
              <button onClick={()=>{handleStart()}}>Click me</button>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
