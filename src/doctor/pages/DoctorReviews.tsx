import React from "react";
import { Calendar, CornerDownLeft } from "lucide-react";

type Review = {
  id: string;
  name: string;
  avatar?: string;
  date: string;
  rating: number; // 1-5
  text: string;
  reply?: {
    name: string;
    avatar?: string;
    text: string;
    date: string;
  } | null;
};

const SAMPLE: Review[] = [
  {
    id: "r1",
    name: "Adrian",
    avatar: "https://i.pravatar.cc/48?img=5",
    date: "15 Mar 2025",
    rating: 4,
    text: "Dr. Edalin Hendry has been my family's trusted doctor for years. Their genuine care and thorough approach to our health concerns make every visit reassuring. Dr. Edalin Hendry's ability to listen and explain complex health issues in understandable terms is exceptional. We are grateful to have such a dedicated physician by our side",
  },
  {
    id: "r2",
    name: "Kelly",
    avatar: "https://i.pravatar.cc/48?img=8",
    date: "11 Mar 2025",
    rating: 4,
    text: "I recently completed a series of dental treatments with Dr.Edalin Hendry, and I couldn't be more pleased with the results. From my very first appointment, Dr. Edalin Hendry and their team made me feel completely at ease, addressing all of my concerns with patience and understanding. Their state-of-the-art office and the staff's attention to comfort and cleanliness were beyond impressive.",
    reply: {
      name: "Dr Edalin Hendry",
      avatar: "https://i.pravatar.cc/40?img=7",
      text: "Thank you so much for taking the time to share your experience at our dental clinic. We are deeply touched by your kind words and thrilled to hear about the positive impact of your treatment. Our team strives to provide a comfortable, welcoming environment for all our patients, and it's heartening to know we achieved this for you.",
      date: "2 days ago",
    },
  },
];

function Stars({ value }: { value: number }) {
  return (
    <div className="inline-flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill={i < value ? "#F6C12E" : "#E6E9EE"} xmlns="http://www.w3.org/2000/svg">
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      ))}
    </div>
  );
}

export default function DoctorReviews() {
  const overall = (SAMPLE.reduce((s, r) => s + r.rating, 0) / SAMPLE.length) || 0;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-semibold text-slate-800 mb-4">Reviews</h2>

      {/* Summary card */}
      <div className="bg-white rounded-lg shadow p-4 mb-6 flex items-center justify-between">
        <div>
          <div className="text-sm text-slate-500">Overall Rating</div>
          <div className="mt-2 flex items-center gap-4">
            <div>
              <div className="text-3xl font-bold">{overall.toFixed(1)}</div>
              <div className="mt-1"><Stars value={Math.round(overall)} /></div>
            </div>
          </div>
        </div>

        <div className="text-sm text-slate-500 flex items-center gap-3">
          <div className="px-3 py-2 border rounded-md inline-flex items-center gap-2 bg-gray-50"><Calendar size={16} />12 December 25 - 12 Decen</div>
        </div>
      </div>

      {/* Review list */}
      <div className="space-y-4">
        {SAMPLE.map((r) => (
          <div key={r.id} className="bg-white rounded-lg shadow p-4">
            <div className="flex items-start gap-4">
              <img src={r.avatar} alt={r.name} className="w-12 h-12 rounded-full object-cover" />

              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{r.name}</div>
                    <div className="text-xs text-slate-500">{r.date}</div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Stars value={r.rating} />
                  </div>
                </div>

                <div className="mt-3 text-sm text-slate-700 leading-relaxed">{r.text}</div>

                <div className="mt-3">
                  <button className="inline-flex items-center gap-2 text-sm text-slate-700 hover:text-sky-600"><CornerDownLeft size={14} /> Reply</button>
                </div>

                {r.reply && (
                  <div className="mt-4 bg-gray-50 rounded-md p-3">
                    <div className="flex items-start gap-3">
                      <img src={r.reply.avatar} alt={r.reply.name} className="w-10 h-10 rounded-full object-cover" />
                      <div>
                        <div className="text-sm font-medium">{r.reply.name} <span className="text-xs text-slate-400">· {r.reply.date}</span></div>
                        <div className="mt-2 text-sm text-slate-700">{r.reply.text}</div>
                        <div className="mt-2">
                          <button className="inline-flex items-center gap-2 text-sm text-slate-700 hover:text-sky-600"><CornerDownLeft size={14} /> Reply</button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

