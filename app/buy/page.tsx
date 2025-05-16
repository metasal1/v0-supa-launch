"use client"

import type React from "react"

import { useState } from "react"
import { ArrowRight, Check, AlertCircle, Loader2, ArrowLeft } from "lucide-react"
import Link from "next/link"
import Script from "next/script"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import SocialIcons from "@/components/social-icons"
import CountdownTimer from "@/components/countdown-timer"
import TotalCommitments from "@/components/total-commitments"
import PageFooter from "@/components/page-footer"

export default function BuyCoinPage() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    walletAddress: "",
    amount: "",
    agreeToTerms: false,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  // Sample available tokens
  const availableTokens = [
    {
      id: 1,
      name: "Supa Doge",
      ticker: "SDOGE",
      image: "/playful-pup-token.png",
      description: "The next generation of dog-themed meme tokens on Solana.",
      selected: true,
    },
    {
      id: 2,
      name: "Moon Rocket",
      ticker: "MOON",
      image: "/crypto-moonshot.png",
      description: "To the moon! A rocket-themed token for the Solana ecosystem.",
      selected: false,
    },
    {
      id: 3,
      name: "Pepe Sol",
      ticker: "PSOL",
      image: "/crypto-frog-rally.png",
      description: "The famous frog meme, now on Solana blockchain.",
      selected: false,
    },
  ]

  const totalSteps = 2

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    })

    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      })
    }
  }

  const selectToken = (id: number) => {
    // This would update the selected token in a real application
  }

  const validateStep = () => {
    const newErrors: Record<string, string> = {}

    if (step === 1 && !formData.walletAddress) {
      newErrors.walletAddress = "Wallet address is required"
    }

    if (step === 2) {
      if (!formData.amount) {
        newErrors.amount = "Amount is required"
      } else if (Number.parseFloat(formData.amount) < 0.1) {
        newErrors.amount = "Minimum amount is 0.1 SOL"
      }

      if (!formData.agreeToTerms) {
        newErrors.agreeToTerms = "You must agree to the terms"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const nextStep = () => {
    if (validateStep()) {
      if (step < totalSteps) {
        setStep(step + 1)
      } else {
        handleSubmit()
      }
    }
  }

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const handleSubmit = async () => {
    if (!validateStep()) return

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)

      // Track with Mixpanel
      if (typeof window !== "undefined" && (window as any).mixpanel) {
        ;(window as any).mixpanel.track("Token Purchased", {
          tokenName: availableTokens.find((t) => t.selected)?.name,
          ticker: availableTokens.find((t) => t.selected)?.ticker,
          walletAddress: formData.walletAddress,
          amount: formData.amount,
        })
      }
    }, 2000)
  }

  const resetForm = () => {
    setStep(1)
    setFormData({
      walletAddress: "",
      amount: "",
      agreeToTerms: false,
    })
    setIsSuccess(false)
  }

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
              mixpanel.track('Page View', { page: 'Buy Coin' });
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
          {/* Back Button */}
          <div className="mb-6">
            <Link href="/">
              <motion.button
                className="flex items-center text-green-500 hover:text-green-400 transition-colors"
                whileHover={{ x: -3 }}
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Home
              </motion.button>
            </Link>
          </div>

          {/* Title */}
          <motion.h1
            className="text-4xl md:text-5xl font-bold text-center mb-4 text-green-500 tracking-tight"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Buy <span className="text-white">Coin</span>
          </motion.h1>
          <motion.p
            className="text-center text-gray-400 mb-8"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Just Coin It
          </motion.p>

          {/* Countdown Timer */}
          <CountdownTimer />

          {/* Total Commitments */}
          <TotalCommitments />

          {/* Form Card */}
          <motion.div
            className="bg-black/60 backdrop-blur-sm border border-green-500/50 rounded-xl p-8 shadow-[0_0_30px_rgba(34,197,94,0.3)] mb-12"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            {/* Progress Steps */}
            <div className="flex justify-between mb-8 relative">
              <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-800 -translate-y-1/2 z-0"></div>
              <motion.div
                className="absolute top-1/2 left-0 h-1 bg-green-500 -translate-y-1/2 z-0"
                initial={{ width: "0%" }}
                animate={{ width: `${((step - 1) / (totalSteps - 1)) * 100}%` }}
                transition={{ duration: 0.5 }}
              ></motion.div>

              {[1, 2].map((stepNumber) => (
                <div key={stepNumber} className="z-10 flex flex-col items-center">
                  <motion.div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      stepNumber < step
                        ? "bg-green-500 text-black"
                        : stepNumber === step
                          ? "bg-green-500/20 border-2 border-green-500 text-green-500"
                          : "bg-gray-800 text-gray-500"
                    }`}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                    onClick={() => stepNumber < step && setStep(stepNumber)}
                  >
                    {stepNumber < step ? <Check className="w-5 h-5" /> : <span>{stepNumber}</span>}
                  </motion.div>
                  <span className="text-xs mt-2 text-gray-400">{stepNumber === 1 ? "Select Token" : "Payment"}</span>
                </div>
              ))}
            </div>

            {isSuccess ? (
              <motion.div
                className="text-center py-8"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2, type: "spring" }}
                >
                  <Check className="w-10 h-10 text-green-500" />
                </motion.div>
                <h3 className="text-2xl font-bold text-green-500 mb-2">Success!</h3>
                <p className="text-gray-400 mb-6">
                  You have successfully purchased{" "}
                  <span className="text-green-500 font-bold">
                    {availableTokens.find((t) => t.selected)?.name} ({availableTokens.find((t) => t.selected)?.ticker})
                  </span>{" "}
                  tokens!
                  <br />
                  You have contributed {formData.amount} SOL to the launch.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <motion.button
                    className="bg-green-500 hover:bg-green-600 text-black font-bold py-3 px-6 rounded-full text-lg transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={resetForm}
                  >
                    Buy More Tokens
                  </motion.button>
                  <Link href="/create">
                    <motion.button
                      className="border border-green-500 text-green-500 hover:bg-green-500/10 font-bold py-3 px-6 rounded-full text-lg transition-all duration-300 mt-4 sm:mt-0"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Create Your Own Token
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            ) : (
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {step === 1 && (
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-xl font-bold text-green-500 mb-4">Select a Token</h3>
                        <p className="text-gray-400 mb-6">Choose a token to participate in its launch.</p>

                        <div className="space-y-4">
                          {availableTokens.map((token) => (
                            <motion.div
                              key={token.id}
                              className={`p-4 border ${
                                token.selected ? "border-green-500" : "border-gray-700"
                              } rounded-lg hover:bg-green-500/10 transition-colors cursor-pointer`}
                              whileHover={{ scale: 1.02 }}
                              onClick={() => selectToken(token.id)}
                            >
                              <div className="flex items-center">
                                <div className="w-12 h-12 rounded-full overflow-hidden mr-4 border border-green-500/50">
                                  <Image
                                    src={token.image || "/placeholder.svg"}
                                    alt={token.name}
                                    width={48}
                                    height={48}
                                    className="object-cover"
                                  />
                                </div>
                                <div className="flex-1">
                                  <h4 className="font-bold text-white">
                                    {token.name} <span className="text-green-500">({token.ticker})</span>
                                  </h4>
                                  <p className="text-sm text-gray-400">{token.description}</p>
                                </div>
                                <div className="ml-4">
                                  <div
                                    className={`w-6 h-6 rounded-full ${
                                      token.selected
                                        ? "bg-green-500 flex items-center justify-center"
                                        : "border border-gray-500"
                                    }`}
                                  >
                                    {token.selected && <Check className="w-4 h-4 text-black" />}
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>

                        <div className="mt-6 space-y-2">
                          <label htmlFor="walletAddress" className="block text-sm font-medium text-gray-300">
                            Your Solana Wallet Address
                          </label>
                          <motion.div
                            initial={{ x: 0 }}
                            animate={errors.walletAddress ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                            transition={{ duration: 0.4 }}
                          >
                            <input
                              type="text"
                              id="walletAddress"
                              name="walletAddress"
                              value={formData.walletAddress}
                              onChange={handleInputChange}
                              placeholder="Enter your Solana wallet address"
                              className={`w-full px-4 py-3 bg-black/50 border ${
                                errors.walletAddress ? "border-red-500" : "border-green-500/30"
                              } rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/50 text-white`}
                            />
                          </motion.div>
                          {errors.walletAddress && (
                            <motion.p
                              className="text-red-500 text-sm flex items-center mt-1"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.3 }}
                            >
                              <AlertCircle className="w-4 h-4 mr-1" /> {errors.walletAddress}
                            </motion.p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-xl font-bold text-green-500 mb-4">Payment Details</h3>
                        <p className="text-gray-400 mb-6">
                          Specify how much SOL you want to contribute. Minimum 0.1 SOL.
                        </p>

                        <div className="p-4 border border-green-500/30 rounded-lg bg-black/30 mb-6">
                          <div className="flex items-center">
                            <div className="w-12 h-12 rounded-full overflow-hidden mr-4 border border-green-500/50">
                              <Image
                                src={availableTokens.find((t) => t.selected)?.image || "/placeholder.svg"}
                                alt="Selected token"
                                width={48}
                                height={48}
                                className="object-cover"
                              />
                            </div>
                            <div>
                              <h4 className="font-bold text-white">
                                {availableTokens.find((t) => t.selected)?.name}{" "}
                                <span className="text-green-500">
                                  ({availableTokens.find((t) => t.selected)?.ticker})
                                </span>
                              </h4>
                              <p className="text-sm text-gray-400">
                                {availableTokens.find((t) => t.selected)?.description}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label htmlFor="amount" className="block text-sm font-medium text-gray-300">
                            Amount (SOL)
                          </label>
                          <motion.div
                            initial={{ x: 0 }}
                            animate={errors.amount ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                            transition={{ duration: 0.4 }}
                          >
                            <input
                              type="number"
                              id="amount"
                              name="amount"
                              value={formData.amount}
                              onChange={handleInputChange}
                              placeholder="0.1"
                              min="0.1"
                              step="0.1"
                              className={`w-full px-4 py-3 bg-black/50 border ${
                                errors.amount ? "border-red-500" : "border-green-500/30"
                              } rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/50 text-white`}
                            />
                          </motion.div>
                          {errors.amount && (
                            <motion.p
                              className="text-red-500 text-sm flex items-center mt-1"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.3 }}
                            >
                              <AlertCircle className="w-4 h-4 mr-1" /> {errors.amount}
                            </motion.p>
                          )}
                        </div>

                        <div className="mt-6 space-y-2">
                          <motion.div
                            initial={{ x: 0 }}
                            animate={errors.agreeToTerms ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                            transition={{ duration: 0.4 }}
                            className="flex items-start"
                          >
                            <input
                              type="checkbox"
                              id="agreeToTerms"
                              name="agreeToTerms"
                              checked={formData.agreeToTerms}
                              onChange={handleInputChange}
                              className="mt-1 mr-2"
                            />
                            <label htmlFor="agreeToTerms" className="text-sm text-gray-300">
                              I understand that this is a meme token and I agree to the terms and conditions.
                            </label>
                          </motion.div>
                          {errors.agreeToTerms && (
                            <motion.p
                              className="text-red-500 text-sm flex items-center mt-1"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.3 }}
                            >
                              <AlertCircle className="w-4 h-4 mr-1" /> {errors.agreeToTerms}
                            </motion.p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex justify-between mt-8">
                    {step > 1 ? (
                      <motion.button
                        className="px-6 py-3 border border-green-500/50 text-green-500 rounded-full hover:bg-green-500/10 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={prevStep}
                      >
                        Back
                      </motion.button>
                    ) : (
                      <div></div>
                    )}

                    <motion.button
                      className="bg-green-500 hover:bg-green-600 text-black font-bold py-3 px-6 rounded-full flex items-center transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={nextStep}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          {step === totalSteps ? "Buy Tokens" : "Next"}
                          {step !== totalSteps && <ArrowRight className="ml-2 w-5 h-5" />}
                        </>
                      )}
                    </motion.button>
                  </div>
                </motion.div>
              </AnimatePresence>
            )}
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <PageFooter />
    </div>
  )
}
