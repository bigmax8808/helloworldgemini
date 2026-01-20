
import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";

const App: React.FC = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const generateHatchingComputer = async () => {
      try {
        setLoading(true);
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
        
        // Using gemini-2.5-flash-image for generation as per guidelines
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash-image',
          contents: {
            parts: [
              {
                text: 'A high-quality, 3D Pixar-style digital illustration of a cute, small vintage computer with big friendly eyes and a happy expression, literally hatching out of a large cracked white egg. Soft lighting, pastel background, extremely detailed and adorable.',
              },
            ],
          },
          config: {
            imageConfig: {
              aspectRatio: "1:1"
            }
          },
        });

        let foundImage = false;
        if (response.candidates && response.candidates[0].content.parts) {
          for (const part of response.candidates[0].content.parts) {
            if (part.inlineData) {
              const base64Data = part.inlineData.data;
              setImageUrl(`data:image/png;base64,${base64Data}`);
              foundImage = true;
              break;
            }
          }
        }

        if (!foundImage) {
          throw new Error("No image data found in response");
        }
      } catch (err: any) {
        console.error("Generation error:", err);
        setError("Failed to generate the cute computer. Please refresh to try again.");
      } finally {
        setLoading(false);
      }
    };

    generateHatchingComputer();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-indigo-50 to-white">
      <main className="max-w-md w-full text-center space-y-8 animate-in fade-in duration-1000">
        <header className="space-y-2">
          <h1 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tight">
            Hello World
          </h1>
          <p className="text-slate-500 font-medium text-lg italic">
            A new digital life begins...
          </p>
        </header>

        <section className="relative group">
          <div className="aspect-square w-full bg-white rounded-3xl shadow-2xl shadow-indigo-200/50 overflow-hidden flex items-center justify-center border-4 border-white transition-transform duration-500 group-hover:scale-[1.02]">
            {loading ? (
              <div className="flex flex-col items-center space-y-4">
                <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-slate-400 font-medium animate-pulse text-sm">Hatching image...</p>
              </div>
            ) : error ? (
              <div className="p-8 text-red-500 text-center">
                <p className="font-semibold">{error}</p>
                <button 
                  onClick={() => window.location.reload()}
                  className="mt-4 px-4 py-2 bg-slate-100 rounded-full text-sm font-bold text-slate-700 hover:bg-slate-200 transition-colors"
                >
                  Retry
                </button>
              </div>
            ) : (
              imageUrl && (
                <img 
                  src={imageUrl} 
                  alt="Cute computer hatching from an egg" 
                  className="w-full h-full object-cover transition-opacity duration-700"
                />
              )
            )}
          </div>
          
          {/* Decorative elements */}
          <div className="absolute -top-4 -right-4 w-12 h-12 bg-yellow-300 rounded-full blur-2xl opacity-40"></div>
          <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-indigo-300 rounded-full blur-3xl opacity-30"></div>
        </section>

        <footer className="pt-8">
          <div className="h-1 w-12 bg-indigo-500 mx-auto rounded-full mb-6"></div>
          <p className="text-slate-400 text-sm">
            Powered by Gemini AI • Built with React
          </p>
        </footer>
      </main>
    </div>
  );
};

export default App;
