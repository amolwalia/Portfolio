import { motion } from "motion/react";
import { Award, Briefcase, Sparkles, Users } from "lucide-react";

function AboutPage() {
  const skills = [
    "Problem Solving",
    "User-Centered Design",
    "Customer Service",
    "Agile Project Management",
    "Photography",
    "Content Marketing",
    "SEO",
    "SEM",
    "Web Design",
    "Trilingual: English, Hindi, Punjabi",
    "Adobe Creative Suite",
    "React",
    "HTML5",
    "CSS3",
    "JavaScript",
    "REST APIs",
    "MySQL",
    "Figma",
    "Canva",
    "Google Workspace",
    "Microsoft Office Suite",
  ];

  const projectExperience = [
    {
      year: "September 2025 - December 2025",
      role: "Frontend Developer & AI Integration",
      company: "Scaffold",
      description:
        "Designed and built key frontend flows in React, implemented AI-powered grant matching, and integrated OpenAI API for natural-language application drafting.",
    },
    {
      year: "September 2025 - December 2025",
      role: "Frontend Developer & Brand Designer",
      company: "DTRMND",
      description:
        "Built the frontend in Vite + React, designed the visual system, and implemented AI-powered virtual try-on with image-generation based outfit previews.",
    },
    {
      year: "February 2025 - May 2025",
      role: "UI/UX Designer",
      company: "MoneyMonsters",
      description:
        "Led UX research and designed journeys, wireframes, hi-fi interfaces, and design systems for a gamified financial literacy app for children.",
    },
  ];

  const workExperience = [
    {
      year: "September 2024 - Present",
      role: "Administrative Associate",
      company: "Showshaa, British Columbia, Canada",
      description:
        "Supported senior management, coordinated documentation and internal communication, and improved administrative turnaround by approximately 30%.",
    },
    {
      year: "October 2022 - September 2024",
      role: "Social Media Coordinator & Systems Administrator",
      company: "Showshaa, British Columbia, Canada",
      description:
        "Managed social platforms, supported 20+ team members via internal systems, and streamlined digital workflows to improve response times.",
    },
    {
      year: "April 2024 - Present",
      role: "Operations Manager",
      company: "Baba Chicken Canada, British Columbia, Canada",
      description:
        "Oversaw daily operations for 20+ staff per shift, managed 400+ shifts per month, and introduced process improvements that reduced waste by approximately 15%.",
    },
    {
      year: "March 2020 - April 2024",
      role: "Business Systems Architect",
      company: "Apna Chaat House, British Columbia, Canada",
      description:
        "Designed and optimized internal systems for 25+ staff, improving reporting accuracy and reducing manual tracking time by approximately 40%.",
    },
  ];

  const stats = [
    { icon: Briefcase, value: "Product + Brand", label: "Focus" },
    { icon: Users, value: "Cross-functional", label: "Collaboration" },
    { icon: Award, value: "Research-led", label: "Approach" },
    { icon: Sparkles, value: "Detail-driven", label: "Execution" },
  ];

  return (
    <section className="min-h-screen py-32 px-8 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <h1
            className="text-5xl md:text-7xl mb-6 uppercase tracking-wider"
            style={{
              fontFamily: "Akira Expanded, sans-serif",
              fontWeight: 800,
            }}
          >
            About Me
          </h1>
          <p
            className="text-xl text-neutral-400 max-w-3xl"
            style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 300 }}
          >
            Product and visual designer based in Vancouver, BC, focused on
            building clear digital experiences across interface design,
            branding, and growth.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.1 + index * 0.1 }}
              className="text-center p-6 border border-neutral-800 rounded-lg"
            >
              <stat.icon className="w-8 h-8 mx-auto mb-4 text-neutral-400" />
              <div
                className="text-2xl md:text-3xl mb-2"
                style={{
                  fontFamily: "Akira Expanded, sans-serif",
                  fontWeight: 700,
                }}
              >
                {stat.value}
              </div>
              <div
                className="text-neutral-500 text-sm"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2
              className="text-3xl mb-6 uppercase tracking-wide"
              style={{
                fontFamily: "Akira Expanded, sans-serif",
                fontWeight: 700,
              }}
            >
              My Story
            </h2>
            <div
              className="space-y-4 text-neutral-400 leading-relaxed"
              style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 300 }}
            >
              <p>
                I’m Amol Walia, a designer and digital marketer focused on how
                products are presented and understood online. I work across
                branding, marketing assets, and interfaces so the same message
                carries from the first impression to the final action, reducing
                confusion and supporting outcomes like inquiries, sign-ups, and
                purchases.
              </p>
              <p>
                My interest in this field started unexpectedly in grade 11, when
                a career counsellor suggested I might be suited to creative
                problem-solving and encouraged me to take a design aptitude
                exam. I showed up unprepared and still did well, which made me
                reconsider what I was naturally good at. As I explored further,
                design became a genuine interest, photography followed, and
                eventually work experience introduced me to marketing. I began
                to see how presentation, storytelling, and business goals depend
                on each other rather than existing separately.
              </p>
              <p>
                Since then, I’ve approached projects by connecting those parts
                together, working on products like Scaffold, DTRMND, and
                MoneyMonsters, as well as marketing and menu systems for
                restaurants.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h2
              className="text-3xl mb-6 uppercase tracking-wide"
              style={{
                fontFamily: "Akira Expanded, sans-serif",
                fontWeight: 700,
              }}
            >
              Skills
            </h2>
            <div className="flex flex-wrap gap-3">
              {skills.map((skill, index) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.3 + index * 0.03 }}
                  className="px-4 py-2 border border-neutral-700 rounded-full text-neutral-300"
                  style={{ fontFamily: "Montserrat, sans-serif" }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16"
        >
          <h2
            className="text-3xl mb-8 uppercase tracking-wide"
            style={{
              fontFamily: "Akira Expanded, sans-serif",
              fontWeight: 700,
            }}
          >
            Project Experience
          </h2>
          <div className="space-y-8">
            {projectExperience.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                className="border-l-2 border-neutral-800 pl-6 py-2"
              >
                <div
                  className="text-sm text-neutral-500 mb-2"
                  style={{
                    fontFamily: "Montserrat, sans-serif",
                    fontWeight: 500,
                  }}
                >
                  {exp.year}
                </div>
                <h3
                  className="text-xl mb-1"
                  style={{
                    fontFamily: "Akira Expanded, sans-serif",
                    fontWeight: 700,
                  }}
                >
                  {exp.role}
                </h3>
                <div
                  className="text-neutral-400 mb-2"
                  style={{
                    fontFamily: "Montserrat, sans-serif",
                    fontWeight: 500,
                  }}
                >
                  {exp.company}
                </div>
                <p
                  className="text-neutral-500"
                  style={{
                    fontFamily: "Montserrat, sans-serif",
                    fontWeight: 300,
                  }}
                >
                  {exp.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <h2
            className="text-3xl mb-8 uppercase tracking-wide"
            style={{
              fontFamily: "Akira Expanded, sans-serif",
              fontWeight: 700,
            }}
          >
            Work Experience
          </h2>
          <div className="space-y-8">
            {workExperience.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                className="border-l-2 border-neutral-800 pl-6 py-2"
              >
                <div
                  className="text-sm text-neutral-500 mb-2"
                  style={{
                    fontFamily: "Montserrat, sans-serif",
                    fontWeight: 500,
                  }}
                >
                  {exp.year}
                </div>
                <h3
                  className="text-xl mb-1"
                  style={{
                    fontFamily: "Akira Expanded, sans-serif",
                    fontWeight: 700,
                  }}
                >
                  {exp.role}
                </h3>
                <div
                  className="text-neutral-400 mb-2"
                  style={{
                    fontFamily: "Montserrat, sans-serif",
                    fontWeight: 500,
                  }}
                >
                  {exp.company}
                </div>
                <p
                  className="text-neutral-500"
                  style={{
                    fontFamily: "Montserrat, sans-serif",
                    fontWeight: 300,
                  }}
                >
                  {exp.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export { AboutPage };
