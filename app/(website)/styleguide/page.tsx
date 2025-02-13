export default async function Page() {
    return (
        <main className="bg-gray py-4">
            <div className="flex gap-4 flex-wrap">
                <div className="bg-white p-[2.1rem] rounded-[0.7rem] lg:text-[2rem] flex items-center justify-center">bg-white</div>
                <div className="bg-gray border border-white p-[2.1rem] rounded-[0.7rem] lg:text-[2rem] flex items-center justify-center">bg-gray</div>
                <div className="bg-blue p-[2.1rem] rounded-[0.7rem] lg:text-[2rem] flex items-center justify-center">bg-blue</div>
                <div className="bg-teal p-[2.1rem] rounded-[0.7rem] lg:text-[2rem] flex items-center justify-center">bg-teal</div>
                <div className="bg-green p-[2.1rem] rounded-[0.7rem] lg:text-[2rem] flex items-center justify-center">bg-green</div>
                <div className="bg-gold p-[2.1rem] rounded-[0.7rem] lg:text-[2rem] flex items-center justify-center">bg-gold</div>
                <div className="bg-orange-red p-[2.1rem] rounded-[0.7rem] lg:text-[2rem] flex items-center justify-center">bg-orange-red</div>
                <div className="bg-brown p-[2.1rem] rounded-[0.7rem] lg:text-[2rem] flex items-center justify-center">bg-brown</div>
                <div className="bg-black text-white p-[2.1rem] rounded-[0.7rem] lg:text-[2rem] flex items-center justify-center">bg-black</div>
            </div>
            <div className="mt-12 flex flex-col items-start">
                <div className="flex flex-row flex-wrap items-start gap-4 mb-4">
                    <span className="hxxl">Headline XXL</span>
                    <pre>h1, .h1, .hxxl</pre>
                </div>
                <div className="flex flex-row flex-wrap items-start gap-4 mb-4">
                    <span className="hxl">Headline XL</span>
                    <pre>h2, .h2, .hxl</pre>
                </div>
                <div className="flex flex-row flex-wrap items-start gap-4 mb-4">
                    <span className="hl">Headline L</span>
                    <pre>h3, .h3, .hl</pre>
                </div>
                <div className="flex flex-row flex-wrap items-start gap-4 mb-4">
                    <span className="medium">Medium</span>
                    <pre>h4, .h4, .medium</pre>
                </div>
                <div className="flex flex-row flex-wrap items-start gap-4 mb-4">
                    <span className="cta">CTA</span>
                    <pre>.cta</pre>
                </div>
                <div className="flex flex-row flex-wrap items-start gap-4 mb-4">
                    <span className="menu">Menu</span>
                    <pre>.menu</pre>
                </div>
                <div className="flex flex-row flex-wrap items-start gap-4 mb-4">
                    <span className="input">Input Field</span>
                    <pre>.input</pre>
                </div>
                <div className="flex flex-row flex-wrap items-start gap-4 mb-4">
                    <span className="body">Body</span>
                    <pre>body, .body</pre>
                </div>
                <div className="flex flex-row flex-wrap items-start gap-4 mb-4">
                    <span className="cta">Body Medium</span>
                    <pre>.body-medium</pre>
                </div>
                <div className="flex flex-row flex-wrap items-start gap-4 mb-4">
                    <span className="cta">Caption</span>
                    <pre>.caption</pre>
                </div>
            </div>
            <div className="mt-12 flex flex-row flex-wrap items-start">
                <span className="button">Next: Dancer's Bill of Rights</span>
                <pre> .button</pre>
            </div>
        </main>
    )
}