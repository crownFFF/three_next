"use client"
import React, { Suspense, useRef, useState } from "react"
import emailjs from "@emailjs/browser"
import { Canvas } from "@react-three/fiber"
import Fox from "@/models/Fox"
import Loading from "@/components/Loading"
import useAlert from "@/hooks/useAlert"
import Alert from "@/components/Alert"

const Contact = () => {
  const formRef = useRef(null)
  const [form, setForm] = useState({ name: "", email: "", message: "" })
  const [isLoading, setIsLoading] = useState(false)
  const [currentAnimation, setCurrentAnimation] = useState("idle")

  const {alert,showAlert,hideAlert} = useAlert()

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setCurrentAnimation("hit")
    emailjs
      .send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID as string,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID as string,
        {
          form_name: form.name,
          to_name: "Tony",
          from_email: form.email,
          to_email: "asd8792323@gmail.com",
          message: form.message,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY as string
      )
      .then(() => {
        setIsLoading(false)
        showAlert({show:true,text:'Message sent successfully',type:'success'})
        setTimeout(() => {
          hideAlert()
          setCurrentAnimation("idle")
          setForm({ name: "", email: "", message: "" })
        }, 3000)
      })
      .catch((error) => {
        showAlert({show:true,text:'I didnt receive your message',type:'danger'})
        setCurrentAnimation("idle")
        console.log(error)
      })
  }

  const handleFocus = () => {
    setCurrentAnimation("walk")
  }
  const handleBlur = () => {
    setCurrentAnimation("idle")
  }

  return (
    <section className="relative flex lg:flex-row flex-col max-container">
      {alert.show&&<Alert {...alert}></Alert>}

      <div className="flex-1 min-w-[50%] flex flex-col">
        <h1 className="head-text">Get in Touch</h1>
        <form
          className="w-full flex flex-col gap-7 mt-14"
          onSubmit={handleSubmit}
          ref={formRef}
        >
          <label className="text-black-500 font-semibold">
            Your Name
            <input
              type="text"
              name="name"
              className="input"
              placeholder="Tomy"
              required
              value={form.name}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </label>
          <label className="text-black-500 font-semibold">
            Your Email
            <input
              type="email"
              name="email"
              className="input"
              placeholder="email"
              required
              value={form.email}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </label>
          <label className="text-black-500 font-semibold">
            Your Message
            <textarea
              name="message"
              className="input"
              placeholder="Let me know how I can help you"
              required
              value={form.message}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </label>
          <button
            type="submit"
            className="btn"
            disabled={isLoading}
            onFocus={handleFocus}
            onBlur={handleBlur}
          >
            {isLoading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>

      <div className="lg:w-1/2 w-full lg:h-auto md:h-[550px] h-[350px]">
        <Canvas camera={{ position: [0, 0, 5], fov: 75, near: 0.1, far: 1000 }}>
          <ambientLight intensity={0.5} />
          <directionalLight intensity={2.5} position={[0, 0, 1]} />
          <Suspense fallback={<Loading />}>
            <Fox
              position={[0.5, 0.35, 0]}
              rotation={[12.6, -0.6, 0]}
              scale={[0.5, 0.5, 0.5]}
              currentAnimation={currentAnimation}
            ></Fox>
          </Suspense>
        </Canvas>
      </div>
    </section>
  )
}

export default Contact
