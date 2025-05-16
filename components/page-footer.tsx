import Link from "next/link"

export default function PageFooter() {
  return (
    <footer className="py-6 border-t border-green-500/20 text-center text-sm text-gray-500">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p>© 2025 Supa Launch. All rights reserved.</p>
          </div>
          <div className="flex items-center gap-4">
            <Link href="https://metasal.xyz" className="text-green-500 hover:text-green-400">
              metasal.xyz
            </Link>
            <Link href="/terms" className="text-gray-500 hover:text-gray-400">
              Terms
            </Link>
            <Link href="/privacy" className="text-gray-500 hover:text-gray-400">
              Privacy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
