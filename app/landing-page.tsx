import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"
import { Menu, MountainIcon, Github } from "lucide-react"
import { AvatarGraphic } from "@/components/avatar-graphic"
import { useRouter } from "next/navigation"

export default function LandingPage() {
  const router = useRouter()
  return (
    <div className="flex flex-col min-h-screen bg-[#0A0A0A] text-gray-300 font-sans">
      <header className="px-4 lg:px-6 h-14 flex items-center sticky top-0 z-50 backdrop-blur-sm bg-[#0A0A0A]/50">
        <Link href="#" className="flex items-center justify-center" prefetch={false}>
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
          <Button
            variant="outline"
            onClick={() => router.push("/dashboard")}
            className="border-violet-400 text-violet-400 hover:bg-violet-400 hover:text-black transition-colors bg-transparent"
          >
            Try Now
          </Button>
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
              <Button
                variant="outline"
                className="w-full mt-4 border-violet-400 text-violet-400 hover:bg-violet-400 hover:text-black transition-colors bg-transparent"
              >
                Try Now
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:gap-16 items-center">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-4">
                  <h1 className="text-4xl font-bold tracking-tighter text-white sm:text-5xl xl:text-6xl/none">
                    AI Governance Starts with Context
                  </h1>
                  <p className="max-w-[600px] text-gray-400 md:text-xl">
                    PeroAI is a multi-agent GenAI firewall that evaluates, rewrites, and vocalizes prompts using AWS
                    Bedrock, OpenAI, and Amazon Polly — with full policy traceability.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button
                    size="lg"
                    className="bg-violet-500 text-white hover:bg-violet-600 transition-colors shadow-lg shadow-violet-500/20"
                    onClick={() => router.push("/dashboard")}
                  >
                    Try PeroAI
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-gray-700 text-white hover:bg-gray-800 hover:border-gray-600 transition-colors bg-transparent"
                  >
                    View on Git
                  </Button>
                </div>
              </div>
              <div className="w-full h-[300px] md:h-[400px] lg:h-[500px]">
                <AvatarGraphic />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
