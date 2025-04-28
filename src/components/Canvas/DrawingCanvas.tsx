
import { useEffect, useRef, useState } from "react";
import { Canvas as FabricCanvas, Circle, Path } from "fabric";
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

    const canvas = new FabricCanvas(canvasRef.current, {
      isDrawingMode: true,
      width: 600,
      height: 400,
      backgroundColor: "#ffffff",
    });

    canvas.freeDrawingBrush.color = "#000000";
    canvas.freeDrawingBrush.width = 3;
    setFabricCanvas(canvas);

    // Initialize the image classifier
    const initClassifier = async () => {
      try {
        const imageClassifier = await pipeline(
          "image-classification",
          "onnx-community/mobilenetv4_conv_small.e2400_r224_in1k",
          { device: "cpu" }
        );
        setClassifier(imageClassifier);
      } catch (error) {
        console.error("Error initializing classifier:", error);
      }
    };

    initClassifier();

    return () => {
      canvas.dispose();
    };
  }, []);

  const handleClear = () => {
    if (!fabricCanvas) return;
    fabricCanvas.clear();
    fabricCanvas.backgroundColor = "#ffffff";
    fabricCanvas.renderAll();
  };

  const toggleEraser = () => {
    if (!fabricCanvas) return;
    
    if (!isDrawing) {
      fabricCanvas.freeDrawingBrush.color = "#000000";
      toast({ title: "Brush selected", description: "You can now draw!" });
    } else {
      fabricCanvas.freeDrawingBrush.color = "#ffffff";
      toast({ title: "Eraser selected", description: "You can now erase!" });
    }
    setIsDrawing(!isDrawing);
  };

  const guessDrawing = async () => {
    if (!fabricCanvas || !classifier) return;

    try {
      const dataUrl = fabricCanvas.toDataURL();
      const result = await classifier(dataUrl);
      
      if (result && result.length > 0) {
        toast({
          title: "I think you drew...",
          description: `${result[0].label.split(",")[0]} (${Math.round(result[0].score * 100)}% confident)`,
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
        <canvas ref={canvasRef} className="max-w-full touch-none" />
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
