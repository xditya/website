const block = "p-3 w-full flex items-center justify-center border-b border-r";

export default function SourceMap() {
  return (
    <div class="overflow-x-auto">
      <div class="grid grid-cols-4 border-t border-l text-sm min-w-[400px]">
        <div class={block + " col-span-4"}>0_deps</div>
        <div class={block + " col-span-4"}>1_utilities</div>
        <div class={block + " col-span-2"}>2_connection</div>
        <div class={block + " col-span-2"}>2_tl</div>
        <div class={block}>3_errors</div>
        <div class={block}>3_storage</div>
        <div class={block}>3_transport</div>
        <div class={block}>3_types</div>
        <div class={block + " col-span-2"}>4_constants</div>
        <div class={block + " col-span-2"}>4_errors</div>
        <div class={block + " col-span-4"}>5_client</div>
      </div>
    </div>
  );
}
