export default async function Page() {
  return (
    <main className="bg-gray py-4">
      <div className="flex flex-wrap gap-4">
        <div className="flex items-center justify-center rounded-[0.7rem] bg-white p-[2.1rem] lg:text-[2rem]">
          bg-white
        </div>
        <div className="flex items-center justify-center rounded-[0.7rem] border border-white bg-gray p-[2.1rem] lg:text-[2rem]">
          bg-gray
        </div>
        <div className="flex items-center justify-center rounded-[0.7rem] bg-blue p-[2.1rem] lg:text-[2rem]">
          bg-blue
        </div>
        <div className="flex items-center justify-center rounded-[0.7rem] bg-teal p-[2.1rem] lg:text-[2rem]">
          bg-teal
        </div>
        <div className="flex items-center justify-center rounded-[0.7rem] bg-green p-[2.1rem] lg:text-[2rem]">
          bg-green
        </div>
        <div className="flex items-center justify-center rounded-[0.7rem] bg-gold p-[2.1rem] lg:text-[2rem]">
          bg-gold
        </div>
        <div className="flex items-center justify-center rounded-[0.7rem] bg-orange-red p-[2.1rem] lg:text-[2rem]">
          bg-orange-red
        </div>
        <div className="flex items-center justify-center rounded-[0.7rem] bg-brown p-[2.1rem] lg:text-[2rem]">
          bg-brown
        </div>
        <div className="flex items-center justify-center rounded-[0.7rem] bg-black p-[2.1rem] text-white lg:text-[2rem]">
          bg-black
        </div>
      </div>
      <div className="mt-12 flex flex-col items-start">
        <div className="mb-4 flex flex-row flex-wrap items-start gap-4">
          <span className="hxxl">Headline XXL</span>
          <pre>h1, .h1, .hxxl</pre>
        </div>
        <div className="mb-4 flex flex-row flex-wrap items-start gap-4">
          <span className="hxl">Headline XL</span>
          <pre>h2, .h2, .hxl</pre>
        </div>
        <div className="mb-4 flex flex-row flex-wrap items-start gap-4">
          <span className="hl">Headline L</span>
          <pre>h3, .h3, .hl</pre>
        </div>
        <div className="mb-4 flex flex-row flex-wrap items-start gap-4">
          <span className="medium">Medium</span>
          <pre>h4, .h4, .medium</pre>
        </div>
        <div className="mb-4 flex flex-row flex-wrap items-start gap-4">
          <span className="cta">CTA</span>
          <pre>.cta</pre>
        </div>
        <div className="mb-4 flex flex-row flex-wrap items-start gap-4">
          <span className="menu">Menu</span>
          <pre>.menu</pre>
        </div>
        <div className="mb-4 flex flex-row flex-wrap items-start gap-4">
          <span className="input">Input Field</span>
          <pre>.input</pre>
        </div>
        <div className="mb-4 flex flex-row flex-wrap items-start gap-4">
          <span className="body">Body</span>
          <pre>body, .body</pre>
        </div>
        <div className="mb-4 flex flex-row flex-wrap items-start gap-4">
          <span className="cta">Body Medium</span>
          <pre>.body-medium</pre>
        </div>
        <div className="mb-4 flex flex-row flex-wrap items-start gap-4">
          <span className="cta">Caption</span>
          <pre>.caption</pre>
        </div>
      </div>
      <div className="mt-12 flex flex-row flex-wrap items-start">
        <span className="button">Next: Dancer&apos;s Bill of Rights</span>
        <pre> .button</pre>
      </div>
    </main>
  );
}
