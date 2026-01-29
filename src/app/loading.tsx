import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { VerdantFlowLogo } from "@/components/VerdantFlowLogo";

export default function Loading() {
  return (
    <div className="flex flex-col items-center min-h-screen p-4 sm:p-6 lg:p-8">
      <main className="w-full max-w-4xl">
        <header className="flex items-center gap-3 mb-8">
           <VerdantFlowLogo className="w-10 h-10 text-muted-foreground animate-pulse" />
          <Skeleton className="h-10 w-64" />
        </header>

        <Card className="mb-8">
          <CardContent className="pt-6 space-y-4">
            <Skeleton className="h-12 w-full" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="flex justify-end">
              <Skeleton className="h-10 w-32" />
            </div>
          </CardContent>
        </Card>

        <div className="space-y-8">
          <section>
            <Skeleton className="h-8 w-48 mb-4" />
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <Card key={i}>
                  <CardContent className="p-4 flex items-start gap-4">
                    <Skeleton className="h-6 w-6 rounded-sm mt-1" />
                    <div className="flex-grow space-y-2">
                      <Skeleton className="h-6 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                    </div>
                    <Skeleton className="h-9 w-20" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
