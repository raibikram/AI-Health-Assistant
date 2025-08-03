// "use client";
// import ChatComponent from "@/components/chatComponent";
// import { ModeToggle } from "@/components/modetoggle";
// import ReportComponent from "@/components/reportComponent";
// import { Button } from "@/components/ui/button";
// import {
//   Drawer,
//   DrawerContent,
//   DrawerTitle,
//   DrawerTrigger,
//   DrawerDescription,
// } from "@/components/ui/drawer";
// import { useToast } from "@/hooks/use-toast";
// import { Settings } from "lucide-react";
// import React, { useState } from "react";

// export default function HomeComponent() {
//   const { toast } = useToast();
//   const [reportData, setReportData] = useState("");

//   const onReportConfirmation = (data: string) => {
//     setReportData(data);
//     toast({
//       title: "Success",
//       description: "Report updated successfully!",
//       duration: 500,
//     });
//   };

//   return (
//     <div className="flex flex-col min-h-[60vh] w-full">
//       {/* Header */}
//       <header className="sticky top-0 z-10 h-[57px] bg-black flex items-center border-b px-4">
//         <h1 className="text-xl font-semibold text-[#D90013] flex-1">
//           AI Health Assistant
//         </h1>
//         <div className="flex gap-2">
//           <ModeToggle />
//           <Drawer>
//             <DrawerTrigger asChild>
//               <Button variant="outline" className="md:hidden">
//                 <Settings size={20} />
//               </Button>
//             </DrawerTrigger>
//             <DrawerContent className="max-h-[80vh] p-4">
//               <DrawerTitle>Upload Report</DrawerTitle>
//               <DrawerDescription>
//                 Select a report file to extract details.
//               </DrawerDescription>
//               <ReportComponent onReportConfirmation={onReportConfirmation} />
//             </DrawerContent>
//           </Drawer>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="flex flex-1 flex-col gap-4 overflow-auto p-4 md:flex-row">
//         {/* Report Section */}
//         <div className="hidden md:flex flex-col w-1/3 lg:w-1/4">
//           <ReportComponent onReportConfirmation={onReportConfirmation} />
//         </div>

//         {/* Chat Section */}
//         <div className="flex-1">
//           <ChatComponent reportData={reportData} />
//         </div>
//       </main>
//     </div>
//   );
// }
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, 
  Brain, 
  Shield, 
  Zap, 
  Upload, 
  CheckCircle, 
  BookOpen,
  Activity,
  Users,
  Clock,
  ArrowRight,
  Star
} from 'lucide-react';
import Link from "next/link";

export default function Home() {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      setUploadedFile(files[0].name);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setUploadedFile(files[0].name);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
 

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl text-center">
          <Badge className="bg-blue-100 text-blue-800 mb-6 px-4 py-2">
            <Activity className="h-4 w-4 mr-2" />
            Powered by Advanced Medical AI
          </Badge>
          
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            AI-Powered Hospital Report
            <span className="text-blue-600 block">Analysis & Insights</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Upload hospital reports and get instant, accurate analysis powered by our RAG system trained on 
            5+ comprehensive medical textbooks. Enhance diagnostic accuracy and save valuable time.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 px-8 py-4 text-lg">
              <Link href={"/rag"}>Try Demo Report</Link>
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg">
              Watch Demo
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-8 text-gray-500">
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5" />
              <span>HIPAA Compliant</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5" />
              <span>99.5% Accuracy</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span>500+ Hospitals</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5" />
              <span>24/7 Available</span>
            </div>
          </div>
        </div>
      </section>

      {/* Upload Demo Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Try It Now</h2>
            <p className="text-gray-600 text-lg">Upload a hospital report to see our AI in action</p>
          </div>

          <Card className="p-8">
            <div
              className={`border-2 border-dashed rounded-lg p-12 text-center transition-all duration-300 ${
                isDragging
                  ? 'border-blue-500 bg-blue-50'
                  : uploadedFile
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50/50'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              {uploadedFile ? (
                <div className="space-y-4">
                  <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">File Uploaded Successfully!</h3>
                    <p className="text-gray-600 mb-4">{uploadedFile}</p>
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      Analyze Report
                      <Brain className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <Upload className="h-16 w-16 text-gray-400 mx-auto" />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Drag & Drop Hospital Report
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Supports PDF, DOC, DOCX files up to 10MB
                    </p>
                    <div className="flex items-center justify-center">
                      <Input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileSelect}
                        className="hidden"
                        id="file-upload"
                      />
                      <label htmlFor="file-upload">
                        <Button variant="outline" className="cursor-pointer">
                          Choose File
                        </Button>
                      </label>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Powerful AI Features</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our RAG system combines cutting-edge AI with comprehensive medical knowledge
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="bg-blue-100 p-3 rounded-lg w-fit">
                  <Brain className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle>Advanced RAG Technology</CardTitle>
                <CardDescription>
                  Retrieval-Augmented Generation system trained on 5+ medical textbooks for accurate analysis
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="bg-green-100 p-3 rounded-lg w-fit">
                  <Zap className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle>Instant Analysis</CardTitle>
                <CardDescription>
                  Get comprehensive report insights in seconds, not hours. Speed up your diagnostic workflow
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="bg-purple-100 p-3 rounded-lg w-fit">
                  <BookOpen className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle>Medical Knowledge Base</CardTitle>
                <CardDescription>
                  Powered by comprehensive medical literature including diagnostic guidelines and protocols
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="bg-red-100 p-3 rounded-lg w-fit">
                  <Shield className="h-6 w-6 text-red-600" />
                </div>
                <CardTitle>HIPAA Compliant</CardTitle>
                <CardDescription>
                  Enterprise-grade security ensuring patient data privacy and regulatory compliance
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="bg-yellow-100 p-3 rounded-lg w-fit">
                  <FileText className="h-6 w-6 text-yellow-600" />
                </div>
                <CardTitle>Multi-Format Support</CardTitle>
                <CardDescription>
                  Support for various report formats including PDF, DOC, and image-based documents
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="bg-indigo-100 p-3 rounded-lg w-fit">
                  <Activity className="h-6 w-6 text-indigo-600" />
                </div>
                <CardTitle>Real-time Insights</CardTitle>
                <CardDescription>
                  Get actionable insights and recommendations based on latest medical research and best practices
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-blue-600 text-white">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">500+</div>
              <div className="text-blue-100 text-lg">Hospitals Using</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">1M+</div>
              <div className="text-blue-100 text-lg">Reports Analyzed</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">99.5%</div>
              <div className="text-blue-100 text-lg">Accuracy Rate</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">24/7</div>
              <div className="text-blue-100 text-lg">Availability</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Trusted by Healthcare Professionals</h2>
            <p className="text-xl text-gray-600">See what medical experts are saying about MedRAG AI</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6">
              <CardContent className="pt-0">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4">
                  MedRAG AI has revolutionized our diagnostic process. The accuracy and speed are remarkable.
                </p>
                <div className="flex items-center space-x-3">
                  <div className="bg-gray-300 rounded-full h-10 w-10"></div>
                  <div>
                    <div className="font-semibold">Dr. Sarah Johnson</div>
                    <div className="text-sm text-gray-600">Chief Radiologist, Metro Hospital</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent className="pt-0">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4">
                  The AI insights have helped us catch critical findings we might have missed. Game-changer!
                </p>
                <div className="flex items-center space-x-3">
                  <div className="bg-gray-300 rounded-full h-10 w-10"></div>
                  <div>
                    <div className="font-semibold">Dr. Michael Chen</div>
                    <div className="text-sm text-gray-600">Emergency Department Head</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent className="pt-0">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4">
                  Implementation was seamless and the ROI is incredible. Our efficiency has improved 40%.
                </p>
                <div className="flex items-center space-x-3">
                  <div className="bg-gray-300 rounded-full h-10 w-10"></div>
                  <div>
                    <div className="font-semibold">Lisa Rodriguez</div>
                    <div className="text-sm text-gray-600">Hospital Administrator</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Transform Your Hospital Reports?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Join hundreds of healthcare institutions already using MedRAG AI
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="px-8 py-4 text-lg">
            <Link href={"/"}>  Start Free Trial</Link> 
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg text-black">
              Schedule Demo
            </Button>
          </div>
        </div>
      </section>


    </div>
  );
}