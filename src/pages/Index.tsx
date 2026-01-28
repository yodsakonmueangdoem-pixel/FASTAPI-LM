import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Plane, Brain, PawPrint, Film, ArrowRight, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    title: "พยากรณ์ราคาตั๋วเครื่องบิน",
    description: "ทำนายราคาตั๋วเครื่องบินจากรายละเอียดการเดินทาง",
    icon: Plane,
    path: "/flight",
    gradient: "bg-gradient-flight",
    softBg: "bg-flight-soft",
    iconColor: "text-flight",
  },
  {
    title: "ประเมินภาวะซึมเศร้า",
    description: "ประเมินความเสี่ยงภาวะซึมเศร้าจากข้อมูลนักศึกษา",
    icon: Brain,
    path: "/depression",
    gradient: "bg-gradient-health",
    softBg: "bg-health-soft",
    iconColor: "text-health",
  },
  {
    title: "จำแนกประเภทสัตว์",
    description: "คัดแยกประเภทสัตว์จากรูปภาพ 5 ประเภท",
    icon: PawPrint,
    path: "/animal",
    gradient: "bg-gradient-animal",
    softBg: "bg-animal-soft",
    iconColor: "text-animal",
  },
  {
    title: "แนะนำหนัง/รายการทีวี",
    description: "ค้นหาและแนะนำหนังหรือรายการทีวีที่ใกล้เคียง",
    icon: Film,
    path: "/movie",
    gradient: "bg-gradient-movie",
    softBg: "bg-movie-soft",
    iconColor: "text-movie",
  },
];

const Index = () => {
  return (
    <div className="min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-movie/5 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6"
            >
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">AI Prediction Systems</span>
            </motion.div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="text-gradient-primary">AI Prediction Hub</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              ระบบ Machine Learning สำหรับทำนายและจำแนกข้อมูล
              <br />
              รวม 4 โมเดลให้บริการครบจบในที่เดียว
            </p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap justify-center gap-3"
            >
              {features.map((feature, i) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={feature.path}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                  >
                    <div
                      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${feature.softBg} ${feature.iconColor}`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="text-sm font-medium">{feature.title}</span>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4">เลือกระบบที่ต้องการใช้งาน</h2>
            <p className="text-muted-foreground">
              คลิกที่การ์ดเพื่อเริ่มต้นใช้งานแต่ละระบบ
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.path}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link to={feature.path}>
                    <Card className="h-full group cursor-pointer card-hover overflow-hidden">
                      {/* Gradient Header */}
                      <div className={`h-2 ${feature.gradient}`} />

                      <CardContent className="p-6">
                        <div
                          className={`w-14 h-14 rounded-2xl ${feature.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                        >
                          <Icon className="w-7 h-7 text-white" />
                        </div>

                        <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                          {feature.title}
                        </h3>

                        <p className="text-sm text-muted-foreground mb-4">
                          {feature.description}
                        </p>

                        <div
                          className={`inline-flex items-center gap-1 text-sm font-medium ${feature.iconColor}`}
                        >
                          เริ่มใช้งาน
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2024 AI Prediction Hub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
