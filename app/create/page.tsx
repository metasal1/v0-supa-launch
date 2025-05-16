"use client"

import type React from "react"

import { useState, useRef } from "react"
import {
  ArrowRight,
  Check,
  AlertCircle,
  Loader2,
  Globe,
  AtSign,
  Tag,
  FileText,
  ImageIcon,
  Upload,
  X,
  ArrowLeft,
  Twitter,
} from "lucide-react"
import Link from "next/link"
import Script from "next/script"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import SocialIcons from "@/components/social-icons"
import TotalCommitments from "@/components/total-commitments"
import PageFooter from "@/components/page-footer"

export default function CreateCoinPage() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    // Token details
    tokenName: "",
    ticker: "",
    description: "",
    xHandle: "",
    website: "",
    agreeToTerms: false,
  })
  const [tokenImage, setTokenImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]

      // Validate file type
      if (!file.type.match("image.*")) {
        setErrors({
          ...errors,
          tokenImage: "Please select an image file",
        })
        return
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors({
          ...errors,
          tokenImage: "Image must be less than 5MB",
        })
        return
      }

      setTokenImage(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)

      // Clear error
      if (errors.tokenImage) {
        setErrors({
          ...errors,
          tokenImage: "",
        })
      }
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  const removeImage = () => {
    setTokenImage(null)
    setImagePreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const validateStep = () => {
    const newErrors: Record<string, string> = {}

    if (step === 1) {
      if (!formData.tokenName) {
        newErrors.tokenName = "Token name is required"
      }
      if (!formData.ticker) {
        newErrors.ticker = "Ticker symbol is required"
      } else if (formData.ticker.length > 10) {
        newErrors.ticker = "Ticker symbol must be 10 characters or less"
      }
      if (!formData.description) {
        newErrors.description = "Description is required"
      }
      if (!tokenImage) {
        newErrors.tokenImage = "Token image is required"
      }
      // X handle and website are optional
    }

    if (step === 2 && !formData.agreeToTerms) {
      newErrors.agreeToTerms = "You must agree to the terms"
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
        ;(window as any).mixpanel.track("Token Created", {
          tokenName: formData.tokenName,
          ticker: formData.ticker,
        })
      }
    }, 2000)
  }

  const resetForm = () => {
    setStep(1)
    setFormData({
      tokenName: "",
      ticker: "",
      description: "",
      xHandle: "",
      website: "",
      agreeToTerms: false,
    })
    setTokenImage(null)
    setImagePreview(null)
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
              mixpanel.track('Page View', { page: 'Create Coin' });
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
            Create <span className="text-white">Coin</span>
          </motion.h1>
          <motion.p
            className="text-center text-gray-400 mb-8"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Just Coin It
          </motion.p>

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
                  <span className="text-xs mt-2 text-gray-400">{stepNumber === 1 ? "Token Details" : "Confirm"}</span>
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
                  Your token{" "}
                  <span className="text-green-500 font-bold">
                    {formData.tokenName} ({formData.ticker})
                  </span>{" "}
                  has been created!
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <motion.button
                    className="bg-green-500 hover:bg-green-600 text-black font-bold py-3 px-6 rounded-full text-lg transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={resetForm}
                  >
                    Create Another Token
                  </motion.button>
                  <Link href="/buy">
                    <motion.button
                      className="border border-green-500 text-green-500 hover:bg-green-500/10 font-bold py-3 px-6 rounded-full text-lg transition-all duration-300 mt-4 sm:mt-0"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Buy Tokens
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
                        <h3 className="text-xl font-bold text-green-500 mb-4">Token Details</h3>
                        <p className="text-gray-400 mb-6">Enter the details for your new token.</p>

                        <div className="space-y-4">
                          {/* Token Image */}
                          <div className="space-y-2">
                            <label htmlFor="tokenImage" className="flex items-center text-sm font-medium text-gray-300">
                              <ImageIcon className="w-4 h-4 mr-2" /> Token Image
                            </label>

                            <input
                              type="file"
                              id="tokenImage"
                              ref={fileInputRef}
                              onChange={handleImageChange}
                              accept="image/*"
                              className="hidden"
                            />

                            {imagePreview ? (
                              <div className="relative w-32 h-32 mx-auto">
                                <div className="w-full h-full rounded-full overflow-hidden border-2 border-green-500">
                                  <Image
                                    src={imagePreview || "/placeholder.svg"}
                                    alt="Token preview"
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                                <button
                                  onClick={removeImage}
                                  className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1 text-white"
                                  aria-label="Remove image"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </div>
                            ) : (
                              <motion.div
                                initial={{ x: 0 }}
                                animate={errors.tokenImage ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                                transition={{ duration: 0.4 }}
                              >
                                <div
                                  onClick={triggerFileInput}
                                  className={`w-32 h-32 mx-auto rounded-full border-2 border-dashed ${
                                    errors.tokenImage ? "border-red-500" : "border-green-500/50"
                                  } flex flex-col items-center justify-center cursor-pointer hover:bg-green-500/10 transition-colors`}
                                >
                                  <Upload className="w-8 h-8 text-green-500 mb-2" />
                                  <span className="text-sm text-gray-400">Upload Image</span>
                                </div>
                              </motion.div>
                            )}

                            {errors.tokenImage && (
                              <motion.p
                                className="text-red-500 text-sm flex items-center mt-1 justify-center"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                              >
                                <AlertCircle className="w-4 h-4 mr-1" /> {errors.tokenImage}
                              </motion.p>
                            )}
                          </div>

                          {/* Token Name */}
                          <div className="space-y-2">
                            <label htmlFor="tokenName" className="flex items-center text-sm font-medium text-gray-300">
                              <Tag className="w-4 h-4 mr-2" /> Token Name
                            </label>
                            <motion.div
                              initial={{ x: 0 }}
                              animate={errors.tokenName ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                              transition={{ duration: 0.4 }}
                            >
                              <input
                                type="text"
                                id="tokenName"
                                name="tokenName"
                                value={formData.tokenName}
                                onChange={handleInputChange}
                                placeholder="e.g. Super Awesome Token"
                                className={`w-full px-4 py-3 bg-black/50 border ${
                                  errors.tokenName ? "border-red-500" : "border-green-500/30"
                                } rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/50 text-white`}
                              />
                            </motion.div>
                            {errors.tokenName && (
                              <motion.p
                                className="text-red-500 text-sm flex items-center mt-1"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                              >
                                <AlertCircle className="w-4 h-4 mr-1" /> {errors.tokenName}
                              </motion.p>
                            )}
                          </div>

                          {/* Ticker */}
                          <div className="space-y-2">
                            <label htmlFor="ticker" className="flex items-center text-sm font-medium text-gray-300">
                              <AtSign className="w-4 h-4 mr-2" /> Ticker Symbol
                            </label>
                            <motion.div
                              initial={{ x: 0 }}
                              animate={errors.ticker ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                              transition={{ duration: 0.4 }}
                            >
                              <input
                                type="text"
                                id="ticker"
                                name="ticker"
                                value={formData.ticker}
                                onChange={handleInputChange}
                                placeholder="e.g. SAT"
                                className={`w-full px-4 py-3 bg-black/50 border ${
                                  errors.ticker ? "border-red-500" : "border-green-500/30"
                                } rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/50 text-white uppercase`}
                                maxLength={10}
                              />
                            </motion.div>
                            {errors.ticker && (
                              <motion.p
                                className="text-red-500 text-sm flex items-center mt-1"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                              >
                                <AlertCircle className="w-4 h-4 mr-1" /> {errors.ticker}
                              </motion.p>
                            )}
                          </div>

                          {/* Description */}
                          <div className="space-y-2">
                            <label
                              htmlFor="description"
                              className="flex items-center text-sm font-medium text-gray-300"
                            >
                              <FileText className="w-4 h-4 mr-2" /> Description
                            </label>
                            <motion.div
                              initial={{ x: 0 }}
                              animate={errors.description ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                              transition={{ duration: 0.4 }}
                            >
                              <textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                placeholder="Describe your token in a few sentences..."
                                rows={3}
                                className={`w-full px-4 py-3 bg-black/50 border ${
                                  errors.description ? "border-red-500" : "border-green-500/30"
                                } rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/50 text-white`}
                              />
                            </motion.div>
                            {errors.description && (
                              <motion.p
                                className="text-red-500 text-sm flex items-center mt-1"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                              >
                                <AlertCircle className="w-4 h-4 mr-1" /> {errors.description}
                              </motion.p>
                            )}
                          </div>

                          {/* X Handle */}
                          <div className="space-y-2">
                            <label htmlFor="xHandle" className="flex items-center text-sm font-medium text-gray-300">
                              <Twitter className="w-4 h-4 mr-2" /> X Handle (optional)
                            </label>
                            <input
                              type="text"
                              id="xHandle"
                              name="xHandle"
                              value={formData.xHandle}
                              onChange={handleInputChange}
                              placeholder="e.g. @mytoken"
                              className="w-full px-4 py-3 bg-black/50 border border-green-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/50 text-white"
                            />
                          </div>

                          {/* Website */}
                          <div className="space-y-2">
                            <label htmlFor="website" className="flex items-center text-sm font-medium text-gray-300">
                              <Globe className="w-4 h-4 mr-2" /> Website (optional)
                            </label>
                            <input
                              type="url"
                              id="website"
                              name="website"
                              value={formData.website}
                              onChange={handleInputChange}
                              placeholder="e.g. https://mytoken.com"
                              className="w-full px-4 py-3 bg-black/50 border border-green-500/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/50 text-white"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-xl font-bold text-green-500 mb-4">Confirm Your Token Creation</h3>
                        <p className="text-gray-400 mb-6">
                          Please review your information and confirm your token creation.
                        </p>

                        <div className="space-y-4 mb-6">
                          {/* Token Image Preview */}
                          {imagePreview && (
                            <div className="flex justify-center mb-4">
                              <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-green-500">
                                <Image
                                  src={imagePreview || "/placeholder.svg"}
                                  alt="Token preview"
                                  width={96}
                                  height={96}
                                  className="object-cover w-full h-full"
                                />
                              </div>
                            </div>
                          )}

                          <div className="p-4 border border-green-500/30 rounded-lg bg-black/30">
                            <p className="text-sm text-gray-400">Token Details</p>
                            <div className="mt-2 space-y-1">
                              <p className="flex justify-between">
                                <span className="text-gray-400">Name:</span>
                                <span className="font-medium">{formData.tokenName}</span>
                              </p>
                              <p className="flex justify-between">
                                <span className="text-gray-400">Ticker:</span>
                                <span className="font-medium">{formData.ticker}</span>
                              </p>
                              {formData.xHandle && (
                                <p className="flex justify-between">
                                  <span className="text-gray-400">X Handle:</span>
                                  <span className="font-medium">{formData.xHandle}</span>
                                </p>
                              )}
                              {formData.website && (
                                <p className="flex justify-between">
                                  <span className="text-gray-400">Website:</span>
                                  <span className="font-medium">{formData.website}</span>
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="p-4 border border-green-500/30 rounded-lg bg-black/30">
                            <p className="text-sm text-gray-400">Description</p>
                            <p className="mt-2 text-white">{formData.description}</p>
                          </div>

                          <div className="p-4 border border-green-500/30 rounded-lg bg-black/30">
                            <p className="text-sm text-gray-400">Token Supply</p>
                            <p className="text-xl font-bold text-white">1,000,000,000 (1 Billion)</p>
                          </div>
                        </div>

                        <div className="space-y-2">
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
                          {step === totalSteps ? "Create Token" : "Next"}
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
