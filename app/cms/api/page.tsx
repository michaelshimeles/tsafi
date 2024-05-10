import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function ApiPage() {
  return (
    <main className="flex w-full mt-[1rem] flex-col items-center justify-between ">
      <div className="flex flex-col gap-3 mb-[3rem] w-full">
        <h1 className="text-3xl font-semibold mb-6">API Routes</h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>/api/blog/all</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center space-x-4">
                <span className="font-medium">GET</span>
                <p>Retrieve all blog articles</p>
              </div>
              <div className="flex items-center space-x-4">
                <span className="font-medium">Headers</span>
                <p>X-Auth-Key</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>/api/blog/[slug]</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center space-x-4">
                <span className="font-medium">GET</span>
                <p>Retrieve a blog article by slug</p>
              </div>
              <div className="flex items-center space-x-4">
                <span className="font-medium">Headers</span>
                <p>X-Auth-Key</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>/api/blog/slugs</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center space-x-4">
                <span className="font-medium">POST</span>
                <p>Retrieve all blog article slugs</p>
              </div>
              <div className="flex items-center space-x-4">
                <span className="font-medium">Headers</span>
                <p>X-Auth-Key</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>)
}
