"use client";

export default function ArchitectureDiagram({ recommendation }) {
  if (!recommendation) return null;

  return (
    <div className="mt-10">

      <h2 className="text-3xl font-bold text-cyan-400 text-center mb-8">
        🏗 Recommended Architecture
      </h2>

      <div className="max-w-4xl mx-auto">

        {/* Frontend */}
        <div className="flex justify-center">
          <div className="bg-cyan-700 rounded-xl px-8 py-4 text-center shadow-lg">
            <div className="text-2xl">⚛</div>
            <div className="font-bold">React</div>
            <div className="text-sm text-gray-200">
              Frontend
            </div>
          </div>
        </div>

        <div className="text-center text-cyan-400 text-3xl my-3">
          ↓
        </div>

        {/* Backend */}
        <div className="flex justify-center">
          <div className="bg-green-700 rounded-xl px-8 py-4 text-center shadow-lg">
            <div className="text-2xl">⚡</div>
            <div className="font-bold">FastAPI</div>
            <div className="text-sm text-gray-200">
              Backend API
            </div>
          </div>
        </div>

        <div className="text-center text-cyan-400 text-3xl my-3">
          ↓
        </div>

        {/* Architecture */}
        <div className="flex justify-center">
          <div className="bg-purple-700 rounded-xl px-10 py-5 text-center shadow-lg">
            <div className="text-2xl">🏗</div>
            <div className="font-bold">
              {recommendation.architecture}
            </div>
          </div>
        </div>

        <div className="text-center text-cyan-400 text-3xl my-3">
          ↓
        </div>

        {/* Infrastructure */}
        <div className="grid md:grid-cols-3 gap-5">

          <div className="bg-blue-700 rounded-xl p-5 text-center">
            <div className="text-2xl">🗄️</div>
            <div className="font-bold">Database</div>
            <div className="text-sm mt-2">
              {recommendation.database}
            </div>
          </div>

          <div className="bg-red-700 rounded-xl p-5 text-center">
            <div className="text-2xl">⚡</div>
            <div className="font-bold">Cache</div>
            <div className="text-sm mt-2">
              {recommendation.cache}
            </div>
          </div>

          <div className="bg-indigo-700 rounded-xl p-5 text-center">
            <div className="text-2xl">📨</div>
            <div className="font-bold">Message Queue</div>
            <div className="text-sm mt-2">
              {recommendation.message_queue}
            </div>
          </div>

        </div>

        <div className="text-center text-cyan-400 text-3xl my-3">
          ↓
        </div>

        {/* Deployment */}
        <div className="grid md:grid-cols-2 gap-5">

          <div className="bg-purple-800 rounded-xl p-5 text-center">
            <div className="text-2xl">☁️</div>
            <div className="font-bold">Cloud</div>
            <div className="text-sm mt-2">
              {recommendation.cloud}
            </div>
          </div>

          <div className="bg-orange-700 rounded-xl p-5 text-center">
            <div className="text-2xl">🚀</div>
            <div className="font-bold">Deployment</div>
            <div className="text-sm mt-2">
              {recommendation.deployment}
            </div>
          </div>

        </div>

        {/* Scaling */}
        <div className="mt-6 bg-white/10 border border-cyan-400/30 rounded-xl p-5 text-center">

          <div className="text-2xl">📈</div>

          <div className="font-bold text-lg">
            Scaling Strategy
          </div>

          <div className="text-gray-300 mt-2">
            {recommendation.scaling}
          </div>

        </div>

      </div>
    </div>
  );
}