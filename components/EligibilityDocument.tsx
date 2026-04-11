import type {
  EligibilityContent,
  EligibilityNumberedListSection,
  EligibilitySection,
  EligibilitySubsection,
  EligibilityTwoColumnSection,
} from '@/types/content';

function InlineBold({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((part, i) => {
        const m = part.match(/^\*\*([^*]+)\*\*$/);
        if (m) return <strong key={i}>{m[1]}</strong>;
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}

function Subsection({ block }: { block: EligibilitySubsection }) {
  return (
    <div>
      <h3 className="text-lg md:text-xl font-semibold text-[#2867AE] mb-4 text-start">
        <span>{block.title}</span>
      </h3>
      {block.intro ? (
        <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-3">{block.intro}</p>
      ) : null}
      {block.listItems?.length ? (
        <ol className="list-decimal list-inside space-y-2 text-sm md:text-base text-gray-700 leading-relaxed">
          {block.listItems.map((item, idx) => (
            <li key={idx}>
              <InlineBold text={item} />
            </li>
          ))}
        </ol>
      ) : null}
    </div>
  );
}

function TwoColumnSection({ section }: { section: EligibilityTwoColumnSection }) {
  return (
    <section>
      <h2 className="text-2xl md:text-3xl font-bold text-[#2867AE] mb-10 text-center">
        <span className="flex items-center justify-center">
          <span className="h-px w-12 bg-[#2867AE] mr-4"></span>
          <span>{section.title}</span>
          <span className="h-px w-12 bg-[#2867AE] ml-4"></span>
        </span>
      </h2>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-8">
          {section.left.map((block, i) => (
            <Subsection key={i} block={block} />
          ))}
        </div>
        <div className={section.right.length > 1 ? 'space-y-8' : ''}>
          {section.right.map((block, i) => (
            <Subsection key={i} block={block} />
          ))}
        </div>
      </div>
    </section>
  );
}

function NumberedListSection({ section }: { section: EligibilityNumberedListSection }) {
  return (
    <section>
      <h2 className="text-2xl md:text-3xl font-bold text-[#2867AE] mb-8 text-start">
        <span>{section.title}</span>
      </h2>
      <ol className="list-decimal list-inside space-y-2 text-sm md:text-base text-gray-700 leading-relaxed">
        {section.items.map((item, idx) => (
          <li key={idx}>
            <InlineBold text={item} />
          </li>
        ))}
      </ol>
    </section>
  );
}

function SectionRenderer({ section }: { section: EligibilitySection }) {
  if (section.type === 'twoColumn') {
    return <TwoColumnSection section={section} />;
  }
  return <NumberedListSection section={section} />;
}

export default function EligibilityDocument({ content }: { content: EligibilityContent }) {
  return (
    <div className="max-w-4xl mx-auto">
      <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-12">{content.intro}</p>

      <div className="space-y-12">
        {content.sections.map((section, idx) => (
          <SectionRenderer key={idx} section={section} />
        ))}
      </div>
    </div>
  );
}
