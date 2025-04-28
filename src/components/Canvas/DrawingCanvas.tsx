
import { useEffect, useRef, useState } from "react";
import { Canvas as FabricCanvas } from "fabric";
import { Button } from "@/components/ui/button";
import { pipeline } from "@huggingface/transformers";
import { Brush, Eraser, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const DrawingCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fabricCanvas, setFabricCanvas] = useState<FabricCanvas | null>(null);
  const [isDrawing, setIsDrawing] = useState(true);
  const [classifier, setClassifier] = useState<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (!canvasRef.current) return;

    // Create the fabric.js canvas with drawing mode enabled
    const canvas = new FabricCanvas(canvasRef.current, {
      isDrawingMode: true,
      width: 600,
      height: 400,
      backgroundColor: "#ffffff",
    });

    // Initialize the brush properly after the canvas is fully loaded
    setTimeout(() => {
      if (canvas.freeDrawingBrush) {
        canvas.freeDrawingBrush.color = "#000000";
        canvas.freeDrawingBrush.width = 5;
      }
    }, 100);
    
    setFabricCanvas(canvas);

    // Initialize the image classifier with WebGPU or WASM
    const initClassifier = async () => {
      try {
        const imageClassifier = await pipeline(
          "image-classification",
          "onnx-community/mobilenetv4_conv_small.e2400_r224_in1k",
          { device: "wasm" } // Use WASM instead of CPU
        );
        setClassifier(imageClassifier);
        console.log("Classifier initialized successfully");
      } catch (error) {
        console.error("Error initializing classifier:", error);
        // Try alternative device if first attempt failed
        try {
          const imageClassifier = await pipeline(
            "image-classification",
            "onnx-community/mobilenetv4_conv_small.e2400_r224_in1k",
            { device: "webgpu" }
          );
          setClassifier(imageClassifier);
          console.log("Classifier initialized with WebGPU");
        } catch (secondError) {
          console.error("Failed to initialize classifier with alternate device:", secondError);
          toast({
            title: "Drawing recognition unavailable",
            description: "The AI drawing recognition couldn't be loaded.",
          });
        }
      }
    };

    initClassifier();

    return () => {
      canvas.dispose();
    };
  }, [toast]);

  const handleClear = () => {
    if (!fabricCanvas) return;
    fabricCanvas.clear();
    fabricCanvas.backgroundColor = "#ffffff";
    fabricCanvas.renderAll();
    toast({
      title: "Canvas cleared",
      description: "You can start drawing something new!",
    });
  };

  const toggleEraser = () => {
    if (!fabricCanvas || !fabricCanvas.freeDrawingBrush) return;
    
    if (!isDrawing) {
      fabricCanvas.freeDrawingBrush.color = "#000000";
      fabricCanvas.freeDrawingBrush.width = 5;
      toast({ 
        title: "Brush selected", 
        description: "You can now draw!" 
      });
    } else {
      fabricCanvas.freeDrawingBrush.color = "#ffffff";
      fabricCanvas.freeDrawingBrush.width = 20;
      toast({ 
        title: "Eraser selected", 
        description: "You can now erase!" 
      });
    }
    setIsDrawing(!isDrawing);
  };

  const guessDrawing = async () => {
    if (!fabricCanvas) {
      toast({
        title: "No drawing found",
        description: "Please draw something first!",
      });
      return;
    }
    
    if (!classifier) {
      toast({
        title: "AI not ready",
        description: "The image recognition system is still loading. Please try again in a moment.",
      });
      return;
    }

    try {
      toast({
        title: "Analyzing your drawing...",
        description: "Let me see what you've created!",
      });
      
      const dataUrl = fabricCanvas.toDataURL();
      const result = await classifier(dataUrl);
      
      if (result && result.length > 0) {
        const topResult = result[0];
        const label = topResult.label.split(",")[0];
        const confidence = Math.round(topResult.score * 100);
        
        toast({
          title: "I think you drew...",
          description: `${label} (${confidence}% confident)`,
        });
      } else {
        toast({
          title: "Hmm, I'm not sure",
          description: "I couldn't recognize what you drew. Try drawing something clearer!",
        });
      }
    } catch (error) {
      console.error("Error classifying image:", error);
      toast({
        title: "Oops!",
        description: "I couldn't recognize your drawing. Try drawing something else!",
      });
    }
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="border-2 border-kidz-primary rounded-lg overflow-hidden shadow-lg">
        <canvas ref={canvasRef} className="max-w-full touch-none cursor-crosshair" />
      </div>

      <div className="flex gap-4">
        <Button
          variant="outline"
          onClick={toggleEraser}
          className={`${isDrawing ? 'bg-white' : 'bg-kidz-light'}`}
        >
          {isDrawing ? <Brush className="w-5 h-5" /> : <Eraser className="w-5 h-5" />}
          {isDrawing ? 'Draw' : 'Erase'}
        </Button>

        <Button
          variant="outline"
          onClick={handleClear}
          className="bg-white"
        >
          <Trash2 className="w-5 h-5" />
          Clear
        </Button>

        <Button
          onClick={guessDrawing}
          className="bg-kidz-primary hover:bg-kidz-dark text-black"
        >
          Guess My Drawing!
        </Button>
      </div>
    </div>
  );
};

export default DrawingCanvas;
