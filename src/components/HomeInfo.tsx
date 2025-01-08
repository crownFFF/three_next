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
      text="Work with many companies and picked up many skills along the way"
      link="./about"
      btnText="Learn moer"
    ></InfoBox>
  ),
  3: (
    <InfoBox
      text="Led multiple project to success over the years, Curious about the impact"
      link="./project"
      btnText="Visit my portfolio"
    ></InfoBox>
  ),
  4: (
    <InfoBox
      text="Need a project done or looking for a dev? i'am just a few keystrokes away"
      link="./contact"
      btnText="Let's talk"
    ></InfoBox>
  ),
}

const HomeInfo: React.FC<{ currentStage: number }> = ({ currentStage }) => {
  return renderContent[currentStage] || null
}

export default HomeInfo
