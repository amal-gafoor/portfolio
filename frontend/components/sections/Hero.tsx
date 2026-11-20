import Image from "next/image";
import { site } from "@/content/site";
import { Reveal } from "@/components/ui/Reveal";
import { Chat } from "@/components/chat/Chat";

export function Hero() {
  return (
    <section
      id="home"
      className="mx-auto flex min-h-[100svh] max-w-[1100px] flex-col justify-center px-5 pb-28 pt-20 md:px-8 md:pb-16 md:pt-28"
    >
      <div className="grid items-start gap-8 md:grid-cols-[1.5fr_1fr] md:gap-12">
        {/* name + chat */}
        <div className="order-2 min-w-0 md:order-1">
          <Reveal>
            <h1 className="text-[40px] font-semibold leading-[1.05] tracking-tight md:text-[60px]">{site.name}</h1>
            <p className="mt-2 font-mono text-sm uppercase tracking-[0.25em] text-muted-foreground md:text-base">
              {site.role}
            </p>
          </Reveal>
          <Reveal delay={0.1} className="mt-7">
            <Chat />
          </Reveal>
        </div>

        {/* photo */}
        <Reveal delay={0.05} className="order-1 flex justify-start md:order-2 md:justify-end md:pt-3">
          <div className="relative h-[132px] w-[132px] md:h-[340px] md:w-[340px]">
            <Image
              src="/avatar.png"
              alt={site.name}
              width={512}
              height={512}
              priority
              sizes="(max-width: 768px) 132px, 340px"
              className="h-full w-full rounded-2xl border object-cover md:rounded-3xl"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
