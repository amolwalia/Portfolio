import { motion } from "motion/react";
import { ProjectCard } from "../ProjectCard";

function WorkPage({ onNavigate }) {
  const projects = [
    {
      id: "scaffold",
      title: "Scaffold",
      category: "Frontend Developer & AI Integration",
      year: "2025",
      image: "/SCAFF0.png",
    },
    {
      id: "dtrmnd",
      title: "DTRMND",
      category: "Frontend Developer & Brand Designer",
      year: "2025",
      image: "/DTR0.png",
    },
    {
      id: "moneymonsters",
      title: "MoneyMonsters",
      category: "UI/UX Designer",
      year: "2025",
      image: "/MM0.png",
    },
  ];

  return (
    <section className="min-h-screen py-32 px-8 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h1
            className="text-5xl md:text-7xl mb-6 uppercase tracking-wider"
            style={{
              fontFamily: "Akira Expanded, sans-serif",
              fontWeight: 800,
            }}
          >
            Projects
          </h1>
          <p
            className="text-xl text-neutral-400 max-w-2xl"
            style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 300 }}
          >
            A focused selection of visual and marketing work across brand
            systems, campaigns, and hospitality.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              {...project}
              index={index}
              onClick={
                onNavigate ? () => onNavigate(`/work/${project.id}`) : undefined
              }
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-20 border border-neutral-800 rounded-2xl p-8 md:p-10 bg-black/30"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h2
                className="text-3xl uppercase tracking-wider"
                style={{
                  fontFamily: "Akira Expanded, sans-serif",
                  fontWeight: 700,
                }}
              >
                Photography
              </h2>
              <p
                className="text-neutral-400 mt-3 max-w-2xl"
                style={{
                  fontFamily: "Montserrat, sans-serif",
                  fontWeight: 300,
                }}
              >
                A quiet practice alongside design, focused on light, texture,
                and form.
              </p>
            </div>
            <div
              className="text-sm uppercase tracking-wider text-neutral-500"
              style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 500 }}
            >
              Available on request
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
export { WorkPage };
