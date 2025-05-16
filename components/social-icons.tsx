import Link from "next/link"
import { Home, Send, Twitter } from "lucide-react"

export default function SocialIcons() {
  return (
    <div className="flex justify-center gap-4 py-6 px-4">
      <Link
        href="/"
        className="w-12 h-12 flex items-center justify-center rounded-full border border-green-500 text-green-500 hover:bg-green-500/20 transition-colors"
      >
        <Home className="w-5 h-5" />
      </Link>
      <Link
        href="https://t.me/supapumpbot"
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 flex items-center justify-center rounded-full border border-green-500 text-green-500 hover:bg-green-500/20 transition-colors"
      >
        <Send className="w-5 h-5" />
      </Link>
      <Link
        href="https://x.com/supapumpbot"
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 flex items-center justify-center rounded-full border border-green-500 text-green-500 hover:bg-green-500/20 transition-colors"
      >
        <Twitter className="w-5 h-5" />
      </Link>
    </div>
  )
}
