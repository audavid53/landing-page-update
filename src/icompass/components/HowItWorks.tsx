import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

function CountUp({ target = 200, duration = 1600 }: { target?: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    let animationFrameId: number;

    const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = easeOutExpo(progress);
      setCount(Math.floor(eased * target));

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };

    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isInView, target, duration]);

  return <span ref={ref}>{count}</span>;
}

export function JourneySection() {
  return (
    <section className="commitment-section" id="impact">
      <div className="refined-inner commitment-grid">
        <motion.div
          className="commitment-number"
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="commitment-number__orbit" aria-hidden="true" />
          <strong>
            <CountUp target={200} duration={1600} />
          </strong>
          <span>
            scholarships to Nigerian students<br />in secondary &amp; university
          </span>
        </motion.div>

        <motion.div
          className="commitment-copy"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="refined-eyebrow">Our commitment</span>
          <h2>
            Career by choice.<br />
            <em>Not by chance.</em>
          </h2>
          <p>
            We are committed to giving <strong>200 scholarships to Nigerian students in secondary and university</strong> to access international-standard career guidance infrastructure.
          </p>
          <p>
            iCompass is built in line with Nigeria's move toward a national career guidance policy framework, making a clearer, intentional path possible for ambitious young minds.
          </p>
          <a className="refined-text-link" href="#community">
            Meet your support system <ArrowUpRight size={19} aria-hidden="true" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
