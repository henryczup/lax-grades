import Search from "@/components/component/search-components/search"
import { BackgroundGradientAnimation } from "@/components/ui/background-animations"
import { Skeleton } from "@/components/ui/skeleton"
import { Suspense } from "react"

export default function Home() {
  return (
    <div className="bg-white">
      <BackgroundGradientAnimation>
        <div className="absolute z-50 inset-0 flex items-center justify-center">
          <main className="flex flex-col items-center px-3">
            <h1 className="text-3xl lg:text-6xl font-bold tracking-tight text-center text-black ">
              Find grade distributions for UWL classes
            </h1>
            <p className="mb-12 mt-7 text-2xl lg:text-3xl opacity-75 text-center text-black">
              View all the past grades for classes taken at the University of Wisconsin, Lacrosse.
            </p>
            <div className="md:w-[600px] sm:w-11/12">
              <Suspense fallback={<Skeleton className="w-[600px] h-16" />}>
                <Search placeholder="Search by Class, Department, or Intructor" />
              </Suspense>
            </div>
          </main>
        </div>
      </BackgroundGradientAnimation>
    </div>
  )
}