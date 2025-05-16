export default function TokenInfoSummary() {
  return (
    <div className="grid grid-cols-3 gap-4 mb-8">
      <div className="bg-black/60 backdrop-blur-sm border border-green-500/30 rounded-xl p-4 text-center">
        <p className="text-green-500 text-sm">Supply</p>
        <p className="text-xl font-bold">1 BILLION</p>
      </div>
      <div className="bg-black/60 backdrop-blur-sm border border-green-500/30 rounded-xl p-4 text-center">
        <p className="text-green-500 text-sm">Min Buy</p>
        <p className="text-xl font-bold">0.1 SOL</p>
      </div>
      <div className="bg-black/60 backdrop-blur-sm border border-green-500/30 rounded-xl p-4 text-center">
        <p className="text-green-500 text-sm">Time Frame</p>
        <p className="text-xl font-bold">69 MIN</p>
      </div>
    </div>
  )
}
