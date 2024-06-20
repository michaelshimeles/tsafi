import { Card } from "@/components/ui/card"

export default function ArticleCard() {
  return (
    <Card className="w-full max-w-xs rounded">
      <div className="relative aspect-square overflow-hidden">
        <img
          alt="Cover image"
          className="w-full h-full blur-2 rounded"
          height="300"
          src="/htf.png"
          // style={{
          //   aspectRatio: "300/300",
          //   objectFit: "cover",
          // }}
          width="300"
        />
        <div className="absolute inset-0 flex items-end px-4 pb-4 pointer-events-none">
          <div className="grid gap-1">
            <h2 className="text-lg font-semibold text-white">Title</h2>
            <p className="text-sm leading-none text-white">Description for the card.</p>
          </div>
        </div>
      </div>
    </Card>
  )
}