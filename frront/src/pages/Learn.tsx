import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, 
  Play, 
  CheckCircle, 
  Award,
  ChevronRight,
  Waves,
  Leaf,
  Globe,
  FileText
} from 'lucide-react';

const learningModules = [
  {
    id: 1,
    title: 'Introduction to Blue Carbon',
    description: 'Learn about coastal ecosystems and their carbon storage capabilities',
    duration: '15 min',
    difficulty: 'Beginner',
    progress: 100,
    icon: Waves,
    completed: true
  },
  {
    id: 2,
    title: 'Mangrove Ecosystems',
    description: 'Deep dive into mangrove forests and their environmental impact',
    duration: '20 min',
    difficulty: 'Beginner',
    progress: 75,
    icon: Leaf,
    completed: false
  },
  {
    id: 3,
    title: 'Carbon Measurement Methods',
    description: 'Scientific approaches to measuring and verifying carbon sequestration',
    duration: '25 min',
    difficulty: 'Intermediate',
    progress: 0,
    icon: FileText,
    completed: false
  },
  {
    id: 4,
    title: 'Global Impact Assessment',
    description: 'Understanding the global significance of blue carbon ecosystems',
    duration: '18 min',
    difficulty: 'Advanced',
    progress: 0,
    icon: Globe,
    completed: false
  }
];

const quizzes = [
  {
    id: 1,
    title: 'Blue Carbon Basics',
    questions: 10,
    completed: true,
    score: 85,
    difficulty: 'Beginner'
  },
  {
    id: 2,
    title: 'Ecosystem Identification',
    questions: 15,
    completed: false,
    score: null,
    difficulty: 'Intermediate'
  },
  {
    id: 3,
    title: 'Conservation Strategies',
    questions: 12,
    completed: false,
    score: null,
    difficulty: 'Advanced'
  }
];

const achievements = [
  { name: 'First Steps', description: 'Completed first learning module', earned: true },
  { name: 'Quiz Master', description: 'Scored 80% or higher on 3 quizzes', earned: true },
  { name: 'Knowledge Seeker', description: 'Completed 5 learning modules', earned: false },
  { name: 'Expert Level', description: 'Completed all advanced modules', earned: false }
];

export default function Learn() {
  const [selectedQuiz, setSelectedQuiz] = useState<number | null>(null);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-success/10 text-success';
      case 'Intermediate':
        return 'bg-warning/10 text-warning';
      case 'Advanced':
        return 'bg-destructive/10 text-destructive';
      default:
        return 'bg-muted/10 text-muted-foreground';
    }
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-ocean rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Learn Hub</h1>
              <p className="text-muted-foreground">
                Interactive education about blue carbon and marine conservation
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Learning Modules */}
          <div className="lg:col-span-2">
            <Card className="shadow-card mb-8">
              <CardHeader>
                <CardTitle>Learning Modules</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {learningModules.map((module) => (
                    <div key={module.id} className="border rounded-lg p-4 hover:bg-eco-blue/20 transition-colors cursor-pointer">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-eco rounded-lg flex items-center justify-center">
                            <module.icon className="w-5 h-5 text-secondary-dark" />
                          </div>
                          <div>
                            <h4 className="font-medium text-foreground">{module.title}</h4>
                            <p className="text-sm text-muted-foreground">{module.description}</p>
                          </div>
                        </div>
                        {module.completed && (
                          <CheckCircle className="w-5 h-5 text-success" />
                        )}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm">
                          <Badge className={getDifficultyColor(module.difficulty)}>
                            {module.difficulty}
                          </Badge>
                          <span className="text-muted-foreground">{module.duration}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="text-sm text-muted-foreground">
                            {module.progress}% complete
                          </div>
                          <Button size="sm" variant={module.completed ? "outline" : "default"}>
                            {module.completed ? "Review" : "Start"}
                            <Play className="ml-1 w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                      
                      {module.progress > 0 && (
                        <div className="mt-3">
                          <div className="w-full bg-muted rounded-full h-2">
                            <div 
                              className="bg-gradient-ocean h-2 rounded-full transition-all duration-300"
                              style={{ width: `${module.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Interactive Quizzes */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Interactive Quizzes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {quizzes.map((quiz) => (
                    <div key={quiz.id} className="border rounded-lg p-4 hover:bg-eco-blue/20 transition-colors cursor-pointer">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-foreground mb-1">{quiz.title}</h4>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>{quiz.questions} questions</span>
                            <Badge className={getDifficultyColor(quiz.difficulty)}>
                              {quiz.difficulty}
                            </Badge>
                            {quiz.completed && quiz.score && (
                              <Badge className="bg-success/10 text-success">
                                Score: {quiz.score}%
                              </Badge>
                            )}
                          </div>
                        </div>
                        <Button size="sm" variant={quiz.completed ? "outline" : "default"}>
                          {quiz.completed ? "Retake" : "Start Quiz"}
                          <ChevronRight className="ml-1 w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Progress Overview */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-lg">Your Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Modules Completed</span>
                      <span className="font-medium">1/4</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-gradient-ocean w-1/4 h-2 rounded-full"></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Quizzes Passed</span>
                      <span className="font-medium">1/3</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-secondary w-1/3 h-2 rounded-full"></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Learning Time</span>
                      <span className="font-medium">2.5 hours</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-primary" />
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {achievements.map((achievement, index) => (
                    <div key={index} className={`flex items-center gap-3 p-2 rounded-lg ${
                      achievement.earned ? 'bg-success/10' : 'bg-muted/30'
                    }`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        achievement.earned ? 'bg-success text-success-foreground' : 'bg-muted text-muted-foreground'
                      }`}>
                        <Award className="w-4 h-4" />
                      </div>
                      <div>
                        <div className={`text-sm font-medium ${
                          achievement.earned ? 'text-foreground' : 'text-muted-foreground'
                        }`}>
                          {achievement.name}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {achievement.description}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}