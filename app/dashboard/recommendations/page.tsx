'use client';

import { DashboardHeader } from '@/components/dashboard/header';
import { Card } from '@/components/ui/card';
import { RecommendationCard } from '@/components/dashboard/recommendation-card';
import { mockRecommendations } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { CheckCircle, BookOpen, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const categoryColors = {
  nutrition: 'bg-green-500/10 text-green-600 border-green-500/30',
  exercise: 'bg-blue-500/10 text-blue-600 border-blue-500/30',
  sleep: 'bg-purple-500/10 text-purple-600 border-purple-500/30',
  stress: 'bg-orange-500/10 text-orange-600 border-orange-500/30',
  medication: 'bg-red-500/10 text-red-600 border-red-500/30',
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
};

export default function RecommendationsPage() {
  const [completedRecommendations, setCompletedRecommendations] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const toggleComplete = (id: string) => {
    setCompletedRecommendations((prev) =>
      prev.includes(id) ? prev.filter((rid) => rid !== id) : [...prev, id]
    );
  };

  const categories = ['nutrition', 'exercise', 'sleep', 'stress', 'medication'] as const;
  const filteredRecommendations = selectedCategory
    ? mockRecommendations.filter((r) => r.category === selectedCategory)
    : mockRecommendations;

  const completionRate = Math.round(
    (completedRecommendations.length / mockRecommendations.length) * 100
  );

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-background"
    >
      <DashboardHeader
        title="Daily Actions"
        subtitle="Steps you can take today based on your body's data."
      />

      <div className="p-6 space-y-6">
        {/* Progress Overview */}
        <Card className="p-8 border border-border bg-card/50 backdrop-blur-sm rounded-3xl">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-foreground tracking-tight">Your Weekly Progress</h3>
              <span className="text-3xl font-bold text-primary">{completionRate}%</span>
            </div>
            <div className="w-full bg-input rounded-full h-4 overflow-hidden border border-border/50">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${completionRate}%` }}
                className="bg-primary h-4 rounded-full"
                transition={{ duration: 1, ease: "easeOut" }}
              ></motion.div>
            </div>
            <p className="text-sm text-muted-foreground font-medium">
              You've knocked out {completedRecommendations.length} of {mockRecommendations.length} actions so far.
            </p>
          </div>
        </Card>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          <Button
            onClick={() => setSelectedCategory(null)}
            variant={selectedCategory === null ? 'default' : 'outline'}
            className={selectedCategory === null ? 'bg-primary hover:bg-primary/90 text-white' : 'border-border'}
          >
            All Areas
          </Button>
          {categories.map((cat) => (
            <Button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              variant={selectedCategory === cat ? 'default' : 'outline'}
              className={
                selectedCategory === cat
                  ? 'bg-primary hover:bg-primary/90 text-white'
                  : 'border-border text-foreground hover:bg-card'
              }
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </Button>
          ))}
        </div>

        {/* Recommendations Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredRecommendations.map((recommendation) => (
              <motion.div
                key={recommendation.id}
                layout
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, scale: 0.95 }}
                className={`relative transition-all ${completedRecommendations.includes(recommendation.id)
                  ? 'opacity-40 grayscale-sm'
                  : ''
                  }`}
              >
                <Card
                  className={`p-8 border-2 cursor-pointer transition-all duration-300 hover:shadow-2xl rounded-4xl ${completedRecommendations.includes(recommendation.id)
                    ? 'border-green-500/20 bg-green-500/5'
                    : 'border-border hover:border-primary/40 bg-card/40 backdrop-blur-md'
                    }`}
                  onClick={() => toggleComplete(recommendation.id)}
                >
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-start gap-5 flex-1">
                      <div className="shrink-0 mt-1">
                        <div
                          className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${completedRecommendations.includes(recommendation.id)
                            ? 'bg-green-500 border-green-500 shadow-[0_0_15px_rgba(34,197,94,0.3)]'
                            : 'border-muted-foreground/30'
                            }`}
                        >
                          {completedRecommendations.includes(recommendation.id) && (
                            <CheckCircle className="w-5 h-5 text-white" />
                          )}
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xl font-bold text-foreground mb-2 leading-tight tracking-tight">
                          {recommendation.title}
                        </h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {recommendation.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Action Items */}
                  <div className="ml-12 space-y-4">
                    <ul className="space-y-3">
                      {recommendation.actionItems.map((item, idx) => (
                        <li key={idx} className="text-sm text-foreground/80 flex items-start gap-3 bg-white/5 p-3 rounded-xl border border-white/5">
                          <ChevronRight className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Impact and Priority */}
                  <div className="ml-12 mt-8 pt-6 border-t border-border/50 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">Impact</p>
                      <p className="text-sm font-bold text-primary">
                        {recommendation.estimatedImpact}
                      </p>
                    </div>
                    <span
                      className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest ${recommendation.priority === 'high'
                        ? 'bg-destructive/10 text-destructive border border-destructive/20'
                        : recommendation.priority === 'medium'
                          ? 'bg-primary/10 text-primary border border-primary/20'
                          : 'bg-green-500/10 text-green-600 border border-green-500/20'
                        }`}
                    >
                      {recommendation.priority}
                    </span>
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Resources Section */}
        <Card className="p-10 border border-border bg-card/50 backdrop-blur-sm rounded-[2.5rem]">
          <div className="flex items-start gap-6 mb-8">
            <div className="p-4 bg-primary/10 rounded-2xl text-primary">
              <BookOpen className="w-8 h-8 shrink-0" />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-foreground tracking-tight">Learning & Prep</h3>
              <p className="text-sm text-muted-foreground">
                Helpful guides and reading picked just for you.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                title: 'Glycemic Regulation Compendium',
                category: 'Nutrition',
                link: '#',
              },
              {
                title: 'Cardiovascular Intervention Protocol',
                category: 'Exercise',
                link: '#',
              },
              {
                title: 'Nocturnal Metabolic Recovery',
                category: 'Sleep',
                link: '#',
              },
              {
                title: 'Neuroendocrine Stress Modulation',
                category: 'Stress',
                link: '#',
              },
            ].map((resource, idx) => (
              <motion.a
                key={idx}
                href={resource.link}
                whileHover={{ x: 4 }}
                className="p-5 border border-border rounded-xl hover:border-primary/40 hover:bg-primary/5 transition-all group flex flex-col gap-1"
              >
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{resource.category}</p>
                <p className="text-foreground font-bold tracking-tight group-hover:text-primary transition-colors">
                  {resource.title}
                </p>
              </motion.a>
            ))}
          </div>
        </Card>
      </div>
    </motion.div>
  );
}
