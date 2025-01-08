"use client"
import { skills, experiences } from "@/constants"
import Image from "next/image"
import dynamic from "next/dynamic"
import CTA from "@/components/CTA"
import "react-vertical-timeline-component/style.min.css"
import { useState } from "react"

// 动态导入 VerticalTimeline
const VerticalTimeline = dynamic(
  () =>
    import("react-vertical-timeline-component").then(
      (mod) => mod.VerticalTimeline
    ),
  { ssr: false }
)

const VerticalTimelineElement = dynamic(
  () =>
    import("react-vertical-timeline-component").then(
      (mod) => mod.VerticalTimelineElement
    ),
  { ssr: false }
)

const About = () => {
  return (
    <section className="max-container">
      <h1 className="head-text">
        Hello I'm{" "}
        <span className="blue-gradient_text font-semibold drop-shadow">
          Tony
        </span>
      </h1>
      <div className="mt-5 flex flex-col gap-3 text-slate-500">
        <p>
          Nice to meet you! <br /> This is my THREE.js and NEXT practice
        </p>
      </div>
      <div className="py-10 flex flex-col">
        <h3 className="subhead-text">My Skills</h3>
      </div>
      <div className="mt-16 flex flex-wrap gap-12">
        {skills.map((skill, index) => (
          <div className="block-container w-20 h-20" key={index}>
            <div className="btn-back rounded-xl" />
            <div className="btn-front rounded-xl flex justify-center items-center">
              <Image
                src={skill.imageUrl}
                alt=""
                width={16}
                height={16}
                className="w-1/2 h-1/2 object-contain"
              ></Image>
            </div>
          </div>
        ))}
      </div>
      <div className="py-16">
        <h3 className="subhead-text">Work Experience</h3>
        <div className="mt-5 flex flex-col gap-3 text-slate-500">
          <p>
            Nice to meet you! <br /> This is my THREE.js and NEXT practice
          </p>
        </div>
      </div>
      <div className="mt-12 flex">
        <VerticalTimeline>
          {experiences.map((experience, index) => (
            <VerticalTimelineElement
              key={index}
              date={experience.date}
              icon={
                <div className="flex justify-center items-center w-full h-full">
                  <Image
                    src={experience.icon}
                    alt={experience.company_name}
                    className="w-[60%] h-[60%] object-contain"
                    width={100}
                    height={100}
                  ></Image>
                </div>
              }
              iconStyle={{ background: experience.iconBg }}
              contentStyle={{
                borderBottom: "8px",
                borderStyle: "solid",
                borderBottomColor: experience.iconBg,
                boxShadow: "none",
              }}
            >
              <div>
                <h3 className="text-black text-xl font-poppins font-semibold">
                  {experience.title}
                </h3>
                <p
                  className="text-black-500 font-medium font-base"
                  style={{ margin: 0 }}
                >
                  {experience.company_name}
                </p>
              </div>
              <ul className="my-5 list-disc ml-5 space-y-2">
                {experience.points.map((point, index) => (
                  <li
                    className="text-black-500/50 font-normal pl-1 text-sm"
                    key={index}
                  >
                    {point}
                  </li>
                ))}
              </ul>
            </VerticalTimelineElement>
          ))}
        </VerticalTimeline>
      </div>
      <hr className="border-slate-200" />
      <CTA />
    </section>
  )
}

export default About
