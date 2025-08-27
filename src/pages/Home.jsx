export default function Home() {
  return (
    <section className="flex flex-row flex-wrap w-[800px] m-8 text-black">
      <input
        id="tab-one"
        type="radio"
        name="tabs"
        className="peer/tab-one opacity-0 absolute"
        defaultChecked
      />
      <label
        htmlFor="tab-one"
        className="bg-slate-300 hover:bg-slate-200 peer-checked/tab-one:bg-gray-200 cursor-default p-4 rounded-t-lg block"
      >
        Published
      </label>

      <input
        id="tab-two"
        type="radio"
        name="tabs"
        className="peer/tab-two opacity-0 absolute"
      />
      <label
        htmlFor="tab-two"
        className="bg-slate-300 hover:bg-slate-200 peer-checked/tab-two:bg-gray-200 cursor-default p-4 rounded-t-lg block"
      >
        Draft
      </label>

      <input
        id="tab-three"
        type="radio"
        name="tabs"
        className="peer/tab-three opacity-0 absolute"
      />
      <label
        htmlFor="tab-three"
        className="bg-slate-300 hover:bg-slate-200 peer-checked/tab-three:bg-gray-200 cursor-default p-4 rounded-t-lg block"
      >
        Thrash
      </label>

      <div className="basis-full h-0"></div>

      <div className="bg-gray-200 hidden peer-checked/tab-one:block p-4 w-full">
        First tab
      </div>
      <div className="bg-gray-200 hidden peer-checked/tab-two:block p-4 w-full">
        Second tab
      </div>
      <div className="bg-gray-200 hidden peer-checked/tab-three:block p-4 w-full">
        Third tab
      </div>
    </section>
  );
}
