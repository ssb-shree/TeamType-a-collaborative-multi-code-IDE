import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, { useRef } from "react";
import { Play, Terminal } from "lucide-react";

const InputOutputBox = () => {
  const outputRef = useRef("");
  const inputRef = useRef("");

  return (
    <div className="bg-slate-900 p-2 rounded-xl w-full h-full shadow-lg flex">
      <Tabs
        defaultValue="output"
        className={`h-full w-full flex justify-between`}
      >
        <div className="w-full flex justify-between">
          <TabsList className="bg-slate-800 border border-slate-700 rounded-t-md">
            <TabsTrigger
              value="input"
              className="data-[state=active]:bg-slate-950 data-[state=active]:text-cyan-400 text-white px-4 py-1 flex items-center gap-2 font-mono text-lg"
            >
              <Terminal size={16} />
              Input
            </TabsTrigger>
            <TabsTrigger
              value="output"
              className="data-[state=active]:bg-slate-950 data-[state=active]:text-cyan-400 text-white px-4 py-1 font-mono text-lg"
            >
              Output
            </TabsTrigger>
          </TabsList>
          <button
            type="button"
            className="bg-slate-800 border px-1 border-slate-700 rounded-t-md hover:bg-slate-950 hover:text-cyan-300"
          >
            <Play className="fill-cyan-400" />
          </button>
        </div>

        <TabsContent
          value="input"
          className="bg-black text-green-400 p-4 font-mono rounded-b-md border border-t-0 border-slate-700 overflow-auto"
        >
          <div>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Inventore aspernatur harum officia nobis quas. Atque dolores
              expedita, aliquid ipsum odio nisi voluptatibus maiores itaque
              velit aperiam exercitationem voluptatem perferendis nobis
              explicabo odit veritatis architecto quisquam quasi enim
              accusantium? Beatae recusandae aspernatur enim pariatur modi alias
              vero reiciendis nisi debitis dignissimos ea doloremque esse eum,
              repellendus minima quisquam veniam maiores voluptas vitae. Odit
              aliquid, iste suscipit placeat distinctio in rem quo maiores
              excepturi, laudantium hic assumenda debitis ea tempora ipsam
              fugiat, unde officia recusandae asperiores quod illo perspiciatis
              similique vel illum? Id pariatur, ipsum, assumenda praesentium
              dolore excepturi deleniti iure in aspernatur animi aliquam
              voluptatum. Fugit sint beatae possimus unde vitae quidem atque
              repellendus, nulla adipisci nesciunt mollitia consequatur, dolores
              doloremque praesentium maxime at labore id pariatur quaerat vel
              laborum sit expedita ullam. Provident nobis facilis recusandae
              dolores fugiat exercitationem sed eos sunt vitae, ea laborum, at
              perspiciatis odit consequatur doloremque odio minima nisi tempora?
              Doloribus quam quia debitis ipsa. Vel asperiores molestias ipsa
              ducimus unde quis, esse omnis eum ratione, dolorum voluptate
              pariatur voluptates voluptatum vitae dolore mollitia ipsam.
              Impedit autem itaque ab! Eligendi obcaecati natus repellendus
              consequatur excepturi, culpa maiores. Rerum sit corrupti autem,
              facilis sunt, obcaecati minus nihil consequatur eum tempora ipsa
              voluptate aperiam nulla! Quia ullam et id. Quibusdam eos
              consequatur nobis, accusantium aliquid vitae hic at ut enim quam
              explicabo eum fugit mollitia doloremque sunt earum, dolorum rem
              ratione. Et in nemo voluptates distinctio, exercitationem harum
              nostrum tempore reiciendis, error, voluptate magnam. Magnam
              obcaecati nobis debitis doloremque assumenda id non harum neque
              quia. Aspernatur dolorem molestiae, quas reiciendis porro quae
              autem possimus repudiandae quo sapiente dicta iste natus
              recusandae nisi, eveniet quam voluptatibus veniam accusamus nulla
              sit delectus pariatur necessitatibus fuga eos. Asperiores quos
              nihil id harum neque aspernatur impedit temporibus soluta nemo
              esse culpa minus reprehenderit ea, rerum, quisquam voluptatibus
              dolores fugit quam non! Debitis, ratione culpa eveniet earum
              asperiores perspiciatis sit veritatis nihil magnam dolorem nostrum
              itaque voluptatum voluptas aut at quis dignissimos distinctio!
              Reprehenderit maxime non maiores harum enim iusto officiis, dolore
              qui quis neque error provident repudiandae, quae nobis! Facilis,
              aut nulla expedita similique beatae cumque voluptate mollitia
              ducimus in omnis a doloremque. Illo commodi perspiciatis in
              corporis aspernatur illum unde dolores neque cum ex, a velit ipsum
              placeat distinctio totam adipisci ea necessitatibus nostrum
              numquam repellat debitis dolor ut tempora. Sit itaque voluptate
              suscipit impedit cupiditate doloremque, quaerat accusamus
              obcaecati inventore?
            </p>
          </div>
        </TabsContent>

        <TabsContent
          value="output"
          className="bg-black text-green-400 p-4 font-mono rounded-b-md border border-t-0 border-slate-700 overflow-auto"
        >
          <div>
            <p>Piston Output here</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InputOutputBox;
