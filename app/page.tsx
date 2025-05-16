"use client"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import Script from "next/script"
import { motion } from "framer-motion"
import WindowAnimation from "@/components/window-animation"
import TotalCommitments from "@/components/total-commitments"
import TokenInfoSummary from "@/components/token-info-summary"
import SocialIcons from "@/components/social-icons"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Analytics */}
      <Script src="https://va.vercel-scripts.com/v1/script.js" strategy="afterInteractive" />
      <Script id="mixpanel-setup" strategy="afterInteractive">
        {`
          (function(f,b){if(!b.__SV){var e,g,i,h;window.mixpanel=b;b._i=[];b.init=function(e,f,c){function g(a,d){var b=d.split(".");2==b.length&&(a=a[b[0]],d=b[1]);a[d]=function(){a.push([d].concat(Array.prototype.slice.call(arguments,0)))}}var a=b;"undefined"!==typeof c?a=b[c]=[]:c="mixpanel";a.people=a.people||[];a.toString=function(a){var d="mixpanel";"mixpanel"!==c&&(d+="."+c);a||(d+=" (stub)");return d};a.people.toString=function(){return a.toString(1)+".people (stub)"};i="disable time_event track track_pageview track_links track_forms track_with_groups add_group set_group remove_group register register_once alias unregister identify name_tag set_config reset opt_in_tracking opt_out_tracking has_opted_in_tracking has_opted_out_tracking clear_opt_in_out_tracking start_batch_senders people.set people.set_once people.unset people.increment people.append people.union people.track_charge people.clear_charges people.delete_user people.remove".split(" ");
          for(h=0;h<i.length;h++)g(a,i[h]);var j="set set_once union unset remove delete".split(" ");a.get_group=function(){function b(c){d[c]=function(){call2_args=arguments;call2=[c].concat(Array.prototype.slice.call(call2_args,0));a.push([e,call2])}}for(var d={},e=["get_group"].concat(Array.prototype.slice.call(arguments,0)),c=0;c<j.length;c++)b(j[c]);return d};b._i.push([e,f,c])};b.__SV=1.2;e=f.createElement("script");e.type="text/javascript";e.async=!0;e.src="https://cdn.mxpnl.com/libs/mixpanel-2-latest.min.js";g=f.getElementsByTagName("script")[0];g.parentNode.insertBefore(e,g)}})(document,window.mixpanel||[]);
          
          // Fallback implementation to bypass ad blockers
          window.addEventListener('DOMContentLoaded', function() {
            setTimeout(function() {
              if (!window.mixpanel || !window.mixpanel.hasOwnProperty('__loaded') || window.mixpanel.__loaded !== true) {
                console.log('Mixpanel blocked, using fallback');
                window.mixpanel = {
                  track: function(event_name, properties) {
                    const endpoint = '/api/analytics';
                    fetch(endpoint, {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ event: event_name, props: properties })
                    }).catch(function(err) {
                      console.error('Fallback analytics error:', err);
                    });
                  },
                  identify: function(id) {},
                  alias: function(id) {},
                  people: { set: function() {} }
                };
              }
              
              mixpanel.init('${process.env.NEXT_PUBLIC_MIXPANEL}', {track_pageview: true});
              mixpanel.track('Page View', { page: 'Home' });
            }, 1000);
          });
        `}
      </Script>

      {/* Social Icons */}
      <SocialIcons />

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 relative">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-green-500/20 blur-[100px]"></div>
        </div>

        <div className="relative z-10 max-w-3xl w-full">
          {/* Alarm Clock Icon */}
          <motion.div
            className="flex justify-center mb-8"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative">
              <motion.div
                className="w-32 h-32 rounded-full border-8 border-green-500 flex items-center justify-center relative"
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(34,197,94,0.3)",
                    "0 0 40px rgba(34,197,94,0.6)",
                    "0 0 20px rgba(34,197,94,0.3)",
                  ],
                }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              >
                <div className="absolute top-0 right-0 w-8 h-16 bg-green-500 rounded-full -mr-4 mt-2"></div>
                <div className="absolute top-0 left-0 w-8 h-16 bg-green-500 rounded-full -ml-4 mt-2"></div>
                <div className="w-4 h-4 bg-green-500 rounded-full absolute"></div>
                <motion.div
                  className="w-1 h-12 bg-green-500 absolute"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 60, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                ></motion.div>
                <motion.div
                  className="w-1 h-8 bg-green-500 absolute"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                ></motion.div>
              </motion.div>
              <motion.div
                className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-green-500 rounded-full"
                animate={{
                  boxShadow: [
                    "0 0 5px rgba(34,197,94,0.5)",
                    "0 0 15px rgba(34,197,94,0.8)",
                    "0 0 5px rgba(34,197,94,0.5)",
                  ],
                }}
                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
              ></motion.div>
              <motion.div
                className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-green-500 rounded-full"
                animate={{
                  boxShadow: [
                    "0 0 5px rgba(34,197,94,0.5)",
                    "0 0 15px rgba(34,197,94,0.8)",
                    "0 0 5px rgba(34,197,94,0.5)",
                  ],
                }}
                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, delay: 0.75 }}
              ></motion.div>
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1
            className="text-5xl md:text-7xl font-bold text-center mb-4 text-green-500 tracking-tight"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Supa <span className="text-white">Launch</span>
          </motion.h1>
          <motion.p
            className="text-center text-gray-400 mb-8"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Just Coin It
          </motion.p>

          {/* 69 Window Animation */}
          <WindowAnimation />

          {/* Total Commitments */}
          <TotalCommitments />

          {/* Token Info Summary */}
          <TokenInfoSummary />

          {/* Options */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Link href="/create">
              <motion.div
                className="bg-black/60 backdrop-blur-sm border border-green-500/50 rounded-xl p-8 shadow-[0_0_30px_rgba(34,197,94,0.3)] h-full flex flex-col items-center justify-center text-center hover:bg-green-500/10 transition-all duration-300"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-green-500"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M8 12h8" />
                    <path d="M12 8v8" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-green-500 mb-2">Create Coin</h2>
                <p className="text-gray-400">Launch your own meme token on Solana</p>
                <div className="mt-6 flex items-center text-green-500">
                  <span className="mr-2">Get Started</span>
                  <ArrowRight size={16} />
                </div>
              </motion.div>
            </Link>

            <Link href="/buy">
              <motion.div
                className="bg-black/60 backdrop-blur-sm border border-green-500/50 rounded-xl p-8 shadow-[0_0_30px_rgba(34,197,94,0.3)] h-full flex flex-col items-center justify-center text-center hover:bg-green-500/10 transition-all duration-300"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-green-500"
                  >
                    <circle cx="12" cy="12" r="8" />
                    <line x1="12" y1="16" x2="12" y2="12" />
                    <line x1="12" y1="8" x2="12.01" y2="8" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-green-500 mb-2">Buy Coin</h2>
                <p className="text-gray-400">Participate in token launches</p>
                <div className="mt-6 flex items-center text-green-500">
                  <span className="mr-2">Explore Tokens</span>
                  <ArrowRight size={16} />
                </div>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
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
    </div>
  )
}
