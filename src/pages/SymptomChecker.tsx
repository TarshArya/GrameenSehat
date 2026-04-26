import React, { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Stethoscope, Loader2, Send, CheckCircle, AlertTriangle, Clock, Phone } from 'lucide-react';
import OpenAI from 'openai';
import { useToast } from '@/hooks/use-toast';

interface SymptomAssessment {
    possibleConditions: string[];
    nextSteps: string;
    urgency: 'low' | 'medium' | 'high' | 'emergency';
    specialist?: string;
}

const SymptomChecker: React.FC = () => {
    const { toast } = useToast();
    const [formData, setFormData] = useState({
        age: '',
        gender: '',
        symptoms: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [assessment, setAssessment] = useState<SymptomAssessment | null>(null);

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const getUrgencyIcon = (urgency: string) => {
        switch (urgency) {
            case 'low': return <CheckCircle className="w-5 h-5 text-green-600" />;
            case 'medium': return <Clock className="w-5 h-5 text-yellow-600" />;
            case 'high': return <AlertTriangle className="w-5 h-5 text-orange-600" />;
            case 'emergency': return <Phone className="w-5 h-5 text-red-600" />;
            default: return <Stethoscope className="w-5 h-5 text-gray-500" />;
        }
    };

    const analyzeSymptoms = async () => {
        const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

        if (!apiKey) {
            toast({
                title: "Configuration Error",
                description: "OpenAI API key is not configured.",
                variant: "destructive"
            });
            return;
        }

        if (!formData.age || !formData.gender || !formData.symptoms.trim()) {
            toast({
                title: "Missing Information",
                description: "Please fill in all fields before submitting.",
                variant: "destructive"
            });
            return;
        }

        setIsLoading(true);

        try {
            const openai = new OpenAI({
                apiKey,
                dangerouslyAllowBrowser: true,
            });

            const prompt = `You are a medical AI assistant. Based on the following patient information, provide a preliminary assessment. 
Patient Details:
- Age: ${formData.age}
- Gender: ${formData.gender}
- Symptoms: ${formData.symptoms}

Respond in JSON with:
{
  "possibleConditions": ["Condition1", "Condition2"],
  "nextSteps": "Give detailed 3-4 bullet points",
  "urgency": "low|medium|high|emergency",
  "specialist": "Optional specialist"
}`;

            const response = await openai.chat.completions.create({
                model: "gpt-4o-mini",
                messages: [{ role: "user", content: prompt }],
                temperature: 0.3,
                max_tokens: 800,
            });

            const content = response.choices[0]?.message?.content;
            if (!content) throw new Error("Empty response from AI");

            let parsed: SymptomAssessment;
            try {
                parsed = JSON.parse(content);
            } catch {
                const match = content.match(/\{[\s\S]*\}/);
                if (match) {
                    parsed = JSON.parse(match[0]);
                } else {
                    throw new Error("Could not parse AI response");
                }
            }

            setAssessment(parsed);
        } catch (error) {
            console.error("OpenAI API Error:", error);
            toast({
                title: "Analysis Failed",
                description: "Unable to analyze symptoms. Please try again later.",
                variant: "destructive"
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Layout>
            <div className="container mx-auto px-4 py-8 max-w-2xl space-y-6">
                {/* --- Form Card --- */}
                <Card>
                    <CardHeader className="text-center">
                        <div className="w-16 h-16 mx-auto mb-4 p-3 bg-primary rounded-full">
                            <Stethoscope className="w-full h-full text-primary-foreground" />
                        </div>
                        <CardTitle className="text-xl">Enter Your Information</CardTitle>
                        <CardDescription>
                            Provide your details and symptoms for AI-powered analysis
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="age">Age</Label>
                                <Input
                                    id="age"
                                    type="number"
                                    value={formData.age}
                                    onChange={(e) => handleInputChange('age', e.target.value)}
                                    placeholder="Enter your age"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="gender">Gender</Label>
                                <Select value={formData.gender} onValueChange={(value) => handleInputChange('gender', value)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select gender" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="male">Male</SelectItem>
                                        <SelectItem value="female">Female</SelectItem>
                                        <SelectItem value="other">Other</SelectItem>
                                        <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="symptoms">Symptoms</Label>
                            <Textarea
                                id="symptoms"
                                placeholder="Describe your symptoms..."
                                value={formData.symptoms}
                                onChange={(e) => handleInputChange('symptoms', e.target.value)}
                                rows={4}
                            />
                        </div>

                        <Button
                            onClick={analyzeSymptoms}
                            disabled={isLoading}
                            className="w-full bg-primary hover:bg-primary-dark text-lg py-6"
                            size="lg"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                    Analyzing Symptoms...
                                </>
                            ) : (
                                <>
                                    <Send className="w-5 h-5 mr-2" />
                                    Analyze Symptoms
                                </>
                            )}
                        </Button>
                    </CardContent>
                </Card>

                {/* --- Result Card --- */}
                {assessment && (
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle>Assessment Result</CardTitle>
                                <CardDescription>AI-powered preliminary analysis</CardDescription>
                            </div>
                            {getUrgencyIcon(assessment.urgency)}
                        </CardHeader>

                        <CardContent className="space-y-4">
                            <div>
                                <h4 className="font-medium mb-2">Possible Conditions</h4>
                                <ul className="list-disc pl-5 space-y-1">
                                    {assessment.possibleConditions.map((c, i) => (
                                        <li key={i}>{c}</li>
                                    ))}
                                </ul>
                            </div>

                            <div>
                                <h4 className="font-medium mb-2">Recommended Next Steps</h4>
                                <p className="text-foreground">{assessment.nextSteps}</p>
                            </div>

                            {assessment.specialist && (
                                <div>
                                    <h4 className="font-medium mb-2">Recommended Specialist</h4>
                                    <p>{assessment.specialist}</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                )}
            </div>
        </Layout>
    );
};

export default SymptomChecker;
