import { useState } from "react";
import { motion } from "framer-motion";
import { Plane, Calculator, Clock, MapPin } from "lucide-react";
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
import { ResultCard } from "@/components/ui/result-card";
import { toast } from "sonner";

const airlines = [
  "Thai Airways",
  "Bangkok Airways",
  "Nok Air",
  "AirAsia",
  "VietJet",
  "Indigo",
  "SpiceJet",
];

const cities = [
  "Bangkok",
  "Chiang Mai",
  "Phuket",
  "Kolkata",
  "Delhi",
  "Mumbai",
  "Bangalore",
  "Singapore",
];

interface FlightFormData {
  airline: string;
  source: string;
  destination: string;
  totalStops: number;
  month: number;
  year: number;
  durationHours: number;
  durationMin: number;
}

export const FlightPricePage = () => {
  const [formData, setFormData] = useState<FlightFormData>({
    airline: "",
    source: "",
    destination: "",
    totalStops: 0,
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
    durationHours: 2,
    durationMin: 30,
  });

  const [result, setResult] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.airline || !formData.source || !formData.destination) {
      toast.error("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }

    if (formData.source === formData.destination) {
      toast.error("ต้นทางและปลายทางต้องไม่เหมือนกัน");
      return;
    }

    setIsLoading(true);

    const res = await fetch("https://6pr4fnf7-8000.asse.devtunnels.ms/api/v1/flight/predict", {
      method: "POST",
      headers: {
      "Content-Type": "application/json",
      },
      body: JSON.stringify({
      Airline: formData.airline,
      Source: formData.source,
      Destination: formData.destination,
      Total_Stops: formData.totalStops,
      Month: formData.month,
      Year: formData.year,
      Duration_hours: formData.durationHours,
      Duration_min: formData.durationMin,
      }),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({ detail: "Unknown error" }));
      toast.error(`API Error: ${res.status} - ${errorData.detail || res.statusText}`);
      setIsLoading(false);
      return;
    }

    const data = await res.json();
    setResult(Math.round(data.predicted_price * 100) / 100 || 0);
    setIsLoading(false);
    toast.success("ทำนายราคาสำเร็จ!");
  };

  return (
    <PageContainer
      title="ระบบประมาณราคาค่าตั๋วเครื่องบิน"
      subtitle="ทำนายราคาตั๋วเครื่องบินจากรายละเอียดการเดินทาง"
      icon={<Plane className="w-7 h-7 text-flight-foreground" />}
      accentColor="flight"
    >
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Form */}
        <Card className="card-hover">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="w-5 h-5 text-flight" />
              กรอกรายละเอียดเที่ยวบิน
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Airline */}
              <div className="space-y-2">
                <Label>สายการบิน</Label>
                <Select
                  value={formData.airline}
                  onValueChange={(value) =>
                    setFormData({ ...formData, airline: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="เลือกสายการบิน" />
                  </SelectTrigger>
                  <SelectContent>
                    {airlines.map((airline) => (
                      <SelectItem key={airline} value={airline}>
                        {airline}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Source & Destination */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    ต้นทาง
                  </Label>
                  <Select
                    value={formData.source}
                    onValueChange={(value) =>
                      setFormData({ ...formData, source: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="เลือกเมืองต้นทาง" />
                    </SelectTrigger>
                    <SelectContent>
                      {cities.map((city) => (
                        <SelectItem key={city} value={city}>
                          {city}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    ปลายทาง
                  </Label>
                  <Select
                    value={formData.destination}
                    onValueChange={(value) =>
                      setFormData({ ...formData, destination: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="เลือกเมืองปลายทาง" />
                    </SelectTrigger>
                    <SelectContent>
                      {cities.map((city) => (
                        <SelectItem key={city} value={city}>
                          {city}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Stops */}
              <div className="space-y-2">
                <Label>จำนวนจุดแวะพัก</Label>
                <Select
                  value={formData.totalStops.toString()}
                  onValueChange={(value) =>
                    setFormData({ ...formData, totalStops: parseInt(value) })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[0, 1, 2, 3, 4, 5].map((stop) => (
                      <SelectItem key={stop} value={stop.toString()}>
                        {stop === 0 ? "บินตรง" : `${stop} จุด`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Month & Year */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>เดือน</Label>
                  <Select
                    value={formData.month.toString()}
                    onValueChange={(value) =>
                      setFormData({ ...formData, month: parseInt(value) })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 12 }, (_, i) => i + 1).map(
                        (month) => (
                          <SelectItem key={month} value={month.toString()}>
                            {new Date(2000, month - 1).toLocaleDateString(
                              "th-TH",
                              { month: "long" }
                            )}
                          </SelectItem>
                        )
                      )}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>ปี (ค.ศ.)</Label>
                  <Input
                    type="number"
                    min={2000}
                    max={2100}
                    value={formData.year}
                    onChange={(e) =>
                      setFormData({ ...formData, year: parseInt(e.target.value) })
                    }
                  />
                </div>
              </div>

              {/* Duration */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  ระยะเวลาเดินทาง
                </Label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Input
                      type="number"
                      min={0}
                      max={100}
                      value={formData.durationHours}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          durationHours: parseInt(e.target.value) || 0,
                        })
                      }
                    />
                    <span className="text-xs text-muted-foreground">ชั่วโมง</span>
                  </div>
                  <div className="space-y-1">
                    <Input
                      type="number"
                      min={0}
                      max={59}
                      value={formData.durationMin}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          durationMin: parseInt(e.target.value) || 0,
                        })
                      }
                    />
                    <span className="text-xs text-muted-foreground">นาที</span>
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-flight hover:opacity-90 transition-opacity"
                disabled={isLoading}
              >
                {isLoading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <Plane className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <>
                    <Calculator className="w-5 h-5 mr-2" />
                    ประมาณราคา
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Result */}
        <div className="space-y-6">
          {result !== null ? (
            <ResultCard
              title="ราคาตั๋วเครื่องบินที่แนะนำ"
              value={`฿${result.toLocaleString()}`}
              subtitle={`${formData.source} → ${formData.destination}`}
              icon={<Plane className="w-6 h-6" />}
              variant="flight"
            />
          ) : (
            <Card className="h-full flex items-center justify-center min-h-[300px] border-dashed">
              <div className="text-center text-muted-foreground">
                <Plane className="w-16 h-16 mx-auto mb-4 opacity-30 animate-float" />
                <p className="text-lg font-medium">กรอกข้อมูลเพื่อดูราคาตั๋ว</p>
                <p className="text-sm">ระบบจะทำนายราคาที่เหมาะสมให้คุณ</p>
              </div>
            </Card>
          )}

          {result !== null && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-2 gap-4"
            >
              <Card className="p-4 text-center">
                <p className="text-sm text-muted-foreground">สายการบิน</p>
                <p className="font-semibold">{formData.airline}</p>
              </Card>
              <Card className="p-4 text-center">
                <p className="text-sm text-muted-foreground">ระยะเวลา</p>
                <p className="font-semibold">
                  {formData.durationHours}ช. {formData.durationMin}น.
                </p>
              </Card>
              <Card className="p-4 text-center">
                <p className="text-sm text-muted-foreground">จุดแวะพัก</p>
                <p className="font-semibold">
                  {formData.totalStops === 0
                    ? "บินตรง"
                    : `${formData.totalStops} จุด`}
                </p>
              </Card>
              <Card className="p-4 text-center">
                <p className="text-sm text-muted-foreground">เดือน/ปี</p>
                <p className="font-semibold">
                  {formData.month}/{formData.year}
                </p>
              </Card>
            </motion.div>
          )}
        </div>
      </div>
    </PageContainer>
  );
};
