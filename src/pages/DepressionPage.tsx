import { useState } from "react";
import { motion } from "framer-motion";
import { Brain, AlertTriangle, CheckCircle2, HeartPulse } from "lucide-react";
import { PageContainer } from "@/components/layout/PageContainer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { ResultCard } from "@/components/ui/result-card";
import { toast } from "sonner";
import { Progress } from "@/components/ui/progress";

interface DepressionFormData {
  gender: string;
  age: number;
  academicPressure: number;
  studySatisfaction: number;
  sleepDuration: string;
  dietaryHabits: string;
  suicidalThoughts: string;
  studyHours: number;
  financialStress: number;
  familyHistory: string;
}

export const DepressionPage = () => {
  const [formData, setFormData] = useState<DepressionFormData>({
    gender: "",
    age: 20,
    academicPressure: 3,
    studySatisfaction: 3,
    sleepDuration: "",
    dietaryHabits: "",
    suicidalThoughts: "",
    studyHours: 6,
    financialStress: 3,
    familyHistory: "",
  });

  const [result, setResult] = useState<{
    prediction: string;
    probability: number;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.gender ||
      !formData.sleepDuration ||
      !formData.dietaryHabits ||
      !formData.suicidalThoughts ||
      !formData.familyHistory
    ) {
      toast.error("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }

    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Mock prediction based on risk factors
    let riskScore = 0;
    riskScore += formData.academicPressure * 0.1;
    riskScore += (5 - formData.studySatisfaction) * 0.1;
    riskScore += formData.financialStress * 0.1;
    riskScore += formData.suicidalThoughts === "Yes" ? 0.3 : 0;
    riskScore += formData.familyHistory === "Yes" ? 0.15 : 0;
    riskScore += formData.dietaryHabits === "Unhealthy" ? 0.1 : 0;
    riskScore += formData.sleepDuration === "Less than 5 hours" ? 0.1 : 0;

    const probability = Math.min(Math.max(riskScore + Math.random() * 0.2, 0), 1);
    const prediction = probability > 0.5 ? "Yes" : "No";

    setResult({ prediction, probability });
    setIsLoading(false);
    toast.success("ประเมินเสร็จสิ้น");
  };

  const getRiskLevel = (probability: number) => {
    if (probability < 0.3) return { text: "ความเสี่ยงต่ำ", color: "text-health" };
    if (probability < 0.6) return { text: "ความเสี่ยงปานกลาง", color: "text-animal" };
    return { text: "ความเสี่ยงสูง", color: "text-destructive" };
  };

  return (
    <PageContainer
      title="ระบบประเมินภาวะความซึมเศร้า"
      subtitle="ประเมินความเสี่ยงภาวะซึมเศร้าจากข้อมูลนักศึกษา"
      icon={<Brain className="w-7 h-7 text-health-foreground" />}
      accentColor="health"
    >
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Form */}
        <Card className="card-hover">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HeartPulse className="w-5 h-5 text-health" />
              กรอกข้อมูลประเมิน
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Gender & Age */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>เพศ</Label>
                  <Select
                    value={formData.gender}
                    onValueChange={(value) =>
                      setFormData({ ...formData, gender: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="เลือกเพศ" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">ชาย</SelectItem>
                      <SelectItem value="Female">หญิง</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>อายุ</Label>
                  <Input
                    type="number"
                    min={10}
                    max={100}
                    value={formData.age}
                    onChange={(e) =>
                      setFormData({ ...formData, age: parseInt(e.target.value) || 20 })
                    }
                  />
                </div>
              </div>

              {/* Academic Pressure */}
              <div className="space-y-3">
                <div className="flex justify-between">
                  <Label>ความกดดันการเรียน</Label>
                  <span className="text-sm text-muted-foreground">
                    {formData.academicPressure}/5
                  </span>
                </div>
                <Slider
                  value={[formData.academicPressure]}
                  onValueChange={(value) =>
                    setFormData({ ...formData, academicPressure: value[0] })
                  }
                  min={0}
                  max={5}
                  step={1}
                  className="py-2"
                />
              </div>

              {/* Study Satisfaction */}
              <div className="space-y-3">
                <div className="flex justify-between">
                  <Label>ความพึงพอใจการเรียน</Label>
                  <span className="text-sm text-muted-foreground">
                    {formData.studySatisfaction}/5
                  </span>
                </div>
                <Slider
                  value={[formData.studySatisfaction]}
                  onValueChange={(value) =>
                    setFormData({ ...formData, studySatisfaction: value[0] })
                  }
                  min={0}
                  max={5}
                  step={1}
                  className="py-2"
                />
              </div>

              {/* Sleep Duration */}
              <div className="space-y-2">
                <Label>ระยะเวลานอน</Label>
                <Select
                  value={formData.sleepDuration}
                  onValueChange={(value) =>
                    setFormData({ ...formData, sleepDuration: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="เลือกระยะเวลา" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Less than 5 hours">น้อยกว่า 5 ชั่วโมง</SelectItem>
                    <SelectItem value="5-6 hours">5-6 ชั่วโมง</SelectItem>
                    <SelectItem value="7-8 hours">7-8 ชั่วโมง</SelectItem>
                    <SelectItem value="More than 8 hours">มากกว่า 8 ชั่วโมง</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Dietary Habits */}
              <div className="space-y-2">
                <Label>ภาวะการกิน</Label>
                <Select
                  value={formData.dietaryHabits}
                  onValueChange={(value) =>
                    setFormData({ ...formData, dietaryHabits: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="เลือกภาวะการกิน" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Healthy">สุขภาพดี</SelectItem>
                    <SelectItem value="Moderate">ปานกลาง</SelectItem>
                    <SelectItem value="Unhealthy">ไม่ดีต่อสุขภาพ</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Suicidal Thoughts */}
              <div className="space-y-2">
                <Label>เคยมีความคิดทำร้ายตัวเองหรือไม่</Label>
                <Select
                  value={formData.suicidalThoughts}
                  onValueChange={(value) =>
                    setFormData({ ...formData, suicidalThoughts: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="เลือกคำตอบ" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="No">ไม่เคย</SelectItem>
                    <SelectItem value="Yes">เคย</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Study Hours */}
              <div className="space-y-2">
                <Label>ระยะเวลาเรียนต่อวัน (ชั่วโมง)</Label>
                <Input
                  type="number"
                  min={0}
                  max={24}
                  value={formData.studyHours}
                  onChange={(e) =>
                    setFormData({ ...formData, studyHours: parseInt(e.target.value) || 0 })
                  }
                />
              </div>

              {/* Financial Stress */}
              <div className="space-y-3">
                <div className="flex justify-between">
                  <Label>ความเครียดเรื่องการเงิน</Label>
                  <span className="text-sm text-muted-foreground">
                    {formData.financialStress}/5
                  </span>
                </div>
                <Slider
                  value={[formData.financialStress]}
                  onValueChange={(value) =>
                    setFormData({ ...formData, financialStress: value[0] })
                  }
                  min={0}
                  max={5}
                  step={1}
                  className="py-2"
                />
              </div>

              {/* Family History */}
              <div className="space-y-2">
                <Label>คนในครอบครัวมีปัญหาภาวะซึมเศร้าหรือไม่</Label>
                <Select
                  value={formData.familyHistory}
                  onValueChange={(value) =>
                    setFormData({ ...formData, familyHistory: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="เลือกคำตอบ" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="No">ไม่มี</SelectItem>
                    <SelectItem value="Yes">มี</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-health hover:opacity-90 transition-opacity"
                disabled={isLoading}
              >
                {isLoading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <Brain className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <>
                    <HeartPulse className="w-5 h-5 mr-2" />
                    ประเมินผล
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Result */}
        <div className="space-y-6">
          {result !== null ? (
            <>
              <ResultCard
                title="ผลการประเมินภาวะซึมเศร้า"
                value={result.prediction === "Yes" ? "มีความเสี่ยง" : "ไม่มีความเสี่ยง"}
                subtitle={getRiskLevel(result.probability).text}
                icon={
                  result.prediction === "Yes" ? (
                    <AlertTriangle className="w-6 h-6" />
                  ) : (
                    <CheckCircle2 className="w-6 h-6" />
                  )
                }
                variant="health"
              />

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="p-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">ความน่าจะเป็นของการซึมเศร้า</span>
                      <span className={`font-bold ${getRiskLevel(result.probability).color}`}>
                        {(result.probability * 100).toFixed(1)}%
                      </span>
                    </div>
                    <Progress 
                      value={result.probability * 100} 
                      className="h-3"
                    />
                    <p className="text-sm text-muted-foreground">
                      {result.prediction === "Yes" 
                        ? "แนะนำให้ปรึกษาผู้เชี่ยวชาญเพื่อรับการดูแลที่เหมาะสม"
                        : "ผลประเมินอยู่ในเกณฑ์ปกติ ควรดูแลสุขภาพจิตอย่างต่อเนื่อง"}
                    </p>
                  </div>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Card className="p-6 bg-health-soft border-health/30">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <HeartPulse className="w-5 h-5 text-health" />
                    คำแนะนำ
                  </h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• พักผ่อนให้เพียงพอ อย่างน้อย 7-8 ชั่วโมงต่อวัน</li>
                    <li>• ออกกำลังกายสม่ำเสมอ อย่างน้อย 30 นาทีต่อวัน</li>
                    <li>• พูดคุยกับคนใกล้ชิดเมื่อรู้สึกเครียด</li>
                    <li>• หากมีปัญหา โปรดติดต่อสายด่วนสุขภาพจิต 1323</li>
                  </ul>
                </Card>
              </motion.div>
            </>
          ) : (
            <Card className="h-full flex items-center justify-center min-h-[400px] border-dashed">
              <div className="text-center text-muted-foreground">
                <Brain className="w-16 h-16 mx-auto mb-4 opacity-30 animate-float" />
                <p className="text-lg font-medium">กรอกข้อมูลเพื่อประเมินผล</p>
                <p className="text-sm">ระบบจะวิเคราะห์ความเสี่ยงให้คุณ</p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </PageContainer>
  );
};
