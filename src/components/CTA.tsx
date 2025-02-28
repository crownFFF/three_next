import Link from "next/link"
import React from "react"

const CTA = () => {
  return (
    <section className="cta">
      <p className="cta-text">
        Have a project in mind<br className="sm:block hidden" />Lets build something together!
      </p>
      <Link href='./contact' className="btn">Contact</Link>
    </section>
  )
}

export default CTA
