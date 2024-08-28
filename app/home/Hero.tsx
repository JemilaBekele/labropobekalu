import Link from "next/link";
import { FlexboxSpacer } from "../components/FlexboxSpacer";

export const Hero = () => {
  return (
    <section className="lg:flex lg:h-[700px] lg:justify-between bg-white">
      <FlexboxSpacer maxWidth={75} minWidth={0} className="hidden lg:block" />
      <div className="flex justify-center lg:w-1/2">
        <div className="max-w-xl pt-8 text-center lg:pt-32 lg:text-left">
          <h1 className="text-primary pb-2 text-4xl font-bold lg:text-5xl">
            Create a professional
            <br />
            Laboratory report  
          </h1>
          
          <Link href="/resume-import" className="btn-primary mt-6 lg:mt-14">
            Create Laboratory report 
          </Link>
        </div>
      </div>
      <div className="flex justify-center lg:w-1/2">
      <div className="mt-6 flex justify-center lg:mt-4 lg:grow bg-white" style={{ overflow: 'hidden' }}>
      <video
        className="w-full h-auto"
        autoPlay
        muted
        playsInline
        loop
      >
        <source src="/image/video6.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>

      </div>
      <FlexboxSpacer maxWidth={100} minWidth={50} className="hidden lg:block" />
    </section>
  );
};