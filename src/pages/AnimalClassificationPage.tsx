import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { PawPrint, Upload, Image as ImageIcon, Sparkles } from "lucide-react";
import { PageContainer } from "@/components/layout/PageContainer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ResultCard } from "@/components/ui/result-card";
import { toast } from "sonner";
import { Progress } from "@/components/ui/progress";
import { getApiUrl } from "../config/api";

const animalEmojis: Record<string, string> = {
  cat: "🐱",
  cow: "🐄",
  lion: "🦁",
  deer: "🦌",
  dog: "🐕",
};

const animalNames: Record<string, string> = {
  cat: "แมว",
  cow: "วัว",
  lion: "สิงโต",
  deer: "กวาง",
  dog: "สุนัข",
};

export const AnimalClassificationPage = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<{
    prediction: string;
    confidence: number;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFileSelect = (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error("กรุณาเลือกไฟล์รูปภาพ");
      return;
    }

    setSelectedFile(file);
    setResult(null);

    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleSubmit = async () => {
    if (!selectedFile) {
      toast.error("กรุณาเลือกรูปภาพ");
      return;
    }

    setIsLoading(true);

    const formData = new FormData();
    formData.append("file", selectedFile);

    const res = await fetch(getApiUrl("/api/v2/animal/predict"), {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({ detail: "Unknown error" }));
      console.error("Animal API Error:", errorData);
      toast.error(`API Error: ${res.status} - ${errorData.detail || res.statusText}`);
      setIsLoading(false);
      return;
    }

    const data = await res.json();
    console.log("Animal API Response:", data);

    setResult({
      prediction: data.prediction,
      confidence: data.confidence,
    });
    setIsLoading(false);
    toast.success("จำแนกสัตว์สำเร็จ!");
  };

  const resetForm = () => {
    setSelectedFile(null);
    setPreview(null);
    setResult(null);
  };

  return (
    <PageContainer
      title="ระบบคัดแยกประเภทสัตว์"
      subtitle="อัปโหลดรูปสัตว์เพื่อจำแนกประเภท (cat, cow, lion, deer, dog)"
      icon={<PawPrint className="w-7 h-7 text-animal-foreground" />}
      accentColor="animal"
    >
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Upload Area */}
        <Card className="card-hover">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-animal" />
              อัปโหลดรูปภาพสัตว์
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Drop Zone */}
              <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                className={`
                  relative border-2 border-dashed rounded-2xl p-8 transition-all duration-300
                  ${isDragOver ? "border-animal bg-animal-soft scale-[1.02]" : "border-border"}
                  ${preview ? "border-solid border-animal/50" : ""}
                `}
              >
                {preview ? (
                  <div className="space-y-4">
                    <div className="relative aspect-square max-h-[300px] mx-auto overflow-hidden rounded-xl">
                      <img
                        src={preview}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex justify-center gap-3">
                      <Button variant="outline" onClick={resetForm}>
                        เลือกรูปใหม่
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center">
                    <Upload className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                    <p className="text-lg font-medium mb-2">ลากรูปภาพมาวางที่นี่</p>
                    <p className="text-sm text-muted-foreground mb-4">
                      หรือคลิกเพื่อเลือกไฟล์
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => document.getElementById("file-input")?.click()}
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      เลือกไฟล์
                    </Button>
                  </div>
                )}
                <input
                  id="file-input"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileSelect(file);
                  }}
                />
              </div>

              {/* Supported Formats */}
              <div className="flex flex-wrap justify-center gap-2">
                <span className="text-xs px-2 py-1 bg-secondary rounded-full">JPG</span>
                <span className="text-xs px-2 py-1 bg-secondary rounded-full">PNG</span>
                <span className="text-xs px-2 py-1 bg-secondary rounded-full">WEBP</span>
              </div>

              {/* Classify Button */}
              <Button
                onClick={handleSubmit}
                className="w-full bg-gradient-animal hover:opacity-90 transition-opacity"
                disabled={!selectedFile || isLoading}
              >
                {isLoading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <PawPrint className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 mr-2" />
                    จำแนกสัตว์
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Result */}
        <div className="space-y-6">
          {result !== null ? (
            <>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center"
              >
                <div className="text-8xl mb-4">{animalEmojis[result.prediction]}</div>
                <ResultCard
                  title="ผลการจำแนก"
                  value={animalNames[result.prediction]}
                  subtitle={`(${result.prediction})`}
                  icon={<PawPrint className="w-6 h-6" />}
                  variant="animal"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="p-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">ความมั่นใจ</span>
                      <span className="font-bold text-animal">
                        {(result.confidence * 100).toFixed(2)}%
                      </span>
                    </div>
                    <Progress value={result.confidence * 100} className="h-3" />
                  </div>
                </Card>
              </motion.div>

              {/* All Animals */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Card className="p-6">
                  <h3 className="font-semibold mb-4">สัตว์ที่รองรับ</h3>
                  <div className="flex justify-around">
                    {Object.entries(animalEmojis).map(([animal, emoji]) => (
                      <div
                        key={animal}
                        className={`text-center p-3 rounded-xl transition-all ${
                          result.prediction === animal
                            ? "bg-animal-soft scale-110"
                            : "opacity-50"
                        }`}
                      >
                        <span className="text-3xl block mb-1">{emoji}</span>
                        <span className="text-xs">{animalNames[animal]}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            </>
          ) : (
            <Card className="h-full flex items-center justify-center min-h-[400px] border-dashed">
              <div className="text-center text-muted-foreground">
                <div className="flex justify-center gap-2 text-5xl mb-4 opacity-30">
                  {Object.values(animalEmojis).map((emoji, i) => (
                    <motion.span
                      key={i}
                      animate={{ y: [0, -10, 0] }}
                      transition={{
                        duration: 2,
                        delay: i * 0.2,
                        repeat: Infinity,
                      }}
                    >
                      {emoji}
                    </motion.span>
                  ))}
                </div>
                <p className="text-lg font-medium">อัปโหลดรูปเพื่อเริ่มจำแนก</p>
                <p className="text-sm">รองรับ: แมว, วัว, สิงโต, กวาง, สุนัข</p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </PageContainer>
  );
};