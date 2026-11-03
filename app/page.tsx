import Hero from "@/components/Hero";
import SeedPacket from "@/components/SeedPacket";
import Accents from "@/components/Accents";
import HelloForm from "@/components/HelloForm";
import { projects } from "@/data/projects";

export default function Home() {
  return (
    <>
      <Hero />
      <main>
        <section className="page" id="work">
          <h2>my work</h2>
          <p className="lead">
            Selected UI/UX case studies, each one a seed packet tied with twine. Untie a bow to
            peek inside, then open the full case study.
          </p>
          <div className="packets-grid">
            {projects.map((project, i) => (
              <SeedPacket key={project.slug} project={project} index={i} />
            ))}
          </div>
        </section>

        <section className="page" id="about">
          <div className="split">
            <div>
              <h2>about me</h2>
              <p className="lead">
                I’m Iris, a UI/UX designer who likes thoughtful design, rooted in{" "}
                <span className="rn-circle">curiosity</span>. Replace this paragraph with your
                real bio: where you’re based, what kind of products you love designing, your
                tools (Figma, prototyping, user research), and what you’re looking for next.
              </p>
              <p className="lead">A small garden. A little curiosity.</p>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/about-iris.webp"
              alt="Close-up of a pale purple iris covered in rain droplets"
            />
          </div>
        </section>

        <section className="page" id="hello">
          <h2>say hello</h2>
          <p className="lead">
            Want to <span className="rn-highlight">work together</span>, or just talk design?
            Send a note here — replace the button action with your real email when you’re ready
            to publish.
          </p>
          <HelloForm />
        </section>
      </main>
      <footer>
        <p>
          © 2026 Iris · Grown with care · <a href="#garden">back to the garden ↑</a>
        </p>
      </footer>
      <Accents />
    </>
  );
}
