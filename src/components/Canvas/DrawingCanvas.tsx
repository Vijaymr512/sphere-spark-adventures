import { useEffect, useRef, useState } from "react";
import { Canvas as FabricCanvas } from "fabric";
import { Button } from "@/components/ui/button";
import { pipeline } from "@huggingface/transformers";
import { Brush, Eraser, Trash2, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const DrawingCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fabricCanvas, setFabricCanvas] = useState<FabricCanvas | null>(null);
  const [isDrawing, setIsDrawing] = useState(true);
  const [classifier, setClassifier] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);
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
        toast({
          title: "Loading AI model...",
          description: "This might take a few moments",
        });
        
        // Try WebGPU first
        try {
          console.log("Initializing classifier with WebGPU...");
          const imageClassifier = await pipeline(
            "image-classification",
            "onnx-community/mobilenetv4_conv_small.e2400_r224_in1k",
            { device: "webgpu" }
          );
          setClassifier(imageClassifier);
          console.log("Classifier initialized successfully with WebGPU");
          toast({
            title: "AI drawing recognition ready!",
            description: "Using WebGPU for fast processing.",
          });
          return;
        } catch (webgpuError) {
          console.warn("WebGPU not available, falling back to WASM", webgpuError);
        }
        
        // Fallback to WASM
        console.log("Initializing classifier with WASM...");
        const imageClassifier = await pipeline(
          "image-classification",
          "onnx-community/mobilenetv4_conv_small.e2400_r224_in1k",
          { device: "wasm" }
        );
        setClassifier(imageClassifier);
        console.log("Classifier initialized successfully with WASM");
        toast({
          title: "AI drawing recognition ready!",
          description: "Using WASM for compatibility.",
        });
      } catch (error) {
        console.error("Error initializing classifier:", error);
        toast({
          title: "Drawing recognition unavailable",
          description: "The AI drawing recognition couldn't be loaded.",
          variant: "destructive"
        });
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
      setIsProcessing(true);
      toast({
        title: "Analyzing your drawing...",
        description: "Let me see what you've created!",
      });
      
      const dataUrl = fabricCanvas.toDataURL({
        format: 'png',
        quality: 1,
        multiplier: 1
      });
      
      const result = await classifier(dataUrl);
      
      setIsProcessing(false);
      
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
      setIsProcessing(false);
      console.error("Error classifying image:", error);
      toast({
        title: "Oops!",
        description: "I couldn't recognize your drawing. Try drawing something else!",
        variant: "destructive"
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
          disabled={isProcessing || !classifier}
          className="bg-kidz-primary hover:bg-kidz-dark text-black"
        >
          {isProcessing ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin mr-2" />
              Analyzing...
            </>
          ) : (
            "Guess My Drawing!"
          )}
        </Button>
      </div>
      
      <div className="mt-2 text-sm text-gray-500 max-w-lg text-center">
        <p>Draw clear, simple objects for best recognition. The AI works best with basic shapes like animals, vehicles, or common objects.</p>
      </div>
    </div>
  );
};

export default DrawingCanvas;
