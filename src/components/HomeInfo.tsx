import Link from "next/link"
import React from "react"
import Image from "next/image"

interface InfoBoxProps {
  text: string
  link: string
  btnText: string
}

const InfoBox: React.FC<InfoBoxProps> = ({ text, link, btnText }) => (
  <div className="info-box">
    <p className="font-medium sm:text-xl text-center">{text}</p>
    <Link href={link} className="neo-brutalism-white neo-btn">
      {btnText}
      <Image
        src="/assets/icons/arrow.svg"
        alt=""
        className="w-4 h-4 object-contain"
        width={16}
        height={16}
      />
    </Link>
  </div>
)

const renderContent: { [key: number]: JSX.Element } = {
  1: (
    <h1 className="sm:text-xl sm:leading-snug text-center neo-brutalism-blue py-4 px-8 text-white mx-5">
      Hi, I am <span>Tony</span>
      <br />
      this is my ThreePratice
    </h1>
  ),
  2: (
    <InfoBox
      text="HI"
      link="./"
      btnText="Learn moer"
    ></InfoBox>
  ),
  3: (
    <InfoBox
      text="Hello"
      link="./"
      btnText="Visit my portfolio"
    ></InfoBox>
  ),
  4: (
    <InfoBox
      text="Is me"
      link="./contact"
      btnText="Let's talk"
    ></InfoBox>
  ),
}

const HomeInfo: React.FC<{ currentStage: number }> = ({ currentStage }) => {
  return renderContent[currentStage] || null
}

export default HomeInfo
