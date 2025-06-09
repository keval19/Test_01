import React, { useState, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Text } from '@react-three/drei';
import './App.css';

// Sophisticated Cabinet Component
function SophisticatedCabinet({ 
  position, 
  size, 
  cabinetColor, 
  type = 'base', // 'base', 'upper', 'tall'
  doors = 2,
  drawers = 0 
}) {
  const [width, height, depth] = size;
  
  return (
    <group position={position}>
      {/* Cabinet Box/Frame */}
      <mesh castShadow>
        <boxGeometry args={[width, height, depth]} />
        <meshLambertMaterial color={cabinetColor} />
      </mesh>
      
      {/* Cabinet Doors */}
      {Array.from({ length: doors }, (_, i) => {
        const doorWidth = (width - 0.05) / doors;
        const doorX = -width/2 + doorWidth/2 + i * doorWidth + 0.025;
        
        return (
          <group key={i}>
            {/* Door Panel */}
            <mesh position={[doorX, 0, depth/2 + 0.02]} castShadow>
              <boxGeometry args={[doorWidth - 0.02, height - 0.1, 0.03]} />
              <meshLambertMaterial color={cabinetColor} />
            </mesh>
            
            {/* Door Frame */}
            <mesh position={[doorX, 0, depth/2 + 0.035]} castShadow>
              <boxGeometry args={[doorWidth - 0.06, height - 0.14, 0.01]} />
              <meshLambertMaterial color="#f8f8f8" />
            </mesh>
            
            {/* Door Handle */}
            <mesh position={[doorX + doorWidth/3, 0, depth/2 + 0.05]} castShadow>
              <cylinderGeometry args={[0.008, 0.008, 0.15]} />
              <meshLambertMaterial color="#c0c0c0" />
            </mesh>
          </group>
        );
      })}
      
      {/* Drawers (if any) */}
      {Array.from({ length: drawers }, (_, i) => {
        const drawerHeight = height / (drawers + doors);
        const drawerY = height/2 - drawerHeight/2 - i * drawerHeight;
        
        return (
          <group key={i}>
            {/* Drawer Front */}
            <mesh position={[0, drawerY, depth/2 + 0.02]} castShadow>
              <boxGeometry args={[width - 0.05, drawerHeight - 0.02, 0.03]} />
              <meshLambertMaterial color={cabinetColor} />
            </mesh>
            
            {/* Drawer Handle */}
            <mesh position={[0, drawerY, depth/2 + 0.05]} castShadow>
              <cylinderGeometry args={[0.008, 0.008, width * 0.6]} />
              <meshLambertMaterial color="#c0c0c0" />
            </mesh>
          </group>
        );
      })}
      
      {/* Crown Molding (for upper cabinets) */}
      {type === 'upper' && (
        <mesh position={[0, height/2 + 0.05, 0]} castShadow>
          <boxGeometry args={[width + 0.1, 0.1, depth + 0.1]} />
          <meshLambertMaterial color={cabinetColor} />
        </mesh>
      )}
      
      {/* Toe Kick (for base cabinets) */}
      {type === 'base' && (
        <mesh position={[0, -height/2 - 0.05, depth/2 - 0.05]} castShadow>
          <boxGeometry args={[width, 0.1, 0.1]} />
          <meshLambertMaterial color="#2c2c2c" />
        </mesh>
      )}
    </group>
  );
}

// Kitchen Island with sophisticated design
function KitchenIsland({ cabinetColor, size }) {
  const [width, height, depth] = size;
  
  return (
    <group>
      {/* Main Island Base */}
      <SophisticatedCabinet 
        position={[0, -height/2, 0]}
        size={[width, height, depth]}
        cabinetColor={cabinetColor}
        type="base"
        doors={4}
        drawers={2}
      />
      
      {/* Countertop */}
      <mesh position={[0, 0.05, 0]} castShadow>
        <boxGeometry args={[width + 0.1, 0.1, depth + 0.1]} />
        <meshLambertMaterial color="#2c2c2c" />
      </mesh>
      
      {/* Countertop Edge Detail */}
      <mesh position={[0, 0.08, 0]} castShadow>
        <boxGeometry args={[width + 0.12, 0.04, depth + 0.12]} />
        <meshLambertMaterial color="#1a1a1a" />
      </mesh>
      
      {/* Island Legs/Support Posts */}
      {[
        [-width/2 + 0.2, -height/2, -depth/2 + 0.2],
        [width/2 - 0.2, -height/2, -depth/2 + 0.2],
        [-width/2 + 0.2, -height/2, depth/2 - 0.2],
        [width/2 - 0.2, -height/2, depth/2 - 0.2]
      ].map((pos, i) => (
        <mesh key={i} position={pos} castShadow>
          <boxGeometry args={[0.1, height, 0.1]} />
          <meshLambertMaterial color={cabinetColor} />
        </mesh>
      ))}
    </group>
  );
}

// Kitchen Model Component
function KitchenModel({ cabinetColor, currentModel }) {
  const models = {
    galley: <GalleyKitchen cabinetColor={cabinetColor} />,
    lshape: <LShapeKitchen cabinetColor={cabinetColor} />,
    island: <IslandKitchen cabinetColor={cabinetColor} />
  };

  return models[currentModel];
}

// Enhanced Galley Kitchen Layout
function GalleyKitchen({ cabinetColor }) {
  return (
    <group>
      {/* Floor */}
      <mesh position={[0, -2, 0]} receiveShadow>
        <boxGeometry args={[12, 0.1, 8]} />
        <meshLambertMaterial color="#f5f5f5" />
      </mesh>

      {/* Left Wall Cabinets */}
      <group position={[-5, 0, 0]}>
        {/* Lower Cabinets - Different Sizes */}
        <SophisticatedCabinet 
          position={[0, -1, -2.5]}
          size={[1, 1.5, 0.6]}
          cabinetColor={cabinetColor}
          type="base"
          doors={1}
        />
        <SophisticatedCabinet 
          position={[0, -1, -1]}
          size={[1, 1.5, 0.6]}
          cabinetColor={cabinetColor}
          type="base"
          doors={2}
          drawers={1}
        />
        <SophisticatedCabinet 
          position={[0, -1, 0.5]}
          size={[1, 1.5, 0.6]}
          cabinetColor={cabinetColor}
          type="base"
          doors={1}
          drawers={2}
        />
        <SophisticatedCabinet 
          position={[0, -1, 2]}
          size={[1, 1.5, 0.6]}
          cabinetColor={cabinetColor}
          type="base"
          doors={2}
        />

        {/* Upper Cabinets */}
        <SophisticatedCabinet 
          position={[0, 1.5, -2.5]}
          size={[1, 1, 0.4]}
          cabinetColor={cabinetColor}
          type="upper"
          doors={1}
        />
        <SophisticatedCabinet 
          position={[0, 1.5, -1]}
          size={[1, 1, 0.4]}
          cabinetColor={cabinetColor}
          type="upper"
          doors={2}
        />
        <SophisticatedCabinet 
          position={[0, 1.5, 0.5]}
          size={[1, 1, 0.4]}
          cabinetColor={cabinetColor}
          type="upper"
          doors={1}
        />
        <SophisticatedCabinet 
          position={[0, 1.5, 2]}
          size={[1, 1, 0.4]}
          cabinetColor={cabinetColor}
          type="upper"
          doors={2}
        />

        {/* Countertop */}
        <mesh position={[0, -0.1, 0]} castShadow>
          <boxGeometry args={[1.2, 0.1, 5.2]} />
          <meshLambertMaterial color="#2c2c2c" />
        </mesh>
      </group>

      {/* Right Wall Cabinets */}
      <group position={[5, 0, 0]}>
        {/* Lower Cabinets */}
        <SophisticatedCabinet 
          position={[0, -1, -2.5]}
          size={[1, 1.5, 0.6]}
          cabinetColor={cabinetColor}
          type="base"
          doors={1}
        />
        <SophisticatedCabinet 
          position={[0, -1, -1]}
          size={[1, 1.5, 0.6]}
          cabinetColor={cabinetColor}
          type="base"
          doors={1}
          drawers={3}
        />
        <SophisticatedCabinet 
          position={[0, -1, 0.5]}
          size={[1, 1.5, 0.6]}
          cabinetColor={cabinetColor}
          type="base"
          doors={2}
        />
        <SophisticatedCabinet 
          position={[0, -1, 2]}
          size={[1, 1.5, 0.6]}
          cabinetColor={cabinetColor}
          type="base"
          doors={1}
        />

        {/* Upper Cabinets */}
        <SophisticatedCabinet 
          position={[0, 1.5, -2.5]}
          size={[1, 1, 0.4]}
          cabinetColor={cabinetColor}
          type="upper"
          doors={1}
        />
        <SophisticatedCabinet 
          position={[0, 1.5, -1]}
          size={[1, 1, 0.4]}
          cabinetColor={cabinetColor}
          type="upper"
          doors={2}
        />
        <SophisticatedCabinet 
          position={[0, 1.5, 0.5]}
          size={[1, 1, 0.4]}
          cabinetColor={cabinetColor}
          type="upper"
          doors={1}
        />
        <SophisticatedCabinet 
          position={[0, 1.5, 2]}
          size={[1, 1, 0.4]}
          cabinetColor={cabinetColor}
          type="upper"
          doors={2}
        />

        {/* Countertop */}
        <mesh position={[0, -0.1, 0]} castShadow>
          <boxGeometry args={[1.2, 0.1, 5.2]} />
          <meshLambertMaterial color="#2c2c2c" />
        </mesh>
      </group>

      {/* Kitchen Island */}
      <KitchenIsland 
        cabinetColor={cabinetColor}
        size={[3, 1.5, 1.5]}
      />
    </group>
  );
}

// Enhanced L-Shape Kitchen Layout
function LShapeKitchen({ cabinetColor }) {
  return (
    <group>
      {/* Floor */}
      <mesh position={[0, -2, 0]} receiveShadow>
        <boxGeometry args={[12, 0.1, 8]} />
        <meshLambertMaterial color="#f5f5f5" />
      </mesh>

      {/* Main Wall Cabinets */}
      <group position={[-4, 0, 0]}>
        {Array.from({ length: 4 }, (_, i) => (
          <group key={i}>
            <SophisticatedCabinet 
              position={[0, -1, -3 + i * 1.5]}
              size={[1, 1.5, 0.6]}
              cabinetColor={cabinetColor}
              type="base"
              doors={i % 2 === 0 ? 1 : 2}
              drawers={i === 1 ? 2 : 0}
            />
            <SophisticatedCabinet 
              position={[0, 1.5, -3 + i * 1.5]}
              size={[1, 1, 0.4]}
              cabinetColor={cabinetColor}
              type="upper"
              doors={i % 2 === 0 ? 1 : 2}
            />
          </group>
        ))}
        <mesh position={[0, -0.1, 0]} castShadow>
          <boxGeometry args={[1.2, 0.1, 6.2]} />
          <meshLambertMaterial color="#2c2c2c" />
        </mesh>
      </group>

      {/* Corner Wall Cabinets */}
      <group position={[0, 0, 3]}>
        {Array.from({ length: 3 }, (_, i) => (
          <group key={i}>
            <SophisticatedCabinet 
              position={[-2 + i * 1.5, -1, 0]}
              size={[1, 1.5, 0.6]}
              cabinetColor={cabinetColor}
              type="base"
              doors={i === 1 ? 2 : 1}
              drawers={i === 0 ? 1 : 0}
            />
            <SophisticatedCabinet 
              position={[-2 + i * 1.5, 1.5, 0]}
              size={[1, 1, 0.4]}
              cabinetColor={cabinetColor}
              type="upper"
              doors={i === 1 ? 2 : 1}
            />
          </group>
        ))}
        <mesh position={[0, -0.1, 0]} castShadow>
          <boxGeometry args={[4.7, 0.1, 1.2]} />
          <meshLambertMaterial color="#2c2c2c" />
        </mesh>
      </group>

      {/* Corner Cabinet */}
      <SophisticatedCabinet 
        position={[-3, -1, 2]}
        size={[1.2, 1.5, 1.2]}
        cabinetColor={cabinetColor}
        type="base"
        doors={1}
      />
    </group>
  );
}

// Enhanced Island Kitchen Layout
function IslandKitchen({ cabinetColor }) {
  return (
    <group>
      {/* Floor */}
      <mesh position={[0, -2, 0]} receiveShadow>
        <boxGeometry args={[14, 0.1, 10]} />
        <meshLambertMaterial color="#f5f5f5" />
      </mesh>

      {/* Back Wall Cabinets */}
      <group position={[0, 0, -4]}>
        {Array.from({ length: 6 }, (_, i) => (
          <group key={i}>
            <SophisticatedCabinet 
              position={[-6 + i * 2, -1, 0]}
              size={[1.5, 1.5, 0.6]}
              cabinetColor={cabinetColor}
              type="base"
              doors={i % 3 === 0 ? 1 : 2}
              drawers={i % 3 === 1 ? 2 : 0}
            />
            <SophisticatedCabinet 
              position={[-6 + i * 2, 1.5, 0]}
              size={[1.5, 1, 0.4]}
              cabinetColor={cabinetColor}
              type="upper"
              doors={i % 3 === 0 ? 1 : 2}
            />
          </group>
        ))}
        <mesh position={[0, -0.1, 0]} castShadow>
          <boxGeometry args={[13, 0.1, 1.2]} />
          <meshLambertMaterial color="#2c2c2c" />
        </mesh>
      </group>

      {/* Large Kitchen Island */}
      <KitchenIsland 
        cabinetColor={cabinetColor}
        size={[4, 1.5, 2]}
      />

      {/* Side Cabinets */}
      <group position={[-5, 0, 2]}>
        <SophisticatedCabinet 
          position={[0, -1, 0]}
          size={[1, 1.5, 1.5]}
          cabinetColor={cabinetColor}
          type="base"
          doors={2}
          drawers={1}
        />
        <SophisticatedCabinet 
          position={[0, 1.5, 0]}
          size={[1, 1, 1.5]}
          cabinetColor={cabinetColor}
          type="upper"
          doors={2}
        />
        <mesh position={[0, -0.1, 0]} castShadow>
          <boxGeometry args={[1.2, 0.1, 1.7]} />
          <meshLambertMaterial color="#2c2c2c" />
        </mesh>
      </group>

      {/* Tall Pantry Cabinet */}
      <SophisticatedCabinet 
        position={[5, 0, 2]}
        size={[1, 3, 0.6]}
        cabinetColor={cabinetColor}
        type="tall"
        doors={2}
      />
    </group>
  );
}

// Color Picker Component
function ColorPicker({ selectedColor, onColorChange }) {
  const colors = [
    { name: 'Oak Wood', color: '#D2B48C' },
    { name: 'Cherry Wood', color: '#8B4513' },
    { name: 'Maple Wood', color: '#F5DEB3' },
    { name: 'Walnut', color: '#654321' },
    { name: 'White Shaker', color: '#FFFFFF' },
    { name: 'Charcoal Black', color: '#2C2C2C' },
    { name: 'Navy Blue', color: '#1e3a8a' },
    { name: 'Forest Green', color: '#166534' },
    { name: 'Cream', color: '#FDF6E3' },
    { name: 'Espresso', color: '#3C2415' },
    { name: 'Sage Green', color: '#9CAF88' },
    { name: 'Dove Gray', color: '#6B7280' }
  ];

  return (
    <div className="color-picker">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">Premium Cabinet Finishes</h3>
      <div className="grid grid-cols-4 gap-3">
        {colors.map((colorOption) => (
          <button
            key={colorOption.name}
            className={`
              w-14 h-14 rounded-lg border-2 transition-all duration-200 hover:scale-110 relative
              ${selectedColor === colorOption.color 
                ? 'border-blue-500 shadow-lg ring-2 ring-blue-200' 
                : 'border-gray-300 hover:border-gray-400'
              }
            `}
            style={{ backgroundColor: colorOption.color }}
            onClick={() => onColorChange(colorOption.color)}
            title={colorOption.name}
          >
            {selectedColor === colorOption.color && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-white rounded-full bg-blue-500 flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
              </div>
            )}
          </button>
        ))}
      </div>
      <div className="mt-3">
        <p className="text-sm text-gray-600">
          Selected: <strong>{colors.find(c => c.color === selectedColor)?.name}</strong>
        </p>
      </div>
    </div>
  );
}

// Model Selector Component
function ModelSelector({ currentModel, onModelChange }) {
  const models = [
    { id: 'galley', name: 'Galley Kitchen', description: 'Classic parallel layout with island' },
    { id: 'lshape', name: 'L-Shape Kitchen', description: 'Efficient corner design' },
    { id: 'island', name: 'Island Kitchen', description: 'Open concept with large island' }
  ];

  return (
    <div className="model-selector">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">Kitchen Layouts</h3>
      <div className="space-y-3">
        {models.map((model) => (
          <button
            key={model.id}
            className={`
              w-full p-3 rounded-lg transition-all duration-200 text-left
              ${currentModel === model.id
                ? 'bg-blue-500 text-white shadow-lg transform scale-105'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md'
              }
            `}
            onClick={() => onModelChange(model.id)}
          >
            <div className="font-medium">{model.name}</div>
            <div className={`text-sm mt-1 ${currentModel === model.id ? 'text-blue-100' : 'text-gray-500'}`}>
              {model.description}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

// Main App Component
function App() {
  const [cabinetColor, setCabinetColor] = useState('#D2B48C'); // Default oak color
  const [currentModel, setCurrentModel] = useState('galley');

  return (
    <div className="app">
      {/* Header */}
      <header className="app-header">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Premium 3D Kitchen Designer
        </h1>
        <p className="text-gray-600 mb-6">
          Explore sophisticated kitchen designs with detailed cabinets, hardware, and finishes
        </p>
      </header>

      {/* Main Content */}
      <div className="app-content">
        {/* 3D Viewer */}
        <div className="viewer-container">
          <Canvas
            shadows
            camera={{ position: [8, 5, 8], fov: 60 }}
            className="kitchen-canvas"
          >
            <ambientLight intensity={0.3} />
            <directionalLight
              position={[10, 10, 5]}
              intensity={1.2}
              castShadow
              shadow-mapSize={[2048, 2048]}
              shadow-camera-far={50}
              shadow-camera-left={-10}
              shadow-camera-right={10}
              shadow-camera-top={10}
              shadow-camera-bottom={-10}
            />
            <pointLight position={[0, 5, 0]} intensity={0.5} />
            <KitchenModel cabinetColor={cabinetColor} currentModel={currentModel} />
            <OrbitControls 
              enablePan={true}
              enableZoom={true}
              enableRotate={true}
              maxPolarAngle={Math.PI / 2.2}
              minDistance={3}
              maxDistance={25}
              autoRotate={false}
              autoRotateSpeed={0.5}
            />
            <Environment preset="apartment" />
          </Canvas>
        </div>

        {/* Controls Panel */}
        <div className="controls-panel">
          <ModelSelector 
            currentModel={currentModel} 
            onModelChange={setCurrentModel} 
          />
          <ColorPicker 
            selectedColor={cabinetColor} 
            onColorChange={setCabinetColor} 
          />
          
          {/* Features List */}
          <div className="features-list">
            <h3 className="text-lg font-semibold mb-3 text-gray-800">Cabinet Features</h3>
            <div className="text-sm text-gray-600 space-y-2">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span>Detailed door frames & panels</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span>Premium hardware & handles</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span>Crown molding on uppers</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span>Toe kicks on base cabinets</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span>Mixed door & drawer configurations</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span>Realistic proportions & spacing</span>
              </div>
            </div>
          </div>
          
          {/* Instructions */}
          <div className="instructions">
            <h3 className="text-lg font-semibold mb-3 text-gray-800">3D Controls</h3>
            <div className="text-sm text-gray-600 space-y-1">
              <p>• <strong>Rotate:</strong> Click and drag to orbit</p>
              <p>• <strong>Zoom:</strong> Mouse wheel or pinch</p>
              <p>• <strong>Pan:</strong> Right-click and drag</p>
              <p>• <strong>Reset:</strong> Double-click to center</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;