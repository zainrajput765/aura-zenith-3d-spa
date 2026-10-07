import React, { useState } from 'react';
import { Sparkles, ArrowRight, RotateCcw, CheckCircle2, Award } from 'lucide-react';
import { SPA_SERVICES } from './ServicesMenu';

export default function ConsultationQuiz({ onSelectRecommended }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [resultService, setResultService] = useState(null);

  const questions = [
    {
      id: 'goal',
      title: 'What is your primary wellness goal today?',
      options: [
        { label: 'Erase chronic muscular tension & physical pain', category: 'massages', serviceId: 'deep-tissue' },
        { label: 'Rejuvenate skin elasticity & achieve radiant glow', category: 'facials', serviceId: 'gold-facial' },
        { label: 'Deep mental detox & emotional stress release', category: 'sound', serviceId: 'sound-bath' },
        { label: 'Complete 4-hand luxury pampering & hydrotherapeutics', category: 'massages', serviceId: 'zenith-signature' },
      ]
    },
    {
      id: 'pressure',
      title: 'What massage pressure intensity do you prefer?',
      options: [
        { label: 'Gentle, soothing rhythmic strokes with aromatic oils' },
        { label: 'Firm targeted myofascial pressure on stubborn knots' },
        { label: 'Deep thermal heat therapy with hot volcanic stones' },
        { label: 'No physical touch — non-invasive sound frequencies' },
      ]
    },
    {
      id: 'aroma',
      title: 'Select your preferred aromatic essential oil note:',
      options: [
        { label: 'Wild Royal Egyptian Jasmine & White Amber' },
        { label: 'French Lavender & Organic Chamomile' },
        { label: 'Australian Eucalyptus & Deep Forest Cedar' },
        { label: 'Damascus Rose Petals & Pure Gold Infusion' },
      ]
    }
  ];

  const handleSelectOption = (questionId, option) => {
    const nextAnswers = { ...answers, [questionId]: option };
    setAnswers(nextAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate best matching service
      const matched = SPA_SERVICES.find(s => s.id === (nextAnswers.goal?.serviceId || 'zenith-signature')) || SPA_SERVICES[0];
      setResultService(matched);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setResultService(null);
  };

  return (
    <section className="py-20 relative bg-spa-softBg/30 border-y border-spa-gold/15">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-10">
          <span className="font-brand text-xs uppercase tracking-[0.3em] text-spa-gold">AI Spa Consultation Assistant</span>
          <h2 className="text-3xl font-serif text-spa-pearl mt-2">
            Discover Your <span className="text-gold-gradient italic">Personalized Spa Prescription</span>
          </h2>
          <p className="text-xs text-spa-muted mt-2 max-w-lg mx-auto">
            Answer 3 quick questions regarding your physical stress and wellness goals to receive a tailored sanctuary treatment recommendation.
          </p>
        </div>

        {/* Quiz Container */}
        <div className="glass-card-gold rounded-3xl p-8 shadow-2xl relative border border-spa-gold/30">
          
          {!resultService ? (
            <div className="space-y-6">
              {/* Question Progress Header */}
              <div className="flex items-center justify-between text-xs text-spa-muted border-b border-spa-gold/15 pb-4">
                <span>Question {currentQuestion + 1} of {questions.length}</span>
                <div className="flex space-x-1.5">
                  {questions.map((_, i) => (
                    <div
                      key={i}
                      className={`w-6 h-1.5 rounded-full transition-all ${
                        i <= currentQuestion ? 'bg-spa-gold' : 'bg-spa-cardBorder'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <h3 className="text-xl font-serif font-semibold text-spa-pearl">
                {questions[currentQuestion].title}
              </h3>

              {/* Options Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {questions[currentQuestion].options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(questions[currentQuestion].id, option)}
                    className="p-4 rounded-2xl glass-card text-left text-xs font-medium text-spa-pearl hover:text-spa-gold hover:border-spa-gold/60 transition-all duration-300 hover:-translate-y-1 flex items-center justify-between group"
                  >
                    <span className="pr-2">{option.label}</span>
                    <ArrowRight className="w-4 h-4 text-spa-gold opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* Quiz Result Screen */
            <div className="text-center space-y-6 py-4 animate-fadeIn">
              <div className="w-14 h-14 rounded-full bg-gold-gradient text-spa-bg mx-auto flex items-center justify-center shadow-gold-glow">
                <Award className="w-7 h-7" />
              </div>

              <div>
                <span className="font-brand text-xs uppercase tracking-widest text-spa-gold">Your Bespoke Spa Match</span>
                <h3 className="text-2xl font-serif font-bold text-spa-pearl mt-1">
                  {resultService.name}
                </h3>
                <p className="text-xs text-spa-gold italic mt-1">"{resultService.tagline}"</p>
                <p className="text-xs text-spa-muted max-w-lg mx-auto mt-3">{resultService.description}</p>
              </div>

              <div className="flex flex-wrap justify-center gap-4 pt-4">
                <button
                  onClick={resetQuiz}
                  className="flex items-center space-x-2 px-5 py-2.5 rounded-full glass-card text-spa-muted hover:text-spa-pearl text-xs uppercase"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Retake Quiz</span>
                </button>
                <button
                  onClick={() => onSelectRecommended(resultService)}
                  className="flex items-center space-x-2 px-8 py-3 rounded-full bg-gold-gradient text-spa-bg font-bold text-xs uppercase shadow-gold-glow hover:scale-105 transition-all"
                >
                  <span>Book Prescription ({resultService.price})</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
