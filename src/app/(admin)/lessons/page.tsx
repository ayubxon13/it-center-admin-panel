"use client";
import Header from "@/components/Header";
import Score from "@/components/Score";
import { ClipboardDocumentCheckIcon } from "@heroicons/react/24/outline";

function Lessons() {
  return (
    <main className="grid gap-y-5">
      <Header
        text="Darslar"
        buttonTwo={{
          text: "DARS QO'SHISH",
          click: () => 1,
        }}
      />
      <div className="grid grid-cols-4 justify-self-start gap-5 mb-5 w-full">
        <Score
          active
          onClick={() => 1}
          icon={<ClipboardDocumentCheckIcon width={20} height={20} />}
          title="Hamma darslar"
          total={[]?.length ?? 0}
        />
      </div>
    </main>
  );
}
export default Lessons;
